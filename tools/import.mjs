/* Importer: quelle/jura-gesamtwissen-2026.html → src/data/*.json

   Das Quellwerk ist ein Pandoc-Export mit neun Bänden. Dieses Skript zerlegt es
   in Kapitel, Abschnitte, Streitstände, Fälle, Lexikon, Normenregister und
   Rechtsstand, säubert die Orthographie (Umlaute), markiert Normzitate und
   erzeugt einen Suchindex sowie Definitionskandidaten.

   Aufruf: `npm run import` */

import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import { umlaute } from "./umlaute.mjs";
import { findeNormen, GESETZE, normSortierung } from "./normen.mjs";

const QUELLE = "quelle/jura-gesamtwissen-2026.html";
const ZIEL = "src/data";
fs.mkdirSync(ZIEL, { recursive: true });

const html = fs.readFileSync(QUELLE, "utf8");
const $ = cheerio.load(html, { decodeEntities: false });

/* ------------------------------------------------------------ Konfiguration */

const BAENDE = {
  1: { gebiet: "zivil", stufe: 1, kurz: "Zivilrecht", teile: [{ ab: 1, titel: "Grundband" }, { ab: 33, titel: "Vertiefung: Anspruchsgrundlagen, Schemata, Streitstände" }] },
  2: { gebiet: "oeff", stufe: 1, kurz: "Öffentliches Recht", teile: [{ ab: 1, titel: "Grundband" }, { ab: 25, titel: "Vertiefung: Schemata und Vollsystematik" }] },
  3: { gebiet: "straf", stufe: 1, kurz: "Strafrecht", teile: [{ ab: 1, titel: "Grundband" }, { ab: 28, titel: "Vertiefung: Examensmatrix" }] },
  4: { gebiet: "zivil", stufe: 2, kurz: "Zivilrecht", teile: [{ ab: 1, titel: "Grundband: Assessorklausur" }, { ab: 29, titel: "Vertiefung: Vollsystematik" }] },
  5: { gebiet: "oeff", stufe: 2, kurz: "Öffentliches Recht", teile: [{ ab: 1, titel: "Gerichtsklausur" }, { ab: 17, titel: "Anwaltsklausur" }, { ab: 20, titel: "Behördenklausur" }, { ab: 27, titel: "Besondere Rechtsgebiete" }, { ab: 31, titel: "Rechtsmittel, Fristen, Kosten" }, { ab: 36, titel: "Technik und Endkontrolle" }] },
  6: { gebiet: "straf", stufe: 2, kurz: "Strafrecht", teile: [{ ab: 1, titel: "Grundlagen und Aktenmethode" }, { ab: 5, titel: "Verfahrensfragen" }, { ab: 15, titel: "Anklageschrift" }, { ab: 25, titel: "Revisionsklausur" }, { ab: 60, titel: "Klausurfallen und Gesamtschemata" }] },
};

/* Band 8: Kapitel → Rechtsgebiet/Stufe */
const PROBLEM_KAPITEL = {
  2: ["zivil", 1], 3: ["zivil", 1], 4: ["zivil", 1], 5: ["zivil", 1], 6: ["zivil", 1], 7: ["zivil", 1],
  8: ["oeff", 1], 9: ["oeff", 1], 10: ["oeff", 1], 11: ["oeff", 1],
  12: ["straf", 1], 13: ["straf", 1], 14: ["straf", 1], 15: ["straf", 1],
  16: ["zivil", 2], 17: ["oeff", 2], 18: ["straf", 2],
};

const GEBIET_NAME = { zivil: "Zivilrecht", oeff: "Öffentliches Recht", straf: "Strafrecht" };

/* Gesetze je Rechtsgebiet für die Zuordnung von Fällen ohne feste Zuordnung */
const GEBIET_GESETZE = {
  zivil: ["BGB", "HGB", "ZPO", "GmbHG", "AktG", "KSchG", "BetrVG", "TzBfG", "AGG", "InsO", "ZVG", "RVG", "FamFG", "WEG", "ProdHaftG", "StVG", "UWG", "EGBGB", "Rom I-VO", "Rom II-VO", "Rom I", "Rom II", "ArbGG", "BUrlG", "EFZG", "PartGG", "UmwG", "GBO", "BeurkG", "VVG", "PflVG"],
  oeff: ["GG", "VwGO", "VwVfG", "BauGB", "BauNVO", "BVerfGG", "AEUV", "EUV", "GRCh", "PolG", "PAG", "ASOG", "HSOG", "SOG", "NPOG", "POG", "OBG", "BauO", "LBO", "BayBO", "GO", "GemO", "BayGO", "HGO", "NKomVG", "VwVG", "VwZG", "VersG", "GewO", "GastG", "BImSchG", "WHG", "BNatSchG", "EMRK", "StHG", "KAG", "BayVwVfG", "LVwVfG", "PolG NRW", "BauO NRW", "GO NRW", "GemO BW", "LBO BW", "IfSG", "AufenthG", "BPolG", "SchulG", "BBG", "BeamtStG"],
  straf: ["StGB", "StPO", "JGG", "OWiG", "BtMG", "WaffG", "BZRG", "StVollzG", "KCanG", "RiStBV", "StrEG", "EGStGB"],
};

/* ------------------------------------------------------------- Hilfsfunktionen */

const ws = (s) => s.replace(/\s+/g, " ").trim();

/* Redaktionelle Spuren des Quellabgleichs entfernen – das Produkt ist ein
   eigenständiges Lehrwerk. Rechtlich gemeinte „Plattform"-Begriffe
   (Verkaufsplattform, Plattformregeln) bleiben unberührt. */
