// Um instrumento por página, cada um desenhando o que a página diz.

import { BLUE, MUTED, SEV, TAU, WHITE, box, dot, hash, label, lerp, ring, rgb, seg, severity, smooth, span, wave, type Painter } from './instrument-kit';

/* ==================== SOLUÇÕES ==================== */

/** SECC: o núcleo e as frentes que giram em volta dele. */
const secc: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const tilt = -0.32;
  const orbits = [
    { r: 0.42, count: 2, rate: 0.16, offset: 0.4 },
    { r: 0.7, count: 3, rate: -0.1, offset: 1.9 },
    { r: 0.98, count: 3, rate: 0.065, offset: 3.1 },
  ];
  orbits.forEach((orbit) => {
    ctx.strokeStyle = 'rgb(255 255 255 / 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * orbit.r, R * orbit.r * 0.62, tilt, 0, TAU);
    ctx.stroke();
  });
  orbits.forEach((orbit, index) => {
    for (let i = 0; i < orbit.count; i += 1) {
      const angle = orbit.offset + (i / orbit.count) * TAU + t * orbit.rate;
      const ex = Math.cos(angle) * R * orbit.r;
      const ey = Math.sin(angle) * R * orbit.r * 0.62;
      const x = cx + ex * Math.cos(tilt) - ey * Math.sin(tilt);
      const y = cy + ex * Math.sin(tilt) + ey * Math.cos(tilt);
      const beat = 0.5 + 0.5 * Math.sin(t * 1.4 + index * 2 + i * 1.3);
      seg(ctx, cx, cy, x, y, rgb(BLUE, 0.05 + 0.2 * beat));
      dot(ctx, x, y, 4.5, index === 0 ? WHITE : BLUE, 0.6 + 0.4 * beat, beat * 0.7);
    }
  });
  const breath = 0.5 + 0.5 * Math.sin(t * 1.1);
  dot(ctx, cx, cy, 10, BLUE, 1, 0.5 + 0.5 * breath);
  ring(ctx, cx, cy, 16 + breath * 14, rgb(BLUE, 0.5 - 0.4 * breath));
  label(ctx, 'NÚCLEO', cx, cy + 34, rgb(WHITE, 0.85));
};

/** Radar da Crise: o Índice de Crise, com a parte sem cobertura à mostra. */
const indice: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const oy = cy + R * 0.38;
  [SEV.green, SEV.amber, SEV.orange, SEV.red].forEach((color, i) => {
    const from = Math.PI + (i / 4) * Math.PI + 0.02;
    const to = Math.PI + ((i + 1) / 4) * Math.PI - 0.02;
    // Um componente sem dados fica tracejado: a faixa permanece, o número não é inventado.
    const uncovered = i === 1;
    ctx.setLineDash(uncovered ? [4, 6] : []);
    ring(ctx, cx, oy, R * 0.92, rgb(color, uncovered ? 0.6 : 0.85), uncovered ? 3 : 10, from, to);
  });
  ctx.setLineDash([]);
  for (let i = 0; i <= 12; i += 1) {
    const a = Math.PI + (i / 12) * Math.PI;
    seg(ctx, cx + Math.cos(a) * R * 0.76, oy + Math.sin(a) * R * 0.76, cx + Math.cos(a) * R * 0.81, oy + Math.sin(a) * R * 0.81, rgb(WHITE, 0.25));
  }
  const value = 0.66 + 0.05 * Math.sin(t * 0.7) + 0.02 * Math.sin(t * 2.1);
  const a = Math.PI + value * Math.PI;
  seg(ctx, cx, oy, cx + Math.cos(a) * R * 0.72, oy + Math.sin(a) * R * 0.72, rgb(WHITE, 0.95), 2);
  dot(ctx, cx, oy, 5, WHITE, 1, 0.5);
  dot(ctx, cx + Math.cos(a) * R * 0.92, oy + Math.sin(a) * R * 0.92, 4, SEV.orange, 1, 0.6 + 0.4 * Math.sin(t * 3));
  label(ctx, 'ÍNDICE DE CRISE', cx, oy - R * 1.1, rgb(MUTED, 0.75));
  label(ctx, 'LEITURA PARCIAL', cx, oy + 22, rgb(SEV.orange, 0.95));
  if (!compact) {
    label(ctx, 'SEM COBERTURA', cx - R * 0.42, oy - R * 0.62, rgb(MUTED, 0.75), 'left', 10);
    label(ctx, 'ESTÁVEL', cx - R * 0.92, oy + 18, rgb(SEV.green, 0.8));
    label(ctx, 'CRÍTICO', cx + R * 0.92, oy + 18, rgb(SEV.red, 0.8));
  }
};

