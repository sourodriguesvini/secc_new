// Fonte única de conteúdo estruturado: menus, seções e rodapé leem daqui.

const APP = 'https://secctech.ai';
const app = (path: string) => `${APP}${path}`;

export const links = {
  // Cadastro, login e o formulário de briefing continuam na plataforma.
  register: app('/register'),
  login: app('/login'),
  briefing: app('/contato#briefing'),
  sos: app('/contato#briefing'),
  // Páginas deste site.
  contact: '/contato/',
  plans: '/planos/',
  about: '/sobre/',
  ecosystem: '/ecossistema/',
  cookies: '/politica-de-cookies/',
} as const;

export const solution = (slug: string) => `/solucoes/${slug}/`;
export const persona = (slug: string) => `/para/${slug}/`;

/** Legenda do visual animado do topo de cada página. */
export const instrumentCaptions = {
  radar: 'Radar da Crise · demonstração com sinais ilustrativos',
  secc: 'O núcleo e as frentes em volta dele · ilustração',
  indice: 'Índice de Crise com cobertura parcial · ilustração',
  credpass: 'Do pedido às ofertas, passando pela política do fundo · ilustração',
  watchdog: 'O indicador contra o limite que você define · ilustração',
  trilha: 'A trilha, com revisão humana no fim · ilustração',
  banca: 'Do método à banca, da banca ao quadro · ilustração',
  rede: 'A rede e a oportunidade ligada a ela · ilustração',
  market: 'Origem, dono e material antes da vitrine · ilustração',
  comunidade: 'A pergunta e as respostas que ficam para o grupo · ilustração',
  fila: 'A fila que o caixa ordena · ilustração',
  projecao: 'O mês fechado e as duas curvas do próximo · ilustração',
  carteira: 'A carteira mudando entre um reporte e outro · ilustração',
  calendario: 'Vencimento, prontidão e confirmação · ilustração',
  bastao: 'O caso passando de um responsável ao próximo · ilustração',
  metodo: 'O método aparecendo em cada caso · ilustração',
  prazos: 'Prazos confirmados e um que continua “a confirmar” · ilustração',
  conflito: 'A decisão entre caixa, prazo e operação · ilustração',
  marchas: 'As cinco marchas do método · ilustração',
  niveis: 'Playbooks liberados em cada plano: 10, 28 e 49',
  rumo: 'A mudança de rumo antes da crise · ilustração',
  travada: 'O que se acumula enquanto a decisão espera · ilustração',
} as const;

export const cta = {
  primary: { label: 'Fazer diagnóstico grátis', href: links.register },
  secondary: { label: 'Falar com um Agente SECC', href: links.contact },
  note: 'Grátis, sem cartão, sem pegadinhas.',
} as const;

/**
 * Filme do balão flutuante. `preview` é o trecho curto e mudo que roda em
 * miniatura; `src` é o filme inteiro, que só carrega quando a pessoa clica.
 */
export const presentationVideo = {
  src: '/media/filme-turntech.mp4',
  preview: '/media/filme-turntech-preview.mp4',
  previewPoster: '/media/filme-turntech-preview.jpg',
  poster: '/media/filme-turntech-poster.jpg',
  label: 'Filme Turntech',
  hint: 'Assistir · 3 min',
  title: 'Filme Turntech',
};

export const proof = [
  { value: '20 anos', label: 'recuperando empresas', count: 20, prefix: '', suffix: ' anos' },
  { value: '250+', label: 'turnarounds na prática', count: 250, prefix: '', suffix: '+' },
  { value: 'R$ 35 bi', label: 'em operações conduzidas', count: 35, prefix: 'R$ ', suffix: ' bi' },
];

/** Sinais do radar do hero. `months` = distância até a crise (18 = borda, 0 = centro). */
export const radarSignals = [
  { label: 'margem afinando', months: 16, angle: 190 },
  { label: 'cliente pagando mais tarde', months: 13.5, angle: 330 },
  { label: 'fornecedor pede à vista', months: 10.5, angle: 148 },
  { label: 'banco reduziu o limite', months: 7.5, angle: 250 },
  { label: 'imposto parcelado', months: 5.6, angle: 52 },
  { label: 'folha em atraso', months: 3.4, angle: 172 },
  { label: 'protesto', months: 1.6, angle: 318 },
];

export interface Tuesday {
  id: string;
  quote: string;
  front: string;
  answer: string;
  link: { label: string; href: string };
  urgent?: boolean;
}

