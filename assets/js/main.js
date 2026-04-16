/* =========================================================
   Maya & Viv Adventures — Shared Script
   Sticky nav · mobile menu · scroll reveal · contact form · year
   ========================================================= */

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  /* ---------- Sticky nav background on scroll ---------- */
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('nav--solid', scrolled);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.getAttribute('data-open') === 'true';
      navLinks.setAttribute('data-open', String(!open));
      navToggle.setAttribute('aria-expanded', String(!open));
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll reveal via IntersectionObserver ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sticky WhatsApp pill reveal ---------- */
  const stickyWA = document.querySelector('.sticky-whatsapp');
  const waBanner = document.querySelector('.whatsapp-banner');
  if (stickyWA) {
    if (waBanner && 'IntersectionObserver' in window) {
      // Contact page: show once the banner has scrolled out of view
      const bannerIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            stickyWA.classList.toggle('is-visible', !entry.isIntersecting);
          });
        },
        { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
      );
      bannerIO.observe(waBanner);
    } else {
      // Other pages: show after scrolling past a threshold
      const threshold = 400;
      const toggleOnScroll = () => {
        stickyWA.classList.toggle('is-visible', window.scrollY > threshold);
      };
      toggleOnScroll();
      window.addEventListener('scroll', toggleOnScroll, { passive: true });
    }
  }

  /* ---------- Contact form (Formspree-compatible) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.dataset.state = '';
      status.textContent = '';

      const action = form.getAttribute('action') || '';
      if (action.includes('REPLACE_ME')) {
        status.dataset.state = 'error';
        status.textContent =
          'Form endpoint not configured yet — paste your Formspree URL into contact.html (form action) before launch.';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const data = new FormData(form);
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.reset();
          status.dataset.state = 'success';
          status.textContent =
            'Got it! Maya or Viv will be in touch within a day — usually sooner.';
        } else {
          const body = await res.json().catch(() => ({}));
          status.dataset.state = 'error';
          status.textContent =
            body.error || 'Something went sideways. Try again, or WhatsApp us directly.';
        }
      } catch (err) {
        status.dataset.state = 'error';
        status.textContent =
          'Network hiccup. Please try again, or reach us on WhatsApp.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }
})();
