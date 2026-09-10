/**
 * Zentrale Metadaten der Seite.
 * Die Produktions-URL selbst steht in `astro.config.mjs` (`site`) und wird
 * im Layout über `Astro.site` gelesen.
 */
export const SITE_NAME = 'VZP';

export const SITE_TITLE = 'VZP';

export const SITE_DESCRIPTION = 'TODO: Beschreibung der Seite (ca. 150–160 Zeichen).';

/** Sprache des Dokuments, z. B. für <html lang> und og:locale. */
export const SITE_LANG = 'de';
export const SITE_LOCALE = 'de_DE';

/** Default-Bild für Social-Previews, abgelegt unter /public. */
export const SITE_OG_IMAGE = '/og-image.png';
