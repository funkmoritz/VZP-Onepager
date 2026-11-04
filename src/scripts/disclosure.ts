/**
 * Inline-Accordions nach dem ARIA-APG-Disclosure-Muster.
 *
 * Markup:
 *   <button data-disclosure-trigger aria-expanded="false" aria-controls="x">…</button>
 *   <div id="x" data-disclosure-panel>…</div>
 *
 * Der Zustand liegt ausschliesslich in aria-expanded (Button) bzw. data-open
 * (Panel); das Ein-/Ausblenden erledigt CSS (global.css). Ohne JavaScript
 * bleiben alle Panels sichtbar.
 *
 * Optional: data-disclosure-mobile an Button UND Panel - dann ist der Inhalt
 * nur unterhalb von 48em einklappbar. aria-controls darf mehrere IDs
 * (durch Leerzeichen getrennt) enthalten.
 */

document.addEventListener('click', (event) => {
  const trigger = (event.target as Element | null)?.closest<HTMLElement>(
    '[data-disclosure-trigger]',
  );
  if (!trigger) return;

  const panels = (trigger.getAttribute('aria-controls') ?? '')
    .split(/\s+/)
    .map((id) => document.getElementById(id))
    .filter((panel): panel is HTMLElement => panel !== null);
  if (panels.length === 0) return;

  const open = trigger.getAttribute('aria-expanded') !== 'true';
  trigger.setAttribute('aria-expanded', String(open));
  panels.forEach((panel) => panel.toggleAttribute('data-open', open));

  // Einmal-Umschalter (z. B. "Aeltere Ausgaben anzeigen") verschwinden nach
  // dem Oeffnen; der Fokus wandert in den neu sichtbaren Inhalt, damit er
  // nicht auf einem entfernten Element verloren geht.
  if (open && trigger.hasAttribute('data-disclosure-once')) {
    trigger.hidden = true;
    panels[0]?.querySelector<HTMLElement>('a, button, [tabindex]')?.focus();
  }
});
