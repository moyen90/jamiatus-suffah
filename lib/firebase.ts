import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAiMC8RyRcdwR5bSwkey_tnklNEofq27rM",
    authDomain: "jamiatussuffah.firebaseapp.com",
    projectId: "jamiatussuffah",
    storageBucket: "jamiatussuffah.firebasestorage.app",
    messagingSenderId: "152566316658",
    appId: "1:152566316658:web:4c0c8dca1cba9963b14ceb",
    measurementId: "G-6Q13XWTG4P"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Analytics is only supported in the browser
const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, auth, googleProvider, analytics };
