(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navWrap = document.getElementById('nav-wrap');
  const header = document.querySelector('[data-header]');

  if (!toggle || !navWrap || !header) return;

  const setMenu = (open) => {
    navWrap.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.querySelector('path').setAttribute('d', open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16');
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navWrap.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) setMenu(false);
  }, { passive: true });

  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const targets = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .2, .5] });
    targets.forEach((target) => observer.observe(target));
  }
})();
