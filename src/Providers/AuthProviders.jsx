import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../configs/firebase.config";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const emailPassResister = (email, password) => {
    // setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailPassLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const firebaseLogOut = () => {
    // setLoading(true);
    return signOut(auth);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const userEmail = user?.email || currentUser?.email;
      const loggedUser = { email: userEmail };
      if (currentUser) {
        axios.post("/access-token", loggedUser).then((res) => {
          console.log(res?.data);
        });
      } else {
        axios.post("/remove-access-token", loggedUser).then((res) => {
          console.log(res?.data);
        });
      }
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [axios, user?.email]);
  const authInfo = {
    emailPassResister,
    emailPassLogin,
    user,
    firebaseLogOut,
    googleLogin,
    loading,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