/** CredPass: o pedido passa (ou não) pela política do fundo antes de virar oferta. */
const credpass: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const x0 = cx - R * 0.95;
  const x1 = cx + R * 0.95;
  const gate = cx;
  const funds = [-0.5, 0, 0.5].map((k) => cy + k * R);

  seg(ctx, x0, cy, gate, cy, rgb(WHITE, 0.08));
  funds.forEach((y) => seg(ctx, gate, cy, x1, y, rgb(WHITE, 0.08)));
  // O portão: uma barra com abertura no meio.
  seg(ctx, gate, cy - R * 0.72, gate, cy - R * 0.16, rgb(WHITE, 0.35), 2);
  seg(ctx, gate, cy + R * 0.16, gate, cy + R * 0.72, rgb(WHITE, 0.35), 2);

  for (let i = 0; i < 9; i += 1) {
    const phase = (t * 0.16 + i / 9) % 1;
    const passes = i % 3 !== 0;
    const spread = (hash(i) - 0.5) * R * 0.3;
    // Quem não passa na política chega fora da abertura e para ali.
    const offAxis = (spread < 0 ? -1 : 1) * Math.max(Math.abs(spread), R * 0.3);
    if (phase < 0.5) {
      const u = phase / 0.5;
      dot(ctx, lerp(x0, gate - 6, u), passes ? lerp(cy + spread, cy, smooth(u)) : lerp(cy, cy + offAxis, smooth(u)), 2.5, BLUE, 0.95, 0.5);
    } else if (passes) {
      const u = (phase - 0.5) / 0.5;
      dot(ctx, lerp(gate, x1, u), lerp(cy, funds[(i * 2) % 3], smooth(u)), 2.5, SEV.green, 1, 0.6);
    } else {
      dot(ctx, gate - 6, cy + offAxis, 2.5, MUTED, 0.75 * (1 - (phase - 0.5) / 0.5), 0);
    }
  }

  ring(ctx, x0, cy, 8, rgb(BLUE, 0.9), 1.5);
  funds.forEach((y) => ring(ctx, x1, y, 8, rgb(SEV.green, 0.9), 1.5));
  label(ctx, 'PEDIDO', x0, cy - R * 0.86, rgb(MUTED, 0.75), 'left');
  label(ctx, compact ? 'POLÍTICA' : 'POLÍTICA DO FUNDO', gate, cy - R * 0.86, rgb(MUTED, 0.75));
  label(ctx, 'OFERTAS', x1, cy - R * 0.86, rgb(MUTED, 0.75), 'right');
};

/** WatchDog: o indicador contra o limite; quando fura, gestor e financiador são avisados juntos. */
const watchdog: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const left = cx - R;
  const right = cx + R;
  const top = cy - R * 0.62;
  const bottom = cy + R * 0.5;
  const limitY = cy + R * 0.04;
  const valueAt = (u: number) => wave(u * 5.2 + t * 0.45);
  const yOf = (value: number) => bottom - value * (bottom - top);

  for (let i = 0; i <= 4; i += 1) seg(ctx, left, lerp(top, bottom, i / 4), right, lerp(top, bottom, i / 4), 'rgb(255 255 255 / 0.06)');
  seg(ctx, left, limitY, right, limitY, rgb(SEV.orange, 0.6), 1, [6, 6]);
  label(ctx, 'LIMITE', left, limitY - 12, rgb(SEV.orange, 0.9), 'left');

  const steps = 90;
  ctx.lineJoin = 'round';
  for (let i = 0; i < steps; i += 1) {
    const u0 = i / steps;
    const u1 = (i + 1) / steps;
    const mid = (valueAt(u0) + valueAt(u1)) / 2;
    const color = yOf(mid) > limitY ? severity(Math.max(0, mid - 0.1)) : BLUE;
    seg(ctx, lerp(left, right, u0), yOf(valueAt(u0)), lerp(left, right, u1), yOf(valueAt(u1)), rgb(color, 0.25 + 0.75 * u1), 2);
  }

  const headY = yOf(valueAt(1));
  const breach = headY > limitY;
  dot(ctx, right, headY, 4, breach ? SEV.orange : BLUE, 1, 0.6 + 0.4 * Math.sin(t * 3));
  label(ctx, 'LEITURA CONTÍNUA', left, top - 14, rgb(MUTED, 0.7), 'left');
  ['GESTOR', 'FINANCIADOR'].forEach((name, i) => {
    const x = left + i * R * (compact ? 0.9 : 0.75);
    dot(ctx, x + 4, bottom + 24, 4, breach ? SEV.orange : WHITE, breach ? 1 : 0.3, breach ? 0.7 : 0);
    label(ctx, breach && !compact ? `${name} AVISADO` : name, x + 14, bottom + 24, rgb(breach ? SEV.orange : MUTED, breach ? 0.95 : 0.6), 'left', 10);
  });
};

