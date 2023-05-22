import React, { createContext, useEffect, useState } from "react";
import app from "../../firebase_base_cofig/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const setProfile = profile => {
    return updateProfile(auth.currentUser, profile);
  };

  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const forgatPassword = userEmailForForgetPassword => {
    return sendPasswordResetEmail(auth, userEmailForForgetPassword);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("omarToken");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubcribe;
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    signUpUser,
    loginUser,
    setProfile,
    emailVerification,
    forgatPassword,
    logOut
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
