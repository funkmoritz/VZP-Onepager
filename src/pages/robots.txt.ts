import type { APIRoute } from 'astro';

/**
 * robots.txt wird zur Build-Zeit erzeugt, damit die Sitemap-URL automatisch
 * zur `site` aus astro.config.mjs passt.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapURL.href}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
