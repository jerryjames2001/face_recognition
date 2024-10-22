import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { db, auth } from "../firebase/firebase";  // Import Firestore instance
import { doc, setDoc, getDoc } from "firebase/firestore";  // Firestore methods for document operations
import toast, { Toaster } from "react-hot-toast";

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track if auth state is loading
  const [authError, setAuthError] = useState(null); // Track auth-related errors
  const navigate = useNavigate();

  // Handle the authentication state on app load and reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch the user's role from Firestore
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ ...user, role: userDoc.data().role, username: userDoc.data().username, name: userDoc.data().name });
        } else {
          // Fallback if user doesn't have role defined, defaults to 'user'
          setCurrentUser({ ...user, role: 'user' });
        }
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false); // Set loading state to false when auth is determined
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Sign Up Function with Firestore integration
  const signUp = async (name, username, email, password, role = 'user') => {
    setAuthError(null); // Clear previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add the user's data to Firestore
      await setDoc(doc(db, "Users", user.uid), {
        name: name,
        username: username,
        uid: user.uid,
        email: user.email,
        role: role, // Assign default role 'user' or 'admin'
        createdAt: new Date().toISOString(),
      });

      // setCurrentUser({ ...user, role: role });
      setCurrentUser(null);
      setIsAuthenticated(false); // Set auth state to false to prevent auto-login
      toast.success('Sign up successful!');
      toast.success('Please wait for admin approval',{duration: 5000});
      navigate("/"); // Redirect after successful signup
    } catch (error) {
      setAuthError(error.message); // Set the error message
    }
  };

  // Sign In Function
  const signIn = async (email, password) => {
    setAuthError(null); // Clear previous errors
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
          const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ ...user, role: userDoc.data().role });
        } else {
          setCurrentUser({ ...user, role: 'user' });
        }
        setIsAuthenticated(true);
        if(userDoc.data().role === "admin") {
          navigate("/dashboard")
        } else {
          navigate("/profile"); // Redirect to profile page for regular users
        }
    } catch (error) {
      setAuthError(error.message); // Set the error message
    }
  };

  // Sign Out Function
  const signOutUser = async () => {
    setAuthError(null); // Clear previous errors
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsAuthenticated(false);
      navigate("/login"); // Redirect after successful sign-out
    } catch (error) {
      setAuthError(error.message); // Handle sign-out errors
    }
  };

  const value = {
    currentUser,
    signUp,     // Provide sign-up function
    signIn,     // Provide sign-in function
    signOut: signOutUser,  // Provide sign-out function
    isAuthenticated,
    isLoading,
    authError,  // Expose auth errors for handling in UI
  };

  // console.log(value); to see the working of the user auth in the console

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div>Loading...</div> : children} {/* Show loading indicator */}
      <Toaster position="top-center" /> {/* Toast notifications */}
    </AuthContext.Provider>
  );
};
