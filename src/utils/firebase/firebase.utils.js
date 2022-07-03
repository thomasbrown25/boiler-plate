import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();

export const db = getFirestore();

export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const createUserDocumentFromAuth = async (
    user,
    additionalInformation = {}
) => {
    if (!user) return;

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
                createdAt,
                ...additionalInformation
            });
        } catch (err) {
            console.log(`error creating user: ${err.message}`);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
