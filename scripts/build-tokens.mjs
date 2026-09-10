/**
 * Erzeugt src/styles/tokens.css aus vzp-tokens.json.
 *
 * Die JSON ist die Quelle der Wahrheit (siehe Cover des VZP Design Systems).
 * Diese Datei niemals von Hand nachziehen - stattdessen `npm run tokens`.
 *
 * Abbildung:
 *   1. Jeder Token wird als CSS-Variable unter seinem exakten `cssVariable`-
 *      Namen aus der JSON ausgegeben. Aliase bleiben als var()-Referenz
 *      erhalten, damit die 3-Ebenen-Architektur (primitive -> semantic ->
 *      component) im CSS bestehen bleibt.
 *   2. `responsive` und `prefers-reduced-motion` werden zu Media-Query-Bloecken,
 *      die dieselben Variablen ueberschreiben.
 *   3. Passende Tokens werden zusaetzlich in einem @theme-Block auf
 *      Tailwind-Namespaces gemappt, damit sie als Utilities nutzbar sind.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SOURCE = 'vzp-tokens.json';
const TARGET = 'src/styles/tokens.css';

const raw = JSON.parse(readFileSync(SOURCE, 'utf8'));

/** Alle Tokens flach einsammeln. Tokens duerfen verschachtelte Kind-Tokens
 *  haben (z. B. color.action.primary besitzt $value UND .hover), deshalb wird
 *  auch unterhalb eines gefundenen $value weitergelaufen. */
function collect(node, path, out) {
  if (!node || typeof node !== 'object') return out;
  if ('$value' in node) out.push({ path: path.join('.'), ...node });
  for (const [key, value] of Object.entries(node)) {
    if (!key.startsWith('$')) collect(value, [...path, key], out);
  }
  return out;
}

const tokens = collect(raw, [], []);
const cssVarOf = (t) => t.$extensions['de.vzp'].cssVariable;

/** Referenzen in der JSON lassen die fuehrende Ebene weg: {color.paper.50}
 *  meint primitive.color.paper.50. Index ohne Ebenen-Praefix aufbauen. */
const byShortPath = new Map();
for (const token of tokens) {
  const short = token.path.split('.').slice(1).join('.');
  if (!byShortPath.has(short)) byShortPath.set(short, token);
}

const isAlias = (value) => typeof value === 'string' && /^\{.+\}$/.test(value);

/** Alias -> var()-Referenz auf die Ziel-Variable. */
function toCssValue(value) {
  if (!isAlias(value)) return String(value);
  const target = byShortPath.get(value.slice(1, -1));
  if (!target) throw new Error(`Referenz nicht aufloesbar: ${value}`);
  return `var(${cssVarOf(target)})`;
}

/** Alias-Kette bis zum Literal aufloesen - fuer Stellen, an denen Tailwind
 *  einen echten Wert braucht (Breakpoints werden zur Buildzeit sortiert). */
function resolveLiteral(value, depth = 0) {
  if (depth > 20) throw new Error(`Alias-Zyklus bei ${value}`);
  if (!isAlias(value)) return String(value);
  const target = byShortPath.get(value.slice(1, -1));
  if (!target) throw new Error(`Referenz nicht aufloesbar: ${value}`);
  return resolveLiteral(target.$value, depth + 1);
}

/** Tailwind-Namespace fuer einen Token, anhand des cssVariable-Namens.
 *  Bewusst ueber den Namen statt ueber $type: die Quelle hat an einzelnen
 *  Stellen falsche $type-Angaben (z. B. radius.surface ist als "color"
 *  deklariert), die Namen sind durchgaengig korrekt. */
function themeNameFor(cssVar) {
  const name = cssVar.replace(/^--vzp-/, '');
  const rules = [
    [/^color-(.+)$/, 'color'],
    [/^space-(.+)$/, 'spacing'],
    [/^spacing-(.+)$/, 'spacing'],
    [/^font-family-(.+)$/, 'font'],
    [/^font-size-(.+)$/, 'text'],
    [/^font-weight-(.+)$/, 'font-weight'],
    [/^line-height-(.+)$/, 'leading'],
    [/^letter-spacing-(.+)$/, 'tracking'],
    [/^radius-(.+)$/, 'radius'],
    [/^shadow-(.+)$/, 'shadow'],
    [/^breakpoint-(.+)$/, 'breakpoint'],
    [/^container-(.+)$/, 'container'],
    [/^easing-(.+)$/, 'ease'],
  ];
  for (const [pattern, namespace] of rules) {
    const match = name.match(pattern);
    if (match) return `--${namespace}-${match[1]}`;
  }
  return null;
}

