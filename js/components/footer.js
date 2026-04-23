class InkmeldFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-accent" aria-hidden="true"></div>
        <div class="footer-glow footer-glow--cyan" aria-hidden="true"></div>
        <div class="footer-glow footer-glow--violet" aria-hidden="true"></div>

        <div class="container footer-shell">

          <div class="footer-hero">
            <div class="footer-hero-copy">
              <a href="/" class="footer-brand-row" aria-label="InkMeld home">
                <span class="footer-brand-mark">
                  <img src="/assets/logo-launcher-256.png" alt="" width="256" height="256" decoding="async">
                </span>
                <span class="footer-brand-text">
                  <strong>InkMeld</strong>
                  <small>AI tattoo preview from the future</small>
                </span>
              </a>
              <p class="footer-tagline">
                See the ink before the needle. Import anything, isolate it with AI, place it on your body photo, and tune the realism until it feels inevitable.
              </p>
            </div>

            <div class="footer-hero-stores" aria-label="Download InkMeld">
              <span class="footer-stores-eyebrow">Download the app</span>
              <div class="footer-store-row">
                <a href="#" class="store-badge store-badge--apple" aria-label="Download InkMeld on the App Store">
                  <span class="store-badge__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 29" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M20.15 15.28c-.03-3.32 2.72-4.92 2.85-5-1.56-2.28-3.99-2.59-4.86-2.63-2.07-.21-4.03 1.22-5.08 1.22-1.04 0-2.66-1.19-4.37-1.16C6.3 7.75 3.96 9.04 2.71 11.18c-2.55 4.42-.65 10.96 1.83 14.54 1.22 1.75 2.67 3.72 4.57 3.65 1.84-.07 2.53-1.19 4.75-1.19s2.84 1.19 4.77 1.15c1.97-.04 3.22-1.78 4.42-3.55 1.41-2.02 1.98-3.99 2.01-4.09-.04-.02-3.88-1.49-3.91-5.41zM16.77 4.96c1-1.22 1.68-2.9 1.49-4.59-1.44.06-3.21.97-4.25 2.16-.92 1.07-1.74 2.79-1.52 4.43 1.61.12 3.26-.82 4.28-2z"/>
                    </svg>
                  </span>
                  <span class="store-badge__text">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </a>

                <a href="#" class="store-badge store-badge--google" aria-label="Get InkMeld on Google Play">
                  <span class="store-badge__icon" aria-hidden="true">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#00E0FF" d="M325.3 234.3 104.6 12.1c-1.3-1.3-3.3.1-2.8 1.9l.2.6 193.2 334.5 30.1-114.8z"/>
                      <path fill="#FFBC00" d="m410.9 204.4-85.6 30-30.1 114.8 146.1-119.7c16.4-13.4 16.4-38.5-.3-51.8l-30.1 26.7z"/>
                      <path fill="#FF3A44" d="M295.2 349.2 101.9 12.6c-.4-1.8-1.8-3.1-3.7-3.5-3.9-.7-7.6 1.4-9.2 5l206.4 355.3-.2-20.2z"/>
                      <path fill="#00F076" d="M88.9 14.1c-1.4 2-2 4.3-1.9 6.6v470.6c0 2.4.7 4.7 2.1 6.7l206.4-354.8L88.9 14.1z"/>
                    </svg>
                  </span>
                  <span class="store-badge__text">
                    <small>Get it on</small>
                    <strong>Google Play</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div class="footer-divider" aria-hidden="true"></div>

          <nav class="footer-columns" aria-label="Footer navigation">
            <div class="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="/#experience">Experience</a></li>
                <li><a href="/#showcase">The App</a></li>
                <li><a href="/#studio">Ink Studio</a></li>
                <li><a href="/#workflow">Workflow</a></li>
                <li><a href="/#plans">Plans</a></li>
                <li><a href="/#future">Roadmap</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="/#use-cases">For artists</a></li>
                <li><a href="/#use-cases">For studios</a></li>
                <li><a href="/#faq">FAQ</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="/support">Support Hub</a></li>
                <li><a href="mailto:hello@oakdev.app">hello@oakdev.app</a></li>
                <li><a href="/delete-account">Delete account</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </nav>

          <div class="footer-bar">
            <span class="footer-bar-copyright">&copy; ${year} InkMeld — a product by OakDev &amp; AI AB. All rights reserved.</span>
            <span class="footer-bar-meta">
              <span class="footer-status"><span class="footer-status-dot"></span> Studio online</span>
              <a href="mailto:hello@oakdev.app">hello@oakdev.app</a>
            </span>
          </div>

        </div>
      </footer>
    `;
  }
}

customElements.define('inkmeld-footer', InkmeldFooter);
