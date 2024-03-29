import "@/styles/globals.css";

import { initializeApp } from "firebase/app";
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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}