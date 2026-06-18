// Site behaviours: scroll-reveal, active-section nav, back-to-top.
// Vanilla JS, progressive enhancement (site works fine without it).
(function () {
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal content sections as they scroll into view
  var sections = document.querySelectorAll('main .section');
  if ('IntersectionObserver' in window && !reduce) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        // reveal when in view, or if already scrolled past (deep-link / reload mid-page)
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          e.target.classList.add('in-view');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(function (s) { revealObs.observe(s); });
  } else {
    // no observer / reduced motion: show everything immediately
    sections.forEach(function (s) { s.classList.add('in-view'); });
  }

  // 2. Highlight the nav link for the section currently in view
  var navLinks = {};
  Array.prototype.forEach.call(document.querySelectorAll('.nav-links a'), function (a) {
    var href = a.getAttribute('href');
    if (href && href.charAt(0) === '#') navLinks[href.slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var link = navLinks[e.target.id];
        if (!link) return;
        Object.keys(navLinks).forEach(function (k) {
          navLinks[k].classList.remove('active');
        });
        link.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    Array.prototype.forEach.call(document.querySelectorAll('main section[id]'), function (s) {
      spyObs.observe(s);
    });
  }

  // 3. Back-to-top button visibility
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 600) toTop.classList.add('visible');
      else toTop.classList.remove('visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
