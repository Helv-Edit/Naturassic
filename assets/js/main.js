/* =========================================
   NATURASSIC — Animations GSAP + ScrollTrigger
   Version : 1.0 — Accueil
========================================= */

(function () {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- NAV SCROLL ---- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const threshold = 80;

    function updateNav() {
      if (window.scrollY > threshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // état initial
  }

  /* ---- ANIMATIONS GSAP ---- */
  function initAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* -- État initial hero (opacity 0 en CSS pour les éléments animés) -- */
    /* On les passe à 0 via JS aussi pour être sûr même si CSS est désactivé */
    gsap.set(['.hero-tag', '.hero h1', '.hero-sub', '.hero .btn', '.hero-scroll'], {
      opacity: 0,
    });
    gsap.set(['.hero h1', '.hero-sub'], { y: 18 });

    /* -- Entrée hero -- */
    const heroTl = gsap.timeline({ delay: 0.25 });

    heroTl
      .to('.hero-tag', {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
      })
      .to(
        '.hero h1',
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.5'
      )
      .to(
        '.hero-sub',
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' },
        '-=0.65'
      )
      .to(
        '.hero .btn',
        { opacity: 1, duration: 0.75, ease: 'power2.out' },
        '-=0.55'
      )
      .to(
        '.hero-scroll',
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

    /* -- Parallax hero image (panneau gauche uniquement) -- */
    gsap.to('.hero-image', {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-image-panel',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* -- Propositions : révélation séquentielle -- */
    gsap.set('.proposition-item', { opacity: 0, y: 16 });

    gsap.utils.toArray('.proposition-item').forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: {
          trigger: '.propositions-list',
          start: 'top 88%',
          once: true,
        },
      });
    });

    /* -- Circuits : révélation par carte -- */
    gsap.set('.circuit-card', { opacity: 0, y: 18 });

    gsap.utils.toArray('.circuit-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: {
          trigger: '.circuits-grid',
          start: 'top 88%',
          once: true,
        },
      });
    });

    /* -- Faune : révélation avec légère échelle -- */
    gsap.set('.fauna-item', { opacity: 0, y: 16 });

    gsap.utils.toArray('.fauna-item').forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: {
          trigger: '.fauna-photos',
          start: 'top 88%',
          once: true,
        },
      });
    });

    /* -- Révélations génériques .reveal -- */
    gsap.set('.reveal', { opacity: 0, y: 16 });

    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });

    /* -- Guides : entrée décalée -- */
    gsap.set('.guide-item', { opacity: 0, x: -14 });

    gsap.utils.toArray('.guide-item').forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: {
          trigger: '.guides-list',
          start: 'top 88%',
          once: true,
        },
      });
    });

    /* -- Éco-points -- */
    gsap.set('.eco-point', { opacity: 0, y: 14 });

    gsap.utils.toArray('.eco-point').forEach((point, i) => {
      gsap.to(point, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: {
          trigger: '.eco-points',
          start: 'top 88%',
          once: true,
        },
      });
    });
  }

  /* ---- SANS ANIMATIONS (mouvement réduit ou GSAP absent) ---- */
  function showAllImmediately() {
    const elements = document.querySelectorAll(
      '.hero-tag, .hero h1, .hero-sub, .btn, .hero-scroll,' +
        '.proposition-item, .circuit-card, .fauna-item, .reveal, .guide-item, .eco-point'
    );
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ---- INIT ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();

    if (!prefersReducedMotion) {
      initAnimations();
    } else {
      showAllImmediately();
    }
  });
})();
