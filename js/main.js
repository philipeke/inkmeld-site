document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animating once to prevent stuttering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements that should fade in
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(el => observer.observe(el));

  // Optional: Global parallax effect on mouse move for hero
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      
      const mockup = document.querySelector('.hero-mockup');
      if (mockup) {
        mockup.style.transform = `translateY(-5%) rotateX(${y}deg) rotateY(${-x}deg)`;
      }
    });
  }
});
