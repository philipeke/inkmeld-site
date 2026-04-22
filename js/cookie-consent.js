(function () {
  const STORAGE_KEY = 'inkmeld-cookie-consent';
  const ACCEPT_ALL = 'all';
  const ONLY_NECESSARY = 'necessary';

  function readConsent() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeConsent(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      return;
    }
  }

  function emitConsent(value) {
    window.dispatchEvent(
      new CustomEvent('inkmeld:cookie-consent-changed', {
        detail: { value }
      })
    );
  }

  function removeBanner(banner) {
    banner.classList.remove('is-visible');
    banner.classList.add('is-closing');
    window.setTimeout(() => {
      banner.remove();
    }, 340);
  }

  function saveConsent(value, banner) {
    storeConsent(value);
    emitConsent(value);
    removeBanner(banner);
  }

  function buildBanner() {
    if (document.querySelector('[data-cookie-consent]')) return;

    const banner = document.createElement('aside');
    banner.className = 'cookie-consent';
    banner.setAttribute('data-cookie-consent', '');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie preferences');

    banner.innerHTML = `
      <div class="cookie-consent__inner">
        <div class="cookie-consent__copy">
          <span class="cookie-consent__eyebrow">Cookie notice</span>
          <h2 class="cookie-consent__title">A few cookies keep InkMeld sharp.</h2>
          <p class="cookie-consent__text">
            We use necessary cookies and similar storage to keep the site secure and working. If you accept all, we may also
            use optional analytics when enabled to understand traffic and improve the experience.
          </p>
          <p class="cookie-consent__links">
            <span>Read more:</span>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
          </p>
        </div>

        <div class="cookie-consent__actions">
          <button type="button" class="btn-secondary" data-cookie-consent-necessary>Only necessary</button>
          <button type="button" class="btn-primary" data-cookie-consent-accept>Accept all</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    const necessaryButton = banner.querySelector('[data-cookie-consent-necessary]');
    const acceptButton = banner.querySelector('[data-cookie-consent-accept]');

    necessaryButton?.addEventListener('click', () => {
      saveConsent(ONLY_NECESSARY, banner);
    });

    acceptButton?.addEventListener('click', () => {
      saveConsent(ACCEPT_ALL, banner);
    });

    window.requestAnimationFrame(() => {
      banner.classList.add('is-visible');
    });
  }

  function initCookieConsent() {
    if (readConsent()) return;
    buildBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent, { once: true });
  } else {
    initCookieConsent();
  }
})();
