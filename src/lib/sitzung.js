/* Adaptive Lernsitzung: „Ich habe jetzt X Minuten."

   Die ehrliche Frage einer Studentin um 21:40 Uhr ist nicht „welches Kapitel
   kommt als Nächstes?", sondern „was bringt mir in den 25 Minuten, die ich
   noch habe, am meisten?". Diese Datei beantwortet sie.

   Der Plan entsteht aus dem Kompetenzmodell, nicht aus der Buchreihenfolge:
     1. Fällige Karten haben Vorrang – was heute fällig ist, zerfällt sonst.
        Sie bekommen aber nie die ganze Zeit, sonst wird jede Sitzung ein
        Karteikartenabend.
     2. Die Restzeit geht dorthin, wo der Nachweis am dünnsten ist. Wer viel
        gelesen und nie gerechnet hat, bekommt einen Fall; wer Fälle löst,
        aber die Streitstände nicht kennt, bekommt Streitstände.
     3. Jeder Schritt nennt seinen Grund. Ein Plan, den man nicht versteht,
        wird nicht befolgt. */

import { istFaellig, kartenAbruf, HEUTE } from "./wiederholung.js";

export const BUDGETS = [
  { minuten: 10, label: "10 Minuten", text: "Bahn, Pause, kurz vor dem Schlafen" },
  { minuten: 25, label: "25 Minuten", text: "eine konzentrierte Einheit" },
  { minuten: 45, label: "45 Minuten", text: "Lesen, anwenden, kontrollieren" },
  { minuten: 90, label: "90 Minuten", text: "wie eine halbe Klausur" },
];

/* Erfahrungswerte in Minuten. Bewusst großzügig: Ein Plan, der regelmäßig
   überzieht, wird als Gängelung erlebt. */
export const DAUER = { karte: 0.5, micro: 2.5, fall: 14, streit: 3.5, quizfrage: 0.9 };

const MAX_KARTENANTEIL = 0.45;
const MIN_KARTEN = 5;
const QUIZ_MAX = 8;
const QUIZ_ANTEIL = 0.16;
const STREIT_MAX = 2;

/* Wie dünn ist ein Nachweis über die dringendsten Kompetenzen hinweg?
   1 = fehlt völlig, 0 = sitzt. */
function bedarf(liste, name) {
  const mit = liste.filter((k) => k.teile[name]);
  if (!mit.length) return 0;
  return mit.reduce((s, k) => s + (1 - k.teile[name].wert), 0) / mit.length;
}

const rnd = (x) => Math.round(x * 10) / 10;

