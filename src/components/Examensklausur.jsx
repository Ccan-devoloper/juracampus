import React, { useEffect, useMemo, useState } from "react";
import { useSpeicher } from "../lib/speicher";
import { klausurenFuer, klausurFinden } from "../data/fallklassen";
import { gutschreiben } from "../lib/xp";
import { Kicker, Leer } from "./Bausteine";
import { IconKlausur, IconZurueck, IconPfeil, IconAuge, IconHaken } from "./Icons";

/* Die Examensklausur unterscheidet sich vom Übungsfall nicht durch die Länge,
   sondern durch den Erwartungshorizont: Er sagt nicht nur, was richtig ist,
   sondern was wie viel wert ist. Wer weiß, dass die Zulässigkeit sechs von
   hundert Punkten bringt, schreibt keine Seite darüber – und genau das ist
   die Fähigkeit, die im Examen über die Note entscheidet. */

const NOTEN = [
  { ab: 90, n: "sehr gut", p: "16–18 Punkte" },
  { ab: 80, n: "gut", p: "13–15 Punkte" },
  { ab: 68, n: "vollbefriedigend", p: "10–12 Punkte" },
  { ab: 54, n: "befriedigend", p: "7–9 Punkte" },
  { ab: 40, n: "ausreichend", p: "4–6 Punkte" },
  { ab: 20, n: "mangelhaft", p: "1–3 Punkte" },
  { ab: 0, n: "ungenügend", p: "0 Punkte" },
];

const note = (prozent) => NOTEN.find((x) => prozent >= x.ab) || NOTEN[NOTEN.length - 1];

export default function Examensklausur({ route, nav, gebiet, stufe }) {
  return route.id ? <Bearbeitung id={route.id} nav={nav} /> : <Uebersicht gebiet={gebiet} stufe={stufe} nav={nav} />;
}

function Uebersicht({ gebiet, stufe, nav }) {
  const liste = useMemo(() => klausurenFuer(gebiet, stufe), [gebiet, stufe]);
  const [stand] = useSpeicher("examensklausuren", {});
  if (!liste.length) return <Leer titel="Für diesen Bereich gibt es noch keine Examensklausur" text="Die Sammlung wächst Gebiet für Gebiet." />;
  return (
    <div className="klausurliste">
      {liste.map((k) => {
        const s = stand[k.id];
        const gesamt = k.erwartungshorizont.reduce((a, x) => a + x.p, 0);
        return (
          <button key={k.id} className="klausurkarte" onClick={() => nav({ ansicht: "klausur", id: k.id })}>
            <div className="klausurkarte__kopf">
              <Kicker>Examensklausur · {k.zeit / 60} Stunden</Kicker>
              {s && <span className={`bewertet bewertet--${s.prozent >= 68 ? 3 : s.prozent >= 40 ? 2 : 1}`}>{s.punkte} von {gesamt} · {note(s.prozent).p}</span>}
            </div>
            <strong>{k.titel}</strong>
            <p>{k.schwerpunkt}</p>
            <span className="klausurkarte__vermerk">{k.bearbeitervermerk.slice(0, 130)} …</span>
          </button>
        );
      })}
    </div>
  );
}

