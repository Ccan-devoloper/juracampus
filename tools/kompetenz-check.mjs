/* Prüft das Kompetenzmodell gegen die tatsächlichen Inhalte:
   Wie viel jeder Knoten abbekommt, was nirgends landet, welche Schema-IDs
   ins Leere zeigen. Aufruf: node tools/kompetenz-check.mjs */

import { readFileSync } from "node:fs";
import { KOMPETENZEN, kompetenzenFuer } from "../src/data/kompetenzen.js";
import { SCHEMATA } from "../src/data/schemata.js";
import { QUIZ } from "../src/data/quiz.js";
import { zuordnung } from "../src/lib/kompetenz.js";

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