export function planen({ minuten, kompetenzen, kartenIds, kartenStand, gelesen, faelleStand, abschnittInfo, fallInfo, problemInfo, quizAnzahl = 0, micro = [], microStand = {}, tag = HEUTE() }) {
  const budget = Math.max(5, minuten);
  const kurz = budget <= 12;
  const dringend = [...kompetenzen].sort((a, b) => b.dringend - a.dringend);
  const karten = [];
  const mikro = [];
  const lesen = [];
  const faelle = [];
  const streit = [];
  const quiz = [];
  const belegt = new Set();
  let rest = budget;

  /* ---------------------------------------------------- 1. Karten zuerst */
  const faellig = kartenIds.filter((id) => kartenStand[id] && istFaellig(kartenStand[id], tag));
  const neu = kartenIds.filter((id) => !kartenStand[id]);
  /* Am stärksten vergessene zuerst – das ist die Reihenfolge, in der Wissen kippt. */
  faellig.sort((a, b) => kartenAbruf(kartenStand[a], tag) - kartenAbruf(kartenStand[b], tag));

  /* In einer kurzen Sitzung darf der Stapel die ganze Zeit haben: Zehn Minuten
     auf vier Bausteine zu verteilen ergibt keine Sitzung, sondern Hektik. */
  /* In der kurzen Sitzung wird vorab Platz für ein bis zwei Microcases
     reserviert – sonst bleibt es bei reinem Abfragen, und zehn Minuten sind
     das einzige Zeitfenster, in dem viele Menschen überhaupt lernen. */
  const microOffenKurz = micro.filter((m) => !microStand[m.id] || microStand[m.id].w < 3);
  const microReserve = kurz && microOffenKurz.length ? Math.min(2, microOffenKurz.length) * DAUER.micro : 0;
  const kartenMax = Math.floor(((budget - microReserve) * (kurz ? 0.95 : MAX_KARTENANTEIL)) / DAUER.karte);
  let kartenZiel = Math.min(faellig.length, kartenMax);
  /* Bleibt Platz im Kartenblock, wird er mit neuen Karten aufgefüllt – in einer
     kurzen Sitzung bis zum Anschlag, sonst behutsam. */
  if (neu.length && kartenZiel < kartenMax && (kurz || kartenZiel < MIN_KARTEN)) {
    const platz = kartenMax - kartenZiel;
    kartenZiel += Math.min(neu.length, kurz ? platz : Math.min(platz, 10));
  }
  if (kartenZiel > 0) {
    const dauer = rnd(kartenZiel * DAUER.karte);
    rest -= dauer;
    karten.push({
      id: "karten",
      art: "karten",
      titel: `${kartenZiel} Karte${kartenZiel === 1 ? "" : "n"} wiederholen`,
      grund: kartenGrund(faellig.length, kartenZiel),
      minuten: dauer,
      ziel: kartenZiel,
      route: { ansicht: "karten", id: `los-${kartenZiel}` },
    });
  }

  /* In der kurzen Sitzung ist nach den Karten noch Platz für ein, zwei
     Microcases – sie sind das Einzige, was in zehn Minuten über die reine
     Abfrage hinausgeht. */
  if (kurz) {
    const zahl = Math.min(microOffenKurz.length, Math.floor(rest / DAUER.micro));
    if (zahl >= 1) {
      const dauer = rnd(zahl * DAUER.micro);
      rest -= dauer;
      mikro.push({
        id: "micro",
        art: "micro",
        titel: `${zahl} Microcase${zahl === 1 ? "" : "s"}`,
        grund: "Ein Problem, eine Frage, sofortige Rückmeldung – das Einzige, was in zehn Minuten über reines Abfragen hinausgeht.",
        minuten: dauer,
        ziel: zahl,
        route: { ansicht: "faelle", id: "micro" },
      });
    }
    return fertig([...karten, ...mikro], budget);
  }

  /* ------------------------------- 2. Restzeit nach Bedarf gewichten */
  const spitze = dringend.slice(0, 8);
  const b = { verstehen: bedarf(spitze, "verstehen"), anwenden: bedarf(spitze, "anwenden"), kontrolle: bedarf(spitze, "kontrolle") };
  const summe = b.verstehen + b.anwenden + b.kontrolle || 1;

  /* Reihenfolge der Zuteilung ist nicht die Reihenfolge der Anzeige: Erst
     werden die groben Blöcke gesetzt (Quiz, Fälle, Streitstände), dann füllt
     das Lesen die Lücken – es hat die kleinste Körnung und passt überall. */

  /* Kontrolle: Quiz ist Diagnose, nicht Lernen. Deshalb hart gedeckelt. */
  const fragen = Math.min(QUIZ_MAX, quizAnzahl, Math.floor(Math.min(rest * QUIZ_ANTEIL, rest) / DAUER.quizfrage));
  if (fragen >= 3) {
    const dauer = rnd(fragen * DAUER.quizfrage);
    rest -= dauer;
    quiz.push({
      id: "quiz",
      art: "quiz",
      titel: `${fragen} Kontrollfragen`,
      grund: "Zum Schluss die Gegenprobe: Was eben gelesen wurde, ist noch nicht gekonnt. Falsche Antworten setzen die zugehörige Karte auf morgen.",
      minuten: dauer,
      ziel: fragen,
      route: { ansicht: "training", id: "quiz" },
    });
  }

  /* Microcases als Brücke: Wer eine Kompetenz gelesen, aber nie angewandt hat,
     bekommt zuerst zwei kurze Fälle – ein voller Übungsfall wäre der zweite
     Schritt vor dem ersten. */
  const microOffen = microOffenKurz;
  const dringendeIds = new Set(dringend.slice(0, 6).map((k) => k.id));
  const passend = microOffen.filter((m) => dringendeIds.has(m.k));
  const microZahl = Math.min(passend.length ? passend.length : microOffen.length, Math.floor(Math.min(rest * 0.2, 3 * DAUER.micro) / DAUER.micro));
  if (microZahl >= 2) {
    const dauer = rnd(microZahl * DAUER.micro);
    rest -= dauer;
    mikro.push({
      id: "micro",
      art: "micro",
      titel: `${microZahl} Microcases`,
      grund: "Kurze Einzelprobleme aus den Kompetenzen mit dem größten Hebel – sie zeigen in zwei Minuten, ob ein Punkt sitzt, bevor er im großen Fall gebraucht wird.",
      minuten: dauer,
      ziel: microZahl,
      route: { ansicht: "faelle", id: "micro" },
    });
  }

  /* Anwenden: Fälle sind der einzige echte Test. Sie bekommen so viel, wie der
     Bedarf rechtfertigt – aber nur ganze Fälle, ein halber Fall bringt nichts. */
  let fallBudget = rest * Math.min(0.62, (b.anwenden / summe) * 1.25);
  for (const k of dringend) {
    if (fallBudget < DAUER.fall || rest < DAUER.fall) break;
    if (!k.teile.anwenden || k.teile.anwenden.wert >= 0.9) continue;
    const offen = k.fach.faelle.find((id) => !faelleStand[id]?.bewertung && !belegt.has(id));
    if (!offen) continue;
    const f = fallInfo(offen);
    if (!f) continue;
    belegt.add(offen);
    fallBudget -= DAUER.fall;
    rest -= DAUER.fall;
    faelle.push({
      id: `fall:${offen}`,
      art: "fall",
      titel: `Fall lösen: ${f.name}`,
      grund: k.teile.anwenden.erfuellt === 0
        ? `„${k.name}“ ist gelesen, aber noch nie angewandt. Erst der Fall zeigt, ob es trägt.`
        : `„${k.name}“: ${k.teile.anwenden.erfuellt} von ${k.teile.anwenden.moeglich} Fällen bearbeitet.`,
      minuten: DAUER.fall,
      kompetenz: k.id,
      ziel: offen,
      route: { ansicht: "faelle", id: offen },
    });
  }

  /* Streitstände erst ab einem Grad, unter dem sie Auswendiglernen wären. */
  for (const k of dringend) {
    if (streit.length >= STREIT_MAX || rest < DAUER.streit * 2) break;
    if (k.grad < 0.3) continue;
    const pid = k.fach.probleme.find((id) => !belegt.has(id));
    if (!pid) continue;
    const info = problemInfo(pid);
    if (!info) continue;
    belegt.add(pid);
    rest -= DAUER.streit;
    streit.push({
      id: `streit:${pid}`,
      art: "streit",
      titel: `Streitstand: ${info.titel}`,
      grund: `Vertiefung zu „${k.name}“ – der Grad steht bei ${Math.round(k.grad * 100)}; über 90 kommt nur, wer die Streitstände kennt.`,
      minuten: DAUER.streit,
      kompetenz: k.id,
      ziel: pid,
      route: { ansicht: "streit", id: pid },
    });
  }

  /* Verstehen füllt den Rest – Abschnitte sind klein genug, um jede Lücke zu
     schließen, statt Zeit ungenutzt zu lassen. */
  const roh = [];
  for (const k of dringend) {
    if (rest < 1) break;
    if (!k.teile.verstehen || k.teile.verstehen.wert >= 0.98) continue;
    for (const id of k.fach.abschnitte) {
      if (rest < 1) break;
      if (gelesen.has(id) || belegt.has(id)) continue;
      const a = abschnittInfo(id);
      if (!a) continue;
      const dauer = Math.max(1, a.minuten || 3);
      if (dauer > rest + 1) continue;
      belegt.add(id);
      rest -= dauer;
      roh.push({ id, a, dauer, k });
    }
  }

  /* Zwölf Einzelzeilen „Lesen: 9.3 Schuldnerverzug" sind eine Wand, kein Plan.
     Abschnitte desselben Kapitels werden deshalb zu einem Schritt gebündelt. */
  for (const stueck of buendeln(roh)) lesen.push(stueck);

  /* Anzeigereihenfolge: aufwärmen, aufnehmen, anwenden, vertiefen, prüfen. */
  return fertig([...karten, ...lesen, ...mikro, ...faelle, ...streit, ...quiz], budget);
}

