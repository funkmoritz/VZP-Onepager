/**
 * Rechtstexte, woertlich von vzp-online.de uebernommen (Stand: 09.11.2026).
 * Auf der Bestandsseite stehen Impressum und Datenschutzerklaerung gemeinsam
 * in einem Overlay; hier sind sie auf zwei Seiten aufgeteilt.
 *
 * Korrekturen gegenueber dem Bestand (fachlich zu bestaetigen):
 *  - "§ 5 Telemediengesetz (TGM)" -> "(TMG)"
 *  - Datenschutzerklaerung traegt den Stand "Mai 2018", nennt aber bereits
 *    das TDDDG (2024) -> Stand pruefen und aktualisieren.
 *
 * Inline-Links im Text: [Beschriftung](ziel) - siehe LegalText.astro.
 */

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'address'; lines: string[] }
  | { type: 'h3'; text: string };

export interface LegalSection {
  title?: string;
  blocks: LegalBlock[];
}

export interface LegalPageContent {
  label: string;
  /** Untertitel unter der H1. */
  lead?: string;
  /** Stand-Angabe, z. B. "Stand: Mai 2018". */
  updated?: string;
  /** <title> der Seite. Traegt den Markennamen, nicht nur "Impressum". */
  title: string;
  /** Meta-Description, 70-160 Zeichen. */
  description: string;
  sections: LegalSection[];
}

/* ------------------------------------------------------------------------ */

