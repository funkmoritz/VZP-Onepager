import type { APIRoute } from 'astro';
import { SITE_LEGAL_NAME } from '../consts';
import {
  ABOUT,
  CONTACT,
  EVENTS,
  HERO,
  MANAGEMENT,
  NEWS,
  REFERENCES,
  SERVICES,
} from '../data/content';

/**
 * /llms.txt nach der Konvention von llmstxt.org: eine kompakte, verlaessliche
 * Kurzfassung der Seite in Markdown, damit Sprachmodelle die Fakten nicht aus
 * dem gerenderten Layout rekonstruieren muessen.
 *
 * Erzeugt aus denselben Daten wie die Seite (content.ts) - damit kann die Datei
 * nicht veralten, solange die Inhalte gepflegt werden. Sie enthaelt bewusst
 * keine Aussage, die auf der Seite nicht ebenfalls steht.
 */

/** Entfernt die Inline-Auszeichnung aus RichText (`[en]...[/en]`). */
const plain = (text: string) => text.replace(/\[\/?en\]/g, '');

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;

  const lines: string[] = [
    `# ${CONTACT.name} (VZP)`,
    '',
    `> ${plain(HERO.lead.desktop)}`,
    '',
    '## Auf einen Blick',
    '',
    `- Firmierung: ${SITE_LEGAL_NAME}`,
    `- Sitz: ${CONTACT.street}, ${CONTACT.zip} ${CONTACT.city}, Deutschland`,
    `- Kontakt: ${CONTACT.email}, Telefon ${CONTACT.phone}`,
    '- Taetigkeit: Versicherungsmakler (§ 34d Abs. 1 GewO), Registrierungs-Nr. D-NHOA-HEBAG-21',
    '- Branchenschwerpunkt: Papierwirtschaft (Herstellung, Verarbeitung, Handel, Druck, Recycling, Energie)',
    `- Gegruendet von sieben Unternehmen der Papierwirtschaft; viele Kunden sind zugleich Gesellschafter der VZP`,
    `- Kooperationspartner: Funk Gruppe (${CONTACT.partner.href})`,
    `- Geschaeftsfuehrung: ${MANAGEMENT.map((m) => `${m.name} (${m.since})`).join(', ')}`,
    `- Beiraete: ${ABOUT.board.members.length} Entscheider aus der Branche`,
    '- Umsatzsteuer-Identifikationsnummer: DE406877272',
    '- Aufsicht: Industrie- und Handelskammer zu Koeln',
    '',
    '## Selbstbeschreibung',
    '',
    plain(ABOUT.philosophy.desktop),
    '',
    ...ABOUT.body.map((paragraph) => plain(paragraph.desktop) + '\n'),
    '## Leistungen',
    '',
    ...SERVICES.intro.map((paragraph) => plain(paragraph.desktop) + '\n'),
    ...SERVICES.groups.flatMap((group) => [
      `### ${group.title}`,
      '',
      ...group.items.map((item) => `- ${item}`),
      '',
    ]),
    '## Aktuelle Veranstaltungen',
    '',
    `### ${EVENTS.featured.title.desktop}`,
    '',
    ...EVENTS.featured.body.map((paragraph) => plain(paragraph.desktop) + '\n'),
    ...EVENTS.featured.levers.map((lever) => `- ${lever}`),
    '',
    plain(EVENTS.featured.closing.desktop),
    '',
    `${EVENTS.featured.benefitsLabel}:`,
    '',
    ...EVENTS.featured.benefits.map((benefit) => `- ${plain(benefit.desktop)}`),
    '',
    'Termine (kostenfrei, online):',
    '',
    ...EVENTS.featured.dates.map(
      (slot) => `- ${slot.date}, ${slot.time} – Anmeldung: ${slot.href}`,
    ),
    '',
    '## Publikation: VZP Forum',
    '',
    `${plain(NEWS.lead.desktop)}`,
    '',
    ...NEWS.issues.map(
      (issue) =>
        `- [${issue.title}](${issue.external ? url(issue.href) : url('/#aktuelles')}) – ${issue.date}`,
    ),
    '',
    '## Kundenstimmen',
    '',
    ...REFERENCES.items.flatMap((item) => [`### ${item.company}`, '', `"${item.quote}"`, '']),
    '## Seiten',
    '',
    `- [Startseite](${url('/')}) – Leistungen, Referenzen, Ueber uns, Events, Aktuelles, Kontakt`,
    `- [Impressum](${url('/impressum/')}) – Anbieterkennzeichnung und Pflichtinformationen`,
    `- [Datenschutz](${url('/datenschutz/')}) – Datenschutzerklaerung und Beschwerdestelle`,
    '',
    '## Hinweise zur Verwendung',
    '',
    'Diese Datei fasst den Inhalt von vzp-online.de zusammen. Bei Zitaten bitte',
    `die Quelle angeben: ${CONTACT.name}, ${url('/')}.`,
    'Angaben zu Terminen und Ausgaben koennen sich aendern - massgeblich ist die Website.',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