/* Bündelt Abschnitte desselben Kapitels zu einem Leseschritt. */
function buendeln(roh) {
  const gruppen = new Map();
  for (const x of roh) {
    const schluessel = x.a.kapitelId;
    if (!gruppen.has(schluessel)) gruppen.set(schluessel, []);
    gruppen.get(schluessel).push(x);
  }
  const aus = [];
  const alsZahl = (nr) => String(nr || "").split(".").map((x) => Number(x) || 0);
  for (const [kapitelId, stuecke] of gruppen) {
    stuecke.sort((x, y) => {
      const a = alsZahl(x.a.nr); const b = alsZahl(y.a.nr);
      return (a[0] - b[0]) || (a[1] - b[1]);
    });
    const a0 = stuecke[0].a;
    const k = stuecke[0].k;
    const dauer = rnd(stuecke.reduce((s, x) => s + x.dauer, 0));
    const nummern = stuecke.map((x) => x.a.nr).filter(Boolean);
    const kapitel = a0.kapitelTitel || "Kapitel";
    const bezeichnung = stuecke.length === 1
      ? `${a0.nr ? a0.nr + " " : ""}${a0.titel === "Überblick" ? `${kapitel} – Überblick` : a0.titel}`
      : `${kapitel}${nummern.length > 1 ? ` · ${nummern[0]}–${nummern[nummern.length - 1]}` : ""} (${stuecke.length} Abschnitte)`;
    aus.push({
      id: `lesen:${kapitelId}:${stuecke.length}`,
      art: "lesen",
      titel: `Lesen: ${bezeichnung}`,
      grund: `Baustein von „${k.name}“ – dort ist ${k.teile.verstehen.erfuellt} von ${k.teile.verstehen.moeglich} Abschnitten gelesen.`,
      minuten: dauer,
      kompetenz: k.id,
      ziel: stuecke[0].id,
      ziele: stuecke.map((x) => x.id),
      route: { ansicht: "lehrbuch", id: kapitelId, sub: stuecke[0].id },
    });
  }
  return aus;
}

