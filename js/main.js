document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const rafThrottle = (fn) => {
    let scheduled = false;

    return () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        fn();
      });
    };
  };

  // ─── Scroll Progress Bar ──────────────────────────────────
  const progressBar = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll <= 0 ? 0 : Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    progressBar.style.transform = `scaleX(${progress})`;
  };
  const syncProgress = rafThrottle(updateProgress);
  window.addEventListener('scroll', syncProgress, { passive: true });
  window.addEventListener('resize', syncProgress);
  updateProgress();

  // ─── Reveal on Scroll ────────────────────────────────────
  const revealItems = document.querySelectorAll('.reveal');
  const countItems = document.querySelectorAll('[data-count]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.hasAttribute('data-count')) animateCount(entry.target);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  if (reduceMotion) {
    revealItems.forEach(item => item.classList.add('is-visible'));
    countItems.forEach(item => {
      const val = item.getAttribute('data-count');
      if (val) item.textContent = val;
    });
  } else {
    revealItems.forEach(item => revealObserver.observe(item));
    countItems.forEach(item => revealObserver.observe(item));
  }

  // ─── Count Animation ─────────────────────────────────────
  const motionRoots = document.querySelectorAll(
    '.hero-section, .showcase-section, #workflow, #features, .brand-cinema-section, #use-cases, #plans, #faq, #get-app'
  );

  if (!reduceMotion && motionRoots.length > 0) {
    const motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('perf-paused', !entry.isIntersecting);
        });
      },
      { threshold: 0.01, rootMargin: '35% 0px 35% 0px' }
    );

    motionRoots.forEach((root) => motionObserver.observe(root));
  }

  function animateCount(el) {
    const target = Number(el.getAttribute('data-count'));
    if (!target || el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';
    const startTime = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    };

    requestAnimationFrame(tick);
  }

  // ─── 3D Tilt Effect ──────────────────────────────────────
  if (!reduceMotion && finePointer) {
    document.querySelectorAll('[data-tilt]').forEach(item => {
      item.addEventListener('pointermove', (e) => {
        const rect = item.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const ry = (px - 0.5) * 9;
        const rx = (0.5 - py) * 9;
        item.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        item.style.setProperty('--pointer-x', `${px * 100}%`);
        item.style.setProperty('--pointer-y', `${py * 100}%`);
      });

      item.addEventListener('pointerleave', () => {
        item.style.transform = '';
        item.style.removeProperty('--pointer-x');
        item.style.removeProperty('--pointer-y');
      });
    });
  }

  // ─── Pointer glow for holo cards ─────────────────────────
  if (!reduceMotion && finePointer) {
    document.querySelectorAll('.holo-card').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty('--pointer-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--pointer-x');
        card.style.removeProperty('--pointer-y');
      });
    });
  }

  // ─── Live Demo (interactive showcase) ─────────────────────
  const liveDemo = document.querySelector('[data-live-demo]');
  if (liveDemo) {
    const formatters = {
      opacity: v => `${v}%`,
      strength: v => `${v}%`,
      saturation: v => `${v}%`,
      brightness: v => `${v}%`,
      contrast: v => `${v}%`,
      hue: v => `${v}°`,
    };

    const sliders = liveDemo.querySelectorAll('input[type="range"][data-control]');
    sliders.forEach(input => {
      const key = input.dataset.control;
      const valueEl = liveDemo.querySelector(`[data-value="${key}"]`);
      const fmt = formatters[key] || (v => v);

      const update = () => {
        liveDemo.style.setProperty(`--${key}`, input.value);
        if (valueEl) valueEl.textContent = fmt(input.value);
      };
      input.addEventListener('input', update);
      update();
    });

    // Presets — apply a coordinated set of values across sliders
    const presets = {
      pulse:  { opacity: 90, strength: 95, saturation: 130, hue: -20, brightness: 105, contrast: 115 },
      violet: { opacity: 72, strength: 88, saturation: 100, hue: 0,   brightness: 100, contrast: 100 },
      hex:    { opacity: 55, strength: 70, saturation: 80,  hue: 30,  brightness: 110, contrast: 95 },
    };

    const presetButtons = liveDemo.querySelectorAll('[data-preset]');
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const config = presets[btn.dataset.preset];
        if (!config) return;
        presetButtons.forEach(b => b.classList.toggle('is-active', b === btn));
        Object.entries(config).forEach(([key, value]) => {
          const input = liveDemo.querySelector(`input[data-control="${key}"]`);
          if (!input) return;
          input.value = value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        });
      });
    });

    // Blend mode buttons
    const blendButtons = liveDemo.querySelectorAll('[data-blend]');
    const blendLabel = liveDemo.querySelector('[data-blend-label]');
    blendButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        blendButtons.forEach(b => b.classList.toggle('is-active', b === btn));
        if (blendLabel) blendLabel.textContent = btn.textContent.trim();
      });
    });
  }

  // ─── Delete Account Form ──────────────────────────────────
  const deleteForm = document.querySelector('[data-delete-form]');
  if (deleteForm) {
    deleteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = deleteForm.querySelector('[data-delete-email]');
      const email = emailInput?.value?.trim();
      if (!email) { emailInput?.focus(); return; }
      const subject = encodeURIComponent('Delete InkMeld account');
      const body = encodeURIComponent(`Please permanently delete my InkMeld account.\n\nRegistered email: ${email}\n\nThank you.`);
      window.location.href = `mailto:hello@oakdev.app?subject=${subject}&body=${body}`;
    });
  }
});
