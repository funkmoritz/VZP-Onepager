// Macht den statischen Build ortsunabhängig.
//
// Astro schreibt alle internen Pfade absolut ab Domain-Wurzel (`/assets/…`,
// `/impressum`, `/favicon.svg`). Liegt der Build nach dem Upload nicht exakt im
// Webroot, sondern z. B. unter `/vzp/`, laufen die alle ins Leere: Das HTML
// kommt an, CSS, Schriften und Bilder nicht.
//
// Diese Integration schreibt sie nach dem Build in Pfade relativ zur jeweils
// referenzierenden Datei um. Danach funktioniert derselbe `dist`-Ordner im
// Webroot wie in jedem Unterordner — ohne `base` in der Config.
//
// Absolut bleiben bewusst: Canonical, Open Graph, JSON-LD, Sitemap und
// robots.txt. Die brauchen die echte Produktions-URL aus `site`.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// URL-tragende Attribute. `content` fehlt absichtlich — das sind die
// Open-Graph-Tags, die absolut bleiben müssen.
const URL_ATTR = /\b(href|src|poster|action)="(\/(?!\/)[^"]*)"/g;
const SRCSET_ATTR = /\b(srcset|imagesrcset)="([^"]*)"/g;
// Ein srcset-Kandidat: Satzanfang oder Komma, dann der Pfad, dann optional ein
// Deskriptor (`400w`, `2x`), der unverändert stehen bleibt.
const SRCSET_URL = /(^|,)(\s*)(\/(?!\/)[^\s,]+)/g;
const CSS_URL = /url\(\s*(['"]?)(\/(?!\/)[^'")]+)\1\s*\)/g;
// Nur zur Warnung: absolute Asset-Pfade in gebündeltem JavaScript.
const JS_ABSOLUTE = /["'](\/(?:assets|_astro)\/[^"']+)["']/;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/**
 * `/assets/app.css` → `../assets/app.css`, gesehen von `fromDir` aus.
 * Hash und Query bleiben unangetastet, ein abschließender Schrägstrich bleibt
 * erhalten (`/impressum/` ist nicht dasselbe wie `/impressum`).
 */
function toRelative(url, fromDir, root) {
  const cut = url.search(/[#?]/);
  const path = cut === -1 ? url : url.slice(0, cut);
  const suffix = cut === -1 ? '' : url.slice(cut);

  let rel = relative(fromDir, join(root, path)).split(sep).join('/');
  if (rel === '') rel = '.';
  if (!rel.startsWith('.')) rel = `./${rel}`;
  if (path.endsWith('/') && !rel.endsWith('/')) rel += '/';

  return rel + suffix;
}

function rewriteHtml(html, fromDir, root) {
  return html
    .replace(URL_ATTR, (_, attr, url) => `${attr}="${toRelative(url, fromDir, root)}"`)
    .replace(SRCSET_ATTR, (_, attr, value) => {
      const rewritten = value.replace(
        SRCSET_URL,
        (_m, delim, space, url) => delim + space + toRelative(url, fromDir, root),
      );
      return `${attr}="${rewritten}"`;
    });
}

function rewriteCss(css, fromDir, root) {
  return css.replace(
    CSS_URL,
    (_, quote, url) => `url(${quote}${toRelative(url, fromDir, root)}${quote})`,
  );
}

export default function relativeUrls() {
  return {
    name: 'vzp:relative-urls',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const touched = { html: 0, css: 0 };

        for await (const file of walk(root)) {
          const fromDir = dirname(file);

          if (file.endsWith('.html')) {
            const source = await readFile(file, 'utf8');
            const output = rewriteHtml(source, fromDir, root);
            if (output !== source) {
              await writeFile(file, output);
              touched.html++;
            }
          } else if (file.endsWith('.css')) {
            const source = await readFile(file, 'utf8');
            const output = rewriteCss(source, fromDir, root);
            if (output !== source) {
              await writeFile(file, output);
              touched.css++;
            }
          } else if (file.endsWith('.js')) {
            // JS-Bundles werden nicht umgeschrieben: `import.meta.url` und
            // dynamische Importe sind zu heikel für eine Textersetzung. Gibt es
            // welche mit absoluten Asset-Pfaden, muss das von Hand gelöst
            // werden — lieber laut scheitern als still kaputt ausliefern.
            const source = await readFile(file, 'utf8');
            const hit = source.match(JS_ABSOLUTE);
            if (hit) {
              logger.warn(
                `${relative(root, file)} enthält den absoluten Pfad ${hit[1]} — ` +
                  `der funktioniert nur im Webroot.`,
              );
            }
          }
        }

        logger.info(`Pfade relativ gemacht: ${touched.html} HTML-, ${touched.css} CSS-Dateien.`);
      },
    },
  };
}
