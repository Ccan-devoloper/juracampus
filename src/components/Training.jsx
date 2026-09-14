import React, { useMemo, useState } from "react";
import { useMehrere, GEBIET_NAME, STUFE_NAME, fundstelleRoute } from "../lib/daten";
import { useSpeicher } from "../lib/speicher";
import { useKartenStand, useQuizAntworten } from "../lib/fortschritt";
import { bewerten } from "../lib/wiederholung";
import { gutschreiben, XP } from "../lib/xp";
import { quizFuer } from "../data/quiz";
import { normenFuer } from "../data/normenquiz";
import { SCHEMATA } from "../data/schemata";
import { SchemaTrainer } from "./Schemata";
import Verwechslungen from "./Verwechslungen";
import Visualisierung from "./Visualisierung";
import { baeumeFuer, achsenFuer, karteFuer } from "../data/visualisierungen";
import { Kicker, Laden, Leer, mischen } from "./Bausteine";
import { IconAuge, IconHaken, IconShuffle } from "./Icons";

const MODI = [
  { id: "quiz", label: "Wissens-Quiz", text: "Multiple Choice zu Dauerbrennern mit Erklärung" },
  { id: "def", label: "Definitionen", text: "Begriff sehen, Definition selbst formulieren" },
  { id: "norm", label: "Normen-Trainer", text: "Welche Norm regelt was?" },
  { id: "schema", label: "Schema-Trainer", text: "Prüfungsschritte in die richtige Reihenfolge" },
  { id: "rs", label: "Rechtsstand 2026", text: "Neue Zahlen und Normen gegen Altstand" },
  { id: "verwechslung", label: "Verwechslungen", text: "Vertreter oder Bote? Zuordnen statt definieren" },
  { id: "bild", label: "Schaubilder", text: "Entscheidungsbäume, Fristenachsen, Anspruchslandkarte" },
];

export default function Training({ route, nav, gebiet, stufe }) {
  const [modus, setModus] = useState(route.id || "quiz");
  const [stats, setStats] = useSpeicher("training-stats", {});
  const daten = useMehrere(["definitionen", "rechtsstand"]);
  const zaehlen = (m, richtig) => setStats((s) => ({ ...s, [m]: { richtig: (s[m]?.richtig || 0) + (richtig ? 1 : 0), gesamt: (s[m]?.gesamt || 0) + 1 } }));
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Training</h1>
          <p className="lead">Kurze Runden mit sofortigem Feedback. Jede richtige Antwort bringt Erfahrungspunkte; was falsch war, landet automatisch früher auf dem Kartenstapel.</p>
        </div>
      </div>
      <div className="modus-wahl">
        {MODI.map((m) => <button key={m.id} className="modus" aria-pressed={modus === m.id} onClick={() => setModus(m.id)}><b>{m.label}</b><span>{m.text}</span>{stats[m.id] && <em>{stats[m.id].richtig} / {stats[m.id].gesamt} richtig</em>}</button>)}
      </div>
      <div className="training">
        <div>
          {modus === "quiz" && <Quiz key={`${gebiet}-${stufe}`} gebiet={gebiet} stufe={stufe} zaehlen={(r) => zaehlen("quiz", r)} />}
          {modus === "def" && (daten ? <Definitionen key={`${gebiet}-${stufe}`} gebiet={gebiet} stufe={stufe} definitionen={daten.definitionen} nav={nav} zaehlen={(r) => zaehlen("def", r)} /> : <Laden />)}
          {modus === "norm" && <NormenTrainer key={`${gebiet}-${stufe}`} gebiet={gebiet} stufe={stufe} zaehlen={(r) => zaehlen("norm", r)} />}
          {modus === "schema" && <SchemaRunde key={`${gebiet}-${stufe}`} gebiet={gebiet} stufe={stufe} />}
          {modus === "rs" && (daten ? <RechtsstandTrainer rechtsstand={daten.rechtsstand} zaehlen={(r) => zaehlen("rs", r)} /> : <Laden />)}
          {modus === "verwechslung" && <Verwechslungen key={`${gebiet}-${stufe}`} gebiet={gebiet} stufe={stufe} nav={nav} />}
          {modus === "bild" && <Schaubilder gebiet={gebiet} stufe={stufe} />}
        </div>
        <aside className="seitenstat">
          <div className="panel">
            <h3>Deine Bilanz</h3>
            {MODI.map((m) => <div key={m.id} className="stat"><span>{m.label}</span><b>{stats[m.id] ? `${Math.round((stats[m.id].richtig / stats[m.id].gesamt) * 100)} %` : "–"}</b></div>)}
            <button className="btn btn--klein btn--geist" style={{ marginTop: 8 }} onClick={() => setStats({})}>Bilanz zurücksetzen</button>
          </div>
          <div className="panel">
            <h3>Tipp</h3>
            <p style={{ fontSize: 13, color: "var(--ink-weich)" }}>Falsche Antworten im Quiz und Normen-Trainer setzen die zugehörige Karteikarte auf „morgen fällig“ – so schließt sich der Kreis zum Kartenstapel.</p>
          </div>
        </aside>
      </div>
    </>
  );
}

