import React, { useEffect, useMemo, useState } from "react";
import { useMehrere, GEBIET_NAME, STUFE_NAME } from "../lib/daten";
import { useGelesen, useFaelleStand, useKartenStand, useQuizAntworten, useEigeneKarten } from "../lib/fortschritt";
import { useSpeicher } from "../lib/speicher";
import { HEUTE } from "../lib/wiederholung";
import { kartenBauen, KARTENTYPEN } from "../lib/karten";
import { zuordnung, beherrschungen, dringlichkeit, naechsterSchritt } from "../lib/kompetenz";
import { planen, erledigt, kartenHeute, quizAntworten, microBearbeitet, BUDGETS } from "../lib/sitzung";
import { microFuer } from "../data/fallklassen";
import { quizFuer } from "../data/quiz";
import { Kicker, Laden, Leer } from "./Bausteine";
import { IconPfeil, IconBuch, IconFaelle, IconKarten, IconTraining, IconStreit, IconHaken, IconKlausur, IconStart } from "./Icons";

const ART_ICON = { karten: IconKarten, micro: IconStart, lesen: IconBuch, fall: IconFaelle, streit: IconStreit, quiz: IconTraining };
const ART_NAME = { karten: "Behalten", micro: "Kurz anwenden", lesen: "Verstehen", fall: "Anwenden", streit: "Vertiefen", quiz: "Kontrolle" };