const ERSETZUNGEN = [
  [/Die Plattform f(ue|ü)hrt/g, "Kursangebote führen"],
  [/Die Plattform enth(ae|ä)lt/g, "Kursangebote enthalten"],
  [/Die Plattform bildet/g, "Kursangebote bilden"],
  [/(Ä|Ae)ltere Plattformseiten/g, "Ältere Darstellungen"],
  [/(Ä|Ae)ltere Plattformfassungen/g, "Ältere Fassungen"],
  [/(Ä|Ae)ltere Plattformdarstellungen/g, "Ältere Darstellungen"],
  [/(Ä|Ae)ltere Plattformdarstellung/g, "Ältere Darstellung"],
  [/Die Plattformvorlage ist/g, "Ältere Vorlagen sind"],
  [/der im Plattformbestand gefundenen F(ae|ä)lle/g, "bekannter Übungsfälle"],
  [/die im Plattformabgleich als eigenst(ae|ä)ndige Klausurkerne aufgefallen sind/g, "die als eigenständige Klausurkerne gelten"],
  [/Die folgenden Plattformf(ae|ä)lle werden nicht nacherz(ae|ä)hlt/g, "Die folgenden klassischen Fälle werden nicht nacherzählt"],
  [/Klassiker, Plattformf(ae|ä)lle und Examenskombinationen/g, "Klassiker, Übungsfälle und Examenskombinationen"],
  [/ersetzt keinen Plattformfall/g, "ersetzt keinen Übungsfall"],
  [/im Fallledger nicht als eigener Plattformtreffer/g, "im Fallregister nicht als eigener Treffer"],
  [/Plattformkonstellationen/g, "Fallkonstellationen"],
  [/Die Plattformprobleme/g, "Die Problemkreise"],
  [/Historische Plattformfassungen/g, "Historische Kursfassungen"],
  [/(ae|ä)lterem Plattformmaterial/g, "älterem Kursmaterial"],
  [/im Plattformabgleich/g, "im Fallabgleich"],
  [/Plattformfall-Abwandlungen - ausf(ue|ü)hrlicher (ue|ü)bernommen/g, "Abwandlungen klassischer Fälle"],
  [/Weitere Vollf(ae|ä)lle aus dem Plattformabgleich/g, "Weitere Vollfälle und Examenskombinationen"],
  [/ - /g, " – "],
];

