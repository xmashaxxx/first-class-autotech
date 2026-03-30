/* ============================================
   S&A AUTO REPAIR — MAIN JS
   GSAP animations, nav, scroll reveals,
   hero entrance, parallax, page transitions
   ============================================ */

/* ── Domain Lock ──────────────────────────────
   This preview only works on the Xtatic Digital
   hosting domain. If copied and deployed elsewhere
   the site is replaced with an expired notice.
   ─────────────────────────────────────────── */
(function () {
  const ALLOWED = ['xmashaxxx.github.io', 'localhost', '127.0.0.1', ''];
  const host = window.location.hostname;
  if (!ALLOWED.includes(host)) {
    document.open();
    document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview Unavailable</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0D0D0D;color:#F5F5F0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:2rem}.wrap{max-width:480px}.logo{font-size:1.1rem;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;margin-bottom:2rem}.title{font-size:2rem;margin-bottom:1rem}p{color:#888;line-height:1.7;margin-bottom:2rem}a{display:inline-block;padding:12px 32px;background:#C9A84C;color:#0D0D0D;text-decoration:none;font-weight:700;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase}</style></head><body><div class="wrap"><div class="logo">Xtatic Digital</div><h1 class="title">Preview Unavailable</h1><p>This website preview was created exclusively by Xtatic Digital and is not licensed for independent hosting.<br><br>To get your own professional website, contact us.</p><a href="mailto:mashamariakrasnova@gmail.com">Get Your Website</a></div></body></html>`);
    document.close();
  }
})();

/* ── Preview Watermark ────────────────────────
   Subtle ribbon so the client knows it's a preview
   ─────────────────────────────────────────── */
(function () {
  const bar = document.createElement('div');
  bar.id = 'xtatic-preview-bar';
  bar.innerHTML = 'PREVIEW &nbsp;·&nbsp; Built by <strong>Xtatic Digital</strong> &nbsp;·&nbsp; This is your site — <a href="mailto:mashamariakrasnova@gmail.com">claim it today</a>';
  Object.assign(bar.style, {
    position: 'fixed', bottom: '0', left: '0', right: '0',
    zIndex: '99999', background: 'rgba(13,13,13,0.92)',
    borderTop: '1px solid rgba(201,168,76,0.4)',
    backdropFilter: 'blur(10px)',
    padding: '10px 24px',
    fontSize: '0.7rem', letterSpacing: '2px',
    textTransform: 'uppercase', textAlign: 'center',
    color: '#C9A84C', fontFamily: 'sans-serif'
  });
  bar.querySelector('a').style.cssText = 'color:#fff;text-decoration:underline;';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(bar));
})();

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ── Cursor glow ──────────────────────────── */
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  window.addEventListener('mousemove', e => {
    gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power2.out' });
  });
}

/* ── Page Loader ──────────────────────────── */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const brand = loader.querySelector('.loader-brand');
  const fill  = loader.querySelector('.loader-fill');

  gsap.to(brand, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1 });
  gsap.to(fill,  { width: '100%', duration: 1.4, ease: 'power2.inOut', delay: 0.3,
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0, duration: 0.55, delay: 0.15, ease: 'power2.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          initHeroEntrance();
        }
      });
    }
  });
}

/* ── Hero Entrance ────────────────────────── */
function initHeroEntrance() {
  const eyebrow  = document.querySelector('.hero-eyebrow');
  const title    = document.querySelector('.hero-title');
  const sub      = document.querySelector('.hero-sub');
  const actions  = document.querySelector('.hero-actions');
  const scroll   = document.querySelector('.hero-scroll-hint');
  if (!eyebrow) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to(eyebrow, { opacity: 1, y: 0,    duration: 1,    delay: 0.1 })
    .to(title,   { opacity: 1, y: 0,    duration: 1.2 }, '-=0.6')
    .to(sub,     { opacity: 1, y: 0,    duration: 1    }, '-=0.7')
    .to(actions, { opacity: 1, y: 0,    duration: 0.9  }, '-=0.6')
    .to(scroll,  { opacity: 1, duration: 0.8           }, '-=0.3');

  // Hero elements start offset
  gsap.set([eyebrow, title, sub, actions, scroll], { y: 30 });
}

