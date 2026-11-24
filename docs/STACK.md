# EU-datenschutzkonformer Stack

Empfehlung für Betrieb und Pflege des VZP-Onepagers – ausgehend vom heutigen
Stand.

**Leitlinie:** Anbieter mit Sitz in der EU, Daten möglichst in Deutschland,
so wenig Fremddienste wie nötig. Die Seite ist statisch gebaut und lädt keine
externen Skripte, Schriften oder Einbettungen – das ist die beste
Ausgangslage.

> Stand: November 2026. Empfehlung, keine Rechtsberatung – vor der Umsetzung
> mit dem Datenschutzbeauftragten abstimmen.

## Ist-Stand und Empfehlung

| Baustein       | Heute                                                                                                                                | Empfehlung                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**   | Astro, statisch; Inhalte in `src/data/content.ts`                                                                                    | So lassen. Kein Server-Code, keine Cookies, keine Drittanbieter-Requests                                                                           |
| **Hosting**    | Bestehendes Webhosting, Upload von `dist/` per SFTP (README, „Deployment (SFTP)“); `public/.htaccess` ist für Apache vorbereitet      | Beibehalten, sofern Hoster und Rechenzentrum in der EU/DE liegen und ein AVV besteht. Sonst Wechsel zu einem deutschen Hoster (z. B. Hetzner, IONOS) |
| **Inhalte**    | Pflege im Code (`content.ts`, `legal.ts`)                                                                                            | Für wenige Änderungen im Jahr ausreichend. Erst bei häufiger Redaktion ein selbst gehostetes CMS (siehe Alternativen)                                |
| **Newsletter** | Formular öffnet vorerst eine E-Mail (`NEWSLETTER.action` ist ein `mailto:`); die Bestandsseite nutzt TYPO3 Forms mit Brevo            | Brevo (Paris) weiter nutzen – EU-Anbieter mit AVV und Double-Opt-in – und dessen Formular-Endpunkt in `NEWSLETTER.action` eintragen                  |
| **Webinare**   | Microsoft Teams Events, ein Link pro Termin (`EVENTS.featured.dates[].href`)                                                         | Teams ist US-Anbieter (CLOUD Act). Tragbar, wenn Funk Microsoft 365 ohnehin mit AVV/EU-Datengrenze einsetzt; sonst edudip oder alfaview (beide DE)   |
| **Statistik**  | Die Datenschutzerklärung beschreibt Matomo on-premise mit Cookies und Einwilligung; auf dem Onepager ist noch kein Tracking eingebaut | Matomo auf der eigenen Instanz **ohne Cookies** konfigurieren – dann in der Regel ohne Banner. Datenschutzerklärung entsprechend anpassen           |
| **Schriften**  | Selbst gehostet (`src/styles/fonts.css`)                                                                                             | Erledigt. Keine Anfragen an Google Fonts                                                                                                           |
| **Code**       | GitHub                                                                                                                               | Nur Quellcode, keine personenbezogenen Daten – unkritisch. Wer es ganz vermeiden will: GitLab-Instanz von Funk oder selbst gehostetes Forgejo       |

Ein CDN ist für eine deutschsprachige Seite dieser Größe nicht nötig. Falls
doch gewünscht: **Bunny.net** (Slowenien) statt Cloudflare.

## Worauf es rechtlich ankommt

- **EU-Töchter von US-Konzernen** (AWS Frankfurt, Azure, Vercel mit
  EU-Region, Microsoft Teams) bleiben dem US CLOUD Act unterworfen. Einsatz
  ist über das EU-US Data Privacy Framework möglich, sollte aber bewusst
  entschieden und dokumentiert werden.
- **Mit jedem Dienstleister einen AVV nach Art. 28 DSGVO abschließen:**
  Hoster, Brevo, Webinar-Anbieter.
- **Cookie-Banner:** Der Onepager setzt derzeit keine Cookies. Bleibt Matomo
  cookielos, braucht es voraussichtlich kein Banner (§ 25 TDDDG). Das sollte
  der Datenschutzbeauftragte bei Funk kurz bestätigen.
- **Datenschutzerklärung (`src/data/legal.ts`):** Sie muss genau die
  eingesetzten Dienste nennen. Aktuell beschreibt sie Matomo mit Cookies –
  bei cookieloser Konfiguration anpassen, und Brevo/Teams ergänzen, falls
  noch nicht enthalten.

## Alternativen

- **Redaktion ohne Entwickler gewünscht:** Strapi (Open Source) oder Kirby
  (Bremen, Lizenz mit Support), selbst gehostet auf einem deutschen Server.
  Beim Veröffentlichen löst ein Webhook den Neubau der statischen Seite aus.
- **Funk betreibt eigene Hosting-Infrastruktur:** Dann ist die vermutlich die
  erste Wahl, weil AVV und IT-Freigabe schon geregelt sind.

## Nächste Schritte

- [ ] Hoster und Rechenzentrumsstandort klären, AVV prüfen
- [ ] Newsletter: Brevo-Endpunkt in `NEWSLETTER.action` eintragen, `interimHint` entfernen
- [ ] Entscheidung Teams vs. deutscher Webinar-Anbieter mit Datenschutz abstimmen
- [ ] Matomo cookielos einbinden (Slot im `<head>` von `src/layouts/Layout.astro`) und Datenschutzerklärung anpassen