/** Academy: a trilha avança unidade por unidade; o certificado só fecha com revisão humana. */
const trilha: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const units = 7;
  const at = (u: number) => ({ x: cx - R * 0.95 + u * R * 1.9, y: cy + Math.sin(u * Math.PI * 2.5) * R * 0.36 });
  const phase = (t % 16) / 16;
  const progress = Math.min(1, phase / 0.7);
  const review = span(phase, 0.72, 0.9);
  const path = (to: number, style: string) => {
    ctx.beginPath();
    for (let i = 0; i <= 80 * to; i += 1) {
      const p = at(i / 80);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = style;
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  path(1, rgb(WHITE, 0.12));
  path(progress, rgb(SEV.green, 0.7));

  for (let i = 0; i < units; i += 1) {
    const u = i / (units - 1);
    const p = at(u);
    const done = progress >= u - 0.001;
    if (i < units - 1) {
      dot(ctx, p.x, p.y, 5, done ? SEV.green : WHITE, done ? 1 : 0.3);
      continue;
    }
    ring(ctx, p.x, p.y, 11, rgb(WHITE, 0.3), 1.5);
    if (progress >= 1) ring(ctx, p.x, p.y, 11, rgb(BLUE, 0.95), 2, -Math.PI / 2, -Math.PI / 2 + review * TAU);
    dot(ctx, p.x, p.y, 5, review >= 1 ? SEV.green : WHITE, review >= 1 ? 1 : 0.35, review >= 1 ? 0.8 : 0);
  }
  if (progress < 1) {
    const marker = at(progress);
    dot(ctx, marker.x, marker.y, 4, BLUE, 1, 0.9);
  }
  label(ctx, 'TRILHA', cx - R * 0.95, cy - R * 0.62, rgb(MUTED, 0.75), 'left');
  const status = review >= 1 ? 'CERTIFICADO' : progress >= 1 ? 'REVISÃO HUMANA' : `${Math.round(progress * 100)}% CONCLUÍDO`;
  label(ctx, status, cx + R * 0.95, cy + R * 0.36 + 28, rgb(review >= 1 ? SEV.green : progress >= 1 ? BLUE : MUTED, 0.95), 'right');
};

/** PACT: aprende o método, passa pela banca, leva o plano para o quadro. */
const banca: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const cols = [cx - R * 0.78, cx, cx + R * 0.78];
  const cycle = 8;
  const filled = Math.floor(t / cycle) % 5;
  const phase = (t % cycle) / cycle;
  const slotY = (slot: number) => cy - R * 0.42 + slot * R * 0.24;

  ['MÉTODO', 'BANCA', 'QUADRO'].forEach((name, i) => {
    box(ctx, cols[i] - R * 0.3, cy - R * 0.55, R * 0.6, R * 1.1, 10, undefined, rgb(WHITE, 0.1));
    label(ctx, name, cols[i], cy - R * 0.72, rgb(MUTED, 0.75));
  });
  for (let slot = 0; slot < 4; slot += 1) {
    box(ctx, cols[2] - R * 0.22, slotY(slot), R * 0.44, R * 0.17, 4, slot < filled ? rgb(SEV.green, 0.35) : undefined, slot < filled ? undefined : rgb(WHITE, 0.12));
  }
  const judging = span(phase, 0.35, 0.65);
  for (let judge = 0; judge < 3; judge += 1) {
    const voted = judging > (judge + 1) / 3.2;
    dot(ctx, cols[1] + (judge - 1) * R * 0.16, cy - R * 0.36, 4, voted ? SEV.green : WHITE, voted ? 1 : 0.3, voted ? 0.6 : 0);
  }
  if (filled < 4) {
    const toBoard = span(phase, 0.7, 0.95);
    const x = lerp(lerp(cols[0], cols[1], span(phase, 0.05, 0.3)), cols[2], toBoard);
    const y = lerp(cy + R * 0.12, slotY(filled) + R * 0.085, toBoard);
    const color = judging >= 1 ? SEV.green : BLUE;
    box(ctx, x - R * 0.22, y - R * 0.085, R * 0.44, R * 0.17, 4, rgb(color, 0.5), rgb(color, 0.95));
  }
};

/** @TURN: a rede, a oportunidade que corre por ela, e a atribuição no fim. */
const rede: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const distance = R * (0.25 + 0.7 * ((i * 0.618) % 1));
    return { x: cx + Math.cos(i * 2.39996) * distance, y: cy + Math.sin(i * 2.39996) * distance * 0.72 };
  });
  nodes.forEach((a, i) =>
    nodes.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < R * 0.62) seg(ctx, a.x, a.y, b.x, b.y, rgb(WHITE, 0.09));
    }),
  );
  const routes = [[0, 3, 8, 11], [5, 2, 7, 10], [1, 4, 9, 6]];
  const cycle = 7;
  const route = routes[Math.floor(t / cycle) % routes.length];
  const phase = (t % cycle) / cycle;
  const travel = Math.min(1, phase / 0.7) * (route.length - 1);
  const attributed = phase > 0.75;
  const color = attributed ? SEV.green : BLUE;
  for (let step = 0; step < route.length - 1; step += 1) {
    const a = nodes[route[step]];
    const b = nodes[route[step + 1]];
    const u = Math.min(1, Math.max(0, travel - step));
    if (u > 0) seg(ctx, a.x, a.y, lerp(a.x, b.x, u), lerp(a.y, b.y, u), rgb(color, 0.9), 2);
  }
  nodes.forEach((node, i) => {
    const on = route.includes(i) && route.indexOf(i) <= travel;
    dot(ctx, node.x, node.y, on ? 5 : 3.5, on ? color : WHITE, on ? 1 : 0.4, on ? 0.6 : 0);
  });
  label(ctx, attributed ? 'OPORTUNIDADE ATRIBUÍDA' : 'OPORTUNIDADE EM CURSO', cx, cy - R * 0.9, rgb(attributed ? SEV.green : MUTED, 0.9));
};

