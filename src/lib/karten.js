/* Kartenquellen: Aus Definitionen, Streitständen, Fällen, Schemata, Normen,
   Rechtsstand und eigenen Karten wird ein einheitlicher Kartenstapel gebildet. */

import { SCHEMATA } from "../data/schemata";
import { normenFuer } from "../data/normenquiz";

export const KARTENTYPEN = [
  { id: "def", label: "Definitionen", hinweis: "Begriff nennen – Definition wissen" },
  { id: "problem", label: "Streitstände", hinweis: "Ansichten und Argumente" },
  { id: "fall", label: "Fälle", hinweis: "Sachverhalt lösen" },
  { id: "schema", label: "Schemata", hinweis: "Prüfungsschritte in Reihenfolge" },
  { id: "norm", label: "Normen", hinweis: "Was regelt § …?" },
  { id: "rs", label: "Rechtsstand 2026", hinweis: "Neue Zahlen und Normen" },
  { id: "eigen", label: "Eigene", hinweis: "Aus Lehrbuch und Fällen gesammelt" },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function kartenBauen({ gebiet, stufe, definitionen, probleme, faelle, rechtsstand, eigene, typen }) {
  const alle = [];
  const will = (t) => !typen || typen.includes(t);
  if (will("def") && definitionen) {
    for (const d of definitionen) if (d.gebiet === gebiet && d.stufe === stufe) alle.push({ id: `def:${d.id}`, typ: "def", frage: `Definiere: ${d.begriff}`, antwortHtml: `<p>${esc(d.satz)}</p>`, quelle: { titel: d.quelle.titel, route: null, fundstelle: d.quelle.id } });
  }
  if (will("problem") && probleme) {
    for (const p of probleme.probleme) if (p.gebiet === gebiet && p.stufe === stufe) alle.push({ id: `problem:${p.id}`, typ: "problem", frage: `Streitstand: ${p.titel}`, hinweis: "Welche Ansichten werden vertreten, welche Argumente tragen sie, wie ist zu entscheiden?", antwortHtml: p.html, quelle: { titel: p.bereich, route: { gebiet: p.gebiet, stufe: p.stufe, ansicht: "streit", id: p.id } } });
  }
  if (will("fall") && faelle) {
    for (const f of faelle.faelle) if (f.gebiet === gebiet && f.stufe === stufe) alle.push({ id: `fall:${f.id}`, typ: "fall", frage: `Fall: ${f.name}${f.thema ? " – " + f.thema : ""}`, frageHtml: f.teile.sachverhalt, antwortHtml: `${f.teile.loesung || ""}${f.teile.hinweis ? `<div class="kasten kasten--merke"><b>Examenshinweis</b>${f.teile.hinweis}</div>` : ""}`, quelle: { titel: f.teilName, route: { gebiet: f.gebiet, stufe: f.stufe, ansicht: "faelle", id: f.id } } });
  }
  if (will("schema")) {
    for (const s of SCHEMATA) if (s.gebiet === gebiet && s.stufe === stufe) alle.push({ id: `schema:${s.id}`, typ: "schema", frage: `Prüfungsschema: ${s.titel} (${s.norm})`, hinweis: "Nenne die Prüfungsschritte in der richtigen Reihenfolge.", antwortHtml: `<ol>${s.schritte.map((x) => `<li><strong>${esc(x.t)}</strong>${x.n ? ` – ${esc(x.n)}` : ""}${x.u ? `<ul>${x.u.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>` : ""}</li>`).join("")}</ol>${s.merke ? `<div class="kasten kasten--merke"><b>Merksatz</b><p>${esc(s.merke)}</p></div>` : ""}`, quelle: { titel: "Schemata", route: { gebiet: s.gebiet, stufe: s.stufe, ansicht: "schemata", id: s.id } } });
  }
  if (will("norm")) {
    for (const n of normenFuer(gebiet, stufe)) alle.push({ id: `norm:${n.norm}`, typ: "norm", frage: `Was regelt ${n.norm}?`, antwortHtml: `<p>${esc(n.inhalt)}</p>`, quelle: { titel: "Normen-Trainer", route: { global: "normen", id: n.norm.split(" ").slice(-1)[0] } } });
  }
  if (will("rs") && rechtsstand) {
    rechtsstand.sperrliste.forEach((z, i) => alle.push({ id: `rs:${i}`, typ: "rs", frage: `Rechtsstand 2026: ${z.bereich}`, hinweis: "Was gilt aktuell – und welcher Altstand darf nicht mehr verwendet werden?", antwortHtml: `<p><strong>Aktuell:</strong> ${esc(z.aktuell)}</p><p><strong>Nicht mehr:</strong> ${esc(z.alt)}</p>`, quelle: { titel: "Rechtsstand 2026", route: { global: "rechtsstand" } } }));
  }
  if (will("eigen") && eigene) {
    for (const k of eigene) if (k.gebiet === gebiet && k.stufe === stufe) alle.push({ ...k, typ: "eigen", ursprung: k.typ });
  }
  return alle;
}
