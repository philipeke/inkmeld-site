class InkmeldFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="panel footer-panel">
            <div class="footer-grid">
              <div class="footer-brand">
                <div class="footer-kicker">
                  <span>InkMeld signal</span>
                  <span>Built for intentional ink</span>
                </div>

                <a href="/" class="nav-brand" aria-label="InkMeld home">
                  <span class="nav-brand-mark">
                    <img src="/assets/logo-launcher-256.png" alt="InkMeld logo" width="256" height="256" decoding="async">
                  </span>
                  <span class="nav-brand-copy">
                    <span>InkMeld</span>
                    <small>AI tattoo preview</small>
                  </span>
                </a>

                <p class="footer-copy">
                  Import the image. Isolate the exact object. Place it on your body photo. Shape it until it feels real.
                  That is the InkMeld loop.
                </p>
              </div>

              <div class="footer-column">
                <h3>Product</h3>
                <a href="/#experience">Experience</a>
                <a href="/#workflow">Workflow</a>
                <a href="/#studio">Studio</a>
                <a href="/#faq">FAQ</a>
              </div>

              <div class="footer-column">
                <h3>Support + Legal</h3>
                <a href="/support">Support Hub</a>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/cookies">Cookies</a>
                <a href="/delete-account">Delete Account</a>
              </div>
            </div>

            <div class="footer-bottom">
              <span>&copy; ${year} InkMeld / OakDev & AI AB. All rights reserved.</span>
              <a href="mailto:support@inkmeld.ai">support@inkmeld.ai</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('inkmeld-footer', InkmeldFooter);
