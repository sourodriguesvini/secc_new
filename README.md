# SECC Turntech — nova versão das páginas públicas

Versão de revisão do site [secctech.ai](https://secctech.ai), feita para rodar em domínio temporário, separada do repositório e da infraestrutura de produção.

## Stack

- **Astro + TypeScript**: gera um site estático (HTML pronto, quase nenhum JavaScript por padrão).
- **GSAP** (ScrollTrigger, SplitText) e **Lenis** para animação e rolagem suave.
- **Canvas 2D** para os visuais animados do topo de cada página, sem biblioteca.
- Fontes hospedadas no próprio site (Fontsource) e imagens otimizadas no build (AVIF/WebP responsivos).

## Páginas

| Rota | Arquivo |
|---|---|
| `/` | `src/pages/index.astro` |
| `/sobre/`, `/planos/`, `/ecossistema/`, `/contato/` | `src/pages/*.astro` |
| `/politica-de-cookies/` | `src/pages/politica-de-cookies.md` |
| `/solucoes/<slug>/` (9) | `src/pages/solucoes/[slug].astro` + `src/data/solution-pages.ts` |
| `/para/<slug>/` (8) | `src/pages/para/[slug].astro` + `src/data/persona-pages.ts` |

Cadastro, login e o Plantão SOS continuam na plataforma (`secctech.ai`).

## Estrutura

```
src/
  data/               conteúdo: site.ts (menus, home), solution-pages.ts, persona-pages.ts, types.ts
  styles/global.css   tokens, base e blocos compartilhados
  layouts/            Base (head), Page (cabeçalho + rodapé), Prose (texto corrido)
  components/         PageHero, Demo, CtaBand e as seções da home
  scripts/            motion.ts (animação), tabs.ts e os instrumentos em canvas:
                      instrument-painters.ts tem um desenho por página
  assets/             imagens-fonte
```

O texto das páginas internas foi transcrito do site atual.

## Movimento

Há dois níveis, decididos em `src/layouts/Base.astro`:

- **completo**: rolagem suave, títulos que sobem linha a linha, deslocamentos;
- **suave**: para quem pede menos movimento no sistema operacional. O site continua vivo (instrumentos girando, seções aparecendo, números contando), mas só com opacidade e movimentos pequenos.

`?movimento` no fim do endereço força o nível completo. Todo instrumento tem um botão de pausar.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicação

Cada push na `main` dispara o GitHub Actions, que gera o site e publica o resultado na branch **`deploy`**. Na Hostinger (hPanel → Avançado → Git), conecte este repositório na branch `deploy` e instale na raiz do domínio.

## Filme do balão

O balão flutuante lê `presentationVideo` em `src/data/site.ts`. Em `public/media/` ficam o filme para web (720p), o trecho curto e mudo que roda em miniatura e os dois quadros de capa. O filme inteiro só é baixado quando a pessoa clica.

## Antes de ir para o domínio definitivo

- Remover o `noindex` de `src/layouts/Base.astro` e liberar o `public/robots.txt`.
- Trazer o logo para `src/assets/` (hoje é carregado de `secctech.ai`).
- Validar com o time da SECC os conteúdos marcados como ilustrativos: sinais do radar, respostas da seção "terça-feira", faixas de cor do simulador de caixa e o exemplo de conversa com a IA.
- Reconstruir as páginas de área (`/areas/*`) e as páginas próprias de produto (`/credpass` etc.), que ainda apontam para `secctech.ai`.
- Versões em inglês e espanhol, banner de cookies e imagem de compartilhamento (`og:image`).
