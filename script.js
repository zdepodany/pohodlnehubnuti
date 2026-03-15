/**
 * Pohodlné hubnutí - Interactive enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  const handleScroll = () => {
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 0) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top
  document.getElementById('back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(
    '.product-card, .catalog-item, .promeny-carousel, .promeny-content, .refs-slider, .about-content, .about-image, .social-intro, .social-card, .faq-item, .contact-form-fields'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Product catalog filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogItems = document.querySelectorAll('.catalog-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      catalogItems.forEach((item) => {
        const category = item.dataset.category;
        const matches =
          filter === 'vse' ||
          category === filter ||
          (filter === 'jidlo' && (category === 'jidelnicky' || category === 'recepty'));
        item.classList.toggle('filter-hidden', !matches);
      });
    });
  });

  // Promeny carousel
  const promenyCarousel = document.querySelector('[data-carousel="promeny"]');
  if (promenyCarousel) {
    const track = promenyCarousel.querySelector('.promeny-track');
    const slides = Array.from(promenyCarousel.querySelectorAll('.promeny-slide'));
    const dots = Array.from(promenyCarousel.querySelectorAll('.promeny-dot'));
    const prevButton = promenyCarousel.querySelector('[data-carousel-prev]');
    const nextButton = promenyCarousel.querySelector('[data-carousel-next]');
    let activeIndex = 0;

    const setActiveSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      if (track) {
        track.style.transform = `translateX(-${activeIndex * 100}%)`;
      }

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    };

    prevButton?.addEventListener('click', () => setActiveSlide(activeIndex - 1));
    nextButton?.addEventListener('click', () => setActiveSlide(activeIndex + 1));

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIndex = Number(dot.dataset.carouselDot);
        if (!Number.isNaN(targetIndex)) {
          setActiveSlide(targetIndex);
        }
      });
    });

    setActiveSlide(0);
  }

  // References slider (peek layout – offset in px)
  const refsCarousel = document.querySelector('[data-carousel="refs"]');
  if (refsCarousel) {
    const refsTrack = refsCarousel.querySelector('.refs-track');
    const refsSlides = Array.from(refsCarousel.querySelectorAll('.refs-slide'));
    const refsDotsContainer = refsCarousel.querySelector('.refs-dots');
    const refsPrev = refsCarousel.querySelector('[data-carousel-prev]');
    const refsNext = refsCarousel.querySelector('[data-carousel-next]');
    let refsIndex = 0;

    // Generate dots from slide count
    if (refsDotsContainer) {
      refsSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'refs-dot' + (i === 0 ? ' is-active' : '');
        dot.dataset.carouselDot = String(i);
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', `Recenze ${i + 1}`);
        refsDotsContainer.appendChild(dot);
      });
    }
    const refsDots = Array.from(refsCarousel.querySelectorAll('.refs-dot'));

    const getRefsOffset = () => {
      const slide = refsTrack?.querySelector('.refs-slide');
      if (!slide) return 0;
      const gap = parseInt(getComputedStyle(refsTrack).gap) || 16;
      return slide.offsetWidth + gap;
    };

    const setRefsSlide = (index) => {
      refsIndex = Math.max(0, Math.min(index, refsSlides.length - 1));
      const offset = refsIndex * getRefsOffset();
      if (refsTrack) refsTrack.style.transform = `translateX(-${offset}px)`;

      refsDots.forEach((dot, i) => {
        const active = i === refsIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', String(active));
      });

      refsPrev?.classList.toggle('is-hidden', refsIndex === 0);
      refsNext?.classList.toggle('is-hidden', refsIndex === refsSlides.length - 1);
    };

    refsPrev?.addEventListener('click', () => setRefsSlide(refsIndex - 1));
    refsNext?.addEventListener('click', () => setRefsSlide(refsIndex + 1));
    refsDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const i = Number(dot.dataset.carouselDot);
        if (!Number.isNaN(i)) setRefsSlide(i);
      });
    });

    setRefsSlide(0);
    window.addEventListener('resize', () => setRefsSlide(refsIndex));
  }

  // Contact form - prevent submit (form not connected)
  document.querySelector('.contact-form-fields')?.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // Mobile menu toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarNav = document.getElementById('navbar-menu');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  if (navbarToggle && navbarNav) {
    const toggleMenu = () => {
      const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
      navbarToggle.setAttribute('aria-expanded', !isExpanded);
      navbarNav.classList.toggle('is-open');
    };

    navbarToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navbarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarNav.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navbarNav.classList.contains('is-open') && !navbar.contains(e.target)) {
        toggleMenu();
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
