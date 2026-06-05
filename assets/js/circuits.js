/* =========================================
   NATURASSIC — Animations page Circuits
========================================= */

(function () {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- NAV SCROLL (partagé, même logique que main.js) ---- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    function updateNav() {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ---- ANIMATIONS GSAP ---- */
  function initAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    /* -- En-tête page -- */
    gsap.set(['.breadcrumb', '.circuits-page-header-text h1',
              '.circuits-page-header-intro'], { opacity: 0, y: 18 });

    const headerTl = gsap.timeline({ delay: 0.2 });
    headerTl
      .to('.breadcrumb', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      .to('.circuits-page-header-text h1',
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .to('.circuits-page-header-intro',
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.55');

    /* -- Parallax en-tête -- */
    gsap.to('.circuits-page-header-image img', {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.circuits-page-header',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* -- Révélation des lignes circuit -- */
    gsap.utils.toArray('.circuit-row').forEach((row) => {
      const img     = row.querySelector('.circuit-row-image img');
      const content = row.querySelector('.circuit-row-content');
      const isReverse = row.classList.contains('circuit-row--reverse');

      /* Image : fondu + légère translation horizontale */
      gsap.fromTo(img,
        { opacity: 0, x: isReverse ? 30 : -30 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 78%', once: true },
        }
      );

      /* Contenu texte : fondu + translation verticale */
      const children = content.querySelectorAll(
        '.circuit-difficulty, h2, .circuit-kicker, .circuit-stats,' +
        '.circuit-desc, .circuit-highlights, .circuit-fauna-block, .btn'
      );
      gsap.set(children, { opacity: 0, y: 20 });
      gsap.to(children, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: row, start: 'top 72%', once: true },
        delay: 0.15,
      });
    });

    /* -- Journée Découverte -- */
    gsap.set(['.journee-eyebrow', '.journee-content h2', '.journee-kicker',
              '.journee-desc', '.journee-included', '.journee-price', '.journee-section .btn'],
      { opacity: 0, y: 18 });

    gsap.to(['.journee-eyebrow', '.journee-content h2', '.journee-kicker',
             '.journee-desc', '.journee-included', '.journee-price', '.journee-section .btn'], {
      opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.journee-section', start: 'top 75%', once: true },
    });

    /* -- Faune : cartes en cascade -- */
    gsap.set('.faune-card', { opacity: 0, y: 24 });

    gsap.utils.toArray('.faune-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: '.faune-grid', start: 'top 82%', once: true },
      });
    });

    /* -- Révélations génériques .reveal -- */
    gsap.set('.reveal', { opacity: 0, y: 20 });
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    });
  }

  /* ---- SANS ANIMATIONS ---- */
  function showAllImmediately() {
    document.querySelectorAll(
      '.breadcrumb, .circuits-page-header-text h1, .circuits-page-header-intro,' +
      '.circuit-row-image img, .circuit-row-content *, .journee-content *,' +
      '.faune-card, .reveal'
    ).forEach((el) => {
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
