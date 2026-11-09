import type { APIRoute } from 'astro';

/**
 * robots.txt wird zur Build-Zeit erzeugt, damit die Sitemap-URL automatisch
 * zur `site` aus astro.config.mjs passt.
 *
 * Neben den klassischen Suchmaschinen stehen hier die Crawler der
 * Antwortmaschinen (GEO). Sie sind bewusst ausdruecklich erlaubt: Die VZP will
 * in KI-Antworten zu Versicherungsfragen der Papierwirtschaft als Quelle
 * auftauchen. `User-agent: *` wuerde dafuer zwar genuegen, einige Betreiber
 * werten aber nur namentliche Eintraege aus.
 *
 * ACHTUNG, geschaeftliche Entscheidung: `Google-Extended` und
 * `Applebot-Extended` steuern nicht das Crawling, sondern die Nutzung der
 * Inhalte fuer KI-Training und -Grounding. Wer das nicht moechte, setzt den
 * jeweiligen Eintrag auf `Disallow: /` - die Seite bleibt dann in der normalen
 * Suche trotzdem vollstaendig auffindbar.
 */

/** Crawler von Antwortmaschinen, Suche und Training. */
const AI_AGENTS = [
  // OpenAI: Training / Suche / Abruf auf Nutzerwunsch
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google und Apple: nur KI-Nutzung, nicht das Crawling
  'Google-Extended',
  'Applebot-Extended',
  // Weitere
  'Amazonbot',
  'meta-externalagent',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
  'YouBot',
  'CCBot',
];

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  const llmsURL = new URL('llms.txt', site);

  const body = [
    '# Alle Inhalte dieser Seite duerfen gelesen werden.',
    'User-agent: *',
    'Allow: /',
    '',
    '# Crawler von Antwortmaschinen (siehe Kommentar in src/pages/robots.txt.ts)',
    ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `# Kurzfassung fuer Sprachmodelle: ${llmsURL.href}`,
    `Sitemap: ${sitemapURL.href}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
