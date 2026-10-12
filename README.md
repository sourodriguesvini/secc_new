# SECC Turntech — nova versão das páginas públicas

Versão de revisão da home do [secctech.ai](https://secctech.ai), feita para rodar em domínio temporário, separada do repositório e da infraestrutura de produção.

## Stack

- **Astro + TypeScript**: gera um site estático (HTML pronto, quase nenhum JavaScript por padrão).
- **GSAP** (ScrollTrigger, SplitText) e **Lenis** para animação e rolagem suave.
- **Canvas 2D** para o radar do hero, sem biblioteca.
- Fontes hospedadas no próprio site (Fontsource) e imagens otimizadas no build (AVIF/WebP responsivos).

## Páginas

| Rota | Arquivo |
|---|---|
|  |  |
| , , ,  |  |
|  |  |
|  (9) |  +  |
|  (8) |  +  |

Cadastro, login e o Plantão SOS continuam na plataforma ().

## Estrutura

\
O texto das páginas internas foi transcrito do site atual; os originais extraídos ficam fora do repositório, em .

## Movimento

Há dois níveis, decididos em :

- **completo**: rolagem suave, títulos que sobem linha a linha, deslocamentos;
- **suave**: para quem pede menos movimento no sistema operacional. O site continua vivo (instrumentos girando, seções aparecendo, números contando), mas só com opacidade e movimentos pequenos.

 no fim do endereço força o nível completo. Todo instrumento tem um botão de pausar.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicação

Cada push na `main` dispara o GitHub Actions, que gera o site e publica o resultado na branch **`deploy`**. Na Hostinger (hPanel → Avançado → Git), conecte este repositório na branch `deploy` e instale na raiz do domínio.

## Vídeo de apresentação

O balão flutuante lê `presentationVideo` em `src/data/site.ts`. Coloque o arquivo em `public/` e preencha `src` (e `poster`); sem isso, o balão abre um aviso de "em produção".

## Antes de ir para o domínio definitivo

- Remover o `noindex` de `src/layouts/Base.astro` e liberar o `public/robots.txt`.
- Trazer o logo para `src/assets/` (hoje é carregado de `secctech.ai`).
- Validar com o time da SECC os conteúdos marcados como ilustrativos: sinais do radar, respostas da seção "terça-feira", faixas de cor do simulador de caixa e o exemplo de conversa com a IA.
- Reconstruir as páginas de área (`/areas/*`) e as páginas próprias de produto (`/credpass` etc.), que ainda apontam para `secctech.ai`.
- Versões em inglês e espanhol, banner de cookies e imagem de compartilhamento (`og:image`).
