import React, { useEffect, useMemo, useState } from "react";
import { useDaten, GEBIET_NAME, STUFE_NAME } from "../lib/daten";
import { useFaelleStand } from "../lib/fortschritt";
import { useSpeicher, heute } from "../lib/speicher";
import { gutschreiben, XP } from "../lib/xp";
import { Fallansicht } from "./Faelle";
import { Kicker, Laden, mischen } from "./Bausteine";
import { IconKlausur, IconShuffle, IconStart } from "./Icons";

const fmt = (s) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function Klausur({ nav, gebiet, stufe }) {
  const faelle = useDaten("faelle");
  const { stand } = useFaelleStand();
  const [laeufe, setLaeufe] = useSpeicher("klausuren", []);
  const [anzahl, setAnzahl] = useState(2);
  const [minuten, setMinuten] = useState(stufe === 2 ? 90 : 60);
  const [auswahl, setAuswahl] = useState([]);
  const [lauf, setLauf] = useState(null);

  const pool = useMemo(() => (faelle.daten ? faelle.daten.faelle.filter((f) => f.gebiet === gebiet && f.stufe === stufe) : []), [faelle.daten, gebiet, stufe]);
  const offen = pool.filter((f) => !stand[f.id]?.bewertung);

  const zufall = () => setAuswahl(mischen(offen.length >= anzahl ? offen : pool, Date.now()).slice(0, anzahl).map((f) => f.id));
  useEffect(() => { if (pool.length && !auswahl.length) zufall(); /* eslint-disable-next-line */ }, [pool.length, anzahl]);

  if (!faelle.daten) return <Laden text="Fälle werden geladen …" />;

  if (lauf) return <Klausurlauf lauf={lauf} daten={faelle.daten} nav={nav} gebiet={gebiet} stufe={stufe} onEnde={(ergebnis) => { setLaeufe([ergebnis, ...laeufe].slice(0, 50)); setLauf(null); }} />;

  const starten = () => {
    if (!auswahl.length) return;
    setLauf({ start: Date.now(), sekunden: auswahl.length * minuten * 60, faelle: auswahl, index: 0, bewertungen: {} });
  };

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Klausurmodus</h1>
          <p className="lead">Fälle unter Zeitbedingungen: laufende Uhr, gesperrte Lösung, ehrliche Selbstbewertung. Jeder Lauf wird ausgewertet und bringt {XP.klausur} XP – plus die Punkte für jeden bewerteten Fall.</p>
        </div>
        <span className="zaehler">{pool.length} Fälle · {offen.length} noch offen</span>
      </div>
      <div className="raster raster--2">
        <section className="panel">
          <div className="panel__head"><h2>Klausur zusammenstellen</h2><button className="btn btn--klein btn--linie" onClick={zufall}><IconShuffle /> Neu würfeln</button></div>
          <label className="einstellung"><span>Anzahl der Fälle</span><select value={anzahl} onChange={(e) => setAnzahl(Number(e.target.value))}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}</select></label>
          <label className="einstellung"><span>Minuten je Fall</span><input type="number" min="15" max="300" step="5" value={minuten} onChange={(e) => setMinuten(Math.max(15, Math.min(300, Number(e.target.value) || 60)))} /></label>
          <div className="klausur__auswahl" style={{ marginTop: 12 }}>
            {auswahl.map((id, i) => { const f = pool.find((x) => x.id === id); if (!f) return null; return (
              <label key={id}><input type="checkbox" checked readOnly onChange={() => setAuswahl(auswahl.filter((x) => x !== id))} /><span><strong>Fall {i + 1}: {f.name}</strong><br /><small>{f.thema || f.teilName}</small></span><small>{minuten} Min.</small></label>
            ); })}
          </div>
          <div className="knopfreihe" style={{ marginTop: 16 }}>
            <button className="btn btn--gross" disabled={!auswahl.length} onClick={starten}><IconStart /> Klausur starten · {fmt(auswahl.length * minuten * 60)}</button>
          </div>
        </section>
        <section className="panel">
          <div className="panel__head"><h2>Bisherige Läufe</h2><span className="zaehler">{laeufe.filter((l) => l.gebiet === gebiet && l.stufe === stufe).length}</span></div>
          {laeufe.filter((l) => l.gebiet === gebiet && l.stufe === stufe).length === 0 ? <p style={{ color: "var(--ink-weich)" }}>Noch kein Klausurlauf in diesem Bereich.</p> : (
            <div className="heute-aufgaben">
              {laeufe.filter((l) => l.gebiet === gebiet && l.stufe === stufe).slice(0, 8).map((l, i) => (
                <div key={i} className="aufgabe" style={{ cursor: "default" }}>
                  <span className="aufgabe__check" style={{ border: 0, background: l.quote >= 0.66 ? "var(--gruen-feld)" : "var(--orange-feld)" }} />
                  <span><strong>{l.datum} · {l.faelle.length} Fälle</strong><span>{Math.round(l.quote * 100)} % Sicherheit · {fmt(l.gebraucht)} gebraucht</span></span>
                  <em>{l.faelle.map((f) => ["–", "nochmal", "geht so", "sicher"][f.bewertung || 0]).join(" · ")}</em>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function Klausurlauf({ lauf, daten, nav, gebiet, stufe, onEnde }) {
  const [rest, setRest] = useState(lauf.sekunden);
  const [index, setIndex] = useState(0);
  const [bewertungen, setBewertungen] = useState({});
  const [fertig, setFertig] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setRest((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const fallId = lauf.faelle[index];
  const gebraucht = lauf.sekunden - rest;
  const abschliessen = () => {
    const liste = lauf.faelle.map((id) => ({ id, name: daten.faelle.find((f) => f.id === id)?.name, bewertung: bewertungen[id] || 0 }));
    const bewertet = liste.filter((f) => f.bewertung);
    const quote = bewertet.length ? bewertet.reduce((s, f) => s + (f.bewertung - 1) / 2, 0) / bewertet.length : 0;
    gutschreiben(XP.klausur, "Klausurlauf abgeschlossen");
    setFertig({ datum: heute(), gebiet, stufe, faelle: liste, quote, gebraucht });
  };
  if (fertig) {
    return (
      <div className="panel quiz"><div className="mitte">
        <span className="ergebnis-zahl">{Math.round(fertig.quote * 100)} %</span>
        <strong>Klausur abgeschlossen</strong>
        <p>{fertig.faelle.length} Fälle in {fmt(fertig.gebraucht)}. Selbstbewertung: {fertig.faelle.map((f) => `${f.name}: ${["offen", "nochmal", "geht so", "sicher"][f.bewertung]}`).join(" · ")}. +{XP.klausur} XP.</p>
        <div className="knopfreihe" style={{ justifyContent: "center", marginTop: 14 }}><button className="btn" onClick={() => onEnde(fertig)}>Zur Übersicht</button><button className="btn btn--linie" onClick={() => { onEnde(fertig); nav({ ansicht: "cockpit" }); }}>Zum Cockpit</button></div>
      </div></div>
    );
  }
  return (
    <>
      <div className="panel klausur__leiste" style={{ marginBottom: 16, position: "sticky", top: "calc(var(--kopf) + var(--leiste-h) + var(--stufen-h) + 8px)", zIndex: 20 }}>
        <div><Kicker><IconKlausur /> Klausurmodus · Fall {index + 1} von {lauf.faelle.length}</Kicker></div>
        <div className={`uhr${rest < 300 ? " uhr--knapp" : ""}`} aria-live="polite">{fmt(rest)}</div>
        <div className="knopfreihe">
          {index > 0 && <button className="btn btn--klein btn--linie" onClick={() => setIndex(index - 1)}>Vorheriger Fall</button>}
          {index < lauf.faelle.length - 1 ? <button className="btn btn--klein" onClick={() => setIndex(index + 1)}>Nächster Fall</button> : <button className="btn btn--klein btn--gruen" onClick={abschliessen}>Klausur abgeben</button>}
          <button className="btn btn--klein btn--geist" onClick={abschliessen}>Abbrechen und auswerten</button>
        </div>
      </div>
      {rest === 0 && <div className="kasten kasten--falle" style={{ fontFamily: "var(--sans)" }}><b>Zeit abgelaufen</b><p>Die Bearbeitungszeit ist vorbei. Du kannst die Lösung noch vergleichen und bewerten, dann abgeben.</p></div>}
      <Fallansicht key={fallId} route={{ id: fallId }} nav={nav} gebiet={gebiet} stufe={stufe} daten={daten} klausur onWeiter={(b) => setBewertungen({ ...bewertungen, [fallId]: b })} />
    </>
  );
}
