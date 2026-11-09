/**
 * Inhalte des Onepagers - eine Quelle fuer alle Sektionen.
 *
 * Alle Texte sind von vzp-online.de uebernommen (Stand: 09.11.2026) und dort
 * woertlich belegt. Angepasst wurde ausschliesslich die Typografie
 * (Anfuehrungszeichen, Gedankenstriche, doppelte Leerzeichen).
 *
 * Wo das Hi-Fi-Screendesign Bausteine vorsieht, zu denen es auf der
 * Bestandsseite keinen Text gibt, steht die Entwurfsfassung - jeweils mit
 * `// Entwurfstext` markiert. Das betrifft: Hero-Overline, Positionierungs-
 * Zielgruppen, das Drei-Schritte-Band in den Leistungen, die Gruppentexte im
 * Portfolio, Titel/Lead der Events-Sektion sowie die Stats unter "Ueber uns".
 *
 * `mobile`-Felder enthalten gekuerzte Fassungen; fehlt das Feld, gilt der
 * Desktop-Text auf allen Breiten. Zitate und Rechtstexte werden nicht gekuerzt.
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
  legalForm: 'Gesellschaft mit beschränkter Haftung',
  street: 'Amsterdamer Straße 192',
  zip: '50735',
  city: 'Köln',
  email: 'welcome@vzp-online.de',
  phone: '+49 211 17148439',
  get phoneHref() {
    return tel(this.phone);
  },
  partner: {
    label: 'VZP–Kooperationspartner Funk',
    href: 'https://www.funk-gruppe.com',
  },
} as const;

/* ------------------------------------------------------------------------ */
/* Hero                                                                     */
/* ------------------------------------------------------------------------ */

export const HERO = {
  overline: 'Risikopartner der Papierwirtschaft', // Entwurfstext
  titleLines: ['Gemeinsam sicher sein.'],
  lead: {
    desktop:
      'Als Partner dieser Branche ist es unsere Aufgabe, Unternehmern und Entscheidern die Sicherheit zu geben, die sie brauchen, um genauso zukunftsfähig zu bleiben wie der Wertstoff, mit dem sie arbeiten. Unsere Expertise umfasst dabei nicht nur alle relevanten Leistungen des Versicherungs- und Risikomanagements und der Vorsorge, sondern auch das Know-how der Papierwirtschaft und ihrer Partner.',
    mobile:
      'Als Partner dieser Branche ist es unsere Aufgabe, Unternehmern und Entscheidern die Sicherheit zu geben, die sie brauchen, um genauso zukunftsfähig zu bleiben wie der Wertstoff, mit dem sie arbeiten.',
  } satisfies Responsive,
  primaryCta: { label: 'Gespräch vereinbaren', href: '#kontakt' },
  secondaryCta: { label: 'Leistungen ansehen', href: '#leistungen' },
  /** Die vier Claims der Bestandsseite (dort als Hero-Karussell). */
  facts: [
    {
      label: 'Unser Mehrwert:',
      title: 'Partnerschaft.',
      text: {
        desktop:
          'In unserer Branche geht es um Vertrauen. Deshalb arbeiten wir partnerschaftlich Hand in Hand mit unseren Kunden.',
      },
    },
    {
      label: 'Unser Anliegen:',
      title: 'Wertschätzung.',
      text: {
        desktop:
          'Wir wissen um den Wert der Werkstoffe und Produkte in unserer Branche. Deshalb setzen wir uns aus Überzeugung für die Sicherheit unserer Branche ein.',
        mobile: 'Wir wissen um den Wert der Werkstoffe und Produkte in unserer Branche.',
      },
    },
    {
      label: 'Unsere Expertise:',
      title: 'Ihre Sicherheit.',
      text: {
        desktop:
          'Gemeinsam mit unserem Partner Funk, dem größten inhabergeführten Versicherungsmakler am deutschen Markt, besitzen wir die Expertise in Sachen Sicherheit.',
        mobile:
          'Gemeinsam mit unserem Partner Funk, dem größten inhabergeführten Versicherungsmakler am deutschen Markt.',
      },
    },
    {
      label: 'Unser Fokus:',
      title: 'Die Papierwirtschaft.',
      text: {
        desktop:
          'Wir konzentrieren uns bewusst auf die Herausforderungen Ihrer Branche. Das macht uns zum besten Partner für die Sicherheit der Papierwirtschaft.',
        mobile: 'Wir konzentrieren uns bewusst auf die Herausforderungen Ihrer Branche.',
      },
    },
  ] satisfies { label: string; title: string; text: Responsive }[],
};

