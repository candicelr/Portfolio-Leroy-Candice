/* =====================================================
   Portfolio Candice Leroy — interactions
   ===================================================== */

document.documentElement.classList.add('is-loading', 'js');

/* ---------- Burger menu ---------- */
const buttonBurger = document.getElementById('button-burger');
const menuBurger = document.getElementById('menu-burger');
if (buttonBurger && menuBurger) {
  buttonBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('navbar__lists__list2--open');
    buttonBurger.classList.toggle('navbar__burger-button--open');
  });
  // close on link click (mobile)
  menuBurger.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuBurger.classList.remove('navbar__lists__list2--open');
      buttonBurger.classList.remove('navbar__burger-button--open');
    });
  });
}

/* ---------- Navbar scroll state ---------- */
const navbar = document.querySelector('.navbar');
const onScroll = () => {
  if (!navbar) return;
  if (window.scrollY > 30) navbar.classList.add('is-scrolled');
  else navbar.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Split title (hero) ---------- */
document.querySelectorAll('[data-split]').forEach((el) => {
  const text = el.textContent.trim();
  el.innerHTML = '';
  const line = document.createElement('span');
  line.className = 'split-line';
  [...text].forEach((char, i) => {
    const s = document.createElement('span');
    s.className = 'split-char';
    s.style.setProperty('--i', i);
    s.textContent = char === ' ' ? '\u00A0' : char;
    line.appendChild(s);
  });
  el.appendChild(line);
});

requestAnimationFrame(() => {
  document.documentElement.classList.remove('is-loading');
  document.documentElement.classList.add('is-loaded');
});

/* ---------- Custom cursor (desktop only) ---------- */
if (window.matchMedia('(hover: hover) and (min-width: 901px)').matches) {
  const dot = document.createElement('div'); dot.className = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  const tick = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll('a, button, .img-wrap, .skills__block1__card').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
}

/* ---------- Subtle parallax on hero image ---------- */
const heroImg = document.querySelector('.about__block2__img');
if (heroImg && window.matchMedia('(min-width: 901px)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroImg.style.transform = `translateY(${y * 0.08}px)`;
  }, { passive: true });
}
