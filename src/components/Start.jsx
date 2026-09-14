import React from "react";
import { werk } from "../lib/daten";
import { IconBuch, IconSchema, IconFaelle, IconKarten, IconKlausur, IconAktuell, IconSonne, IconMond, IconStreit, IconPlan, IconRegister, IconPokal, IconStart, IconTraining } from "./Icons";
import { KOMPETENZEN } from "../data/kompetenzen";
import { ERKLAERUNGEN } from "../data/erklaerungen";
import { STREITBILDER } from "../data/streitbilder";
import { MICROCASES, KLAUSUREN } from "../data/fallklassen";

const GEBIETE = [
  { id: "zivil", kuerzel: "ZR", name: "Zivilrecht", text: "BGB, HGB, Gesellschafts-, Arbeits-, Familien- und Erbrecht · Referendariat: Relation, Urteil, Anwaltsklausur, ZPO" },
  { id: "oeff", kuerzel: "ÖR", name: "Öffentliches Recht", text: "Grundrechte, Staatsorganisation, VwGO, Polizei-, Bau-, Kommunalrecht · Referendariat: Urteil, Bescheid, Behördenklausur" },
  { id: "straf", kuerzel: "StR", name: "Strafrecht", text: "StGB AT und BT, StPO · Referendariat: Anklageschrift, Revision" },
];

const FEATURES = [
  { Icon: IconPokal, titel: "Kompetenzen statt Prozentbalken", text: "Ein Fortschrittsbalken misst, wie viel Sie abgehakt haben. Der Beherrschungsgrad misst, wie viele unabhängige Nachweise für Können vorliegen: Lesen, Fälle, Kartenabruf, Quiz. Wer nur liest, kommt bewusst nicht über 42 von 100 hinaus." },
  { Icon: IconStart, titel: "„Ich habe jetzt 25 Minuten“", text: "Kein Wochenplan, der am Mittwoch nicht mehr stimmt. Sagen Sie, wie viel Zeit Sie haben – der Plan entsteht aus Ihrem Lernstand: fällige Karten zuerst, die Restzeit dorthin, wo der Nachweis am dünnsten ist. Jeder Schritt nennt seinen Grund." },
  { Icon: IconBuch, titel: "Erklärungen in drei Stufen", text: "30 Sekunden, 3 bis 5 Minuten, Vertiefung – für alle 60 hochrelevanten Kompetenzen beider Examina. Dazu je ein Beispiel, ein Gegenbeispiel, eine kopierbare Klausurformulierung und die typischen Fehler samt Begründung, warum sie falsch sind." },
  { Icon: IconStreit, titel: "Streitstände Schritt für Schritt", text: "Problemtrigger, Streitfrage, beide Ansichten mit Argumenten und Gegenargumenten, Rechtsprechung – und die Entscheidungserheblichkeit: wann der Streit überhaupt einen Unterschied macht. Wer ihn sonst ausbreitet, verliert Zeit und Punkte." },
  { Icon: IconFaelle, titel: "Vom Microcase zur Examensklausur", text: "Drei Größen, weil drei Fähigkeiten dahinterstehen: zwei Minuten für ein Problem, zwanzig für den Übungsfall, fünf Stunden für die echte Klausur – mit Bearbeitervermerk, laufender Uhr und einem Erwartungshorizont, der jeden Block mit Punkten bewertet." },
  { Icon: IconKarten, titel: "Wiederholung nach FSRS", text: "Das Verfahren schätzt für jede Karte getrennt, wie fest das Wissen sitzt und wie schwer der Stoff Ihnen fällt, und legt die Wiederholung genau vor den Punkt, an dem Sie sie vergessen würden." },
  { Icon: IconTraining, titel: "Fehleranalyse, die Namen nennt", text: "„Hier war noch ein Fehler“ hilft niemandem. Klausuren gehen an benennbaren Verwechslungen kaputt: Vertreter oder Bote, Einwendung oder Einrede, Sachrüge oder Verfahrensrüge. Trainiert wird die Zuordnung, nicht die Definition." },
  { Icon: IconRegister, titel: "Landesrecht, wo es zählt", text: "In Bayern zitieren Sie Art. 11 PAG, in Nordrhein-Westfalen § 8 PolG NRW und § 14 OBG NRW, in Schleswig-Holstein das LVwG. Sagen Sie einmal, wo Sie Examen schreiben – die Erklärungen im Öffentlichen Recht folgen Ihrem Prüfungsland." },
  { Icon: IconAktuell, titel: "Offengelegte Methodik", text: "Eine Seite sagt, was bei jedem Build geprüft wird und was ausdrücklich nicht. Ein Änderungsprotokoll weist jede Änderung mit Datum und Umfang aus. Rechtsstand 13. September 2026; bei Gesetzesänderungen hat der amtliche Text Vorrang." },
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
          <span className="kicker">Redaktioneller Stand 13. September 2026</span>
          <h1>Das ganze Examen. <em>Ein Campus.</em></h1>
          <p className="lead">Lehrbuch, Schemata, Streitstände, Fälle und Klausurtraining für beide juristischen Staatsexamina – aufgebaut wie ein guter Repetitor arbeitet: erst verstehen, dann anwenden, dann wiederholen. Gemessen wird nicht, wie viel Sie abgehakt haben, sondern was Sie können.</p>
          <div className="knopfreihe" style={{ marginTop: 20 }}>
            <button className="btn btn--gross" onClick={() => nav({ gebiet: "zivil", stufe: 1, ansicht: "cockpit" })}>Mit Zivilrecht starten</button>
            <button className="btn btn--gross btn--linie" onClick={() => nav({ gebiet: "zivil", stufe: 1, ansicht: "sitzung" })}>Ich habe jetzt Zeit</button>
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
        <div className="zahl-kachel"><strong>{KOMPETENZEN.length}</strong><span>Kompetenzen mit Beherrschungsgrad, {ERKLAERUNGEN.length} davon dreistufig erklärt</span></div>
        <div className="zahl-kachel"><strong>{STREITBILDER.length}</strong><span>Streitstände Schritt für Schritt ausgearbeitet, mit Entscheidungserheblichkeit</span></div>
        <div className="zahl-kachel"><strong>{MICROCASES.length}</strong><span>Microcases in zwei Minuten, dazu {KLAUSUREN.length} Examensklausuren mit Erwartungshorizont</span></div>
      </div>

      <div className="start__features">
        {FEATURES.map((f) => (
          <div key={f.titel} className="feature"><b><f.Icon /></b><h3>{f.titel}</h3><p>{f.text}</p></div>
        ))}
      </div>

      <div className="knopfreihe" style={{ justifyContent: "center", marginTop: 26 }}>
        <button className="btn btn--linie" onClick={() => nav({ global: "methodik" })}><IconAktuell /> Methodik und Änderungsprotokoll</button>
        <button className="btn btn--linie" onClick={() => nav({ global: "landesrecht" })}><IconRegister /> Landesrecht wählen</button>
      </div>

      <p className="start__fuss">{werk.stand} Alle Lernstände werden ausschließlich im Browser gespeichert (kein Konto, keine Übertragung). Über die Einstellungen lässt sich der Stand als Datei sichern und auf einem anderen Gerät einspielen. Die Examensrelevanz-Marker sind eine redaktionelle Einschätzung.</p>
    </div>
  );
}
