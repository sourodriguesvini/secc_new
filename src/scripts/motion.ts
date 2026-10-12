import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger };

/**
 * Dois níveis de movimento, decididos no <head> (Base.astro):
 * - "full": tudo — rolagem suave, títulos que sobem linha a linha, deslocamentos.
 * - "gentle": para quem pede menos movimento no sistema. O site continua vivo
 *   (radar girando, seções aparecendo, números contando), mas só com opacidade
 *   e movimentos pequenos: sem rolagem sequestrada nem grandes deslocamentos.
 */
export const tier: 'full' | 'gentle' = window.__motionTier ?? 'full';
export const gentle = tier === 'gentle';
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function initSmoothScroll() {
  if (gentle || !finePointer) return;
  const lenis = new Lenis({ anchors: { offset: -88 }, lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Títulos: no modo completo entram linha a linha por baixo de uma máscara; no suave, só aparecem. */
function initHeadings() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((heading) => {
    const hero = heading.dataset.split === 'hero';
    const scrollTrigger = hero ? undefined : { trigger: heading, start: 'top 88%', once: true };
    gsap.set(heading, { visibility: 'visible' });

    if (gentle) {
      gsap.from(heading, { opacity: 0, duration: 1.1, ease: 'power2.out', delay: hero ? 0.1 : 0, scrollTrigger });
      return;
    }
    const split = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    gsap.from(split.lines, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: hero ? 0.15 : 0, scrollTrigger });
  });
}

/** Blocos aparecem uma vez; irmãos dentro de [data-reveal-group] entram em cascata. */
function initReveals() {
  const to = { opacity: 1, y: 0, duration: gentle ? 0.8 : 0.9, ease: gentle ? 'power2.out' : 'expo.out' };
  const grouped = new Set<Element>();

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal]');
    items.forEach((item) => grouped.add(item));
    gsap.to(items, { ...to, stagger: 0.08, scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item) => {
    if (grouped.has(item)) return;
    gsap.to(item, { ...to, delay: Number(item.dataset.reveal) || 0, scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
  });
}

/** Números que contam até o valor final: <span data-count="250" data-suffix="+">. */
function initCounters() {
  const format = new Intl.NumberFormat('pt-BR');
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
    const target = Number(element.dataset.count);
    const state = { value: 0 };
    const render = () => (element.textContent = `${element.dataset.prefix ?? ''}${format.format(Math.round(state.value))}${element.dataset.suffix ?? ''}`);
    render();
    gsap.to(state, {
      value: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: render,
      scrollTrigger: { trigger: element, start: 'top 92%', once: true },
    });
  });
}

/** Linhas e trilhas que se desenham da esquerda para a direita: [data-draw]. */
function initDraw() {
  document.querySelectorAll<HTMLElement>('[data-draw]').forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power3.inOut', transformOrigin: 'left center', scrollTrigger: { trigger: line, start: 'top 90%', once: true } },
    );
  });
}

/** Botões principais puxam levemente na direção do cursor. */
function initMagnetic() {
  if (gentle || !finePointer) return;
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
  // As quebras de linha dependem da fonte final; dividir antes disso embaralha o título.
  await document.fonts.ready;
  initSmoothScroll();
  initHeadings();
  initReveals();
  initCounters();
  initDraw();
  initMagnetic();
  initSpotlight();
  window.__motionReady = true;
  ScrollTrigger.refresh();
}

declare global {
  interface Window {
    __motionReady?: boolean;
    __motionTier?: 'full' | 'gentle';
  }
}
