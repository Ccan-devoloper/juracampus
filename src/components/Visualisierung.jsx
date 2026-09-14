import React, { useState } from "react";
import { IconPfeil, IconHaken, IconStreit, IconAktuell, IconRegister } from "./Icons";

/* Drei Darstellungsformen, die juristische Information tragen – und nicht nur
   Fläche füllen. Der Baum ist begehbar: Man beantwortet die Fragen und landet
   im Blatt. Das ist kein Spielerei, sondern genau der Denkweg, den die Klausur
   verlangt; wer ihn einmal gegangen ist, verwechselt die Weichen nicht mehr. */

export default function Visualisierung({ v }) {
  if (v.art === "baum") return <Entscheidungsbaum b={v} />;
  if (v.art === "achse") return <Zeitachse z={v} />;
  if (v.art === "karte") return <Anspruchslandkarte l={v} />;
  return null;
}

export function Entscheidungsbaum({ b }) {
  const [pfad, setPfad] = useState([]);

  let knoten = b.wurzel;
  for (const schritt of pfad) knoten = knoten[schritt];
  const blatt = knoten.e ? knoten : null;

  const zurueck = () => setPfad(pfad.slice(0, -1));

  return (
    <section className="vis vis--baum">
      <header className="vis__kopf">
        <h3><IconStreit /> {b.titel}</h3>
        {pfad.length > 0 && <button className="btn btn--klein btn--geist" onClick={() => setPfad([])}>Von vorn</button>}
      </header>
      <p className="vis__einstieg">{b.einstieg}</p>

      <ol className="baumpfad">
        {pfad.map((s, i) => {
          let k = b.wurzel;
          for (const x of pfad.slice(0, i)) k = k[x];
          return (
            <li key={i} className={`baumschritt baumschritt--${s}`}>
              <span>{k.f}</span>
              <b>{s === "ja" ? "Ja" : "Nein"}</b>
            </li>
          );
        })}
      </ol>

      {!blatt ? (
        <div className="baumfrage">
          <p>{knoten.f}</p>
          <div className="knopfreihe">
            <button className="btn" onClick={() => setPfad([...pfad, "ja"])}>Ja</button>
            <button className="btn btn--linie" onClick={() => setPfad([...pfad, "nein"])}>Nein</button>
            {pfad.length > 0 && <button className="btn btn--klein btn--geist" onClick={zurueck}>einen Schritt zurück</button>}
          </div>
        </div>
      ) : (
        <div className="baumblatt">
          <span className="baumblatt__marke"><IconHaken /> Ergebnis</span>
          <strong>{blatt.e}</strong>
          <code>{blatt.n}</code>
          <p>{blatt.h}</p>
          <div className="knopfreihe">
            <button className="btn btn--klein btn--geist" onClick={zurueck}>einen Schritt zurück</button>
            <button className="btn btn--klein btn--geist" onClick={() => setPfad([])}>Von vorn</button>
          </div>
        </div>
      )}
    </section>
  );
}

export function Zeitachse({ z }) {
  return (
    <section className="vis vis--achse">
      <header className="vis__kopf"><h3><IconAktuell /> {z.titel}</h3></header>
      <p className="vis__einstieg">{z.einstieg}</p>
      <ol className="achse">
        {z.punkte.map((p, i) => (
          <li key={i} className={`achspunkt achspunkt--${p.ton}`}>
            <span className="achspunkt__frist">{p.t}</span>
            <div>
              <strong>{p.label}</strong>
              <p>{p.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Anspruchslandkarte({ l }) {
  return (
    <section className="vis vis--karte">
      <header className="vis__kopf"><h3><IconRegister /> {l.titel}</h3></header>
      <p className="vis__einstieg">{l.einstieg}</p>
      <ol className="landkarte">
        {l.gruppen.map((g, i) => (
          <li key={i} className="lkgruppe">
            <div className="lkgruppe__nr">{i + 1}</div>
            <div className="lkgruppe__inhalt">
              <h4>{g.name}</h4>
              <ul>
                {g.eintraege.map((e, k) => (
                  <li key={k}><code>{e.n}</code><span>{e.t}</span></li>
                ))}
              </ul>
              {g.sperrt && <p className="lkgruppe__sperre"><IconPfeil /> {g.sperrt}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
