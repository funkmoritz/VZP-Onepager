# VZP Onepager

Grundgerüst eines Onepagers auf Basis von [Astro](https://astro.build) mit
TypeScript (strict), Tailwind CSS v4, SEO-/Open-Graph-Meta und Sitemap.

Umgesetzt ist der komplette Onepager nach dem Hi-Fi-Screendesign
(`vzp_full_website_design.pdf`: Desktop 1440 px, Mobile 390 px, Dokumentation
1c) auf Basis des VZP Design Systems v1.0.

## Voraussetzungen

Node.js 20+ (entwickelt mit v22).

## Befehle

| Befehl                  | Wirkung                                         |
| ----------------------- | ----------------------------------------------- |
| `npm install`           | Abhängigkeiten installieren                     |
| `npm run dev`           | Dev-Server auf http://localhost:4321            |
| `npm run build`         | Produktions-Build nach `./dist`                 |
| `npm run preview`       | Build lokal ausliefern                          |
| `npm run check`         | Typecheck der `.astro`-/`.ts`-Dateien           |
| `npm run format`        | Alles mit Prettier formatieren                  |
| `npm run format:check`  | Formatierung prüfen, ohne zu schreiben (für CI) |
| `npm run tokens`        | `tokens.css` aus `vzp-tokens.json` erzeugen     |
| `npm run tokens:verify` | Gebautes CSS gegen die Token-JSON prüfen        |
| `npm run og-image`      | `public/og-image.png` neu erzeugen              |

## Struktur

```
├── vzp-tokens.json         # QUELLE DER WAHRHEIT für alle Design-Tokens
├── astro.config.mjs        # site-URL, Asset-Ordner, Integrationen, Tailwind-Vite-Plugin
├── .prettierrc.mjs         # Prettier inkl. astro- und tailwind-Plugin
├── scripts/
│   ├── build-tokens.mjs    # erzeugt tokens.css aus der JSON
│   ├── verify-tokens.mjs   # prüft das gebaute CSS gegen die JSON
│   ├── build-og-image.mjs  # erzeugt public/og-image.png (1200×630)
│   └── relative-urls.mjs   # Astro-Integration: macht den Build ortsunabhängig
├── public/
│   ├── favicon.svg         # Platzhalter
│   ├── logo.svg            # Wortmarke blau (Kopfzeile)
│   ├── logo-invertiert.svg # Wortmarke weiß (Footer auf Dunkelgrau)
│   ├── og-image.png        # GENERIERT — npm run og-image
│   ├── .htaccess           # nur Apache: UTF-8 für .txt, PDFs inline
│   └── downloads/          # VZP-Forum-Ausgaben als PDF
└── src/
    ├── consts.ts           # Seitenname, Meta-Defaults, Navigation, CTA
    ├── assets/
    │   ├── fonts/          # Noto Sans/Serif (woff2, latin + latin-ext, OFL)
    │   └── images/         # Bildmaterial aus dem Entwurf (Astro optimiert → AVIF/WebP)
    ├── data/
    │   ├── content.ts      # ALLE Texte, Kontaktdaten, Termine, Ausgaben (inkl. Mobilfassungen)
    │   ├── legal.ts        # Impressum und Datenschutzerklärung im Wortlaut
    │   └── schema.ts       # JSON-LD-Graph (Organization, Events, Personen, FAQ …)
    ├── components/
    │   ├── Header.astro    # Kopfzeile: Navigation, CTA, mobiles Menü, Scroll-Spy
    │   ├── Footer.astro    # Footer 4-spaltig / gestapelt
    │   ├── Logo.astro      # Wortmarke
    │   ├── Button.astro    # Button bzw. Link im Button-Gewand
    │   ├── sections/       # Hero, Positioning, Services, References, About,
    │   │                   # Events, News (+ Newsletter), Contact
    │   └── ui/             # Section, SectionHeader, Overline, PlusIcon,
    │                       # ResponsiveText, RichText, LegalText
    ├── layouts/
    │   └── Layout.astro    # html/head, Meta, JSON-LD, Font-Preload, Skip-Link, Header, <main>, Footer
    ├── pages/
    │   ├── index.astro     # Onepager (Sektionsfolge laut IA)
    │   ├── [legal].astro   # Impressum, Datenschutz, Barrierefreiheit (noch Stub)
    │   ├── robots.txt.ts   # robots.txt inkl. Sitemap-Verweis und KI-Crawlern
    │   └── llms.txt.ts     # Kurzfassung der Seite für Sprachmodelle (GEO)
    ├── scripts/
    │   └── disclosure.ts   # Inline-Accordions (Kurzvita, Webinar, „Ältere Ausgaben“)
    └── styles/
        ├── tokens.css      # GENERIERT — nicht von Hand bearbeiten
        ├── fonts.css       # @font-face, selbst gehostet
        ├── typography.css  # Textstile aus Figma (Display, H1–H5, Lead, Overline …)
        └── global.css      # Tailwind-Import, Basis-Styles, Container, Disclosure
```

## Deployment (SFTP)

`npm run build`, dann den **Inhalt** von `dist/` hochladen — nicht den Ordner
`dist` selbst. Ein `base` in der Config ist nicht nötig: Der Build ist
ortsunabhängig und läuft im Webroot genauso wie unter `/kunden/vzp/`.

Dafür sorgen zwei Dinge in `astro.config.mjs`:

- **`build.assets: 'assets'`** — statt Astros Standard `_astro`. Ordner mit
  führendem Unterstrich werden von manchen SFTP-Clients und Hostern gefiltert
  oder versteckt; das ist eine Fehlerquelle weniger.
- **`relativeUrls()`** (`scripts/relative-urls.mjs`) schreibt nach dem Build
  alle root-relativen Pfade auf die jeweilige Dateitiefe um:

  | vorher               | `dist/index.html` | `dist/impressum/index.html` |
  | -------------------- | ----------------- | --------------------------- |
  | `/assets/Layout.css` | `./assets/…`      | `../assets/…`               |
  | `/#kontakt`          | `./#kontakt`      | `../#kontakt`               |
  | `/logo.svg`          | `./logo.svg`      | `../logo.svg`               |

  Dasselbe im gebauten CSS: `url(/assets/noto….woff2)` → `url(./noto….woff2)`.
  Genau das ist der Grund für die eigene Integration statt
  `astro-relative-links`: Die Library fasst nur HTML an, die `@font-face`-URLs
  stecken aber im CSS — damit hätte man im Unterordner zwar Styles, aber keine
  Schriften.

Beim Upload darauf achten:

- **Binärmodus** für `.woff2`, `.avif`, `.webp`, `.jpg`, `.pdf` — ASCII-Modus
  zerstört sie. Die meisten Clients wählen automatisch richtig, FileZilla unter
  _Einstellungen → Übertragungen → Dateitypen_ auf „Binär“ stellen.
- **Alle Ordner** mit übertragen, besonders `assets/`. Filter des Clients
  („versteckte Dateien ignorieren“) vorher prüfen.
- **Alte Dateien löschen** oder überschreiben: Die Dateinamen in `assets/`
  enthalten einen Content-Hash, alte Stände bleiben sonst als Leichen liegen.

Absolut bleiben — und brauchen deshalb die echte `site`-URL in der Config —
Canonical, Open Graph, JSON-LD, `sitemap-*.xml` und `robots.txt`. Liegt die
Seite in einem Unterordner, gehört der mit in `site`
(z. B. `site: 'https://domain.de/kunden/vzp'`), sonst zeigt die Sitemap auf die
falschen URLs.

### Geprüft

Derselbe Build wurde aus dem Webroot und aus `/kunden/vzp/` ausgeliefert:
in beiden Fällen 0 × 404, CSS und beide Schriftfamilien geladen, alle 248
Design-Tokens aufgelöst, alle 10 Bilder vollständig.

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

## Komponenten

Konvention, der alle Komponenten folgen:

1. **Tailwind-Utility im Markup**, wenn es den Token als Utility gibt
   (`max-w-content`, `px-page-margin`, `gap-component-md`, `bg-surface-default`).
2. **Scoped `<style>`** für alles, was Komponenten-Tokens braucht — die haben
   bewusst keine Utility (`--vzp-header-height`, `--vzp-button-*`,
   `--vzp-nav-item-*`) — sowie für zustandsabhängige Regeln und Pseudoelemente.
3. **`global.css`** bleibt frei von Komponenten-CSS und enthält nur
   dokumentweit Gültiges.

Beim Debuggen wichtig: Tailwind legt seine Utilities in `@layer utilities`,
Astros Scoped Styles sind ungelayert und schlagen damit jede Utility —
unabhängig von der Spezifität.

### Kopfzeile

`Header.astro` ist `position: sticky` und exakt so hoch wie
`--vzp-header-height` (88px, mobil 64px) — passend zum `scroll-padding-top` in
`global.css`, damit Sprungmarken nicht unter der Leiste landen.

Zwei Umschaltpunkte, bewusst verschieden: die **Höhe** wechselt bei `48em`
(dort wechselt auch `scroll-padding-top`), die **Navigation** erst bei `64em` —
Logo, Claim, fünf Einträge und CTA brauchen rund 950px Breite.

Zustand des mobilen Menüs liegt ausschließlich in `aria-expanded`; CSS leitet
die Sichtbarkeit daraus ab. Ohne JavaScript bleibt die Navigation dauerhaft
sichtbar (das `data-js`-Flag setzt ein Inline-Skript im `<head>` vor dem ersten
Paint). Bei offenem Menü wird der Hintergrund `inert` gesetzt — das ersetzt
einen Fokus-Trap.

Die Navigationseinträge stehen in `NAV_ITEMS` (`src/consts.ts`); Navigation,
Scroll-Spy und die Abschnitte in `index.astro` lesen aus derselben Liste.

## Umsetzung des Screendesigns

- **Inhalte** stehen ausschließlich in `src/data/content.ts`. Felder vom Typ
  `Responsive` (`{ desktop, mobile }`) bilden die im Mobile-Entwurf gekürzten
  Texte ab; `ResponsiveText` blendet per `display: none` jeweils eine Fassung
  aus (damit auch für Screenreader, keine Doppelungen).
  **Regel dazu:** Eine Mobilfassung darf nur kürzer formulieren, nicht
  Information entfernen. Bei 200 % Browser-Zoom unterschreitet der Viewport die
  48em-Grenze und die Mobilfassung greift – weggeblendete Inhalte wären dort ein
  Verstoß gegen WCAG 1.4.4. `vzp-desktop-only` ist deshalb nur für echte
  Dubletten zulässig (Stats-Kacheln, Kategorie-Kicker, Begleitsätze, die eine
  Liste darunter wiederholen).
- **Fremdsprachige Passagen** werden in den Daten als `[en]…[/en]` markiert;
  `RichText` macht daraus `<span lang="en">` (WCAG 3.1.2). Eigennamen bleiben
  unmarkiert – das Erfolgskriterium nimmt sie aus.
- **Inline-Accordions** (`src/scripts/disclosure.ts`) nach ARIA-APG: Zustand in
  `aria-expanded`/`data-open`, Sichtbarkeit per CSS. `data-disclosure-mobile`
  macht ein Panel nur unter 48em einklappbar (Webinar, weitere Termine,
  ältere Forum-Ausgaben). Ohne JavaScript ist alles offen.
- **Rechtstexte** stehen als Blöcke (`p`, `ul`, `address`, `h3`) in
  `src/data/legal.ts`; `LegalText` rendert sie und löst Inline-Links der Form
  `[Beschriftung](ziel)` auf, damit die Absätze in den Daten lesbar bleiben.
- **Bilder** laufen über `astro:assets` (AVIF/WebP, `srcset`, feste Maße gegen
  CLS). Das Hero-Bild ist LCP und lädt `eager` mit `fetchpriority="high"`.
- **Wo das PDF nichts festlegt**, gilt das Figma Design System (Typo-Skala,
  Overline, Input/Checkbox, Footer-Padding, Seitenmodule).

## Barrierefreiheit, SEO und Antwortmaschinen

### Abweichungen vom Design System (begründet)

Zwei Token-Werte sind im Komponenten-CSS bewusst übersteuert, weil sie die
Kontrastanforderungen nicht erfüllen. Beide stehen so auch in `vzp-tokens.json`
und sollten dort korrigiert werden – bis dahin gilt die lokale Abweichung:

| Stelle                               | Token-Wert            | Kontrast | Verwendet                 |
| ------------------------------------ | --------------------- | -------- | ------------------------- |
| `--vzp-input-border-default`         | neutral-300 `#BFBCB8` | 1,89:1   | `text-secondary` (5,72:1) |
| `--vzp-input-border-hover`           | neutral-400 `#969390` | 3,06:1   | `neutral-600` (7,67:1)    |
| `.vzp-card-title-serif` (22 px mob.) | blue-500 `#007FB3`    | 4,48:1   | `blue-600` (6,00:1)       |

WCAG 1.4.11 verlangt 3:1 für die Begrenzung von Bedienelementen; das weiße
Eingabefeld hebt sich vom Rosé-Band nur mit 1,19:1 ab, der Rand ist also sein
einziges Erkennungsmerkmal. `.vzp-card-title-serif` startet mobil bei 22 px und
zählt damit nicht als „großer Text“ (4,5:1 statt 3:1). Derselbe Grund steht
bereits beim Menü-Umschalter in `Header.astro`.

Unbenutzt, aber im Design System vorhanden: `--vzp-button-tertiary-border`
(neutral-300) erreicht auf Papierweiß nur 1,81:1. Vor dem ersten Einsatz der
Tertiary-Variante korrigieren.

### Strukturierte Daten

`src/data/schema.ts` baut einen `@graph` pro Seite: Organisation, Website und
Seite überall, auf der Startseite zusätzlich die beiden Webinartermine, die
Geschäftsführung, die Beiräte, die Forum-Ausgaben und die eine echte Frage aus
der Kurzvita als `FAQPage`. **Dort darf nichts stehen, was auf der Seite nicht
sichtbar ist** – Google wertet das als Richtlinienverstoß, und erfundene
FAQ-Einträge sind ohnehin wertlos.

### Antwortmaschinen (GEO)

- `/llms.txt` ist eine Markdown-Kurzfassung nach llmstxt.org, erzeugt aus
  `content.ts` – sie kann damit nicht veralten.
- `robots.txt` erlaubt die Crawler der Antwortmaschinen namentlich.
  **Geschäftliche Entscheidung:** `Google-Extended` und `Applebot-Extended`
  steuern nicht das Crawling, sondern die Nutzung für KI-Training. Wer das nicht
  will, setzt sie in `src/pages/robots.txt.ts` auf `Disallow: /`; die normale
  Suche bleibt davon unberührt.
- `CONTENT_UPDATED` in `src/consts.ts` ist das `dateModified` der Seiten. Bei
  inhaltlichen Änderungen mitziehen – bewusst nicht das Build-Datum.

### Deployment

`public/.htaccess` setzt auf Apache UTF-8 für `.txt` (sonst brechen die Umlaute
in `llms.txt`, weil viele Server `text/plain` ohne `charset` senden) und liefert
PDFs inline aus. Jede Direktive steht in `<IfModule>` – eine .htaccess mit einer
Direktive aus einem fehlenden Modul legt sonst die ganze Seite mit einem 500er
lahm. Auf nginx/IIS ist die Datei wirkungslos; dort gehört das in die
Server-Konfiguration.

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

- [ ] `SITE_TITLE`/`SITE_DESCRIPTION` in `src/consts.ts` redaktionell abnehmen
- [ ] `public/favicon.svg` ergänzen (derzeit Platzhalter)
- [ ] `public/og-image.png` durch eine gestaltete Datei ersetzen – das generierte
      Bild setzt in Georgia/Arial, weil librsvg keine `@font-face` lädt und die
      Noto-Schriften dort nicht verfügbar sind
- [ ] Zwei Kontrast-Korrekturen in `vzp-tokens.json` nachziehen (Tabelle oben)
- [x] Offizielle Wortmarke in Blau (`public/logo.svg`) und invertiert für den
      Footer (`public/logo-invertiert.svg`)
- [x] `site` in `astro.config.mjs` auf `https://www.vzp-online.de` gesetzt
- [x] Noto Serif / Noto Sans selbst gehostet (`src/styles/fonts.css`)

### Inhalte aus dem Bestand

Alle Texte sind von **vzp-online.de** übernommen (Stand: 09.11.2026) und stehen
in `src/data/content.ts` (Onepager) bzw. `src/data/legal.ts` (Impressum,
Datenschutz). Angepasst wurde nur die Typografie (Anführungszeichen,
Gedankenstriche, doppelte Leerzeichen).

Wo das Screendesign Bausteine vorsieht, zu denen es auf der Bestandsseite keinen
Text gibt, steht weiterhin die Entwurfsfassung – jeweils mit `// Entwurfstext`
markiert: Hero-Overline, Zielgruppen im Positionierungsband, Drei-Schritte-Band
und Gruppentexte in den Leistungen, Titel/Lead der Events-Sektion, Lead der
Referenzen sowie die Stats unter „Über uns“.

Erledigt:

- [x] Referenzzitate (Gissler & Pass, WEIG Karton) im Originalwortlaut
- [x] Kundenlogos aus dem Bestand übernommen (`LogoPlaceholder` entfällt)
- [x] Kurzvitae der Geschäftsführung im Volltext inkl. Zitat Horst Ullrich
- [x] Webinar-Anmeldung: beide Microsoft-Teams-Events verlinkt
- [x] VZP-Forum-PDFs unter `public/downloads/`, Markt Spezial per E-Mail-Anfrage
- [x] Impressum und Datenschutzerklärung im Wortlaut, Pflichtinformation
      verlinkt auf funk-gruppe.de

Offen:

- [ ] Telefon/E-Mail gegenprüfen: die Bestandsseite nennt +49 211 17148439
      (Kontakt/Footer) und +49 221 9347210 (Impressum) – welche Nummer gehört
      auf die Kontaktseite?
- [ ] Kontaktformular: die Bestandsseite hat ein TYPO3-Formular mit
      Themen-Auswahl und hCaptcha. Hier führen die CTAs auf `mailto:` –
      Formular-Endpunkt klären oder beim `mailto:` bleiben
- [ ] Newsletter: Endpunkt mit Double-Opt-in eintragen (`NEWSLETTER.action`);
      Felder und Einwilligungstext entsprechen bereits dem Bestand
- [ ] Hochauflösende Forum-Cover anfordern (im Bestand nur 290 × 198 bzw.
      718 × 408 px)
- [ ] Erklärung zur Barrierefreiheit (BFSG) ergänzen, danach `noindex` entfernen
      (`src/data/legal.ts`)
- [ ] Datenschutzerklärung trägt den Stand „Mai 2018“, nennt aber bereits das
      TDDDG (2024) – Stand prüfen
- [ ] Zwei Korrekturen gegenüber dem Bestand fachlich bestätigen:
      „§ 5 Telemediengesetz (TGM)“ → „(TMG)“ sowie „Diese partnerschaftlichen
      Zusammenarbeit“ → „Diese partnerschaftliche Zusammenarbeit“ (Zitat Ullrich)
- [ ] Alt-Texte prüfen (Stimmungsbilder sind bewusst dekorativ, `alt=""`)
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
