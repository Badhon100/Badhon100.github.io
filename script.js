const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.scroll-progress span');
const rail = document.querySelector('.index-rail');
const toggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.index-rail nav a')];

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
}
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .1, rootMargin: '0px 0px -45px' });
document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55%' });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

toggle.addEventListener('click', () => {
  const open = rail.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
navLinks.forEach((link) => link.addEventListener('click', () => {
  rail.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  const portrait = document.querySelector('.hero-portrait');
  const outlinedName = document.querySelector('.name-last');
  addEventListener('scroll', () => {
    if (scrollY > innerHeight * 1.15) return;
    portrait.style.transform = `translateY(${scrollY * .06}px)`;
    outlinedName.style.transform = `translateX(${scrollY * .035}px)`;
  }, { passive: true });

  document.querySelectorAll('.practice-list article, .study-cards article').forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--x', `${event.clientX - rect.left}px`);
    });
  });
}
