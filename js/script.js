'use strict';
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
toggle.hidden = false;
menu.dataset.collapsible = 'true';
function closeMenu() {
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    toggle.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(data.get('subject'));
  const body = encodeURIComponent(`Hi Aman,\n\n${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`);
  window.location.href = `mailto:aman5kvision@gmail.com?subject=${subject}&body=${body}`;
  document.querySelector('#form-status').textContent = 'Email draft requested. If your email app did not open, email aman5kvision@gmail.com directly.';
});

// Anchor scrolling: distance-aware easing, cancellable by user input.
let scrollFrame = 0;
function stopAnchorScroll() {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = 0;
}
['wheel', 'touchstart', 'pointerdown'].forEach(type => {
  window.addEventListener(type, stopAnchorScroll, { passive: true });
});
window.addEventListener('keydown', event => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(event.key)) stopAnchorScroll();
});
motion.addEventListener('change', stopAnchorScroll);
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    stopAnchorScroll();
    closeMenu();
    const from = window.scrollY;
    const to = target.id === 'home' || target.id === 'main' ? 0 : Math.max(0, Math.min(target.getBoundingClientRect().top + from - 32, document.documentElement.scrollHeight - window.innerHeight));
    const finish = () => {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
      scrollFrame = 0;
    };
    if (motion.matches || link.classList.contains('skip-link') || Math.abs(to - from) < 2) {
      window.scrollTo(0, to);
      finish();
      return;
    }
    const duration = Math.min(950, Math.max(420, Math.abs(to - from) * .22));
    let start;
    function tick(time) {
      if (start === undefined) start = time;
      const progress = Math.min(1, (time - start) / duration);
      const ease = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      window.scrollTo(0, from + (to - from) * ease);
      if (progress < 1) scrollFrame = requestAnimationFrame(tick);
      else finish();
    }
    scrollFrame = requestAnimationFrame(tick);
  });
});
window.addEventListener('popstate', stopAnchorScroll);

// GSAP owns motion; matchMedia automatically reverts it for reduced motion.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const animationMedia = gsap.matchMedia();
  animationMedia.add('(prefers-reduced-motion: no-preference)', () => {
    const desktop = window.matchMedia('(min-width: 761px)').matches;
    if (document.querySelector('.hero')) gsap.timeline({ defaults: { ease: 'power3.out', duration: .9 } })
      .from('.hero h1 > span, .hero h1 > em', { y: 42, opacity: .25, stagger: .13 })
      .from('.hero .eyebrow, .hero-description, .hero .actions, .hero-stack', { y: 18, opacity: .35, stagger: .08 }, .35)
      .from('.portrait', { y: 30, rotation: 2, opacity: .4, duration: 1.2 }, .2);
    gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: .15 } });
    document.querySelectorAll('.projects-heading, .section-heading, .about-grid, .skills-grid, .education, .contact-grid').forEach(element => {
      gsap.from(element, { y: 28, opacity: .45, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
    });
    document.querySelectorAll('.project-card').forEach((card, index) => {
      gsap.from(card, { y: desktop ? 35 : 20, opacity: .4, duration: .75, delay: desktop ? index % 2 * .1 : 0, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 96%', once: true } });
    });
    document.querySelectorAll('.career-row').forEach(row => {
      gsap.from(row, { x: -18, opacity: .4, duration: .7, scrollTrigger: { trigger: row, start: 'top 94%', once: true } });
    });
    // Hover motion uses a separate context, reverted with the media query.
    const hoverContext = gsap.context(() => {});
    const cleanups = [];
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll('.project-card').forEach(card => {
        const image = card.querySelector('img');
        const enter = () => hoverContext.add(() => gsap.to(image, { scale: 1.035, y: -3, duration: .4, overwrite: 'auto' }));
        const leave = () => hoverContext.add(() => gsap.to(image, { scale: 1, y: 0, duration: .4, overwrite: 'auto' }));
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
        cleanups.push(() => { card.removeEventListener('mouseenter', enter); card.removeEventListener('mouseleave', leave); });
      });
    }
    return () => { cleanups.forEach(cleanup => cleanup()); hoverContext.revert(); };
  });
  document.querySelectorAll('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
  document.addEventListener('focusin', event => {
    const card = event.target.closest('.project-card');
    if (card) gsap.to(card, { opacity: 1, y: 0, duration: 0, overwrite: true });
  });
}