const layerOf = (t) => t.path.split('.')[0];
const base = tokens.filter((t) => ['primitive', 'semantic', 'component'].includes(layerOf(t)));

function declarations(list, indent = '  ') {
  return list.map((t) => `${indent}${cssVarOf(t)}: ${toCssValue(t.$value)};`).join('\n');
}

function section(title, list) {
  if (!list.length) return '';
  return `\n  /* ${title} (${list.length}) */\n${declarations(list)}\n`;
}

const out = [];
out.push('/*');
out.push(' * VZP Design System - Design Tokens');
out.push(' *');
out.push(' * AUTOGENERIERT aus vzp-tokens.json von scripts/build-tokens.mjs.');
out.push(' * Nicht von Hand bearbeiten - Aenderungen gehen in die JSON und dann:');
out.push(' *   npm run tokens');
out.push(' *');
out.push(` * ${raw.$description}`);
out.push(' */');
out.push('');
out.push(':root {');
out.push(
  section(
    'Primitives',
    base.filter((t) => layerOf(t) === 'primitive'),
  ).trimEnd(),
);
out.push(
  section(
    'Semantics',
    base.filter((t) => layerOf(t) === 'semantic'),
  ).trimEnd(),
);
out.push(
  section(
    'Komponenten',
    base.filter((t) => layerOf(t) === 'component'),
  ).trimEnd(),
);
out.push('}');
out.push('');

// Responsive Overrides. Die Schluessel der JSON sind die Min-Breiten.
for (const [breakpoint, group] of Object.entries(raw.responsive ?? {})) {
  const list = collect(group, ['responsive', breakpoint], []);
  out.push(`/* Overrides ab ${breakpoint} */`);
  out.push(`@media (min-width: ${breakpoint}) {`);
  out.push('  :root {');
  out.push(list.map((t) => `    ${cssVarOf(t)}: ${toCssValue(t.$value)};`).join('\n'));
  out.push('  }');
  out.push('}');
  out.push('');
}

const reducedMotion = collect(raw['prefers-reduced-motion'] ?? {}, ['prefers-reduced-motion'], []);
if (reducedMotion.length) {
  out.push('/* Bewegung reduzieren: Dauern und Distanzen praktisch auf null */');
  out.push('@media (prefers-reduced-motion: reduce) {');
  out.push('  :root {');
  out.push(reducedMotion.map((t) => `    ${cssVarOf(t)}: ${toCssValue(t.$value)};`).join('\n'));
  out.push('  }');
  out.push('}');
  out.push('');
}

// Tailwind-Theme. Die Default-Farbpalette wird geleert: 39 VZP-Farbnamen
// kollidieren mit Tailwind-Defaults, sonst waere z. B. bg-blue-500 mal
// VZP-Blau und mal Tailwind-Blau. Nach dem Reset ist die Palette exakt das
// Design System.
out.push('@theme {');
out.push('  /* Tailwind-Standardpalette leeren - die Palette ist das Design System. */');
out.push('  --color-*: initial;');
out.push('');

const themed = [];
for (const token of base) {
  const themeName = themeNameFor(cssVarOf(token));
  if (!themeName) continue;
  // Breakpoints braucht Tailwind als Literal, um Media Queries zu sortieren.
  const value = themeName.startsWith('--breakpoint-')
    ? resolveLiteral(token.$value)
    : `var(${cssVarOf(token)})`;
  themed.push({ themeName, value, cssVar: cssVarOf(token) });
}

const seenTheme = new Set();
for (const entry of themed) {
  if (seenTheme.has(entry.themeName)) {
    throw new Error(`Doppelter Theme-Name ${entry.themeName} (${entry.cssVar})`);
  }
  seenTheme.add(entry.themeName);
  out.push(`  ${entry.themeName}: ${entry.value};`);
}
out.push('}');
out.push('');

writeFileSync(TARGET, out.join('\n'));

const skipped = base.length - themed.length;
console.log(`${TARGET} geschrieben`);
console.log(`  Tokens gesamt:        ${tokens.length}`);
console.log(`  CSS-Variablen:        ${base.length}`);
console.log(`  Responsive-Overrides: ${tokens.length - base.length}`);
console.log(`  Tailwind-Utilities:   ${themed.length}`);
console.log(`  nur als var():        ${skipped}`);
