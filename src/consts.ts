/**
 * Zentrale Metadaten der Seite.
 * Die Produktions-URL selbst steht in `astro.config.mjs` (`site`) und wird
 * im Layout über `Astro.site` gelesen.
 */
export const SITE_NAME = 'VZP';

/**
 * Seitentitel. Bewusst 50 statt 83 Zeichen: Suchmaschinen schneiden ab etwa
 * 60 Zeichen bzw. 580 px ab, der Zusatz "Risikopartner der Papierwirtschaft"
 * war in den Ergebnissen nie zu sehen. Der vollstaendige Firmenname steht
 * weiterhin in `og:site_name`, im JSON-LD (`legalName`), in der Kopfzeile und
 * im Footer - Markensuchen finden die Seite darueber.
 */
export const SITE_TITLE = 'VZP – Versicherungsmakler für die Papierwirtschaft';

export const SITE_DESCRIPTION =
  'Die VZP versichert und berät Unternehmen der Papierwirtschaft – mit Branchenkenntnis aus erster Hand und der Marktstärke unseres Partners Funk.';

/** Vollstaendige Firmierung fuer strukturierte Daten und Social-Tags. */
export const SITE_LEGAL_NAME =
  'Versicherungsstelle Zellstoff und Papier Gesellschaft mit beschränkter Haftung';

/**
 * Stand der Inhalte (ISO). Geht als `dateModified` in die strukturierten Daten
 * und hilft Antwortmaschinen bei der Aktualitaetsbewertung.
 * Bewusst von Hand gepflegt und nicht aus dem Build-Datum: ein neuer Build
 * aendert die Inhalte nicht. Bei inhaltlichen Aenderungen hier mitziehen.
 */
export const CONTENT_UPDATED = '2026-11-09';

/** Sprache des Dokuments, z. B. für <html lang> und og:locale. */
export const SITE_LANG = 'de';
export const SITE_LOCALE = 'de_DE';

/** Default-Bild für Social-Previews, abgelegt unter /public. */
export const SITE_OG_IMAGE = '/og-image.png';

/**
 * Sprungmarken der Onepager-Navigation.
 * Die Reihenfolge ist zugleich die Reihenfolge der Abschnitte auf der Seite –
 * Navigation, Scroll-Spy und die Abschnitte selbst lesen aus dieser einen Liste,
 * damit die IDs nicht auseinanderlaufen koennen.
 */
export const NAV_ITEMS = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'referenzen', label: 'Referenzen' },
  { id: 'ueber-uns', label: 'Über uns' },
  { id: 'events', label: 'Events' },
  { id: 'aktuelles', label: 'Aktuelles' },
] as const satisfies readonly { id: string; label: string }[];

/** Ziel und Beschriftung des Haupt-CTA in der Kopfzeile. */
export const HEADER_CTA = {
  href: '#kontakt',
  /** Kurzform, immer sichtbar. */
  label: 'Kontakt',
  /** Ergaenzung, die erst ab der Desktop-Navigation eingeblendet wird. */
  labelSuffix: ' aufnehmen',
} as const;

/** Vollstaendiger Name hinter dem Kuerzel, u. a. fuer den Claim neben dem Logo. */
export const SITE_CLAIM = ['Versicherungsstelle', 'Zellstoff und Papier'] as const;

/**
 * ID des <main>-Elements und damit Ziel des Skip-Links. Steht hier zentral,
 * damit Link und Ziel nicht auseinanderlaufen koennen.
 */
export const CONTENT_ID = 'inhalt';
