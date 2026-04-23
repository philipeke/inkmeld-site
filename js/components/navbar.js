class InkmeldNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="site-nav-wrap">
        <a class="skip-link" href="#main-content">Skip to content</a>
        <nav class="site-nav" aria-label="Primary">
          <a href="/" class="nav-brand" aria-label="InkMeld home">
            <span class="nav-brand-mark">
              <img src="/assets/logo-launcher-256.png" alt="InkMeld logo" width="256" height="256" decoding="async">
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
              <a href="/#experience" data-nav-key="experience">Overview</a>
              <a href="/#showcase" data-nav-key="showcase">The App</a>
              <a href="/#features" data-nav-key="features">Features</a>
              <a href="/#plans" data-nav-key="plans">Plans</a>
              <a href="/#faq" data-nav-key="faq">FAQ</a>
              <a href="/support" data-nav-key="support">Support</a>
            </div>

            <div class="nav-actions">
              <a class="nav-cta" href="/#get-app">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v14"/><path d="m6 11 6 6 6-6"/><path d="M5 21h14"/></svg>
                <span>Get the app</span>
              </a>
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
    let lastScrolledState = null;
    let scrollTicking = false;

    const closeMenu = () => {
      document.body.classList.remove('nav-open');
      toggle?.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      document.body.classList.add('nav-open');
      toggle?.setAttribute('aria-expanded', 'true');
    };

    const applyScrolled = () => {
      if (!nav) return;
      const isScrolled = window.scrollY > 12;
      if (isScrolled === lastScrolledState) return;
      lastScrolledState = isScrolled;
      nav.classList.toggle('is-scrolled', isScrolled);
    };

    const updateScrolled = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        scrollTicking = false;
        applyScrolled();
      });
    };

    const setActive = (key) => {
      links.forEach((link) => {
        const active = link.dataset.navKey === key;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const updateActiveLink = () => {
      if (path === '/support') {
        setActive('support');
        return;
      }

      if (path !== '/' && path !== '/index.html') {
        setActive(null);
        return;
      }

      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActive(hash);
        return;
      }

      setActive('experience');
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

    applyScrolled();
    updateActiveLink();

    if (path === '/' || path === '/index.html') {
      const observedSections = ['experience', 'showcase', 'features', 'plans', 'faq']
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (observedSections.length > 0) {
        const sectionObserver = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id && !window.location.hash) {
              setActive(visible.target.id);
            }
          },
          {
            rootMargin: '-20% 0px -55% 0px',
            threshold: [0.2, 0.4, 0.6]
          }
        );

        observedSections.forEach((section) => sectionObserver.observe(section));
      }
    }
  }
}

customElements.define('inkmeld-navbar', InkmeldNavbar);
