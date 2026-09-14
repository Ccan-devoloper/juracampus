/* Prüft das Kompetenzmodell gegen die tatsächlichen Inhalte:
   Wie viel jeder Knoten abbekommt, was nirgends landet, welche Schema-IDs
   ins Leere zeigen. Aufruf: node tools/kompetenz-check.mjs */

import { readFileSync } from "node:fs";
import { KOMPETENZEN, kompetenzenFuer } from "../src/data/kompetenzen.js";
import { SCHEMATA } from "../src/data/schemata.js";
import { QUIZ } from "../src/data/quiz.js";
import { zuordnung } from "../src/lib/kompetenz.js";
import { ERKLAERUNGEN } from "../src/data/erklaerungen.js";
import { STREITBILDER } from "../src/data/streitbilder.js";
import { MICROCASES, KLAUSUREN } from "../src/data/fallklassen.js";
import { LAENDER, WIDERSPRUCH_STAND } from "../src/data/laender.js";

const lies = (n) => JSON.parse(readFileSync(`src/data/${n}.json`, "utf8"));
const werk = lies("werk");
const faelle = lies("faelle");
const probleme = lies("probleme");
const definitionen = lies("definitionen");

const bandVon = (gebiet, stufe) => {
  const b = werk.baende.find((x) => x.gebiet === gebiet && x.stufe === stufe);
  return b ? { ...b, kapitel: lies(`band-${b.nr}`).kapitel } : null;
};

let fehler = 0;
const warn = (t) => { console.log("  ! " + t); fehler++; };

/* Erklärungen müssen auf existierende Kompetenzen zeigen, und jede
   hochrelevante Kompetenz sollte eine bekommen. */
const knotenIds = new Set(KOMPETENZEN.map((k) => k.id));
const erklaert = new Set();
for (const e of ERKLAERUNGEN) {
  if (!knotenIds.has(e.k)) warn(`Erklärung „${e.k}“ zeigt auf keine Kompetenz`);
  if (erklaert.has(e.k)) warn(`Erklärung „${e.k}“ ist doppelt`);
  erklaert.add(e.k);
  for (const feld of ["kurz", "beispiel", "gegenbeispiel", "formulierung"]) {
    if (!e[feld] || e[feld].length < 40) warn(`Erklärung „${e.k}“: Feld ${feld} fehlt oder ist zu kurz`);
  }
  if (!e.mittel || e.mittel.length < 3) warn(`Erklärung „${e.k}“: weniger als drei Schritte auf der mittleren Stufe`);
  if (!e.vertiefung || e.vertiefung.length < 2) warn(`Erklärung „${e.k}“: weniger als zwei Vertiefungen`);
  if (!e.fallen || e.fallen.length < 2) warn(`Erklärung „${e.k}“: weniger als zwei Fehlerfallen`);
}
const offeneHoch = KOMPETENZEN.filter((k) => k.relevanz === "hoch" && !erklaert.has(k.id));
console.log(`\nErklärungen: ${ERKLAERUNGEN.length} · hochrelevante Kompetenzen ohne Erklärung: ${offeneHoch.length}`);
if (offeneHoch.length) console.log("  offen: " + offeneHoch.map((k) => k.id).join(", "));

/* Streitbilder müssen auf existierende Streitstände zeigen und vollständig sein. */
const problemIds = new Set(probleme.probleme.map((p) => p.id));
const gesehen = new Set();
for (const b of STREITBILDER) {
  if (!problemIds.has(b.id)) warn(`Streitbild „${b.id}“ zeigt auf keinen Streitstand`);
  if (gesehen.has(b.id)) warn(`Streitbild „${b.id}“ ist doppelt`);
  gesehen.add(b.id);
  for (const feld of ["frage", "trigger", "erheblich", "formulierung"]) {
    if (!b[feld] || b[feld].length < 40) warn(`Streitbild „${b.id}“: Feld ${feld} fehlt oder ist zu kurz`);
  }
  if (!b.ansichten || b.ansichten.length < 2) warn(`Streitbild „${b.id}“: weniger als zwei Ansichten`);
  for (const a of b.ansichten || []) {
    if (!a.pro || !a.pro.length) warn(`Streitbild „${b.id}“: Ansicht „${a.name}“ ohne Argument dafür`);
    if (!a.contra || !a.contra.length) warn(`Streitbild „${b.id}“: Ansicht „${a.name}“ ohne Gegenargument`);
  }
  if (typeof b.herrschend !== "number" || !b.ansichten[b.herrschend]) warn(`Streitbild „${b.id}“: herrschende Ansicht nicht bestimmt`);
}
console.log(`Streitbilder: ${STREITBILDER.length} von ${probleme.probleme.length} Streitständen ausgearbeitet (${Math.round((STREITBILDER.length / probleme.probleme.length) * 100)} %)`);

/* Bundesländer */
if (LAENDER.length !== 16) warn(`nur ${LAENDER.length} von 16 Bundesländern erfasst`);
const landIds = new Set();
for (const l of LAENDER) {
  if (landIds.has(l.id)) warn(`Bundesland „${l.id}“ ist doppelt`);
  landIds.add(l.id);
  for (const feld of ["polizei", "bau", "kommunal", "vollstreckung", "vwvfg"]) {
    if (!l[feld] || !l[feld].k || !l[feld].n) warn(`${l.name}: ${feld} unvollständig`);
  }
  if (!l.polizei.general || !/§|Art\./.test(l.polizei.general)) warn(`${l.name}: Generalklausel fehlt oder ist keine Fundstelle`);
  if (!WIDERSPRUCH_STAND[l.widerspruch?.stand]) warn(`${l.name}: unbekannter Stand des Widerspruchsverfahrens`);
  if (!l.besonderheit || l.besonderheit.length < 40) warn(`${l.name}: Besonderheit fehlt oder ist zu kurz`);
}
console.log(`Bundesländer: ${LAENDER.length} mit Gefahrenabwehr-, Bau-, Kommunal-, Verfahrens- und Vollstreckungsrecht`);

