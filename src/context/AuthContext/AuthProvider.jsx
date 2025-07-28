import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../FireBase/FireBase.init';
import toast from 'react-hot-toast';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }


    // 🔐 Fired user check logic
 useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser?.email) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/users/email/${currentUser.email}`);
      const dbUser = res.data;

      console.log("✅ MongoDB user:", dbUser);

      const isFired = dbUser?.ifFired === true || dbUser?.ifFired === 'true';

      if (isFired) {
        toast.error("🚫 You are fired and cannot log in.");
        await signOut(auth);
        setUser(null);
      } else {
        setUser(currentUser);
      }
    } catch (err) {
      console.error("❌ Failed to fetch user:", err);
    //   toast.error("Error checking user status. Allowing login temporarily.");
      setUser(currentUser);
    } finally {
      setLoading(false);
    }
  });

  return () => unSubscribe();
}, []);


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut,
        
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;