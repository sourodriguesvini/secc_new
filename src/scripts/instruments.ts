// Instrumentos: o visual vivo do topo de cada página, desenhado em canvas 2D.
// Todos compartilham moldura (posição, pausa, visibilidade) e a escala de
// severidade do produto; cada modo conta uma coisa diferente:
//   radar  — sinais a caminho da crise (borda = 18 meses antes, centro = crise)
//   pulse  — um indicador monitorado contra o seu limite
//   flow   — o caminho entrada → processamento → saída
//   orbit  — o núcleo e as frentes que giram em volta dele
//   grid   — cobertura: o que já está confirmado, em leitura ou pendente

import { gentle } from './motion';

export type InstrumentMode = 'radar' | 'flow' | 'pulse' | 'orbit' | 'grid';

export interface RadarSignal {
  label: string;
  months: number;
  angle: number;
}

interface Frame {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  cx: number;
  cy: number;
  radius: number;
  compact: boolean;
  /** Segundos desde o início, já descontadas as pausas. */
  time: number;
  /** Segundos desde o quadro anterior. */
  delta: number;
}

type Painter = (frame: Frame) => void;

const TAU = Math.PI * 2;
const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';
const SEVERITY = [
  [255, 92, 83],
  [255, 123, 66],
  [227, 179, 65],
  [63, 185, 80],
];
const BLUE = '91 139 255';
const WHITE = '245 247 251';

/** Cor na escala de severidade: 0 = vermelho (crise), 1 = verde (estável). */
function severity(t: number) {
  const scaled = Math.min(0.999, Math.max(0, t)) * (SEVERITY.length - 1);
  const from = SEVERITY[Math.floor(scaled)];
  const to = SEVERITY[Math.floor(scaled) + 1];
  const mix = scaled - Math.floor(scaled);
  return from.map((channel, i) => Math.round(channel + (to[i] - channel) * mix)).join(' ');
}

/** Ruído suave e determinístico (soma de senos), em 0..1. */
const wave = (x: number) => 0.5 + 0.25 * Math.sin(x) + 0.15 * Math.sin(x * 2.3 + 1.7) + 0.1 * Math.sin(x * 5.1 + 0.4);

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, align: CanvasTextAlign = 'center', size = 11) {
  ctx.font = `500 ${size}px ${MONO}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function glowDot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, halo = 0) {
  if (halo > 0.02) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
    gradient.addColorStop(0, `rgb(${color} / ${0.4 * halo})`);
    gradient.addColorStop(1, `rgb(${color} / 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 6, 0, TAU);
    ctx.fill();
  }
  ctx.fillStyle = `rgb(${color} / ${alpha})`;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, TAU);
  ctx.fill();
}

