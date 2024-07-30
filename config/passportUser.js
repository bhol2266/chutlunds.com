import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { getCookie, deleteCookie } from "cookies-next";

// Helper function to extract first and last name
const getFirstAndLastName = (displayName) => {
    const firstName = displayName.substring(0, displayName.indexOf(' ')).trim();
    const lastName = displayName.substring(displayName.indexOf(' ') + 1).trim();
    return { firstName, lastName };
};

// Helper function to process login
const processLogin = async (profile, accountType) => {
    const { firstName, lastName } = getFirstAndLastName(profile.displayName);
    const email = profile.emails[0].value;
    const profilePicUrl = profile.photos[0].value;

    const data = { firstName, lastName, email, profilePicUrl, accountType };
    const parcelData = { firstName, lastName, email, password: 'NOT_SET', country: "" };

    const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/fb_googleLogin`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
    });

    const response = await rawResponse.json();
    if (response.success) {
        return response.data;
    }
    throw new Error("Login failed");
};

// Google Strategy
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.FRONTEND_URL}api/user/google/callback`,
        passReqToCallback: true
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const userData = await processLogin(profile, "google");
                return done(null, userData);
            } catch (err) {
                console.error(err);
                done(err, false, { message: "Internal server error" });
            }
        }
    )
);

// Facebook Strategy
passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.FRONTEND_URL}api/user/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const userData = await processLogin(profile, "facebook");
                return done(null, userData);
            } catch (err) {
                console.error(err);
                done(err, false, { message: "Internal server error" });
            }
        }
    )
);
