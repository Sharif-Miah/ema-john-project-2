import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app)

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, currentUser => {
            console.log('This is current user', currentUser);
            setUser(currentUser)
            setLoading(false)

        })
        return () => unSubcribe()
    }, [])

    const authInfo = { user, loading, signUpUser, loginUser, logOut }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;