/* Microcases und Examensklausuren */
const knotenAlle = new Set(KOMPETENZEN.map((k) => k.id));
const microIds = new Set();
for (const m of MICROCASES) {
  if (!knotenAlle.has(m.k)) warn(`Microcase „${m.id}“ zeigt auf keine Kompetenz (${m.k})`);
  if (microIds.has(m.id)) warn(`Microcase „${m.id}“ ist doppelt`);
  microIds.add(m.id);
  for (const feld of ["s", "a", "w"]) {
    if (!m[feld] || m[feld].length < 20) warn(`Microcase „${m.id}“: Feld ${feld} fehlt oder ist zu kurz`);
  }
  if (!m.f || m.f.length < 12 || !m.f.includes("?")) warn(`Microcase „${m.id}“: Frage fehlt oder ist keine Frage`);
  if ((m.s + " " + m.f).split(/\s+/).length > 90) warn(`Microcase „${m.id}“: Sachverhalt und Frage zusammen über 90 Wörter – das ist kein Microcase mehr`);
}
for (const k of KLAUSUREN) {
  const summe = k.erwartungshorizont.reduce((a, x) => a + x.p, 0);
  if (summe !== 100) warn(`Klausur „${k.id}“: Erwartungshorizont ergibt ${summe} statt 100 Punkte`);
  if (!k.bearbeitervermerk || k.bearbeitervermerk.length < 60) warn(`Klausur „${k.id}“: Bearbeitervermerk fehlt oder ist zu kurz`);
  const woerter = k.sachverhalt.split(/\s+/).length;
  if (woerter < 200) warn(`Klausur „${k.id}“: Sachverhalt mit ${woerter} Wörtern zu knapp für eine Examensklausur`);
  if (!k.fragen || !k.fragen.length) warn(`Klausur „${k.id}“: keine Fallfrage`);
  if (!k.hinweise || k.hinweise.length < 2) warn(`Klausur „${k.id}“: weniger als zwei Hinweise`);
}
console.log(`Microcases: ${MICROCASES.length} · Examensklausuren: ${KLAUSUREN.length} (je 100 Punkte im Erwartungshorizont)`);

/* Schema-IDs in kompetenzen.js müssen existieren */
const schemaIds = new Set(SCHEMATA.map((s) => s.id));
for (const k of KOMPETENZEN) for (const sid of k.schema || []) if (!schemaIds.has(sid)) warn(`${k.id}: Schema „${sid}“ existiert nicht`);

for (const gebiet of ["zivil", "oeff", "straf"]) {
  for (const stufe of [1, 2]) {
    const band = bandVon(gebiet, stufe);
    if (!band) { warn(`kein Band für ${gebiet}/${stufe}`); continue; }
    const zu = zuordnung(gebiet, stufe, { band, faelle, probleme, definitionen });
    const knoten = kompetenzenFuer(gebiet, stufe);
    const alleAbschnitte = band.kapitel.flatMap((k) => k.abschnitte.map((a) => a.id));
    const alleProbleme = probleme.probleme.filter((p) => p.gebiet === gebiet && p.stufe === stufe).map((p) => p.id);
    const alleFaelle = faelle.faelle.filter((f) => f.gebiet === gebiet && f.stufe === stufe).map((f) => f.id);
    const alleQuiz = QUIZ.filter((q) => q.gebiet === gebiet && q.stufe === stufe).map((q) => q.id);

    const gedeckt = (art, alle) => {
      const m = new Set();
      for (const k of knoten) for (const x of zu.fach.get(k.id)[art]) m.add(x);
      return { n: alle.filter((x) => m.has(x)).length, gesamt: alle.length };
    };
    const a = gedeckt("abschnitte", alleAbschnitte);
    const p = gedeckt("probleme", alleProbleme);
    const f = gedeckt("faelle", alleFaelle);
    const q = gedeckt("quiz", alleQuiz);
    const pct = (x) => (x.gesamt ? Math.round((x.n / x.gesamt) * 100) : 100);

    console.log(`\n${gebiet}/${stufe} · ${knoten.length} Kompetenzen`);
    console.log(`  Abschnitte ${a.n}/${a.gesamt} (${pct(a)} %) · Streitstände ${p.n}/${p.gesamt} (${pct(p)} %) · Fälle ${f.n}/${f.gesamt} (${pct(f)} %) · Quiz ${q.n}/${q.gesamt} (${pct(q)} %)`);

    for (const k of knoten) {
      const fa = zu.fach.get(k.id);
      if (!fa.abschnitte.length) warn(`${k.id}: kein Abschnitt zugeordnet (Kapitel-Regex greift nicht?)`);
      if (!fa.karten.length) warn(`${k.id}: keine Karte zugeordnet`);
    }
    if (pct(a) < 55) warn(`${gebiet}/${stufe}: nur ${pct(a)} % der Abschnitte sind einer Kompetenz zugeordnet`);
  }
}

console.log(fehler ? `\n${fehler} Hinweise.` : "\nKompetenzmodell vollständig zugeordnet.");
