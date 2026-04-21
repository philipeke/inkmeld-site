import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js';

const firebaseConfig = {
  projectId: 'inkmeld-ai'
};

const requiredKeys = ['apiKey', 'appId', 'authDomain', 'messagingSenderId'];
const hasUsableConfig = requiredKeys.every((key) => Boolean(firebaseConfig[key]));

let app = null;
let analytics = null;

if (hasUsableConfig) {
  try {
    app = initializeApp(firebaseConfig);

    isSupported()
      .then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      })
      .catch(() => {
        analytics = null;
      });
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.info('Firebase analytics skipped: config is still placeholder-only.');
}

export { app, analytics };