/** Market: a oportunidade chega com origem, dono e material; uma pessoa avalia antes da vitrine. */
const market: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const cycle = 9;
  const phase = (t % cycle) / cycle;
  const shelved = Math.floor(t / cycle) % 4;
  const cardW = R * 0.72;
  const cardH = R * 0.62;
  const leave = span(phase, 0.82, 1);
  const x = cx - R * 0.28 + leave * R * 0.95;
  const alpha = 1 - leave;

  for (let slot = 0; slot < 3; slot += 1) {
    box(ctx, cx + R * 0.6, cy - R * 0.5 + slot * R * 0.36, R * 0.35, R * 0.28, 5, slot < shelved ? rgb(SEV.green, 0.3) : undefined, rgb(WHITE, 0.12));
  }
  label(ctx, 'VITRINE', cx + R * 0.78, cy - R * 0.68, rgb(MUTED, 0.75));
  box(ctx, x - cardW / 2, cy - cardH / 2, cardW, cardH, 8, rgb('20 23 31', alpha), rgb(WHITE, 0.25 * alpha));
  ['ORIGEM', 'DONO', 'MATERIAL'].forEach((tag, i) => {
    const arrive = span(phase, 0.04 + i * 0.12, 0.16 + i * 0.12);
    const ty = cy - cardH / 2 + R * 0.14 + i * R * 0.17;
    const tx = lerp(cx - R, x - cardW / 2 + R * 0.08, arrive);
    ctx.globalAlpha = arrive * alpha;
    box(ctx, tx, ty - R * 0.055, cardW - R * 0.16, R * 0.11, 3, rgb(BLUE, 0.3));
    if (!compact) label(ctx, tag, tx + 6, ty, rgb(WHITE, 0.9), 'left', 10);
    ctx.globalAlpha = 1;
  });
  // O anel só fecha depois que tudo chegou: é a avaliação de uma pessoa.
  const review = span(phase, 0.45, 0.75);
  if (review > 0 && leave < 1) ring(ctx, x, cy, cardH * 0.74, rgb(review >= 1 ? SEV.green : WHITE, 0.8 * alpha), 2, -Math.PI / 2, -Math.PI / 2 + review * TAU);
  const status = review >= 1 ? 'AVALIADA POR UMA PESSOA' : phase > 0.42 ? 'EM AVALIAÇÃO' : 'CONTEXTO CHEGANDO';
  label(ctx, status, cx - R * 0.28, cy + R * 0.66, rgb(review >= 1 ? SEV.green : MUTED, 0.9));
};

/** Comunidade: a pergunta entra com contexto e a resposta fica para o grupo. */
const comunidade: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const phase = (t % 11) / 11;
  const fade = 1 - span(phase, 0.92, 1);
  const bubbles = [
    { answer: false, w: 0.95, at: 0.03 },
    { answer: true, w: 0.8, at: 0.25 },
    { answer: true, w: 0.6, at: 0.45 },
    { answer: false, w: 0.5, at: 0.62 },
  ];
  bubbles.forEach((bubble, i) => {
    const pop = span(phase, bubble.at, bubble.at + 0.08) * fade;
    if (pop <= 0) return;
    const w = R * bubble.w;
    const h = R * 0.2;
    const x = bubble.answer ? cx + R * 0.5 - w : cx - R * 0.95;
    const y = cy - R * 0.6 + i * R * 0.3 + (1 - pop) * 8;
    const color = bubble.answer ? BLUE : WHITE;
    ctx.globalAlpha = pop;
    box(ctx, x, y, w, h, h / 2, rgb(color, bubble.answer ? 0.22 : 0.1), rgb(color, 0.45));
    seg(ctx, x + h * 0.6, y + h / 2, x + w - h * 0.6, y + h / 2, rgb(color, 0.5), 2);
    ctx.globalAlpha = 1;
  });
  for (let person = 0; person < 7; person += 1) {
    const read = span(phase, 0.3 + person * 0.08, 0.36 + person * 0.08) * fade;
    dot(ctx, cx + R * 0.74 + (person % 2) * R * 0.16, cy - R * 0.58 + person * R * 0.2, 4, read > 0.5 ? SEV.green : WHITE, 0.3 + 0.7 * read, read * 0.5);
  }
  label(ctx, 'PERGUNTA', cx - R * 0.95, cy - R * 0.78, rgb(MUTED, 0.75), 'left');
  label(ctx, 'GRUPO', cx + R * 0.82, cy - R * 0.78, rgb(MUTED, 0.75));
};

/* ==================== PERFIS ==================== */

/** Empresário: quando tudo é urgente, o caixa define a ordem. */
const fila: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const rows = 6;
  const cycle = 9;
  const round = Math.floor(t / cycle);
  const phase = (t % cycle) / cycle;
  const urgency = Array.from({ length: rows }, (_, i) => 0.2 + 0.8 * hash(i * 7.1 + round * 13.3));
  const order = urgency.map((_, i) => i).sort((a, b) => urgency[b] - urgency[a]);
  const sorted = span(phase, 0.2, 0.55);
  const rowH = (R * 1.3) / rows;
  const left = cx - R * 0.95;
  const top = cy - R * 0.6;

  urgency.forEach((value, i) => {
    const rank = order.indexOf(i);
    const y = top + lerp(i, rank, sorted) * rowH;
    const first = rank === 0 && sorted >= 1;
    const color = severity(1 - value);
    box(ctx, left, y + 3, R * 1.9 * (0.35 + 0.65 * value), rowH - 8, 4, rgb(color, first ? 0.8 : 0.28), first ? rgb(color, 1) : undefined);
    if (first && !compact) label(ctx, 'DECIDIR PRIMEIRO', left + 10, y + rowH / 2 - 1, 'rgb(7 8 9 / 0.95)', 'left', 10);
  });
  label(ctx, sorted >= 1 ? 'FILA ORDENADA PELO CAIXA' : 'TUDO PARECE URGENTE', left, top - 14, rgb(sorted >= 1 ? WHITE : MUTED, 0.85), 'left');
};

