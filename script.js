const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navbar = document.querySelector('.navbar');
const progress = document.querySelector('.scroll-progress span');
const glow = document.querySelector('.cursor-glow');

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 30);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (y / max) * 100 : 0}%`;
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55%' });
sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('.career').forEach(item => {
  item.querySelector('.career-toggle').addEventListener('click', () => item.classList.toggle('active'));
});

const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
navLinks.forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  let lastTrail = 0;
  addEventListener('pointermove', e => {
    glow.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 900, fill: 'forwards' });
    if (performance.now() - lastTrail > 45) {
      const dot = document.createElement('i');
      dot.className = 'trail-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 700);
      lastTrail = performance.now();
    }
  });

  const tilt = document.querySelector('[data-tilt]');
  const stage = document.querySelector('.device-stage');
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-4px)`;
  });
  stage.addEventListener('pointerleave', () => tilt.style.transform = '');

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.16}px)`;
    });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });

  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  addEventListener('scroll', () => {
    const y = scrollY;
    document.querySelectorAll('.section-heading').forEach(heading => {
      const r = heading.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) heading.style.transform = `translateY(${(r.top - innerHeight / 2) * -.025}px)`;
    });
    const backPhone = document.querySelector('.phone-back');
    if (y < innerHeight * 1.2) backPhone.style.transform = `rotate(${-8 + y * .008}deg) scale(.91) translateY(${y * .04}px)`;
  }, { passive: true });
}

document.querySelectorAll('a, button, .skill-card').forEach(el => {
  el.addEventListener('pointerdown', () => {
    if (!reduceMotion) el.animate([{transform:'scale(1)'},{transform:'scale(.97)'},{transform:'scale(1)'}], {duration:220});
  });
});
