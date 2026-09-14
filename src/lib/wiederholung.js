/* Wiederholung nach FSRS (Free Spaced Repetition Scheduler), Variante 5.

   Ablösung von SM-2. SM-2 kennt nur einen Leichtigkeitsfaktor und multipliziert
   Intervalle blind hoch. FSRS modelliert zwei getrennte Größen:

     Stabilität S  – wie viele Tage vergehen, bis die Abrufwahrscheinlichkeit
                     auf die Zielretention fällt.
     Schwierigkeit D – wie stark dieses Material dem Vergessen widersteht (1–10).

   Daraus ergibt sich die Abrufwahrscheinlichkeit nach t Tagen als

     R(t) = (1 + F · t/S)^D_ECAY      mit DECAY = −0,5 und F = 19/81

   und umgekehrt das Intervall für eine gewünschte Retention r:

     I(r) = S/F · (r^(1/DECAY) − 1)

   Der praktische Unterschied für Jura: Ein Streitstand, den man dreimal knapp
   erinnert hat, bekommt bei FSRS ein kurzes Intervall, auch wenn er formal oft
   „richtig“ war. Eine Definition, die sofort saß, springt schnell auf Wochen.

   Quelle des Modells: open-spaced-repetition/fsrs4anki, Standardgewichte der
   Fassung 5. Die Gewichte sind bewusst nicht individuell optimiert – dafür
   bräuchte es Rohdaten vieler Nutzer. */

const DECAY = -0.5;
const FAKTOR = 19 / 81;

/* Standardgewichte FSRS-5 (19 Parameter). */
const W = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046,
  1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315,
  2.9898, 0.51655, 0.6621,
];

/* Zielretention: Anteil des Stoffs, der beim Wiedersehen noch sitzen soll.
   0,9 ist der FSRS-Standard und für Examensstoff ein guter Kompromiss aus
   Sicherheit und Kartenzahl pro Tag. */
export const ZIELRETENTION = 0.9;

export const MIN_INTERVALL = 1;
export const MAX_INTERVALL = 365 * 3;

export const HEUTE = () => new Date().toISOString().slice(0, 10);

const klemme = (x, min, max) => Math.min(max, Math.max(min, x));
const tagePlus = (datum, tage) => {
  const d = new Date(datum + "T12:00:00");
  d.setDate(d.getDate() + Math.round(tage));
  return d.toISOString().slice(0, 10);
};
export const tageZwischen = (von, bis) =>
  Math.round((new Date(bis + "T12:00:00") - new Date(von + "T12:00:00")) / 86400000);

/* ------------------------------------------------------------- Kernformeln */

/* Abrufwahrscheinlichkeit nach t Tagen bei Stabilität s. */
export function abruf(t, s) {
  if (!s || s <= 0) return 0;
  return Math.pow(1 + (FAKTOR * Math.max(0, t)) / s, DECAY);
}

/* Intervall in Tagen, nach dem die Abrufwahrscheinlichkeit auf r gefallen ist. */
function intervall(s, r = ZIELRETENTION) {
  const tage = (s / FAKTOR) * (Math.pow(r, 1 / DECAY) - 1);
  return klemme(Math.round(tage), MIN_INTERVALL, MAX_INTERVALL);
}

const anfangsStabilitaet = (g) => klemme(W[g - 1], 0.1, MAX_INTERVALL);
const anfangsSchwierigkeit = (g) => klemme(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);

/* Schwierigkeit fortschreiben: Abweichung von „gut“, linear gedämpft, danach
   Rückzug zur Ausgangsschwierigkeit von „leicht“ (verhindert Abdriften). */
function naechsteSchwierigkeit(d, g) {
  const delta = -W[6] * (g - 3);
  const gedaempft = d + delta * ((10 - d) / 9);
  const zurueck = W[7] * anfangsSchwierigkeit(4) + (1 - W[7]) * gedaempft;
  return klemme(zurueck, 1, 10);
}

/* Stabilität nach erfolgreichem Abruf. Je höher die Schwierigkeit und je höher
   die Abrufwahrscheinlichkeit war, desto kleiner der Zuwachs: Was ohnehin noch
   sicher saß, bringt wenig neue Festigkeit. */
