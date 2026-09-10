/**
 * Prueft, ob das gebaute CSS die Tokens aus vzp-tokens.json exakt abbildet.
 *
 * Ablauf:
 *   1. Erwartete Werte aus der JSON bilden (Alias-Ketten bis zum Literal).
 *   2. Das gebaute CSS aus dist/ parsen - also das, was wirklich im Browser
 *      ankommt, nicht die Quelldatei.
 *   3. var()-Ketten im CSS aufloesen und Wert fuer Wert vergleichen.
 *   4. Media-Query-Overrides separat pruefen.
 *
 * Voraussetzung: npm run build wurde ausgefuehrt.
 */
import { readFileSync, readdirSync } from 'node:fs';

const raw = JSON.parse(readFileSync('vzp-tokens.json', 'utf8'));

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
const isAlias = (v) => typeof v === 'string' && /^\{.+\}$/.test(v);

const byShortPath = new Map();
for (const token of tokens) {
  const short = token.path.split('.').slice(1).join('.');
  if (!byShortPath.has(short)) byShortPath.set(short, token);
}

function resolveJson(value, depth = 0) {
  if (depth > 20) throw new Error('Alias-Zyklus');
  if (!isAlias(value)) return String(value);
  return resolveJson(byShortPath.get(value.slice(1, -1)).$value, depth + 1);
}

// --- Gebautes CSS einlesen ---------------------------------------------
const cssDir = 'dist/_astro';
const cssFiles = readdirSync(cssDir).filter((f) => f.endsWith('.css'));
if (!cssFiles.length) {
  console.error('Kein CSS in dist/ gefunden. Erst `npm run build` ausfuehren.');
  process.exit(1);
}
const css = cssFiles.map((f) => readFileSync(`${cssDir}/${f}`, 'utf8')).join('\n');

/** Custom-Property-Deklarationen je Kontext einsammeln.
 *  Kontext ist "" fuer Regeln ausserhalb von @media, sonst die Media-Bedingung. */
function extractByContext(source) {
  const contexts = new Map([['', new Map()]]);
  let i = 0;
  const stack = [];
  while (i < source.length) {
    const atMedia = source.startsWith('@media', i);
    if (atMedia) {
      const braceAt = source.indexOf('{', i);
      const condition = source.slice(i + 6, braceAt).trim();
      stack.push(condition);
      if (!contexts.has(condition)) contexts.set(condition, new Map());
      i = braceAt + 1;
      continue;
    }
    if (source[i] === '{') {
      stack.push(null);
      i++;
      continue;
    }
    if (source[i] === '}') {
      stack.pop();
      i++;
      continue;
    }
    const declaration = /^(--[a-zA-Z0-9-]+)\s*:\s*([^;}]+)[;}]/.exec(source.slice(i));
    if (declaration) {
      const media = stack.filter((s) => typeof s === 'string').join(' and ');
      contexts.get(media === '' ? '' : media)?.set(declaration[1], declaration[2].trim());
      i += declaration[0].length - 1;
      continue;
    }
    i++;
  }
  return contexts;
}

const contexts = extractByContext(css);
const rootVars = contexts.get('') ?? new Map();

/** var()-Kette im CSS aufloesen. */
function resolveCss(value, scope, depth = 0) {
  if (depth > 20) return '<ZYKLUS>';
  const match = /^var\((--[a-zA-Z0-9-]+)\)$/.exec(value.trim());
  if (!match) return value.trim();
  const next = scope.get(match[1]) ?? rootVars.get(match[1]);
  if (next === undefined) return `<FEHLT:${match[1]}>`;
  return resolveCss(next, scope, depth + 1);
}

/**
 * Werte auf eine kanonische Form bringen. Der CSS-Minifier schreibt
 * Farben und Zeiten anders, aber wertgleich:
 *   #333333 -> #333, rgba(51,51,51,.08) -> #33333314, 150ms -> .15s
 * Ohne diese Umrechnung wuerde die Pruefung 26 Scheintreffer melden.
 * Bewusst wertetreu: nur Schreibweisen werden vereinheitlicht, keine
 * Toleranzen eingebaut - echte Abweichungen fallen weiterhin auf.
 */
function canonicalizeColor(value) {
  const hex = /^#([0-9a-f]{3,8})$/i.exec(value);
  if (hex) {
    let h = hex[1].toLowerCase();
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length === 6) h += 'ff';
    return `#${h}`;
  }
  const rgba = /^rgba?\(([^)]+)\)$/i.exec(value);
  if (rgba) {
    const parts = rgba[1].split(/[,/]/).map((s) => s.trim());
    if (parts.length < 3) return null;
    const [r, g, b] = parts.slice(0, 3).map((n) => Math.round(parseFloat(n)));
    const alpha = parts[3] === undefined ? 1 : parseFloat(parts[3]);
    // Gleiche Rundung wie der Minifier: Alpha auf 0-255.
    const a = Math.round(alpha * 255);
    return '#' + [r, g, b, a].map((n) => n.toString(16).padStart(2, '0')).join('');
  }
  return null;
}