/* Schaubilder: alles, was für dieses Gebiet und diese Stufe hinterlegt ist –
   begehbare Entscheidungsbäume, Fristenachsen, die Anspruchslandkarte. */
function Schaubilder({ gebiet, stufe }) {
  const baeume = useMemo(() => baeumeFuer(gebiet, stufe), [gebiet, stufe]);
  const achsen = useMemo(() => achsenFuer(gebiet, stufe), [gebiet, stufe]);
  const karte = useMemo(() => karteFuer(gebiet, stufe), [gebiet, stufe]);
  if (!baeume.length && !achsen.length && !karte) return <Leer titel="Für diesen Bereich gibt es noch keine Schaubilder" text="Die Sammlung wächst Gebiet für Gebiet." />;
  return (
    <>
      <p className="lead" style={{ fontSize: 14, marginTop: 0 }}>
        Nicht jede Grafik hilft. Diese drei Formen tragen juristische Information, weil sie eine Struktur sichtbar machen,
        die im Fließtext untergeht: Entscheidungsbäume zeigen die Reihenfolge der Weichen, Zeitachsen die Fristen
        nebeneinander, die Landkarte das Sperrsystem der Anspruchsgrundlagen.
      </p>
      {karte && <Visualisierung v={{ ...karte, art: "karte" }} />}
      {baeume.map((b) => <Visualisierung key={b.id} v={{ ...b, art: "baum" }} />)}
      {achsen.map((z) => <Visualisierung key={z.id} v={{ ...z, art: "achse" }} />)}
    </>
  );
}