function stabilitaetErfolg(d, s, r, g) {
  const hart = g === 2 ? W[15] : 1;
  const leicht = g === 4 ? W[16] : 1;
  const zuwachs =
    Math.exp(W[8]) *
    (11 - d) *
    Math.pow(s, -W[9]) *
    (Math.exp(W[10] * (1 - r)) - 1) *
    hart *
    leicht;
  return klemme(s * (1 + zuwachs), 0.1, MAX_INTERVALL);
}

/* Stabilität nach einem Patzer. Sie sinkt, fällt aber nicht auf null zurück –
   einmal Gelerntes ist schneller wieder da als ganz Neues. */
function stabilitaetPatzer(d, s, r) {
  const neu =
    W[11] *
    Math.pow(d, -W[12]) *
    (Math.pow(s + 1, W[13]) - 1) *
    Math.exp(W[14] * (1 - r));
  return klemme(Math.min(neu, s), 0.1, MAX_INTERVALL);
}

/* Wiederholung am selben Tag (Kurzzeitgedächtnis). */
function stabilitaetKurz(s, g) {
  return klemme(s * Math.exp(W[17] * (g - 3 + W[18])), 0.1, MAX_INTERVALL);
}

/* ------------------------------------------------------------ Öffentlich */

/* Vier Stufen. FSRS unterscheidet „Schwer“ und „Gut“ bewusst: Wer eine Karte
   nur mit Mühe erinnert, hat eine andere Vergessenskurve als wer sie sicher
   wusste – bei SM-2 fiel dieser Unterschied weitgehend unter den Tisch. */
export const STUFEN = [
  { g: 1, label: "Nochmal", hinweis: "nicht gewusst", ton: "rot" },
  { g: 2, label: "Schwer", hinweis: "mit Mühe", ton: "orange" },
  { g: 3, label: "Gut", hinweis: "gewusst", ton: "marke" },
  { g: 4, label: "Leicht", hinweis: "sofort da", ton: "gruen" },
];

/* Alte SM-2-Stände weiterverwenden statt verwerfen: Das Intervall wird als
   Stabilität gelesen, der Leichtigkeitsfaktor auf die Schwierigkeitsskala
   abgebildet (2,5 war der SM-2-Startwert und entspricht mittlerer Schwierigkeit). */
export function ausSm2(k) {
  if (!k || k.s !== undefined) return k;
  if (!k.n && !k.iv) return k;
  const s = klemme(k.iv || 1, 0.1, MAX_INTERVALL);
  const d = klemme(5 + (2.5 - (k.ef ?? 2.5)) * 4, 1, 10);
  return { s, d, n: k.n || 0, patzer: 0, due: k.due, last: k.last, hist: k.hist || [], herkunft: "sm2" };
}

/* Eine Bewertung verarbeiten und den neuen Kartenzustand liefern.
   `karte` darf fehlen (neue Karte) oder ein SM-2-Stand sein. */
export function bewerten(karte, g, heute = HEUTE()) {
  const grad = klemme(Math.round(g), 1, 4);
  const k = ausSm2(karte);
  let s;
  let d;
  if (!k || k.s === undefined) {
    s = anfangsStabilitaet(grad);
    d = anfangsSchwierigkeit(grad);
  } else {
    const t = k.last ? Math.max(0, tageZwischen(k.last, heute)) : 0;
    const r = abruf(t, k.s);
    d = naechsteSchwierigkeit(k.d, grad);
    if (t < 1) s = stabilitaetKurz(k.s, grad);
    else if (grad === 1) s = stabilitaetPatzer(d, k.s, r);
    else s = stabilitaetErfolg(d, k.s, r, grad);
  }
  const iv = grad === 1 ? MIN_INTERVALL : intervall(s);
  return {
    s: Math.round(s * 1000) / 1000,
    d: Math.round(d * 1000) / 1000,
    n: ((k && k.n) || 0) + 1,
    patzer: ((k && k.patzer) || 0) + (grad === 1 ? 1 : 0),
    iv,
    due: tagePlus(heute, iv),
    last: heute,
    hist: [...(((k && k.hist) || []).slice(-9)), grad],
  };
}

