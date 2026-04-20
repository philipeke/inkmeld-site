// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// TODO: Replace with actual Firebase config from Firebase Console that matches inkmeld-ai
const firebaseConfig = {
  // Using standard placeholder structure mapped to your project
  projectId: "inkmeld-ai",
  // Ensure you add apiKey, appId, etc once available
  // apiKey: "API_KEY",
  // authDomain: "inkmeld-ai.firebaseapp.com",
  // storageBucket: "inkmeld-ai.appspot.com",
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
  // measurementId: "G-MEASUREMENT_ID"
};

// Initialize Firebase
let app;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  console.log("🔥 Firebase Initialized successfully");
} catch (error) {
  console.error("🔥 Firebase initialization error (check config):", error);
}

export { app, analytics };
