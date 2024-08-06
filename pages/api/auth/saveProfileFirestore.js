import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
}

const firestore = admin.firestore();


async function saveUserProfile(firstName, lastName, email, profilePic, hashpass, verified, country, loggedIn, membership, keywords) {
    const data = {
        firstName,
        lastName,
        email,
        profilePic,
        hashpass,
        verified,
        country,
        loggedIn,
        membership,
        keywords,
        timestamp: Date.now(),
    };

    const documentId = email; // Using email as the document ID

    try {
        const docRef = firestore.collection('Users').doc(documentId);
        await docRef.set(data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
        throw new Error("Error writing document: " + error.message);
    }
}

async function checkUserExists_Firestore(email) {
    const docRef = firestore.collection('Users').doc(email);
    const doc = await docRef.get();
    return doc.exists;
}
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { displayName, email, photoURL } = req.body;

            // const userExists = await checkUserExists_Firestore(email);

            await saveUserProfile(displayName, "", email, photoURL, "", true, "", true, false, []);

            res.status(200).json({ message: 'Profile saved successfully' });

        } catch (error) {
            console.error('Error saving profile:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
