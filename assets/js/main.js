/* ============================================================
   CHIOMA EZEOFOR — PERSONAL PORTFOLIO
   main.js
   ============================================================ */

'use strict';

/* ── Navbar: scroll behavior ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active link highlight */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .mobile-menu a');

  const markActive = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', markActive, { passive: true });
  markActive();
})();

/* ── Mobile Menu ── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close on link click */
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();

/* ── Event Gallery Sliders ── */
(function initGalleries() {
  document.querySelectorAll('.event-gallery').forEach(gallery => {
    const slides     = gallery.querySelector('.event-gallery-slides');
    const dotsWrap   = gallery.querySelector('.event-gallery-nav');
    const prevBtn    = gallery.querySelector('.event-nav-btn.prev');
    const nextBtn    = gallery.querySelector('.event-nav-btn.next');
    const countEl    = gallery.querySelector('.event-photo-count');

    if (!slides) return;

    const allSlides = slides.querySelectorAll('.event-gallery-slide');
    const total     = allSlides.length;
    if (total <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    let current = 0;
    let timer   = null;

    const goTo = (idx) => {
      current = (idx + total) % total;
      slides.style.transform = `translateX(-${current * 100}%)`;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
      if (countEl) countEl.textContent = `${current + 1} / ${total}`;
    };

    const autoPlay = () => {
      timer = setInterval(() => goTo(current + 1), 3500);
    };

    const stopPlay = () => clearInterval(timer);

    /* Build dots */
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => { stopPlay(); goTo(i); autoPlay(); });
        dotsWrap.appendChild(dot);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopPlay(); goTo(current - 1); autoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopPlay(); goTo(current + 1); autoPlay(); });

    /* Pause on hover */
    gallery.addEventListener('mouseenter', stopPlay);
    gallery.addEventListener('mouseleave', autoPlay);

    /* Touch support */
    let touchStart = 0;
    gallery.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].clientX; stopPlay(); }, { passive: true });
    gallery.addEventListener('touchend', e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      autoPlay();
    }, { passive: true });

    goTo(0);
    autoPlay();
  });
})();

/* ── Lightbox ── */
(function initLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const imgEl   = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  if (!overlay || !imgEl) return;

  const open = (src, alt) => {
    imgEl.src = src;
    imgEl.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { imgEl.src = ''; }, 300);
  };

  /* Attach to all gallery images */
  document.querySelectorAll('.event-gallery-slide img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ── Back to Top ── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Smooth anchor scroll (offset for fixed nav) ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── Current Year in Footer ── */
(function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
