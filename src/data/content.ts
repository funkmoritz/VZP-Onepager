/**
 * Inhalte des Onepagers - eine Quelle fuer alle Sektionen.
 *
 * Texte 1:1 aus dem Hi-Fi-Screendesign (vzp_full_website_design.pdf).
 * `mobile`-Felder enthalten die im Mobile-Entwurf (1b) gekuerzten Fassungen;
 * fehlt das Feld, gilt der Desktop-Text auf allen Breiten.
 *
 * TODO vor Livegang (Abschnitt 10 "Markierte Platzhalter" im Entwurf):
 *  - Referenzzitate sind sinngemaess formuliert -> Originaltext einsetzen
 *  - Telefondurchwahlen und E-Mail-Adressen verifizieren
 *  - Newsletter-Frequenz "etwa vier Mal im Jahr" bestaetigen
 *  - Kurzvitae der Geschaeftsfuehrung mit dem Volltext aus dem Bestand fuellen
 */

/** Text mit optional abweichender Mobilfassung. */
export interface Responsive {
  desktop: string;
  mobile?: string;
}

const tel = (display: string) => `tel:${display.replace(/[^\d+]/g, '')}`;

/* ------------------------------------------------------------------------ */
/* Kontakt                                                                  */
/* ------------------------------------------------------------------------ */

export const CONTACT = {
  name: 'Versicherungsstelle Zellstoff und Papier',
  nameLines: ['Versicherungsstelle', 'Zellstoff und Papier'],
  street: 'Amsterdamer Straße 192',
  zip: '50735',
  city: 'Köln',
  email: 'verbund@vzp-online.de',
  phone: '+49 211 1714-534',
  get phoneHref() {
    return tel(this.phone);
  },
  partner: {
    label: 'VZP-Kooperationspartner Funk',
    href: 'https://www.funk-gruppe.de/',
  },
} as const;

/* ------------------------------------------------------------------------ */
/* Hero                                                                     */
/* ------------------------------------------------------------------------ */

export const HERO = {
  overline: 'Risikopartner der Papierwirtschaft',
  titleLines: ['Unsere Expertise:', 'Ihre Sicherheit.'],
  lead: {
    desktop:
      'Wir versichern und beraten Unternehmen der Papierwirtschaft — mit Branchenkenntnis aus erster Hand und der Marktstärke unseres Partners Funk, dem größten unabhängigen Versicherungsmakler Deutschlands.',
    mobile:
      'Wir versichern und beraten Unternehmen der Papierwirtschaft — mit Branchenkenntnis aus erster Hand und der Marktstärke unseres Partners Funk.',
  } satisfies Responsive,
  primaryCta: { label: 'Gespräch vereinbaren', href: '#kontakt' },
  secondaryCta: { label: 'Leistungen ansehen', href: '#leistungen' },
  facts: [
    {
      title: 'Nur Papierwirtschaft',
      text: {
        desktop:
          'Spezialisiert auf Herstellung, Verarbeitung, Handel, Druck, Recycling und Energie.',
        mobile: 'Herstellung, Verarbeitung, Handel, Druck, Recycling, Energie.',
      },
    },
    {
      title: 'Kunden sind Gesellschafter',
      text: {
        desktop: 'Einblick in Arbeitsweise, Planung und Kennzahlen — und Mitbestimmung.',
        mobile: 'Einblick in Arbeitsweise, Planung, Kennzahlen — und Mitbestimmung.',
      },
    },
    {
      title: 'Weltweite Lösungen',
      text: {
        desktop: 'Über Funk und das Netzwerk der Funk Alliance Risk Consultants.',
        mobile: 'Über Funk und die Funk Alliance Risk Consultants.',
      },
    },
  ] satisfies { title: string; text: Responsive }[],
};

/* ------------------------------------------------------------------------ */
/* Positionierungsband                                                      */
/* ------------------------------------------------------------------------ */

