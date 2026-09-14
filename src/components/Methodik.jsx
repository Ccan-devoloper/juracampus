import React from "react";
import { werk } from "../lib/daten";
import { PROTOKOLL, ART_LABEL, LETZTE_AENDERUNG } from "../data/protokoll";
import { KOMPETENZEN } from "../data/kompetenzen";
import { ERKLAERUNGEN } from "../data/erklaerungen";
import { STREITBILDER } from "../data/streitbilder";
import { MICROCASES, KLAUSUREN } from "../data/fallklassen";
import { VERWECHSLUNGEN } from "../data/verwechslungen";
import { Kicker } from "./Bausteine";
import { IconAktuell, IconHaken, IconStreit, IconPfeil } from "./Icons";

/* Vertrauen entsteht nicht durch Siegel, sondern dadurch, dass jemand sagt,
   wie er arbeitet und wo seine Aussagen enden. Diese Seite tut beides an
   einer Stelle – und das Änderungsprotokoll belegt es. */

const GEPRUEFT = [
  "Jede Verweisung im Werk zeigt auf ein existierendes Kapitel; das prüft ein Skript bei jedem Build.",
  "Jedes Normzitat wird maschinell erkannt und im Normenregister verknüpft – über 800 Einzelnormen aus 32 Gesetzen.",
  "Jede Erklärung hat mindestens drei Prüfungsschritte, zwei Vertiefungen, zwei Fehlerfallen, ein Beispiel und ein Gegenbeispiel.",
  "Jeder Entscheidungsbaum endet in Blättern, die eine Norm nennen; jede Landkartengruppe nennt ihre Sperrwirkung.",
  "Jede Examensklausur ergibt im Erwartungshorizont genau 100 Punkte.",
  "Jeder Streitstand im Achtschritt-Modell nennt beide Ansichten mit Argumenten und Gegenargumenten sowie die Entscheidungserheblichkeit.",
];

const NICHT_GEPRUEFT = [
  "Die Inhalte sind nicht durch eine externe Redaktion oder einen Verlag gegengelesen.",
  "Die Examensrelevanz-Marker sind eine redaktionelle Einschätzung, keine Auswertung von Prüfungsstatistiken.",
  "Die Angaben zum Landesrecht nennen Gesetzeskürzel und den Grundstand des Vorverfahrens – nicht dessen jeweils aktuelle Ausnahmen.",
  "Der Rechtsstand ist der des Quellwerks. Spätere Gesetzesänderungen sind nicht eingearbeitet, solange sie hier nicht protokolliert sind.",
  "Es findet keine menschliche Korrektur eigener Klausuren statt; die Bewertung im Erwartungshorizont ist Selbstbewertung.",
];

