# EU-datenschutzkonformer Stack

Empfehlung für Betrieb und Pflege des VZP-Onepagers.

**Leitlinie:** nur Anbieter mit Sitz in der EU, Daten in Deutschland, möglichst
wenig Fremddienste. Die Seite ist bereits statisch gebaut und lädt keine
externen Skripte, Schriften oder Einbettungen – das ist die beste
Ausgangslage.

> Stand: November 2026. Empfehlung, keine Rechtsberatung – vor der Umsetzung
> mit dem Datenschutzbeauftragten abstimmen.

## Empfohlener Stack

| Baustein              | Empfehlung                                                                                                   | Sitz / Daten                                            | Warum                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**          | Astro, statisch (wie jetzt)                                                                                  | –                                                       | Kein Server-Code, keine Cookies, keine Drittanbieter-Requests                                                                             |
| **Hosting**           | **Hetzner Cloud** (kleiner Server, Standort Nürnberg/Falkenstein) mit Caddy als Webserver                    | DE / DE                                                 | Deutscher Anbieter, Auftragsverarbeitungsvertrag (AVV) per Klick, sehr günstig. Caddy holt die TLS-Zertifikate automatisch                |
| **CMS**               | **Strapi Community Edition**, selbst gehostet auf demselben Server, mit PostgreSQL                           | Software aus FR (Open Source), Daten auf eigenem Server | Keine SaaS-Abhängigkeit. Redakteure pflegen Texte, Termine und Forum-PDFs. Beim Veröffentlichen löst ein Webhook den Neubau der Seite aus |
| **Code & Deployment** | **Forgejo** (selbst gehostet) oder die GitLab-Instanz von Funk, falls vorhanden. Build direkt auf dem Server | DE                                                      | Ersetzt GitHub als US-Anbieter                                                                                                            |
| **Newsletter**        | **CleverReach** (Rastede), Alternative rapidmail (Freiburg)                                                  | DE / DE                                                 | Double-Opt-in, Abmeldelink und Einwilligungsprotokoll fertig eingebaut, AVV vorhanden. Ersetzt den `mailto`-Platzhalter im Formular       |
| **Webinare**          | **edudip** (Aachen), Alternative alfaview (Karlsruhe)                                                        | DE / DE                                                 | Statt Zoom oder GoTo. Liefert auch die Anmeldeseite für „Zum Webinar anmelden“                                                            |
| **Statistik**         | **Matomo**, selbst gehostet und ohne Cookies konfiguriert                                                    | eigener Server                                          | Kein Google Analytics, und in dieser Konfiguration in der Regel ohne Cookie-Banner                                                        |
| **Backups**           | Hetzner Storage Box                                                                                          | DE                                                      | Datenbank und Uploads des CMS täglich sichern                                                                                             |
| **Schriften**         | selbst gehostet (bereits umgesetzt, `src/styles/fonts.css`)                                                  | –                                                       | Keine Anfragen an Google Fonts                                                                                                            |

Ein CDN ist für eine deutschsprachige Seite dieser Größe nicht nötig. Falls
doch gewünscht: **Bunny.net** (Slowenien) statt Cloudflare.

## Worauf es rechtlich ankommt

- **Keine EU-Töchter von US-Konzernen.** AWS Frankfurt, Azure Deutschland
  oder Vercel mit EU-Region bleiben dem US CLOUD Act unterworfen. Deshalb
  Hetzner statt „AWS in Frankfurt“.
- **Mit jedem Dienstleister einen AVV nach Art. 28 DSGVO abschließen:**
  Hetzner, CleverReach, edudip. Alle bieten das standardmäßig an.
- **Cookie-Banner:** Mit diesem Stack setzt die Seite keine Cookies, die eine
  Einwilligung brauchen (§ 25 TDDDG). Ein Banner entfällt dann voraussichtlich.
  Das sollte trotzdem der Datenschutzbeauftragte (bei Funk) kurz bestätigen,
  vor allem die Matomo-Konfiguration.
- **Datenschutzerklärung:** Sie muss genau diese Dienste nennen. Durch die
  schlanke Liste wird sie kurz.

## Alternativen, falls die Rahmenbedingungen anders sind

- **Kein eigener Server gewünscht:** Webhosting bei IONOS oder Hetzner nur für
  die statischen Dateien. Inhalte pflegt dann ein Entwickler im Code
  (`src/data/content.ts`) statt in einem CMS. Für eine Seite, die vielleicht
  viermal im Jahr geändert wird, ist das durchaus vertretbar.
- **Lieber ein deutsches CMS mit Lizenz und Support statt Open Source:**
  **Kirby** (Bremen), ebenfalls selbst gehostet.
- **Funk betreibt eigene Hosting-Infrastruktur:** Dann ist die vermutlich die
  erste Wahl, weil AVV und IT-Freigabe schon geregelt sind.

## Nächste Schritte

- [ ] Richtung mit VZP/Funk-IT und Datenschutzbeauftragtem abstimmen
- [ ] Hosting-Entscheidung treffen (Hetzner, IONOS oder Funk-intern), AVV abschließen
- [ ] CMS-Datenmodell passend zu `src/data/content.ts` anlegen
- [ ] Server-Konfiguration (Caddy) und Deploy-Skript ins Repo aufnehmen
- [ ] Newsletter-Anbieter anbinden (`NEWSLETTER.action` in `src/data/content.ts`)
- [ ] Webinar-Anmeldung verlinken (`EVENTS.featured.cta.href`)