/** CFO: o fechamento explica o mês; a decisão é sobre as duas curvas do próximo. */
const projecao: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const left = cx - R * 0.95;
  const right = cx + R * 0.95;
  const base = cy + R * 0.6;
  const height = R * 1.15;
  const today = cx - R * 0.1;
  const closed = [0.78, 0.72, 0.66, 0.57, 0.5, 0.42];
  const barW = (today - left) / closed.length;
  closed.forEach((value, i) => box(ctx, left + i * barW + 3, base - value * height, barW - 6, value * height, 3, rgb(WHITE, 0.14 + i * 0.03)));
  seg(ctx, today, base - height - 6, today, base + 6, rgb(WHITE, 0.4), 1, [3, 4]);
  seg(ctx, left, base - 0.3 * height, right, base - 0.3 * height, rgb(SEV.orange, 0.6), 1, [6, 6]);

  const drawn = span((t % 8) / 8, 0.1, 0.6);
  const startY = base - 0.42 * height;
  const curve = (end: number, color: string, dash: number[]) => {
    ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(today, startY);
    for (let i = 1; i <= 30 * drawn; i += 1) ctx.lineTo(lerp(today, right, i / 30), lerp(startY, base - end * height, smooth(i / 30)));
    ctx.strokeStyle = rgb(color, 0.95);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
  };
  curve(0.08, SEV.red, [5, 5]);
  curve(0.64, SEV.green, []);
  dot(ctx, today, startY, 4, WHITE, 1, 0.5);

  label(ctx, 'MÊS FECHADO', left, base - height - 18, rgb(MUTED, 0.75), 'left');
  label(ctx, 'PRÓXIMO', right, base - height - 18, rgb(MUTED, 0.75), 'right');
  if (drawn >= 1 && !compact) {
    label(ctx, 'COM A AÇÃO', right, base - 0.64 * height - 14, rgb(SEV.green, 0.95), 'right', 10);
    label(ctx, 'SEM AÇÃO', right, base - 0.08 * height - 14, rgb(SEV.red, 0.95), 'right', 10);
  }
};

/** Credor: o reporte mostra o trimestre, mas uma empresa muda antes dele. */
const carteira: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const cols = 5;
  const rows = 3;
  const w = (R * 1.9) / cols;
  const h = (R * 0.95) / rows;
  const left = cx - R * 0.95;
  const top = cy - R * 0.62;
  const cycle = 10;
  const phase = (t % cycle) / cycle;
  const changed = (Math.floor(t / cycle) * 7 + 3) % (cols * rows);
  const turn = span(phase, 0.3, 0.45);

  for (let i = 0; i < cols * rows; i += 1) {
    const x = left + (i % cols) * w + 3;
    const y = top + Math.floor(i / cols) * h + 3;
    const base = hash(i) > 0.75 ? SEV.amber : SEV.green;
    const hot = i === changed;
    box(ctx, x, y, w - 6, h - 6, 5, rgb(hot && turn > 0.5 ? SEV.red : base, hot ? 0.3 + 0.5 * turn : 0.3), hot && turn >= 1 ? rgb(SEV.red, 1) : undefined, 1.5);
    if (hot && turn >= 1) ring(ctx, x + (w - 6) / 2, y + (h - 6) / 2, Math.max(w, h) * (0.55 + 0.12 * Math.sin(t * 4)), rgb(SEV.red, 0.5));
  }
  const rulerY = top + rows * h + R * 0.24;
  seg(ctx, left, rulerY, left + R * 1.9, rulerY, rgb(WHITE, 0.15), 2);
  seg(ctx, left, rulerY, left + R * 1.9 * phase, rulerY, rgb(BLUE, 0.8), 2);
  dot(ctx, left + R * 1.9 * phase, rulerY, 4, BLUE, 1, 0.6);
  label(ctx, 'CARTEIRA', left, top - 14, rgb(MUTED, 0.75), 'left');
  label(ctx, compact ? 'REPORTE' : 'REPORTE DO TRIMESTRE', left + R * 1.9, rulerY + 16, rgb(MUTED, 0.7), 'right');
  if (turn >= 1) label(ctx, compact ? 'MUDOU ANTES' : 'O LIMITE MUDOU ANTES', left, rulerY + 16, rgb(SEV.red, 0.95), 'left');
};

/** Contador: vencimento, prontidão e confirmação são estados diferentes. */
const calendario: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const cols = 7;
  const rows = 4;
  const w = (R * 1.9) / cols;
  const h = (R * 1.0) / rows;
  const left = cx - R * 0.95;
  const top = cy - R * 0.52;
  const today = Math.floor(((t % 14) / 14) * cols * rows);
  const due = [4, 9, 13, 18, 24];

  'DSTQQSS'.split('').forEach((day, col) => label(ctx, day, left + col * w + w / 2, top - 12, rgb(MUTED, 0.6), 'center', 10));
  for (let i = 0; i < cols * rows; i += 1) {
    const x = left + (i % cols) * w + 2;
    const y = top + Math.floor(i / cols) * h + 2;
    const obligation = due.indexOf(i);
    let fill = rgb(WHITE, 0.035);
    let stroke: string | undefined;
    if (obligation >= 0) {
      const ahead = i - today;
      if (ahead > 4) stroke = rgb(SEV.amber, 0.85);
      // Uma obrigação fica pronta sem nunca ser confirmada: os dois estados não se confundem.
      else if (ahead > 1 || obligation === 2) fill = rgb(BLUE, 0.5);
      else fill = rgb(SEV.green, 0.55);
    }
    box(ctx, x, y, w - 4, h - 4, 4, fill, stroke, 1.5);
    if (i === today) box(ctx, x - 1, y - 1, w - 2, h - 2, 5, undefined, rgb(WHITE, 0.9), 1.5);
  }
  const legendY = top + rows * h + 18;
  [
    { name: 'VENCE', color: SEV.amber },
    { name: 'PRONTO', color: BLUE },
    { name: 'CONFIRMADO', color: SEV.green },
  ].forEach((state, i) => {
    const x = left + i * R * 0.6;
    dot(ctx, x + 4, legendY, 3.5, state.color, 1);
    label(ctx, state.name, x + 13, legendY, rgb(MUTED, 0.8), 'left', 10);
  });
};