export const POSITIONING = {
  statement: {
    desktop:
      'Wir kennen die Anlagen, die Materialströme und die Menschen hinter der Produktion. Deshalb erkennen wir Risiken früher — und sichern sie präziser ab.',
    mobile: 'Wir kennen die Anlagen, die Materialströme und die Menschen hinter der Produktion.',
  } satisfies Responsive,
  audienceLabel: 'Für wen wir arbeiten',
  audiences: [
    { desktop: 'Papierhersteller' },
    { desktop: 'Papierverarbeiter' },
    { desktop: 'Druckereien' },
    { desktop: 'Papierhändler' },
    { desktop: 'Oberflächenveredler' },
    { desktop: 'Kraftwerke' },
    { desktop: 'Klärwerke' },
    { desktop: 'Recyclingunternehmen', mobile: 'Recycling' },
  ] satisfies Responsive[],
};

/* ------------------------------------------------------------------------ */
/* Leistungen                                                               */
/* ------------------------------------------------------------------------ */

export const SERVICES = {
  overline: 'Leistungen',
  title: 'Leistungen für Ihre Spitzenleistung',
  intro: [
    {
      desktop:
        'Weil es in der Papierwirtschaft auf reibungslose Abläufe ankommt, konzentrieren wir unsere Leistung vor allem auf die Risikominimierung und Absicherung Ihres Betriebes. Unsere Experten analysieren und bewerten die Risikopotenziale sowie die Auswirkungen möglicher Schadensereignisse in Ihrem Unternehmen.',
      mobile:
        'Weil es in der Papierwirtschaft auf reibungslose Abläufe ankommt, konzentrieren wir unsere Leistung auf die Risikominimierung und Absicherung Ihres Betriebes.',
    },
    {
      desktop:
        'Auf Grundlage unserer Analysen entwickeln wir gemeinsam mit Ihnen maßgeschneiderte Maßnahmenkonzepte und erarbeiten passgenaue Versicherungs- und Risikomanagementlösungen für den optimalen und nachhaltigen Schutz Ihrer Werte.',
      mobile:
        'Auf Grundlage unserer Analysen entwickeln wir gemeinsam mit Ihnen maßgeschneiderte Maßnahmenkonzepte für den nachhaltigen Schutz Ihrer Werte.',
    },
  ] satisfies Responsive[],
  steps: [
    {
      label: 'Schritt 01',
      title: 'Risiken analysieren',
      text: {
        desktop: 'Begehung von Anlagen und Prozessen, Bewertung der Risikopotenziale im Betrieb.',
        mobile: 'Anlagen und Prozesse begehen, Risikopotenziale bewerten.',
      },
    },
    {
      label: 'Schritt 02',
      title: 'Auswirkungen bewerten',
      text: {
        desktop:
          'Schadensereignisse und Betriebsunterbrechungen werden in ihrer Wirkung durchgerechnet.',
        mobile: 'Schadensereignisse und Betriebsunterbrechungen durchrechnen.',
      },
    },
    {
      label: 'Schritt 03',
      title: 'Maßnahmen umsetzen',
      text: {
        desktop:
          'Maßgeschneidertes Konzept, passgenaue Versicherungs- und Risikomanagementlösungen.',
        mobile: 'Passgenaue Versicherungs- und Risikomanagementlösungen.',
      },
    },
  ] satisfies { label: string; title: string; text: Responsive }[],
  portfolioIntro:
    'Wir stehen für ein international bewährtes Leistungs- und Lösungsportfolio, das auf die individuellen Anforderungen Ihres Unternehmens zugeschnitten ist.',
  groups: [
    {
      id: 'makler',
      edge: 'brand',
      title: 'Maklerdienstleistungen',
      text: 'Versicherungsschutz und Vorsorge für Betrieb, Gesellschafter und Familien.',
      columns: 1,
      items: [
        'Betriebliche Versicherung',
        'Delkredererisiken',
        'Betriebliche Altersversorgung',
        'Private Absicherung der Gesellschafter und ihrer Familien',
      ],
    },
    {
      id: 'risiko',
      edge: 'accent',
      title: 'Risikoberatung für einen sicheren Betrieb',
      text: 'Technische Beratung an Anlagen, Prozessen und Infrastruktur.',
      columns: 2,
      items: [
        'Risikomanagement',
        'Brandschutz',
        'Maschinen- und Anlagenschutz',
        'Umweltschutz',
        'Analysen und Schutz zu Betriebsunterbrechungen',
        'Beratung zu Energiethemen',
      ],
    },
  ] as const,
};

