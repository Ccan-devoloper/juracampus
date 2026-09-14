import React from "react";
import { werk } from "../lib/daten";
import { IconBuch, IconSchema, IconFaelle, IconKarten, IconKlausur, IconAktuell, IconSonne, IconMond, IconStreit, IconPlan, IconRegister } from "./Icons";

const GEBIETE = [
  { id: "zivil", kuerzel: "ZR", name: "Zivilrecht", text: "BGB, HGB, Gesellschafts-, Arbeits-, Familien- und Erbrecht · Referendariat: Relation, Urteil, Anwaltsklausur, ZPO" },
  { id: "oeff", kuerzel: "ÖR", name: "Öffentliches Recht", text: "Grundrechte, Staatsorganisation, VwGO, Polizei-, Bau-, Kommunalrecht · Referendariat: Urteil, Bescheid, Behördenklausur" },
  { id: "straf", kuerzel: "StR", name: "Strafrecht", text: "StGB AT und BT, StPO · Referendariat: Anklageschrift, Revision" },
];

const FEATURES = [
  { Icon: IconBuch, titel: "Lehrbuch in neun Bänden", text: "Systematisch von der Methodik bis zur Endkontrolle vor Abgabe. Jedes Normzitat ist anklickbar und führt zu allen Fundstellen im Werk." },
  { Icon: IconSchema, titel: "Prüfungsschemata", text: "Die Aufbauschemata beider Examina mit Normen, Merksätzen und einem Trainer, der die Reihenfolge abfragt." },
  { Icon: IconStreit, titel: "Streitstände", text: "227 Meinungsstreite kompakt: Problem, Ansichten, Argumente, Stellungnahme – mit hervorgehobener h. M. und Rechtsprechung." },
  { Icon: IconFaelle, titel: "Fälle mit Lösungsskizze", text: "Klassiker und Examenskombinationen als Sachverhalt, Kernfragen, Lösungsskizze und Examenshinweis. Erst selbst lösen, dann vergleichen." },
  { Icon: IconKarten, titel: "Karteikarten mit System", text: "Definitionen, Streitstände, Fälle, Schemata und Normen als Karten – wiederholt nach dem SM-2-Algorithmus genau dann, wenn Vergessen droht." },
  { Icon: IconKlausur, titel: "Klausurmodus und Lernplan", text: "Fälle unter Zeitdruck mit gesperrter Lösung, Selbstbewertung und Auswertung. Ein Lernplan verteilt den Stoff bis zum Examenstermin." },
  { Icon: IconAktuell, titel: "Rechtsstand 2026", text: "Beck-online-validiert zum 13. September 2026: Sperrliste veralteter Zahlen und Normen, Hinweise zu MoPeG, Art. 94 GG, § 477 BGB, Recht auf Reparatur." },
  { Icon: IconRegister, titel: "Normenregister und Lexikon", text: "Über 800 Einzelnormen mit Fundstellen und 2.300 Fachbegriffe – jedes Wort im Werk in einer Sekunde gefunden." },
  { Icon: IconPlan, titel: "Motivation, die trägt", text: "Tagesziel, Streak, Level und Erfahrungspunkte machen sichtbar, was heute geschafft ist. Ohne Konto, alles bleibt auf deinem Gerät." },
];

export default function Start({ nav, dunkel, setDunkel }) {
  const z = werk.zaehler;
  return (
    <div className="start">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div className="brand" style={{ color: "var(--ink)" }}>
          <span className="brand__mark" style={{ background: "var(--marke-tief)", color: "#fff" }}>§</span>
          <span className="brand__text"><strong>JuraCampus</strong><span>1. und 2. Staatsexamen</span></span>
        </div>
        <button className="iconbtn" style={{ color: "var(--ink)", borderColor: "var(--linie)" }} onClick={() => setDunkel(!dunkel)} aria-label={dunkel ? "Helles Design" : "Dunkles Design"}>{dunkel ? <IconSonne /> : <IconMond />}</button>
      </div>

      <div className="start__hero" style={{ marginTop: 34 }}>
        <div>
          <span className="kicker">Stand 13. September 2026 · Beck-online-validiert</span>
          <h1>Das ganze Examen. <em>Ein Campus.</em></h1>
          <p className="lead">Lehrbuch, Schemata, Streitstände, Fälle, Karteikarten und Klausurtraining für beide juristischen Staatsexamina – aufgebaut wie ein guter Repetitor arbeitet: erst verstehen, dann anwenden, dann wiederholen.</p>
          <div className="knopfreihe" style={{ marginTop: 20 }}>
            <button className="btn btn--gross" onClick={() => nav({ gebiet: "zivil", stufe: 1, ansicht: "cockpit" })}>Mit Zivilrecht starten</button>
            <button className="btn btn--gross btn--linie" onClick={() => nav({ gebiet: "zivil", stufe: 1, ansicht: "faelle" })}>Einen Fall ausprobieren</button>
          </div>
        </div>
        <div className="start__wahl" aria-label="Rechtsgebiet wählen">
          {GEBIETE.map((g) => (
            <button key={g.id} className="start__karte" onClick={() => nav({ gebiet: g.id, stufe: 1, ansicht: "cockpit" })}>
              <b className={`gebiet-farbe--${g.id}`}>{g.kuerzel}</b>
              <div><strong>{g.name}</strong><span>{g.text}</span></div>
              <div className="stufenwahl">
                <span onClick={(e) => { e.stopPropagation(); nav({ gebiet: g.id, stufe: 1, ansicht: "cockpit" }); }}>1. Examen</span>
                <span onClick={(e) => { e.stopPropagation(); nav({ gebiet: g.id, stufe: 2, ansicht: "cockpit" }); }}>2. Examen</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="start__zahlen">
        <div className="zahl-kachel"><strong>{z.kapitel}</strong><span>Kapitel in {werk.baende.length} Fachbänden, {z.abschnitte} Abschnitte</span></div>
        <div className="zahl-kachel"><strong>{z.faelle}</strong><span>Fälle mit Sachverhalt, Kernfragen, Lösungsskizze und Examenshinweis</span></div>
        <div className="zahl-kachel"><strong>{z.probleme}</strong><span>Streitstände und Einzelprobleme, nach Rechtsgebiet sortiert</span></div>
        <div className="zahl-kachel"><strong>{z.normen}</strong><span>Einzelnormen im Register, {z.begriffe.toLocaleString("de-DE")} Begriffe im Lexikon</span></div>
      </div>

      <div className="start__features">
        {FEATURES.map((f) => (
          <div key={f.titel} className="feature"><b><f.Icon /></b><h3>{f.titel}</h3><p>{f.text}</p></div>
        ))}
      </div>

      <p className="start__fuss">{werk.stand} Alle Lernstände werden ausschließlich im Browser gespeichert (kein Konto, keine Übertragung). Über die Einstellungen lässt sich der Stand als Datei sichern und auf einem anderen Gerät einspielen. Die Examensrelevanz-Marker sind eine redaktionelle Einschätzung.</p>
    </div>
  );
}