/* ---------- radar ---------- */
function radarPainter(signals: RadarSignal[]): Painter {
  const HORIZON = 18;
  const period = gentle ? 14 : 9;
  const noise = Array.from({ length: 26 }, (_, i) => ({ months: 2 + ((i * 7.3) % 15.5), angle: (i * 137.5) % 360 }));
  const blips = [
    ...signals.map((signal, index) => ({ ...signal, lit: 0, index })),
    ...noise.map((point) => ({ ...point, label: '', lit: 0, index: -1 })),
  ];
  let previous = 0;

  return ({ ctx, width, cx, cy, radius, compact, time }) => {
    const sweep = ((time / period) % 1) * TAU;

    for (let ring = 1; ring <= 3; ring += 1) {
      ctx.beginPath();
      ctx.arc(cx, cy, (radius * ring) / 3, 0, TAU);
      ctx.strokeStyle = `rgb(255 255 255 / ${ring === 3 ? 0.2 : 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgb(255 255 255 / 0.05)';
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy);
    ctx.lineTo(cx + radius, cy);
    ctx.moveTo(cx, cy - radius);
    ctx.lineTo(cx, cy + radius);
    ctx.stroke();

    // Varredura: cunha que desbota atrás da linha de frente.
    const wedge = ctx.createConicGradient(sweep - TAU * 0.22, cx, cy);
    wedge.addColorStop(0, `rgb(${BLUE} / 0)`);
    wedge.addColorStop(0.22, `rgb(${BLUE} / 0.2)`);
    wedge.addColorStop(0.2201, `rgb(${BLUE} / 0)`);
    ctx.fillStyle = wedge;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, sweep - TAU * 0.22, sweep);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgb(122 162 255 / 0.75)';
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweep) * radius, cy + Math.sin(sweep) * radius);
    ctx.stroke();

    label(ctx, '18 MESES ANTES', cx, cy - radius - 14, 'rgb(178 188 203 / 0.7)');
    label(ctx, 'CRISE', cx, cy + 16, 'rgb(255 92 83 / 0.95)');
    glowDot(ctx, cx, cy, 3, '255 92 83', 1);

    for (const blip of blips) {
      const angle = (blip.angle / 360) * TAU;
      // Acende quem a linha de frente acabou de cruzar (inclusive na virada de 360° para 0°).
      const crossed = previous <= sweep ? angle > previous && angle <= sweep : angle > previous || angle <= sweep;
      blip.lit = crossed ? 1 : blip.lit * (blip.label ? 0.988 : 0.965);

      const distance = (blip.months / HORIZON) * radius;
      const x = cx + Math.cos(angle) * distance;
      const y = cy + Math.sin(angle) * distance;
      const color = severity(blip.months / HORIZON);
      const base = blip.label ? 0.55 : 0.14;
      glowDot(ctx, x, y, blip.label ? 3.5 : 1.75, color, base + (1 - base) * blip.lit, blip.lit);

      // No celular cabe menos texto: o rótulo só aparece quando a varredura passa.
      if (blip.label && (!compact || blip.lit > 0.3)) {
        ctx.font = `500 12px ${MONO}`;
        const labelWidth = ctx.measureText(blip.label).width + 12;
        // Abre para fora do centro, sem invadir a coluna de texto nem sair da tela.
        const textColumn = compact ? 0 : width * 0.52;
        const right = x >= cx ? x + labelWidth < width - 8 : x - labelWidth < textColumn;
        label(ctx, blip.label, x + (right ? 12 : -12), y, `rgb(${WHITE} / ${compact ? blip.lit : 0.42 + 0.58 * blip.lit})`, right ? 'left' : 'right', 12);
      }
    }
    previous = sweep;
  };
}

/* ---------- pulse: indicador contra o limite ---------- */
const pulsePainter: Painter = ({ ctx, cx, cy, radius, time }) => {
  const left = cx - radius;
  const right = cx + radius;
  const top = cy - radius * 0.62;
  const bottom = cy + radius * 0.62;
  const limitY = cy + radius * 0.08;
  const speed = gentle ? 0.28 : 0.45;
  // Valor em 0..1 (1 = folga, 0 = estouro); desliza para a esquerda com o tempo.
  const valueAt = (u: number) => wave(u * 5.2 + time * speed);
  const yOf = (value: number) => bottom - value * (bottom - top);

  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = top + ((bottom - top) * i) / 4;
    ctx.strokeStyle = 'rgb(255 255 255 / 0.06)';
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = 'rgb(255 123 66 / 0.6)';
  ctx.beginPath();
  ctx.moveTo(left, limitY);
  ctx.lineTo(right, limitY);
  ctx.stroke();
  ctx.setLineDash([]);
  label(ctx, 'LIMITE', left, limitY - 12, 'rgb(255 123 66 / 0.9)', 'left');

  const steps = 90;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  for (let i = 0; i < steps; i += 1) {
    const u0 = i / steps;
    const u1 = (i + 1) / steps;
    const v0 = valueAt(u0);
    const v1 = valueAt(u1);
    // Abaixo do limite a linha esquenta: é ali que o indicador pede revisão.
    const breach = yOf((v0 + v1) / 2) > limitY;
    ctx.strokeStyle = `rgb(${breach ? severity(Math.max(0, (v0 + v1) / 2 - 0.1)) : BLUE} / ${0.25 + 0.75 * u1})`;
    ctx.beginPath();
    ctx.moveTo(left + (right - left) * u0, yOf(v0));
    ctx.lineTo(left + (right - left) * u1, yOf(v1));
    ctx.stroke();
  }

  const head = valueAt(1);
  const headY = yOf(head);
  const headColor = headY > limitY ? severity(Math.max(0, head - 0.1)) : BLUE;
  glowDot(ctx, right, headY, 4, headColor, 1, 0.6 + 0.4 * Math.sin(time * 3));
  label(ctx, headY > limitY ? 'ABAIXO DO LIMITE' : 'DENTRO DO LIMITE', right, headY - 18, `rgb(${headColor} / 0.95)`, 'right');
  label(ctx, 'LEITURA CONTÍNUA', left, top - 14, 'rgb(178 188 203 / 0.7)', 'left');
};

/* ---------- flow: entrada → processamento → saída ---------- */
const flowPainter: Painter = ({ ctx, cx, cy, radius, time }) => {
  const columns = [
    { name: 'ENTRADA', x: cx - radius * 0.9, count: 3 },
    { name: 'PROCESSAMENTO', x: cx, count: 2 },
    { name: 'SAÍDA', x: cx + radius * 0.9, count: 3 },
  ];
  const nodes = columns.map((column) =>
    Array.from({ length: column.count }, (_, i) => ({ x: column.x, y: cy + (i - (column.count - 1) / 2) * radius * 0.5 })),
  );
  const links: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];
  for (let c = 0; c < nodes.length - 1; c += 1) {
    for (const from of nodes[c]) for (const to of nodes[c + 1]) links.push({ from, to });
  }
  const point = (link: (typeof links)[number], t: number) => {
    // Curva em S entre as duas colunas.
    const mid = (link.from.x + link.to.x) / 2;
    const a = (1 - t) ** 3;
    const b = 3 * (1 - t) ** 2 * t;
    const c = 3 * (1 - t) * t ** 2;
    const d = t ** 3;
    return { x: a * link.from.x + b * mid + c * mid + d * link.to.x, y: a * link.from.y + b * link.from.y + c * link.to.y + d * link.to.y };
  };

  ctx.lineWidth = 1;
  links.forEach((link) => {
    ctx.strokeStyle = 'rgb(255 255 255 / 0.08)';
    ctx.beginPath();
    for (let i = 0; i <= 24; i += 1) {
      const p = point(link, i / 24);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  });

  const speed = gentle ? 0.16 : 0.26;
  links.forEach((link, index) => {
    const t = (time * speed + index * 0.173) % 1;
    const p = point(link, t);
    const second = index >= nodes[0].length * nodes[1].length;
    glowDot(ctx, p.x, p.y, 2.5, second ? severity(0.95) : BLUE, 0.35 + 0.65 * Math.sin(t * Math.PI), Math.sin(t * Math.PI));
  });

  columns.forEach((column, c) => {
    nodes[c].forEach((node) => {
      ctx.fillStyle = '#0d0f14';
      ctx.strokeStyle = c === 2 ? `rgb(${severity(0.95)} / 0.8)` : `rgb(${BLUE} / 0.8)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 7, 0, TAU);
      ctx.fill();
      ctx.stroke();
    });
    label(ctx, column.name, column.x, cy - radius * 0.86, 'rgb(178 188 203 / 0.75)');
  });
};

