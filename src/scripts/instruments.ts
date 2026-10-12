// Instrumentos: o visual vivo do topo de cada página, desenhado em canvas 2D.
// Cada página tem o seu, tirado do que ela diz (ver instrument-painters.ts).
// Aqui ficam o radar da home e a moldura comum: posição, pausa e visibilidade.

import { gentle } from './motion';
import { BLUE, MONO, MUTED, SEV, TAU, WHITE, dot, label, ring, rgb, seg, severity, type Frame, type Painter } from './instrument-kit';
import { painters, type PageInstrument } from './instrument-painters';

export type InstrumentMode = 'radar' | PageInstrument;

export interface RadarSignal {
  label: string;
  months: number;
  angle: number;
}

/** Home: sinais a caminho da crise. A borda é "18 meses antes", o centro é a crise. */
function radarPainter(signals: RadarSignal[]): Painter {
  const HORIZON = 18;
  const noise = Array.from({ length: 26 }, (_, i) => ({ months: 2 + ((i * 7.3) % 15.5), angle: (i * 137.5) % 360 }));
  const blips = [...signals.map((signal) => ({ ...signal, lit: 0 })), ...noise.map((point) => ({ ...point, label: '', lit: 0 }))];
  let previous = 0;

  return ({ ctx, width, cx, cy, radius, compact, time }) => {
    const sweep = ((time / 9) % 1) * TAU;

    for (let i = 1; i <= 3; i += 1) ring(ctx, cx, cy, (radius * i) / 3, rgb('255 255 255', i === 3 ? 0.2 : 0.1));
    seg(ctx, cx - radius, cy, cx + radius, cy, 'rgb(255 255 255 / 0.05)');
    seg(ctx, cx, cy - radius, cx, cy + radius, 'rgb(255 255 255 / 0.05)');

    // Varredura: cunha que desbota atrás da linha de frente.
    const wedge = ctx.createConicGradient(sweep - TAU * 0.22, cx, cy);
    wedge.addColorStop(0, rgb(BLUE, 0));
    wedge.addColorStop(0.22, rgb(BLUE, 0.2));
    wedge.addColorStop(0.2201, rgb(BLUE, 0));
    ctx.fillStyle = wedge;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, sweep - TAU * 0.22, sweep);
    ctx.closePath();
    ctx.fill();
    seg(ctx, cx, cy, cx + Math.cos(sweep) * radius, cy + Math.sin(sweep) * radius, 'rgb(122 162 255 / 0.75)', 1.25);

    label(ctx, '18 MESES ANTES', cx, cy - radius - 14, rgb(MUTED, 0.7));
    label(ctx, 'CRISE', cx, cy + 16, rgb(SEV.red, 0.95));
    dot(ctx, cx, cy, 3, SEV.red, 1);

    for (const blip of blips) {
      const angle = (blip.angle / 360) * TAU;
      // Acende quem a linha de frente acabou de cruzar (inclusive na virada de 360° para 0°).
      const crossed = previous <= sweep ? angle > previous && angle <= sweep : angle > previous || angle <= sweep;
      blip.lit = crossed ? 1 : blip.lit * (blip.label ? 0.988 : 0.965);

      const distance = (blip.months / HORIZON) * radius;
      const x = cx + Math.cos(angle) * distance;
      const y = cy + Math.sin(angle) * distance;
      const base = blip.label ? 0.55 : 0.14;
      dot(ctx, x, y, blip.label ? 3.5 : 1.75, severity(blip.months / HORIZON), base + (1 - base) * blip.lit, blip.lit);

      // No celular cabe menos texto: o rótulo só aparece quando a varredura passa.
      if (blip.label && (!compact || blip.lit > 0.3)) {
        ctx.font = `500 12px ${MONO}`;
        const labelWidth = ctx.measureText(blip.label).width + 12;
        // Abre para fora do centro, sem invadir a coluna de texto nem sair da tela.
        const textColumn = compact ? 0 : width * 0.52;
        const right = x >= cx ? x + labelWidth < width - 8 : x - labelWidth < textColumn;
        label(ctx, blip.label, x + (right ? 12 : -12), y, rgb(WHITE, compact ? blip.lit : 0.42 + 0.58 * blip.lit), right ? 'left' : 'right', 12);
      }
    }
    previous = sweep;
  };
}

export interface InstrumentController {
  /** Pausa ou retoma a animação; devolve se ficou pausada. */
  toggle(): boolean;
}

export function initInstrument(canvas: HTMLCanvasElement, mode: InstrumentMode, signals: RadarSignal[] = []): InstrumentController {
  const context = canvas.getContext('2d')!;
  const paint = mode === 'radar' ? radarPainter(signals) : painters[mode];
  const frame: Frame = { ctx: context, width: 0, height: 0, cx: 0, cy: 0, radius: 0, compact: false, time: 0 };
  // No nível suave tudo anda mais devagar.
  const pace = gentle ? 0.65 : 1;

  let running = false;
  let inView = false;
  let paused = false;
  let request = 0;
  let last = 0;

  const draw = () => {
    context.clearRect(0, 0, frame.width, frame.height);
    context.globalAlpha = 1;
    paint(frame);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    frame.width = rect.width;
    frame.height = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    frame.compact = rect.width < 900;
    // O radar é o protagonista da home; os outros ficam mais à direita, longe do título.
    const wide =
      mode === 'radar'
        ? { radius: Math.min(rect.height * 0.39, rect.width * 0.27), cx: 0.75 }
        : { radius: Math.min(rect.height * 0.36, rect.width * 0.19), cx: 0.78 };
    // No celular o instrumento é uma faixa acima do título.
    frame.radius = frame.compact ? Math.min(rect.width * 0.26, 130) : wide.radius;
    frame.cx = frame.compact ? rect.width * 0.5 : rect.width * wide.cx;
    frame.cy = frame.compact ? 72 + frame.radius + 22 : rect.height * 0.53;
    if (!running) draw();
  };

  const tick = (now: number) => {
    if (!running) return;
    frame.time += Math.min(0.05, (now - last) / 1000 || 0) * pace;
    last = now;
    draw();
    request = requestAnimationFrame(tick);
  };
  const start = () => {
    if (running || paused || !inView || document.hidden) return;
    running = true;
    last = performance.now();
    request = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(request);
  };

  new ResizeObserver(resize).observe(canvas);
  // Só gasta bateria enquanto está na tela e a aba está visível.
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) start();
    else stop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  document.fonts.ready.then(resize);
  resize();

  return {
    toggle() {
      paused = !paused;
      if (paused) stop();
      else start();
      return paused;
    },
  };
}
