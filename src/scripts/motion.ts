import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger };

/** Decidido no <head> (Base.astro): preferência do sistema, salvo revisão com ?movimento. */
export const reducedMotion = window.__reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Rolagem suave só onde ajuda: mouse/trackpad, sem preferência por menos movimento. */
function initSmoothScroll() {
  if (reducedMotion || !finePointer) return;
  const lenis = new Lenis({ anchors: { offset: -88 }, lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Títulos entram linha a linha, de baixo de uma máscara. */
function initSplitHeadings() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((heading) => {
    const split = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    gsap.set(heading, { visibility: 'visible' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.09,
      delay: heading.dataset.split === 'hero' ? 0.15 : 0,
      scrollTrigger: heading.dataset.split === 'hero' ? undefined : { trigger: heading, start: 'top 88%', once: true },
    });
  });
}

/** Blocos sobem e aparecem uma vez; irmãos dentro de [data-reveal-group] entram em cascata. */
function initReveals() {
  const grouped = new Set<Element>();
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal]');
    items.forEach((item) => grouped.add(item));
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item) => {
    if (grouped.has(item)) return;
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      delay: Number(item.dataset.reveal) || 0,
      scrollTrigger: { trigger: item, start: 'top 88%', once: true },
    });
  });
}

/** Botões principais puxam levemente na direção do cursor. */
function initMagnetic() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((element) => {
    const xTo = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * 0.22);
      yTo((event.clientY - rect.top - rect.height / 2) * 0.3);
    });
    element.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

function initSpotlight() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      element.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

export async function initMotion() {
  const root = document.documentElement;
  if (reducedMotion) {
    root.classList.remove('motion');
    return;
  }
  // As quebras de linha dependem da fonte final; dividir antes disso embaralha o título.
  await document.fonts.ready;
  initSmoothScroll();
  initSplitHeadings();
  initReveals();
  initMagnetic();
  initSpotlight();
  window.__motionReady = true;
  ScrollTrigger.refresh();
}

declare global {
  interface Window {
    __motionReady?: boolean;
    __reducedMotion?: boolean;
  }
}
