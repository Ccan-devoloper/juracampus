import { laden, sichern, heute } from "./speicher";

/* Erfahrungspunkte, Streak und Level. Alles lokal, ohne Konto. */

export const XP = {
  abschnitt: (minuten) => Math.max(8, Math.min(40, Math.round(minuten * 4))),
  fall: (bewertung) => ({ 1: 15, 2: 25, 3: 35 }[bewertung] || 20),
  karte: (g) => (g >= 4 ? 4 : g === 3 ? 3 : g === 2 ? 2 : 1),
  quiz: 6,
  schema: 20,
  klausur: 60,
  definition: 3,
};

/* Kompetenzstufen statt Ausbildungsbiografie. Die frühere Leiter begann mit
   „Erstsemester“ und endete im Richteramt – im Referendariat war das semantisch
   falsch, weil dort niemand bei „Erstsemester" anfängt. Die Stufen beschreiben
   deshalb den Beherrschungsgrad und gelten in beiden Examensphasen gleich. */
export const LEVEL = [
  { ab: 0, name: "Grundlagen" },
  { ab: 150, name: "Orientierung" },
  { ab: 400, name: "Aufbau" },
  { ab: 800, name: "Sicher im Schema" },
  { ab: 1400, name: "Fallfest" },
  { ab: 2200, name: "Streitstandsicher" },
  { ab: 3200, name: "Klausurreif" },
  { ab: 4500, name: "Examensreif" },
  { ab: 6500, name: "Prädikatsniveau" },
  { ab: 9000, name: "Souverän" },
];

export function stand() {
  const s = laden("xp", { gesamt: 0, tage: {} });
  if (!s.tage) s.tage = {};
  return s;
}

export function gutschreiben(punkte, grund) {
  const s = stand();
  const tag = heute();
  s.gesamt = (s.gesamt || 0) + punkte;
  s.tage[tag] = (s.tage[tag] || 0) + punkte;
  s.letzter = { punkte, grund, tag };
  /* Nur die letzten 400 Tage aufbewahren */
  const tage = Object.keys(s.tage).sort();
  if (tage.length > 400) for (const t of tage.slice(0, tage.length - 400)) delete s.tage[t];
  sichern("xp", s);
  window.dispatchEvent(new CustomEvent("jc-xp", { detail: { punkte, grund, gesamt: s.gesamt } }));
  return s;
}

export function levelFuer(gesamt) {
  let aktuell = LEVEL[0]; let naechstes = null;
  for (let i = 0; i < LEVEL.length; i++) {
    if (gesamt >= LEVEL[i].ab) { aktuell = LEVEL[i]; naechstes = LEVEL[i + 1] || null; }
  }
  const spanne = naechstes ? naechstes.ab - aktuell.ab : 1;
  const anteil = naechstes ? Math.min(100, Math.round(((gesamt - aktuell.ab) / spanne) * 100)) : 100;
  return { stufe: LEVEL.indexOf(aktuell) + 1, name: aktuell.name, naechstes, anteil, fehlt: naechstes ? naechstes.ab - gesamt : 0 };
}

/* Streak: aufeinanderfolgende Tage mit Lernaktivität bis heute (oder gestern). */
export function streak(s = stand()) {
  const tage = new Set(Object.keys(s.tage).filter((t) => s.tage[t] > 0));
  let d = new Date(heute() + "T12:00:00");
  let zaehler = 0;
  const iso = (x) => x.toISOString().slice(0, 10);
  if (!tage.has(iso(d))) d.setDate(d.getDate() - 1); /* heute noch nichts – gestern zählt weiter */
  while (tage.has(iso(d))) { zaehler++; d.setDate(d.getDate() - 1); }
  return zaehler;
}

export function tagesziel() {
  return laden("tagesziel", 60);
}

export function heuteXp(s = stand()) {
  return s.tage[heute()] || 0;
}

/* Wochenverlauf der letzten 14 Tage für den Balken im Cockpit */
export function verlauf(tage = 14, s = stand()) {
  const aus = [];
  const d = new Date(heute() + "T12:00:00");
  for (let i = tage - 1; i >= 0; i--) {
    const x = new Date(d); x.setDate(d.getDate() - i);
    const k = x.toISOString().slice(0, 10);
    aus.push({ tag: k, xp: s.tage[k] || 0, wochentag: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][x.getDay()] });
  }
  return aus;
}
