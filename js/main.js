document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // ─── Scroll Progress Bar ──────────────────────────────────
  const progressBar = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll <= 0 ? 0 : (scrollTop / maxScroll) * 100;
    progressBar.style.width = `${pct}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
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