export default function Methodik({ nav }) {
  const zahlen = [
    { z: werk.baende.reduce((s, b) => s + b.kapitel.length, 0), l: "Kapitel aus dem Quellwerk" },
    { z: KOMPETENZEN.length, l: "Kompetenzknoten" },
    { z: ERKLAERUNGEN.length, l: "dreistufige Erklärungen" },
    { z: STREITBILDER.length, l: "ausgearbeitete Streitstände" },
    { z: MICROCASES.length, l: "Microcases" },
    { z: KLAUSUREN.length, l: "Examensklausuren" },
    { z: VERWECHSLUNGEN.length, l: "Verwechslungspaare" },
  ];

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker neutral>Methodik und Grenzen</Kicker>
          <h1>Wie diese Seite arbeitet</h1>
          <p className="lead">
            Wer juristische Inhalte anbietet, schuldet zwei Angaben: wie er arbeitet und wo seine Aussagen enden.
            Beides steht hier – und das Änderungsprotokoll darunter belegt, wann was geändert wurde.
            Letzte Änderung: {new Date(LETZTE_AENDERUNG).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}.
          </p>
        </div>
      </div>

      <div className="zahlenband">
        {zahlen.map((z) => (
          <div key={z.l}><strong>{z.z}</strong><span>{z.l}</span></div>
        ))}
      </div>

      <div className="raster raster--2" style={{ marginTop: 16 }}>
        <section className="panel panel--gruen">
          <div className="panel__head"><h2><IconHaken /> Was geprüft wird</h2><span className="zaehler">bei jedem Build</span></div>
          <ul className="pruefliste">{GEPRUEFT.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </section>
        <section className="panel panel--rot">
          <div className="panel__head"><h2><IconStreit /> Was nicht geprüft wird</h2><span className="zaehler">ausdrücklich</span></div>
          <ul className="pruefliste pruefliste--offen">{NICHT_GEPRUEFT.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </section>
      </div>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel__head"><h2>Die drei Entscheidungen, die alles andere bestimmen</h2></div>
        <div className="raster raster--3">
          <div className="methodenblock">
            <h3>Können statt Fleiß</h3>
            <p>
              Ein Prozentbalken misst, wie viel jemand abgehakt hat. Der Beherrschungsgrad misst, wie viele unabhängige
              Nachweise für Können vorliegen: gelesene Abschnitte, gelöste Fälle, Abrufwahrscheinlichkeit der Karten,
              Quizquote. Die Zahl der belegten Nachweisarten deckelt den Wert – wer nur liest, endet bei 42 von 100.
            </p>
          </div>
          <div className="methodenblock">
            <h3>Vergessen einrechnen</h3>
            <p>
              Wiederholt wird nach FSRS. Das Verfahren schätzt für jede Karte getrennt, wie fest das Wissen sitzt und wie
              schwer der Stoff fällt, und legt die Wiederholung vor den Punkt, an dem sie vergessen würde. Der Wert
              „Behalten" sinkt deshalb von selbst, wenn nicht wiederholt wird.
            </p>
          </div>
          <div className="methodenblock">
            <h3>Streit nur, wo er zählt</h3>
            <p>
              Jeder ausgearbeitete Streitstand nennt seine Entscheidungserheblichkeit: wann er einen Unterschied macht –
              und wann nicht. Ein Streit, der im konkreten Fall zum selben Ergebnis führt, wird benannt und nicht
              entschieden. Wer ihn trotzdem ausbreitet, verliert Zeit und Punkte.
            </p>
          </div>
        </div>
      </section>

      <section className="abschnitt" style={{ marginTop: 22 }}>
        <div className="abschnitt__kopf"><h2>Änderungsprotokoll</h2><span className="zaehler">{PROTOKOLL.length} Einträge</span></div>
        <ol className="protokoll">
          {PROTOKOLL.map((p, i) => (
            <li key={i} className={`protokolleintrag protokolleintrag--${p.art}`}>
              <div className="protokolleintrag__meta">
                <time dateTime={p.datum}>{new Date(p.datum).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}</time>
                <span className={`tag tag--${ART_LABEL[p.art].ton}`}>{ART_LABEL[p.art].name}</span>
              </div>
              <div>
                <strong>{p.titel}</strong>
                <p>{p.text}</p>
                {p.umfang && <em>{p.umfang}</em>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel__head"><h3><IconAktuell /> Rechtsstand</h3></div>
        <p style={{ fontSize: 14, lineHeight: 1.65, margin: "0 0 10px" }}>{werk.stand}</p>
        <p style={{ fontSize: 13.5, color: "var(--ink-weich)", lineHeight: 1.65, margin: 0 }}>
          Bei Gesetzesänderungen hat der amtliche Text Vorrang. Die Seite „Rechtsstand 2026" führt die Bereiche auf, in
          denen ältere Zahlen und Normen kursieren, und markiert sie im Lehrbuch.
        </p>
        <div className="knopfreihe" style={{ marginTop: 12 }}>
          <button className="btn btn--klein btn--linie" onClick={() => nav({ global: "rechtsstand" })}>Zur Sperrliste <IconPfeil /></button>
          <button className="btn btn--klein btn--linie" onClick={() => nav({ global: "landesrecht" })}>Zum Landesrecht <IconPfeil /></button>
        </div>
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel__head"><h3>Lesbar auch ohne die Anwendung</h3></div>
        <p style={{ fontSize: 13.5, color: "var(--ink-weich)", lineHeight: 1.65, margin: "0 0 12px" }}>
          Jede Erklärung, jeder ausgearbeitete Streitstand und jede Landesrechtsübersicht existiert zusätzlich als
          eigenständige Seite mit vollständigem Text – ohne JavaScript lesbar, verlinkbar und zitierbar. Das ist keine
          Suchmaschinenoptimierung mit leeren Seiten, sondern derselbe Inhalt in einer Form, die man weitergeben kann.
        </p>
        <a className="btn btn--klein btn--linie" href="./s/" target="_blank" rel="noopener">Alle Einzelseiten öffnen <IconPfeil /></a>
      </section>
    </>
  );
}
