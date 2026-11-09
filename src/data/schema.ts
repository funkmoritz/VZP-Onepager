/**
 * Strukturierte Daten (JSON-LD, schema.org).
 *
 * Alles landet in EINEM `@graph` pro Seite - mehrere konkurrierende
 * `<script type="application/ld+json">` sind zwar erlaubt, aber Suchmaschinen
 * und Antwortmaschinen verknuepfen Knoten zuverlaessiger, wenn sie ueber
 * `@id` im selben Graphen aufeinander zeigen.
 *
 * Quelle aller Angaben ist `content.ts` bzw. `legal.ts` - hier steht kein
 * Fakt, der nicht auch auf der Seite sichtbar ist. Das ist keine Formalie:
 * Angaben in strukturierten Daten, die im Sichtbaren fehlen, wertet Google als
 * Verstoss gegen die Richtlinien fuer strukturierte Daten.
 */
import { CONTENT_UPDATED, SITE_LEGAL_NAME, SITE_NAME } from '../consts';
import { ABOUT, CONTACT, EVENTS, MANAGEMENT, NEWS, SERVICES } from './content';

/** Stabile Knoten-IDs, damit Knoten aufeinander verweisen koennen. */
export const ids = {
  org: (base: URL) => new URL('/#organisation', base).href,
  site: (base: URL) => new URL('/#website', base).href,
  page: (url: URL) => `${url.href}#seite`,
  person: (base: URL, slug: string) => new URL(`/#person-${slug}`, base).href,
  event: (base: URL, iso: string) => new URL(`/#webinar-${iso.slice(0, 10)}`, base).href,
};

const abs = (base: URL, path: string) => new URL(path, base).href;

/* ------------------------------------------------------------------------ */
/* Unternehmen                                                              */
/* ------------------------------------------------------------------------ */

export const organization = (base: URL) => ({
  '@type': ['InsuranceAgency', 'Organization'],
  '@id': ids.org(base),
  name: CONTACT.name,
  legalName: SITE_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: abs(base, '/'),
  logo: {
    '@type': 'ImageObject',
    url: abs(base, '/logo.svg'),
    caption: `Wortmarke ${SITE_NAME}`,
  },
  image: abs(base, '/og-image.png'),
  email: CONTACT.email,
  telephone: CONTACT.phone,
  // Aus dem Impressum - dort auch sichtbar.
  vatID: 'DE406877272',
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.street,
    postalCode: CONTACT.zip,
    addressLocality: CONTACT.city,
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'Country', name: 'Deutschland' },
  /** Kooperationspartner laut Footer und "Ueber uns". */
  sameAs: [CONTACT.partner.href],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Funk Gruppe GmbH',
    url: CONTACT.partner.href,
  },
  /**
   * Die Gesellschafter-Konstellation ist das Alleinstellungsmerkmal der VZP -
   * `description` fasst sie in einem zitierfaehigen Satz zusammen.
   */
  description:
    'Die VZP ist ein auf die Papierwirtschaft spezialisierter Versicherungsmakler. Sie wurde von sieben Unternehmen der Papierwirtschaft gegründet; viele ihrer Kunden sind zugleich Gesellschafter. Gemeinsam mit der Funk Gruppe bietet sie Versicherung, Vorsorge und Risikomanagement.',
  knowsAbout: [
    'Versicherung der Papierwirtschaft',
    'Risikomanagement',
    'Brandschutz',
    'Maschinen- und Anlagenschutz',
    'Betriebsunterbrechungsversicherung',
    'Betriebliche Altersversorgung',
    'Delkredererisiken',
    'Umweltschutz',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: CONTACT.email,
      telephone: CONTACT.phone,
      areaServed: 'DE',
      availableLanguage: ['de'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'complaints',
      email: 'beschwerde@vzp-online.de',
      telephone: '+49 40 35914-200',
      areaServed: 'DE',
      availableLanguage: ['de'],
    },
  ],
  /**
   * Bewusst kein `employee` hier: die Geschaeftsfuehrung steht auf der
   * Startseite als eigener Person-Knoten mit `worksFor` auf diese
   * Organisation. Beide Richtungen zu pflegen, erzeugte denselben Menschen
   * zweimal im Graphen.
   */
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: SERVICES.portfolioTitle,
    itemListElement: SERVICES.groups.map((group) => ({
      '@type': 'OfferCatalog',
      name: group.title,
      itemListElement: group.items.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    })),
  },
});

