import React, { useMemo, useState } from "react";
import { useMehrere, GEBIET_NAME, STUFE_NAME } from "../lib/daten";
import { useGelesen, useFaelleStand, useKartenStand, useQuizAntworten } from "../lib/fortschritt";
import { HEUTE, istFaellig } from "../lib/wiederholung";
import { zuordnung, beherrschungen, dringlichkeit, naechsterSchritt } from "../lib/kompetenz";
import { STUFEN_NAMEN, kompetenzFinden } from "../data/kompetenzen";
import { RELEVANZ } from "../data/relevanz";
import { Kicker, Laden, Leer } from "./Bausteine";
import { IconPfeil, IconBuch, IconFaelle, IconKarten, IconTraining, IconStreit } from "./Icons";

const NACHWEISE = [
  { id: "verstehen", label: "Verstehen", was: "gelesene Abschnitte" },
  { id: "anwenden", label: "Anwenden", was: "gelöste Fälle" },
  { id: "behalten", label: "Behalten", was: "Abruf der Karten" },
  { id: "kontrolle", label: "Kontrolle", was: "Quizfragen" },
];

const SCHRITT_ICON = { lesen: IconBuch, fall: IconFaelle, karte: IconKarten, quiz: IconTraining, vertiefen: IconStreit };

const FILTER = [
  { id: "bedarf", label: "Handlungsbedarf" },
  { id: "hoch", label: "Nur hochrelevant" },
  { id: "alle", label: "Alle Kompetenzen" },
  { id: "stark", label: "Was schon sitzt" },
];

