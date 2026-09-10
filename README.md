# VZP Onepager

Grundgerüst eines Onepagers auf Basis von [Astro](https://astro.build) mit
TypeScript (strict), Tailwind CSS v4, SEO-/Open-Graph-Meta und Sitemap.

Bewusst ohne Komponenten – nur das Skelett.

## Voraussetzungen

Node.js 20+ (entwickelt mit v22).

## Befehle

| Befehl                 | Wirkung                                         |
| ---------------------- | ----------------------------------------------- |
| `npm install`          | Abhängigkeiten installieren                     |
| `npm run dev`          | Dev-Server auf http://localhost:4321            |
| `npm run build`        | Produktions-Build nach `./dist`                 |
| `npm run preview`      | Build lokal ausliefern                          |
| `npm run check`        | Typecheck der `.astro`-/`.ts`-Dateien           |
| `npm run format`       | Alles mit Prettier formatieren                  |
| `npm run format:check` | Formatierung prüfen, ohne zu schreiben (für CI) |

## Struktur

```
├── vzp-tokens.json         # QUELLE DER WAHRHEIT für alle Design-Tokens
├── astro.config.mjs        # site-URL, Sitemap-Integration, Tailwind-Vite-Plugin
├── .prettierrc.mjs         # Prettier inkl. astro- und tailwind-Plugin
├── scripts/
│   ├── build-tokens.mjs    # erzeugt tokens.css aus der JSON
│   └── verify-tokens.mjs   # prüft das gebaute CSS gegen die JSON
├── public/
│   └── favicon.svg         # Platzhalter
└── src/
    ├── consts.ts           # Seitenname, Default-Title/Description, Locale
    ├── layouts/
    │   └── Layout.astro    # html/head, SEO- und Open-Graph-Meta, Slots
    ├── pages/
    │   ├── index.astro     # leere Startseite
    │   └── robots.txt.ts   # robots.txt inkl. Sitemap-Verweis (zur Build-Zeit)
    └── styles/
        ├── tokens.css      # GENERIERT — nicht von Hand bearbeiten
        └── global.css      # Tailwind-Import, Basis-Styles aus den Tokens
```

## Layout

`Layout.astro` erwartet `title` und `description`, optional `image` (Social-Preview)
und `noindex`. Canonical- und Open-Graph-URLs werden absolut aus der `site` in
`astro.config.mjs` gebildet. Über den benannten Slot `head` lassen sich
seitenspezifische Tags ergänzen (Fonts, JSON-LD, Analytics).

```astro
<Layout title="…" description="…">
  <Fragment slot="head">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
  </Fragment>
  …
</Layout>
```

## Design-Tokens

`vzp-tokens.json` (DTCG-Format) ist die Quelle der Wahrheit. Daraus generiert
`npm run tokens` die Datei `src/styles/tokens.css`. **Diese CSS-Datei niemals von
Hand bearbeiten** – Änderungen gehören in die JSON, danach neu generieren.

Die 3-Ebenen-Architektur bleibt im CSS erhalten: Semantics und Komponenten-Tokens
sind `var()`-Referenzen auf die darunterliegende Ebene, keine kopierten Werte.
Wer `--vzp-color-blue-500` ändert, ändert alles, was darauf aufbaut.

```
248 CSS-Variablen   → :root  (128 primitive, 62 semantic, 58 component)
 13 Overrides       → @media ab 48em / 80em und prefers-reduced-motion
163 davon zusätzlich als Tailwind-Utilities
 85 nur als var()   (Komponenten-Tokens, Dauern, Icon-/Touch-Größen, Measures)
```

### Nutzung

```html
<!-- Als Tailwind-Utility -->
<div class="text-on-action rounded-interactive bg-action-primary p-component-md">
  <!-- Als CSS-Variable, z. B. für Komponenten-Tokens ohne Utility -->
  <style>
    .button {
      height: var(--vzp-button-height-md);
    }
  </style>
</div>
```

Tailwinds Standard-Farbpalette ist bewusst geleert (`--color-*: initial`): 39 der
VZP-Farbnamen kollidieren mit Tailwind-Defaults, `bg-blue-500` wäre sonst
mehrdeutig. Nach dem Reset ist die Palette exakt das Design System. Nebenwirkung:
`bg-black` existiert nicht mehr, der dunkelste Wert ist `bg-neutral-900`
(#1F1E1D). `bg-transparent` und `text-current` funktionieren weiterhin.

Die Motion-Dauern haben in Tailwind v4 keinen Theme-Namespace und sind deshalb
nur als Variablen verfügbar: `duration-[var(--vzp-duration-fast)]`.

### Verifikation

```bash
npm run build && npm run tokens:verify
```

Prüft jede der 248 Variablen und alle 13 Overrides gegen das **gebaute** CSS,
inklusive Auflösung der `var()`-Ketten. Erkennt Wert-Drift, falsch gezielte
Aliase und fehlende Media-Query-Overrides.

## Offene TODOs

- [ ] `site` in `astro.config.mjs` auf die echte Produktions-URL setzen
- [ ] `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION` in `src/consts.ts` befüllen
- [ ] `public/favicon.svg` und `public/og-image.png` (1200×630) ergänzen
- [ ] Noto Serif / Noto Sans einbinden – wegen DSGVO selbst hosten, nicht über
      Google Fonts. Ohne die Schriften greifen die Fallbacks aus den Tokens.
- [ ] **9 Tokens fehlen in `vzp-tokens.json`**, obwohl die Figma-Datei sie nutzt:
      `typography-{display,lead,body-sm,overline}-{size,line-height}` und
      `color-text-on-inverse-muted`. Siehe Abschnitt unten.

## Bekannte Lücke zwischen Figma und JSON

Das Figma-Cover nennt **289 Variablen**, die JSON enthält **261**. Die Differenz
ist nachweisbar, nicht geschätzt: Die Cover-Seite der Figma-Datei referenziert
Tokens, die in der JSON nicht existieren.

Belegt fehlend (Werte aus Figma ausgelesen, Primitives dafür sind in der JSON
bereits vorhanden):

| Token                                   | Wert laut Figma | passendes Primitive in der JSON |
| --------------------------------------- | --------------- | ------------------------------- |
| `--vzp-typography-display-size`         | 64px            | `font.size.1100` (4rem)         |
| `--vzp-typography-display-line-height`  | 67px            | –                               |
| `--vzp-typography-lead-size`            | 22px            | `font.size.600` (1.375rem)      |
| `--vzp-typography-lead-line-height`     | 34px            | –                               |
| `--vzp-typography-body-sm-size`         | 14px            | `font.size.200` (0.875rem)      |
| `--vzp-typography-body-sm-line-height`  | 22px            | –                               |
| `--vzp-typography-overline-size`        | 12px            | `font.size.100` (0.75rem)       |
| `--vzp-typography-overline-line-height` | 16px            | –                               |
| `--vzp-color-text-on-inverse-muted`     | #DCC8C1         | `color.paper.300`               |

Die JSON kennt nur `typography.body.md.*`, `typography.heading.family` und
`typography.ui.family` – die semantische Typo-Skala der 22 Figma-Text-Styles
fehlt weitgehend. Diese Tokens gehören in die JSON ergänzt, nicht in den Code;
danach genügt `npm run tokens`.

Gegenprobe: Die vier Tokens, die in **beiden** Quellen vorkommen, stimmen exakt
überein (`background-inverse` #333333, `text-on-inverse` #F5E9E5,
`link-inverse` und `focus-ring-inverse` #99CFE7).