/* ------------------------------------------------------------------------ */
/* Website und Seite                                                        */
/* ------------------------------------------------------------------------ */

export const webSite = (base: URL) => ({
  '@type': 'WebSite',
  '@id': ids.site(base),
  url: abs(base, '/'),
  name: `${SITE_NAME} – ${CONTACT.name}`,
  inLanguage: 'de-DE',
  publisher: { '@id': ids.org(base) },
});

export const webPage = (base: URL, url: URL, title: string, description: string) => ({
  '@type': 'WebPage',
  '@id': ids.page(url),
  url: url.href,
  name: title,
  description,
  inLanguage: 'de-DE',
  isPartOf: { '@id': ids.site(base) },
  about: { '@id': ids.org(base) },
  // Aktualitaet ist fuer Antwortmaschinen ein Auswahlkriterium.
  dateModified: CONTENT_UPDATED,
  publisher: { '@id': ids.org(base) },
});

/* ------------------------------------------------------------------------ */
/* Startseite: Webinartermine, Personen, Fragen, Magazin                     */
/* ------------------------------------------------------------------------ */

/** Ein Event je Termin - beide fuehren auf eine eigene Anmeldeseite. */
export const events = (base: URL) =>
  EVENTS.featured.dates.map((slot) => ({
    '@type': 'Event',
    '@id': ids.event(base, slot.iso),
    name: EVENTS.featured.title.desktop,
    description: EVENTS.featured.body
      .map((paragraph) => paragraph.desktop.replace(/\[\/?en\]/g, ''))
      .join(' '),
    startDate: slot.iso,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    inLanguage: 'de-DE',
    location: { '@type': 'VirtualLocation', url: slot.href },
    organizer: { '@id': ids.org(base) },
    performer: { '@id': ids.org(base) },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: slot.href,
    },
  }));

export const persons = (base: URL) =>
  MANAGEMENT.map((manager) => ({
    '@type': 'Person',
    '@id': ids.person(base, manager.id),
    name: manager.name,
    jobTitle: manager.role,
    telephone: manager.phone,
    email: manager.emailHref.replace(/^mailto:/, '').replace(/\?.*$/, ''),
    worksFor: { '@id': ids.org(base) },
    description: [...(manager.vitaList ?? []), ...manager.vita]
      .join(' ')
      .replace(/\[\/?en\]/g, '')
      .slice(0, 600),
  }));

/**
 * Die Kurzvita von Horst Ullrich enthaelt eine echte Frage mit Antwort -
 * nur deshalb gibt es hier ueberhaupt eine FAQPage. Erfundene Fragen waeren
 * sowohl richtlinienwidrig als auch wertlos.
 */
export const faq = () => {
  const ullrich = MANAGEMENT.find((manager) => manager.vitaQuestion && manager.vitaQuote);
  if (!ullrich) return null;
  return {
    '@type': 'FAQPage',
    name: 'Häufige Fragen zur VZP',
    mainEntity: [
      {
        '@type': 'Question',
        name: ullrich.vitaQuestion,
        acceptedAnswer: { '@type': 'Answer', text: ullrich.vitaQuote },
      },
    ],
  };
};

/** Die Forum-Ausgaben als herunterladbare Publikationen. */
export const publications = (base: URL) =>
  NEWS.issues.map((issue) => ({
    '@type': 'PublicationIssue',
    name: issue.title,
    datePublished: issue.iso,
    inLanguage: 'de-DE',
    publisher: { '@id': ids.org(base) },
    url: issue.external ? abs(base, issue.href) : abs(base, '/#aktuelles'),
    isPartOf: { '@type': 'Periodical', name: NEWS.title, publisher: { '@id': ids.org(base) } },
  }));

/** Die Beiraete als benannte Mitglieder - belegt die Branchenverankerung. */
export const board = () =>
  ABOUT.board.members.map((member) => ({
    '@type': 'Person',
    name: member.name,
    affiliation: { '@type': 'Organization', name: member.company.replace(/, Vorsitzender$/, '') },
  }));