/* ---------- orbit: o núcleo e as frentes ---------- */
const orbitPainter: Painter = ({ ctx, cx, cy, radius, time }) => {
  const speed = gentle ? 0.5 : 1;
  const rings = [
    { r: 0.42, count: 2, rate: 0.16, offset: 0.4 },
    { r: 0.7, count: 3, rate: -0.1, offset: 1.9 },
    { r: 0.98, count: 3, rate: 0.065, offset: 3.1 },
  ];

  rings.forEach((ring) => {
    ctx.strokeStyle = 'rgb(255 255 255 / 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius * ring.r, radius * ring.r * 0.62, -0.32, 0, TAU);
    ctx.stroke();
  });

  rings.forEach((ring, ringIndex) => {
    for (let i = 0; i < ring.count; i += 1) {
      const angle = ring.offset + (i / ring.count) * TAU + time * ring.rate * speed;
      const ex = Math.cos(angle) * radius * ring.r;
      const ey = Math.sin(angle) * radius * ring.r * 0.62;
      // Mesma inclinação das elipses.
      const x = cx + ex * Math.cos(-0.32) - ey * Math.sin(-0.32);
      const y = cy + ex * Math.sin(-0.32) + ey * Math.cos(-0.32);
      const beat = 0.5 + 0.5 * Math.sin(time * 1.4 + ringIndex * 2 + i * 1.3);

      ctx.strokeStyle = `rgb(${BLUE} / ${0.05 + 0.2 * beat})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
      glowDot(ctx, x, y, 4.5, ringIndex === 0 ? WHITE : BLUE, 0.6 + 0.4 * beat, beat * 0.7);
    }
  });

  const breath = 0.5 + 0.5 * Math.sin(time * 1.1);
  glowDot(ctx, cx, cy, 10, BLUE, 1, 0.5 + 0.5 * breath);
  ctx.strokeStyle = `rgb(${BLUE} / ${0.5 - 0.4 * breath})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, 16 + breath * 14, 0, TAU);
  ctx.stroke();
  label(ctx, 'NÚCLEO', cx, cy + 34, `rgb(${WHITE} / 0.85)`);
};

/* ---------- grid: cobertura ---------- */
const gridPainter: Painter = ({ ctx, cx, cy, radius, time }) => {
  const cols = 12;
  const rows = 8;
  const cell = (radius * 2) / cols;
  const left = cx - radius;
  const top = cy - (rows * cell) / 2;
  const scan = ((time * (gentle ? 0.05 : 0.085)) % 1.25) * (cols + rows);

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const seed = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
      const noise = seed - Math.floor(seed);
      const order = c + r;
      const x = left + c * cell + 2;
      const y = top + r * cell + 2;
      const size = cell - 4;
      const reached = scan > order;
      const front = Math.max(0, 1 - Math.abs(scan - order) / 1.6);

      // Depois que a leitura passa: a maior parte confirma, um pouco fica pendente, um pouco nunca é coberto.
      let fill = 'rgb(255 255 255 / 0.035)';
      if (reached && noise > 0.2) fill = `rgb(${severity(0.98)} / ${0.16 + 0.24 * noise})`;
      if (reached && noise <= 0.2 && noise > 0.08) fill = `rgb(${severity(0.6)} / 0.42)`;
      if (front > 0) fill = `rgb(${BLUE} / ${0.25 + 0.6 * front})`;

      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, 3);
      ctx.fill();
    }
  }
  label(ctx, 'COBERTURA', left, top - 14, 'rgb(178 188 203 / 0.75)', 'left');
  label(ctx, 'CONFIRMADO', left, top + rows * cell + 16, `rgb(${severity(0.98)} / 0.9)`, 'left');
  label(ctx, 'A CONFIRMAR', left + radius * 0.75, top + rows * cell + 16, `rgb(${severity(0.6)} / 0.9)`, 'left');
  label(ctx, 'EM LEITURA', left + radius * 1.5, top + rows * cell + 16, `rgb(${BLUE} / 0.95)`, 'left');
};

