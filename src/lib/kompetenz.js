/* Beherrschungsgrad je Kompetenzknoten.

   Ein Prozentbalken „73 % Zivilrecht" sagt nichts. Er misst, wie viel man
   abgehakt hat, nicht was man kann. Dieses Modul rechnet stattdessen pro
   Kompetenz (Stellvertretung, objektive Zurechnung, Revisionsrüge …) einen
   Beherrschungsgrad aus vier unabhängigen Nachweisen:

     Verstehen  – die zugehörigen Abschnitte sind gelesen
     Anwenden   – die zugehörigen Fälle sind gelöst und selbst bewertet
     Behalten   – die zugehörigen Karten haben Abrufwahrscheinlichkeit (FSRS)
     Kontrolle  – die zugehörigen Quizfragen wurden richtig beantwortet

   Entscheidend ist die Breitenregel: Wer nur gelesen hat, kommt nicht über
   „Grundlagen" hinaus, egal wie vollständig er gelesen hat. Erst mehrere
   Nachweisarten heben die Decke. Das ist der Grund, warum klassische
   Fortschrittsbalken trügen – sie kennen nur eine Quelle. */

import { KOMPETENZEN, kompetenzenFuer, stufeFuer } from "../data/kompetenzen.js";
import { SCHEMATA } from "../data/schemata.js";
import { QUIZ } from "../data/quiz.js";
import { kartenAbruf, istFaellig } from "./wiederholung.js";

/* ------------------------------------------------------------- Zuordnung */

/* Gewichte der drei Zuordnungswege. Normzitate sind das härteste Signal:
   „BGB § 164" steht nicht zufällig im Text. Der Kapiteltitel ist das
   zweitbeste, weil das Werk thematisch gegliedert ist. Stichworte im Fließtext
   sind das weichste Signal und können allein keine Zuordnung tragen. */
const P_NORM = 3;
const P_KAPITEL = 4;
const P_STICHWORT_TITEL = 2;
const P_STICHWORT_TEXT = 0.7;
const P_TITEL_IST_THEMA = 2;
const SCHWELLE = 2.4;          /* darunter gilt ein Inhalt als nicht zugeordnet */
const ZWEITANTEIL = 0.65;      /* Zweitknoten nur, wenn er 65 % des Bestwerts erreicht */

const kleinbuch = (s) => String(s || "").toLowerCase();

/* Die Gesetzeskürzel, die im Kompetenzmodell überhaupt vorkommen. Mehr braucht
   es nicht: Was kein Knoten führt, muss auch nicht erkannt werden. */
const KUERZEL = [...new Set(KOMPETENZEN.flatMap((k) => (k.normen || []).map((n) => n.split(" § ")[0])))]
  .sort((a, b) => b.length - a.length);
