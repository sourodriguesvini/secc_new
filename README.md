# SECC Turntech — nova versão das páginas públicas

Versão de revisão da home do [secctech.ai](https://secctech.ai), feita para rodar em domínio temporário, separada do repositório e da infraestrutura de produção.

Site estático: HTML, CSS e JavaScript puros, sem dependências e sem etapa de build.

## Estrutura

- `index.html` — home
- `assets/css/styles.css` — tokens (espelham os da plataforma em produção) e estilos
- `assets/js/main.js` — tema claro/escuro, menus, abas e vídeo do hero
- `robots.txt` — bloqueia buscadores enquanto a versão está em revisão

## Pré-visualizar

Abra `index.html` no navegador, ou sirva a pasta com qualquer servidor estático.

## Publicar na Hostinger

No hPanel, em **Avançado → Git**, conecte este repositório na branch `main` e instale na raiz do domínio temporário (`public_html`). Não há comando de build nem pasta de saída: os arquivos da raiz do repositório já são o site.

## Antes de ir para o domínio definitivo

- Remover o `noindex` do `index.html` e liberar o `robots.txt`.
- Trazer para `assets/` o logo, o vídeo e o pôster do hero, que hoje são carregados de `secctech.ai`.
- Hospedar as fontes localmente (hoje vêm do Google Fonts).
- Criar a imagem de compartilhamento (`og:image`).
- Reconstruir as páginas internas; por enquanto os links apontam para `secctech.ai`.
- Versões em inglês e espanhol.