/* ---------- moldura comum ---------- */
export interface InstrumentController {
  /** Pausa ou retoma a animação; devolve se ficou pausada. */
  toggle(): boolean;
}

export function initInstrument(canvas: HTMLCanvasElement, mode: InstrumentMode, signals: RadarSignal[] = []): InstrumentController {
  const context = canvas.getContext('2d')!;
  const painters: Record<InstrumentMode, Painter> = {
    radar: radarPainter(signals),
    pulse: pulsePainter,
    flow: flowPainter,
    orbit: orbitPainter,
    grid: gridPainter,
  };
  const paint = painters[mode];
  const frame: Frame = { ctx: context, width: 0, height: 0, cx: 0, cy: 0, radius: 0, compact: false, time: 0, delta: 0 };

  let running = false;
  let inView = false;
  let paused = false;
  let request = 0;
  let last = 0;

  const draw = () => {
    context.clearRect(0, 0, frame.width, frame.height);
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
    // No desktop o instrumento ocupa a metade direita; no celular é uma faixa acima do título.
    // O radar é o protagonista da home; os outros instrumentos ficam mais à direita, longe do título.
    const wide = mode === 'radar' ? { radius: Math.min(rect.height * 0.39, rect.width * 0.27), cx: 0.75 } : { radius: Math.min(rect.height * 0.36, rect.width * 0.19), cx: 0.78 };
    frame.radius = frame.compact ? Math.min(rect.width * 0.26, 130) : wide.radius;
    frame.cx = frame.compact ? rect.width * 0.5 : rect.width * wide.cx;
    frame.cy = frame.compact ? 72 + frame.radius + 22 : rect.height * 0.53;
    if (!running) draw();
  };

  const tick = (now: number) => {
    if (!running) return;
    frame.delta = Math.min(0.05, (now - last) / 1000 || 0);
    frame.time += frame.delta;
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