const KUERZEL_RE = new RegExp(`\\b(${KUERZEL.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "g");
const PARA_RE = /(?:§§?|Artt?\.)\s*(\d+[a-z]?)/g;

/* Normzitate aus freiem Text. Der Importer markiert nur Zitate im Fließtext des
   Werks; Streitstandtitel wie „§ 316a StGB und ,fahrendes' Fahrzeug" und
   Quizfragen bleiben unmarkiert. Für die Zuordnung genügt eine Näherung: jede
   Paragraphenzahl bekommt das Gesetzeskürzel, das ihr am nächsten folgt –
   ersatzweise das zuletzt davor genannte. */
function normenAusText(text) {
  const t = String(text || "");
  if (!t.includes("§") && !t.includes("Art.")) return [];
  const kuerzel = [];
  KUERZEL_RE.lastIndex = 0;
  let m;
  while ((m = KUERZEL_RE.exec(t)) !== null) kuerzel.push({ pos: m.index, name: m[1] });
  if (!kuerzel.length) return [];
  const aus = new Set();
  PARA_RE.lastIndex = 0;
  while ((m = PARA_RE.exec(t)) !== null) {
    const pos = m.index;
    const nach = kuerzel.find((k) => k.pos > pos && k.pos - pos < 90);
    const vor = [...kuerzel].reverse().find((k) => k.pos < pos && pos - k.pos < 90);
    const g = nach || vor;
    if (g) aus.add(`${g.name} § ${m[1]}`);
  }
  return [...aus];
}

function punkte(knoten, { titel = "", text = "", normen = [], kapitelTitel = "" }) {
  let p = 0;
  if (normen.length && knoten.normen) {
    let treffer = 0;
    for (const n of normen) if (knoten.normen.includes(n)) treffer++;
    if (treffer) p += P_NORM + Math.min(3, treffer - 1);
  }
  if (knoten.kapitel && (knoten.kapitel.test(kapitelTitel) || knoten.kapitel.test(titel))) p += P_KAPITEL;
  if (knoten.stichworte) {
    const t = kleinbuch(titel);
    const v = kleinbuch(text);
    for (const w of knoten.stichworte) {
      const s = kleinbuch(w);
      if (t.includes(s)) {
        p += P_STICHWORT_TITEL;
        /* Wenn das Stichwort den Titel praktisch ausmacht („Heimtücke",
           „Konkludente Täuschung"), ist das kein Nebenbefund, sondern das Thema. */
        if (t.length && s.length / t.length > 0.45) p += P_TITEL_IST_THEMA;
      } else if (v.includes(s)) p += P_STICHWORT_TEXT;
    }
  }
  return p;
}

/* Ordnet einen Inhalt höchstens zwei Knoten zu: dem besten und – wenn er nah
   dran liegt – dem zweitbesten. Zwei sind gewollt: „Anfechtung des
   Vertreterhandelns" gehört ehrlicherweise zu Anfechtung und Stellvertretung. */
function besteKnoten(knoten, roh) {
  const ausText = normenAusText(`${roh.titel || ""} ${roh.text || ""}`);
  const inhalt = ausText.length ? { ...roh, normen: [...new Set([...(roh.normen || []), ...ausText])] } : roh;
  const bewertet = [];
  for (const k of knoten) {
    const p = punkte(k, inhalt);
    if (p >= SCHWELLE) bewertet.push({ id: k.id, p });
  }
  if (!bewertet.length) return [];
  bewertet.sort((a, b) => b.p - a.p);
  const aus = [bewertet[0].id];
  if (bewertet[1] && bewertet[1].p >= bewertet[0].p * ZWEITANTEIL) aus.push(bewertet[1].id);
  return aus;
}

function leeresFach() {
  return { abschnitte: [], kapitel: new Set(), probleme: [], faelle: [], schemata: [], quiz: [], definitionen: [], karten: [] };
}

/* Baut für ein Rechtsgebiet und eine Examensstufe die vollständige Zuordnung.
   Reines Rechnen ohne Lernstand – das Ergebnis ist über Sitzungen hinweg
   gleich und darf gecacht werden. */
const cache = new Map();

export function zuordnung(gebiet, stufe, quellen) {
  const { band, probleme, faelle, definitionen } = quellen || {};
  if (!band) return null;
  const schluessel = `${gebiet}/${stufe}/${band.id}/${probleme ? 1 : 0}/${faelle ? 1 : 0}/${definitionen ? 1 : 0}`;
  if (cache.has(schluessel)) return cache.get(schluessel);

  const knoten = kompetenzenFuer(gebiet, stufe);
  const fach = new Map(knoten.map((k) => [k.id, leeresFach()]));
  const zuId = new Map();          /* Inhalts-ID → Knoten-IDs, für Rückwege */
  const merken = (ids, art, wert, inhaltId) => {
    for (const id of ids) {
      const f = fach.get(id);
      if (f && !f[art].includes(wert)) f[art].push(wert);
    }
    if (inhaltId && ids.length) zuId.set(inhaltId, ids);
  };

  for (const kap of band.kapitel) {
    for (const a of kap.abschnitte) {
      const ids = besteKnoten(knoten, {
        titel: `${kap.titel} ${a.titel}`,
        text: "",
        normen: a.normen || [],
        kapitelTitel: kap.titel,
      });
      merken(ids, "abschnitte", a.id, a.id);
      for (const id of ids) fach.get(id).kapitel.add(kap.id);
    }
  }

  if (probleme) {
    for (const p of probleme.probleme) {
      if (p.gebiet !== gebiet || p.stufe !== stufe) continue;
      merken(besteKnoten(knoten, { titel: p.titel, text: p.text, normen: p.normen || [], kapitelTitel: p.bereich || "" }), "probleme", p.id, `problem:${p.id}`);
    }
  }
  if (faelle) {
    for (const f of faelle.faelle) {
      if (f.gebiet !== gebiet || f.stufe !== stufe) continue;
      merken(besteKnoten(knoten, { titel: `${f.name} ${f.thema || ""} ${f.anker || ""}`, text: f.text, normen: f.normen || [], kapitelTitel: f.teilName || "" }), "faelle", f.id, `fall:${f.id}`);
    }
  }
  if (definitionen) {
    for (const d of definitionen) {
      if (d.gebiet !== gebiet || d.stufe !== stufe) continue;
      merken(besteKnoten(knoten, { titel: d.begriff, text: d.satz, normen: [], kapitelTitel: d.quelle?.titel || "" }), "definitionen", d.id, `def:${d.id}`);
    }
  }

  /* Schemata sind im Knoten von Hand hinterlegt (`schema`), zusätzlich greift
     die normale Zuordnung – so fällt ein neu ergänztes Schema nicht durch. */
  const schemaIds = new Set(SCHEMATA.filter((s) => s.gebiet === gebiet && s.stufe === stufe).map((s) => s.id));
  for (const k of knoten) {
    for (const sid of k.schema || []) if (schemaIds.has(sid)) fach.get(k.id).schemata.push(sid);
  }
  for (const s of SCHEMATA) {
    if (s.gebiet !== gebiet || s.stufe !== stufe) continue;
    const schon = knoten.filter((k) => (k.schema || []).includes(s.id)).map((k) => k.id);
    const ids = schon.length ? schon : besteKnoten(knoten, { titel: s.titel, text: (s.schritte || []).map((x) => x.t).join(" "), normen: s.normen || [], kapitelTitel: s.titel });
    merken(ids, "schemata", s.id, `schema:${s.id}`);
  }

  for (const f of QUIZ) {
    if (f.gebiet !== gebiet || f.stufe !== stufe) continue;
    merken(besteKnoten(knoten, { titel: f.frage, text: `${f.erklaerung || ""} ${(f.optionen || []).join(" ")}`, normen: [], kapitelTitel: "" }), "quiz", f.id, f.id);
  }

  /* Karten-IDs lassen sich aus den zugeordneten Inhalten direkt ableiten –
     der Kartenstapel benutzt dieselben Präfixe (siehe lib/karten.js). */
  for (const k of knoten) {
    const f = fach.get(k.id);
    f.karten = [
      ...f.definitionen.map((x) => `def:${x}`),
      ...f.probleme.map((x) => `problem:${x}`),
      ...f.faelle.map((x) => `fall:${x}`),
      ...f.schemata.map((x) => `schema:${x}`),
      ...(k.normen || []).map((n) => `norm:${n}`),
    ];
    f.kapitel = [...f.kapitel];
  }

  const aus = { gebiet, stufe, fach, zuId, knoten };
  cache.set(schluessel, aus);
  return aus;
}

/* --------------------------------------------------------- Beherrschung */

/* Wie viel eine Fallbewertung wert ist. Die Selbstbewertung im Fallmodus ist
   dreistufig (1 = daneben, 2 = teilweise, 3 = getroffen). */
const FALLWERT = { 1: 0.3, 2: 0.65, 3: 1 };

/* Die Decke nach Anzahl der belegten Nachweisarten. Wer nur liest, bleibt bei
   „Grundlagen"; erst Anwenden, Behalten und Kontrolle heben sie an. */
const DECKE = [0, 0.42, 0.66, 0.84, 1];

const GEWICHT = { verstehen: 0.22, anwenden: 0.3, behalten: 0.3, kontrolle: 0.18 };

/* Ein Nachweis zählt erst ab einer Mindestbreite als belegt: ein einziger
   gelöster Fall aus zwölf ist kein Beleg für „Anwenden". */
function anteilMitSaettigung(erfuellt, moeglich, mindestens) {
  if (!moeglich) return null;
  const ziel = Math.max(mindestens, Math.ceil(moeglich * 0.5));
  return Math.min(1, erfuellt / Math.max(1, Math.min(ziel, moeglich)));
}

export function beherrschung(knoten, fach, stand, tag) {
  const { gelesen, faelle = {}, karten = {}, quiz = {} } = stand || {};
  const teile = {};

  /* Verstehen */
  if (fach.abschnitte.length) {
    const gel = fach.abschnitte.filter((id) => gelesen && gelesen.has(id)).length;
    teile.verstehen = { wert: gel / fach.abschnitte.length, erfuellt: gel, moeglich: fach.abschnitte.length };
  }

  /* Anwenden: Fälle plus Schemata, die man im Trainer richtig gelegt hat. */
  if (fach.faelle.length) {
    const bewertet = fach.faelle.map((id) => faelle[id]).filter((x) => x && x.bewertung);
    const summe = bewertet.reduce((s, x) => s + (FALLWERT[x.bewertung] || 0.5), 0);
    const breite = anteilMitSaettigung(bewertet.length, fach.faelle.length, 2);
    const guete = bewertet.length ? summe / bewertet.length : 0;
    teile.anwenden = { wert: breite === null ? 0 : breite * guete, erfuellt: bewertet.length, moeglich: fach.faelle.length, guete };
  }

  /* Behalten: mittlere Abrufwahrscheinlichkeit der angefassten Karten, mit
     der Breite gewichtet. Nie angefasste Karten zählen als 0, aber nur bis zu
     einer Sättigungsgrenze – niemand muss jede Karte des Knotens sehen. */
  if (fach.karten.length) {
    const angefasst = fach.karten.map((id) => karten[id]).filter(Boolean);
    const summe = angefasst.reduce((s, k) => s + kartenAbruf(k, tag), 0);
    const breite = anteilMitSaettigung(angefasst.length, fach.karten.length, 3);
    const guete = angefasst.length ? summe / angefasst.length : 0;
    teile.behalten = { wert: breite === null ? 0 : breite * guete, erfuellt: angefasst.length, moeglich: fach.karten.length, guete };
  }

  /* Kontrolle: Quizquote, gedämpft bei wenigen Antworten (Laplace-Glättung,
     damit „1 von 1 richtig" nicht als 100 % durchgeht). */
  if (fach.quiz.length) {
    let r = 0; let g = 0;
    for (const id of fach.quiz) { const q = quiz[id]; if (q) { r += q.richtig || 0; g += (q.richtig || 0) + (q.falsch || 0); } }
    const quote = g ? (r + 1) / (g + 2) : 0;
    const breite = anteilMitSaettigung(g, fach.quiz.length * 2, 3);
    teile.kontrolle = { wert: breite === null ? 0 : breite * quote, erfuellt: g, moeglich: fach.quiz.length, guete: g ? r / g : 0 };
  }

  const vorhanden = Object.keys(teile);
  if (!vorhanden.length) return { grad: 0, stufe: stufeFuer(0), teile, belegt: 0, decke: 0, knoten };

  let summe = 0; let gewicht = 0; let belegt = 0;
  for (const name of vorhanden) {
    const g = GEWICHT[name];
    summe += teile[name].wert * g;
    gewicht += g;
    if (teile[name].wert > 0.12) belegt++;
  }
  const roh = gewicht ? summe / gewicht : 0;
  const decke = DECKE[Math.min(DECKE.length - 1, belegt)];
  const grad = Math.min(roh, decke);
  return { grad, roh, decke, belegt, teile, stufe: stufeFuer(grad), knoten };
}

/* Alle Knoten eines Gebiets, absteigend nach Handlungsbedarf sortierbar. */
export function beherrschungen(zu, stand, tag) {
  if (!zu) return [];
  return zu.knoten.map((k) => {
    const b = beherrschung(k, zu.fach.get(k.id), stand, tag);
    return { ...b, id: k.id, name: k.name, kurz: k.kurz, relevanz: k.relevanz, fach: zu.fach.get(k.id) };
  });
}

/* Handlungsbedarf: hoch relevante Knoten mit niedrigem Grad zuerst, aber
   Knoten mit fälligen Karten schieben sich nach vorn – sie sind das, was
   heute wegzuarbeiten ist, bevor es zerfällt. */
export function dringlichkeit(b, karten, tag) {
  const R = { hoch: 1, mittel: 0.72, basis: 0.5 }[b.relevanz] || 0.6;
  const faellig = b.fach.karten.filter((id) => karten[id] && istFaellig(karten[id], tag)).length;
  const luecke = 1 - b.grad;
  return luecke * R + Math.min(0.35, faellig * 0.03);
}

/* Was diesem Knoten als Nächstes fehlt – ein Satz, kein Balken. */
export function naechsterSchritt(b) {
  const t = b.teile;
  const offen = (name) => t[name] && t[name].wert < 0.55;
  if (!t.verstehen && !t.anwenden && !t.behalten && !t.kontrolle) return { art: "leer", text: "Für diese Kompetenz sind noch keine Inhalte zugeordnet." };
  if (t.verstehen && t.verstehen.erfuellt === 0) return { art: "lesen", text: `Zuerst lesen: ${t.verstehen.moeglich} Abschnitt${t.verstehen.moeglich === 1 ? "" : "e"} im Lehrbuch.` };
  if (offen("verstehen")) return { art: "lesen", text: `Noch ${t.verstehen.moeglich - t.verstehen.erfuellt} von ${t.verstehen.moeglich} Abschnitten ungelesen.` };
  if (t.anwenden && t.anwenden.erfuellt === 0) return { art: "fall", text: "Gelesen, aber noch nie angewandt – ein Fall aus diesem Bereich zeigt, ob es trägt." };
  if (t.behalten && t.behalten.erfuellt === 0) return { art: "karte", text: "Noch keine Karte zu dieser Kompetenz gezogen – ohne Wiederholung zerfällt das Gelesene." };
  if (offen("behalten")) return { art: "karte", text: `Abruf bei ${Math.round((t.behalten.guete || 0) * 100)} % – Karten wiederholen, bevor die Stabilität sinkt.` };
  if (offen("anwenden")) return { art: "fall", text: `Fälle sitzen noch nicht: ${t.anwenden.erfuellt} von ${t.anwenden.moeglich} bearbeitet, Güte ${Math.round((t.anwenden.guete || 0) * 100)} %.` };
  if (offen("kontrolle")) return { art: "quiz", text: "Quizquote unter 55 % – die Kontrollfragen decken hier noch Lücken auf." };
  if (b.belegt < 4 && b.roh > b.decke) return { art: "breite", text: "Der Wert ist gedeckelt: erst mehrere Nachweisarten (Lesen, Fälle, Karten, Quiz) heben die Stufe." };
  if (b.grad < 0.9) return { art: "vertiefen", text: "Solide. Für examensreif fehlen die Streitstände und Randfälle dieses Knotens." };
  return { art: "halten", text: "Sitzt. Nur noch halten – die Karten kommen von selbst wieder." };
}

/* Verwechslungspaare für die Fehleranalyse: Welche Unterscheidung geht hier
   typischerweise schief? */
export function verwechslungen(gebiet, stufe) {
  return kompetenzenFuer(gebiet, stufe)
    .filter((k) => k.verwechslung && k.verwechslung.length === 2)
    .map((k) => ({ id: k.id, name: k.name, paar: k.verwechslung }));
}

export { KOMPETENZEN, kompetenzenFuer, stufeFuer };
