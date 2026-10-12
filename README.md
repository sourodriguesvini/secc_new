# SECC Turntech — nova versão das páginas públicas

Versão de revisão da home do [secctech.ai](https://secctech.ai), feita para rodar em domínio temporário, separada do repositório e da infraestrutura de produção.

## Stack

- **Astro + TypeScript**: gera um site estático (HTML pronto, quase nenhum JavaScript por padrão).
- **GSAP** (ScrollTrigger, SplitText) e **Lenis** para animação e rolagem suave.
- **Canvas 2D** para o radar do hero, sem biblioteca.
- Fontes hospedadas no próprio site (Fontsource) e imagens otimizadas no build (AVIF/WebP responsivos).

## Estrutura

```
src/
  data/site.ts        conteúdo estruturado: menus, soluções, perfis, sinais do radar, vídeo
  styles/global.css   tokens, base e primitivos compartilhados
  layouts/Base.astro  <head>, fontes e inicialização das animações
  components/         uma seção por arquivo (marcação, estilo e script juntos)
  scripts/            motion.ts (animação), radar.ts, tabs.ts
  assets/             imagens-fonte
```

## Rodar localmente

```bash
npm install
npm run dev
```

O site respeita quem pediu menos movimento no sistema operacional. Para revisar as animações numa máquina com os efeitos de animação desligados, abra com `?movimento` no fim do endereço.

## Publicação

Cada push na `main` dispara o GitHub Actions, que gera o site e publica o resultado na branch **`deploy`**. Na Hostinger (hPanel → Avançado → Git), conecte este repositório na branch `deploy` e instale na raiz do domínio.

## Vídeo de apresentação

O balão flutuante lê `presentationVideo` em `src/data/site.ts`. Coloque o arquivo em `public/` e preencha `src` (e `poster`); sem isso, o balão abre um aviso de "em produção".

## Antes de ir para o domínio definitivo

- Remover o `noindex` de `src/layouts/Base.astro` e liberar o `public/robots.txt`.
- Trazer o logo para `src/assets/` (hoje é carregado de `secctech.ai`).
- Validar com o time da SECC os conteúdos marcados como ilustrativos: sinais do radar, respostas da seção "terça-feira", faixas de cor do simulador de caixa e o exemplo de conversa com a IA.
- Reconstruir as páginas internas; por enquanto os links apontam para `secctech.ai`.
- Versões em inglês e espanhol, banner de cookies e imagem de compartilhamento (`og:image`).