function text(s) {
  let t = umlaute(ws(s));
  for (const [re, ersatz] of ERSETZUNGEN) t = t.replace(re, ersatz);
  return t;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Normzitate in einem Textknoten markieren; liefert HTML und gefundene Normen. */
function markiere(t, sammler) {
  const treffer = findeNormen(t);
  if (!treffer.length) return esc(t);
  let aus = ""; let pos = 0;
  for (const tr of treffer) {
    aus += esc(t.slice(pos, tr.start));
    const keys = tr.normen.map((n) => n.key);
    for (const n of tr.normen) sammler.set(n.key, { ...n, zitat: tr.zitat });
    aus += `<span class="norm" data-n="${esc(keys.join(";"))}">${esc(tr.zitat)}</span>`;
    pos = tr.ende;
  }
  return aus + esc(t.slice(pos));
}

/* Ein Block (p, ul, ol, table, blockquote, h3) → gesäubertes HTML + Text. */
function block($el, sammler) {
  const $k = $el.clone();
  $k.find("colgroup, script, style").remove();
  for (const a of Object.keys($k[0].attribs || {})) delete $k[0].attribs[a];
  $k.find("*").each((_, e) => {
    const behalten = e.name === "a" ? ["href"] : [];
    for (const a of Object.keys(e.attribs || {})) if (!behalten.includes(a)) delete e.attribs[a];
  });
  /* interne Verweise auf Anker beibehalten, externe Links auflösen */
  $k.find("a").each((_, a) => {
    const href = $(a).attr("href") || "";
    if (href.startsWith("#")) { $(a).attr("data-ziel", href.slice(1)); $(a).removeAttr("href"); $(a).addClass("verweis"); }
    else $(a).replaceWith($(a).html());
  });
  const knoten = [];
  const laufen = (n) => { for (const c of n.childNodes || []) { if (c.type === "text") knoten.push(c); else if (c.name !== "code") laufen(c); } };
  laufen($k[0]);
  for (const k of knoten) {
    const roh = k.data || "";
    if (!roh.trim()) { k.data = roh.replace(/\s+/g, " "); continue; }
    const t = umlauteInline(roh);
    $(k).replaceWith(markiere(t, sammler));
  }
  /* Textknoten in <code> ebenfalls säubern */
  $k.find("code").each((_, c) => { $(c).text(ws($(c).text())); });
  const tag = $k[0].name;
  if (tag === "h3") return { html: `<h4>${$k.html()}</h4>`, text: text($k.text()) };
  if (tag === "table") return { html: `<div class="tabelle"><table>${$k.html()}</table></div>`, text: text($k.text()) };
  if (tag === "p" && !$k.html().trim()) return null;
  return { html: $.html($k), text: text($k.text()) };
}

/* Wie text(), aber Leerzeichen an den Rändern des Knotens erhalten (Inline-Kontext). */
function umlauteInline(roh) {
  const vorne = /^\s/.test(roh) ? " " : "";
  const hinten = /\s$/.test(roh) ? " " : "";
  return vorne + text(roh) + hinten;
}

/* Hinweis-/Rechtsstandskästen (p.note, div.auditbox, div.callout). */
const KASTEN_INTERN = /^(Lexikon-Audit|Abschlussstand|Fallabgleich|Sitemap-Auditstand|Fortschreibungsstand)/;
const aliase = {};
function kasten($el, sammler) {
  const $k = $el.clone();
  if ($k[0].name === "div" && !$k.children("p").length) $k.html(`<p>${$k.html()}</p>`);
  const $p = $k.children("p").first().length ? $k.children("p").first() : $k;
  let label = "";
  const $erst = $p.children().first();
  if ($erst.is("strong") && /:\s*$/.test($erst.text())) { label = text($erst.text()).replace(/:\s*$/, ""); $erst.remove(); }
  else {
    /* Kästen ohne <strong>: „Fortschreibungsstand 13. September 2026: …" */
    const erstText = ($p[0].childNodes || []).find((n) => n.type === "text");
    const m = erstText && /^\s*([A-ZÄÖÜ][^:]{3,70}):\s/.exec(erstText.data || "");
    if (m) { label = text(m[1]); erstText.data = erstText.data.replace(/^\s*[^:]+:\s/, ""); }
  }
  if (/^Plattform-Schreibalias/.test(label)) {
    for (const paar of $p.text().split(";")) { const m = /(.+?)\s*→\s*(.+)/.exec(paar); if (m) aliase[ws(m[1])] = ws(m[2]); }
    return null;
  }
  if (KASTEN_INTERN.test(label)) return null;
  const typ = /Merksatz|Leitgedanke|Faustregel/i.test(label) ? "merke"
    : /Rechtsstand|Aktualit|update|Stand|MoPeG|Rechtsmittelwerte|Elektronischer Rechtsverkehr|Beck-online|Namensrecht/i.test(label) ? "rechtsstand" : "hinweis";
  const teile = [];
  $k.children().each((_, c) => { const b = block($(c), sammler); if (b) teile.push(b); });
  if (!teile.length) { const b = block($k, sammler); if (b) teile.push(b); }
  const inner = teile.map((b) => b.html.replace(/^<p>\s*<\/p>$/, "")).join("");
  return { html: `<div class="kasten kasten--${typ}">${label ? `<b>${esc(label)}</b>` : ""}${inner}</div>`, text: (label ? label + ": " : "") + teile.map((b) => b.text).join(" "), label, typ };
}

const woerter = (t) => (t ? t.split(/\s+/).filter(Boolean).length : 0);
const minuten = (w) => Math.max(1, Math.round(w / 170));

/* ----------------------------------------------------------- Ereignisstrom */

const ereignisse = [];
let stand = "";
function sammle($root) {
  $root.children().each((_, el) => {
    const $e = $(el);
    const tag = el.name;
    if (!tag) return;
    if (tag === "section") { if ($e.hasClass("cover")) ereignisse.push({ typ: "cover", $e }); else sammle($e); return; }
    if (tag === "div" && $e.hasClass("searchbar")) return;
    if (tag === "header" || tag === "nav" || tag === "script" || tag === "hr") return;
    if (tag === "p" && $e.hasClass("master-meta")) { stand = text($e.text()); return; }
    if (tag === "h1") { ereignisse.push({ typ: "h1", text: text($e.text()), id: $e.attr("id") || "" }); return; }
    if (tag === "h2" || tag === "h3") { ereignisse.push({ typ: tag, text: text($e.text()), id: $e.attr("id") || "" }); return; }
    if (tag === "p" && $e.hasClass("note")) { ereignisse.push({ typ: "kasten", $e }); return; }
    if (tag === "div" && ($e.hasClass("auditbox") || $e.hasClass("callout"))) { ereignisse.push({ typ: "kasten", $e }); return; }
    if (["p", "ul", "ol", "table", "blockquote"].includes(tag)) { ereignisse.push({ typ: "block", $e }); return; }
    if (tag === "div") { sammle($e); }
  });
}
sammle($("body"));

/* In Bände aufteilen */
const baende = []; let aktuell = null;
for (const ev of ereignisse) {
  let neu = null;
  if (ev.typ === "cover") {
    const $h = ev.$e.find("h1").first();
    const m = /^Band (\d+)\s+[–-]\s+(.*)$/.exec(text($h.text()));
    neu = { nr: Number(m[1]), titel: m[2], untertitel: text(ev.$e.find("strong").first().text()), ereignisse: [] };
  } else if (ev.typ === "h1" && /^Band \d+/.test(ev.text)) {
    const m = /^Band (\d+)\s+[–-]\s+(.*)$/.exec(ev.text);
    neu = { nr: Number(m[1]), titel: m[2], untertitel: "", ereignisse: [] };
  } else if (ev.typ === "h1" && /^Ergänzung/.test(ev.text)) {
    neu = { nr: 8, titel: "", vorwortNur: true, ereignisse: [] };
  }
  if (neu) {
    if (aktuell && aktuell.vorwortNur && neu.nr === 8) { neu.vorwort = aktuell.ereignisse; }
    else if (aktuell && !aktuell.vorwortNur) baende.push(aktuell);
    aktuell = neu; continue;
  }
  if (aktuell) aktuell.ereignisse.push(ev);
}
if (aktuell && !aktuell.vorwortNur) baende.push(aktuell);
console.log("Bände:", baende.map((b) => `${b.nr}:${b.ereignisse.length}`).join(" "));

/* ----------------------------------------------------- Kapitel/Abschnitte */

const anker = {}; /* Original-Anker → Route */
const suche = [];
const normIndex = new Map(); /* key → { gesetz, nr, art, zitate:Set, fundstellen:[] } */
const alleTexte = []; /* für Definitionen: { id, titel, pfad, text } */
let rechtsstandKaesten = [];

function normenAufnehmen(sammler, fundstelle) {
  const keys = [];
  for (const [key, n] of sammler) {
    keys.push(key);
    let e = normIndex.get(key);
    if (!e) { e = { key, gesetz: n.gesetz, nr: n.nr, art: n.art, zitate: new Set(), fundstellen: [] }; normIndex.set(key, e); }
    e.zitate.add(n.zitat);
    if (!e.fundstellen.some((f) => f.id === fundstelle.id)) e.fundstellen.push(fundstelle);
  }
  return keys;
}

function kapitelAusEreignissen(band, evs, cfg) {
  const kapitel = [];
  let kap = null; let abs = null;
  const abschliessen = () => { if (abs) { kap.abschnitte.push(abs); abs = null; } };
  const neuerAbschnitt = (nr, titel, id) => { abschliessen(); abs = { nr, titel, anker: id, bloecke: [], sammler: new Map() }; };
  for (const ev of evs) {
    if (ev.typ === "h1") {
      abschliessen();
      const m = /^(\d+[a-z]?)\.\s+(.*)$/.exec(ev.text);
      kap = { nr: m ? m[1] : "", titel: m ? m[2] : ev.text, anker: ev.id, abschnitte: [] };
      kapitel.push(kap);
      neuerAbschnitt("", "Überblick", ev.id);
      continue;
    }
    if (!kap) continue;
    if (ev.typ === "h2") {
      const m = /^(\d+[a-z]?\.\d+[a-z]?)\s+(.*)$/.exec(ev.text);
      neuerAbschnitt(m ? m[1] : "", m ? m[2] : ev.text, ev.id);
      continue;
    }
    if (ev.typ === "h3") { abs.bloecke.push({ html: `<h4>${esc(ev.text)}</h4>`, text: ev.text }); continue; }
    if (ev.typ === "kasten") { const k = kasten(ev.$e, abs.sammler); if (k) { abs.bloecke.push(k); if (k.typ === "rechtsstand") rechtsstandKaesten.push({ ...k, quelle: null, kapitel: kap }); } continue; }
    if (ev.typ === "block") { const b = block(ev.$e, abs.sammler); if (b) abs.bloecke.push(b); }
  }
  abschliessen();
  /* Leere Überblicke entfernen, Abschnitte nach Nummer ordnen (14.2a vor 14.3), IDs vergeben */
  const nrKey = (nr) => { const m = /^(\d+[a-z]?)\.(\d+)([a-z]?)$/.exec(nr); return m ? [parseInt(m[2], 10), m[3] || ""] : [-1, ""]; };
  for (const k of kapitel) {
    k.abschnitte = k.abschnitte.filter((a) => a.bloecke.length);
    k.abschnitte.sort((a, b) => { const [na, sa] = nrKey(a.nr); const [nb, sb] = nrKey(b.nr); return na !== nb ? na - nb : sa.localeCompare(sb); });
    k.id = `b${band.nr}-k${k.nr}`;
    const teil = [...cfg.teile].reverse().find((t) => parseInt(k.nr, 10) >= t.ab);
    k.teil = teil ? teil.titel : cfg.teile[0].titel;
    k.abschnitte.forEach((a, i) => {
      a.id = `${k.id}-${i}`;
      a.html = a.bloecke.map((b) => b.html).join("\n");
      a.text = a.bloecke.map((b) => b.text).join(" ");
      a.woerter = woerter(a.text);
      a.minuten = minuten(a.woerter);
      const pfad = `${GEBIET_NAME[cfg.gebiet]} · ${cfg.stufe}. Examen · ${k.nr ? k.nr + ". " : ""}${k.titel}`;
      a.normen = normenAufnehmen(a.sammler, { id: a.id, typ: "abschnitt", t: `${k.nr}. ${k.titel} › ${a.nr ? a.nr + " " : ""}${a.titel}` });
      anker[a.anker] = { typ: "abschnitt", id: a.id, band: band.nr };
      suche.push({ id: a.id, typ: "abschnitt", gebiet: cfg.gebiet, stufe: cfg.stufe, band: band.nr, kapitel: k.id, titel: `${a.nr ? a.nr + " " : ""}${a.titel}`, pfad, text: a.text });
      alleTexte.push({ id: a.id, titel: a.titel, pfad, text: a.text, gebiet: cfg.gebiet, stufe: cfg.stufe });
      delete a.bloecke; delete a.sammler;
    });
    k.woerter = k.abschnitte.reduce((s, a) => s + a.woerter, 0);
    k.minuten = k.abschnitte.reduce((s, a) => s + a.minuten, 0);
    anker[k.anker] = { typ: "kapitel", id: k.id, band: band.nr };
  }
  return kapitel;
}

const werk = { stand, baende: [], gesetze: GESETZE };

for (const band of baende.filter((b) => BAENDE[b.nr])) {
  const cfg = BAENDE[band.nr];
  const kapitel = kapitelAusEreignissen(band, band.ereignisse, cfg);
  const id = `b${band.nr}`;
  fs.writeFileSync(path.join(ZIEL, `band-${band.nr}.json`), JSON.stringify({ id, kapitel: kapitel.map((k) => ({ id: k.id, nr: k.nr, titel: k.titel, abschnitte: k.abschnitte.map((a) => ({ id: a.id, nr: a.nr, titel: a.titel, html: a.html, normen: a.normen })) })) }));
  werk.baende.push({
    id, nr: band.nr, titel: band.titel, untertitel: band.untertitel, gebiet: cfg.gebiet, stufe: cfg.stufe, kurz: cfg.kurz, teile: cfg.teile,
    kapitel: kapitel.map((k) => ({ id: k.id, nr: k.nr, titel: k.titel, teil: k.teil, woerter: k.woerter, minuten: k.minuten, abschnitte: k.abschnitte.map((a) => ({ id: a.id, nr: a.nr, titel: a.titel, minuten: a.minuten, woerter: a.woerter })) })),
  });
  console.log(`Band ${band.nr}: ${kapitel.length} Kapitel, ${kapitel.reduce((s, k) => s + k.abschnitte.length, 0)} Abschnitte, ${kapitel.reduce((s, k) => s + k.woerter, 0)} Wörter`);
}

/* ------------------------------------------------------------- Band 8: Probleme */

const band8 = baende.find((b) => b.nr === 8);
const probleme = []; let fallkerne = []; let problemeVorwort = "";
{
  let kapNr = 0; let kapTitel = ""; let prob = null; let vorwortTeile = [];
  const abschliessen = () => { if (prob) { probleme.push(prob); prob = null; } };
  const evs = [...(band8.vorwort || []), ...band8.ereignisse];
  for (const ev of evs) {
    if (ev.typ === "h1") {
      abschliessen();
      const m = /^(\d+)\.\s+(.*)$/.exec(ev.text);
      kapNr = m ? Number(m[1]) : 0; kapTitel = m ? m[2] : ev.text;
      continue;
    }
    if (ev.typ === "h2" && PROBLEM_KAPITEL[kapNr]) {
      abschliessen();
      const m = /^(\d+\.\d+)\s+(.*)$/.exec(ev.text);
      const [gebiet, stufe] = PROBLEM_KAPITEL[kapNr];
      prob = { id: `p-${(m ? m[1] : ev.text).replace(".", "-")}`, nr: m ? m[1] : "", titel: m ? m[2] : ev.text, anker: ev.id, gebiet, stufe, bereich: kapTitel.replace(/\s+–\s+Einzelprobleme$/, "").replace(/\s+–\s+Problemseitenabgleich$/, " (2. Examen)"), bloecke: [], sammler: new Map() };
      continue;
    }
    if (ev.typ === "kasten") { if (prob) { const k = kasten(ev.$e, prob.sammler); if (k) prob.bloecke.push(k); } continue; }
    if (ev.typ === "block") {
      if (prob) { const b = block(ev.$e, prob.sammler); if (b) prob.bloecke.push(b); }
      else if (kapNr === 19) { const b = block(ev.$e, new Map()); if (b) fallkerne.push(b.text); }
      else if (kapNr === 0 || kapNr === 1) { const b = block(ev.$e, new Map()); if (b) vorwortTeile.push(b.html); }
    }
  }
  abschliessen();
  problemeVorwort = vorwortTeile.join("\n");
  for (const p of probleme) {
    p.html = p.bloecke.map((b) => b.html).join("\n");
    p.text = p.bloecke.map((b) => b.text).join(" ");
    p.woerter = woerter(p.text);
    const pfad = `${GEBIET_NAME[p.gebiet]} · Streitstände · ${p.bereich}`;
    p.normen = normenAufnehmen(p.sammler, { id: p.id, typ: "problem", t: `Streitstand ${p.nr} ${p.titel}` });
    anker[p.anker] = { typ: "problem", id: p.id };
    suche.push({ id: p.id, typ: "problem", gebiet: p.gebiet, stufe: p.stufe, titel: p.titel, pfad, text: p.text });
    alleTexte.push({ id: p.id, titel: p.titel, pfad, text: p.text, gebiet: p.gebiet, stufe: p.stufe });
    delete p.bloecke; delete p.sammler;
  }
  /* Fallkerne: „Anker: Beschreibung." */
  const kerne = [];
  for (const t of fallkerne) {
    if (!/:/.test(t) || /^Die folgenden/.test(t)) continue;
    for (const st of t.split(/\.\s+(?=[A-ZÄÖÜ„][^:]{2,90}:\s)/)) {
      const m = /^(.+?):\s+(.+?)\.?$/.exec(st.trim());
      if (m) kerne.push({ anker: m[1].trim(), problem: m[2].trim() });
    }
  }
  fallkerne = kerne;
  console.log(`Band 8: ${probleme.length} Streitstände, ${fallkerne.length} Fallkerne`);
}

/* -------------------------------------------------------------- Band 9: Fälle */

const band9 = baende.find((b) => b.nr === 9);
const faelle = []; let faelleHinweis = ""; let faelleMatrix = [];
{
  const TEIL_NAMEN = { A: "Zivilrechtliche Standardfälle", B: "Öffentlich-rechtliche Standardfälle", C: "Strafrechtliche Standardfälle", D: "Fälle des 2. Staatsexamens", E: "Weitere klassische Fallanker" };
  const PART = { Sachverhalt: "sachverhalt", Aktenkern: "sachverhalt", Kernfragen: "kernfragen", Bearbeitungsschwerpunkte: "kernfragen", "Lösungsskizze": "loesung", Examenshinweis: "hinweis" };
  let teil = ""; let kapNr = 0; let kapTitel = ""; let fall = null; let part = null; const hinweisTeile = []; const matrix = [];
  const abschliessen = () => { if (fall) { faelle.push(fall); fall = null; part = null; } };
  for (const ev of band9.ereignisse) {
    if (ev.typ === "h1") {
      abschliessen();
      const mt = /^Teil ([A-E])\s+[–-]\s+(.*)$/.exec(ev.text);
      if (mt) { teil = mt[1]; kapNr = 0; kapTitel = ""; continue; }
      const m = /^(\d+)\.\s+(.*)$/.exec(ev.text);
      kapNr = m ? Number(m[1]) : 0; kapTitel = m ? m[2] : ev.text;
      if (kapNr >= 78) teil = "F";
      continue;
    }
    if (ev.typ === "h2") {
      abschliessen();
      const m = /^(\d+(?:\.\d+)?)\.?\s+(.*)$/.exec(ev.text);
      if (!m) continue;
      if (teil === "E") { /* Fallmatrix-Tabellen (Fallanker → Konstellation → Themen) */
        const g = /Zivil/.test(m[2]) ? "zivil" : /Straf/.test(m[2]) ? "straf" : "oeff";
        matrix.push({ titel: m[2], gebiet: g, zeilen: [] });
        continue;
      }
      if (kapNr && ![80, 81].includes(kapNr)) continue; /* Textkapitel 78/79/82 */
      const nr = m[1]; const voll = m[2];
      let name = voll; let thema = ""; let ankerName = "";
      const mp = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(voll);
      if (mp) { name = mp[1]; ankerName = mp[2]; }
      const mm = /^(.*?)\s+–\s+(.*)$/.exec(name);
      if (mm) { name = mm[1]; thema = mm[2]; }
      const ma = /^(.*?)-(Muster|Vertiefung|Konstellation)(\s.*)?$/.exec(thema);
      if (!ankerName && ma) ankerName = ma[1];
      fall = { id: `f-${nr.replace(".", "-")}`, nr, name, thema, anker: ankerName, ankerId: ev.id, teil, teilName: teil === "F" ? kapTitel : TEIL_NAMEN[teil], art: "fall", teile: {}, sammler: new Map(), reihenfolge: [] };
      part = null; continue;
    }
    if (!fall) {
      if (ev.typ === "block" && kapNr === 1) { const b = block(ev.$e, new Map()); if (b) hinweisTeile.push(b.html); }
      if (ev.typ === "block" && teil === "E" && matrix.length && ev.$e[0].name === "table") {
        ev.$e.find("tbody tr").each((_, tr) => {
          const z = $(tr).find("td").map((__, td) => text($(td).text())).get();
          if (z.length >= 3) matrix[matrix.length - 1].zeilen.push({ anker: z[0].replace(/^„|“$/g, ""), konstellation: z[1], themen: z[2] });
        });
      }
      continue;
    }
    if (ev.typ === "h3") {
      part = PART[ev.text] || null;
      if (ev.text === "Aktenkern") fall.art = "akte";
      if (part && !fall.teile[part]) { fall.teile[part] = []; fall.reihenfolge.push(part); }
      continue;
    }
    if (ev.typ === "kasten") { const k = kasten(ev.$e, fall.sammler); if (k && part) fall.teile[part].push(k); continue; }
    if (ev.typ === "block") {
      const b = block(ev.$e, fall.sammler); if (!b) continue;
      if (!part) { part = "sachverhalt"; if (!fall.teile[part]) { fall.teile[part] = []; fall.reihenfolge.push(part); } }
      fall.teile[part].push(b);
    }
  }
  abschliessen();
  faelleHinweis = hinweisTeile.join("\n");
  faelleMatrix = matrix;

  const zaehleGesetze = (keys, liste) => keys.filter((k) => liste.includes(k.split(" ")[0]) || liste.some((g) => k.startsWith(g + " "))).length;
  for (const f of faelle) {
    const alle = Object.values(f.teile).flat();
    f.text = alle.map((b) => b.text).join(" ");
    f.woerter = woerter(f.text);
    f.normen = normenAufnehmen(f.sammler, { id: f.id, typ: "fall", t: `Fall ${f.nr} ${f.name}` });
    for (const p of Object.keys(f.teile)) f.teile[p] = f.teile[p].map((b) => b.html).join("\n");
    /* Rechtsgebiet: Teil A–C fest; sonst nach zitierten Gesetzen */
    const fest = { A: "zivil", B: "oeff", C: "straf" }[f.teil];
    if (fest) f.gebiet = fest;
    else {
      const punkte = Object.fromEntries(Object.entries(GEBIET_GESETZE).map(([g, l]) => [g, zaehleGesetze(f.normen, l)]));
      const best = Object.entries(punkte).sort((a, b) => b[1] - a[1])[0];
      f.gebiet = best && best[1] > 0 ? best[0] : "zivil";
      if (best && best[1] === 0) {
        const t = (f.name + " " + f.thema + " " + f.text).toLowerCase();
        if (/strafbar|angeklagt|staatsanwalt|täter|revision|anklage/.test(t)) f.gebiet = "straf";
        else if (/verwaltung|behörde|grundrecht|gemeinde|bescheid|polizei|bauamt/.test(t)) f.gebiet = "oeff";
      }
    }
    const t2 = `${f.name} ${f.thema}`;
    f.stufe = f.teil === "D" || f.art === "akte" || /Urteil|Anklage|Revision|Bescheid|Klageschrift|Relation|Tenor|Assessor|Aktenvortrag|Schriftsatz|Zwangsvollstreckung|Vollstreckungsabwehr|Kostenfestsetzung|Behördenklausur|Widerspruchsbescheid|Antragsschrift|Einspruch|Berufung|Mandant|Anwaltsklausur|Gerichtsklausur|Staatsanwaltschaft|Zivilstation|Strafstation|Verwaltungsstation/.test(t2) ? 2 : 1;
    const pfad = `${GEBIET_NAME[f.gebiet]} · Fälle · ${f.teilName}`;
    anker[f.ankerId] = { typ: "fall", id: f.id };
    suche.push({ id: f.id, typ: "fall", gebiet: f.gebiet, stufe: f.stufe, titel: `${f.name}${f.thema ? " – " + f.thema : ""}`, pfad, text: f.text });
    delete f.sammler; delete f.ankerId;
  }
  console.log(`Band 9: ${faelle.length} Fälle (${faelle.filter((f) => f.stufe === 2).length} für das 2. Examen); Gebiete:`, Object.entries(faelle.reduce((a, f) => (a[f.gebiet] = (a[f.gebiet] || 0) + 1, a), {})));
}

/* -------------------------------------------------- Band 7: Lexikon, Normen, Rechtsstand */

const band7 = baende.find((b) => b.nr === 7);
const lexikon = { buchstaben: {}, aliase: {} };
const normenGelistet = {};
const rechtsstand = { stand, abschnitte: [] };
{
  let kapNr = 0; let buchstabe = ""; let gesetz = ""; let rs = null;
  for (const ev of band7.ereignisse) {
    if (ev.typ === "h1") { const m = /^(\d+)\.\s+(.*)$/.exec(ev.text); kapNr = m ? Number(m[1]) : 0; buchstabe = ""; gesetz = ""; if (rs) { rechtsstand.abschnitte.push(rs); rs = null; } continue; }
    if (kapNr === 4) {
      if (ev.typ === "h2") { buchstabe = ev.text.trim(); lexikon.buchstaben[buchstabe] = lexikon.buchstaben[buchstabe] || []; continue; }
      if (ev.typ === "kasten") { kasten(ev.$e, new Map()); continue; }
      if (ev.typ === "block" && buchstabe) { const t = text(ev.$e.text()); for (const b of t.split(";")) { const s = b.trim().replace(/\.$/, ""); if (s) lexikon.buchstaben[buchstabe].push(s); } }
      continue;
    }
    if (kapNr === 5) {
      if (ev.typ === "h2") { gesetz = ev.text.trim(); normenGelistet[gesetz] = []; continue; }
      if (ev.typ === "block" && gesetz) { const t = text(ev.$e.text()); for (const b of t.split(";")) { const s = b.trim().replace(/\.$/, ""); if (s) normenGelistet[gesetz].push(s); } }
      continue;
    }
    if (kapNr === 9) {
      if (ev.typ === "h2") {
        if (rs) rechtsstand.abschnitte.push(rs);
        const m = /^(\d+\.\d+)\s+(.*)$/.exec(ev.text);
        rs = { id: `rs-${m ? m[1].replace(".", "-") : rechtsstand.abschnitte.length}`, titel: m ? m[2] : ev.text, bloecke: [], sammler: new Map() };
        continue;
      }
      const ziel = rs || (rs = { id: "rs-0", titel: "Endabgleich 2026", bloecke: [], sammler: new Map() });
      if (ev.typ === "kasten") { const k = kasten(ev.$e, ziel.sammler); if (k) ziel.bloecke.push(k); continue; }
      if (ev.typ === "block") { const b = block(ev.$e, ziel.sammler); if (b) ziel.bloecke.push(b); }
    }
  }
  if (rs) rechtsstand.abschnitte.push(rs);
  lexikon.aliase = aliase;
  /* Nur fachlich relevante Rechtsstands-Abschnitte veröffentlichen (kein URL-/Blog-Kontrollstand). */
  rechtsstand.abschnitte = rechtsstand.abschnitte.filter((a) => !/URL|Blogabgleich|Archivseiten/.test(a.titel));
  for (const a of rechtsstand.abschnitte) {
    a.html = a.bloecke.map((b) => b.html).join("\n"); a.text = a.bloecke.map((b) => b.text).join(" ");
    a.normen = normenAufnehmen(a.sammler, { id: a.id, typ: "rechtsstand", t: `Rechtsstand 2026 › ${a.titel}` });
    suche.push({ id: a.id, typ: "rechtsstand", gebiet: "alle", stufe: 0, titel: a.titel, pfad: "Rechtsstand 2026", text: a.text });
    delete a.bloecke; delete a.sammler;
  }
  /* Rechtsstandskästen aus den Fachbänden als Sammlung anhängen */
  rechtsstand.hinweise = rechtsstandKaesten.map((k) => ({ label: k.label, html: k.html, kapitel: k.kapitel ? { id: k.kapitel.id, titel: `${k.kapitel.nr}. ${k.kapitel.titel}` } : null }));
  /* Sperrliste (Tabelle) als Datensatz für den Rechtsstands-Trainer */
  const sperr = rechtsstand.abschnitte.find((a) => /Sperrliste/.test(a.titel));
  rechtsstand.sperrliste = [];
  if (sperr) {
    const $t = cheerio.load(sperr.html);
    $t("tbody tr").each((_, tr) => { const z = $t(tr).find("td").map((__, td) => $t(td).text().trim()).get(); if (z.length >= 3) rechtsstand.sperrliste.push({ bereich: z[0], aktuell: z[1], alt: z[2] }); });
  }
  console.log(`Band 7: Lexikon ${Object.values(lexikon.buchstaben).flat().length} Begriffe, ${Object.keys(aliase).length} Aliase; Normen gelistet ${Object.values(normenGelistet).flat().length}; Rechtsstand ${rechtsstand.abschnitte.length} Abschnitte, ${rechtsstand.sperrliste.length} Sperrlisten-Zeilen, ${rechtsstand.hinweise.length} Kästen`);
}

/* ---------------------------------------------------------------- Normenregister */

const gesetzeMap = new Map();
for (const e of normIndex.values()) {
  let g = gesetzeMap.get(e.gesetz);
  if (!g) { g = { kurz: e.gesetz, name: GESETZE[e.gesetz] || e.gesetz, normen: [] }; gesetzeMap.set(e.gesetz, g); }
  g.normen.push({ key: e.key, nr: e.nr, art: e.art, zitate: [...e.zitate].slice(0, 6), fundstellen: e.fundstellen.slice(0, 40), anzahl: e.fundstellen.length });
}
const normen = { gesetze: [...gesetzeMap.values()].map((g) => ({ ...g, normen: g.normen.sort(normSortierung) })).sort((a, b) => b.normen.length - a.normen.length) };
console.log(`Normenregister: ${normen.gesetze.length} Gesetze, ${normIndex.size} Einzelnormen`);

/* ------------------------------------------------------------------ Definitionen */

const begriffe = new Set(Object.values(lexikon.buchstaben).flat().map((b) => b.toLowerCase()));
const definitionen = [];
{
  const gesehen = new Map();
  const VERB = "(ist|sind|liegt vor, wenn|liegen vor, wenn|bedeutet|setzt voraus|setzen voraus|meint|bezeichnet|verlangt|erfasst|umfasst|besteht, wenn|ist gegeben, wenn)";
  const re1 = new RegExp(`^(?:Der|Die|Das|Ein|Eine|Eine?r|Als)\\s+([A-ZÄÖÜ][\\wäöüß\\-]+(?:\\s+(?:[a-zäöüß\\-]+|[A-ZÄÖÜ][\\wäöüß\\-]+)){0,3}?)\\s+${VERB}\\b`);
  const re2 = new RegExp(`^([A-ZÄÖÜ][\\wäöüß\\-]+(?:\\s+[a-zäöüß\\-]+){0,2})\\s+${VERB}\\b`);
  const re3 = /^Unter\s+(?:der|dem|einer|einem)?\s*(.+?)\s+versteht man/;
  const SCHLECHT = /\b(ist|sind)\s+(zu|nicht|dann|hier|dabei|deshalb|daher|jedoch|aber|also|erst|noch|bereits|damit|somit|insoweit|streitig|umstritten|zwischen|nach|bei|im|in|auf|für|vor|ohne|mit|von|aus|so|es|er|sie|die|der|das|ein|eine)\b/;
  const AUSSCHLUSS = /^(Die Klausur|Der Fall|Die Lösung|Das Schema|Die Plattform|Die Prüfung|Das Gericht|Die Frage|Der Bearbeiter|Die Reihenfolge|Der Aufbau|Die Darstellung|Das Werk|Dieser Band|Diese|Dieses|Dieser|Das Kapitel|Die Fälle|Der Band|Der Streit|Die Antwort|Das Ergebnis|Die Folge|Kursangebote|Die Norm|Das Urteil|Ein Urteil)/;
  const GENERISCH = new Set(["dies", "das", "es", "maßgeblich", "abzugrenzen", "ausgangspunkt", "norm", "entscheidend", "erforderlich", "umstritten", "streitig", "wichtig", "problematisch", "fraglich", "zulässig", "unzulässig", "anders", "ebenso", "gleiches", "hier", "dort", "daneben", "ferner", "zudem", "weiter", "schließlich", "folge", "ergebnis", "grund", "frage", "antwort", "ziel", "zweck", "beispiel", "ausnahme", "regel", "prüfung", "aufbau", "schema", "klausur", "fall", "lösung", "kernfrage", "examenshinweis", "sachverhalt", "bearbeiter", "kandidat", "urteil", "voraussetzung", "voraussetzungen", "praxis", "typisch", "klausurtechnik", "prüfungsfolge", "hinweis", "merksatz", "faustregel", "lernziel", "systematik", "wichtiger", "zentral", "kern", "gegenstand", "zunächst", "einzelfall", "rechtswidrig", "besonders umstritten", "rechtsprechung", "herrschende meinung", "gegenansicht", "mindermeinung", "literatur", "praktisch", "häufig", "umgekehrt", "beispielsweise", "insbesondere"]);
  const ABK = /\b(bzw|z\.\s?B|ggf|vgl|u\.\s?a|i\.\s?V\.\s?m|Abs|Nr|S|Art|ff|f|sog|etc|usw|d\.\s?h|Rn|Hs|Alt|insb|Var|lit|Ziff|str|h\.\s?M|a\.\s?A|m\.\s?w\.\s?N|Urt|Beschl|v|Az|ca|Std|Min|St|Mio|Mrd|EUR|Nrn|Halbs|i\.\s?S\.\s?d|i\.\s?S\.\s?v|a\.\s?F|n\.\s?F|c\.\s?i\.\s?c|i\.\s?e\.\s?S|i\.\s?w\.\s?S|p\.\s?V\.\s?V|e\.\s?V|GmbH \& Co)\./g;
  const saetzeVon = (t) => t.replace(ABK, (m) => m.replace(/\./g, "․")).split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ„(])/).map((s) => s.replace(/․/g, "."));
  for (const q of alleTexte) {
    const saetze = saetzeVon(q.text);
    for (const s0 of saetze) {
      const s = s0.trim();
      if (s.length < 45 || s.length > 420 || AUSSCHLUSS.test(s) || /^\d/.test(s)) continue;
      let m = re3.exec(s) || re1.exec(s) || re2.exec(s);
      if (!m) continue;
      if (/…|\bweil\b|\bregelmäßig nur\b|\bnur erfolgreich\b/.test(s)) continue;
      let begriff = m[1].replace(/^(der|die|das|ein|eine)\s+/i, "").trim();
      const kern = begriff.toLowerCase();
      if (GENERISCH.has(kern) || /^(dies|das|es)\b/i.test(kern)) continue;
      if (/^(dann|danach|sodann|hier|dort|damit|daher|deshalb|insoweit|ferner|zudem|außerdem|dabei|dagegen|demgegenüber|allerdings|jedoch|ebenso|gleichwohl|vielmehr|stattdessen|letztlich|zugleich|auch|nur|erst|noch|heute|seit|nach|vor|bei|wer|was|wie|wo|wann|warum|ob|denn|aber|also|somit|hingegen|zwar|freilich|immerhin|ohnehin|nunmehr|nun|jetzt|weiter|weiterhin|überdies|hinzu|schon|bereits|selbst|sogar|gerade|eben|etwa|ungefähr|meist|meistens|oft|häufig|selten|stets|immer|nie|niemals|kaum|wohl|sicher|gewiss|offenbar|anscheinend|angeblich|vermutlich|wahrscheinlich|möglicherweise)$/.test(kern)) continue;
      const nomenartig = /(ung|heit|keit|schaft|recht|pflicht|anspruch|klage|tat|delikt|vertrag|erklärung|gesetz|verfahren|urteil|beschluss|bescheid|akt|frist|grund|prinzip|theorie|lehre|tum|nis|ion|ität|ismus|ent|ant|mann|schuld|besitz|eigentum|gewalt|macht|wille|rüge|revision|haft|zeuge|täter|teilnahme|versuch|irrtum|vorsatz|schaden|ersatz|gebot|verbot|glaube|erwerb|verlust|nahme|gabe|leistung|zahlung|setzung|kündigung|rücktritt|anfechtung|einrede|einwendung|garantie|bürgschaft|hypothek|grundschuld|vormerkung|mangel|kondiktion|bereicherung|verfügung|übereignung|übergabe|abtretung|aufrechnung|erfüllung|erlass|vergleich|nötigung|drohung|täuschung|wegnahme|zueignung|absicht|kausalität|zurechnung|notwehr|notstand|einwilligung|anstiftung|beihilfe|beteiligung|konkurrenz|urkunde|betrug|diebstahl|raub|erpressung|untreue|hehlerei|begünstigung|vereitelung|beleidigung|körperverletzung|tötung|mord|totschlag|brandstiftung|vollrausch|sache|gefahr|störer|stellung|organ|rubrum|tenor|tatbestand|gründe|beweis|antrag|widerspruch|einspruch|berufung|beschwerde|erinnerung|vollstreckung|pfändung|titel|klausel|zustellung|kosten|streitwert|hilfe|anklage|verteidigung|hauptverhandlung|protokoll|zuständigkeit|rechtsweg|statthaftigkeit|befugnis|interesse|bedürfnis|verwaltungsakt|ermessen|verhältnismäßigkeit|schutzbereich|eingriff|schranke|schranken|vorbehalt|kompetenz|organ|gemeinde|behörde|polizei|gericht|partei|kläger|beklagter|erbe|erblasser|ehegatte|kind|vertreter|bote|geschäft|angebot|annahme|zugang|abgabe|dissens|bedingung|befristung|form|vollmacht|prokura|kaufmann|firma|gesellschaft|gesellschafter|arbeitnehmer|arbeitgeber|werk|miete|darlehen|schenkung|leihe|auftrag|vermächtnis|pflichtteil|testament|erbschein|nachlass)$/i;
      const stark = /liegt vor, wenn|liegen vor, wenn|versteht man|bedeutet|ist gegeben, wenn|besteht, wenn|setzt voraus|\b(ist|sind) (ein|eine|jede|jeder|jedes|derjenige|diejenige|dasjenige|wer|jedes?|die|der|das) [a-zäöüß]/.test(s);
      const imLexikon = begriffe.has(kern) || [...begriffe].some((b) => b.length > 6 && (kern === b || kern.startsWith(b + " ") || b.startsWith(kern + " ")));
      if (!imLexikon && !nomenartig.test(kern)) continue;
      /* Adjektive und Adverbien sind keine Begriffe („Regelmäßig sind …", „Überzeugend ist …") */
      if (!begriffe.has(kern) && /(lich|ig|isch|end|sam|bar|los|voll)$/i.test(kern)) continue;
      if (!stark && !imLexikon) continue;
      if (!stark && SCHLECHT.test(s)) continue;
      if (begriff.split(" ").length > 5 || begriff.length < 4) continue;
      const anzahl = gesehen.get(kern) || 0;
      if (anzahl >= 2) continue;
      gesehen.set(kern, anzahl + 1);
      definitionen.push({ id: `d-${definitionen.length + 1}`, begriff, satz: s, quelle: { id: q.id, titel: q.titel, pfad: q.pfad }, gebiet: q.gebiet, stufe: q.stufe });
    }
  }
  console.log(`Definitionen: ${definitionen.length}`);
}

