function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initReveals(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
  if (els.length === 0) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  els.forEach((el) => io.observe(el));
}

function animateCounter(el: HTMLElement): void {
  const target = parseFloat(el.dataset.counterTarget ?? '0');
  const prefix = el.dataset.counterPrefix ?? '';
  const suffix = el.dataset.counterSuffix ?? '';
  el.dataset.counterDone = 'true';

  if (prefersReducedMotion()) {
    el.textContent = `${prefix}${target}${suffix}`;
    return;
  }

  const duration = 1200;
  const start = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = `${prefix}${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-counter-target]:not([data-counter-done])');
  if (els.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(animateCounter);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.4 },
  );

  els.forEach((el) => io.observe(el));
}

document.addEventListener('astro:page-load', () => {
  initReveals();
  initCounters();
});
