const firebaseConfig = {
  projectId: 'inkmeld-ai'
};

const requiredKeys = ['apiKey', 'appId', 'authDomain', 'messagingSenderId'];
const hasUsableConfig = requiredKeys.every((key) => Boolean(firebaseConfig[key]));
const COOKIE_CONSENT_KEY = 'inkmeld-cookie-consent';
const COOKIE_CONSENT_ACCEPTED = 'all';

let app = null;
let analytics = null;
let initStarted = false;

function readCookieConsent() {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    return null;
  }
}

function hasAnalyticsConsent() {
  return readCookieConsent() === COOKIE_CONSENT_ACCEPTED;
}

async function initFirebase() {
  if (initStarted) return;

  if (!hasUsableConfig) {
    console.info('Firebase analytics skipped: config is still placeholder-only.');
    return;
  }

  if (!hasAnalyticsConsent()) {
    return;
  }

  initStarted = true;

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
    initStarted = false;
    console.error('Firebase initialization failed:', error);
  }
}

if (hasAnalyticsConsent()) {
  initFirebase();
}

window.addEventListener('inkmeld:cookie-consent-changed', (event) => {
  if (event.detail?.value === COOKIE_CONSENT_ACCEPTED) {
    initFirebase();
  }
});

export { app, analytics };