/* --------------------------------------------------------------------- Schreiben */

const schreibe = (name, daten) => { const p = path.join(ZIEL, name); fs.writeFileSync(p, JSON.stringify(daten)); console.log(`  ${name}: ${(fs.statSync(p).size / 1024).toFixed(0)} KB`); };

werk.anker = anker;
werk.zaehler = {
  kapitel: werk.baende.reduce((s, b) => s + b.kapitel.length, 0),
  abschnitte: werk.baende.reduce((s, b) => s + b.kapitel.reduce((x, k) => x + k.abschnitte.length, 0), 0),
  woerter: werk.baende.reduce((s, b) => s + b.kapitel.reduce((x, k) => x + k.woerter, 0), 0),
  probleme: probleme.length, faelle: faelle.length, definitionen: definitionen.length, normen: normIndex.size, begriffe: begriffe.size,
};
schreibe("werk.json", werk);
schreibe("probleme.json", { vorwort: problemeVorwort, probleme: probleme.map(({ anker: _a, ...p }) => p), fallkerne });
schreibe("faelle.json", { hinweis: faelleHinweis, matrix: faelleMatrix, faelle: faelle.map(({ reihenfolge, ...f }) => ({ ...f, reihenfolge })) });
schreibe("lexikon.json", lexikon);
schreibe("normen.json", normen);
schreibe("rechtsstand.json", rechtsstand);
schreibe("suche.json", suche);
schreibe("definitionen.json", definitionen);
console.log("Zähler:", werk.zaehler);
