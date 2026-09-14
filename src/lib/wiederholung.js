/* Wiederholung nach SM-2 (SuperMemo), wie sie Jurafuchs, Anki und Repetico
   in Varianten einsetzen: Jede Karte trägt Leichtigkeit (ef), Wiederholungszahl (n),
   Intervall in Tagen (iv) und Fälligkeitsdatum (due). Bewertet wird 0–5. */

export const HEUTE = () => new Date().toISOString().slice(0, 10);

const tagePlus = (datum, tage) => { const d = new Date(datum + "T12:00:00"); d.setDate(d.getDate() + tage); return d.toISOString().slice(0, 10); };

export function bewerten(karte, q) {
  let { ef = 2.5, n = 0, iv = 0 } = karte || {};
  if (q < 3) { n = 0; iv = 1; }
  else {
    if (n === 0) iv = 1;
    else if (n === 1) iv = 6;
    else iv = Math.round(iv * ef);
    n += 1;
  }
  ef = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  const heute = HEUTE();
  return { ef: Math.round(ef * 100) / 100, n, iv, due: tagePlus(heute, iv), last: heute, hist: [...((karte && karte.hist) || []).slice(-9), q] };
}

export const istFaellig = (karte, tag = HEUTE()) => !karte || !karte.due || karte.due <= tag;

/* Drei Knöpfe statt sechs Stufen – das reicht in der Praxis und ist schneller. */
export const STUFEN = [
  { q: 1, label: "Nochmal", hinweis: "gleich wieder", ton: "rot" },
  { q: 3, label: "Schwer", hinweis: "bald wieder", ton: "orange" },
  { q: 5, label: "Leicht", hinweis: "später wieder", ton: "gruen" },
];

/* Vorschau: In wie vielen Tagen käme die Karte bei dieser Antwort wieder? */
export function vorschau(karte, q) {
  return bewerten(karte, q).iv;
}

/* Reihenfolge einer Lernsitzung: fällige zuerst (älteste zuerst), dann neue. */
export function sitzung(kartenIds, stand, { neuMax = 20, faelligMax = 60 } = {}) {
  const heute = HEUTE();
  const faellig = kartenIds.filter((id) => stand[id] && stand[id].due && stand[id].due <= heute).sort((a, b) => (stand[a].due < stand[b].due ? -1 : 1));
  const neu = kartenIds.filter((id) => !stand[id]);
  return [...faellig.slice(0, faelligMax), ...neu.slice(0, neuMax)];
}