/* Wie viele Tage läge das nächste Intervall bei dieser Bewertung? */
export function vorschau(karte, g, heute = HEUTE()) {
  return bewerten(karte, g, heute).iv;
}

export const istFaellig = (karte, tag = HEUTE()) => !karte || !karte.due || karte.due <= tag;

/* Aktuelle Abrufwahrscheinlichkeit einer Karte – Grundlage des Kompetenzmodells. */
export function kartenAbruf(karte, tag = HEUTE()) {
  const k = ausSm2(karte);
  if (!k || k.s === undefined || !k.last) return 0;
  return abruf(Math.max(0, tageZwischen(k.last, tag)), k.s);
}

/* Reihenfolge einer Lernsitzung: fällige zuerst, die am stärksten
   überfälligen zuerst, danach neue Karten. */
export function sitzung(kartenIds, stand, { neuMax = 20, faelligMax = 60, tag = HEUTE() } = {}) {
  const faellig = kartenIds
    .filter((id) => stand[id] && stand[id].due && stand[id].due <= tag)
    .sort((a, b) => kartenAbruf(stand[a], tag) - kartenAbruf(stand[b], tag));
  const neu = kartenIds.filter((id) => !stand[id]);
  return [...faellig.slice(0, faelligMax), ...neu.slice(0, neuMax)];
}

/* Wie viele Karten werden an den nächsten Tagen fällig? Für die Vorschau im Cockpit. */
export function faelligkeitsVorschau(stand, tage = 14, tag = HEUTE()) {
  const aus = [];
  for (let i = 0; i < tage; i++) {
    const t = tagePlus(tag, i);
    aus.push({ tag: t, anzahl: Object.values(stand).filter((k) => k.due === t || (i === 0 && k.due && k.due <= t)).length });
  }
  return aus;
}

