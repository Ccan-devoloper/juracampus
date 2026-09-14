import React, { useEffect, useMemo, useState } from "react";
import { useDaten, GEBIET_NAME, STUFE_NAME } from "../lib/daten";
import { useGelesen, useFaelleStand, useKartenStand, zuletzt, anteil } from "../lib/fortschritt";
import { stand as xpStand, streak as streakVon, levelFuer, heuteXp, verlauf, tagesziel } from "../lib/xp";
import { HEUTE } from "../lib/wiederholung";
import { useSpeicher } from "../lib/speicher";
import { relevanzFuer, RELEVANZ } from "../data/relevanz";
import { SCHEMATA } from "../data/schemata";
import { Kicker, Ring } from "./Bausteine";
import { IconFlamme, IconHaken, IconPfeil, IconAktuell } from "./Icons";

const THESEN = {
  "zivil-1": { titel: <>Erst die Anspruchsgrundlage, <em>dann alles andere.</em></>, text: "Anspruch entstanden – erloschen – durchsetzbar. In dieser Reihenfolge lösen sich Kaufrecht, Delikt, Bereicherung und Sachenrecht fast von selbst." },
  "zivil-2": { titel: <>Erst die Akte ordnen, <em>dann das Recht.</em></>, text: "Schlüssigkeit, Erheblichkeit, Beweis – die Relation ist kein Ritual, sondern der Weg zum richtigen Tenor mit Kosten und Vollstreckbarkeit." },
  "oeff-1": { titel: <>Verfahrensart wählen, <em>dann prüfen.</em></>, text: "Statthaftigkeit vor Zulässigkeit, formelle vor materieller Rechtmäßigkeit, Schutzbereich vor Schranke – die Prüfungsfolge ist der halbe Erfolg." },
  "oeff-2": { titel: <>Tenor, Gründe, Kosten – <em>in dieser Reihenfolge.</em></>, text: "Urteil, Beschluss, Bescheid und Anwaltsschriftsatz haben feste Baupläne. Wer sie kennt, gewinnt Zeit für das materielle Problem." },
  "straf-1": { titel: <>Tatbestand, Rechtswidrigkeit, Schuld – <em>und nichts vermischen.</em></>, text: "Kausalität ist nicht Zurechnung, Vorsatz nicht Schuld, Teilnahme nicht Täterschaft. Jeder Zurechnungsschritt hat seinen Ort." },
  "straf-2": { titel: <>Beweisbar oder nicht – <em>das ist die Frage.</em></>, text: "Anklage und Revision verlangen die Verzahnung von materiellem Recht und Prozessrecht: hinreichender Tatverdacht, Rüge, Beruhen." },
};