function canonicalizeTime(value) {
  const m = /^(-?[\d.]+)(ms|s)$/i.exec(value.trim());
  if (!m) return null;
  const n = parseFloat(m[1]);
  return `${m[2].toLowerCase() === 's' ? n * 1000 : n}ms`;
}

function normalize(value) {
  const v = String(value)
    .trim()
    .toLowerCase()
    .replace(/\s*,\s*/g, ',')
    .replace(/\s+/g, ' ');
  const color = canonicalizeColor(v);
  if (color) return color;
  const time = canonicalizeTime(v);
  if (time) return time;
  // Zusammengesetzte Werte (z. B. Schatten) Bestandteil fuer Bestandteil.
  if (/\s/.test(v)) {
    return v
      .split(' ')
      .map((part) => canonicalizeColor(part) ?? canonicalizeTime(part) ?? part)
      .join(' ')
      .replace(/(^|[^\w.])0+\.(\d)/g, '$1.$2');
  }
  return v.replace(/(^|[^\w.])0+\.(\d)/g, '$1.$2').replace(/"/g, "'");
}

// --- Pruefung 1: Basis-Tokens ------------------------------------------
const layerOf = (t) => t.path.split('.')[0];
const base = tokens.filter((t) => ['primitive', 'semantic', 'component'].includes(layerOf(t)));

let ok = 0;
const failures = [];
for (const token of base) {
  const cssVar = cssVarOf(token);
  const expected = resolveJson(token.$value);
  if (!rootVars.has(cssVar)) {
    failures.push({ cssVar, expected, actual: '<NICHT IM CSS>', path: token.path });
    continue;
  }
  const actual = resolveCss(rootVars.get(cssVar), rootVars);
  if (normalize(actual) === normalize(expected)) ok++;
  else failures.push({ cssVar, expected, actual, path: token.path });
}

// --- Pruefung 2: Media-Query-Overrides ---------------------------------
const overrideChecks = [];
function checkOverride(list, matcher, label) {
  for (const token of list) {
    const cssVar = cssVarOf(token);
    const expected = resolveJson(token.$value);
    const entry = [...contexts.entries()].find(([cond, map]) => matcher(cond) && map.has(cssVar));
    if (!entry) {
      overrideChecks.push({
        label,
        cssVar,
        expected,
        actual: '<KEIN OVERRIDE GEFUNDEN>',
        ok: false,
      });
      continue;
    }
    const actual = resolveCss(entry[1].get(cssVar), entry[1]);
    overrideChecks.push({
      label,
      cssVar,
      expected,
      actual,
      ok: normalize(actual) === normalize(expected),
    });
  }
}

for (const [breakpoint, group] of Object.entries(raw.responsive ?? {})) {
  const list = collect(group, ['responsive', breakpoint], []);
  // Der Minifier schreibt (min-width: 48em) als (width>=48em).
  const num = breakpoint.replace(/[^0-9.]/g, '');
  const unit = breakpoint.replace(/[0-9.]/g, '');
  checkOverride(
    list,
    (c) => c.replace(/\s/g, '').includes(`>=${num}${unit}`),
    `@media >= ${breakpoint}`,
  );
}
const reduced = collect(raw['prefers-reduced-motion'] ?? {}, ['prefers-reduced-motion'], []);
checkOverride(
  reduced,
  (c) => c.includes('prefers-reduced-motion'),
  '@media prefers-reduced-motion',
);

// --- Bericht ------------------------------------------------------------
const overrideOk = overrideChecks.filter((c) => c.ok).length;
console.log('VZP Design Tokens - Verifikation gegen das gebaute CSS');
console.log('='.repeat(58));
console.log(`Basis-Tokens:          ${ok}/${base.length} uebereinstimmend`);
console.log(`Media-Query-Overrides: ${overrideOk}/${overrideChecks.length} uebereinstimmend`);
console.log();

if (failures.length) {
  console.log(`ABWEICHUNGEN (${failures.length}):`);
  for (const f of failures) {
    console.log(`  ${f.cssVar}`);
    console.log(`    Pfad:     ${f.path}`);
    console.log(`    erwartet: ${f.expected}`);
    console.log(`    im CSS:   ${f.actual}`);
  }
}
for (const c of overrideChecks.filter((c) => !c.ok)) {
  console.log(`  ${c.label} ${c.cssVar}: erwartet ${c.expected}, im CSS ${c.actual}`);
}

const allOk = failures.length === 0 && overrideOk === overrideChecks.length;
console.log(allOk ? 'ERGEBNIS: alle Tokens stimmen ueberein.' : 'ERGEBNIS: Abweichungen gefunden.');
process.exit(allOk ? 0 : 1);
