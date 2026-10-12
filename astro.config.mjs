import { defineConfig } from 'astro/config';

// Site estático: o build gera HTML/CSS/JS prontos em dist/, sem servidor Node em produção.
export default defineConfig({
  server: { port: 4321 },
  devToolbar: { enabled: false },
  build: { assets: 'assets' },
});