/* ------------------------------------------------------------- MC-Runde */
function MCRunde({ fragen, titel, zaehlen, kartenIdFuer }) {
  const { stand, setzen } = useKartenStand();
  const antwortstand = useQuizAntworten();
  const [seed, setSeed] = useState(() => Date.now());
  const runde = useMemo(() => mischen(fragen, seed).slice(0, 10).map((f) => ({ ...f, reihenfolge: mischen(f.optionen.map((_, i) => i), seed + f.optionen.length) })), [fragen, seed]);
  const [i, setI] = useState(0);
  const [wahl, setWahl] = useState(null);
  const [punkte, setPunkte] = useState(0);
  const f = runde[i];
  if (!fragen.length) return <Leer titel="Noch keine Fragen für diesen Bereich" />;
  if (!f) return (
    <div className="panel quiz"><div className="mitte"><span className="ergebnis-zahl">{punkte}/{runde.length}</span><strong>{punkte === runde.length ? "Fehlerfrei!" : punkte >= runde.length * 0.7 ? "Stark." : "Weiter üben – die Karten kommen wieder."}</strong><div className="knopfreihe" style={{ justifyContent: "center", marginTop: 14 }}><button className="btn" onClick={() => { setSeed(Date.now()); setI(0); setPunkte(0); setWahl(null); }}><IconShuffle /> Neue Runde</button></div></div></div>
  );
  const antworten = (opt) => {
    if (wahl !== null) return;
    setWahl(opt);
    const richtig = opt === f.richtig;
    if (richtig) { setPunkte(punkte + 1); gutschreiben(XP.quiz, "Quizfrage richtig"); }
    zaehlen(richtig);
    antwortstand.merken(f.id, richtig);
    if (kartenIdFuer && !richtig) { const kid = kartenIdFuer(f); if (kid) setzen(kid, bewerten(stand[kid], 1)); }
  };
  return (
    <div className="panel quiz">
      <div className="karte__meta"><span>{titel} · Frage {i + 1} von {runde.length}</span><span>{punkte} richtig</span></div>
      <h2>{f.frage}</h2>
      <div className="optionen">
        {f.reihenfolge.map((opt, k) => (
          <button key={opt} disabled={wahl !== null} className={wahl === null ? "" : opt === f.richtig ? "richtig" : opt === wahl ? "falsch" : ""} onClick={() => antworten(opt)}><i>{["A", "B", "C", "D", "E"][k]}</i><span>{f.optionen[opt]}</span></button>
        ))}
      </div>
      {wahl !== null && (
        <>
          <div className="antwort"><b>{wahl === f.richtig ? "Richtig." : "Leider nein."}</b>{f.erklaerung}</div>
          <div className="knopfreihe" style={{ marginTop: 14 }}><button className="btn" onClick={() => { setI(i + 1); setWahl(null); }}>Weiter</button></div>
        </>
      )}
    </div>
  );
}

function Quiz({ gebiet, stufe, zaehlen }) {
  const fragen = useMemo(() => quizFuer(gebiet, stufe), [gebiet, stufe]);
  return <MCRunde fragen={fragen} titel="Wissens-Quiz" zaehlen={zaehlen} />;
}

function NormenTrainer({ gebiet, stufe, zaehlen }) {
  const fragen = useMemo(() => {
    const liste = normenFuer(gebiet, stufe);
    return liste.map((n, i) => {
      const andere = mischen(liste.filter((x) => x.norm !== n.norm), i * 7919 + 13).slice(0, 3);
      const richtung = i % 2 === 0;
      const optionen = richtung ? [n.norm, ...andere.map((a) => a.norm)] : [n.inhalt, ...andere.map((a) => a.inhalt)];
      return { id: `n-${n.norm}`, frage: richtung ? `Welche Norm regelt: ${n.inhalt}?` : `Was regelt ${n.norm}?`, optionen, richtig: 0, erklaerung: `${n.norm}: ${n.inhalt}`, norm: n.norm };
    });
  }, [gebiet, stufe]);
  return <MCRunde fragen={fragen} titel="Normen-Trainer" zaehlen={zaehlen} kartenIdFuer={(f) => `norm:${f.norm}`} />;
}

function RechtsstandTrainer({ rechtsstand, zaehlen }) {
  const fragen = useMemo(() => rechtsstand.sperrliste.map((z, i) => {
    const andere = mischen(rechtsstand.sperrliste.filter((_, k) => k !== i), i * 31 + 7).slice(0, 2);
    return { id: `rs-${i}`, frage: `Rechtsstand 2026 – ${z.bereich}: Was gilt aktuell?`, optionen: [z.aktuell, z.alt, ...andere.map((a) => a.aktuell)], richtig: 0, erklaerung: `Aktuell: ${z.aktuell}. Altstand, der nicht mehr verwendet werden darf: ${z.alt}.`, i };
  }), [rechtsstand]);
  return <MCRunde fragen={fragen} titel="Rechtsstand 2026" zaehlen={zaehlen} kartenIdFuer={(f) => `rs:${f.i}`} />;
}

