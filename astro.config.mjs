// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: Produktions-URL eintragen. Wird für die Sitemap, robots.txt und die
  // absoluten Canonical-/Open-Graph-URLs im Layout gebraucht.
  site: 'https://example.com',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
