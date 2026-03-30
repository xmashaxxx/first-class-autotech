/* ============================================
   S&A AUTO REPAIR — STEERING WHEEL ANIMATION
   Continuous rotation tied to scroll via GSAP ScrollTrigger
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  const svg = document.getElementById('steering-svg');
  if (!svg || typeof gsap === 'undefined') return;

  // Set transform origin to center of the SVG
  gsap.set(svg, { transformOrigin: '50% 50%' });

  // Fade + scale in on first reveal
  gsap.from(svg, {
    opacity: 0,
    scale: 0.75,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#steering-section',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  // Continuous rotation tied to scroll — 720° as section scrolls through viewport
  gsap.to(svg, {
    rotation: 720,
    ease: 'none',
    scrollTrigger: {
      trigger: '#steering-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    }
  });
});
