// Radar do hero. A borda é "18 meses antes", o centro é a crise: cada sinal fica
// à distância em meses que lhe cabe, e acende quando a varredura passa por ele.

interface Signal {
  label: string;
  months: number;
  angle: number;
}

const HORIZON = 18;
const SWEEP_SECONDS = 9;
const TAU = Math.PI * 2;
const SEVERITY = ['#ff5c53', '#ff7b42', '#e3b341', '#3fb950'];

/** Cor pela proximidade da crise: vermelho no centro, verde na borda. */
function severityColor(months: number) {
  const t = Math.min(0.999, Math.max(0, months / HORIZON)) * (SEVERITY.length - 1);
  const from = SEVERITY[Math.floor(t)];
  const to = SEVERITY[Math.floor(t) + 1];
  const mix = t - Math.floor(t);
  const channel = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  const rgb = [0, 1, 2].map((i) => Math.round(channel(from, i) + (channel(to, i) - channel(from, i)) * mix));
  return `${rgb[0]} ${rgb[1]} ${rgb[2]}`;
}

export function initRadar(canvas: HTMLCanvasElement, signals: Signal[], reduced: boolean) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const noise = Array.from({ length: 26 }, (_, i) => ({
    months: 2 + ((i * 7.3) % 15.5),
    angle: (i * 137.5) % 360,
  }));
  const blips = [
    ...signals.map((signal, index) => ({ ...signal, lit: 0, index })),
    ...noise.map((point) => ({ ...point, label: '', lit: 0, index: -1 })),
  ];

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let radius = 0;
  let previousAngle = 0;
  let running = false;
  let frame = 0;
  let startedAt = 0;
  let inView = false;
  let compact = false;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const wide = width >= 900;
    compact = !wide;
    // No desktop o radar ocupa a metade direita; no celular é uma faixa acima do título.
    radius = wide ? Math.min(height * 0.39, width * 0.27) : Math.min(width * 0.26, 130);
    cx = wide ? width * 0.75 : width * 0.5;
    cy = wide ? height * 0.53 : 72 + radius + 22;
    if (!running) draw(reduced ? 0.62 * TAU : previousAngle);
  };

  const position = (months: number, angleDeg: number) => {
    const r = (months / HORIZON) * radius;
    const a = (angleDeg / 360) * TAU;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  };

  function draw(sweep: number) {
    ctx!.clearRect(0, 0, width, height);

    // Anéis de 6, 12 e 18 meses.
    for (let ring = 1; ring <= 3; ring += 1) {
      ctx!.beginPath();
      ctx!.arc(cx, cy, (radius * ring) / 3, 0, TAU);
      ctx!.strokeStyle = `rgb(255 255 255 / ${ring === 3 ? 0.2 : 0.1})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }
    ctx!.strokeStyle = 'rgb(255 255 255 / 0.05)';
    ctx!.beginPath();
    ctx!.moveTo(cx - radius, cy);
    ctx!.lineTo(cx + radius, cy);
    ctx!.moveTo(cx, cy - radius);
    ctx!.lineTo(cx, cy + radius);
    ctx!.stroke();

    // Varredura: cunha que desbota atrás da linha de frente.
    const wedge = ctx!.createConicGradient(sweep - TAU * 0.22, cx, cy);
    wedge.addColorStop(0, 'rgb(91 139 255 / 0)');
    wedge.addColorStop(0.22, 'rgb(91 139 255 / 0.2)');
    wedge.addColorStop(0.2201, 'rgb(91 139 255 / 0)');
    ctx!.fillStyle = wedge;
    ctx!.beginPath();
    ctx!.moveTo(cx, cy);
    ctx!.arc(cx, cy, radius, sweep - TAU * 0.22, sweep);
    ctx!.closePath();
    ctx!.fill();
    ctx!.strokeStyle = 'rgb(122 162 255 / 0.75)';
    ctx!.lineWidth = 1.25;
    ctx!.beginPath();
    ctx!.moveTo(cx, cy);
    ctx!.lineTo(cx + Math.cos(sweep) * radius, cy + Math.sin(sweep) * radius);
    ctx!.stroke();

    // Rótulos dos extremos.
    ctx!.font = '500 11px "JetBrains Mono Variable", ui-monospace, monospace';
    ctx!.textBaseline = 'middle';
    ctx!.textAlign = 'center';
    ctx!.fillStyle = 'rgb(178 188 203 / 0.7)';
    ctx!.fillText('18 MESES ANTES', cx, cy - radius - 14);
    ctx!.fillStyle = 'rgb(255 92 83 / 0.95)';
    ctx!.fillText('CRISE', cx, cy + 16);
    ctx!.beginPath();
    ctx!.arc(cx, cy, 3, 0, TAU);
    ctx!.fill();

    for (const blip of blips) {
      const { x, y } = position(blip.months, blip.angle);
      const color = severityColor(blip.months);
      const lit = reduced ? (blip.label ? 0.9 : 0.25) : blip.lit;
      const base = blip.label ? 0.55 : 0.14;
      const alpha = base + (1 - base) * lit;
      const size = blip.label ? 3.5 : 1.75;

      if (lit > 0.02) {
        const halo = ctx!.createRadialGradient(x, y, 0, x, y, 22);
        halo.addColorStop(0, `rgb(${color} / ${0.4 * lit})`);
        halo.addColorStop(1, `rgb(${color} / 0)`);
        ctx!.fillStyle = halo;
        ctx!.beginPath();
        ctx!.arc(x, y, 22, 0, TAU);
        ctx!.fill();
      }
      ctx!.fillStyle = `rgb(${color} / ${alpha})`;
      ctx!.beginPath();
      ctx!.arc(x, y, size, 0, TAU);
      ctx!.fill();

      // No celular cabe menos texto: o rótulo só aparece quando a varredura passa (ou metade deles, parado).
      const showLabel = !compact || (reduced ? blip.index % 2 === 0 : lit > 0.3);
      if (blip.label && showLabel) {
        ctx!.font = '500 12px "JetBrains Mono Variable", ui-monospace, monospace';
        // O rótulo abre para fora do centro, sem invadir a coluna de texto nem sair da tela.
        const labelWidth = ctx!.measureText(blip.label).width + 12;
        const textColumn = width >= 900 ? width * 0.52 : 0;
        const right = x >= cx ? x + labelWidth < width - 8 : x - labelWidth < textColumn;
        ctx!.textAlign = right ? 'left' : 'right';
        ctx!.fillStyle = `rgb(245 247 251 / ${0.42 + 0.58 * lit})`;
        ctx!.fillText(blip.label, x + (right ? 12 : -12), y);
      }
    }
  }

  function tick(now: number) {
    if (!running) return;
    if (!startedAt) startedAt = now;
    const sweep = (((now - startedAt) / 1000 / SWEEP_SECONDS) % 1) * TAU;

    for (const blip of blips) {
      const angle = (blip.angle / 360) * TAU;
      // Acende quem a linha de frente acabou de cruzar (inclusive na virada de 360° para 0°).
      const crossed = previousAngle <= sweep ? angle > previousAngle && angle <= sweep : angle > previousAngle || angle <= sweep;
      blip.lit = crossed ? 1 : blip.lit * (blip.label ? 0.988 : 0.965);
    }
    previousAngle = sweep;
    draw(sweep);
    frame = requestAnimationFrame(tick);
  }

  const start = () => {
    if (running || reduced || !inView || document.hidden) return;
    running = true;
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  new ResizeObserver(resize).observe(canvas);
  // Só gasta bateria enquanto o hero está na tela e a aba está visível.
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) start();
    else stop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  document.fonts.ready.then(resize);
  resize();
}