/* Selbsttest: `node src/lib/wiederholung.js` */
if (typeof process !== "undefined" && process.argv && process.argv[1] && process.argv[1].endsWith("wiederholung.js")) {
  let fehler = 0;
  const pruefe = (bed, text) => { if (!bed) { fehler++; console.log("FEHLER:", text); } };

  /* Bei t = S muss die Abrufwahrscheinlichkeit genau der Zielretention entsprechen. */
  pruefe(Math.abs(abruf(10, 10) - 0.9) < 1e-9, `R(S)=${abruf(10, 10)}, erwartet 0,9`);
  pruefe(abruf(0, 10) === 1, "R(0) muss 1 sein");
  /* Potenzgesetz statt Exponentialzerfall: Nach dem Zehnfachen der Stabilität
     liegt R noch bei rund 0,55, erst nach dem Hundertfachen unter 0,25. Genau
     dieser lange Schwanz ist der Grund, warum FSRS längere Intervalle wagt. */
  pruefe(abruf(100, 10) > 0.5 && abruf(100, 10) < 0.6, `R(10·S)=${abruf(100, 10).toFixed(3)}, erwartet rund 0,55`);
  pruefe(abruf(1000, 10) < 0.25, `R(100·S)=${abruf(1000, 10).toFixed(3)}, erwartet unter 0,25`);
  pruefe(abruf(5, 10) > abruf(20, 10), "R muss monoton fallen");

  /* Neue Karte: bessere Bewertung -> längeres Intervall. */
  const iv = STUFEN.map((s) => bewerten(null, s.g).iv);
  pruefe(iv[0] <= iv[1] && iv[1] <= iv[2] && iv[2] <= iv[3], `Intervalle nicht monoton: ${iv}`);
  pruefe(iv[3] > iv[0] * 3, `„Leicht“ muss deutlich länger sein als „Nochmal“: ${iv}`);

  /* Schwierigkeit: „Nochmal“ macht schwerer, „Leicht“ leichter. */
  const basis = bewerten(null, 3);
  pruefe(bewerten(basis, 1, tagePlus(HEUTE(), basis.iv)).d > basis.d, "Patzer muss Schwierigkeit erhöhen");
  pruefe(bewerten(basis, 4, tagePlus(HEUTE(), basis.iv)).d < basis.d, "„Leicht“ muss Schwierigkeit senken");

  /* Patzer senkt die Stabilität, hebt sie nie. */
  let k = bewerten(null, 3);
  for (let i = 0; i < 4; i++) k = bewerten(k, 3, tagePlus(HEUTE(), k.iv * (i + 1)));
  const nachPatzer = bewerten(k, 1, tagePlus(HEUTE(), k.iv * 5));
  pruefe(nachPatzer.s < k.s, `Patzer muss Stabilität senken: ${k.s} -> ${nachPatzer.s}`);
  pruefe(nachPatzer.iv === MIN_INTERVALL, "nach einem Patzer muss die Karte morgen wieder fällig sein");

  /* Wiederholtes „Gut“ lässt die Stabilität wachsen. */
  let w = bewerten(null, 3);
  const ersteIv = w.iv;
  for (let i = 0; i < 5; i++) w = bewerten(w, 3, tagePlus(HEUTE(), w.iv));
  pruefe(w.iv > ersteIv * 2, `Intervall muss über mehrere Erfolge wachsen: ${ersteIv} -> ${w.iv}`);
  pruefe(w.iv <= MAX_INTERVALL, "Intervall darf die Obergrenze nicht überschreiten");

  /* Grenzen der Schwierigkeit. */
  let schwer = bewerten(null, 1);
  for (let i = 0; i < 30; i++) schwer = bewerten(schwer, 1, tagePlus(HEUTE(), 1));
  pruefe(schwer.d <= 10 && schwer.d >= 1, `Schwierigkeit außerhalb 1–10: ${schwer.d}`);

  /* SM-2-Migration. */
  const alt = { ef: 2.5, n: 3, iv: 12, due: "2026-09-20", last: "2026-09-08", hist: [5, 5, 3] };
  const neu = ausSm2(alt);
  pruefe(neu.s === 12, `Intervall muss als Stabilität übernommen werden: ${neu.s}`);
  pruefe(Math.abs(neu.d - 5) < 1e-9, `ef 2,5 muss mittlerer Schwierigkeit entsprechen: ${neu.d}`);
  pruefe(ausSm2({ ef: 1.3, n: 5, iv: 3 }).d > 8, "niedriger Leichtigkeitsfaktor muss hohe Schwierigkeit ergeben");
  const weiter = bewerten(alt, 3, "2026-09-20");
  pruefe(weiter.s > 12, `migrierte Karte muss weiterwachsen: ${weiter.s}`);
  pruefe(weiter.herkunft === undefined && weiter.due > "2026-09-20", "migrierte Karte braucht ein neues Fälligkeitsdatum");

  /* Fälligkeit und Sitzungsreihenfolge. */
  pruefe(istFaellig(undefined), "neue Karten sind immer fällig");
  pruefe(istFaellig({ due: "2020-01-01" }), "überfällige Karten sind fällig");
  pruefe(!istFaellig({ due: tagePlus(HEUTE(), 5) }), "künftige Karten sind nicht fällig");
  const stand = {
    a: { s: 10, d: 5, due: tagePlus(HEUTE(), -20), last: tagePlus(HEUTE(), -30) },
    b: { s: 10, d: 5, due: tagePlus(HEUTE(), -1), last: tagePlus(HEUTE(), -11) },
    c: { s: 10, d: 5, due: tagePlus(HEUTE(), 5), last: HEUTE() },
  };
  const reihe = sitzung(["a", "b", "c", "neu1", "neu2"], stand, { neuMax: 1 });
  pruefe(reihe[0] === "a", `am stärksten überfällige Karte zuerst: ${reihe}`);
  pruefe(!reihe.includes("c"), "nicht fällige Karten gehören nicht in die Sitzung");
  pruefe(reihe.filter((x) => x.startsWith("neu")).length === 1, "Obergrenze für neue Karten missachtet");

  console.log(fehler ? `${fehler} Fehler` : "alle FSRS-Proben bestanden");
  console.log("Intervalle einer neuen Karte je Stufe:", STUFEN.map((s, i) => `${s.label} ${iv[i]}T`).join(" · "));
  process.exit(fehler ? 1 : 0);
}
