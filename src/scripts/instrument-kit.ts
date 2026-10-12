// Ferramentas de desenho compartilhadas pelos instrumentos (canvas 2D).

export interface Frame {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  cx: number;
  cy: number;
  /** Tudo é desenhado dentro de um círculo com este raio em volta de (cx, cy). */
  radius: number;
  compact: boolean;
  /** Segundos desde o início, já descontadas as pausas. */
  time: number;
}

export type Painter = (frame: Frame) => void;

export const TAU = Math.PI * 2;
export const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';
/** Escala de severidade do produto: só codifica gravidade. */
export const SEV = { red: '255 92 83', orange: '255 123 66', amber: '227 179 65', green: '63 185 80' };
export const BLUE = '91 139 255';
export const WHITE = '245 247 251';
export const MUTED = '178 188 203';

const SCALE = [SEV.red, SEV.orange, SEV.amber, SEV.green].map((color) => color.split(' ').map(Number));

export const rgb = (color: string, alpha = 1) => `rgb(${color} / ${alpha})`;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};
/** 0 antes de `from`, 1 depois de `to`, suave no meio. */
export const span = (value: number, from: number, to: number) => smooth((value - from) / (to - from));
/** Número pseudoaleatório estável em 0..1. */
export const hash = (n: number) => {
  const s = Math.sin(n * 12.9898 + 4.1) * 43758.5453;
  return s - Math.floor(s);
};
/** Ruído suave (soma de senos), em 0..1. */
export const wave = (x: number) => 0.5 + 0.25 * Math.sin(x) + 0.15 * Math.sin(x * 2.3 + 1.7) + 0.1 * Math.sin(x * 5.1 + 0.4);

/** Cor na escala de severidade: 0 = vermelho (crise), 1 = verde (estável). */
export function severity(t: number) {
  const scaled = Math.min(0.999, Math.max(0, t)) * (SCALE.length - 1);
  const from = SCALE[Math.floor(scaled)];
  const to = SCALE[Math.floor(scaled) + 1];
  const mix = scaled - Math.floor(scaled);
  return from.map((channel, i) => Math.round(channel + (to[i] - channel) * mix)).join(' ');
}

export function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, align: CanvasTextAlign = 'center', size = 11) {
  ctx.font = `500 ${size}px ${MONO}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function seg(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, style: string, width = 1, dash: number[] = []) {
  ctx.setLineDash(dash);
  ctx.strokeStyle = style;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function ring(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, style: string, width = 1, from = 0, to = TAU) {
  ctx.strokeStyle = style;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0, r), from, to);
  ctx.stroke();
}

export function box(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill?: string, stroke?: string, width = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, Math.max(0, w), Math.max(0, h), r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

export function dot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, halo = 0) {
  if (halo > 0.02) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
    gradient.addColorStop(0, rgb(color, 0.4 * halo));
    gradient.addColorStop(1, rgb(color, 0));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 6, 0, TAU);
    ctx.fill();
  }
  ctx.fillStyle = rgb(color, alpha);
  ctx.beginPath();
  ctx.arc(x, y, size, 0, TAU);
  ctx.fill();
}