/** Consultor: o caso só avança quando a passagem fica verificável. */
const bastao: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const names = ['EVIDÊNCIA', 'DECISÃO', 'RESPONSÁVEL', 'PRÓXIMO PASSO'];
  const last = names.length - 1;
  const xs = names.map((_, i) => cx - R * 0.88 + (i / last) * R * 1.76);
  const position = Math.min(last, (((t % 10) / 10) / 0.82) * last);
  seg(ctx, xs[0], cy, xs[last], cy, rgb(WHITE, 0.12), 2);
  seg(ctx, xs[0], cy, lerp(xs[0], xs[last], position / last), cy, rgb(SEV.green, 0.8), 2);
  xs.forEach((x, i) => {
    const reached = position >= i - 0.001;
    ring(ctx, x, cy, 11, rgb(reached ? SEV.green : WHITE, reached ? 0.9 : 0.3), 1.5);
    if (reached) dot(ctx, x, cy, 4, SEV.green, 1);
    label(ctx, compact ? String(i + 1) : names[i], x, cy + (i % 2 ? -28 : 28), rgb(reached ? WHITE : MUTED, reached ? 0.9 : 0.6), 'center', 10);
  });
  const from = Math.floor(position);
  const u = position - from;
  // O bastão salta em arco de um responsável ao próximo.
  dot(ctx, lerp(xs[from], xs[Math.min(last, from + 1)], smooth(u)), cy - Math.sin(u * Math.PI) * R * 0.26, 5, BLUE, 1, 0.9);
  label(ctx, position >= last ? 'PASSAGEM VERIFICADA' : 'PASSANDO O CASO', cx, cy - R * 0.72, rgb(position >= last ? SEV.green : MUTED, 0.9));
};

/** Dono de consultoria: o método aparece na execução de cada caso, não só na cabeça do sócio. */
const metodo: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const checkpoints = 4;
  const blockX = cx - R * 0.95;
  const blockW = R * 0.5;
  box(ctx, blockX, cy - R * 0.55, blockW, R * 1.1, 8, rgb(BLUE, 0.08), rgb(BLUE, 0.6));
  for (let i = 0; i < checkpoints; i += 1) seg(ctx, blockX + 10, cy - R * 0.38 + i * R * 0.26, blockX + blockW - 10, cy - R * 0.38 + i * R * 0.26, rgb(BLUE, 0.7), 2);
  label(ctx, 'MÉTODO', blockX + blockW / 2, cy - R * 0.7, rgb(MUTED, 0.75));
  label(ctx, 'CASOS', cx + R * 0.35, cy - R * 0.7, rgb(MUTED, 0.75));

  for (let lane = 0; lane < 4; lane += 1) {
    const y = cy - R * 0.42 + lane * R * 0.28;
    const x0 = cx - R * 0.3;
    const x1 = cx + R * 0.95;
    // Cada caso anda no seu ritmo, mas pelos mesmos quatro pontos do método.
    const progress = (t * (0.05 + lane * 0.018) + lane * 0.37) % 1.25;
    seg(ctx, blockX + blockW, cy, x0, y, rgb(WHITE, 0.08));
    seg(ctx, x0, y, x1, y, rgb(WHITE, 0.1), 2);
    seg(ctx, x0, y, lerp(x0, x1, Math.min(1, progress)), y, rgb(SEV.green, 0.6), 2);
    for (let i = 0; i < checkpoints; i += 1) {
      const done = progress > (i + 0.5) / checkpoints;
      dot(ctx, lerp(x0, x1, (i + 0.5) / checkpoints), y, 4, done ? SEV.green : WHITE, done ? 1 : 0.3);
    }
    if (progress < 1) dot(ctx, lerp(x0, x1, progress), y, 3, BLUE, 1, 0.8);
  }
};

/** Advogado: "a confirmar" é um estado, e não vira uma data inventada. */
const prazos: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const left = cx - R * 0.95;
  const right = cx + R * 0.95;
  const phase = (t % 12) / 12;
  const items = [
    { at: 0.14, date: '12/08' },
    { at: 0.4, date: '26/08' },
    { at: 0.63, date: '' },
    { at: 0.86, date: '18/09' },
  ];
  seg(ctx, left, cy, right, cy, rgb(WHITE, 0.18), 2);
  for (let i = 0; i <= 12; i += 1) seg(ctx, lerp(left, right, i / 12), cy - 4, lerp(left, right, i / 12), cy + 4, rgb(WHITE, 0.18));

  items.forEach((item, i) => {
    const x = lerp(left, right, item.at);
    const side = i % 2 === 0 ? -1 : 1;
    const y = cy + side * R * 0.36;
    if (!item.date) {
      // Fica tracejado para sempre: ninguém preenche a lacuna com um palpite.
      seg(ctx, x, cy, x, y, rgb(SEV.amber, 0.9), 1.5, [4, 4]);
      ctx.setLineDash([4, 4]);
      ring(ctx, x, y, 12, rgb(SEV.amber, 0.6 + 0.4 * Math.sin(t * 3)), 1.5);
      ctx.setLineDash([]);
      label(ctx, 'A CONFIRMAR', x, y + side * 24, rgb(SEV.amber, 0.95));
      return;
    }
    const passed = phase > item.at;
    seg(ctx, x, cy, x, y, rgb(passed ? SEV.green : WHITE, passed ? 0.8 : 0.3), 1.5);
    ring(ctx, x, y, 12, rgb(passed ? SEV.green : WHITE, passed ? 0.9 : 0.4), 1.5);
    if (passed) dot(ctx, x, y, 4, SEV.green, 1);
    label(ctx, item.date, x, y + side * 24, rgb(passed ? WHITE : MUTED, 0.85));
  });
  const today = lerp(left, right, phase);
  seg(ctx, today, cy - R * 0.14, today, cy + R * 0.14, rgb(BLUE, 0.9), 2);
  dot(ctx, today, cy, 4, BLUE, 1, 0.7);
};