export default function Sitzung({ nav, gebiet, stufe, band }) {
  const daten = useMehrere(["definitionen", "probleme", "faelle", "rechtsstand"]);
  const { menge: gelesen } = useGelesen();
  const { stand: faelleStand } = useFaelleStand();
  const { stand: kartenStand } = useKartenStand();
  const { stand: quizStand } = useQuizAntworten();
  const { karten: eigene } = useEigeneKarten();
  const [plan, setPlan] = useSpeicher("sitzung", null);
  const [microStand] = useSpeicher("microcases", {});
  const [manuell, setManuell] = useState([]);
  const tag = HEUTE();

  /* Ein Plan von gestern ist kein Plan. */
  useEffect(() => {
    if (plan && (plan.tag !== tag || plan.gebiet !== gebiet || plan.stufe !== stufe)) setPlan(null);
  }, [plan, tag, gebiet, stufe, setPlan]);

  const kartenAlle = useMemo(
    () => (daten ? kartenBauen({ gebiet, stufe, ...daten, eigene, typen: KARTENTYPEN.map((t) => t.id) }) : []),
    [daten, gebiet, stufe, eigene]
  );

  const kompetenzen = useMemo(() => {
    if (!daten) return null;
    const zu = zuordnung(gebiet, stufe, { band, faelle: daten.faelle, probleme: daten.probleme, definitionen: daten.definitionen });
    return beherrschungen(zu, { gelesen, faelle: faelleStand, karten: kartenStand, quiz: quizStand }, tag)
      .map((x) => ({ ...x, dringend: dringlichkeit(x, kartenStand, tag), schritt: naechsterSchritt(x) }));
  }, [daten, gebiet, stufe, band, gelesen, faelleStand, kartenStand, quizStand, tag]);

  const kapitelVon = useMemo(() => {
    const m = new Map();
    for (const k of band.kapitel) for (const a of k.abschnitte) m.set(a.id, { ...a, kapitelId: k.id, kapitelTitel: k.titel });
    return m;
  }, [band]);

  if (!daten || !kompetenzen) return <Laden text="Lernstand wird ausgewertet …" />;

  const bauen = (minuten) => {
    const p = planen({
      minuten,
      kompetenzen,
      kartenIds: kartenAlle.map((k) => k.id),
      kartenStand,
      gelesen,
      faelleStand,
      abschnittInfo: (id) => kapitelVon.get(id),
      fallInfo: (id) => daten.faelle.faelle.find((f) => f.id === id),
      problemInfo: (id) => daten.probleme.probleme.find((x) => x.id === id),
      quizAnzahl: quizFuer(gebiet, stufe).length,
      micro: microFuer(gebiet, stufe),
      microStand,
      tag,
    });
    setPlan({
      ...p,
      tag,
      gebiet,
      stufe,
      minuten,
      begonnen: Date.now(),
      basis: { karten: kartenHeute(kartenStand, tag), quiz: quizAntworten(quizStand), micro: microBearbeitet(microStand) },
    });
    setManuell([]);
  };

  if (!plan) return <Auswahl nav={nav} gebiet={gebiet} stufe={stufe} kompetenzen={kompetenzen} bauen={bauen} />;

  const zustand = { gelesen, faelleStand, kartenStand, quizStand, microStand, basis: plan.basis, manuell, tag };
  const schritte = plan.schritte.map((s) => ({ ...s, fertig: erledigt(s, zustand) }));
  const fertigN = schritte.filter((s) => s.fertig).length;
  const geschafft = schritte.filter((s) => s.fertig).reduce((a, s) => a + s.minuten, 0);
  const anteil = plan.geplant ? Math.round((geschafft / plan.geplant) * 100) : 0;
  const naechster = schritte.find((s) => !s.fertig);
  const vergangen = Math.round((Date.now() - plan.begonnen) / 60000);

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>{plan.minuten} Minuten</h1>
          <p className="lead">
            {fertigN === schritte.length
              ? "Durch. Der Plan ist abgearbeitet – das war keine Beschäftigung, sondern gezielte Arbeit an den schwächsten Stellen."
              : `Vier Arten von Nachweis, in der Reihenfolge, in der sie am meisten bringen. ${naechster ? `Als Nächstes: ${naechster.titel}.` : ""}`}
          </p>
        </div>
        <span className="zaehler">{plan.geplant} Min. geplant · {vergangen} Min. vergangen · {fertigN} von {schritte.length} erledigt</span>
      </div>

      <section className="panel sitzungskopf">
        <div className="sitzungskopf__balken">
          <div className={`balken${anteil >= 100 ? " balken--fertig" : ""}`}><span style={{ width: `${Math.min(100, anteil)}%` }} /></div>
          <span>{Math.round(geschafft)} von {plan.geplant} geplanten Minuten erledigt</span>
        </div>
        <div className="knopfreihe">
          {naechster && <button className="btn" onClick={() => nav(naechster.route)}>Weiter mit „{ART_NAME[naechster.art]}“ <IconPfeil /></button>}
          <button className="btn btn--geist btn--klein" onClick={() => setPlan(null)}>Neu planen</button>
        </div>
      </section>

      <ol className="sitzungsliste">
        {schritte.map((s, i) => {
          const Icon = ART_ICON[s.art] || IconKarten;
          const dran = !s.fertig && s.id === naechster?.id;
          return (
            <li key={s.id} className={`sitzungsschritt${s.fertig ? " sitzungsschritt--fertig" : ""}${dran ? " sitzungsschritt--dran" : ""}`}>
              <span className="sitzungsschritt__nr">{s.fertig ? <IconHaken /> : i + 1}</span>
              <div className="sitzungsschritt__text">
                <span className="sitzungsschritt__art"><Icon /> {ART_NAME[s.art]} · {s.minuten} Min.</span>
                <strong>{s.titel}</strong>
                <p>{s.grund}</p>
              </div>
              <div className="sitzungsschritt__aktion">
                {s.fertig ? (
                  <span className="tag tag--gruen">erledigt</span>
                ) : (
                  <>
                    <button className="btn btn--klein" onClick={() => nav(s.route)}>Start <IconPfeil /></button>
                    {(s.art === "streit" || s.art === "quiz" || s.art === "micro") && (
                      <button className="btn btn--klein btn--geist" onClick={() => setManuell([...manuell, s.id])}>Erledigt</button>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {fertigN === schritte.length && (
        <section className="panel panel--marke" style={{ marginTop: 16 }}>
          <div className="panel__head"><h3>Sitzung abgeschlossen</h3></div>
          <p style={{ marginBottom: 14 }}>Der nächste Plan rechnet mit dem, was Sie gerade gelernt haben – die Kompetenzen haben sich verschoben.</p>
          <div className="knopfreihe">
            <button className="btn" onClick={() => setPlan(null)}>Noch eine Runde</button>
            <button className="btn btn--linie" onClick={() => nav({ ansicht: "kompetenzen" })}>Was sich verändert hat</button>
          </div>
        </section>
      )}
    </>
  );
}

function Auswahl({ nav, gebiet, stufe, kompetenzen, bauen }) {
  const schwach = [...kompetenzen].sort((a, b) => b.dringend - a.dringend).slice(0, 3);
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Wie viel Zeit haben Sie?</h1>
          <p className="lead">
            Kein Wochenplan, der schon am Mittwoch nicht mehr stimmt. Sagen Sie, wie lange Sie jetzt Zeit haben –
            der Plan entsteht aus Ihrem Lernstand: fällige Karten zuerst, die Restzeit dorthin, wo der Nachweis am dünnsten ist.
          </p>
        </div>
      </div>

      <div className="budgets">
        {BUDGETS.map((b) => (
          <button key={b.minuten} className="budget" onClick={() => bauen(b.minuten)}>
            <strong>{b.minuten}</strong>
            <span>Minuten</span>
            <p>{b.text}</p>
          </button>
        ))}
      </div>

      <section className="panel" style={{ marginTop: 18 }}>
        <div className="panel__head"><h3>Woran der Plan ansetzen wird</h3></div>
        {!schwach.length && <Leer titel="Noch kein Lernstand" text="Lesen Sie einen Abschnitt – danach kann geplant werden." />}
        <div className="kompetenzstreifen">
          {schwach.map((k) => (
            <button key={k.id} className="kompetenzzeile" onClick={() => nav({ ansicht: "kompetenzen" })}>
              <span><strong>{k.name}</strong><span style={{ display: "block", fontSize: 12, color: "var(--ink-weich)" }}>{k.schritt.text}</span></span>
              <span className="mini"><i style={{ width: `${Math.round(k.grad * 100)}%` }} /></span>
              <em>{Math.round(k.grad * 100)}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="panel" style={{ marginTop: 14 }}>
        <div className="panel__head"><h3>Warum nicht einfach ein Wochenplan?</h3></div>
        <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: 0 }}>
          Weil er nicht eingehalten wird. Ein Plan, der eine feste Stundenzahl pro Tag voraussetzt, ist nach drei
          verpassten Tagen eine Schuldenliste. Der Lernplan bis zum Examenstermin bleibt als Landkarte erhalten – aber
          was Sie heute Abend tun, entscheidet die Zeit, die Sie wirklich haben, nicht die, die Sie im Januar geplant hatten.
        </p>
        <div className="knopfreihe" style={{ marginTop: 12 }}>
          <button className="btn btn--linie btn--klein" onClick={() => nav({ ansicht: "plan" })}><IconKlausur /> Zum Lernplan bis zum Examen</button>
        </div>
      </section>
    </>
  );
}
