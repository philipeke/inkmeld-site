document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');

  const revealItems = document.querySelectorAll('.reveal');
  const countItems = document.querySelectorAll('[data-count]');
  const progressBar = document.querySelector('.scroll-progress');
  const tiltItems = document.querySelectorAll('[data-tilt]');
  const studioButtons = document.querySelectorAll('[data-studio-mode]');
  const deleteForm = document.querySelector('[data-delete-form]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

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
      description:
        'Strong multiply blend, near-maximum opacity, slight softness, and controlled shadow for a convincing black ink look with enough depth to feel settled into skin.',
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
      description:
        'More diffused edges, lighter density, and a higher skin blend let the artwork feel older, softer, and more naturally fused into the body.',
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
      description:
        'High saturation, luminous tint behavior, and stronger highlight response push the preview toward a cybernetic ink aesthetic without losing structure.',
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
      description:
        'Hard light blending with tighter edges and a cooler tint makes the preview feel cut, polished, and almost metallic while still hugging the underlying form.',
      meters: {
        contrast: { width: '72%', text: '128%' },
        skinBlend: { width: '42%', text: '42%' },
        shadow: { width: '30%', text: '30%' },
        grain: { width: '8%', text: '8%' }
      }
    }
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');

        if (entry.target.hasAttribute('data-count')) {
          animateCount(entry.target);
        }

        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    countItems.forEach((item) => {
      if (item.getAttribute('data-count')) {
        item.textContent = item.getAttribute('data-count');
      }
    });
  } else {
    revealItems.forEach((item) => revealObserver.observe(item));
    countItems.forEach((item) => revealObserver.observe(item));
  }

  function animateCount(element) {
    const target = Number(element.getAttribute('data-count'));
    if (!target || element.dataset.counted === 'true') return;

    element.dataset.counted = 'true';
    const startTime = performance.now();
    const duration = 1100;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = String(target);
      }
    };

    requestAnimationFrame(tick);
  }

  const updateProgress = () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll <= 0 ? 0 : (scrollTop / maxScroll) * 100;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (!reduceMotion && finePointer) {
    tiltItems.forEach((item) => {
      item.addEventListener('pointermove', (event) => {
        const rect = item.getBoundingClientRect();
        const percentX = (event.clientX - rect.left) / rect.width;
        const percentY = (event.clientY - rect.top) / rect.height;
        const rotateY = (percentX - 0.5) * 8;
        const rotateX = (0.5 - percentY) * 8;

        item.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        item.style.setProperty('--pointer-x', `${percentX * 100}%`);
        item.style.setProperty('--pointer-y', `${percentY * 100}%`);
      });

      item.addEventListener('pointerleave', () => {
        item.style.transform = '';
        item.style.removeProperty('--pointer-x');
        item.style.removeProperty('--pointer-y');
      });
    });
  }

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

    studioButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.studioMode === key);
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

  studioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyStudioPreset(button.dataset.studioMode);
    });
  });

  applyStudioPreset('classic_black');

  if (deleteForm) {
    deleteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = deleteForm.querySelector('[data-delete-email]');
      const email = emailInput?.value?.trim();

      if (!email) {
        emailInput?.focus();
        return;
      }

      const subject = encodeURIComponent('Delete InkMeld account');
      const body = encodeURIComponent(
        `Please delete my InkMeld account.\n\nRegistered email: ${email}\n\nThank you.`
      );

      window.location.href = `mailto:support@inkmeld.ai?subject=${subject}&body=${body}`;
    });
  }
});
