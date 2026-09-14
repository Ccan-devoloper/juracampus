import React, { useMemo, useState } from "react";
import { useSpeicher } from "../lib/speicher";
import { verwechslungenFuer, verwechslungFuer } from "../data/verwechslungen";
import { kompetenzFinden } from "../data/kompetenzen";
import { gutschreiben } from "../lib/xp";
import { Kicker, Leer, mischen } from "./Bausteine";
import { IconPfeil, IconHaken, IconStreit, IconShuffle } from "./Icons";

/* „Hier war noch ein Fehler" hilft niemandem. Klausuren gehen an
   wiederkehrenden Verwechslungen kaputt, und die sind benennbar. Das Training
   fragt deshalb nicht nach Definitionen, sondern nach der Zuordnung – denn
   genau daran scheitert es unter Zeitdruck. Und es merkt sich, welche
   Unterscheidung bei wem schiefgeht. */

export default function Verwechslungen({ gebiet, stufe, nav }) {
  const alle = useMemo(() => verwechslungenFuer(gebiet, stufe), [gebiet, stufe]);
  const [stand, setStand] = useSpeicher("verwechslungen", {});
  const [aktiv, setAktiv] = useState(null);

  if (!alle.length) return <Leer titel="Für diesen Bereich sind noch keine Verwechslungen erfasst" text="Die Sammlung wächst Gebiet für Gebiet." />;

  if (aktiv) return <Trainer v={aktiv} stand={stand} setStand={setStand} onEnde={() => setAktiv(null)} />;

  /* Fehleranalyse: Welche Unterscheidung geht am häufigsten schief? */
  const bilanz = alle.map((v) => {
    const s = stand[v.k] || { richtig: 0, falsch: 0 };
    const gesamt = s.richtig + s.falsch;
    return { ...v, ...s, gesamt, quote: gesamt ? s.richtig / gesamt : null, name: kompetenzFinden(v.k)?.name || v.k };
  });
  const problematisch = bilanz.filter((b) => b.gesamt >= 3 && b.quote < 0.7).sort((a, b) => a.quote - b.quote);

  return (
    <>
      {problematisch.length > 0 && (
        <section className="panel fehleranalyse">
          <div className="panel__head"><h3><IconStreit /> Das geht bei Ihnen schief</h3><span className="zaehler">aus {bilanz.reduce((s, b) => s + b.gesamt, 0)} Zuordnungen</span></div>
          <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: "0 0 12px" }}>
            Keine Punktzahl, sondern ein Befund: Diese Unterscheidungen ordnen Sie bisher überwiegend falsch zu.
            Jede davon kostet in der Klausur nicht einen Punkt, sondern den ganzen Prüfungspunkt.
          </p>
          <div className="kompetenzstreifen">
            {problematisch.map((b) => (
              <button key={b.k} className="kompetenzzeile" onClick={() => setAktiv(verwechslungFuer(b.k))}>
                <span>
                  <strong>{b.a} / {b.b}</strong>
                  <span style={{ display: "block", fontSize: 12, color: "var(--ink-weich)" }}>{b.merkmal}</span>
                </span>
                <span className="mini"><i style={{ width: `${Math.round(b.quote * 100)}%`, background: "var(--rot)" }} /></span>
                <em>{Math.round(b.quote * 100)} %</em>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="verwechslungsliste">
        {bilanz.map((b) => (
          <article key={b.k} className={`verwechslung${b.quote !== null && b.quote >= 0.8 ? " verwechslung--sitzt" : ""}`}>
            <div className="verwechslung__paar">
              <span>{b.a}</span>
              <em>oder</em>
              <span>{b.b}</span>
            </div>
            <p className="verwechslung__merkmal">{b.merkmal}</p>
            <p className="verwechslung__folge">{b.folge}</p>
            <div className="verwechslung__fuss">
              <button className="btn btn--klein" onClick={() => setAktiv(b)}>{b.gesamt ? "Nochmal trainieren" : "Zuordnen üben"} <IconPfeil /></button>
              {b.gesamt > 0 && <span className={`tag tag--${b.quote >= 0.8 ? "gruen" : b.quote >= 0.5 ? "orange" : "rot"}`}>{b.richtig} von {b.gesamt} richtig</span>}
              <span className="zaehler">{b.faelle.length} Zuordnungen</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Trainer({ v, stand, setStand, onEnde }) {
  const [seed, setSeed] = useState(() => Date.now());
  const runde = useMemo(() => mischen(v.faelle, seed), [v.faelle, seed]);
  const [i, setI] = useState(0);
  const [wahl, setWahl] = useState(null);
  const [treffer, setTreffer] = useState(0);

  const f = runde[i];

  const antworten = (w) => {
    if (wahl) return;
    setWahl(w);
    const richtig = w === f.r;
    if (richtig) { setTreffer(treffer + 1); gutschreiben(4, "Verwechslung richtig zugeordnet"); }
    const s = stand[v.k] || { richtig: 0, falsch: 0 };
    setStand({ ...stand, [v.k]: { richtig: s.richtig + (richtig ? 1 : 0), falsch: s.falsch + (richtig ? 0 : 1) } });
  };

  if (!f) {
    return (
      <div className="panel quiz">
        <div className="mitte">
          <span className="ergebnis-zahl">{treffer}/{runde.length}</span>
          <strong>{treffer === runde.length ? "Sauber getrennt." : "Da wackelt die Unterscheidung noch."}</strong>
          <p style={{ marginTop: 8 }}>{v.merkmal}</p>
          <div className="knopfreihe" style={{ justifyContent: "center", marginTop: 16 }}>
            <button className="btn" onClick={() => { setSeed(Date.now()); setI(0); setWahl(null); setTreffer(0); }}><IconShuffle /> Nochmal</button>
            <button className="btn btn--linie" onClick={onEnde}>Zurück zur Übersicht</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="microkopf">
        <span className="zaehler">{i + 1} von {runde.length} · {treffer} richtig</span>
        <button className="btn btn--klein btn--geist" onClick={onEnde}>Beenden</button>
      </div>

      <article className="microcase">
        <div className="microcase__marke">
          <Kicker>Verwechslung trennen</Kicker>
          <span>{v.a} oder {v.b}?</span>
        </div>
        <p className="microcase__sachverhalt">{f.s}</p>

        <div className="zuordnung">
          {["a", "b"].map((seite) => {
            const zustand = !wahl ? "" : seite === f.r ? " zuordnung--richtig" : seite === wahl ? " zuordnung--falsch" : "";
            return (
              <button key={seite} className={`zuordnung__seite${zustand}`} disabled={!!wahl} onClick={() => antworten(seite)}>
                {wahl && seite === f.r && <IconHaken />}
                {v[seite]}
              </button>
            );
          })}
        </div>

        {wahl && (
          <>
            <div className="microcase__antwort">
              <h3>{wahl === f.r ? "Richtig zugeordnet" : `Falsch – es ist ${v[f.r]}`}</h3>
              <p>{f.w}</p>
              <h3>Das Unterscheidungsmerkmal</h3>
              <p>{v.merkmal}</p>
            </div>
            <div className="knopfreihe" style={{ marginTop: 14 }}>
              <button className="btn" onClick={() => { setI(i + 1); setWahl(null); }}>Weiter <IconPfeil /></button>
            </div>
          </>
        )}
      </article>
    </>
  );
}