/* ── Navigation ───────────────────────────── */
function initNav() {
  const nav   = document.getElementById('navbar');
  const ham   = document.getElementById('hamburger');
  const menu  = document.getElementById('navMenu');
  if (!nav) return;

  // Scroll class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Hamburger
  if (ham && menu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ── Scroll Reveal (generic) ──────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

/* ── GSAP Scroll Animations ───────────────── */
function initGSAPScroll() {

  /* About section */
  const aboutImg = document.querySelector('.about-img');
  if (aboutImg) {
    gsap.fromTo(aboutImg,
      { scale: 1.08 },
      { scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  }

  /* Section labels + headings fade up */
  gsap.utils.toArray('.section-label, .page-hero h1').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 25, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  /* Service cards stagger */
  const svcCards = gsap.utils.toArray('.svc-card');
  if (svcCards.length) {
    gsap.from(svcCards, {
      opacity: 0, y: 50, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 85%', toggleActions: 'play none none none' }
    });
  }

  /* About stats */
  const statBoxes = gsap.utils.toArray('.stat-box');
  if (statBoxes.length) {
    gsap.from(statBoxes, {
      opacity: 0, y: 35, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-stats', start: 'top 88%', toggleActions: 'play none none none' }
    });
  }

  /* Review cards (fade in section) */
  const reviewsSection = document.querySelector('.reviews');
  if (reviewsSection) {
    gsap.from('.reviews-header', {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.reviews-header', start: 'top 85%', toggleActions: 'play none none none' }
    });
  }

  /* Location section */
  const locInner = document.querySelector('.location-inner');
  if (locInner) {
    gsap.from('.map-frame', {
      opacity: 0, x: -50, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: locInner, start: 'top 85%', toggleActions: 'play none none none' }
    });
    gsap.from('.loc-block', {
      opacity: 0, x: 50, duration: 1, delay: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: locInner, start: 'top 85%', toggleActions: 'play none none none' }
    });
  }

  /* Social links */
  const socialLinks = gsap.utils.toArray('.social-link');
  if (socialLinks.length) {
    gsap.from(socialLinks, {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.social-links', start: 'top 88%', toggleActions: 'play none none none' }
    });
  }

  /* About text block */
  const aboutText = document.querySelector('.about-text');
  if (aboutText) {
    gsap.from(aboutText, {
      opacity: 0, x: 60, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: aboutText, start: 'top 82%', toggleActions: 'play none none none' }
    });
    gsap.from('.about-img-wrap', {
      opacity: 0, x: -60, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-img-wrap', start: 'top 82%', toggleActions: 'play none none none' }
    });
  }

  /* Engine text */
  const engineText = document.querySelector('.engine-text');
  if (engineText) {
    gsap.from(engineText, {
      opacity: 0, x: -60, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: engineText, start: 'top 80%', toggleActions: 'play none none none' }
    });
  }
}

/* ── Page Transitions ─────────────────────── */
function initPageTransitions() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only handle internal same-origin links
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        href.startsWith('https://wa.me') || href.startsWith('javascript')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      gsap.to(overlay, {
        scaleY: 1, duration: 0.5, ease: 'power3.inOut', transformOrigin: 'bottom',
        onComplete: () => { window.location.href = href; }
      });
    });
  });

  // Animate out on load
  gsap.to(overlay, { scaleY: 0, duration: 0.6, delay: 0.05, ease: 'power3.inOut', transformOrigin: 'top' });
}

/* ── Services Page: section reveals ──────── */
function initServicesPage() {
  const layouts = gsap.utils.toArray('.svc-layout');
  layouts.forEach((layout, i) => {
    const img     = layout.querySelector('.svc-img-wrap');
    const content = layout.querySelector('.svc-content');
    const isEven  = i % 2 === 0;

    if (img)     gsap.from(img,     { opacity: 0, x: isEven ? -60 : 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: layout, start: 'top 80%', toggleActions: 'play none none none' } });
    if (content) gsap.from(content, { opacity: 0, x: isEven ? 60 : -60, duration: 1, delay: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: layout, start: 'top 80%', toggleActions: 'play none none none' } });
  });
}

/* ── Gallery page filter ──────────────────── */
function initGalleryFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        const show = filter === 'all' || item.dataset.type === filter;
        gsap.to(item, { opacity: show ? 1 : 0.15, scale: show ? 1 : 0.96, duration: 0.4 });
        item.style.pointerEvents = show ? 'all' : 'none';
      });
    });
  });
}

/* ── Init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  initScrollReveal();
  initGSAPScroll();
  initPageTransitions();
  initServicesPage();
  initGalleryFilters();
});
