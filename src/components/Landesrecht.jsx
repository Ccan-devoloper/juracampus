import React, { useState } from "react";
import { useSpeicher } from "../lib/speicher";
import { LAENDER, WIDERSPRUCH_STAND, landFinden } from "../data/laender";
import { Kicker } from "./Bausteine";
import { IconPfeil, IconHaken, IconAktuell } from "./Icons";

/* Juristische Ausbildung ist Landesrecht. Diese Seite sagt, was das für die
   eigene Klausur bedeutet – und sie sagt ebenso deutlich, wo ihre Angaben
   enden. Eine Plattform, die so tut, als sei Polizeirecht bundesweit gleich,
   lehrt an der Klausur vorbei; eine, die veraltete Landesangaben als sicher
   ausgibt, richtet mehr Schaden an als keine. */

export default function Landesrecht({ nav }) {
  const [landId, setLandId] = useSpeicher("bundesland", null);
  const [vergleich, setVergleich] = useState(false);
  const land = landFinden(landId);

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker neutral>Landesrecht</Kicker>
          <h1>{land ? land.name : "Ihr Bundesland"}</h1>
          <p className="lead">
            Wer in Bayern Polizeirecht lernt, zitiert Art. 11 PAG; in Nordrhein-Westfalen § 8 PolG NRW und § 14 OBG NRW –
            und in Schleswig-Holstein steht beides samt Vollstreckungsrecht in einem einzigen Gesetz, dem LVwG.
            Sagen Sie einmal, wo Sie Examen schreiben, und die Seite zitiert im Öffentlichen Recht die Gesetze, die auf Ihrem Tisch liegen.
          </p>
        </div>
        {land && <button className="btn btn--geist" onClick={() => setVergleich(!vergleich)}>{vergleich ? "Nur mein Land" : "Alle 16 vergleichen"}</button>}
      </div>

      <section className="panel">
        <div className="panel__head"><h2>Bundesland wählen</h2><span className="zaehler">jederzeit änderbar</span></div>
        <div className="landwahl">
          {LAENDER.map((l) => (
            <button key={l.id} className="land" aria-pressed={landId === l.id} onClick={() => setLandId(l.id)}>
              <b>{l.kurz}</b>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
        {landId && <button className="btn btn--klein btn--geist" style={{ marginTop: 12 }} onClick={() => setLandId(null)}>Auswahl aufheben</button>}
      </section>

      {land && !vergleich && (
        <>
          <section className="panel" style={{ marginTop: 14 }}>
            <div className="panel__head"><h2>Ihre Gesetze im Öffentlichen Recht</h2></div>
            <div className="normtafel">
              <Zeile bereich="Gefahrenabwehr" k={land.polizei.k} n={land.polizei.n} zusatz={`Generalklausel: ${land.polizei.general}`} />
              <Zeile bereich="Bauordnungsrecht" k={land.bau.k} n={land.bau.n} />
              <Zeile bereich="Kommunalrecht" k={land.kommunal.k} n={land.kommunal.n} />
              <Zeile bereich="Verwaltungsverfahren" k={land.vwvfg.k} n={land.vwvfg.n} />
              <Zeile bereich="Vollstreckung" k={land.vollstreckung.k} n={land.vollstreckung.n} />
            </div>
          </section>

          <div className="raster raster--2" style={{ marginTop: 14 }}>
            <section className="panel">
              <div className="panel__head"><h3>Widerspruchsverfahren</h3><span className={`tag tag--${WIDERSPRUCH_STAND[land.widerspruch.stand].ton}`}>{WIDERSPRUCH_STAND[land.widerspruch.stand].label}</span></div>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 10px" }}>{land.widerspruch.text}</p>
              <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: 0 }}>{WIDERSPRUCH_STAND[land.widerspruch.stand].text}</p>
            </section>
            <section className="panel">
              <div className="panel__head"><h3>Was in {land.name} anders ist</h3></div>
              <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0 }}>{land.besonderheit}</p>
            </section>
          </div>
        </>
      )}

      {vergleich && (
        <section className="abschnitt" style={{ marginTop: 14 }}>
          <div className="abschnitt__kopf"><h2>Alle sechzehn im Vergleich</h2><span className="zaehler">Gefahrenabwehr · Bauordnung · Vorverfahren</span></div>
          <div className="panel" style={{ overflowX: "auto" }}>
            <table className="landtabelle">
              <thead>
                <tr><th>Land</th><th>Gefahrenabwehr</th><th>Generalklausel</th><th>Bauordnung</th><th>Vorverfahren</th></tr>
              </thead>
              <tbody>
                {LAENDER.map((l) => (
                  <tr key={l.id} className={l.id === landId ? "landtabelle--eigen" : ""}>
                    <td><b>{l.kurz}</b> {l.name}</td>
                    <td className="mono">{l.polizei.k}</td>
                    <td className="mono">{l.polizei.general}</td>
                    <td className="mono">{l.bau.k}</td>
                    <td><span className={`tag tag--${WIDERSPRUCH_STAND[l.widerspruch.stand].ton}`}>{WIDERSPRUCH_STAND[l.widerspruch.stand].label}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel__head"><h3><IconAktuell /> Was diese Seite nicht leistet</h3></div>
        <p style={{ fontSize: 13.5, color: "var(--ink-weich)", lineHeight: 1.65, margin: "0 0 10px" }}>
          Hier stehen die Kürzel der klausurrelevanten Landesgesetze und der Grundstand des Vorverfahrens. Beides ist über
          Jahre stabil. Bewusst nicht enthalten sind Zahl und Länge der Klausuren, Notenstufen, Anmeldefristen und Termine –
          sie ändern sich häufiger, und eine falsche Zahl wäre schlimmer als keine.
        </p>
        <p style={{ fontSize: 13.5, color: "var(--ink-weich)", lineHeight: 1.65, margin: 0 }}>
          Auch die Angabe zum Widerspruchsverfahren ist eine Orientierung, keine Auskunft: Die Ausnahmen stehen in den
          Ausführungsgesetzen zur VwGO und werden regelmäßig geändert. Im Zweifel gilt das Landesrecht in seiner aktuellen
          Fassung – prüfen Sie es vor der Klausur nach.
        </p>
        <div className="knopfreihe" style={{ marginTop: 12 }}>
          <button className="btn btn--klein btn--linie" onClick={() => nav({ global: "rechtsstand" })}>Rechtsstand und Methodik <IconPfeil /></button>
        </div>
      </section>
    </>
  );
}

function Zeile({ bereich, k, n, zusatz }) {
  return (
    <div className="normzeile">
      <span className="normzeile__bereich">{bereich}</span>
      <div>
        <b className="mono">{k}</b>
        <span>{n}</span>
        {zusatz && <em>{zusatz}</em>}
      </div>
      <IconHaken />
    </div>
  );
}

/* Kleiner Aufhänger für die Startseite und das Cockpit. */
export function LandHinweis({ nav }) {
  const [landId] = useSpeicher("bundesland", null);
  const land = landFinden(landId);
  if (land) return null;
  return (
    <button className="landhinweis" onClick={() => nav({ global: "landesrecht" })}>
      <strong>In welchem Bundesland schreiben Sie Examen?</strong>
      <span>Im Öffentlichen Recht entscheidet das über die Gesetze, die Sie zitieren – und darüber, ob es ein Widerspruchsverfahren gibt.</span>
      <IconPfeil />
    </button>
  );
}