/* ------------------------------------------------------------------------ */
/* Positionierungsband                                                      */
/* ------------------------------------------------------------------------ */

export const POSITIONING = {
  statement: {
    desktop:
      'Versicherungslösungen, Vorsorge und Risikomanagement für die Papierwirtschaft und ihre Partner.',
  } satisfies Responsive,
  audienceLabel: 'Für wen wir arbeiten', // Entwurfstext
  /** Entwurfstext - auf der Bestandsseite gibt es keine Zielgruppenliste. */
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
  title: 'für Ihre Spitzenleistung',
  intro: [
    {
      desktop:
        'Weil es in der Papierwirtschaft auf reibungslose Abläufe ankommt, konzentrieren wir unsere Leistung vor allem auf die Risikominimierung und Absicherung Ihres Betriebes.',
    },
    {
      desktop:
        'Unsere Experten analysieren und bewerten die Risikopotenziale, sowie die Auswirkungen möglicher Schadensereignisse in Ihrem Unternehmen.',
    },
    {
      desktop:
        'Auf Grundlage unserer Analysen entwickeln wir gemeinsam mit Ihnen maßgeschneiderte Maßnahmenkonzepte, die Ihnen klar aufzeigen, worauf Sie in Sachen betrieblicher Sicherheit achten müssen. Wir erarbeiten dementsprechend passgenaue Versicherungs- und Risikomanagementlösungen für den optimalen und nachhaltigen Schutz Ihrer Werte.',
      mobile:
        'Auf Grundlage unserer Analysen entwickeln wir gemeinsam mit Ihnen maßgeschneiderte Maßnahmenkonzepte, die Ihnen klar aufzeigen, worauf Sie in Sachen betrieblicher Sicherheit achten müssen.',
    },
  ] satisfies Responsive[],
  /** Entwurfstext - fasst das Vorgehen aus den Absaetzen oben zusammen. */
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
  portfolioTitle: 'Leistungs- und Lösungsportfolio',
  portfolioIntro:
    'Wir stehen für ein international bewährtes Leistungs- und Lösungsportfolio, das perfekt auf die individuellen Anforderungen Ihres Unternehmens zugeschnitten ist.',
  groups: [
    {
      id: 'makler',
      edge: 'brand',
      title: 'Unsere Maklerdienstleistungen',
      text: 'Versicherungsschutz und Vorsorge für Betrieb, Gesellschafter und Familien.', // Entwurfstext
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
      title: 'Unsere Risikoberatung für einen sicheren Betrieb',
      text: 'Technische Beratung an Anlagen, Prozessen und Infrastruktur.', // Entwurfstext
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
  lead: 'Stimmen von Gesellschaftern aus der Papier- und Kartonherstellung.', // Entwurfstext
  items: [
    {
      quote:
        'Das Vertrauen in die Kompetenz der Ansprechpartner ist ebenso wichtig wie das Gefühl, gut und mit Blick auf die jeweils spezifischen Sicherungsnotwendigkeiten beraten zu werden. Aus eigener Erfahrung wissen wir, wie wichtig ein kompetenter und engagierter Partner an der Seite im Falle eines Schadens und bei der Schadenregulierung ist. Gut zu wissen, dass wir das auch immer wieder aus dem Kreis der übrigen VZP-Gesellschafter bestätigt bekommen. Als Gesellschafter der VZP nutzen wir seit vielen Jahren den Dialog mit den VZP-Mitarbeitern aber auch mit unseren VZP-Mitgesellschaftern und Kollegen zur Vertiefung und Aktualisierung unserer Einsichten in einen immer komplexer werdenden Versicherungsmarkt.',
      company: 'Gissler & Pass GmbH',
      logo: 'logo-gissler-pass',
    },
    {
      quote:
        'Risiko- und Versicherungsmanagement – gerade da geht es um die Existenz und um den Fortbestand unseres Unternehmens bei Schäden und besonders bei Betriebsunterbrechungen. Zu einem so wichtigen und kritischen Thema haben wir einen Spezialisten gesucht. Mit der VZP haben wir uns für DIE Experten in der Papierwirtschaft entschieden. In der persönlichen Betreuung durch die VZP haben wir über die Jahre bei allen versicherungstechnischen Angelegenheiten ein sehr gutes Gefühl, das sich auch immer wieder bestätigt. Die Experten der VZP kennen uns, unser Geschäft, unsere Technik und unsere Anforderungen. Neue Themen und Veränderungen am Markt werden proaktiv an uns herangetragen und in unserem Sinne für uns gelöst. Bei der Regulierung von Schäden können wir uns ganz auf unsere Betreuer der VZP verlassen und fühlen uns im Dialog mit den Versicherern optimal vertreten und unterstützt. Als Mitgesellschafter unseres „eigenen“ Versicherungsmaklers genießen wir gegenseitig ein sehr großes Vertrauen und unsere Entscheidung für die VZP beweist sich immer wieder als richtig.',
      company: 'WEIG Karton',
      logo: 'logo-weig-karton',
    },
  ] satisfies { quote: string; company: string; logo: string }[],
};

/* ------------------------------------------------------------------------ */
/* Ueber uns                                                                */
/* ------------------------------------------------------------------------ */

export const ABOUT = {
  overline: 'Über uns',
  title: 'Wissen, worauf es ankommt.',
  philosophy: {
    desktop:
      'Unseren Anspruch, der Experte für Risikolösungen in der Papierwirtschaft zu sein, unterstreichen wir nicht nur mit unserer Branchenherkunft, sondern auch mit unserer Philosophie: Unsere Kunden sind unsere Partner.',
    mobile:
      'Unseren Anspruch, der Experte für Risikolösungen in der Papierwirtschaft zu sein, unterstreichen wir mit unserer Branchenherkunft und mit unserer Philosophie: Unsere Kunden sind unsere Partner.',
  } satisfies Responsive,
  body: [
    {
      desktop:
        'Wir wurden von sieben Unternehmen der Papierwirtschaft gegründet und viele unserer Kunden sind Gesellschafter der VZP. Daher wissen wir besser als jeder andere, worauf es in unserer Branche ankommt und welche Werte es zu schützen gilt. Als Partner der Papierwirtschaft ist es unsere Aufgabe, Unternehmen und Entscheidern die Sicherheit zu geben, die sie brauchen, um genauso zukunftsfähig zu bleiben wie der Werkstoff, mit dem sie arbeiten.',
      mobile:
        'Wir wurden von sieben Unternehmen der Papierwirtschaft gegründet und viele unserer Kunden sind Gesellschafter der VZP. Daher wissen wir besser als jeder andere, worauf es in unserer Branche ankommt und welche Werte es zu schützen gilt.',
    },
    {
      // Kein `mobile`-Feld: der Absatz traegt eine eigene Aussage und darf
      // deshalb auf keiner Breite entfallen (WCAG 1.4.4 - bei 200 % Zoom
      // greift die Mobilfassung).
      desktop:
        'Gemeinsam mit unserem Partner Funk, Deutschlands größtem inhabergeführten Versicherungsmakler und [en]Risk Consultant[/en], können wir weltweit beste Lösungen erarbeiten und anbieten – ganz gleich, ob es sich um Versicherung, Vorsorge oder Risikomanagement handelt.',
    },
  ] satisfies Responsive[],
  /** Entwurfstext - zaehlt die Personen weiter unten in der Sektion. */
  stats: [
    { value: '7', label: 'Gründungsunternehmen' },
    { value: '6', label: 'Beiräte aus der Branche' },
  ],
  board: {
    title: 'Unsere Beiräte',
    text: 'Entscheider aus der Branche begleiten die Arbeit der VZP.', // Entwurfstext
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
  emailHref: string;
  /** Ueberschrift ueber der Werdegangs-Liste, falls vorhanden. */
  vitaListTitle?: string;
  /** Stationen als Liste (Kurzvita Horst Ullrich). */
  vitaList?: string[];
  /** Fliesstext der Kurzvita. */
  vita: string[];
  /** Frage ueber dem Zitat; ist sie gesetzt, wird die Vita zweispaltig. */
  vitaQuestion?: string;
  vitaQuote?: string;
}

export const MANAGEMENT: Manager[] = [
  {
    id: 'horst-ullrich',
    name: 'Horst Ullrich',
    role: 'Geschäftsführer',
    since: 'seit 1. Januar 2015',
    phone: '+49 211 17148439',
    phoneHref: tel('+49 211 17148439'),
    emailHref: 'mailto:h.ullrich@vzp-online.de',
    vitaListTitle: 'Studium und beruflicher Werdegang:',
    vitaList: [
      'Studium Maschinenbau an der FH in Bochum',
      'Leitung Anlagentechnik und Versicherungswesen in einem kommunalen Verkehrsunternehmen',
      'Ausbildung, Prüfung und Bestellung durch die IHK-Nordwestfalen „Öffentlich bestellt und vereidigter Sachverständiger für Maschinen, Anlagen und technische Betriebsausstattung – Bewertung und Schadensfeststellung“',
      'Seit 2001 in der Assekuranz',
      'Seit dem 1. Januar 2015 Geschäftsführer der VZP – zuvor Kundenbetreuer bei Funk',
    ],
    vita: [],
    vitaQuestion: 'Was zeichnet die VZP für Sie besonders aus?',
    vitaQuote:
      'Die Unternehmen, die wir in der VZP betreuen, sind überwiegend auch Gesellschafter ihres eigenen Versicherungsmaklers. Unsere Gesellschafter haben nicht nur Einblick in unsere Arbeitsweise, die Planung und unsere Kennzahlen, sondern bestimmen diese maßgeblich im Rahmen ihrer Gesellschaftertätigkeit mit. Diese partnerschaftliche Zusammenarbeit ist durch maximale Transparenz, zielführenden Dialog, gegenseitige Wertschätzung und großes gegenseitiges Vertrauen geprägt. Das Ergebnis dieser Zusammenarbeit bedeutet für mich persönlich einfach ein „Sehr gutes Gefühl“.',
  },
  {
    id: 'bernhard-schwanke',
    name: 'Bernhard C. Schwanke',
    role: 'Geschäftsführer',
    since: 'seit 2023',
    phone: '+49 40 359140',
    phoneHref: tel('+49 40 359140'),
    emailHref: `mailto:${CONTACT.email}?subject=${encodeURIComponent('Anfrage an Bernhard C. Schwanke')}`,
    vita: [
      'Bernhard C. Schwanke ist geschäftsführender Gesellschafter der Funk Gruppe sowie Geschäftsführer der Funk Versicherungsmakler GmbH, der Funk Hospital-Versicherungsmakler GmbH und der VZP (Versicherungsstelle Zellstoff und Papier). Er ist verantwortlich für die Vertriebssteuerung und -planung des Industriekundengeschäfts, sowohl auf den Niederlassungen als auch in der [en]Key Account Division[/en]. Zudem ist er für das Segment Heilwesen und die Weiterentwicklung des Verbandsgeschäfts zuständig.',
      'Bernhard C. Schwanke, 1977 in Freiburg im Breisgau geboren, ist Volljurist und begann 2005 als Assistent der Geschäftsführung. Bei Funk war er zunächst in unterschiedlichen Fachbereichen und später im Vertrieb sowie in der Kundenbetreuung tätig. Seit 2013 ist der Gesellschafter der 5. Generation Geschäftsführer der Funk Hospital-Versicherungsmakler GmbH, 2016 wurde er in die Geschäftsleitung der Funk Gruppe berufen. 2018 folgte die Ernennung in die Geschäftsführung der Funk Versicherungsmakler GmbH. 2021 wurde er Geschäftsführer der Funk Gruppe, 2023 der VZP.',
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Events & Webinare                                                        */
/* ------------------------------------------------------------------------ */

export const EVENTS = {
  overline: 'Events & Webinare',
  title: 'Wissen aus der Praxis, kompakt vermittelt.', // Entwurfstext
  lead: 'Unsere Experten geben ihr Wissen in kurzen Online-Formaten weiter — konkret, ohne Verkaufsdruck, mit Raum für Ihre Fragen.', // Entwurfstext
  featured: {
    id: 'webinar-tci',
    badge: 'Webinar',
    image: 'webinar-versicherungskosten',
    meta: { desktop: 'Online · 23.09. & 28.09.2026', mobile: '23.09., 28.09.' },
    title: {
      desktop:
        'Versicherungskosten optimieren: Von der Schadentransparenz zur passenden Selbstbeteiligung',
    },
    body: [
      {
        desktop:
          'In diesem Webinar erfahren Sie von unseren Experten, wie Sie maximale Kosteneffizienz und Risikokontrolle in Ihrem Unternehmen erreichen.',
      },
      {
        desktop:
          'Historisch gewachsene Versicherungsstrukturen sind häufig Kostentreiber. [en]Total Cost of Insurance[/en] (TCI) betrachtet Ihre Versicherungskosten ganzheitlich – nicht nur Prämien, sondern alle relevanten Kostenbestandteile rund um Risikotransfer und Eigentragung.',
        mobile:
          'Historisch gewachsene Versicherungsstrukturen sind häufig Kostentreiber. [en]Total Cost of Insurance[/en] (TCI) betrachtet Ihre Versicherungskosten ganzheitlich – nicht nur Prämien, sondern alle relevanten Kostenbestandteile.',
      },
      {
        desktop:
          'Das Ziel der Analyse: Einspar- und Kapazitätspotenziale aufdecken und eine passende Strategie für eine höhere Eigentragung entwickeln.',
      },
      {
        desktop: 'Gemeinsam mit Funk optimieren Sie Ihre Risikokosten über zwei Hebel:',
      },
    ] satisfies Responsive[],
    levers: [
      'Optimierung der Versicherungspolicen (Leistungen, Bedingungen, Struktur, Marktansprache)',
      'Einführung adäquater Selbstbeteiligungen (wirtschaftlich sinnvoll, risikogerecht, finanzierbar)',
    ],
    // Ohne `mobile`: eigenstaendige Aussage, darf auf keiner Breite entfallen.
    closing: {
      desktop:
        'Unsere Experten zeigen, wie sich die Versicherungsgesamtkosten auch in Ihrem Unternehmen spürbar reduzieren lassen bei gleichzeitig besserer Steuerbarkeit der Risiken.',
    } satisfies Responsive,
    benefitsLabel: 'Ihre Mehrwerte',
    benefits: [
      {
        desktop:
          'Deutliche Risikokostenreduzierung und langfristige Optimierung der eigenen Risikoposition',
        mobile: 'Deutliche Risikokostenreduzierung',
      },
      { desktop: 'Transparenz über bestehende Schadenverläufe' },
      { desktop: 'Verbesserung der Verhandlungsposition gegenüber Versicherern' },
      { desktop: 'Identifikation sämtlicher relevanter Risikokostenpositionen' },
      {
        desktop:
          'Objektive betriebswirtschaftliche Analyse unterschiedlicher Selbstbeteiligungsmodelle',
        mobile: 'Objektive Analyse der Selbstbeteiligungsmodelle',
      },
    ] satisfies Responsive[],
    datesLabel: 'Termine & Anmeldung',
    /** Jeder Termin fuehrt auf sein eigenes Microsoft-Teams-Event. */
    dates: [
      {
        date: '23.09.2026',
        iso: '2026-09-23T11:00',
        time: '11:00 Uhr – 12:00 Uhr',
        href: 'https://events.teams.microsoft.com/event/72435fa2-adec-42ac-9461-19c8b7588489@5790628f-15c0-4ec3-b86b-6a836fb961b4',
      },
      {
        date: '28.09.2026',
        iso: '2026-09-28T09:00',
        time: '09:00 Uhr – 10:00 Uhr',
        href: 'https://events.teams.microsoft.com/event/d542bcf3-e4cd-44a6-918a-3d5cfea372ce@5790628f-15c0-4ec3-b86b-6a836fb961b4',
      },
    ],
    registerLabel: 'Anmelden',
  },
  moreLabel: 'Weitere Termine',
  /** Derzeit kuendigt die VZP nur das Webinar oben an. */
  more: [] as { id: string; overline: string; title: string; titleSuffix: string; text: string }[],
};

/* ------------------------------------------------------------------------ */
/* Aktuelles                                                                */
/* ------------------------------------------------------------------------ */

export const NEWS = {
  overline: 'Aktuelles',
  title: 'VZP Forum',
  lead: {
    desktop: 'Interessante Fachthemen und Informationen aus der Versicherungs- und Papierbranche.',
  } satisfies Responsive,
  moreLabel: 'Ältere Ausgaben anzeigen',
  /** Mobil sichtbare Anzahl, der Rest hinter "Aeltere Ausgaben anzeigen". */
  mobileVisible: 2,
  issues: [
    {
      category: 'Markt Spezial',
      title: 'VZP Forum Markt Spezial 2026',
      date: '29.07.2026',
      iso: '2026-07-29',
      text: 'Hier können Sie die aktuelle Ausgabe unseres VZP Forum Markt Spezial lesen:',
      linkLabel: 'Jetzt anfordern',
      href: `mailto:a.wehmeyer@funk-gruppe.de?subject=${encodeURIComponent('VZP Forum Markt Spezial 2026 anfordern')}`,
      external: false,
      image: 'forum-markt-spezial-2026',
    },
    {
      category: 'Ausgabe',
      title: 'VZP Forum Oktober 2026',
      date: '29.10.2026',
      iso: '2026-10-29',
      text: 'Hier können Sie die Ausgabe unseres Magazins VZP Forum von Oktober 2026 lesen:',
      linkLabel: 'Als PDF ansehen',
      href: '/downloads/vzp-forum-oktober-2026.pdf',
      external: true,
      image: 'forum-oktober-2026',
    },
    {
      category: 'Ausgabe',
      title: 'VZP Forum Juli 2026',
      date: '22.07.2026',
      iso: '2026-07-22',
      text: 'Hier können Sie die Ausgabe unseres Magazins VZP Forum von Juli 2026 lesen:',
      linkLabel: 'Als PDF ansehen',
      href: '/downloads/vzp-forum-juli-2026.pdf',
      external: true,
      image: 'forum-juli-2026',
    },
  ] as const,
};

export const NEWSLETTER = {
  id: 'newsletter',
  title: 'Wissen auf einen Klick!',
  text: {
    desktop:
      'Erfahren Sie zuerst von unseren Events, Online-Veranstaltungen und weiteren interessanten News rund um das Risiko- und Versicherungsmanagement.',
    mobile:
      'Erfahren Sie zuerst von unseren Events, Online-Veranstaltungen und News rund um das Risiko- und Versicherungsmanagement.',
  } satisfies Responsive,
  emailLabel: 'E-Mail',
  salutationLabel: 'Anrede',
  salutations: ['Divers', 'Frau', 'Herr'],
  lastNameLabel: 'Nachname',
  firstNameLabel: 'Vorname',
  consent:
    'Ja, ich bin einverstanden, dass mir die VZP GmbH per E-Mail Informationen zu Events, Online-Veranstaltungen, Produkten und Dienstleistungen zusendet. Ich kann diese Einwilligung jederzeit mit einem Klick auf den Link „Abmelden“ widerrufen, den ich in jeder E-Mail finde.',
  note: 'Weitere Informationen befinden sich unter',
  noteLinkLabel: 'Impressum/Datenschutz',
  submit: 'Absenden',
  /** Gilt, solange `action` auf ein mailto: zeigt - siehe TODO unten. */
  interimHint:
    'Hinweis: Das Absenden öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht an die VZP. Alternativ schreiben Sie direkt an welcome@vzp-online.de.',
  /**
   * TODO: Endpunkt des Newsletter-Dienstes (Double-Opt-in) eintragen - die
   * Bestandsseite nutzt dafuer TYPO3 Forms mit Brevo-Anbindung.
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
    desktop: 'Wenn es um die Sicherheit Ihres Unternehmens geht, sind wir gerne für Sie da.',
  } satisfies Responsive,
  emailCta: 'E-Mail-Kontakt',
  person: {
    overline: { desktop: 'Ihr direkter Ansprechpartner', mobile: 'Ihr Ansprechpartner' },
    /** Aus der Kurzvita von Horst Ullrich. */
    text: 'Öffentlich bestellter und vereidigter Sachverständiger für Maschinen, Anlagen und technische Betriebsausstattung — erste Anlaufstelle für Risikofragen im Betrieb.',
  },
};

/* ------------------------------------------------------------------------ */
/* Footer                                                                   */
/* ------------------------------------------------------------------------ */

/** Rechtliche Seiten, die dieser Onepager selbst ausliefert. */
export const LEGAL_PAGES = [
  { slug: 'impressum', label: 'Impressum' },
  { slug: 'datenschutz', label: 'Datenschutz' },
  { slug: 'barrierefreiheit', label: 'Barrierefreiheit' },
] as const;

/** Links der Footer-Spalte "Recht" - inklusive externer Pflichtinformation. */
export const LEGAL_LINKS = [
  ...LEGAL_PAGES.map((page) => ({ label: page.label, href: `/${page.slug}`, external: false })),
  {
    label: 'Pflichtinformation',
    href: 'https://www.funk-gruppe.de/de/pflichtinformationen/vzp-gmbh',
    external: true,
  },
] satisfies { label: string; href: string; external: boolean }[];

export const FOOTER = {
  copyright: {
    desktop: `© ${new Date().getFullYear()} ${CONTACT.name} · Ein Unternehmen der Papierwirtschaft, gemeinsam mit Funk.`,
    mobile: `© ${new Date().getFullYear()} ${CONTACT.name}`,
  } satisfies Responsive,
};
