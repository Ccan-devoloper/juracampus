import React, { useEffect, useMemo, useState } from "react";
import { useDaten, GEBIET_NAME, STUFE_NAME } from "../lib/daten";
import { useEigeneKarten, useLesezeichen, useNotizen, merkeZuletzt } from "../lib/fortschritt";
import { Html, hervorheben, Kicker, Laden, Leer, Blaettern, passt } from "./Bausteine";
import { IconSuche, IconZurueck, IconKarten, IconLesezeichen, IconNotiz } from "./Icons";
import Streitbild from "./Streitbild";
import { hatStreitbild } from "../data/streitbilder";

export default function Streit(props) {
  const probleme = useDaten("probleme");
  if (!probleme.daten) return <Laden text="Streitstände werden geladen …" />;
  return props.route.id ? <Problemansicht {...props} daten={probleme.daten} /> : <Problemliste {...props} daten={probleme.daten} />;
}

function Problemliste({ nav, gebiet, stufe, daten }) {
  const [q, setQ] = useState("");
  const [bereich, setBereich] = useState("alle");
  const [nurAusgearbeitet, setNurAusgearbeitet] = useState(false);
  const alle = useMemo(() => daten.probleme.filter((p) => p.gebiet === gebiet && p.stufe === stufe), [daten, gebiet, stufe]);
  const bereiche = useMemo(() => [...new Set(alle.map((p) => p.bereich))], [alle]);
  const ausgearbeitet = alle.filter((p) => hatStreitbild(p.id)).length;
  const liste = alle.filter((p) => (bereich === "alle" || p.bereich === bereich) && (!nurAusgearbeitet || hatStreitbild(p.id)) && passt(`${p.titel} ${p.text}`, q));
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Streitstände und Einzelprobleme</h1>
          <p className="lead">Meinungsstreite gehören an die Stelle des Schemas, an der sie entscheidungserheblich werden: Problem benennen, Ansichten mit tragenden Argumenten, Stellungnahme nur bei unterschiedlichen Ergebnissen – dann konsequent weiterprüfen. {ausgearbeitet > 0 && `${ausgearbeitet} Streitstände sind Schritt für Schritt ausgearbeitet – mit Problemtrigger, Argumenten beider Seiten, Entscheidungserheblichkeit und Klausurformulierung.`}</p>
        </div>
        <span className="zaehler">{liste.length} von {alle.length}</span>
      </div>
      <div className="suchfeld"><IconSuche /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Problem, Stichwort oder Norm suchen …" aria-label="Streitstände durchsuchen" /></div>
      <div className="filter">
        <button aria-pressed={bereich === "alle"} onClick={() => setBereich("alle")}>Alle Bereiche</button>
        {ausgearbeitet > 0 && <button aria-pressed={nurAusgearbeitet} onClick={() => setNurAusgearbeitet(!nurAusgearbeitet)}>Nur ausgearbeitete ({ausgearbeitet})</button>}
        {bereiche.map((b) => <button key={b} aria-pressed={bereich === b} onClick={() => setBereich(b)}>{b}</button>)}
      </div>
      {liste.length === 0 ? <Leer titel="Kein Streitstand gefunden" text="Andere Suchbegriffe probieren." /> : (
        <div className="problemliste">
          {liste.map((p) => (
            <button key={p.id} className="problem" onClick={() => nav({ ansicht: "streit", id: p.id })}>
              <strong>{p.titel}{hatStreitbild(p.id) && <span className="tag tag--gruen" style={{ marginLeft: 8, verticalAlign: "middle" }}>ausgearbeitet</span>}</strong>
              <small>{p.nr} · {p.bereich}</small>
              <p>{p.text.slice(0, 180)}{p.text.length > 180 ? " …" : ""}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function Problemansicht({ route, nav, gebiet, stufe, daten }) {
  const p = daten.probleme.find((x) => x.id === route.id);
  const { hinzufuegen, hat } = useEigeneKarten();
  const { hat: gemerkt, umschalten: merken } = useLesezeichen();
  const { notizen, setzen } = useNotizen();
  const [notizOffen, setNotizOffen] = useState(false);
  const faelle = useDaten("faelle");
  useEffect(() => {
    if (p) merkeZuletzt({ id: p.id, typ: "Streitstand", titel: p.titel, gebiet: p.gebiet, stufe: p.stufe, route: { gebiet: p.gebiet, stufe: p.stufe, ansicht: "streit", id: p.id } });
  }, [p]);
  const verwandteFaelle = useMemo(() => {
    if (!p || !faelle.daten) return [];
    const normen = new Set(p.normen || []);
    const titelWorte = p.titel.toLowerCase().split(/[\s,–-]+/).filter((w) => w.length > 5);
    return faelle.daten.faelle.map((f) => ({ f, n: (f.normen || []).filter((k) => normen.has(k)).length + titelWorte.filter((w) => (f.name + " " + f.thema + " " + f.anker).toLowerCase().includes(w)).length * 2 })).filter((x) => x.n >= 2).sort((a, b) => b.n - a.n).slice(0, 5).map((x) => x.f);
  }, [p, faelle.daten]);
  const verwandte = useMemo(() => {
    if (!p) return [];
    const normen = new Set(p.normen || []);
    return daten.probleme.filter((x) => x.id !== p.id && x.gebiet === p.gebiet).map((x) => ({ x, n: (x.normen || []).filter((k) => normen.has(k)).length })).filter((y) => y.n >= 1).sort((a, b) => b.n - a.n).slice(0, 5).map((y) => y.x);
  }, [p, daten]);
  if (!p) return <Leer titel="Streitstand nicht gefunden"><button className="btn" onClick={() => nav({ ansicht: "streit" })}>Zur Übersicht</button></Leer>;
  const liste = daten.probleme.filter((x) => x.gebiet === p.gebiet && x.stufe === p.stufe);
  const i = liste.findIndex((x) => x.id === p.id);
  const vorher = liste[i - 1]; const nachher = liste[i + 1];
  const karteId = `problem:${p.id}`;
  return (
    <div className="lesson">
      <button className="zurueck" onClick={() => nav({ ansicht: "streit" })}><IconZurueck /> Alle Streitstände</button>
      <div className="lesson__kopf">
        <div>
          <Kicker>Streitstand {p.nr} · {p.bereich}</Kicker>
          <h1>{p.titel}</h1>
          <div className="tags">{(p.normen || []).slice(0, 6).map((n) => <span key={n} className="tag tag--marke">{n}</span>)}</div>
        </div>
        <div className="knopfreihe">
          <button className={`btn btn--linie${gemerkt(p.id) ? " btn--marke" : ""}`} onClick={() => merken({ id: p.id, titel: p.titel, typ: "Streitstand", route: { gebiet: p.gebiet, stufe: p.stufe, ansicht: "streit", id: p.id } })}><IconLesezeichen voll={gemerkt(p.id)} /> {gemerkt(p.id) ? "Gemerkt" : "Merken"}</button>
          <button className={`btn${hat(karteId) ? " btn--gruen" : ""}`} disabled={hat(karteId)} onClick={() => hinzufuegen({ id: karteId, typ: "problem", gebiet: p.gebiet, stufe: p.stufe, frage: `Streitstand: ${p.titel} – Welche Ansichten werden vertreten und wie ist zu entscheiden?`, antwortHtml: p.html, quelle: { titel: p.titel, route: { gebiet: p.gebiet, stufe: p.stufe, ansicht: "streit", id: p.id } } })}><IconKarten /> {hat(karteId) ? "Auf dem Stapel" : "Auf den Kartenstapel"}</button>
        </div>
      </div>
      {hatStreitbild(p.id) && (
        <section className="panel">
          <div className="panel__head">
            <h2>Der Streit Schritt für Schritt</h2>
            <span className="zaehler">Trigger · Frage · Ansichten · Rechtsprechung · Erheblichkeit · Formulierung</span>
          </div>
          <Streitbild id={p.id} />
        </section>
      )}

      <section className="panel" style={{ marginTop: hatStreitbild(p.id) ? 14 : 0 }}>
        {hatStreitbild(p.id) && <div className="panel__head"><h3>Fassung des Werks</h3><span className="zaehler">Kompaktversion zum Wiederholen</span></div>}
        <Html html={hervorheben(p.html)} nav={nav} />
        <div className="tz__fuss">
          <span className="tag tag--gruen">h. M. / Rechtsprechung</span><span className="tag tag--orange">Gegenansicht</span><span className="tag tag--lila">Gerichte</span><span className="tag tag--rot">Streitpunkt</span>
          <span style={{ flex: 1 }} />
          <button className="btn btn--klein btn--linie" onClick={() => setNotizOffen(!notizOffen)}><IconNotiz /> {notizen[p.id] ? "Notiz bearbeiten" : "Notiz"}</button>
        </div>
        {notizen[p.id] && !notizOffen && <div className="kasten kasten--hinweis" style={{ fontFamily: "var(--sans)" }}><b>Meine Notiz</b><p style={{ whiteSpace: "pre-wrap" }}>{notizen[p.id]}</p></div>}
        {notizOffen && <textarea className="notizfeld" style={{ marginTop: 10 }} defaultValue={notizen[p.id] || ""} onBlur={(e) => setzen(p.id, e.target.value)} placeholder="Eigene Argumente, Merkhilfen, Fundstellen …" autoFocus />}
      </section>
      {(verwandteFaelle.length > 0 || verwandte.length > 0) && (
        <div className="raster raster--2" style={{ marginTop: 14 }}>
          {verwandteFaelle.length > 0 && <div className="panel"><h3>Fälle zu diesem Problem</h3><div className="heute-aufgaben" style={{ marginTop: 8 }}>{verwandteFaelle.map((f) => <button key={f.id} className="aufgabe" onClick={() => nav({ gebiet: f.gebiet, stufe: f.stufe, ansicht: "faelle", id: f.id })}><span className="aufgabe__check" style={{ border: 0, background: "var(--orange-feld)" }} /><span><strong>{f.name}</strong><span>{f.thema || f.teilName}</span></span><em>→</em></button>)}</div></div>}
          {verwandte.length > 0 && <div className="panel"><h3>Verwandte Streitstände</h3><div className="heute-aufgaben" style={{ marginTop: 8 }}>{verwandte.map((x) => <button key={x.id} className="aufgabe" onClick={() => nav({ gebiet: x.gebiet, stufe: x.stufe, ansicht: "streit", id: x.id })}><span className="aufgabe__check" style={{ border: 0, background: "var(--magenta-feld)" }} /><span><strong>{x.titel}</strong><span>{x.bereich}</span></span><em>→</em></button>)}</div></div>}
        </div>
      )}
      <Blaettern vorher={vorher && vorher.titel} nachher={nachher && nachher.titel} onVorher={() => nav({ ansicht: "streit", id: vorher.id })} onNachher={() => nav({ ansicht: "streit", id: nachher.id })} labelVor="Vorheriger Streitstand" labelNach="Nächster Streitstand" />
    </div>
  );
}
