import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDuUQK4-UElWFqwDShMrWHStTvq1c1ePTc',
    authDomain: 'crwn-db-d1251.firebaseapp.com',
    projectId: 'crwn-db-d1251',
    storageBucket: 'crwn-db-d1251.appspot.com',
    messagingSenderId: '443585278029',
    appId: '1:443585278029:web:873c71e5b280affd60ac04',
    measurementId: 'G-K445DGYHFZ'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Sign-in Configuration
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (user) => {
    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    // If user data does not exists
    // create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = user;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (err) {
            console.log(`error creating user: ${err.message}`);
        }
    }

    return userDocRef;
};