function Bearbeitung({ id, nav }) {
  const k = klausurFinden(id);
  const [stand, setStand] = useSpeicher("examensklausuren", {});
  const [phase, setPhase] = useState("sachverhalt");
  const [start, setStart] = useState(null);
  const [jetzt, setJetzt] = useState(Date.now());
  const [punkte, setPunkte] = useState({});

  useEffect(() => {
    if (!start) return;
    const t = setInterval(() => setJetzt(Date.now()), 1000);
    return () => clearInterval(t);
  }, [start]);

  if (!k) return <Leer titel="Klausur nicht gefunden"><button className="btn" onClick={() => nav({ ansicht: "klausur" })}>Zur Übersicht</button></Leer>;

  const gesamt = k.erwartungshorizont.reduce((a, x) => a + x.p, 0);
  const erreicht = k.erwartungshorizont.reduce((a, x, i) => a + (punkte[i] ?? 0), 0);
  const prozent = Math.round((erreicht / gesamt) * 100);
  const verstrichen = start ? Math.floor((jetzt - start) / 1000) : 0;
  const rest = k.zeit * 60 - verstrichen;
  const uhr = (s) => `${Math.floor(Math.abs(s) / 3600)}:${String(Math.floor((Math.abs(s) % 3600) / 60)).padStart(2, "0")}:${String(Math.abs(s) % 60).padStart(2, "0")}`;

  const abschliessen = () => {
    setStand({ ...stand, [k.id]: { punkte: erreicht, prozent, datum: new Date().toISOString().slice(0, 10), minuten: Math.round(verstrichen / 60) } });
    gutschreiben(120, "Examensklausur bearbeitet");
    setPhase("ergebnis");
  };

  return (
    <div className="lesson">
      <button className="zurueck" onClick={() => nav({ ansicht: "klausur" })}><IconZurueck /> Alle Klausuren</button>

      <div className="lesson__kopf">
        <div>
          <Kicker>Examensklausur · Bearbeitungszeit {k.zeit / 60} Stunden</Kicker>
          <h1>{k.titel}</h1>
          <p className="lead">{k.schwerpunkt}</p>
        </div>
        {start && phase !== "ergebnis" && (
          <div className={`klausuruhr${rest < 0 ? " klausuruhr--aus" : rest < 1800 ? " klausuruhr--knapp" : ""}`}>
            <span>{rest < 0 ? "überzogen um" : "verbleibend"}</span>
            <b>{uhr(rest)}</b>
          </div>
        )}
      </div>

      <section className="panel">
        <div className="panel__head"><h2>Bearbeitervermerk</h2></div>
        <p className="bearbeitervermerk">{k.bearbeitervermerk}</p>
      </section>

      {phase === "sachverhalt" && (
        <>
          <section className="panel" style={{ marginTop: 14 }}>
            <div className="panel__head"><h2>Sachverhalt</h2><span className="zaehler">{k.sachverhalt.split(/\s+/).length} Wörter</span></div>
            <div className="sachverhalt">{k.sachverhalt.split("\n\n").map((a, i) => <p key={i}>{a}</p>)}</div>
            <div className="fragen">
              {k.fragen.map((f, i) => <p key={i}><strong>{f}</strong></p>)}
            </div>
          </section>
          <div className="knopfreihe" style={{ marginTop: 14 }}>
            {!start && <button className="btn btn--gross" onClick={() => { setStart(Date.now()); setJetzt(Date.now()); }}><IconKlausur /> Bearbeitungszeit starten</button>}
            <button className="btn btn--linie" onClick={() => setPhase("horizont")}><IconAuge /> Erwartungshorizont aufdecken</button>
          </div>
          <p className="hinweiszeile" style={{ marginTop: 12 }}>
            Schreiben Sie auf Papier oder am Rechner – die Seite misst nur die Zeit. Decken Sie den Erwartungshorizont
            erst auf, wenn Sie fertig sind oder die Zeit abgelaufen ist. Er ist zur Selbstbewertung gedacht, nicht zum Mitlesen.
          </p>
        </>
      )}

      {phase === "horizont" && (
        <>
          <section className="panel" style={{ marginTop: 14 }}>
            <div className="panel__head">
              <h2>Erwartungshorizont</h2>
              <span className="zaehler">{erreicht} von {gesamt} Punkten · {prozent} % · {note(prozent).n}</span>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", marginBottom: 14 }}>
              Bewerten Sie jeden Block selbst. Maßstab ist nicht, ob Sie den Gedanken kannten, sondern ob er in Ihrer
              Bearbeitung steht – mit Obersatz, Subsumtion und Ergebnis.
            </p>
            <ol className="horizont">
              {k.erwartungshorizont.map((h, i) => (
                <li key={i}>
                  <div className="horizont__kopf">
                    <strong>{h.t}</strong>
                    <span className="horizont__max">{h.p} Punkte</span>
                  </div>
                  <p>{h.x}</p>
                  <div className="horizont__skala">
                    {[0, 0.25, 0.5, 0.75, 1].map((q) => {
                      const wert = Math.round(h.p * q);
                      return (
                        <button key={q} aria-pressed={punkte[i] === wert} onClick={() => setPunkte({ ...punkte, [i]: wert })}>
                          {wert}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {k.hinweise && (
            <section className="panel" style={{ marginTop: 14 }}>
              <div className="panel__head"><h3>Worauf es in dieser Klausur ankommt</h3></div>
              <ul className="klausurhinweise">{k.hinweise.map((h, i) => <li key={i}>{h}</li>)}</ul>
            </section>
          )}

          <div className="knopfreihe" style={{ marginTop: 14 }}>
            <button className="btn btn--gross" onClick={abschliessen}><IconHaken /> Bewertung abschließen</button>
            <button className="btn btn--geist" onClick={() => setPhase("sachverhalt")}>Zurück zum Sachverhalt</button>
          </div>
        </>
      )}

      {phase === "ergebnis" && (
        <section className="panel panel--marke" style={{ marginTop: 14 }}>
          <div className="mitte">
            <span className="ergebnis-zahl">{erreicht}</span>
            <strong>von {gesamt} Punkten · {note(prozent).n} ({note(prozent).p})</strong>
            <p style={{ marginTop: 10 }}>
              {prozent >= 68
                ? "Das ist Prädikatsniveau. Sehen Sie sich die Blöcke an, in denen Punkte fehlten – dort liegt der Weg nach oben."
                : prozent >= 40
                ? "Bestanden. Die Lücken liegen sichtbar in einzelnen Blöcken; die gehören in die nächste Lernsitzung."
                : "Noch nicht ausreichend. Arbeiten Sie die Blöcke mit null Punkten als Kompetenzen auf, bevor Sie die nächste Klausur schreiben."}
              {start && ` Bearbeitungszeit: ${Math.round(verstrichen / 60)} von ${k.zeit} Minuten.`}
            </p>
            <div className="knopfreihe" style={{ justifyContent: "center", marginTop: 16 }}>
              <button className="btn" onClick={() => nav({ ansicht: "kompetenzen" })}>Zum Kompetenzprofil <IconPfeil /></button>
              <button className="btn btn--linie" onClick={() => nav({ ansicht: "klausur" })}>Weitere Klausuren</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