/* Der Satz unter dem Kartenschritt muss stimmen: „2 Karten sind fällig" und
   darunter „12 Karten wiederholen" liest sich wie ein Rechenfehler. */
function kartenGrund(faellig, ziel) {
  if (!faellig) return "Nichts ist fällig. Der Stapel wächst deshalb um neue Karten, statt die Zeit zu verschenken.";
  if (ziel <= faellig) return `${faellig} Karte${faellig === 1 ? " ist" : "n sind"} fällig. Die ${ziel} mit der niedrigsten Abrufwahrscheinlichkeit zuerst – was heute nicht wiederholt wird, ist übermorgen weg.`;
  const neu = ziel - faellig;
  return `${faellig} fällige Karte${faellig === 1 ? "" : "n"} zuerst, danach ${neu} neue – fällig heißt: genau jetzt kippt das Wissen.`;
}

function fertig(schritte, budget) {
  /* Ganze Minuten. „5,4 Min." ist eine Genauigkeit, die die Schätzung nicht hat. */
  const gerundet = schritte.map((x) => ({ ...x, minuten: Math.max(1, Math.round(x.minuten)) }));
  return { schritte: gerundet, budget, geplant: gerundet.reduce((s, x) => s + x.minuten, 0) };
}

/* Ist ein Schritt erledigt? Wo möglich aus dem Lernstand abgeleitet statt
   abgehakt – eine Sitzung, die man selbst abhaken muss, hakt man irgendwann
   ohne zu lernen ab. */
export function erledigt(schritt, { gelesen, faelleStand, kartenStand, quizStand, microStand = {}, basis, manuell, tag = HEUTE() }) {
  if (manuell && manuell.includes(schritt.id)) return true;
  if (schritt.art === "lesen") return (schritt.ziele || [schritt.ziel]).every((id) => gelesen.has(id));
  if (schritt.art === "fall") return !!faelleStand[schritt.ziel]?.bewertung;
  if (schritt.art === "karten") return kartenHeute(kartenStand, tag) >= (basis.karten || 0) + schritt.ziel;
  if (schritt.art === "micro") return microBearbeitet(microStand) >= (basis.micro || 0) + schritt.ziel;
  if (schritt.art === "quiz") return quizAntworten(quizStand) >= (basis.quiz || 0) + schritt.ziel;
  return false;
}

export const kartenHeute = (stand, tag = HEUTE()) => Object.values(stand).filter((k) => k.last === tag).length;
export const quizAntworten = (stand) => Object.values(stand).reduce((s, q) => s + (q.richtig || 0) + (q.falsch || 0), 0);
export const microBearbeitet = (stand) => Object.keys(stand || {}).length;