/** Estudante: decidir quando caixa, prazo e operação puxam para lados diferentes. */
const conflito: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const corners = [
    { x: cx, y: cy - R * 0.72, name: 'CAIXA' },
    { x: cx - R * 0.85, y: cy + R * 0.55, name: 'PRAZO' },
    { x: cx + R * 0.85, y: cy + R * 0.55, name: 'OPERAÇÃO' },
  ];
  ctx.beginPath();
  ctx.moveTo(corners[0].x, corners[0].y);
  ctx.lineTo(corners[1].x, corners[1].y);
  ctx.lineTo(corners[2].x, corners[2].y);
  ctx.closePath();
  ctx.strokeStyle = rgb(WHITE, 0.14);
  ctx.lineWidth = 1;
  ctx.stroke();

  const pull = [1.2 + Math.sin(t * 0.5), 1.2 + Math.sin(t * 0.37 + 2), 1.2 + Math.sin(t * 0.43 + 4)];
  const total = pull[0] + pull[1] + pull[2];
  const point = {
    x: corners.reduce((sum, corner, i) => sum + corner.x * pull[i], 0) / total,
    y: corners.reduce((sum, corner, i) => sum + corner.y * pull[i], 0) / total,
  };
  const strongest = pull.indexOf(Math.max(...pull));
  corners.forEach((corner, i) => {
    const share = pull[i] / total;
    seg(ctx, point.x, point.y, corner.x, corner.y, rgb(i === strongest ? SEV.orange : BLUE, 0.25 + share), 1 + share * 5);
    dot(ctx, corner.x, corner.y, 6, i === strongest ? SEV.orange : WHITE, i === strongest ? 1 : 0.5, i === strongest ? 0.7 : 0);
    label(ctx, corner.name, corner.x, corner.y + (i === 0 ? -18 : 20), rgb(i === strongest ? SEV.orange : MUTED, 0.9));
  });
  dot(ctx, point.x, point.y, 6, WHITE, 1, 0.8);
  label(ctx, 'DECISÃO', point.x, point.y - 16, rgb(WHITE, 0.9), 'center', 10);
};

/* ==================== PÁGINAS ÚNICAS ==================== */

/** Sobre: as cinco marchas do método, da urgência à continuidade. */
const marchas: Painter = ({ ctx, cx, cy, radius: R, time: t, compact }) => {
  const names = ['ANTECIPAR', 'INTERVIR', 'ESTANCAR', 'RECONSTRUIR', 'PERENIZAR'];
  const colors = [SEV.green, SEV.amber, SEV.red, SEV.amber, SEV.green];
  const turn = ((t % 15) / 15) * names.length;
  const active = Math.floor(turn);
  names.forEach((_, i) => {
    const from = -Math.PI / 2 + (i / names.length) * TAU + 0.05;
    const to = -Math.PI / 2 + ((i + 1) / names.length) * TAU - 0.05;
    ring(ctx, cx, cy, R * 0.86, rgb(colors[i], i === active ? 1 : i < active ? 0.5 : 0.2), i === active ? 9 : 5, from, to);
  });
  const angle = -Math.PI / 2 + (turn / names.length) * TAU;
  dot(ctx, cx + Math.cos(angle) * R * 0.86, cy + Math.sin(angle) * R * 0.86, 5, WHITE, 1, 0.9);
  label(ctx, names[active], cx, cy - 6, rgb(WHITE, 0.95), 'center', compact ? 12 : 16);
  label(ctx, `MARCHA ${active + 1} DE 5`, cx, cy + 16, rgb(MUTED, 0.7), 'center', 10);
};

/** Planos: os playbooks que cada plano libera — 10, 28 e 49, um ponto para cada. */
const niveis: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const tiers = [
    { name: 'RECON', count: 10 },
    { name: 'VAULT', count: 28 },
    { name: 'COMMAND', count: 49 },
  ];
  const phase = (t % 12) / 12;
  const colW = (R * 1.9) / tiers.length;
  const gap = (colW - 14) / 7;
  const floor = cy + R * 0.42;
  tiers.forEach((tier, index) => {
    const x0 = cx - R * 0.95 + index * colW + 7;
    const lit = Math.floor(span(phase, index * 0.22, index * 0.22 + 0.4) * tier.count);
    for (let i = 0; i < 49; i += 1) {
      const exists = i < tier.count;
      // Enche de baixo para cima, como um estoque.
      dot(ctx, x0 + (i % 7) * gap + gap / 2, floor - Math.floor(i / 7) * gap, Math.max(1.8, gap * 0.3), exists && i < lit ? BLUE : WHITE, exists ? (i < lit ? 1 : 0.22) : 0.05);
    }
    label(ctx, tier.name, x0 + (colW - 14) / 2, floor + 22, rgb(WHITE, 0.9));
    label(ctx, String(lit), x0 + (colW - 14) / 2, floor + 38, rgb(BLUE, 0.95));
  });
  label(ctx, 'PLAYBOOKS LIBERADOS', cx - R * 0.95, floor - 7 * gap - 8, rgb(MUTED, 0.75), 'left');
};

