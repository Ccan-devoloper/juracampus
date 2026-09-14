import React, { useMemo } from "react";
import { GEBIET_NAME, STUFE_NAME, werk } from "../lib/daten";
import { useGelesen } from "../lib/fortschritt";
import { useSpeicher, heute } from "../lib/speicher";
import { relevanzFuer } from "../data/relevanz";
import { Kicker } from "./Bausteine";

const TAG = 24 * 3600 * 1000;
const iso = (d) => d.toISOString().slice(0, 10);
/* Aufwand je Kapitel: Lesen, Nacharbeiten mit Schemata, Streitständen und Fällen, Karteikarten – erfahrungsgemäß ein Vielfaches der reinen Lesezeit. */
const aufwand = (k) => k.minuten * 6 + 25;
const plusTage = (datum, n) => iso(new Date(new Date(datum + "T12:00:00").getTime() + n * TAG));

export default function Lernplan({ nav, gebiet, stufe, band }) {
  const [plan, setPlan] = useSpeicher("lernplan", { termin: plusTage(heute(), 180), start: heute(), stundenWoche: 20, alleBaende: true });
  const { menge: gelesen } = useGelesen();

  const kapitel = useMemo(() => {
    const baende = plan.alleBaende ? werk.baende.filter((b) => b.stufe === stufe) : [band];
    return baende.flatMap((b) => b.kapitel.map((k) => ({ ...k, band: b })));
  }, [plan.alleBaende, stufe, band]);

  const wochen = useMemo(() => {
    const start = new Date(plan.start + "T12:00:00");
    const ende = new Date(plan.termin + "T12:00:00");
    const tage = Math.max(7, Math.round((ende - start) / TAG));
    const lernwochen = Math.max(1, Math.floor(tage / 7) - Math.min(4, Math.floor(tage / 28))); /* letzte Wochen: Wiederholung */
    const gesamtMinuten = kapitel.reduce((s, k) => s + aufwand(k), 0);
    const proWoche = gesamtMinuten / lernwochen;
    const liste = [];
    let aktuell = { nr: 1, kapitel: [], minuten: 0 };
    for (const k of kapitel) {
      if (aktuell.minuten >= proWoche && aktuell.kapitel.length && liste.length < lernwochen - 1) { liste.push(aktuell); aktuell = { nr: liste.length + 1, kapitel: [], minuten: 0 }; }
      aktuell.kapitel.push(k); aktuell.minuten += aufwand(k);
    }
    liste.push(aktuell);
    const wiederholung = Math.max(0, Math.floor(tage / 7) - liste.length);
    for (let i = 0; i < wiederholung; i++) liste.push({ nr: liste.length + 1, kapitel: [], minuten: 0, wiederholung: true });
    return liste.map((w, i) => ({ ...w, von: plusTage(plan.start, i * 7), bis: plusTage(plan.start, i * 7 + 6) }));
  }, [plan, kapitel]);

  const heuteTag = heute();
  const aktuelleWoche = wochen.find((w) => w.von <= heuteTag && w.bis >= heuteTag) || (heuteTag < plan.start ? wochen[0] : wochen[wochen.length - 1]);
  const sollBisHeute = wochen.filter((w) => w.bis < heuteTag).flatMap((w) => w.kapitel);
  const sollGelesen = sollBisHeute.filter((k) => k.abschnitte.every((a) => gelesen.has(a.id))).length;
  const rueckstand = sollBisHeute.length - sollGelesen;
  const gesamtGelesen = kapitel.filter((k) => k.abschnitte.every((a) => gelesen.has(a.id))).length;
  const tageBis = Math.round((new Date(plan.termin + "T12:00:00") - new Date(heuteTag + "T12:00:00")) / TAG);
  const wochenStd = Math.round(kapitel.reduce((s, k) => s + aufwand(k), 0) / 60 / Math.max(1, wochen.filter((w) => !w.wiederholung).length));

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Lernplan</h1>
          <p className="lead">Der Plan verteilt die Kapitel gleichmäßig auf die Wochen bis zum Examen und hält die letzten Wochen für Wiederholung und Klausuren frei. Gelesene Kapitel werden automatisch abgehakt – du siehst jederzeit, ob du im Plan liegst.</p>
        </div>
        <span className="zaehler">{tageBis} Tage bis zum Termin</span>
      </div>
      <div className="raster raster--2">
        <section className="panel">
          <h2 style={{ marginBottom: 8 }}>Rahmen</h2>
          <label className="einstellung"><span>Examenstermin (erste Klausur)</span><input type="date" value={plan.termin} onChange={(e) => setPlan({ ...plan, termin: e.target.value || plan.termin })} /></label>
          <label className="einstellung"><span>Planbeginn</span><input type="date" value={plan.start} onChange={(e) => setPlan({ ...plan, start: e.target.value || plan.start })} /></label>
          <label className="einstellung"><span>Umfang</span><select value={plan.alleBaende ? "alle" : "band"} onChange={(e) => setPlan({ ...plan, alleBaende: e.target.value === "alle" })}><option value="alle">Alle Rechtsgebiete ({STUFE_NAME[stufe]})</option><option value="band">Nur {GEBIET_NAME[gebiet]}</option></select></label>
          <p style={{ fontSize: 13, color: "var(--ink-weich)", marginTop: 10 }}>Rechnerischer Aufwand: rund {wochenStd} {wochenStd === 1 ? "Stunde" : "Stunden"} pro Lernwoche für Lesen, Nacharbeiten und Fälle bei {kapitel.length} Kapiteln – Karteikarten und Klausuren kommen hinzu.</p>
        </section>
        <section className="panel">
          <h2 style={{ marginBottom: 10 }}>Stand</h2>
          <div className="planstand">
            <div className={rueckstand <= 0 ? "planstand--gut" : rueckstand > 3 ? "planstand--spaet" : ""}><strong>{rueckstand <= 0 ? "im Plan" : `−${rueckstand}`}</strong><span>{rueckstand <= 0 ? "alle fälligen Kapitel gelesen" : `Kapitel Rückstand`}</span></div>
            <div><strong>{gesamtGelesen}/{kapitel.length}</strong><span>Kapitel abgeschlossen</span></div>
            <div><strong>W{aktuelleWoche ? aktuelleWoche.nr : 1}</strong><span>von {wochen.length} Wochen</span></div>
          </div>
        </section>
      </div>
      <section className="abschnitt">
        <div className="abschnitt__kopf"><h2>Wochenplan</h2><span className="zaehler">{wochen.filter((w) => !w.wiederholung).length} Lernwochen · {wochen.filter((w) => w.wiederholung).length} Wiederholungswochen</span></div>
        <div className="kapitelliste">
          {wochen.map((w) => {
            const fertig = w.kapitel.length > 0 && w.kapitel.every((k) => k.abschnitte.every((a) => gelesen.has(a.id)));
            const n = w.kapitel.filter((k) => k.abschnitte.every((a) => gelesen.has(a.id))).length;
            return (
              <div key={w.nr} className={`woche${fertig ? " woche--fertig" : ""}${aktuelleWoche && aktuelleWoche.nr === w.nr ? " woche--aktuell" : ""}`}>
                <input type="checkbox" checked={fertig} readOnly aria-label={`Woche ${w.nr} abgeschlossen`} />
                <b>W{w.nr}</b>
                <div>
                  <h3>{w.wiederholung ? "Wiederholung, Karteikarten, Klausuren" : w.kapitel.map((k) => k.band.kurz).filter((v, i, a) => a.indexOf(v) === i).join(" · ")}</h3>
                  <p>{w.von} bis {w.bis}{w.wiederholung ? " · fällige Karten, Klausurmodus, Endkontrollen" : ` · rund ${Math.round(w.minuten / 60)} Std.`}</p>
                  {w.kapitel.length > 0 && <ul>{w.kapitel.map((k) => <li key={k.id}><button className={k.abschnitte.every((a) => gelesen.has(a.id)) ? "gelesen" : ""} onClick={() => nav({ gebiet: k.band.gebiet, stufe: k.band.stufe, ansicht: "lehrbuch", id: k.id })} title={relevanzFuer(k.titel)}>{k.nr}. {k.titel}</button></li>)}</ul>}
                </div>
                <span className="woche__stand">{w.wiederholung ? "" : `${n}/${w.kapitel.length}`}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
