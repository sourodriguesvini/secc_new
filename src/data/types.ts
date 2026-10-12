// Tipos do conteúdo das páginas internas (soluções e perfis).

/** Tom de um selo, na escala de severidade do produto. */
export type Tone = 'intervencao' | 'critico' | 'monitor' | 'estavel' | 'accent' | 'neutral';

/** Linha de uma tela de demonstração. Os dados são sempre fictícios. */
export type DemoRow =
  /** Número em destaque, ex.: label "Posição de caixa", value "4,5 meses". */
  | { type: 'figure'; label: string; value: string; note?: string; status?: { label: string; tone: Tone } }
  /** Item de lista, ex.: tarefa, sinal, oferta ou documento. */
  | { type: 'row'; title: string; meta?: string; value?: string; status?: { label: string; tone: Tone } }
  /** Evento datado numa linha do tempo. */
  | { type: 'log'; when: string; text: string }
  /** Par rótulo → valor. */
  | { type: 'kv'; label: string; value: string }
  /** Subtítulo que separa grupos de linhas dentro da mesma tela. */
  | { type: 'heading'; text: string };

export interface DemoPanel {
  /** Caminho mostrado na barra da tela, ex.: "/app/radar/caixa". */
  path: string;
  /** Título opcional acima das linhas. */
  title?: string;
  rows: DemoRow[];
  /** Observação curta sob a tela, quando a página original traz uma. */
  note?: string;
}

/** Visual animado do topo da página: cada página tem o seu (ver src/scripts/instrument-painters.ts). */
export type Instrument = import('../scripts/instruments').InstrumentMode;

export interface SolutionPage {
  slug: string;
  name: string;
  /** Linha acima do título, ex.: "Capital e crédito · produto independente". */
  category: string;
  title: string;
  lead: string;
  instrument: Instrument;
  demo: DemoPanel;
  what: {
    title: string;
    text: string;
    audience: string;
    problem: string;
    difference: string;
    /** Destaques curtos, quando a página original lista. */
    features?: { name: string; text: string }[];
  };
  how: {
    text: string;
    steps: { stage: 'entrada' | 'processamento' | 'saída'; text: string }[];
  };
  blocks: {
    /** "O que trava a empresa". */
    blocker: string;
    title: string;
    how?: string;
    track?: string;
    result?: string;
    quote?: string;
    demo?: DemoPanel;
  }[];
  limits: { text: string; inside: string[]; outside: string[] };
  /** Slugs dos perfis indicados em "Para quem". */
  audiences: string[];
  closing: { title: string; text: string };
}

export interface PersonaPage {
  slug: string;
  name: string;
  /** Plural usado em rótulos de link, ex.: "empresários". */
  plural: string;
  /** Linha acima do título, ex.: "Para quem responde pela empresa inteira". */
  eyebrow: string;
  title: string;
  lead: string;
  /** Rótulo do botão principal da página original, ex.: "Priorizar minha semana". */
  cta: string;
  instrument: Instrument;
  demo: DemoPanel;
  situations: { title: string; items: string[] };
  matrix: {
    title: string;
    rows: { decision: string; solution: string; feature: string; screen: string; shows: string; result: string }[];
  };
  /** Aprofundamentos de uma decisão, cada um com sua tela. */
  deepDives: { kicker: string; title: string; point: string; demo: DemoPanel }[];
  results: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  closing: { title: string; text: string };
}