export const tuesdays: Tuesday[] = [
  {
    id: 'fornecedor',
    quote: 'O fornecedor só entrega se eu pagar à vista.',
    front: 'Sala de Guerra',
    answer:
      'Vira frente da semana: quem negocia, com qual fornecedor, até quando. Cada frente anda com responsável, prazo, estado e histórico — ninguém depende de lembrar.',
    link: { label: 'Ver o Sistema de Combate à Crise', href: links.ecosystem },
  },
  {
    id: 'folha',
    quote: 'Paguei a folha com o cheque especial.',
    front: 'Radar da Crise',
    answer:
      'Antes de mais dívida, o número: quanto tem em caixa, quanto queima por mês, quantos meses sobram. O Radar faz a conta e mostra de onde veio cada dado.',
    link: { label: 'Fazer essa conta agora', href: '#runway' },
  },
  {
    id: 'limite',
    quote: 'O banco cortou meu limite sem avisar.',
    front: 'CredPass',
    answer:
      'Pedido de crédito estruturado, documentos em ordem e ofertas comparáveis de bancos e fundos. A aprovação continua com quem empresta; você para de bater de porta em porta.',
    link: { label: 'Conhecer o CredPass', href: solution('credpass') },
  },
  {
    id: 'cliente',
    quote: 'Meu maior cliente atrasou de novo.',
    front: 'Execução da semana',
    answer:
      'Cobrar recebível vencido vira ação com dono, data e valor. Se travar, o bloqueio aparece na tela — e alguém responde por ele.',
    link: { label: 'Ver o Sistema de Combate à Crise', href: links.ecosystem },
  },
  {
    id: 'execucao',
    quote: 'Chegou uma execução.',
    front: 'Plantão SOS',
    answer:
      'Não espere a reunião de quinta. O Plantão SOS existe para quando a crise acelera: você fala com gente agora.',
    link: { label: 'Falar com o Plantão SOS', href: links.sos },
    urgent: true,
  },
  {
    id: 'tudo-bem',
    quote: 'Tá tudo bem. Por enquanto.',
    front: 'Prevenção',
    answer:
      'É a melhor hora. Toda crise avisa, em média, 18 meses antes; o Radar pega o sinal quando ainda há caixa e opções.',
    link: { label: 'Conhecer o Radar da Crise', href: solution('radar') },
  },
];

export const movements = [
  {
    n: '01',
    when: 'Antes',
    name: 'Antecipar',
    text: 'Ler sinais fracos e acompanhar a saúde do negócio antes da crise.',
  },
  {
    n: '02',
    when: 'Antes',
    name: 'Intervir',
    text: 'Agir sobre desvios relevantes enquanto ainda existe espaço de manobra.',
  },
  {
    n: '03',
    when: 'Durante',
    name: 'Estancar',
    text: 'Concentrar decisões na proteção do caixa e da continuidade.',
  },
  {
    n: '04',
    when: 'Durante',
    name: 'Reconstruir',
    text: 'Organizar a retomada e transformar o primeiro alívio em recuperação.',
  },
  {
    n: '05',
    when: 'Depois',
    name: 'Perenizar',
    text: 'Consolidar governança, disciplina e prevenção para o próximo ciclo.',
  },
];

export const solutions = {
  core: {
    name: 'SECC',
    href: solution('secc'),
    text: 'O sistema operacional de combate à crise. O Radar enxerga o que muda lá fora; os processos acompanham o que precisa mudar aqui dentro.',
    points: ['Radar: sinais e cenários de mercado', 'Processos, responsáveis e prazos', 'Decisões e execução acompanhadas'],
  },
  groups: [
    {
      name: 'Inteligência',
      items: [
        {
          name: 'Radar da Crise™',
          href: solution('radar'),
          text: 'Alertas preditivos de crise, com evidência e fonte. A “Bloomberg” da PME.',
        },
      ],
    },
    {
      name: 'Crédito',
      items: [
        { name: 'CredPass®', href: solution('credpass'), text: 'A esteira de crédito da PME, com comissão muito menor.' },
        { name: 'WatchDog®', href: solution('watchdog'), text: 'Risco e limites financeiros sob leitura, para credor ou dono.' },
      ],
    },
    {
      name: 'Formação e rede',
      items: [
        { name: 'SECC Academy™', href: solution('academy'), text: 'Formação em turnaround, gestão e IA, com trilhas, casos e certificação.' },
        { name: 'PACT', href: solution('pact'), text: 'Aceleração de consultores e licenciamento de Agentes SECC: a rede humana da plataforma.' },
        { name: '@TURN', href: solution('turn'), text: 'O business club de quem recupera negócios.' },
      ],
    },
    {
      name: 'Mercado e comunidade',
      items: [
        { name: 'SECC Market', href: solution('market'), text: 'Onde clientes compram e vendem produtos, ativos, empresas, dívidas e créditos.' },
        { name: 'Comunidade SECC', href: solution('comunidade'), text: 'Dúvidas respondidas por quem já passou pelo mesmo.' },
      ],
    },
  ],
};

