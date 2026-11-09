// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import relativeUrls from './scripts/relative-urls.mjs';

// https://astro.build/config
export default defineConfig({
  // Produktionsdomain. Davon haengen Sitemap, robots.txt und die absoluten
  // Canonical-/Open-Graph-URLs im Layout ab. Sie zeigt bewusst auf die
  // Live-Domain und nicht auf eine Staging-URL: Canonical soll immer das
  // Original benennen, auch wenn der Build in einem Unterordner liegt
  // (dafuer sorgt scripts/relative-urls.mjs bei den Asset-Pfaden).
  site: 'https://www.vzp-online.de',

  build: {
    // Statt `_astro`: Ordner mit führendem Unterstrich werden von manchen
    // SFTP-Clients und Hostern gefiltert oder versteckt.
    assets: 'assets',
  },

  integrations: [
    sitemap({
      // Die Barrierefreiheitserklaerung steht noch aus und traegt `noindex` -
      // eine Seite, die nicht in den Index soll, gehoert nicht in die Sitemap.
      filter: (page) => !page.includes('/barrierefreiheit'),
      // Die Forum-Ausgaben sind der inhaltlich dichteste Teil des Angebots.
      // Als PDF unter /downloads/ findet sie kein interner Seiten-Crawl der
      // Sitemap-Integration - deshalb hier ausdruecklich. Dateinamen muessen
      // zu NEWS.issues in src/data/content.ts passen.
      customPages: [
        'https://www.vzp-online.de/downloads/vzp-forum-oktober-2026.pdf',
        'https://www.vzp-online.de/downloads/vzp-forum-juli-2026.pdf',
      ],
    }),
    relativeUrls(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