/* ------------------------------------------------------------------------ */
/* Referenzen                                                               */
/* ------------------------------------------------------------------------ */

export const REFERENCES = {
  overline: 'Referenzen',
  title: 'Warum man uns gerne vertraut.',
  lead: 'Stimmen von Gesellschaftern aus der Papier- und Kartonherstellung.',
  /** Redaktioneller Hinweis aus dem Entwurf - wird nur im Dev-Modus angezeigt. */
  placeholderNote: {
    desktop:
      'Platzhalter — Originalzitat aus dem Bestand einsetzen (Volltext liegt auf der aktuellen Seite vor).',
    mobile: 'Platzhalter — Originalzitate einsetzen, mobil auf 2–3 Sätze kürzen.',
  },
  items: [
    {
      quote: {
        desktop:
          'Uns ist ein Ansprechpartner wichtig, der die Anlagen kennt und im Schadenfall sofort weiß, worum es geht. Genau das bekommen wir bei der VZP.',
        mobile:
          'Uns ist ein Ansprechpartner wichtig, der die Anlagen kennt und im Schadenfall sofort weiß, worum es geht.',
      },
      company: 'Gissler & Pass GmbH',
      logoLabel: 'Logo Gissler & Pass',
      role: { desktop: 'Wellpappenrohpapier · Gesellschafter', mobile: 'Gesellschafter' },
    },
    {
      quote: {
        desktop:
          'Risiko- und Versicherungsmanagement braucht Menschen, die unsere Betriebsabläufe verstehen. Der Dialog mit der VZP ist offen, transparent und auf Augenhöhe.',
        mobile: 'Der Dialog mit der VZP ist offen, transparent und auf Augenhöhe.',
      },
      company: 'WEIG Karton',
      logoLabel: 'Logo WEIG Karton',
      role: { desktop: 'Kartonherstellung · Gesellschafter', mobile: 'Gesellschafter' },
    },
  ] satisfies { quote: Responsive; company: string; logoLabel: string; role: Responsive }[],
};

/* ------------------------------------------------------------------------ */
/* Ueber uns                                                                */
/* ------------------------------------------------------------------------ */

export const ABOUT = {
  overline: 'Über uns',
  title: 'Wissen, worauf es ankommt.',
  philosophy: {
    desktop:
      'Unser Anspruch, die Experten für Risikolösungen in der Papierwirtschaft zu sein, entsteht nicht nur aus Branchenkenntnis, sondern auch aus unserer Philosophie: Unsere Kunden sind unsere Partner.',
    mobile:
      'Unser Anspruch, die Experten für Risikolösungen in der Papierwirtschaft zu sein, entsteht aus Branchenkenntnis und aus unserer Philosophie: Unsere Kunden sind unsere Partner.',
  } satisfies Responsive,
  body: [
    {
      desktop:
        'Die Unternehmen, die wir betreuen, sind überwiegend auch Gesellschafter ihres eigenen Versicherungsmaklers. Sie haben Einblick in unsere Arbeitsweise, unsere Planung und unsere Kennzahlen — und bestimmen diese im Rahmen ihrer Gesellschaftertätigkeit maßgeblich mit.',
      mobile:
        'Die Unternehmen, die wir betreuen, sind überwiegend auch Gesellschafter ihres eigenen Versicherungsmaklers — mit Einblick und Mitbestimmung.',
    },
    {
      desktop:
        'Gemeinsam mit unserem Partner Funk und dessen internationalem Netzwerk der Funk Alliance Risk Consultants erarbeiten wir weltweit passende Lösungen — ganz gleich, ob es sich um Versicherung, Vorsorge oder Risikomanagement handelt.',
      mobile: '',
    },
  ] satisfies Responsive[],
  stats: [
    { value: '6', label: 'Beiräte aus der Branche' },
    { value: '2', label: 'Geschäftsführer' },
  ],
  board: {
    title: 'Unsere Beiräte',
    text: 'Entscheider aus der Branche begleiten die Arbeit der VZP.',
    members: [
      {
        name: 'Dr. Christopher Grünewald',
        company: 'Grünewald Papier GmbH & Co. KG, Vorsitzender',
      },
      { name: 'Claudia Autenrieb', company: 'Papierfabrik Niederauer Mühle GmbH' },
      { name: 'Thomas Gissler-Weber', company: 'Gissler & Pass GmbH' },
      { name: 'Frank Gumbinger', company: 'Papierfabrik Adolf Jass GmbH & Co. KG' },
      { name: 'Dr. Joachim Reichert', company: 'Wasserverband Eifel-Rur' },
      { name: 'Steffen Schmidt', company: 'GETEC Energie Holding GmbH' },
    ],
  },
  managementTitle: 'Ihre Geschäftsführung',
};