export const allSolutions = [
  { name: solutions.core.name, href: solutions.core.href, text: 'O sistema operacional de combate à crise' },
  ...solutions.groups.flatMap((group) => group.items),
];

export const personas = [
  { id: 'empresario', name: 'Empresário', plural: 'empresários', href: persona('empresario'), text: 'Crédito, gestão de crise, painel de controle da empresa e radares.' },
  { id: 'cfo', name: 'CFO / Controller', plural: 'CFOs e controllers', href: persona('cfo'), text: 'Gestão financeira completa da empresa. Sala de Guerra. Central de Inteligência.' },
  { id: 'credor', name: 'Conselho / Fundo / Credor', plural: 'conselhos, fundos e credores', href: persona('credor'), text: 'Indicadores e execução dos planos, acompanhados em tempo real.' },
  { id: 'contador', name: 'Contador', plural: 'contadores', href: persona('contador'), text: 'Gestão do escritório, IA no núcleo contábil, radar da carteira e prospecção de clientes.' },
  { id: 'consultor', name: 'Consultor', plural: 'consultores', href: persona('consultor'), text: 'Formação e Licenciamento PACT, com suporte completo à consultoria em turnaround.' },
  { id: 'consultoria', name: 'Dono de consultoria', plural: 'consultorias', href: persona('consultoria'), text: 'Gestão da consultoria, radar da carteira e a sua metodologia automatizada.' },
  { id: 'advogado', name: 'Advogado', plural: 'advogados', href: persona('advogado'), text: 'Gestão do escritório, IA no núcleo jurídico, radar da carteira e prospecção de clientes.' },
  { id: 'estudante', name: 'Estudante', plural: 'estudantes', href: persona('estudante'), text: 'Uma carreira nova em um mercado que não para de crescer.' },
];

export const founders = [
  {
    name: 'Estevão Seccatto',
    role: 'CEO e cofundador',
    bio: 'Um dos principais especialistas em turnaround do Brasil: 20 anos de campo e 150+ empresas reestruturadas. Professor na FIA, autor de 4 livros e apresentador do “Virando a Mesa” na BM&C News. Ex-head global de M&A da Atento (NYSE).',
  },
  {
    name: 'Rafael Terceiro',
    role: 'Cofundador',
    bio: 'Especialista em reestruturação financeira, captação e gestão de caixa. Senior Partner na StonePartners e sócio-fundador da Athos Consultoria. Passagem por KPMG em turnaround e anos como Controller na indústria.',
  },
];

export const board = ['Alberto O. Neto', 'Andrei La Neve', 'Glauber Rocha', 'Karime Hajar', 'Leandro Rafael'];

export const security = [
  { name: 'Conforme a LGPD', text: 'Lei 13.709/2018: base legal, finalidade e direito de exclusão respeitados.' },
  { name: 'Criptografia', text: 'Em trânsito e em repouso, com controle de acesso e trilha de auditoria.' },
  { name: 'Soberania no Brasil', text: 'Nuvem brasileira (AWS Bedrock sa-east-1). Seus dados não viram treino de terceiros.' },
  { name: 'Confidencialidade', text: 'O que entra na Sala de Guerra fica na Sala de Guerra.' },
];

export const plans = [
  {
    name: 'RECON',
    text: 'Para formar a primeira leitura e entender se vale avançar.',
    limits: ['10 playbooks', '10 análises por dia', '1 empresa · 1 pessoa'],
  },
  {
    name: 'VAULT',
    text: 'Para trabalhar com mais documentos, análises e contexto conectado.',
    limits: ['28 playbooks', '200 análises por dia', '3 empresas · 5 pessoas'],
  },
  {
    name: 'COMMAND',
    text: 'Para acompanhar execução, alertas e trabalho contínuo.',
    limits: ['49 playbooks', 'Análises ilimitadas', 'Empresas e pessoas ilimitadas'],
  },
];
