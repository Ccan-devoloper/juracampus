/* Konsistenzprüfung der Daten – `npm run check`.
   Prüft, dass die generierten Daten vollständig sind und dass die handgepflegten
   Datensätze (Schemata, Quiz, Normen-Trainer, Relevanz) auf existierende Inhalte zeigen. */

import fs from "node:fs";
import { SCHEMATA } from "../src/data/schemata.js";
import { QUIZ } from "../src/data/quiz.js";
import { NORMENQUIZ } from "../src/data/normenquiz.js";

const lies = (n) => JSON.parse(fs.readFileSync(`src/data/${n}.json`, "utf8"));
const werk = lies("werk"); const faelle = lies("faelle"); const probleme = lies("probleme"); const normen = lies("normen"); const rs = lies("rechtsstand"); const defs = lies("definitionen"); const lex = lies("lexikon"); const suche = lies("suche");

let fehler = 0;
const pruefe = (bedingung, text) => { if (!bedingung) { fehler++; console.log("FEHLER:", text); } };

/* Werk */
pruefe(werk.baende.length === 6, "sechs Fachbände erwartet");
for (const b of werk.baende) {
  pruefe(b.kapitel.length > 30, `Band ${b.nr}: zu wenige Kapitel (${b.kapitel.length})`);
  const daten = lies(`band-${b.nr}`);
  pruefe(daten.kapitel.length === b.kapitel.length, `Band ${b.nr}: Kapitelzahl in werk.json und band-${b.nr}.json weicht ab`);
  for (const k of daten.kapitel) for (const a of k.abschnitte) {
    pruefe(a.html.length > 40, `Band ${b.nr} ${k.nr}: leerer Abschnitt ${a.id}`);
    pruefe(!/class="note"|auditbox|callout/.test(a.html), `Band ${b.nr} ${k.nr}: unkonvertierter Kasten in ${a.id}`);
    pruefe(!/Plattformfall|Plattformabgleich|Jura-Online/.test(a.html), `Band ${b.nr} ${k.nr}: redaktionelle Spur in ${a.id}`);
  }
}
const kapitelIds = new Set(werk.baende.flatMap((b) => b.kapitel.map((k) => k.id)));

/* Fälle, Streitstände */
pruefe(faelle.faelle.length >= 240, `zu wenige Fälle (${faelle.faelle.length})`);
for (const f of faelle.faelle) {
  pruefe(f.teile.sachverhalt && f.teile.loesung, `Fall ${f.nr} ohne Sachverhalt oder Lösung`);
  pruefe(["zivil", "oeff", "straf"].includes(f.gebiet) && [1, 2].includes(f.stufe), `Fall ${f.nr}: Zuordnung fehlt`);
}
pruefe(probleme.probleme.length >= 220, `zu wenige Streitstände (${probleme.probleme.length})`);
for (const g of ["zivil", "oeff", "straf"]) for (const s of [1, 2]) {
  pruefe(faelle.faelle.some((f) => f.gebiet === g && f.stufe === s), `keine Fälle für ${g}/${s}`);
  pruefe(probleme.probleme.some((p) => p.gebiet === g && p.stufe === s), `keine Streitstände für ${g}/${s}`);
  pruefe(SCHEMATA.filter((x) => x.gebiet === g && x.stufe === s).length >= 5, `zu wenige Schemata für ${g}/${s}`);
  pruefe(QUIZ.filter((x) => x.gebiet === g && x.stufe === s).length >= 8, `zu wenige Quizfragen für ${g}/${s}`);
  pruefe(NORMENQUIZ.filter((x) => x[2] === g && (x[3] === s || x[3] === 0)).length >= 10, `zu wenige Normen im Trainer für ${g}/${s}`);
}

/* Schemata */
const schemaIds = new Set();
for (const s of SCHEMATA) {
  pruefe(!schemaIds.has(s.id), `Schema-ID doppelt: ${s.id}`); schemaIds.add(s.id);
  pruefe(!s.kapitel || kapitelIds.has(s.kapitel), `Schema ${s.id}: Kapitel ${s.kapitel} existiert nicht`);
  pruefe(s.schritte.length >= 2, `Schema ${s.id}: zu wenige Schritte`);
}

/* Quiz */
const quizIds = new Set();
for (const q of QUIZ) {
  pruefe(!quizIds.has(q.id), `Quiz-ID doppelt: ${q.id}`); quizIds.add(q.id);
  pruefe(q.optionen.length === 4 && q.richtig >= 0 && q.richtig < 4, `Quiz ${q.id}: Optionen/Antwort fehlerhaft`);
  pruefe(q.erklaerung && q.erklaerung.length > 20, `Quiz ${q.id}: Erklärung fehlt`);
}

/* Register */
pruefe(normen.gesetze.length >= 25, "zu wenige Gesetze im Normenregister");
pruefe(rs.sperrliste.length >= 20, "Sperrliste unvollständig");
pruefe(defs.length >= 120, `zu wenige Definitionen (${defs.length})`);
pruefe(!defs.some((d) => /^(dann|hier|dort|also)$/i.test(d.begriff)), "Funktionswort als Definitionsbegriff");
pruefe(Object.keys(lex.buchstaben).length >= 20, "Lexikon unvollständig");
pruefe(suche.length >= 1000, `Suchindex zu klein (${suche.length})`);
for (const e of suche) pruefe(!/Plattformfall|Fallledger|Sitemap/.test(e.text), `redaktionelle Spur im Suchindex: ${e.id}`);

console.log(fehler ? `${fehler} Fehler` : `alles in Ordnung: ${werk.zaehler.kapitel} Kapitel, ${faelle.faelle.length} Fälle, ${probleme.probleme.length} Streitstände, ${SCHEMATA.length} Schemata, ${QUIZ.length} Quizfragen, ${NORMENQUIZ.length} Trainer-Normen, ${defs.length} Definitionen`);
process.exit(fehler ? 1 : 0);
