/* =========================================
   NATURASSIC — Page Réservation
   Validation accessible + soumission Netlify Forms (AJAX)
========================================= */

(function () {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- NAV SCROLL ---- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---- ANIMATIONS ---- */
  function initAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(['.breadcrumb', '.resa-header-text h1', '.resa-header-intro'],
      { opacity: 0, y: 18 });
    gsap.timeline({ delay: 0.2 })
      .to('.breadcrumb', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      .to('.resa-header-text h1', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .to('.resa-header-intro', { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.55');

    gsap.to('.resa-header-image img', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.resa-header', start: 'top top', end: 'bottom top', scrub: true },
    });

    gsap.set('.reveal', { opacity: 0, y: 20 });
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });
    });

    gsap.set('.formule', { opacity: 0, y: 22 });
    gsap.utils.toArray('.formule').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger: '.resa-formules-grid', start: 'top 82%', once: true },
      });
    });

    gsap.set('.process-step', { opacity: 0, y: 20 });
    gsap.utils.toArray('.process-step').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: i * 0.12,
        scrollTrigger: { trigger: '.process-steps', start: 'top 80%', once: true },
      });
    });
  }

  function showAllImmediately() {
    document.querySelectorAll('.breadcrumb, .resa-header-text h1, .resa-header-intro, .reveal, .formule, .process-step')
      .forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

  /* ---- FORMULAIRE : validation + soumission ---- */
  function initForm() {
    const form = document.getElementById('resa-form');
    if (!form) return;

    const feedback = form.querySelector('.form-feedback');
    const formuleSelect = form.querySelector('#formule');
    const personnesInput = form.querySelector('#personnes');
    const personnesHint = form.querySelector('#personnes-hint');

    /* Max de personnes dynamique selon la formule */
    function updatePersonnesMax() {
      if (!formuleSelect || !personnesInput) return;
      if (formuleSelect.value === 'weekend') {
        personnesInput.max = 6;
        if (personnesHint) personnesHint.textContent = 'Weekend Alpin : groupes de 4 à 6 personnes';
      } else if (formuleSelect.value === 'journee') {
        personnesInput.max = 8;
        if (personnesHint) personnesHint.textContent = 'Journée Découverte : 8 personnes maximum';
      } else {
        personnesInput.max = 8;
        if (personnesHint) personnesHint.textContent = '';
      }
      // Re-clamp si déjà saisi
      if (personnesInput.value && Number(personnesInput.value) > Number(personnesInput.max)) {
        validateField(personnesInput);
      }
    }
    if (formuleSelect) formuleSelect.addEventListener('change', updatePersonnesMax);

    /* Validation d'un champ */
    function validateField(field) {
      const errorEl = document.getElementById(field.id + '-error');
      let message = '';

      if (field.hasAttribute('required') && !field.value.trim()) {
        message = 'Ce champ est requis.';
      } else if (field.type === 'email' && field.value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(field.value)) message = 'Adresse email invalide.';
      } else if (field.type === 'number' && field.value) {
        const v = Number(field.value);
        const min = Number(field.min), max = Number(field.max);
        if (v < min) message = 'Au moins ' + min + ' personne.';
        else if (v > max) message = 'Maximum ' + max + ' personnes pour cette formule.';
      }

      if (message) {
        field.setAttribute('aria-invalid', 'true');
        if (errorEl) { errorEl.textContent = message; errorEl.classList.add('visible'); }
        return false;
      } else {
        field.removeAttribute('aria-invalid');
        if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('visible'); }
        return true;
      }
    }

    /* Validation à la perte de focus */
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      if (field.type === 'hidden') return;
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    /* Encodage pour Netlify */
    function encode(data) {
      return Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
    }

    function showFeedback(type, msg) {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.className = 'form-feedback visible form-feedback--' + type;
      feedback.setAttribute('role', type === 'error' ? 'alert' : 'status');
    }

    /* Soumission */
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = form.querySelectorAll('input[required], select[required], textarea[required], input[type="email"], input[type="number"]');
      let firstInvalid = null;
      let valid = true;
      fields.forEach((field) => {
        if (field.type === 'hidden') return;
        if (!validateField(field)) {
          valid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!valid) {
        showFeedback('error', 'Merci de corriger les champs indiqués avant d’envoyer.');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* Données */
      const formData = new FormData(form);
      const data = {};
      formData.forEach((v, k) => { data[k] = v; });

      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi…'; }

      /* Soumission Netlify Forms via AJAX
         (en prod sur Netlify : fonctionne. En local : échoue → message clair.) */
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data),
      })
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.reset();
          showFeedback('success',
            'Merci, votre demande est partie. Nous vous répondons sous 48 h pour confirmer disponibilité et acompte.');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        })
        .catch(() => {
          showFeedback('error',
            'L’envoi a échoué. Écrivez-nous directement à contact@naturassic.ch, nous traitons votre demande à la main. (Note dev : l’envoi ne fonctionne qu’une fois le site déployé sur Netlify.)');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        });
    });

    updatePersonnesMax();
  }

  /* ---- INIT ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initForm();
    if (!prefersReducedMotion) initAnimations();
    else showAllImmediately();
  });
})();
