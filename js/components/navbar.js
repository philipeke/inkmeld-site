class InkmeldNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="site-nav-wrap">
        <nav class="site-nav" aria-label="Primary">
          <a href="/" class="nav-brand" aria-label="InkMeld home">
            <span class="nav-brand-mark">
              <img src="/assets/logo-launcher-256.png" alt="InkMeld logo">
            </span>
            <span class="nav-brand-copy">
              <span>InkMeld</span>
              <small>AI tattoo preview</small>
            </span>
          </a>

          <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open navigation">
            <span></span>
          </button>

          <div class="nav-panel">
            <div class="nav-links">
              <a href="/#experience" data-nav-key="experience">Experience</a>
              <a href="/#studio" data-nav-key="studio">Studio</a>
              <a href="/#faq" data-nav-key="faq">FAQ</a>
              <a href="/support" data-nav-key="support">Support</a>
            </div>

            <div class="nav-actions">
              <a class="btn-ghost" href="mailto:support@inkmeld.ai?subject=InkMeld%20Access">Get Access</a>
            </div>
          </div>
        </nav>
      </div>
    `;

    const nav = this.querySelector('.site-nav');
    const toggle = this.querySelector('.nav-toggle');
    const panel = this.querySelector('.nav-panel');
    const links = Array.from(this.querySelectorAll('.nav-links a'));
    const path = window.location.pathname.replace(/\/$/, '') || '/';

    const closeMenu = () => {
      document.body.classList.remove('nav-open');
      toggle?.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      document.body.classList.add('nav-open');
      toggle?.setAttribute('aria-expanded', 'true');
    };

    const updateScrolled = () => {
      if (!nav) return;
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    const updateActiveLink = () => {
      links.forEach((link) => link.classList.remove('is-active'));

      if (path === '/support') {
        this.querySelector('[data-nav-key="support"]')?.classList.add('is-active');
        return;
      }

      if (path !== '/' && path !== '/index.html') {
        return;
      }

      const hash = window.location.hash.replace('#', '');
      if (hash) {
        this.querySelector(`[data-nav-key="${hash}"]`)?.classList.add('is-active');
      }
    };

    toggle?.addEventListener('click', () => {
      if (document.body.classList.contains('nav-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    window.addEventListener('scroll', updateScrolled, { passive: true });
    window.addEventListener('hashchange', updateActiveLink);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });

    panel?.addEventListener('click', (event) => {
      if (event.target === panel) {
        closeMenu();
      }
    });

    updateScrolled();
    updateActiveLink();
  }
}

customElements.define('inkmeld-navbar', InkmeldNavbar);