const IMPRESSUM: LegalPageContent = {
  label: 'Impressum',
  title: 'Impressum – VZP Versicherungsstelle Zellstoff und Papier',
  description:
    'Anbieterkennzeichnung der Versicherungsstelle Zellstoff und Papier GmbH, Köln: Geschäftsführung, Handelsregister, Aufsicht und Pflichtinformationen.',
  lead: 'Impressum/Anbieterkennzeichnung gemäß § 5 Telemediengesetz (TMG), § 18 Medienstaatsvertrag (MStV)',
  sections: [
    {
      blocks: [
        {
          type: 'address',
          lines: [
            'Versicherungsstelle Zellstoff und Papier Gesellschaft mit beschränkter Haftung',
            'Amsterdamer Straße 192',
            '50735 Köln',
          ],
        },
        { type: 'p', text: 'Telefon [+49 221 9347210](tel:+492219347210)' },
        { type: 'p', text: 'Telefax +49 221 9347216' },
        {
          type: 'p',
          text: 'E-Mail-Adresse: [h.ullrich@vzp-online.de](mailto:h.ullrich@vzp-online.de)',
        },
      ],
    },
    {
      title: 'Geschäftsführer (Anschrift jeweils wie vorstehend)',
      blocks: [{ type: 'ul', items: ['Horst Ullrich', 'Bernhard C. Schwanke'] }],
    },
    {
      title: 'Register und Steuern',
      blocks: [
        { type: 'p', text: 'Eingetragen beim Amtsgericht Köln (Register-Nr. HR B 25138)' },
        { type: 'p', text: 'Umsatzsteuer-Identifikationsnummer: DE406877272' },
        {
          type: 'p',
          text: 'Versicherungsstelle Zellstoff und Papier Gesellschaft mit beschränkter Haftung ist Mitglied der Industrie- und Handelskammer zu Köln, Unter Sachsenhausen 10 - 26, 50667 Köln, Telefon +49 221 1640-0, Telefax: +49 221 1640-129, Internet: [www.ihk-koeln.de](https://www.ihk-koeln.de), die auch Aufsichtsbehörde ist.',
        },
      ],
    },
    {
      title:
        'Verantwortlich für die journalistisch-redaktionell gestalteten Angebote i. S. d. § 18 Medienstaatsvertrag (MStV)',
      blocks: [
        {
          type: 'address',
          lines: ['VZP', 'Dr. Anja Funk', 'Amsterdamer Straße 192', '50735 Köln'],
        },
      ],
    },
    {
      title: 'Zusätzliche Pflichtinformationen nach § 11 Versicherungsvermittlerverordnung',
      blocks: [
        { type: 'h3', text: 'Statusinformationen und gemeinsame Stelle' },
        {
          type: 'p',
          text: 'Versicherungsstelle Zellstoff und Papier Gesellschaft mit beschränkter Haftung ist als zugelassener Versicherungsmakler gemäß § 34d Absatz 1 der Gewerbeordnung unter der Registrierungs-Nr. D-NHOA-HEBAG-21 im Vermittlerregister eingetragen. Dies ist überprüfbar beim Deutschen Industrie- und Handelskammertag (DIHK) e. V., Breite Straße 29, 10178 Berlin, Telefon: 0180 600585-0 (Festnetzpreis 0,20/Anruf; Mobilfunkpreise maximal 0,60/Anruf), [www.vermittlerregister.info](https://www.vermittlerregister.info). Die Berufsbezeichnung wurde verliehen durch die Bundesrepublik Deutschland.',
        },
        { type: 'h3', text: 'Berufsrechtliche Regelungen' },
        {
          type: 'ul',
          items: [
            '§ 34 d Gewerbeordnung (GewO)',
            '§§ 59 ff. Versicherungsvertragsgesetz (VVG)',
            'Versicherungsvermittlerverordnung (VersVermV)',
          ],
        },
        {
          type: 'p',
          text: 'Die berufsrechtlichen Regelungen können über die vom Bundesminister der Justiz und von der juris GmbH betriebenen Homepage [www.gesetze-im-internet.de](https://www.gesetze-im-internet.de) eingesehen und abgerufen werden.',
        },
        { type: 'h3', text: 'Unabhängigkeit' },
        {
          type: 'p',
          text: 'Unser Unternehmen hält keine direkte oder indirekte Beteiligung an den Stimmrechten oder am Kapital eines Versicherungsunternehmens.',
        },
        {
          type: 'p',
          text: 'Ein Versicherungsunternehmen oder Mutterunternehmen eines Versicherungsunternehmens hält keine direkte oder indirekte Beteiligung an den Stimmrechten oder am Kapital unseres Unternehmens.',
        },
        { type: 'h3', text: 'Schlichtungsstellen' },
        {
          type: 'p',
          text: 'Versicherungsombudsmann e. V., Postfach 08 06 32, 10006 Berlin, [www.versicherungsombudsmann.de](https://www.versicherungsombudsmann.de)',
        },
        {
          type: 'p',
          text: 'Ombudsmann Private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin, [www.pkv-ombudsmann.de](https://www.pkv-ombudsmann.de)',
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------------ */

const DATENSCHUTZ: LegalPageContent = {
  label: 'Datenschutz',
  title: 'Datenschutz – VZP Versicherungsstelle Zellstoff und Papier',
  description:
    'Wie die VZP Daten dieser Website verarbeitet: Verantwortlicher, Ihre Rechte nach DSGVO, Cookies, Matomo-Webanalyse und Beschwerdestelle.',
  updated: 'Stand: Mai 2018',
  sections: [
    {
      blocks: [
        {
          type: 'p',
          text: 'Im Folgenden informieren wir über die Erhebung personenbezogener Daten bei Nutzung unserer Website. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, z. B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten. Wir haben umfangreiche technische und betriebliche Schutzvorkehrungen getroffen, um Ihre Daten vor zufälligen oder vorsätzlichen Manipulationen, Verlust, Zerstörung oder dem Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsverfahren werden regelmäßig überprüft und dem technologischen Fortschritt angepasst.',
        },
      ],
    },
    {
      title: '1 Verantwortlicher für die Datenverarbeitung',
      blocks: [
        {
          type: 'p',
          text: 'Verantwortlicher gem. Art. 4 Abs. 7 EU-Datenschutz-Grundverordnung (DSGVO) ist',
        },
        {
          type: 'address',
          lines: [
            'Funk Gruppe GmbH',
            'Internationaler Versicherungsmakler und Risk Consultants',
            'Valentinskamp 20',
            '20354 Hamburg',
          ],
        },
        { type: 'p', text: 'Telefon [+49 40 35914-0](tel:+4940359140)' },
        { type: 'p', text: 'Telefax +49 40 35914-407' },
        {
          type: 'p',
          text: 'E-Mail-Kontakt: [welcome@funk-gruppe.de](mailto:welcome@funk-gruppe.de)',
        },
      ],
    },
    {
      title: '2 Kontaktmöglichkeit des Datenschutzbeauftragten',
      blocks: [
        {
          type: 'p',
          text: 'Unseren Datenschutzbeauftragten erreichen Sie unter [datenschutz@funk-gruppe.de](mailto:datenschutz@funk-gruppe.de) oder unserer Postadresse mit dem Zusatz „der Datenschutzbeauftragte“.',
        },
      ],
    },
    {
      title: '3 Gegenstand des Datenschutzes',
      blocks: [
        {
          type: 'p',
          text: 'Gegenstand des Datenschutzes sind personenbezogene Daten im Sinne des Art. 4 Nr. 1 DSGVO. Dies sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Darunter fallen in der Regel alle die Angaben, welche die Identifikation einer natürlichen Person (zumindest mittelbar) zulassen. Dies können beispielsweise der Name oder Kontaktdaten (z. B. Telefonnummer, Post- und E-Mail-Adresse) sein. Auch die IP-Adresse kann ein personenbezogenes Datum in diesem Sinne darstellen.',
        },
      ],
    },
    {
      title: '4 Erhebung, Verarbeitung und Nutzung personenbezogener Daten',
      blocks: [
        {
          type: 'p',
          text: 'Funk erhebt, verarbeitet und nutzt Ihre personenbezogenen Daten nur, soweit die DSGVO, das BDSG oder eine andere Rechtsvorschrift dies erlaubt oder anordnet oder Sie als Nutzer unserer Webseiten in die Erhebung, Verarbeitung und Nutzung eingewilligt haben.',
        },
      ],
    },
    {
      title: '5 Ihre Rechte',
      blocks: [
        {
          type: 'p',
          text: 'Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:',
        },
        { type: 'h3', text: '5.1 Allgemeine Rechte' },
        {
          type: 'p',
          text: 'Sie haben ein Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch gegen die Verarbeitung und auf Datenübertragbarkeit. Soweit eine Verarbeitung auf Ihrer Einwilligung beruht, haben Sie das Recht, diese uns gegenüber mit Wirkung für die Zukunft zu widerrufen.',
        },
        {
          type: 'h3',
          text: '5.2 Rechte bei der Datenverarbeitung nach dem berechtigten Interesse',
        },
        {
          type: 'p',
          text: 'Sie haben gem. Art. 21 Abs.1 DSGVO das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs.1 e DSGVO (Datenverarbeitung im öffentlichen Interesse) oder aufgrund Artikel 6 Abs.1 f DSGVO (Datenverarbeitung zur Wahrung eines berechtigten Interesses) erfolgt, Widerspruch einzulegen, dies gilt auch für ein auf diese Vorschrift gestütztes Profiling. Im Falle Ihres Widerspruchs verarbeiten wir Ihre personenbezogenen Daten nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
        },
        { type: 'h3', text: '5.3 Rechte bei Direktwerbung' },
        {
          type: 'p',
          text: 'Sofern wir Ihre personenbezogenen Daten verarbeiten, um Direktwerbung zu betreiben, so haben Sie gem. Art. 21 Abs. 2 DSGVO das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen, dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Im Falle Ihres Widerspruchs gegen die Verarbeitung zum Zwecke der Direktwerbung werden wir Ihre personenbezogenen Daten nicht mehr für diese Zwecke verarbeiten',
        },
        { type: 'h3', text: '5.4 Recht auf Beschwerde bei einer Aufsichtsbehörde' },
        {
          type: 'p',
          text: 'Sie haben zudem das Recht, sich bei einer zuständigen Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.',
        },
      ],
    },
    {
      title: '6 Erhebung personenbezogener Daten bei Besuch unserer Website',
      blocks: [
        {
          type: 'p',
          text: 'Bei der bloß informatorischen Nutzung der Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten. Rechtsgrundlage dafür ist Art. 6 Abs. 1 f DSGVO: IP-Adresse, Datum und Uhrzeit der Anfrage, Zeitzonendifferenz zur Greenwich Mean Time (GMT), Inhalt der Anforderung (konkrete Seite), Zugriffsstatus/HTTP-Statuscode und die jeweils übertragene Datenmenge.',
        },
      ],
    },
    {
      title: '7 Kontaktaufnahme per E-Mail',
      blocks: [
        {
          type: 'p',
          text: 'Bei Ihrer Kontaktaufnahme wird uns Ihre E-Mail Adresse übermittelt und von uns gespeichert, um Ihre Fragen zu beantworten. Diese Einwilligung können Sie selbstverständlich jederzeit mit Wirkung für die Zukunft widerrufen. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.',
        },
      ],
    },
    {
      title: '8 Einsatz von Cookies',
      blocks: [
        {
          type: 'p',
          text: 'Bei Ihrer Nutzung unserer Website werden Cookies auf Ihrem Rechner gespeichert. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert werden und durch welche der Stelle, die den Cookie setzt, bestimmte Informationen zufließen. Cookies können keine Programme ausführen oder Viren auf Ihren Computer übertragen. Sie dienen dazu, das Internetangebot insgesamt nutzerfreundlicher und effektiver zu machen.',
        },
        {
          type: 'p',
          text: 'Diese Website nutzt folgende Arten von Cookies, deren Umfang und Funktionsweise im Folgenden erläutert werden:',
        },
        { type: 'h3', text: '8.1 Transiente Cookies' },
        {
          type: 'p',
          text: 'Diese Cookies werden automatisiert gelöscht, wenn Sie den Browser schließen. Dazu zählen insbesondere die Session-Cookies. Diese speichern eine sogenannte Session-ID, mit welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Dadurch kann Ihr Rechner wiedererkannt werden, wenn Sie auf unsere Website zurückkehren. Die Session-Cookies werden gelöscht, wenn Sie sich ausloggen oder den Browser schließen.',
        },
        { type: 'h3', text: '8.2 Persistente Cookies' },
        {
          type: 'p',
          text: 'Diese Cookies werden automatisiert nach einer vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden kann. Sie können die Cookies in den Sicherheitseinstellungen Ihres Browsers jederzeit löschen.',
        },
        { type: 'h3', text: '8.3 Flash Cookies' },
        {
          type: 'p',
          text: 'Die genutzten Flash-Cookies werden nicht durch Ihren Browser erfasst, sondern durch Ihr Flash-Plug-in. Weiterhin nutzen wir HTML5 storage objects, die auf Ihrem Endgerät abgelegt werden. Diese Objekte speichern die erforderlichen Daten unabhängig von Ihrem verwendeten Browser und haben kein automatisches Ablaufdatum. Wenn Sie keine Verarbeitung der Flash-Cookies wünschen, müssen Sie ein entsprechendes Add-On installieren, z. B. „Better Privacy“ für Mozilla Firefox ([addons.mozilla.org](https://addons.mozilla.org/de/firefox/addon/betterprivacy/)) oder das Adobe-Flash-Killer-Cookie für Google Chrome. Die Nutzung von HTML5 storage objects können Sie verhindern, indem Sie in Ihrem Browser den privaten Modus einsetzen. Zudem empfehlen wir, regelmäßig Ihre Cookies und den Browser-Verlauf manuell zu löschen.',
        },
        { type: 'h3', text: '8.4 Verhinderung von Cookies' },
        {
          type: 'p',
          text: 'Sie können Ihre Browser-Einstellung entsprechend Ihren Wünschen konfigurieren und z. B. die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie darauf hin, dass Sie dann eventuell nicht alle Funktionen dieser Website nutzen können.',
        },
        { type: 'h3', text: '8.5 Rechtsgrundlagen und Speicherdauer' },
        {
          type: 'p',
          text: 'Die Rechtsgrundlagen für mögliche Verarbeitungen personenbezogener Daten und deren Speicherdauer variieren und werden in den folgenden Abschnitten dargestellt.',
        },
      ],
    },
    {
      title: '9 Webseitenanalyse',
      blocks: [
        { type: 'h3', text: '9.1 Matomo' },
        {
          type: 'p',
          text: 'Soweit Sie ihre Einwilligung erteilt haben, wird auf dieser Website der Open-Source-Webanalysedienst Matomo, ein Dienst der "InnoCraft Ltd", ein Unternehmen mit Sitz in 7 Waterloo Quay, PO625 Wellington, Neuseeland, eingesetzt. Da InnoCraft außerhalb der EU ansässig ist, hat die InnoCraft einen Vertreter in der EU benannt: ePrivacy Holding GmbH, Große Bleichen 21, 20354 Hamburg (privacy@innocraft.com).',
        },
        { type: 'h3', text: '9.2 Umfang der Verarbeitung' },
        {
          type: 'p',
          text: 'Wir setzen Matomo on-premise ein. Das bedeutet, dass Matomo auf unseren eigenen Servern und eigener Infrastruktur ausgeführt wird. Mit Matomo werden damit keine Daten an Server übermittelt, die außerhalb unserer Kontrolle liegen.',
        },
        {
          type: 'p',
          text: 'Beim Einsatz von Matomo verwenden wir Cookies, dies sind kleine Textdateien, die im Browser des Website-Besuchers gespeichert werden und die dem Endgerät des Besuchers eindeutige Merkmale zuordnen (Tracking Cookie ID). Auf diese Weise können wir in Verbindung mit weiteren personenbezogenen Daten wie u.a. der IP-Adresse das konkrete Nutzungsverhalten auf der Website dem Endgerät mit dem Cookie zuordnen. Bei Einsatz von Matomo nutzen wir zudem die sog. IP-Maskierung von Matomo: Das bedeutet, dass wir beim Einsatz von Matomo bei jeder Besucher-IP-Adresse, die uns übermittelt wird, die letzten 2 Bytes entfernen, um die Privatsphäre der Benutzer zu schützen. Sie als Nutzer sind für uns damit nicht identifizierbar.',
        },
        { type: 'h3', text: '9.3 Zweck der Verarbeitung' },
        {
          type: 'p',
          text: 'Wir nutzen die durch die Anwendung von Matomo erhobenen Daten zur statistischen Analyse des Nutzerverhaltens zum Zweck der Optimierung der Funktionalität und Stabilität der Website und zu Marketingzwecken. Unser Interesse an und Zweck der Datenverarbeitung liegt in der Optimierung unserer Website, der Anpassung der Inhalte und der Verbesserung unseres Angebotes.',
        },
        { type: 'h3', text: '9.4 Speicherdauer' },
        {
          type: 'p',
          text: 'Wir speichern die Analysedaten nur solange es der Zweck der Datenverarbeitung erfordert, maximal jedoch 13 Monate.',
        },
        { type: 'h3', text: '9.5 Rechtsgrundlage' },
        {
          type: 'p',
          text: 'Rechtsgrundlage für diese Datenverarbeitung ist Ihre Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO sowie § 25 Abs. 1 TDDDG. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie unsere Consent Management Plattform über den dafür vorgesehenen runden Button unten links auf jeder Seite aufrufen und dort Ihre Cookie-Auswahl ändern. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.',
        },
        {
          type: 'p',
          text: 'Nähere Informationen zum Datenschutz bei Matomo finden Sie unter: [matomo.org/guide/manage-matomo/privacy](https://matomo.org/guide/manage-matomo/privacy/)',
        },
      ],
    },
    {
      title: '10 Datensicherheit',
      blocks: [
        {
          type: 'p',
          text: 'Wir haben umfangreiche technische und betriebliche Schutzvorkehrungen getroffen, um Ihre Daten vor zufälligen oder vorsätzlichen Manipulationen, Verlust, Zerstörung oder dem Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsverfahren werden regelmäßig überprüft und dem technologischen Fortschritt angepasst.',
        },
      ],
    },
    {
      title: 'Beschwerdemanagement',
      blocks: [
        {
          type: 'p',
          text: 'Bei Beschwerden über unsere Tätigkeit wenden Sie sich gerne an unsere Beschwerdestelle:',
        },
        { type: 'p', text: 'E-Mail: [beschwerde@vzp-online.de](mailto:beschwerde@vzp-online.de)' },
        { type: 'p', text: 'Telefon: [+49 (0)40 35914-200](tel:+494035914200)' },
      ],
    },
  ],
};

/* ------------------------------------------------------------------------ */

/**
 * Zur Barrierefreiheit liegt auf der Bestandsseite kein Text vor.
 * TODO: Erklaerung zur Barrierefreiheit nach BFSG ergaenzen.
 */
const BARRIEREFREIHEIT: LegalPageContent = {
  label: 'Barrierefreiheit',
  // Kurz gehalten: die Seite traegt `noindex`, ihr Titel erscheint nicht in
  // Suchergebnissen - er dient nur der Orientierung im Browser-Tab.
  title: 'Barrierefreiheit – VZP',
  description:
    'Erklärung zur Barrierefreiheit dieser Website nach dem Barrierefreiheitsstärkungsgesetz (BFSG) – derzeit in Arbeit. So erreichen Sie uns bei Barrieren.',
  sections: [
    {
      blocks: [
        {
          type: 'p',
          text: 'Wir arbeiten daran, diese Website für alle Nutzerinnen und Nutzer zugänglich zu gestalten. Die Erklärung zur Barrierefreiheit wird derzeit erstellt.',
        },
        {
          type: 'p',
          text: 'Wenn Ihnen eine Barriere auffällt oder Sie Inhalte in einer anderen Form benötigen, schreiben Sie uns an [welcome@vzp-online.de](mailto:welcome@vzp-online.de) oder rufen Sie uns an: [+49 211 17148439](tel:+4921117148439).',
        },
      ],
    },
  ],
};

export const LEGAL_CONTENT: Record<string, LegalPageContent> = {
  impressum: IMPRESSUM,
  datenschutz: DATENSCHUTZ,
  barrierefreiheit: BARRIEREFREIHEIT,
};
