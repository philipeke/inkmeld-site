document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // Canvas particle system removed for performance.

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

  // ─── Ink Studio Presets ───────────────────────────────────
  const studioPresets = {
    classic_black: {
      preset: 'Classic Black',
      tone: 'Dense / grounded',
      blend: 'Multiply',
      opacity: '92%',
      softness: '1.3',
      blur: '0.3',
      highlight: '10%',
      reality: '58%',
      description: 'Strong multiply blend, near-maximum opacity, slight softness, and controlled shadow for a convincing black ink look with enough depth to feel settled into skin.',
      meters: {
        contrast: { width: '64%', text: '115%' },
        skinBlend: { width: '58%', text: '58%' },
        shadow: { width: '24%', text: '24%' },
        grain: { width: '12%', text: '12%' }
      }
    },
    soft_ink: {
      preset: 'Soft Ink',
      tone: 'Subtle / atmospheric',
      blend: 'Soft Light',
      opacity: '82%',
      softness: '2.4',
      blur: '0.6',
      highlight: '14%',
      reality: '70%',
      description: 'More diffused edges, lighter density, and a higher skin blend let the artwork feel older, softer, and more naturally fused into the body.',
      meters: {
        contrast: { width: '52%', text: '102%' },
        skinBlend: { width: '70%', text: '70%' },
        shadow: { width: '18%', text: '18%' },
        grain: { width: '20%', text: '20%' }
      }
    },
    neon_future: {
      preset: 'Neon Future',
      tone: 'Charged / synthetic',
      blend: 'Screen',
      opacity: '72%',
      softness: '1.8',
      blur: '0.35',
      highlight: '28%',
      reality: '45%',
      description: 'High saturation, luminous tint behavior, and stronger highlight response push the preview toward a cybernetic ink aesthetic without losing structure.',
      meters: {
        contrast: { width: '68%', text: '120%' },
        skinBlend: { width: '45%', text: '45%' },
        shadow: { width: '12%', text: '12%' },
        grain: { width: '10%', text: '10%' }
      }
    },
    etched_metal: {
      preset: 'Etched Metal',
      tone: 'Sharp / reflective',
      blend: 'Hard Light',
      opacity: '86%',
      softness: '0.9',
      blur: '0.15',
      highlight: '22%',
      reality: '42%',
      description: 'Hard light blending with tighter edges and a cooler tint makes the preview feel cut, polished, and almost metallic while still hugging the underlying form.',
      meters: {
        contrast: { width: '72%', text: '128%' },
        skinBlend: { width: '42%', text: '42%' },
        shadow: { width: '30%', text: '30%' },
        grain: { width: '8%', text: '8%' }
      }
    }
  };

  const studioButtons = document.querySelectorAll('[data-studio-mode]');
  const studioFields = {
    preset: document.querySelector('[data-studio-preset]'),
    tone: document.querySelector('[data-studio-tone]'),
    blend: document.querySelector('[data-studio-blend]'),
    opacity: document.querySelector('[data-studio-opacity]'),
    softness: document.querySelector('[data-studio-softness]'),
    blur: document.querySelector('[data-studio-blur]'),
    highlight: document.querySelector('[data-studio-highlight]'),
    reality: document.querySelector('[data-studio-reality]'),
    description: document.querySelector('[data-studio-description]')
  };

  const meterText = {
    contrast: document.querySelector('[data-meter-text="contrast"]'),
    skinBlend: document.querySelector('[data-meter-text="skinBlend"]'),
    shadow: document.querySelector('[data-meter-text="shadow"]'),
    grain: document.querySelector('[data-meter-text="grain"]')
  };

  const meterFills = {
    contrast: document.querySelector('[data-meter-fill="contrast"]'),
    skinBlend: document.querySelector('[data-meter-fill="skinBlend"]'),
    shadow: document.querySelector('[data-meter-fill="shadow"]'),
    grain: document.querySelector('[data-meter-fill="grain"]')
  };

  const applyStudioPreset = (key) => {
    const preset = studioPresets[key];
    if (!preset) return;

    studioButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.studioMode === key);
    });

    studioFields.preset && (studioFields.preset.textContent = preset.preset);
    studioFields.tone && (studioFields.tone.textContent = preset.tone);
    studioFields.blend && (studioFields.blend.textContent = preset.blend);
    studioFields.opacity && (studioFields.opacity.textContent = preset.opacity);
    studioFields.softness && (studioFields.softness.textContent = preset.softness);
    studioFields.blur && (studioFields.blur.textContent = preset.blur);
    studioFields.highlight && (studioFields.highlight.textContent = preset.highlight);
    studioFields.reality && (studioFields.reality.textContent = preset.reality);
    studioFields.description && (studioFields.description.textContent = preset.description);

    Object.entries(preset.meters).forEach(([name, meter]) => {
      if (meterText[name]) meterText[name].textContent = meter.text;
      if (meterFills[name]) meterFills[name].style.setProperty('--meter-width', meter.width);
    });
  };

  studioButtons.forEach(btn => {
    btn.addEventListener('click', () => applyStudioPreset(btn.dataset.studioMode));
  });

  applyStudioPreset('classic_black');

  // ─── Reality Slider ───────────────────────────────────────
  const realitySlider = document.querySelector('[data-reality-slider]');
  const realityValue = document.querySelector('[data-reality-value]');
  const simulatedImage = document.querySelector('[data-simulated-image]');

  if (realitySlider && realityValue && simulatedImage) {
    const updateSim = () => {
      const v = Number(realitySlider.value);
      simulatedImage.style.opacity = String(Math.max(0.06, v / 100));
      realityValue.textContent = `${v}%`;
    };
    realitySlider.addEventListener('input', updateSim);
    updateSim();
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