export default function Cockpit({ nav, gebiet, stufe, band }) {
  const { menge: gelesen } = useGelesen();
  const { stand: faelleStand } = useFaelleStand();
  const { stand: kartenStand } = useKartenStand();
  const faelle = useDaten("faelle");
  const probleme = useDaten("probleme");
  const [ziel] = useSpeicher("tagesziel", 60);
  const [xp, setXp] = useState(() => xpStand());
  useEffect(() => {
    const auf = () => setXp(xpStand());
    window.addEventListener("jc-xp", auf);
    return () => window.removeEventListener("jc-xp", auf);
  }, []);

  const these = THESEN[`${gebiet}-${stufe}`];
  const alleAbschnitte = useMemo(() => band.kapitel.flatMap((k) => k.abschnitte.map((a) => ({ ...a, kapitel: k }))), [band]);
  const gelesenN = alleAbschnitte.filter((a) => gelesen.has(a.id)).length;
  const naechster = alleAbschnitte.find((a) => !gelesen.has(a.id)) || alleAbschnitte[0];

  const campusFaelle = useMemo(() => (faelle.daten ? faelle.daten.faelle.filter((f) => f.gebiet === gebiet && f.stufe === stufe) : []), [faelle.daten, gebiet, stufe]);
  const faelleGeloest = campusFaelle.filter((f) => faelleStand[f.id]?.bewertung).length;
  const offenerFall = campusFaelle.find((f) => !faelleStand[f.id]?.bewertung);
  const campusProbleme = useMemo(() => (probleme.daten ? probleme.daten.probleme.filter((p) => p.gebiet === gebiet && p.stufe === stufe) : []), [probleme.daten, gebiet, stufe]);
  const tagesProblem = campusProbleme.length ? campusProbleme[new Date().getDate() % campusProbleme.length] : null;

  const heute = HEUTE();
  const faellig = Object.values(kartenStand).filter((k) => k.due && k.due <= heute).length;
  const gelernt = Object.keys(kartenStand).length;
  const heutePunkte = heuteXp(xp);
  const streak = streakVon(xp);
  const level = levelFuer(xp.gesamt || 0);
  const verl = verlauf(14, xp);
  const maxTag = Math.max(1, ...verl.map((v) => v.xp));
  const zielProzent = Math.min(100, Math.round((heutePunkte / (ziel || tagesziel())) * 100));

  const verlaufListe = zuletzt((e) => e.gebiet === gebiet && e.stufe === stufe).slice(0, 5);
  const letzte = verlaufListe[0];
  const schemata = SCHEMATA.filter((s) => s.gebiet === gebiet && s.stufe === stufe);

  const weiter = () => {
    if (letzte && letzte.route) nav(letzte.route);
    else if (naechster) nav({ ansicht: "lehrbuch", id: naechster.kapitel.id, sub: naechster.id });
  };

  const aufgaben = [
    naechster && { id: "lesen", titel: `Lesen: ${naechster.kapitel.nr}. ${naechster.kapitel.titel}${naechster.nr ? " · " + naechster.nr : ""}`, text: `${naechster.titel} · ${naechster.minuten} Min.`, fertig: false, xp: "+XP", route: { ansicht: "lehrbuch", id: naechster.kapitel.id, sub: naechster.id } },
    { id: "karten", titel: faellig ? `${faellig} Karteikarte${faellig === 1 ? "" : "n"} wiederholen` : "Neue Karteikarten lernen", text: faellig ? "Fällige Wiederholungen nach dem Vergessensmodell" : `${gelernt} Karten im Wiederholungssystem`, fertig: gelernt > 0 && !faellig, xp: "3 XP je Karte", route: { ansicht: "karten" } },
    offenerFall && { id: "fall", titel: `Fall lösen: ${offenerFall.name}`, text: offenerFall.thema || offenerFall.teilName, fertig: false, xp: "bis 35 XP", route: { ansicht: "faelle", id: offenerFall.id } },
    tagesProblem && { id: "streit", titel: `Streitstand des Tages: ${tagesProblem.titel}`, text: tagesProblem.bereich, fertig: false, xp: "+Karte", route: { ansicht: "streit", id: tagesProblem.id } },
  ].filter(Boolean);

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Cockpit</h1>
          <p className="lead">{band.untertitel || band.titel}</p>
        </div>
        <span className="zaehler">Band {band.nr} · {band.kapitel.length} Kapitel · {alleAbschnitte.length} Abschnitte · {campusFaelle.length} Fälle · {campusProbleme.length} Streitstände</span>
      </div>

      <div className="cockpit">
        <section className="these">
          <Kicker>{stufe === 1 ? "Leitgedanke für die Klausur" : "Leitgedanke für die Aktenklausur"}</Kicker>
          <div><h2>{these.titel}</h2></div>
          <p>{these.text}</p>
          <div className="these__aktionen">
            <button className="btn" onClick={weiter}>{letzte ? "Weiterlernen" : "Loslegen"} <IconPfeil /></button>
            <button className="btn btn--linie" onClick={() => nav({ ansicht: "karten" })}>{faellig ? `${faellig} Karten fällig` : "Karteikarten"}</button>
            <button className="btn btn--linie" onClick={() => nav({ ansicht: "schemata" })}>Schemata</button>
          </div>
        </section>

        <section className="panel">
          <div className={`streak${streak > 0 && heutePunkte > 0 ? " streak--aktiv" : ""}`}>
            <div className="streak__flamme"><IconFlamme /></div>
            <div><strong>{streak} {streak === 1 ? "Tag" : "Tage"} in Folge</strong><span>{heutePunkte > 0 ? "Heute schon gelernt – weiter so." : streak > 0 ? "Heute noch nichts – der Streak wartet." : "Ab 13 Tagen wird daraus eine Gewohnheit."}</span></div>
          </div>
          <div className="tagesziel">
            <div className="tagesziel__kopf"><span>Tagesziel</span><b>{heutePunkte} / {ziel} XP</b></div>
            <div className={`balken${zielProzent >= 100 ? " balken--fertig" : ""}`}><span style={{ width: `${zielProzent}%` }} /></div>
          </div>
          <div className="verlauf" aria-label="Lernaktivität der letzten 14 Tage">
            {verl.map((v) => <span key={v.tag} className={`${v.xp > 0 ? "voll" : ""}${v.tag === heute ? " heute" : ""}`} style={{ height: `${Math.max(8, Math.round((v.xp / maxTag) * 100))}%` }} title={`${v.tag}: ${v.xp} XP`} />)}
          </div>
          <div className="verlauf__tage">{verl.map((v) => <span key={v.tag}>{v.wochentag[0]}</span>)}</div>
          <div className="level" style={{ marginTop: 14 }}>
            <div className="level__stufe">{level.stufe}</div>
            <div className="level__text"><strong>{level.name}</strong><span>{xp.gesamt || 0} XP{level.naechstes ? ` · noch ${level.fehlt} bis „${level.naechstes.name}“` : " · Höchststufe"}</span></div>
          </div>
        </section>
      </div>

      <div className="raster raster--3" style={{ marginTop: 14 }}>
        <section className="panel"><Ring p={anteil(gelesenN, alleAbschnitte.length)} titel="Lehrbuch" text={`${gelesenN} von ${alleAbschnitte.length} Abschnitten gelesen`} /></section>
        <section className="panel"><Ring p={anteil(faelleGeloest, campusFaelle.length)} klasse="ring--faelle" titel="Fälle" text={faelle.daten ? `${faelleGeloest} von ${campusFaelle.length} Fällen gelöst` : "wird geladen …"} /></section>
        <section className="panel"><Ring p={gelernt ? Math.round(((gelernt - faellig) / gelernt) * 100) : 0} klasse="ring--karten" zahl={faellig} titel="Karten fällig" text={`${gelernt} Karten im Wiederholungssystem`} /></section>
      </div>

      <section className="abschnitt">
        <div className="abschnitt__kopf"><h2>Heute dran</h2><span className="zaehler">Vier Bausteine, rund 30 Minuten</span></div>
        <div className="heute-aufgaben">
          {aufgaben.map((a) => (
            <button key={a.id} className={`aufgabe${a.fertig ? " aufgabe--fertig" : ""}`} onClick={() => nav(a.route)}>
              <span className="aufgabe__check"><IconHaken /></span>
              <span><strong>{a.titel}</strong><span>{a.text}</span></span>
              <em>{a.xp}</em>
            </button>
          ))}
        </div>
      </section>

      <div className="raster raster--2" style={{ marginTop: 30 }}>
        <section>
          <div className="abschnitt__kopf"><h2>Weiter im Stoff</h2></div>
          {naechster && (
            <button className="weiter" onClick={() => nav({ ansicht: "lehrbuch", id: naechster.kapitel.id, sub: naechster.id })}>
              <Kicker>{naechster.kapitel.teil} · Kapitel {naechster.kapitel.nr}</Kicker>
              <h3>{naechster.kapitel.titel}</h3>
              <p>{naechster.nr ? `${naechster.nr} ${naechster.titel}` : naechster.titel} · {naechster.kapitel.minuten} Min. Lesezeit · <span className={`relevanz relevanz--${relevanzFuer(naechster.kapitel.titel)}`}>{RELEVANZ[relevanzFuer(naechster.kapitel.titel)].label}</span></p>
            </button>
          )}
          {verlaufListe.length > 0 && (
            <div className="panel" style={{ marginTop: 12 }}>
              <div className="panel__head"><h3>Zuletzt geöffnet</h3></div>
              <div className="heute-aufgaben">
                {verlaufListe.map((e) => (
                  <button key={e.id} className="aufgabe" onClick={() => nav(e.route)}>
                    <span className="aufgabe__check" style={{ borderStyle: "dashed" }} />
                    <span><strong>{e.titel}</strong><span>{e.typ}</span></span>
                    <em>öffnen</em>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
        <section>
          <div className="abschnitt__kopf"><h2>Direkt hinein</h2></div>
          <div className="raster raster--2">
            <button className="kachel" onClick={() => nav({ ansicht: "schemata" })}><b>Schemata</b><span className="kachel__zahl">{schemata.length}</span><p>Aufbauschemata mit Trainer</p></button>
            <button className="kachel" onClick={() => nav({ ansicht: "streit" })}><b>Streitstände</b><span className="kachel__zahl">{campusProbleme.length}</span><p>Meinungsstreite kompakt</p></button>
            <button className="kachel" onClick={() => nav({ ansicht: "faelle" })}><b>Fälle</b><span className="kachel__zahl">{campusFaelle.length}</span><p>Klassiker und Kombinationen</p></button>
            <button className="kachel" onClick={() => nav({ ansicht: "klausur" })}><b>Klausurmodus</b><span className="kachel__zahl">⏱</span><p>Fälle unter Zeitdruck</p></button>
          </div>
          <button className="kachel" style={{ marginTop: 12, width: "100%" }} onClick={() => nav({ global: "rechtsstand" })}>
            <b><IconAktuell /> Rechtsstand 2026</b>
            <strong>Beck-online-validiert zum 13. September 2026</strong>
            <p>Sperrliste veralteter Zahlen und Normen: § 23 GVG 10.000 Euro, § 511 ZPO 1.000 Euro, Art. 94 GG, MoPeG, § 477 BGB, Recht auf Reparatur.</p>
          </button>
        </section>
      </div>
    </>
  );
}