/** Ecossistema: mudar de rumo antes que a crise decida pela empresa. */
const rumo: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const start = { x: cx - R * 0.95, y: cy - R * 0.25 };
  const turn = { x: cx - R * 0.15, y: cy + R * 0.02 };
  const crisis = { x: cx + R * 0.8, y: cy + R * 0.5 };
  const target = { x: cx + R * 0.9, y: cy - R * 0.5 };
  const zone = ctx.createRadialGradient(crisis.x, crisis.y, 0, crisis.x, crisis.y, R * 0.5);
  zone.addColorStop(0, rgb(SEV.red, 0.3));
  zone.addColorStop(1, rgb(SEV.red, 0));
  ctx.fillStyle = zone;
  ctx.beginPath();
  ctx.arc(crisis.x, crisis.y, R * 0.5, 0, TAU);
  ctx.fill();

  seg(ctx, start.x, start.y, turn.x, turn.y, rgb(WHITE, 0.25), 2);
  // O rumo que a empresa seguia continua desenhado: é o que teria acontecido.
  seg(ctx, turn.x, turn.y, crisis.x, crisis.y, rgb(SEV.red, 0.55), 1.5, [5, 6]);

  const phase = (t % 10) / 10;
  const approach = span(phase, 0.05, 0.4);
  const decide = span(phase, 0.4, 0.55);
  const depart = span(phase, 0.55, 0.9);
  const course = (u: number) => ({ x: lerp(turn.x, target.x, u), y: lerp(turn.y, target.y, smooth(u)) - Math.sin(u * Math.PI) * R * 0.08 });
  ctx.beginPath();
  ctx.moveTo(turn.x, turn.y);
  for (let i = 1; i <= 30 * depart; i += 1) {
    const p = course(i / 30);
    ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = rgb(SEV.green, 0.9);
  ctx.lineWidth = 2;
  ctx.stroke();

  ring(ctx, turn.x, turn.y, 10 + decide * (1 - depart) * 8, rgb(WHITE, decide > 0 ? 0.9 : 0.35), 1.5);
  const p = depart > 0 ? course(depart) : { x: lerp(start.x, turn.x, approach), y: lerp(start.y, turn.y, approach) };
  dot(ctx, p.x, p.y, 5, depart > 0 ? SEV.green : WHITE, 1, 0.8);
  dot(ctx, target.x, target.y, 5, SEV.green, depart >= 1 ? 1 : 0.4, depart >= 1 ? 0.8 : 0);
  label(ctx, 'DECISÃO', turn.x, turn.y - 24, rgb(decide > 0 ? WHITE : MUTED, 0.9));
  label(ctx, 'CRISE', crisis.x, crisis.y + 18, rgb(SEV.red, 0.9));
  label(ctx, 'NOVO RUMO', target.x, target.y - 16, rgb(SEV.green, 0.9), 'right');
};

/** Contato: o que se acumula enquanto a decisão espera, e o que anda quando ela sai. */
const travada: Painter = ({ ctx, cx, cy, radius: R, time: t }) => {
  const left = cx - R * 0.95;
  const right = cx + R * 0.95;
  const gate = cx + R * 0.1;
  const phase = (t % 11) / 11;
  const arriving = (phase / 0.62) * 8;
  const open = span(phase, 0.62, 0.7);
  const spacing = Math.min(16, R * 0.12);

  seg(ctx, left, cy, right, cy, rgb(WHITE, 0.1), 2);
  // O portão sobe quando a decisão sai.
  seg(ctx, gate, cy - R * 0.32 - open * R * 0.62, gate, cy + R * 0.32 - open * R * 0.62, rgb(open > 0 ? SEV.green : SEV.orange, 0.9), 3);

  for (let i = 0; i < 8; i += 1) {
    if (arriving <= i) continue;
    const queued = gate - 14 - i * spacing;
    const release = span(phase, 0.7 + i * 0.02, 0.88 + i * 0.012);
    const x = open > 0 ? lerp(queued, right, release) : lerp(left, queued, span(arriving, i, i + 1));
    dot(ctx, x, cy, 4, open > 0 ? SEV.green : i > 4 ? SEV.orange : BLUE, 1 - span(release, 0.85, 1), 0.5);
  }
  label(ctx, open >= 1 ? 'DECISÃO TOMADA' : 'DECISÃO TRAVADA', gate, cy + R * 0.5, rgb(open >= 1 ? SEV.green : SEV.orange, 0.95));
  if (open <= 0) label(ctx, `${Math.min(8, Math.floor(arriving))} ESPERANDO`, left, cy - R * 0.3, rgb(MUTED, 0.8), 'left');
};

export const painters = {
  secc, indice, credpass, watchdog, trilha, banca, rede, market, comunidade,
  fila, projecao, carteira, calendario, bastao, metodo, prazos, conflito,
  marchas, niveis, rumo, travada,
} satisfies Record<string, Painter>;

export type PageInstrument = keyof typeof painters;