export default function Kompetenzen({ nav, gebiet, stufe, band }) {
  const daten = useMehrere(["faelle", "probleme", "definitionen"]);
  const { menge: gelesen } = useGelesen();
  const { stand: faelleStand } = useFaelleStand();
  const { stand: kartenStand } = useKartenStand();
  const { stand: quizStand } = useQuizAntworten();
  const [filter, setFilter] = useState("bedarf");
  const [offen, setOffen] = useState(null);
  const tag = HEUTE();

  const zu = useMemo(
    () => (daten ? zuordnung(gebiet, stufe, { band, faelle: daten.faelle, probleme: daten.probleme, definitionen: daten.definitionen }) : null),
    [daten, gebiet, stufe, band]
  );

  const liste = useMemo(() => {
    if (!zu) return [];
    const b = beherrschungen(zu, { gelesen, faelle: faelleStand, karten: kartenStand, quiz: quizStand }, tag);
    return b.map((x) => ({ ...x, dringend: dringlichkeit(x, kartenStand, tag), schritt: naechsterSchritt(x) }));
  }, [zu, gelesen, faelleStand, kartenStand, quizStand, tag]);

  const kapitelVon = useMemo(() => {
    const m = new Map();
    for (const k of band.kapitel) for (const a of k.abschnitte) m.set(a.id, { kapitel: k, abschnitt: a });
    return m;
  }, [band]);

  if (!daten) return <Laden />;
  if (!liste.length) return <Leer titel="Für diesen Bereich sind noch keine Kompetenzen hinterlegt" text="Das Kompetenzmodell wird Gebiet für Gebiet ergänzt." />;

  const gezeigt = (() => {
    const s = [...liste];
    if (filter === "hoch") return s.filter((x) => x.relevanz === "hoch").sort((a, b) => b.dringend - a.dringend);
    if (filter === "alle") return s.sort((a, b) => b.grad - a.grad || a.name.localeCompare(b.name, "de"));
    if (filter === "stark") return s.filter((x) => x.grad >= 0.6).sort((a, b) => b.grad - a.grad);
    return s.sort((a, b) => b.dringend - a.dringend);
  })();

  /* Verteilung über die Beherrschungsstufen – das ist der ehrliche Ersatz für
     den einen großen Prozentbalken. */
  const verteilung = STUFEN_NAMEN.map((s) => ({ ...s, anzahl: liste.filter((x) => x.stufe.id === s.id).length })).filter((s) => s.anzahl > 0);
  const mittel = liste.reduce((s, x) => s + x.grad, 0) / liste.length;
  const reif = liste.filter((x) => x.grad >= 0.78).length;
  const offenN = liste.filter((x) => x.grad < 0.15).length;
  const faelligeKnoten = liste.filter((x) => x.fach.karten.some((id) => kartenStand[id] && istFaellig(kartenStand[id], tag))).length;

  const zumSchritt = (b) => {
    const art = b.schritt.art;
    const knoten = kompetenzFinden(b.id);
    if (art === "lesen") {
      const ziel = b.fach.abschnitte.find((id) => !gelesen.has(id)) || b.fach.abschnitte[0];
      const e = kapitelVon.get(ziel);
      if (e) return nav({ ansicht: "lehrbuch", id: e.kapitel.id, sub: e.abschnitt.id });
    }
    if (art === "fall") {
      const ziel = b.fach.faelle.find((id) => !faelleStand[id]?.bewertung) || b.fach.faelle[0];
      if (ziel) return nav({ ansicht: "faelle", id: ziel });
    }
    if (art === "karte" || art === "halten") return nav({ ansicht: "karten" });
    if (art === "quiz") return nav({ ansicht: "training", id: "quiz" });
    if (art === "vertiefen" && b.fach.probleme.length) return nav({ ansicht: "streit", id: b.fach.probleme[0] });
    if (knoten && knoten.schema && b.fach.schemata.length) return nav({ ansicht: "schemata", id: b.fach.schemata[0] });
    const e = kapitelVon.get(b.fach.abschnitte[0]);
    if (e) return nav({ ansicht: "lehrbuch", id: e.kapitel.id, sub: e.abschnitt.id });
  };

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Kompetenzen</h1>
          <p className="lead">
            Nicht „73 % geschafft“, sondern: Was können Sie? Jede Kompetenz bekommt ihren Beherrschungsgrad aus vier
            unabhängigen Nachweisen – Lesen, Fälle, Karten, Quiz. Wer nur liest, kommt bewusst nicht über „Grundlagen“ hinaus.
          </p>
        </div>
        <span className="zaehler">{liste.length} Kompetenzen · {reif} klausurreif · {offenN} unberührt</span>
      </div>

      <section className="panel profil">
        <div className="profil__zahl">
          <strong>{Math.round(mittel * 100)}</strong>
          <span>mittlerer Beherrschungsgrad</span>
        </div>
        <div className="profil__band">
          <div className="profil__leiste" aria-label="Verteilung der Kompetenzen über die Beherrschungsstufen">
            {verteilung.map((s) => (
              <span key={s.id} className={`profil__teil profil__teil--${s.id}`} style={{ flexGrow: s.anzahl }} title={`${s.anzahl} × ${s.name}`}>
                {s.anzahl >= 3 ? s.anzahl : ""}
              </span>
            ))}
          </div>
          <div className="profil__legende">
            {verteilung.map((s) => (
              <span key={s.id}><i className={`punkt punkt--${s.id}`} />{s.name} · {s.anzahl}</span>
            ))}
          </div>
        </div>
        {faelligeKnoten > 0 && (
          <button className="btn btn--klein" onClick={() => nav({ ansicht: "karten" })}>
            {faelligeKnoten} Kompetenz{faelligeKnoten === 1 ? "" : "en"} mit fälligen Karten <IconPfeil />
          </button>
        )}
      </section>

      <div className="modus-wahl modus-wahl--schmal">
        {FILTER.map((f) => (
          <button key={f.id} className="modus modus--pille" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}><b>{f.label}</b></button>
        ))}
      </div>

      {!gezeigt.length && <Leer titel="Hier ist gerade nichts" text="Anderen Filter wählen." />}

      <div className="kompetenzliste">
        {gezeigt.map((b) => {
          const Icon = SCHRITT_ICON[b.schritt.art] || IconPfeil;
          const auf = offen === b.id;
          const knoten = kompetenzFinden(b.id);
          return (
            <article key={b.id} className={`kompetenz kompetenz--${b.stufe.id}${auf ? " kompetenz--offen" : ""}`}>
              <div className="kompetenz__kopf">
                <div className="kompetenz__titel">
                  <h3>{b.name}</h3>
                  <p>{b.kurz}</p>
                </div>
                <div className="kompetenz__grad">
                  <span className={`stufenpille stufenpille--${b.stufe.id}`}>{b.stufe.name}</span>
                  <em>{Math.round(b.grad * 100)}</em>
                </div>
              </div>

              <div className="nachweise">
                {NACHWEISE.map((n) => {
                  const t = b.teile[n.id];
                  const p = t ? Math.round(t.wert * 100) : null;
                  return (
                    <div key={n.id} className={`nachweis${t ? "" : " nachweis--leer"}`} title={t ? `${t.erfuellt} von ${t.moeglich} ${n.was}` : `Keine ${n.was} zugeordnet`}>
                      <span className="nachweis__label">{n.label}</span>
                      <span className="nachweis__balken"><i style={{ width: `${p || 0}%` }} /></span>
                      <span className="nachweis__wert">{t ? `${t.erfuellt}/${t.moeglich}` : "–"}</span>
                    </div>
                  );
                })}
              </div>

              <div className="kompetenz__fuss">
                <p className={`schritt schritt--${b.schritt.art}`}><Icon /> {b.schritt.text}</p>
                <div className="knopfreihe">
                  <button className="btn btn--klein" onClick={() => zumSchritt(b)}>Dranbleiben <IconPfeil /></button>
                  <button className="btn btn--klein btn--geist" onClick={() => setOffen(auf ? null : b.id)} aria-expanded={auf}>{auf ? "Weniger" : "Was gehört dazu?"}</button>
                  <span className={`relevanz relevanz--${b.relevanz}`}>{RELEVANZ[b.relevanz]?.label || b.relevanz}</span>
                </div>
              </div>

              {auf && (
                <div className="kompetenz__detail">
                  {b.decke < 1 && b.roh > b.decke && (
                    <p className="hinweiszeile">
                      Gedeckelt bei {Math.round(b.decke * 100)}: Sie haben {b.belegt} von vier Nachweisarten belegt.
                      Rechnerisch stünde hier {Math.round(b.roh * 100)} – aber ein Wert aus nur einer Quelle ist keine Beherrschung.
                    </p>
                  )}
                  {knoten?.verwechslung?.length === 2 && (
                    <p className="hinweiszeile hinweiszeile--warnung">
                      Typische Verwechslung: <b>{knoten.verwechslung[0]}</b> und <b>{knoten.verwechslung[1]}</b> nicht vermischen.
                    </p>
                  )}
                  <div className="detailraster">
                    <Spalte titel="Abschnitte" leer="keine zugeordnet" eintraege={b.fach.abschnitte.map((id) => {
                      const e = kapitelVon.get(id);
                      return e && { id, text: `${e.abschnitt.nr ? e.abschnitt.nr + " " : ""}${e.abschnitt.titel}`, fertig: gelesen.has(id), route: { ansicht: "lehrbuch", id: e.kapitel.id, sub: id } };
                    }).filter(Boolean)} nav={nav} />
                    <Spalte titel="Fälle" leer="keine zugeordnet" eintraege={b.fach.faelle.map((id) => {
                      const f = daten.faelle.faelle.find((x) => x.id === id);
                      return f && { id, text: f.name, fertig: !!faelleStand[id]?.bewertung, route: { ansicht: "faelle", id } };
                    }).filter(Boolean)} nav={nav} />
                    <Spalte titel="Streitstände" leer="keine zugeordnet" eintraege={b.fach.probleme.map((id) => {
                      const p = daten.probleme.probleme.find((x) => x.id === id);
                      return p && { id, text: p.titel, route: { ansicht: "streit", id } };
                    }).filter(Boolean)} nav={nav} />
                    <Spalte titel="Schemata" leer="keines zugeordnet" eintraege={b.fach.schemata.map((id) => ({ id, text: id.replace(/^s-/, "").replace(/-/g, " "), route: { ansicht: "schemata", id } }))} nav={nav} />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <section className="panel" style={{ marginTop: 22 }}>
        <div className="panel__head"><h3>Wie der Beherrschungsgrad gerechnet wird</h3></div>
        <div className="raster raster--2">
          <div>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: "0 0 10px" }}>
              Vier Nachweise, unterschiedlich gewichtet: Verstehen 22 %, Anwenden 30 %, Behalten 30 %, Kontrolle 18 %.
              „Behalten“ ist die Abrufwahrscheinlichkeit aus dem FSRS-Modell, nicht die Zahl gelernter Karten – Wissen zerfällt,
              der Wert sinkt also von selbst, wenn Sie nicht wiederholen.
            </p>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: 0 }}>
              Jeder Nachweis wird zusätzlich mit seiner Breite verrechnet: ein gelöster Fall aus zwölf trägt weniger als sechs.
              Und eine Quote aus einer einzigen Antwort wird geglättet, damit „1 von 1 richtig“ nicht 100 % ergibt.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: "0 0 10px" }}>
              <b>Die Decke</b> ist der wichtigste Teil: Mit einer belegten Nachweisart endet der Wert bei 42, mit zweien bei 66,
              mit dreien bei 84. Erst wer gelesen, gerechnet, wiederholt und kontrolliert hat, kann 100 erreichen.
            </p>
            <p style={{ fontSize: 13.5, color: "var(--ink-weich)", margin: 0 }}>
              Die Zuordnung von Inhalten zu Kompetenzen läuft über Normzitate (härtestes Signal), Kapiteltitel und Stichworte.
              Ein Inhalt kann zu zwei Kompetenzen gehören – „Anfechtung der Vertretererklärung“ gehört ehrlicherweise zu beiden.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Spalte({ titel, eintraege, leer, nav }) {
  return (
    <div className="detailspalte">
      <h4>{titel} <span>{eintraege.length}</span></h4>
      {!eintraege.length && <p className="detailspalte__leer">{leer}</p>}
      <ul>
        {eintraege.slice(0, 8).map((e) => (
          <li key={e.id}>
            <button onClick={() => nav(e.route)} className={e.fertig ? "fertig" : ""}>{e.text}</button>
          </li>
        ))}
      </ul>
      {eintraege.length > 8 && <p className="detailspalte__leer">… und {eintraege.length - 8} weitere</p>}
    </div>
  );
}
