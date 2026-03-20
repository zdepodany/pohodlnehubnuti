/**
 * Google Analytics 4 – načte se jen po souhlasu s cookies (ph_cookie_consent).
 */
(function () {
  var ID = 'G-ERQJ6RY77D';

  function load() {
    if (window.__phGALoaded) return;
    window.__phGALoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    s.onload = function () {
      window.gtag('js', new Date());
      window.gtag('config', ID);
    };
    document.head.appendChild(s);
  }

  window.phLoadAnalytics = load;

  try {
    if (localStorage.getItem('ph_cookie_consent') === 'accepted') {
      load();
    }
  } catch (e) {
    /* soukromý režim / blokované úložiště */
  }
})();