export interface Manager {
  id: string;
  name: string;
  role: string;
  since: string;
  phone: string;
  phoneHref: string;
  /** TODO: persoenliche Adresse verifizieren (im Entwurf aus Screenshot rekonstruiert). */
  emailHref: string;
  /**
   * Kurzvita. Im Entwurf eingeklappt und ohne Volltext - die Absaetze unten
   * enthalten nur gesicherte Fakten aus dem Entwurf.
   * TODO: Volltext der Kurzvita aus dem Bestand (bisheriges Overlay) uebernehmen.
   */
  vita: string[];
  /**
   * Zitat in der Vita (Overlay-Mapping: "Werdegang + Zitat zweispaltig").
   * TODO: Originalzitat aus dem Bestand - bewusst nicht erfunden. Ist es
   * gesetzt, wird die Vita zweispaltig dargestellt.
   */
  vitaQuote?: string;
}

const managerMail = (name: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Anfrage an ${name}`)}`;

export const MANAGEMENT: Manager[] = [
  {
    id: 'horst-ullrich',
    name: 'Horst Ullrich',
    role: 'Geschäftsführer',
    since: 'seit 1. Januar 2015',
    phone: '+49 211 1714-514',
    phoneHref: tel('+49 211 1714-514'),
    emailHref: managerMail('Horst Ullrich'),
    vita: [
      'Horst Ullrich ist seit dem 1. Januar 2015 Geschäftsführer der Versicherungsstelle Zellstoff und Papier.',
      'Als Sachverständiger für Maschinen, Anlagen und technische Betriebsausstattung ist er die erste Anlaufstelle für Risikofragen im Betrieb.',
    ],
  },
  {
    id: 'bernhard-schwanke',
    name: 'Bernhard C. Schwanke',
    role: 'Geschäftsführer',
    since: 'seit 2023',
    phone: '+49 40 359140',
    phoneHref: tel('+49 40 359140'),
    emailHref: managerMail('Bernhard C. Schwanke'),
    vita: [
      'Bernhard C. Schwanke ist seit 2023 Geschäftsführer der Versicherungsstelle Zellstoff und Papier.',
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Events & Webinare                                                        */
/* ------------------------------------------------------------------------ */

export const EVENTS = {
  overline: 'Events & Webinare',
  title: 'Wissen aus der Praxis, kompakt vermittelt.',
  lead: 'Unsere Experten geben ihr Wissen in kurzen Online-Formaten weiter — konkret, ohne Verkaufsdruck, mit Raum für Ihre Fragen.',
  featured: {
    id: 'webinar-tci',
    badge: 'Webinar',
    meta: { desktop: 'Online · 60 Minuten', mobile: '23.09. & 28.09.2026' },
    title: {
      desktop:
        'Versicherungskosten optimieren: Von der Schadentransparenz zur passenden Selbstbeteiligung',
      mobile: 'Versicherungskosten optimieren: Von der Schadentransparenz zur Selbstbeteiligung',
    },
    body: [
      {
        desktop:
          'Historisch gewachsene Versicherungsstrukturen sind häufig Kostentreiber. Total Cost of Insurance betrachtet Ihre Versicherungskosten ganzheitlich — nicht nur Prämien, sondern alle Kostenbestandteile rund um Risikotransfer und Eigentragung.',
        mobile:
          'Total Cost of Insurance betrachtet Ihre Versicherungskosten ganzheitlich — nicht nur Prämien, sondern alle Kosten rund um Risikotransfer und Eigentragung. Gemeinsam mit Funk optimieren Sie Policen und Selbstbeteiligungen.',
      },
      {
        desktop:
          'Gemeinsam mit Funk optimieren Sie Ihre Risikokosten über zwei Hebel: die Optimierung der Versicherungspolicen und die Einführung adäquater Selbstbeteiligungen.',
        mobile: '',
      },
    ] satisfies Responsive[],
    benefitsLabel: 'Ihre Mehrwerte',
    benefits: [
      {
        desktop: 'Deutliche Risikokostenreduzierung, langfristig optimierte Risikoposition',
        mobile: 'Deutliche Risikokostenreduzierung',
      },
      { desktop: 'Transparenz über bestehende Schadenverläufe' },
      { desktop: 'Bessere Verhandlungsposition gegenüber Versicherern' },
      { desktop: 'Identifikation aller relevanten Risikokostenpositionen', mobile: '' },
      {
        desktop: 'Objektive Analyse verschiedener Selbstbeteiligungsmodelle',
        mobile: 'Objektive Analyse der Selbstbeteiligungsmodelle',
      },
    ] satisfies Responsive[],
    datesLabel: 'Termine',
    dates: [
      { date: 'Mi, 23.09.2026', iso: '2026-09-23T11:00', time: '11:00 – 12:00 Uhr' },
      { date: 'Mo, 28.09.2026', iso: '2026-09-28T09:00', time: '09:00 – 10:00 Uhr' },
    ],
    cta: {
      label: 'Zum Webinar anmelden',
      // TODO: Anmeldeseite eintragen, sobald vorhanden. Bis dahin per E-Mail.
      href: `mailto:${CONTACT.email}?subject=${encodeURIComponent('Anmeldung Webinar: Versicherungskosten optimieren')}`,
    },
    note: 'Teilnahme kostenfrei, Zugangslink nach Anmeldung.',
  },
  moreLabel: 'Weitere Termine',
  /** Platzhalter laut Entwurf - durch echte Termine ersetzen. */
  more: [
    {
      id: 'termin-weiterer-webinartermin',
      overline: 'Platzhalter · Termin folgt',
      title: 'Weiterer Webinartermin',
      titleSuffix: ' — Titel und Inhalt von der VZP zu ergänzen',
      text: 'Struktur je Eintrag: Kurzbeschreibung, Mehrwerte, Termine, Anmelde-CTA.',
    },
    {
      id: 'termin-weiteres-format',
      overline: 'Platzhalter · Termin folgt',
      title: 'Weiteres Format',
      titleSuffix: ' — Titel und Inhalt von der VZP zu ergänzen',
      text: 'Vergangene Termine werden aus der Liste entfernt oder unter „Archiv“ geführt.',
    },
  ],
};

/* ------------------------------------------------------------------------ */
/* Aktuelles                                                                */
/* ------------------------------------------------------------------------ */

export const NEWS = {
  overline: 'Aktuelles',
  title: 'VZP Forum',
  lead: {
    desktop:
      'Aktuelle Fachthemen und Informationen aus der Versicherungs- und Papierbranche — als PDF zum Lesen und Weitergeben.',
    mobile: 'Fachthemen aus der Versicherungs- und Papierbranche als PDF.',
  } satisfies Responsive,
  /** TODO: Ziel fuer das Ausgaben-Archiv festlegen. */
  archive: { label: 'Alle Ausgaben', href: 'https://www.vzp-online.de/' },
  moreLabel: 'Ältere Ausgaben anzeigen',
  /** Mobil sichtbare Anzahl, der Rest hinter "Aeltere Ausgaben anzeigen". */
  mobileVisible: 2,
  /** TODO: PDFs unter public/downloads/ ablegen (Dateinamen wie unten). */
  issues: [
    {
      category: 'Markt Spezial',
      title: 'VZP Forum Markt Spezial 2026',
      date: '23.07.2026',
      iso: '2026-07-23',
      href: '/downloads/vzp-forum-markt-spezial-2026.pdf',
      image: 'forum-markt-spezial-2026',
    },
    {
      category: 'Ausgabe',
      title: 'VZP Forum Juli 2026',
      date: '22.07.2026',
      iso: '2026-07-22',
      href: '/downloads/vzp-forum-juli-2026.pdf',
      image: 'forum-juli-2026',
    },
    {
      category: 'Ausgabe',
      title: 'VZP Forum Oktober 2025',
      date: '05.11.2025',
      iso: '2025-11-05',
      href: '/downloads/vzp-forum-oktober-2025.pdf',
      image: 'forum-oktober-2025',
    },
  ] as const,
};

export const NEWSLETTER = {
  id: 'newsletter',
  title: 'Newsletter der VZP',
  text: {
    desktop:
      'Neue Forum-Ausgaben, Webinartermine und Branchenhinweise — etwa vier Mal im Jahr, jederzeit kündbar.',
    mobile: 'Forum-Ausgaben, Webinartermine, Branchenhinweise. Jederzeit kündbar.',
  } satisfies Responsive,
  emailLabel: 'E-Mail-Adresse',
  emailPlaceholder: 'name@unternehmen.de',
  helper: 'Wir nutzen Ihre Adresse ausschließlich für den Versand des VZP-Newsletters.',
  submit: 'Newsletter abonnieren',
  /**
   * TODO: Endpunkt des Newsletter-Dienstes (Double-Opt-in) eintragen.
   * Bis dahin geht die Anmeldung als E-Mail an die VZP.
   */
  action: `mailto:${CONTACT.email}?subject=${encodeURIComponent('Newsletter-Anmeldung')}`,
};

/* ------------------------------------------------------------------------ */
/* Kontakt                                                                  */
/* ------------------------------------------------------------------------ */

export const CONTACT_SECTION = {
  overline: 'Kontakt',
  title: 'Wenn Sie uns brauchen, sind wir da.',
  lead: {
    desktop:
      'Schreiben Sie uns oder rufen Sie an — Sie sprechen direkt mit jemandem, der Ihre Branche kennt. Wir melden uns innerhalb eines Arbeitstages zurück.',
    mobile: 'Sie sprechen direkt mit jemandem, der Ihre Branche kennt.',
  } satisfies Responsive,
  emailCta: 'E-Mail an die VZP',
  person: {
    overline: { desktop: 'Ihr direkter Ansprechpartner', mobile: 'Ihr Ansprechpartner' },
    text: 'Sachverständiger für Maschinen, Anlagen und technische Betriebsausstattung — erste Anlaufstelle für Risikofragen im Betrieb.',
  },
};

/* ------------------------------------------------------------------------ */
/* Footer                                                                   */
/* ------------------------------------------------------------------------ */

export const LEGAL_PAGES = [
  { slug: 'impressum', label: 'Impressum' },
  { slug: 'datenschutz', label: 'Datenschutz' },
  { slug: 'pflichtinformation', label: 'Pflichtinformation' },
  { slug: 'barrierefreiheit', label: 'Barrierefreiheit' },
] as const;

export const FOOTER = {
  copyright: {
    desktop: `© ${new Date().getFullYear()} ${CONTACT.name} · Ein Unternehmen der Papierwirtschaft, gemeinsam mit Funk.`,
    mobile: `© ${new Date().getFullYear()} ${CONTACT.name}`,
  } satisfies Responsive,
};
