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
├── astro.config.mjs        # site-URL, Sitemap-Integration, Tailwind-Vite-Plugin
├── .prettierrc.mjs         # Prettier inkl. astro- und tailwind-Plugin
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
        └── global.css      # Tailwind-Import, Design-Tokens, Basis-Styles
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

## Styling

Tailwind v4 wird über `@tailwindcss/vite` eingebunden und komplett im CSS
konfiguriert – es gibt keine `tailwind.config.js`. Design-Tokens stehen im
`@theme`-Block in `src/styles/global.css` und sind dort direkt als Utilities
verfügbar (`--color-brand` → `bg-brand`, `text-brand`).

## Offene TODOs

- [ ] `site` in `astro.config.mjs` auf die echte Produktions-URL setzen
- [ ] `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION` in `src/consts.ts` befüllen
- [ ] Design-Tokens in `src/styles/global.css` durch das echte CI ersetzen
- [ ] `public/favicon.svg` und `public/og-image.png` (1200×630) ergänzen
