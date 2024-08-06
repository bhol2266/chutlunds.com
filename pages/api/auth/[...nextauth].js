// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default (req, res) => {
  const getSignInPage = (req) => {
    const host = req.headers.host;
    if (host.includes('chutlunds.com')) {
      return 'https://chutlunds.com/';
    } else if (host.includes('chutlunds2.com')) {
      return 'https://chutlunds2.com/';
    }
    return 'https://chutlunds.com/'; // Default to chutlunds.com
  };

  return NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      jwt: true,
    },
    pages: {
      signIn: getSignInPage(req),
    },
    callbacks: {
      async signIn({ user }) {
        const baseUrl = getSignInPage(req).replace('/signin', '');

        // Check if user exists
        try {
          await fetch(`${baseUrl}/api/auth/saveProfileFirestore`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              displayName: user.name,
              email: user.email,
              photoURL: user.image,
            }),
          });
          return true; // Return true to allow sign-in
        } catch (error) {
          console.error('Failed to save user profile:', error);
          return false; // Return false to deny sign-in
        }
      },
      async session({ session, token }) {
        // Attach user ID to session object
        session.user.id = token.sub;
        return session;
      },
      async redirect({ url, baseUrl }) {
        // Redirect to the last page the user was on before signing in
        return url.startsWith(baseUrl) ? url : baseUrl;
      },
    },
  });
};