/* --------------------------------------------------- Definitionen-Trainer */
function Definitionen({ gebiet, stufe, definitionen, nav, zaehlen }) {
  const { stand, setzen } = useKartenStand();
  const liste = useMemo(() => definitionen.filter((d) => d.gebiet === gebiet && d.stufe === stufe), [definitionen, gebiet, stufe]);
  const [seed, setSeed] = useState(() => Date.now());
  const runde = useMemo(() => mischen(liste, seed).slice(0, 10), [liste, seed]);
  const [i, setI] = useState(0);
  const [offen, setOffen] = useState(false);
  const [eigene, setEigene] = useState("");
  const [punkte, setPunkte] = useState(0);
  const d = runde[i];
  if (!liste.length) return <Leer titel="Keine Definitionen für diesen Bereich" text="Die Definitionen werden aus dem Lehrbuch gewonnen." />;
  if (!d) return <div className="panel quiz"><div className="mitte"><span className="ergebnis-zahl">{punkte}/{runde.length}</span><strong>Runde beendet</strong><div className="knopfreihe" style={{ justifyContent: "center", marginTop: 14 }}><button className="btn" onClick={() => { setSeed(Date.now()); setI(0); setPunkte(0); setOffen(false); setEigene(""); }}><IconShuffle /> Neue Runde</button></div></div></div>;
  const werten = (q) => {
    const kid = `def:${d.id}`;
    setzen(kid, bewerten(stand[kid], q));
    if (q >= 3) { setPunkte(punkte + (q >= 5 ? 1 : 0.5)); gutschreiben(q >= 5 ? XP.definition + 2 : XP.definition, "Definition geübt"); }
    zaehlen(q >= 3);
    setI(i + 1); setOffen(false); setEigene("");
  };
  const ziel = fundstelleRoute("abschnitt", d.quelle.id) || fundstelleRoute("problem", d.quelle.id);
  return (
    <div className="panel quiz">
      <div className="karte__meta"><span>Definitionen · {i + 1} von {runde.length}</span><span>{d.quelle.pfad}</span></div>
      <h2>Definiere: {d.begriff}</h2>
      <textarea className="arbeitsfeld" style={{ minHeight: 100 }} placeholder="Eigene Definition formulieren – dann vergleichen." value={eigene} onChange={(e) => setEigene(e.target.value)} disabled={offen} />
      {!offen ? <div className="knopfreihe" style={{ marginTop: 12 }}><button className="btn" onClick={() => setOffen(true)}><IconAuge /> Definition zeigen</button></div> : (
        <>
          <div className="antwort"><b>Definition im Werk</b>{d.satz}{ziel && <p style={{ marginTop: 6, fontSize: 12.5 }}><button className="btn btn--klein btn--geist" onClick={() => nav(ziel)}>Fundstelle öffnen: {d.quelle.titel}</button></p>}</div>
          <div className="bewertung" style={{ marginTop: 12 }}>
            <button onClick={() => werten(1)}>Nicht gewusst<small>morgen wieder</small></button>
            <button onClick={() => werten(3)}>Teilweise<small>bald wieder</small></button>
            <button onClick={() => werten(5)}><IconHaken /> Getroffen<small>später wieder</small></button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------- Schema-Runde */
function SchemaRunde({ gebiet, stufe }) {
  const liste = useMemo(() => SCHEMATA.filter((s) => s.gebiet === gebiet && s.stufe === stufe), [gebiet, stufe]);
  const [i, setI] = useState(() => Math.floor(Math.random() * Math.max(1, liste.length)));
  if (!liste.length) return <Leer titel="Keine Schemata für diesen Bereich" />;
  const s = liste[i % liste.length];
  return (
    <div>
      <SchemaTrainer key={s.id} schema={s} kompakt />
      <div className="knopfreihe" style={{ marginTop: 12 }}><button className="btn btn--linie" onClick={() => setI((i + 1) % liste.length)}>Nächstes Schema <IconShuffle /></button><span className="zaehler">{liste.length} Schemata im Bereich</span></div>
    </div>
  );
}
