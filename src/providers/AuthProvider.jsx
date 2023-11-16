import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()

    const creatUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log("current user", currentUser);
            if (currentUser) {
                // set token
                const loggedUser = { email: currentUser.email }
                axiosPublic.post('/jwt', loggedUser)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else {
                // remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    }, [auth, axiosPublic])


    const authInfo = {
        user,
        loading,
        creatUser,
        logIn,
        logOut,
        googleLogin,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;