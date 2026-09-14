import React from "react";
import { useDaten, kapitelFinden, werk } from "../lib/daten";
import { Html, Kicker, Laden } from "./Bausteine";
import { IconTraining, IconKarten } from "./Icons";

export default function Rechtsstand({ nav }) {
  const rs = useDaten("rechtsstand");
  if (!rs.daten) return <Laden text="Rechtsstand wird geladen …" />;
  const d = rs.daten;
  const z = werk.zaehler;
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>Redaktioneller Stand 13. September 2026</Kicker>
          <h1>Rechtsstand 2026</h1>
          <p className="lead">Was in aktuellen Klausuren gilt – und welcher Altstand nicht mehr verwendet werden darf. Die Sperrliste ist als Trainer und als Karteikarten verfügbar, die Hinweise stehen zusätzlich an Ort und Stelle im Lehrbuch.</p>
        </div>
        <div className="knopfreihe">
          <button className="btn btn--linie" onClick={() => nav({ ansicht: "training", id: "rs" })}><IconTraining /> Als Trainer</button>
          <button className="btn" onClick={() => nav({ ansicht: "karten" })}><IconKarten /> Als Karteikarten</button>
        </div>
      </div>

      <section className="panel panel--marke" id="methodik">
        <div className="panel__head"><h2>Methodik und Grenzen</h2><span className="zaehler">Stichtag 13. September 2026</span></div>
        <p style={{ marginBottom: 10 }}>Damit du einschätzen kannst, worauf du dich hier verlässt, steht offen, was geprüft wurde und was nicht.</p>
        <div className="raster raster--3">
          <div>
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Was geprüft wurde</h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: 0 }}>Die rechtsstandssensiblen Kernaussagen – Wertgrenzen, Fristen, Normnummern nach den Reformen – wurden redaktionell gegen die amtlichen Gesetzestexte abgeglichen. Ergebnis ist die Sperrliste unten.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Was nicht geprüft wurde</h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: 0 }}>Es gibt keine vollständige Einzelprüfung aller {z.abschnitte} Abschnitte, {z.probleme} Streitstände und {z.faelle} Fälle auf juristische Richtigkeit. Einzelne Aussagen können überholt oder verkürzt sein.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 15, marginBottom: 6 }}>Was im Zweifel gilt</h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: 0 }}>Bei Abweichungen hat der amtliche Gesetzestext Vorrang, danach die Rechtsprechung. JuraCampus ist Lernmaterial und keine Rechtsberatung.</p>
          </div>
        </div>
        {werk.standQuelle && <p style={{ fontSize: 12.5, color: "var(--ink-weich)", marginTop: 14, marginBottom: 0 }}>Herkunft des Werks, Angabe der Quelle: „{werk.standQuelle}“</p>}
      </section>

      {d.abschnitte.filter((a) => !/Sperrliste/.test(a.titel)).map((a) => (
        <section key={a.id} className="panel" id={a.id}>
          <h2 style={{ marginBottom: 10 }}>{a.titel}</h2>
          <Html html={a.html} className="inhalt inhalt--kompakt" nav={nav} />
        </section>
      ))}

      <section className="abschnitt">
        <div className="abschnitt__kopf"><h2>Harte Rechtsstands-Sperrliste</h2><span className="zaehler">{d.sperrliste.length} Bereiche</span></div>
        <div className="sperrliste">
          {d.sperrliste.map((z, i) => <div key={i} className="sperr"><b>{z.bereich}</b><span className="neu">{z.aktuell}</span><span className="alt">{z.alt}</span></div>)}
        </div>
      </section>

      <section className="abschnitt">
        <div className="abschnitt__kopf"><h2>Rechtsstandshinweise im Lehrbuch</h2><span className="zaehler">{d.hinweise.length} Kästen</span></div>
        <div className="raster raster--2">
          {d.hinweise.map((h, i) => {
            const k = h.kapitel ? kapitelFinden(h.kapitel.id) : null;
            return (
              <div key={i} className="panel">
                <Html html={h.html} className="inhalt inhalt--kompakt" nav={nav} />
                {k && <button className="btn btn--klein btn--linie" style={{ marginTop: 10 }} onClick={() => nav({ gebiet: k.band.gebiet, stufe: k.band.stufe, ansicht: "lehrbuch", id: k.id })}>Im Lehrbuch: {h.kapitel.titel}</button>}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
