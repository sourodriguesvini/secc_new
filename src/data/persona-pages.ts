// Conteúdo das páginas de perfil, transcrito do site atual (secctech.ai).
import type { PersonaPage } from './types';

export const personaPages: PersonaPage[] = [
  {
    slug: 'empresario',
    name: 'Empresário',
    plural: 'empresários',
    eyebrow: 'Para quem responde pela empresa inteira',
    title: 'Quando tudo é urgente, o caixa precisa definir a ordem.',
    lead: 'O Pulso diz em que pé a empresa está, o Radar do Caixa aponta o que aperta primeiro e o Plano de 100 dias mostra quem assumiu cada frente. Você começa a semana sabendo o que decidir, não o que ler.',
    cta: 'Priorizar minha semana',
    instrument: 'fila',
    demo: {
      path: '/app/cockpit',
      title: 'Fila da crise',
      rows: [
        { type: 'row', title: 'Sua empresa', meta: 'Corte de hoje', status: { label: 'atenção agora', tone: 'monitor' } },
        { type: 'figure', label: 'Caixa disponível', value: 'R$ 850,0 mil' },
        { type: 'figure', label: 'Runway', value: '4,5 meses' },
        { type: 'figure', label: 'Liquidez', value: '0,90x' },
        {
          type: 'row',
          title: 'Cobrar recebível vencido do maior cliente',
          meta: 'Helena Martins 29/07/2026 Aceite comercial pendente',
          value: 'impacto R$ 220,0 mil',
          status: { label: 'bloqueado', tone: 'intervencao' },
        },
        { type: 'kv', label: 'Sinal com origem', value: 'Liquidez abaixo do limite de 1,00x' },
        { type: 'kv', label: 'Próxima ação', value: 'Validar aceite comercial da cobrança' },
      ],
      note: 'Estimativa, confirmação e realizado permanecem estados separados.',
    },
    situations: {
      title: 'Três situações que disputam a atenção do dono',
      items: [
        'Entradas de R$ 1,2 milhão não cobrem saídas de R$ 1,39 milhão; a agenda continua cheia, mas a curva encurtou.',
        'Uma cobrança de R$ 220 mil depende da validação jurídica do aceite comercial.',
        'A redução de R$ 80 mil por mês foi aprovada e ainda precisa virar trabalho acompanhado.',
      ],
    },
    matrix: {
      title: 'A semana começa pela decisão, não pelo dashboard.',
      rows: [
        {
          decision: 'O que precisa entrar na semana?',
          solution: 'SECC',
          feature: 'Fila da Crise',
          screen: '/app/cockpit',
          shows: 'Runway 4,5 meses e ações financeiras em curso',
          result: 'Prioridades ordenadas por urgência, dono e prazo',
        },
        {
          decision: 'Por que o risco existe?',
          solution: 'SECC',
          feature: 'Drivers do E-Score',
          screen: '/app/escore/[companyId]',
          shows: 'Liquidez 0,90x ligada à evidência contábil',
          result: 'O sinal pode ser conferido antes da decisão',
        },
        {
          decision: 'Quem remove o bloqueio?',
          solution: 'SECC',
          feature: 'Frentes, planos e tarefas',
          screen: '/app/pmo',
          shows: 'Cobrança bloqueada; aceite jurídico proposto',
          result: 'A dependência entre áreas fica explícita',
        },
        {
          decision: 'O que mudou depois da decisão?',
          solution: 'SECC',
          feature: 'Linha de eventos',
          screen: '/app/situation-room',
          shows: 'Sinal, aprovação e bloqueio entre 15 e 18/07',
          result: 'Decisão e execução deixam um rastro comum',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'SECC · Frentes, planos e tarefas',
        title: 'Quem remove o bloqueio?',
        point: 'Cobrança bloqueada; aceite jurídico proposto',
        demo: {
          path: '/app/pmo',
          title: 'Frente · Caixa & Liquidez',
          rows: [
            { type: 'kv', label: 'Execução da semana', value: '3 ações priorizadas' },
            {
              type: 'row',
              title: 'Cobrar recebível vencido do maior cliente',
              meta: 'Helena Martins · 29/07/2026',
              value: 'R$ 220,0 mil',
              status: { label: 'Bloqueado', tone: 'intervencao' },
            },
            {
              type: 'row',
              title: 'Renegociar linha de capital de giro',
              meta: 'Bruno Almeida · 05/08/2026',
              value: 'R$ 350,0 mil',
              status: { label: 'Em andamento', tone: 'accent' },
            },
            {
              type: 'row',
              title: 'Reduzir despesas fixas recorrentes',
              meta: 'Camila Nunes · 01/08/2026',
              value: 'R$ 80,0 mil',
              status: { label: 'Aprovado', tone: 'estavel' },
            },
          ],
        },
      },
      {
        kicker: 'SECC · Linha de eventos',
        title: 'O que mudou depois da decisão?',
        point: 'Sinal, aprovação e bloqueio entre 15 e 18/07',
        demo: {
          path: '/app/situation-room',
          rows: [
            { type: 'log', when: '15/07', text: 'Snapshot financeiro importado' },
            { type: 'log', when: '16/07', text: 'Sinal de liquidez abaixo de 1,00x registrado' },
            { type: 'log', when: '17/07', text: 'Plano de renegociação aprovado' },
            { type: 'log', when: '18/07', text: 'Cobrança bloqueada por aceite pendente' },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber antes de repartir culpa',
        text: 'menos tempo discutindo qual número vale; mais tempo decidindo o que fazer com ele.',
      },
      {
        title: 'Decidir o movimento que cabe nesta semana',
        text: 'o empresário sai da reunião com uma ordem de trabalho, não com mais um diagnóstico.',
      },
      {
        title: 'Agir sem perder o julgamento',
        text: 'cada plano tem estado e responsável; o dono intervém no gargalo certo.',
      },
      {
        title: 'Acompanhar sem reconstruir a história',
        text: 'o acompanhamento começa do último evento confirmado, não da memória de quem estava na sala.',
      },
    ],
    faq: [
      {
        q: 'Isso é mais um dashboard?',
        a: 'Não é o objetivo. O valor está em ligar o sinal à decisão e à tarefa, com responsável, prazo e próximo passo.',
      },
      {
        q: 'A plataforma decide por mim?',
        a: 'Não. Ela organiza evidência, estado e dependências; aprovação, negociação e prioridade continuam humanas.',
      },
      {
        q: 'E se os dados estiverem incompletos?',
        a: 'Valor ausente permanece ausente. Cobertura e origem ficam visíveis; a interface não completa lacunas para fabricar certeza.',
      },
    ],
    closing: {
      title: 'Comece pela decisão que não pode esperar a próxima reunião.',
      text: 'Traga o risco que disputa a sua semana e veja como ele se conecta a evidência, responsável, prazo e acompanhamento.',
    },
  },
  {
    slug: 'cfo',
    name: 'CFO / Controller',
    plural: 'CFOs e controllers',
    eyebrow: 'Para CFOs e controllers',
    title: 'O fechamento explica o mês. Você precisa decidir o próximo.',
    lead: 'Radar do Caixa perto do limite, covenant a um passo de furar, e cada número abrindo o documento que o sustenta. Você para de gastar a reunião defendendo o fechamento e passa a usá-la para decidir o mês que vem.',
    cta: 'Mapear meu caixa',
    instrument: 'projecao',
    demo: {
      path: '/app/radar/caixa',
      rows: [
        { type: 'figure', label: 'posição de caixa', value: '4,5 meses', note: 'R$ 850.000 ÷ R$ 190.000/mês' },
        { type: 'row', title: 'Projeção calculada a partir do snapshot' },
        { type: 'heading', text: 'por que exige atenção' },
        { type: 'kv', label: 'Entradas mensais', value: 'R$ 1.200.000' },
        { type: 'kv', label: 'Saídas mensais', value: 'R$ 1.390.000' },
        { type: 'kv', label: 'Liquidez corrente', value: '0,90x · limite 1,00x' },
      ],
      note: 'Estimativa, confirmação e realizado permanecem estados separados.',
    },
    situations: {
      title: 'O que chega à mesa do financeiro',
      items: [
        'O caixa mínimo de R$ 500 mil está preservado hoje, mas a curva exige antecipar decisões.',
        'A liquidez de 0,90x está abaixo do covenant de 1,00x e precisa ser explicada com fonte.',
        'Uma cobrança de R$ 220 mil está bloqueada e uma redução de R$ 80 mil/mês foi aprovada; nenhuma estimativa entra como realizado.',
      ],
    },
    matrix: {
      title: 'A curva, a origem e a ação chegam juntas ao comitê.',
      rows: [
        {
          decision: 'Qual pressão exige atenção agora?',
          solution: 'Radar',
          feature: 'Série e sinais de caixa',
          screen: '/app/radar/caixa',
          shows: 'Burn R$ 190 mil; runway 4,5 meses',
          result: 'Curva e alerta permanecem no mesmo contexto',
        },
        {
          decision: 'O sinal tem lastro suficiente?',
          solution: 'SECC',
          feature: 'Driver e referência de evidência',
          screen: '/app/escore/[companyId]',
          shows: 'Liquidez 0,90x ligada à evidência',
          result: 'Cobertura e origem podem ser auditadas',
        },
        {
          decision: 'Qual ação muda a curva?',
          solution: 'SECC',
          feature: 'Fila da Crise',
          screen: '/app/cockpit',
          shows: 'Cobrar R$ 220 mil; reduzir R$ 80 mil/mês',
          result: 'Alternativas entram na fila sem virar realizado',
        },
        {
          decision: 'Quem entrega e até quando?',
          solution: 'SECC',
          feature: 'Plano e tarefas',
          screen: '/app/pmo',
          shows: 'Bruno, Camila, Helena e Rafael com prazos',
          result: 'Follow-up deixa de depender da planilha do comitê',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'SECC · Fila da Crise',
        title: 'Qual ação muda a curva?',
        point: 'Cobrar R$ 220 mil; reduzir R$ 80 mil/mês',
        demo: {
          path: '/app/cockpit',
          title: 'Fila da crise',
          rows: [
            { type: 'row', title: 'Sua empresa', meta: 'Corte de hoje', status: { label: 'atenção agora', tone: 'monitor' } },
            { type: 'figure', label: 'Caixa disponível', value: 'R$ 850,0 mil' },
            { type: 'figure', label: 'Runway', value: '4,5 meses' },
            { type: 'figure', label: 'Liquidez', value: '0,90x' },
            {
              type: 'row',
              title: 'Cobrar recebível vencido do maior cliente',
              meta: 'Helena Martins 29/07/2026 Aceite comercial pendente',
              value: 'impacto R$ 220,0 mil',
              status: { label: 'bloqueado', tone: 'intervencao' },
            },
            { type: 'kv', label: 'Sinal com origem', value: 'Liquidez abaixo do limite de 1,00x' },
            { type: 'kv', label: 'Próxima ação', value: 'Validar aceite comercial da cobrança' },
          ],
        },
      },
      {
        kicker: 'SECC · Plano e tarefas',
        title: 'Quem entrega e até quando?',
        point: 'Bruno, Camila, Helena e Rafael com prazos',
        demo: {
          path: '/app/pmo',
          title: 'Frente · Caixa & Liquidez',
          rows: [
            { type: 'kv', label: 'Execução da semana', value: '3 ações priorizadas' },
            {
              type: 'row',
              title: 'Cobrar recebível vencido do maior cliente',
              meta: 'Helena Martins · 29/07/2026',
              value: 'R$ 220,0 mil',
              status: { label: 'Bloqueado', tone: 'intervencao' },
            },
            {
              type: 'row',
              title: 'Renegociar linha de capital de giro',
              meta: 'Bruno Almeida · 05/08/2026',
              value: 'R$ 350,0 mil',
              status: { label: 'Em andamento', tone: 'accent' },
            },
            {
              type: 'row',
              title: 'Reduzir despesas fixas recorrentes',
              meta: 'Camila Nunes · 01/08/2026',
              value: 'R$ 80,0 mil',
              status: { label: 'Aprovado', tone: 'estavel' },
            },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber a pressão antes do fechamento',
        text: 'o CFO consegue conferir o número antes de levá-lo ao comitê.',
      },
      {
        title: 'Decidir com driver e evidência',
        text: 'a discussão deixa de ser “de onde veio o número?” e passa a ser “qual ação cabe agora?”.',
      },
      {
        title: 'Agir sobre a curva, não sobre uma cópia dela',
        text: 'o comitê prioriza alavancas sem inflar o caixa reportado.',
      },
      {
        title: 'Acompanhar covenant e execução juntos',
        text: 'o próximo reporte começa no estado atual da ação.',
      },
    ],
    faq: [
      {
        q: 'Já tenho ERP, BI e planilha de caixa.',
        a: 'Não substitui nenhum dos três. Eles registram o que aconteceu; aqui você decide o que fazer com isso — e a decisão sai com dono e prazo.',
      },
      {
        q: 'Um score pode esconder premissas.',
        a: 'Por isso a cena mostra driver, cobertura e fonte. Dado ausente continua ausente; a revisão permanece com o CFO.',
      },
      {
        q: 'Impacto estimado contamina o realizado?',
        a: 'Não. R$ 350 mil, R$ 220 mil e R$ 80 mil/mês permanecem rotulados como potenciais até a conclusão da ação.',
      },
    ],
    closing: {
      title: 'Leve ao comitê a curva, a origem e a ação.',
      text: 'Veja como o risco de caixa pode sair do fechamento e chegar à fila semanal com cobertura, responsável e prazo.',
    },
  },
  {
    slug: 'credor',
    name: 'Conselho / Fundo / Credor',
    plural: 'conselhos, fundos e credores',
    eyebrow: 'Para quem acompanha capital em risco',
    title: 'O reporte mostra o trimestre. O covenant pode mudar antes dele.',
    lead: 'Quando uma empresa da carteira muda de faixa, o aviso chega com a evidência anexada. Você trata o problema enquanto ele ainda é renegociação — e não quando virou execução com fila de credores na frente.',
    cta: 'Monitorar a carteira',
    instrument: 'carteira',
    demo: {
      path: '/app/radar/watchdog',
      title: 'Covenants',
      rows: [
        { type: 'row', title: 'Sua empresa', status: { label: 'revisão necessária', tone: 'neutral' } },
        { type: 'row', title: 'Liquidez corrente', meta: 'evidência contábil disponível', value: '0,90x mín. 1,00x' },
        { type: 'row', title: 'Caixa mínimo', meta: 'snapshot de hoje', value: 'R$ 850,0 mil mín. R$ 500,0 mil' },
      ],
      note: 'Estimativa, confirmação e realizado permanecem estados separados.',
    },
    situations: {
      title: 'Situações que exigem decisão do credor',
      items: [
        'Liquidez está abaixo do limite; caixa mínimo ainda está preservado. Os dois covenants contam histórias diferentes.',
        'Existe uma solicitação de R$ 1,5 milhão por 24 meses, mas ela não representa aprovação, taxa ou oferta fechada.',
        'Cobrança, redução de despesas e renegociação têm responsáveis e estados distintos; impacto estimado não é caixa capturado.',
      ],
    },
    matrix: {
      title: 'Monitoramento e concessão permanecem jornadas distintas.',
      rows: [
        {
          decision: 'Qual empresa pede revisão?',
          solution: 'SECC',
          feature: 'Visão de carteira',
          screen: '/app/carteira',
          shows: 'Empresa selecionada com atenção por liquidez',
          result: 'A análise começa pela empresa com sinal relevante',
        },
        {
          decision: 'Qual limite está pressionado?',
          solution: 'WatchDog',
          feature: 'Covenant e headroom',
          screen: '/app/radar/watchdog',
          shows: '0,90x versus mínimo de 1,00x',
          result: 'Estado e limite aparecem lado a lado',
        },
        {
          decision: 'Por que o sinal foi gerado?',
          solution: 'SECC',
          feature: 'Driver e cobertura',
          screen: '/app/escore/[companyId]',
          shows: 'Referência de evidência contábil associada',
          result: 'A diligência pode abrir a origem',
        },
        {
          decision: 'O que a gestão está fazendo?',
          solution: 'SECC',
          feature: 'Ações e eventos',
          screen: '/app/situation-room',
          shows: 'Renegociação aprovada; cobrança bloqueada',
          result: 'A resposta operacional acompanha o sinal',
        },
        {
          decision: 'Há uma solicitação de crédito?',
          solution: 'CredPass',
          feature: 'Estrutura e status',
          screen: '/app/cred/[id]/offers',
          shows: 'Duas estruturas em análise/condicional',
          result: 'Comparação sem prometer taxa ou aprovação',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'SECC · Visão de carteira',
        title: 'Qual empresa pede revisão?',
        point: 'Empresa selecionada com atenção por liquidez',
        demo: {
          path: '/app/carteira',
          title: 'Carteira',
          rows: [
            { type: 'row', title: 'Sua empresa', meta: 'Caixa & Liquidez' },
            { type: 'figure', label: 'Risco atual', value: '4,5 meses' },
            { type: 'kv', label: 'Frente aberta', value: 'Caixa & Liquidez' },
            { type: 'kv', label: 'Gargalo', value: 'Aceite comercial' },
          ],
        },
      },
      {
        kicker: 'SECC · Ações e eventos',
        title: 'O que a gestão está fazendo?',
        point: 'Renegociação aprovada; cobrança bloqueada',
        demo: {
          path: '/app/situation-room',
          rows: [
            { type: 'log', when: '15/07', text: 'Snapshot financeiro importado' },
            { type: 'log', when: '16/07', text: 'Sinal de liquidez abaixo de 1,00x registrado' },
            { type: 'log', when: '17/07', text: 'Plano de renegociação aprovado' },
            { type: 'log', when: '18/07', text: 'Cobrança bloqueada por aceite pendente' },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber qual empresa saiu do combinado',
        text: 'o analista sabe onde abrir a revisão e qual pergunta levar para a empresa.',
      },
      {
        title: 'Decidir com covenant e contexto',
        text: 'a decisão preserva contexto e evita reduzir o caso a um único semáforo.',
      },
      {
        title: 'Agir com a empresa, não sobre uma caixa-preta',
        text: 'credor e empresa podem discutir o mesmo fato e o estado da resposta.',
      },
      {
        title: 'Acompanhar sem confundir monitoramento e concessão',
        text: 'monitorar a carteira e avaliar uma solicitação permanecem jornadas comerciais distintas.',
      },
    ],
    faq: [
      {
        q: 'Isso substitui minha diligência?',
        a: 'Não. É uma camada para organizar sinais, covenants, evidências e ações. A decisão de crédito continua com o credor.',
      },
      {
        q: 'A SECC acessa o caixa sem autorização?',
        a: 'Dado interno só aparece com acesso concedido. Sinais externos e dados consentidos permanecem distinguíveis.',
      },
      {
        q: 'O WatchDog prevê default?',
        a: 'Não é a promessa. A demonstração confirma estado, limite, cobertura e evidência; não inventa prazo ou probabilidade de perda.',
      },
      {
        q: 'CredPass significa crédito aprovado?',
        a: 'Não. O produto estrutura solicitação, ofertas e documentos; taxa, aprovação e contratação não são inferidas.',
      },
    ],
    closing: {
      title: 'Comece pela empresa cujo limite já pede uma pergunta.',
      text: 'Organize covenant, evidência e resposta operacional em uma revisão que a equipe consiga acompanhar.',
    },
  },
  {
    slug: 'contador',
    name: 'Contador',
    plural: 'contadores',
    eyebrow: 'Para contadores e escritórios',
    title: 'O prazo fiscal precisa de fonte antes de virar alerta.',
    lead: 'A agenda organiza obrigações cadastradas e declara quando o prazo, o responsável ou o vínculo com follow-up ainda não existem no modelo.',
    cta: 'Organizar a agenda',
    instrument: 'calendario',
    demo: {
      path: '/app/contador',
      title: 'Agenda fiscal',
      rows: [
        { type: 'heading', text: 'Próximos vencimentos' },
        { type: 'kv', label: 'Responsável', value: 'Ana Souza' },
        {
          type: 'row',
          title: 'EFD-Contribuições — demonstração',
          meta: 'competência anterior · prazo não calculado — confirmar no calendário oficial',
          status: { label: 'Em revisão', tone: 'neutral' },
        },
        {
          type: 'row',
          title: 'DCTFWeb — demonstração',
          meta: 'competência anterior · prazo não calculado — confirmar no calendário oficial',
          status: { label: 'Pendente', tone: 'monitor' },
        },
        {
          type: 'row',
          title: 'Follow-up de documento fiscal',
          meta: 'competência atual · prazo 21/07/2026',
          status: { label: 'Aberto', tone: 'neutral' },
        },
      ],
      note: 'Estimativa, confirmação e realizado permanecem estados separados.',
    },
    situations: {
      title: 'As três interrupções que dominam o dia',
      items: [
        'EFD-Contribuições aparece sem prazo calculado: a data precisa ser confirmada no calendário oficial.',
        'DCTFWeb aparece sem prazo calculado e sem sugerir que a aplicabilidade foi resolvida pelo sistema.',
        'O vínculo direto entre follow-up e obrigação fiscal ainda não existe no modelo atual.',
      ],
    },
    matrix: {
      title: 'Vencimento, prontidão e confirmação são estados diferentes.',
      rows: [
        {
          decision: 'O que está cadastrado e em que estado?',
          solution: 'SECC',
          feature: 'Agenda fiscal',
          screen: '/app/contador',
          shows: 'Obrigações da competência anterior',
          result: 'Fila por competência e estado; prazo ausente fica declarado',
        },
        {
          decision: 'O que depende do cliente?',
          solution: 'SECC',
          feature: 'Follow-up',
          screen: '/app/cockpit',
          shows: 'Action Item separado da obrigação',
          result: 'O vínculo direto com a obrigação fiscal ainda não está disponível',
        },
        {
          decision: 'O lote está pronto para confirmar?',
          solution: 'SECC',
          feature: 'Preview linha a linha',
          screen: '/app/contador/lancamentos',
          shows: 'Lançamentos do lote em revisão',
          result: 'Pessoa revisa antes da confirmação',
        },
        {
          decision: 'O que pode ser baixado?',
          solution: 'SECC',
          feature: 'Confirmação humana',
          screen: '/app/contador',
          shows: 'Conclusão somente após ação humana',
          result: 'Agenda não se confunde com execução automática',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'SECC · Follow-up',
        title: 'O que depende do cliente?',
        point: 'Action Item separado da obrigação',
        demo: {
          path: '/app/cockpit',
          title: 'Fila da crise',
          rows: [
            { type: 'row', title: 'Sua empresa', meta: 'Corte de hoje', status: { label: 'atenção agora', tone: 'monitor' } },
            { type: 'figure', label: 'Caixa disponível', value: 'R$ 850,0 mil' },
            { type: 'figure', label: 'Runway', value: '4,5 meses' },
            { type: 'figure', label: 'Liquidez', value: '0,90x' },
            {
              type: 'row',
              title: 'Cobrar recebível vencido do maior cliente',
              meta: 'Helena Martins 29/07/2026 Aceite comercial pendente',
              value: 'impacto R$ 220,0 mil',
              status: { label: 'bloqueado', tone: 'intervencao' },
            },
            { type: 'kv', label: 'Sinal com origem', value: 'Liquidez abaixo do limite de 1,00x' },
            { type: 'kv', label: 'Próxima ação', value: 'Validar aceite comercial da cobrança' },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber a próxima quebra do fluxo',
        text: 'a equipe identifica onde agir antes de abrir planilhas e mensagens.',
      },
      {
        title: 'Decidir o que entra primeiro na revisão',
        text: 'prioridade deixa de ser apenas a data mais próxima.',
      },
      {
        title: 'Agir com preview antes da confirmação',
        text: 'velocidade de lote sem esconder a etapa de revisão.',
      },
      {
        title: 'Acompanhar sem prometer pagamento automático',
        text: 'o registro mostra quando houve confirmação humana, sem inventar responsável nem atribuir à plataforma uma ação financeira inexistente.',
      },
    ],
    faq: [
      {
        q: 'Isso substitui meu sistema contábil?',
        a: 'Não. A promessa atual é organizar a agenda cadastrada e a revisão; não substituir escrituração, apuração, emissão ou calendário oficial.',
      },
      {
        q: 'A plataforma dá baixa ou paga por mim?',
        a: 'Não. Baixa e confirmação continuam humanas; contas a pagar são espelho de agenda e ordem, não transferência.',
      },
      {
        q: 'Automação em lote aumenta o risco?',
        a: 'O fluxo mantém preview e revisão linha a linha. Campos ausentes não são preenchidos para acelerar o lote.',
      },
    ],
    closing: {
      title: 'Organize o que está cadastrado sem esconder o que falta.',
      text: 'Reúna obrigação e revisão; prazo sem fonte, responsável e vínculo de follow-up permanecem declarados como ausentes.',
    },
  },
  {
    slug: 'consultor',
    name: 'Consultor',
    plural: 'consultores',
    eyebrow: 'Para quem precisa operar, não apenas recomendar',
    title: 'Se o plano só existe no status report, o cliente ainda não consegue executá-lo.',
    lead: 'O caso fica aberto com arma ativa, plano em curso e o que travou visível para os dois lados. O cliente enxerga o trabalho andando entre as reuniões, que é o que faz ele renovar.',
    cta: 'Ver o fluxo de operação',
    instrument: 'bastao',
    demo: {
      path: '/app/pmo',
      title: 'Frente · Caixa & Liquidez',
      rows: [
        { type: 'kv', label: 'Execução da semana', value: '3 ações priorizadas' },
        {
          type: 'row',
          title: 'Cobrar recebível vencido do maior cliente',
          meta: 'Helena Martins · 29/07/2026',
          value: 'R$ 220,0 mil',
          status: { label: 'Bloqueado', tone: 'intervencao' },
        },
        {
          type: 'row',
          title: 'Renegociar linha de capital de giro',
          meta: 'Bruno Almeida · 05/08/2026',
          value: 'R$ 350,0 mil',
          status: { label: 'Em andamento', tone: 'accent' },
        },
        {
          type: 'row',
          title: 'Reduzir despesas fixas recorrentes',
          meta: 'Camila Nunes · 01/08/2026',
          value: 'R$ 80,0 mil',
          status: { label: 'Aprovado', tone: 'estavel' },
        },
      ],
      note: 'Estimativa, confirmação e realizado permanecem estados separados.',
    },
    situations: {
      title: 'As perguntas que reaparecem em toda reunião',
      items: [
        'O que mudou desde o último snapshot?',
        'Qual ação está bloqueada e por qual dependência?',
        'Qual número sustenta a recomendação — e o impacto é realizado ou estimado?',
      ],
    },
    matrix: {
      title: 'O caso avança quando o handoff fica verificável.',
      rows: [
        {
          decision: 'Onde concentrar a intervenção?',
          solution: 'SECC',
          feature: 'Fila da Crise',
          screen: '/app/cockpit',
          shows: 'Runway 4,5 meses; liquidez 0,90x',
          result: 'Prioridade ligada ao risco atual',
        },
        {
          decision: 'Qual plano e tarefa estão travados?',
          solution: 'SECC',
          feature: 'Board PMO',
          screen: '/app/pmo',
          shows: 'Cobrança bloqueada por aceite',
          result: 'Gargalo e dependência explícitos',
        },
        {
          decision: 'Que evidência sustenta a recomendação?',
          solution: 'SECC',
          feature: 'Driver/referência de evidência',
          screen: '/app/escore/[companyId]',
          shows: 'Fluxo, DRE e aging referenciados',
          result: 'Cliente pode conferir a origem',
        },
        {
          decision: 'Como provar a sequência de avanço?',
          solution: 'SECC',
          feature: 'Eventos e handoffs',
          screen: '/app/situation-room',
          shows: 'Snapshot, sinal, aprovação e bloqueio',
          result: 'Status vira histórico rastreável',
        },
        {
          decision: 'Qual contexto estou operando?',
          solution: 'SECC',
          feature: 'Cliente/empresa',
          screen: '/app/clientes',
          shows: 'Empresa selecionada e isolada no caso',
          result: 'Dados não se misturam na narrativa',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'SECC · Fila da Crise',
        title: 'Onde concentrar a intervenção?',
        point: 'Runway 4,5 meses; liquidez 0,90x',
        demo: {
          path: '/app/cockpit',
          title: 'Fila da crise',
          rows: [
            { type: 'row', title: 'Sua empresa', meta: 'Corte de hoje', status: { label: 'atenção agora', tone: 'monitor' } },
            { type: 'figure', label: 'Caixa disponível', value: 'R$ 850,0 mil' },
            { type: 'figure', label: 'Runway', value: '4,5 meses' },
            { type: 'figure', label: 'Liquidez', value: '0,90x' },
            {
              type: 'row',
              title: 'Cobrar recebível vencido do maior cliente',
              meta: 'Helena Martins 29/07/2026 Aceite comercial pendente',
              value: 'impacto R$ 220,0 mil',
              status: { label: 'bloqueado', tone: 'intervencao' },
            },
            { type: 'kv', label: 'Sinal com origem', value: 'Liquidez abaixo do limite de 1,00x' },
            { type: 'kv', label: 'Próxima ação', value: 'Validar aceite comercial da cobrança' },
          ],
        },
      },
      {
        kicker: 'SECC · Eventos e handoffs',
        title: 'Como provar a sequência de avanço?',
        point: 'Snapshot, sinal, aprovação e bloqueio',
        demo: {
          path: '/app/situation-room',
          rows: [
            { type: 'log', when: '15/07', text: 'Snapshot financeiro importado' },
            { type: 'log', when: '16/07', text: 'Sinal de liquidez abaixo de 1,00x registrado' },
            { type: 'log', when: '17/07', text: 'Plano de renegociação aprovado' },
            { type: 'log', when: '18/07', text: 'Cobrança bloqueada por aceite pendente' },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber o caso pelo que mudou',
        text: 'a recomendação começa em um fato consultável.',
      },
      {
        title: 'Decidir onde o julgamento agrega mais',
        text: 'tempo sênior fica concentrado na decisão, não na montagem do status.',
      },
      {
        title: 'Agir sobre dependências reais',
        text: 'follow-up deixa de ser uma cobrança genérica e passa a mirar a dependência certa.',
      },
      {
        title: 'Acompanhar o avanço que o cliente consegue verificar',
        text: 'o cliente vê o que mudou e o que ainda está aberto.',
      },
    ],
    faq: [
      {
        q: 'A plataforma substitui meu método?',
        a: 'Não. Ela organiza estado, evidência e handoff; recomendação e condução do cliente continuam com o consultor.',
      },
      {
        q: 'A IA decide o plano?',
        a: 'Não é a promessa. A demonstração confirma dados, drivers, tarefas e eventos; revisão e decisão permanecem humanas.',
      },
      {
        q: 'Consigo provar avanço sem outro relatório?',
        a: 'O status nasce do próprio quadro de execução, não de um relatório que alguém monta na véspera da reunião.',
      },
      {
        q: 'A SECC entrega demanda ou receita?',
        a: 'Não há prova para promessa de cliente, faturamento, assinatura, êxito ou revenue share.',
      },
    ],
    closing: {
      title: 'Leve o caso da evidência ao próximo responsável.',
      text: 'Veja como diagnóstico, plano, bloqueio e evento podem compartilhar o mesmo fluxo operacional.',
    },
  },
  {
    slug: 'consultoria',
    name: 'Dono de consultoria',
    plural: 'consultorias',
    eyebrow: 'Para quem responde pelo padrão da casa',
    title: 'O método precisa aparecer na execução — não apenas na cabeça do sócio.',
    lead: 'Todo projeto abre o mesmo caso, com as mesmas armas e o mesmo plano. O sócio revisa a exceção em vez de reconstruir o contexto de dez clientes toda segunda-feira.',
    cta: 'Conversar sobre a operação',
    instrument: 'metodo',
    demo: {
      path: '/app/carteira',
      title: 'Carteira',
      rows: [
        { type: 'row', title: 'Sua empresa', meta: 'Caixa & Liquidez' },
        { type: 'figure', label: 'Risco atual', value: '4,5 meses' },
        { type: 'kv', label: 'Frente aberta', value: 'Caixa & Liquidez' },
        { type: 'kv', label: 'Gargalo', value: 'Aceite comercial' },
      ],
      note: 'Estimativa, confirmação e realizado permanecem estados separados.',
    },
    situations: {
      title: 'Situações da liderança',
      items: [
        'A reunião de portfólio começa com dez versões diferentes de “está andando”.',
        'O sócio precisa entrar para descobrir por que uma tarefa está bloqueada.',
        'O cliente pergunta o que mudou desde o diagnóstico e o time remonta a história em slides.',
      ],
    },
    matrix: {
      title: 'A revisão percorre contexto, risco, execução e evento.',
      rows: [
        {
          decision: 'Qual contexto estamos revisando?',
          solution: 'SECC',
          feature: 'Carteira e cliente',
          screen: '/app/carteira /app/clientes',
          shows: 'Empresa selecionada na carteira',
          result: 'Separação de contexto por empresa',
        },
        {
          decision: 'Qual risco pede atenção sênior?',
          solution: 'SECC',
          feature: 'Driver do E-Score',
          screen: '/app/escore/[companyId]',
          shows: 'Liquidez 0,90x com evidência',
          result: 'Revisão começa pelo fato e cobertura',
        },
        {
          decision: 'O método virou execução?',
          solution: 'SECC',
          feature: 'Frente, plano e tarefa',
          screen: '/app/pmo',
          shows: 'Três ações em estados distintos',
          result: 'Padrão aparece no trabalho',
        },
        {
          decision: 'Onde o caso travou?',
          solution: 'SECC',
          feature: 'Dependência e responsável',
          screen: '/app/pmo',
          shows: 'Cobrança bloqueada por aceite',
          result: 'Liderança intervém no gargalo certo',
        },
        {
          decision: 'O que mudou desde a revisão?',
          solution: 'SECC',
          feature: 'Linha de eventos',
          screen: '/app/situation-room',
          shows: 'Eventos de 15 a 18/07',
          result: 'Evolução verificável pelo time e cliente',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'SECC · Frente, plano e tarefa',
        title: 'O método virou execução?',
        point: 'Três ações em estados distintos',
        demo: {
          path: '/app/pmo',
          title: 'Frente · Caixa & Liquidez',
          rows: [
            { type: 'kv', label: 'Execução da semana', value: '3 ações priorizadas' },
            {
              type: 'row',
              title: 'Cobrar recebível vencido do maior cliente',
              meta: 'Helena Martins · 29/07/2026',
              value: 'R$ 220,0 mil',
              status: { label: 'Bloqueado', tone: 'intervencao' },
            },
            {
              type: 'row',
              title: 'Renegociar linha de capital de giro',
              meta: 'Bruno Almeida · 05/08/2026',
              value: 'R$ 350,0 mil',
              status: { label: 'Em andamento', tone: 'accent' },
            },
            {
              type: 'row',
              title: 'Reduzir despesas fixas recorrentes',
              meta: 'Camila Nunes · 01/08/2026',
              value: 'R$ 80,0 mil',
              status: { label: 'Aprovado', tone: 'estavel' },
            },
          ],
        },
      },
      {
        kicker: 'SECC · Linha de eventos',
        title: 'O que mudou desde a revisão?',
        point: 'Eventos de 15 a 18/07',
        demo: {
          path: '/app/situation-room',
          rows: [
            { type: 'log', when: '15/07', text: 'Snapshot financeiro importado' },
            { type: 'log', when: '16/07', text: 'Sinal de liquidez abaixo de 1,00x registrado' },
            { type: 'log', when: '17/07', text: 'Plano de renegociação aprovado' },
            { type: 'log', when: '18/07', text: 'Cobrança bloqueada por aceite pendente' },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber onde a revisão sênior é necessária',
        text: 'a liderança entra no caso certo sem perder a fronteira entre empresas.',
      },
      {
        title: 'Decidir o que é padrão e o que exige julgamento',
        text: 'consistência operacional sem prometer metodologia automática ou white-label.',
      },
      {
        title: 'Agir pelo handoff, não pela escalada genérica',
        text: 'a atenção sênior é usada para remover um gargalo concreto.',
      },
      {
        title: 'Acompanhar uma história comum de entrega',
        text: 'revisão de qualidade parte do histórico do trabalho, não de uma narrativa montada depois.',
      },
    ],
    faq: [
      {
        q: 'Isso engessa o método da casa?',
        a: 'A página padroniza contexto, evidência, estado e handoff; não afirma substituir critérios próprios ou julgamento sênior.',
      },
      {
        q: 'A plataforma mistura dados de clientes?',
        a: 'Não é a narrativa. A demonstração preserva um contexto isolado por empresa.',
      },
      {
        q: 'Consigo entregar com a minha marca?',
        a: 'Marca branca e relatório personalizado não entram como promessa sem configuração e tela confirmadas.',
      },
      {
        q: 'Isso cria recorrência, split ou valuation?',
        a: 'Não há prova suficiente. A conversão desta página é uma conversa sobre operação e governança da entrega.',
      },
    ],
    closing: {
      title: 'Revise o método onde ele aparece: no trabalho em andamento.',
      text: 'Veja como contexto, evidência, plano e handoff podem formar uma rotina de revisão para a liderança e para o time.',
    },
  },
  {
    slug: 'advogado',
    name: 'Advogado',
    plural: 'advogados',
    eyebrow: 'Para advogados que precisam decidir sob prazo',
    title: '“A confirmar” é um estado. Não pode virar uma data inventada.',
    lead: 'Prazo confirmado aparece como confirmado, prazo a confirmar continua a confirmar, e a movimentação chega com o documento do lado. Você assina o que revisou, nunca o que o sistema chutou.',
    cta: 'Organizar meus casos',
    instrument: 'prazos',
    demo: {
      path: '/app/advogado',
      title: 'Sala do advogado',
      rows: [
        { type: 'heading', text: 'Prazos e confirmações' },
        {
          type: 'row',
          title: 'Revisão do contrato de fornecimento ACME-DEMO-002',
          value: '22/07/2026',
          status: { label: 'Confirmado', tone: 'estavel' },
        },
        {
          type: 'row',
          title: 'Manifestação no processo 0000000-00.2026.8.26.0000',
          meta: 'Requer revisão humana',
          status: { label: 'A confirmar', tone: 'monitor' },
        },
      ],
      note: 'Estimativa, confirmação e realizado permanecem estados separados.',
    },
    situations: {
      title: 'Situações concretas do jurídico',
      items: [
        'O contrato precisa ser revisado até 22/07 e a data já está confirmada.',
        'A manifestação processual existe, mas o prazo ainda requer revisão humana.',
        'Sucumbência, horas e cobrança não foram fixadas e permanecem vazias.',
      ],
    },
    matrix: {
      title: 'Urgência visível não exige fingir precisão.',
      rows: [
        {
          decision: 'O que exige resposta hoje?',
          solution: 'SECC',
          feature: 'Fila jurídica',
          screen: '/app/advogado',
          shows: 'Revisão contratual confirmada',
          result: 'Prioridade por prazo e estado',
        },
        {
          decision: 'O que ainda não pode ser calendarizado?',
          solution: 'SECC',
          feature: 'Grupo “a confirmar”',
          screen: '/app/advogado',
          shows: 'Manifestação sem prazo confirmado',
          result: 'Lacuna preservada até revisão humana',
        },
        {
          decision: 'O que sustenta o caso?',
          solution: 'SECC',
          feature: 'Dossiê e facetas',
          screen: '/app/advogado/caso/[id]',
          shows: 'Documentos fictícios ACME-DEMO',
          result: 'Fonte e contexto no mesmo caso',
        },
        {
          decision: 'Qual ação destrava outra área?',
          solution: 'SECC',
          feature: 'Ação ligada ao caso',
          screen: '/app/advogado/caso/[id]',
          shows: 'Validar aceite comercial da cobrança',
          result: 'Jurídico vira dependência operacional explícita',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'SECC · Fila jurídica',
        title: 'O que exige resposta hoje?',
        point: 'Revisão contratual confirmada',
        demo: {
          path: '/app/advogado',
          title: 'Sala do advogado',
          rows: [
            { type: 'heading', text: 'Prazos e confirmações' },
            {
              type: 'row',
              title: 'Revisão do contrato de fornecimento ACME-DEMO-002',
              value: '22/07/2026',
              status: { label: 'Confirmado', tone: 'estavel' },
            },
            {
              type: 'row',
              title: 'Manifestação no processo 0000000-00.2026.8.26.0000',
              meta: 'Requer revisão humana',
              status: { label: 'A confirmar', tone: 'monitor' },
            },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber a urgência sem apagar a incerteza',
        text: 'o advogado enxerga o que deve agir e o que deve validar.',
      },
      {
        title: 'Decidir o próximo passo com o caso aberto',
        text: 'a decisão não depende de reconstruir o contexto em outra ferramenta.',
      },
      {
        title: 'Agir onde o jurídico bloqueia a operação',
        text: 'o efeito operacional da decisão jurídica fica visível sem reduzir o caso a dinheiro.',
      },
      {
        title: 'Acompanhar com confirmação humana',
        text: 'rastreabilidade sem terceirizar julgamento profissional.',
      },
    ],
    faq: [
      {
        q: 'A plataforma pratica ato jurídico?',
        a: 'Não. Ela organiza fila, documento, prazo e ação; interpretação, confirmação e assinatura permanecem com o advogado.',
      },
      {
        q: 'E se o prazo não estiver confirmado?',
        a: 'Ele permanece “a confirmar”. A demonstração não preenche uma data apenas para completar a interface.',
      },
      {
        q: 'Isso é gestão financeira da banca?',
        a: 'Não. WIP, realização, pricing e split ficam fora — nenhum deles é sustentado pelas telas desta jornada.',
      },
    ],
    closing: {
      title: 'Abra o dia sabendo o que está confirmado — e o que ainda precisa da sua caneta.',
      text: 'Organize casos, prazos, documentos e ações sem esconder lacunas nem perder o vínculo com a operação.',
    },
  },
  {
    slug: 'estudante',
    name: 'Estudante',
    plural: 'estudantes',
    eyebrow: 'SECC Academy para quem está aprendendo a operar',
    title: 'Aprenda a decidir quando caixa, prazo e operação entram em conflito.',
    lead: 'Você opera caso real nas mesmas telas que o consultor usa em cliente pagando, e sai com um certificado que uma pessoa assinou — não com PDF de participação.',
    cta: 'Explorar trilhas',
    instrument: 'conflito',
    demo: {
      path: '/app/academy',
      rows: [
        { type: 'heading', text: 'Trilha atual' },
        { type: 'row', title: 'Negociação com credores e reperfilamento', meta: '45% concluído · Marina Costa' },
        { type: 'heading', text: 'Registro da avaliação' },
        { type: 'row', title: 'Diagnóstico de crise e sinais de alerta', meta: 'tentativa registrada', value: '8/10' },
        { type: 'figure', label: 'trilhas', value: '3' },
        { type: 'figure', label: 'unidades', value: '12' },
        { type: 'figure', label: 'concluídas', value: '2' },
      ],
      note: 'Progresso, tentativa e certificação são estados separados.',
    },
    situations: {
      title: 'Situações reais de aprendizagem',
      items: [
        'Marina concluiu duas unidades e precisa escolher o próximo passo.',
        'A tentativa do quiz de diagnóstico registrou 8 de 10 respostas corretas.',
        'Concluir uma unidade não gera certificado automático; emissão e revisão são estados próprios.',
      ],
    },
    matrix: {
      title: 'Progresso serve para retomar, não para fabricar credencial.',
      rows: [
        {
          decision: 'Qual trilha atende meu objetivo?',
          solution: 'Academy',
          feature: 'Catálogo de trilhas',
          screen: '/app/academy',
          shows: '3 trilhas e 12 unidades',
          result: 'Escopo e sequência ficam visíveis',
        },
        {
          decision: 'Onde retomar?',
          solution: 'Academy',
          feature: 'Progresso por unidade',
          screen: '/app/academy',
          shows: 'Duas concluídas; uma em 45%',
          result: 'Próximo passo não depende da memória',
        },
        {
          decision: 'O que eu realmente aprendi?',
          solution: 'Academy',
          feature: 'Quiz e tentativa',
          screen: '/app/academy/unit/[unitId]',
          shows: '8/10 em diagnóstico de crise',
          result: 'Avaliação tem registro consultável',
        },
        {
          decision: 'Minha formação foi validada?',
          solution: 'Academy',
          feature: 'Certificações',
          screen: '/app/academy/certificacoes',
          shows: 'Emissão humana, quando aplicável',
          result: 'Certificado não é automatizado',
        },
        {
          decision: 'Como compartilho uma dúvida?',
          solution: 'Academy',
          feature: 'Feed simples',
          screen: '/app/academy/comunidade',
          shows: 'Dois posts de Marina',
          result: 'Conversa complementar sem fórum inventado',
        },
      ],
    },
    deepDives: [
      {
        kicker: 'Academy · Catálogo de trilhas',
        title: 'Qual trilha atende meu objetivo?',
        point: '3 trilhas e 12 unidades',
        demo: {
          path: '/app/academy',
          rows: [
            { type: 'heading', text: 'Trilha atual' },
            { type: 'row', title: 'Negociação com credores e reperfilamento', meta: '45% concluído · Marina Costa' },
            { type: 'heading', text: 'Registro da avaliação' },
            { type: 'row', title: 'Diagnóstico de crise e sinais de alerta', meta: 'tentativa registrada', value: '8/10' },
            { type: 'figure', label: 'trilhas', value: '3' },
            { type: 'figure', label: 'unidades', value: '12' },
            { type: 'figure', label: 'concluídas', value: '2' },
          ],
        },
      },
    ],
    results: [
      {
        title: 'Perceber o que falta aprender',
        text: 'o estudante entende escopo e esforço antes de começar.',
      },
      {
        title: 'Decidir o próximo passo',
        text: 'a próxima ação fica inequívoca.',
      },
      {
        title: 'Agir e registrar a avaliação',
        text: 'prática e avaliação deixam rastro no produto.',
      },
      {
        title: 'Acompanhar formação e revisão humana',
        text: 'o estudante distingue progresso, avaliação e certificação.',
      },
    ],
    faq: [
      {
        q: 'Preciso ter experiência em turnaround?',
        a: 'As trilhas e unidades permitem avaliar o ponto de entrada; a página não promete que qualquer perfil sai pronto para operar um caso real.',
      },
      {
        q: 'Concluir a trilha gera certificação automática?',
        a: 'Não. Progresso completo, avaliação e certificação são estados distintos; a emissão é humana.',
      },
      {
        q: 'A Academy garante trabalho ou renda?',
        a: 'Não. Emprego, demanda, faturamento e reconhecimento externo não entram como promessa.',
      },
      {
        q: 'Lives e simuladores fazem parte?',
        a: 'A página vende catálogo, progresso, unidade, quiz, certificação e feed confirmados; lives não são a cena central.',
      },
    ],
    closing: {
      title: 'Escolha a trilha. Veja a próxima unidade. Registre o que aprendeu.',
      text: 'Comece pelas três trilhas e doze unidades disponíveis e acompanhe sua evolução dentro da Academy.',
    },
  },
];
