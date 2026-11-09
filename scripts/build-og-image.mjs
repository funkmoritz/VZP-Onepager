/**
 * Erzeugt public/og-image.png (1200 x 630) aus Design-System-Werten.
 *
 *   node scripts/build-og-image.mjs
 *
 * Bewusst zur Hand und nicht bei jedem Build: Das Bild aendert sich nur, wenn
 * Claim oder Marke sich aendern.
 *
 * ZWISCHENSTAND: Das von sharp genutzte librsvg laedt keine @font-face-Regeln
 * (auch nicht als Data-URI), die Noto-Dateien aus src/assets/fonts sind hier
 * also nicht verwendbar. Gesetzt wird deshalb in Georgia bzw. Arial - beide
 * sind auf Windows und macOS vorhanden und kommen Noto Serif/Sans optisch
 * nahe. Fuer ein markengenaues Vorschaubild ersetzt die VZP public/og-image.png
 * durch eine gestaltete Datei (1200 x 630, < 300 KB); am Code aendert das
 * nichts.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Farben aus vzp-tokens.json (Primitives, siehe src/styles/tokens.css).
const PAPER = '#FDF9F8';
const BLUE = '#007FB3';
const TEXT = '#333333';
const MUTED = '#686663';

const logo = readFileSync(join(root, 'public/logo.svg'), 'utf8');
// Nur den Pfad uebernehmen, damit das Logo frei skaliert in die Flaeche passt.
const logoPath = /<path[^>]*\sd="([^"]+)"/.exec(logo)?.[1];
if (!logoPath) throw new Error('Pfad in public/logo.svg nicht gefunden');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="0" y="0" width="14" height="630" fill="${BLUE}"/>
  <g transform="translate(80, 76) scale(0.95)">
    <path d="${logoPath}" fill="${BLUE}"/>
  </g>
  <text x="80" y="310" font-family="Georgia" font-size="74" fill="${BLUE}">Gemeinsam sicher sein.</text>
  <text x="80" y="374" font-family="Arial" font-size="29" fill="${TEXT}">Versicherungslösungen, Vorsorge und Risikomanagement</text>
  <text x="80" y="416" font-family="Arial" font-size="29" fill="${TEXT}">für die Papierwirtschaft und ihre Partner.</text>
  <rect x="80" y="500" width="64" height="3" fill="${BLUE}"/>
  <text x="80" y="552" font-family="Arial" font-size="22" fill="${MUTED}">Versicherungsstelle Zellstoff und Papier</text>
</svg>`;

const out = join(root, 'public/og-image.png');
const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(out, png);
console.log(`og-image.png geschrieben: ${Math.round(png.length / 1024)} KB (1200 x 630)`);
