class InkmeldFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-inner">

            <!-- Brand + Store buttons -->
            <div class="footer-brand">
              <a href="/" class="nav-brand" aria-label="InkMeld home">
                <span class="nav-brand-mark">
                  <img src="/assets/logo-launcher-256.png" alt="InkMeld" width="256" height="256" decoding="async">
                </span>
                <span class="nav-brand-copy">
                  <span>InkMeld</span>
                  <small>AI tattoo preview</small>
                </span>
              </a>

              <p class="footer-copy">
                The most advanced tattoo preview system on the planet. Import any image, isolate the motif with AI, place it on your body photo, and dial in realism with studio-grade controls — before any permanent decision is made.
              </p>

              <div class="store-row">
                <a href="#" class="store-btn" aria-label="Download InkMeld on the App Store">
                  <span class="store-btn__icon">
                    <svg width="22" height="26" viewBox="0 0 24 29" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.15 15.28c-.03-3.32 2.72-4.92 2.85-5-1.56-2.28-3.99-2.59-4.86-2.63-2.07-.21-4.03 1.22-5.08 1.22-1.04 0-2.66-1.19-4.37-1.16C6.3 7.75 3.96 9.04 2.71 11.18c-2.55 4.42-.65 10.96 1.83 14.54 1.22 1.75 2.67 3.72 4.57 3.65 1.84-.07 2.53-1.19 4.75-1.19s2.84 1.19 4.77 1.15c1.97-.04 3.22-1.78 4.42-3.55 1.41-2.02 1.98-3.99 2.01-4.09-.04-.02-3.88-1.49-3.91-5.41zM16.77 4.96c1-1.22 1.68-2.9 1.49-4.59-1.44.06-3.21.97-4.25 2.16-.92 1.07-1.74 2.79-1.52 4.43 1.61.12 3.26-.82 4.28-2z"/>
                    </svg>
                  </span>
                  <span class="store-btn__text">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </a>

                <a href="#" class="store-btn" aria-label="Get InkMeld on Google Play">
                  <span class="store-btn__icon">
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M1.5 0.75L13.5 12L1.5 23.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1.5 0.75L20 10.5C21.1667 11.1667 21.1667 12.8333 20 13.5L1.5 23.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1.5 0.75L12 11.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                      <path d="M1.5 23.25L12 12.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                  </span>
                  <span class="store-btn__text">
                    <small>Get it on</small>
                    <strong>Google Play</strong>
                  </span>
                </a>
              </div>
            </div>

            <!-- Navigation links -->
            <nav class="footer-links" aria-label="Footer navigation">
              <div class="footer-col">
                <h4>Product</h4>
                <a href="/#experience">Experience</a>
                <a href="/#showcase">The App</a>
                <a href="/#studio">Ink Studio</a>
                <a href="/#workflow">Workflow</a>
                <a href="/#plans">Plans</a>
                <a href="/#future">Roadmap</a>
                <a href="/#faq">FAQ</a>
              </div>

              <div class="footer-col">
                <h4>Support</h4>
                <a href="/support">Support Hub</a>
                <a href="mailto:support@inkmeld.ai">Contact Us</a>
              </div>

              <div class="footer-col">
                <h4>Legal</h4>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/cookies">Cookie Policy</a>
                <a href="/delete-account">Delete Account</a>
              </div>
            </nav>

          </div>

          <div class="footer-bottom">
            <span>&copy; ${year} InkMeld / OakDev &amp; AI AB. All rights reserved.</span>
            <a href="mailto:support@inkmeld.ai">support@inkmeld.ai</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('inkmeld-footer', InkmeldFooter);
