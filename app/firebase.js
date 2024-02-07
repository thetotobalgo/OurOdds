// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaQjgsdfOdeSjttnHHWwMyEiIAdtJ6woU",
  authDomain: "ourodds-b69a8.firebaseapp.com",
  projectId: "ourodds-b69a8",
  storageBucket: "ourodds-b69a8.appspot.com",
  messagingSenderId: "822315156745",
  appId: "1:822315156745:web:cd7ec123d9a9d5dcd53fd8",
  measurementId: "G-NHLL992MGV"
};

// Initialize Firebase
const app = getApps().length ? getApp(): initializeApp(firebaseConfig)
const auth = getAuth();

export { app, auth };
