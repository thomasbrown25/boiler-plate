import { createContext, useState, useEffect } from 'react';

import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            // This will create a new user document in firebase if the user doesn't already exists, which can happen when signing in with Google
            if (user) createUserDocumentFromAuth(user);

            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
