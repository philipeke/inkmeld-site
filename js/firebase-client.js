const firebaseConfig = {
  projectId: 'inkmeld-ai'
};

const requiredKeys = ['apiKey', 'appId', 'authDomain', 'messagingSenderId'];
const hasUsableConfig = requiredKeys.every((key) => Boolean(firebaseConfig[key]));

let app = null;
let analytics = null;

async function initFirebase() {
  if (!hasUsableConfig) {
    console.info('Firebase analytics skipped: config is still placeholder-only.');
    return;
  }

  try {
    const [{ initializeApp }, analyticsModule] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js')
    ]);

    app = initializeApp(firebaseConfig);

    const supported = await analyticsModule.isSupported();
    if (supported) {
      analytics = analyticsModule.getAnalytics(app);
    }
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
}

initFirebase();

export { app, analytics };
