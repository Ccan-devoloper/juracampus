import React, { useMemo, useState } from "react";
import { SCHEMATA, schemaFinden } from "../data/schemata";
import { kapitelFinden, GEBIET_NAME, STUFE_NAME } from "../lib/daten";
import { useEigeneKarten, merkeZuletzt } from "../lib/fortschritt";
import { gutschreiben, XP } from "../lib/xp";
import { Kicker, Leer, Blaettern, passt, mischen } from "./Bausteine";
import { IconSuche, IconZurueck, IconKarten, IconBuch, IconShuffle, IconHaken } from "./Icons";

export default function Schemata(props) {
  return props.route.id ? <Schemaansicht {...props} /> : <Schemaliste {...props} />;
}

function Schemaliste({ nav, gebiet, stufe }) {
  const [q, setQ] = useState("");
  const liste = useMemo(() => SCHEMATA.filter((s) => s.gebiet === gebiet && s.stufe === stufe && passt(`${s.titel} ${s.norm} ${s.kurz} ${s.schritte.map((x) => x.t).join(" ")}`, q)), [gebiet, stufe, q]);
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Prüfungsschemata</h1>
          <p className="lead">Die Aufbauschemata, die in der Klausur sitzen müssen – mit Normen, Unterpunkten und Merksatz. Jedes Schema lässt sich im Trainer als Reihenfolge abfragen und als Karteikarte auf den Stapel legen.</p>
        </div>
        <span className="zaehler">{liste.length} Schemata</span>
      </div>
      <div className="suchfeld"><IconSuche /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Schema, Norm oder Prüfungspunkt suchen …" aria-label="Schemata durchsuchen" /></div>
      {liste.length === 0 ? <Leer titel="Kein Schema gefunden" text="Andere Suchbegriffe probieren." /> : (
        <div className="schema-liste">
          {liste.map((s) => (
            <button key={s.id} className="schema-karte" onClick={() => nav({ ansicht: "schemata", id: s.id })}>
              <span className="norm norm--ruhig">{s.norm}</span>
              <strong>{s.titel}</strong>
              <p>{s.kurz}</p>
              <small>{s.schritte.length} Prüfungsschritte</small>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function Schemaansicht({ route, nav, gebiet, stufe }) {
  const schema = schemaFinden(route.id);
  const [trainer, setTrainer] = useState(route.sub === "trainer");
  const { hinzufuegen, hat } = useEigeneKarten();
  React.useEffect(() => {
    if (schema) merkeZuletzt({ id: schema.id, typ: "Schema", titel: schema.titel, gebiet, stufe, route: { gebiet, stufe, ansicht: "schemata", id: schema.id } });
  }, [schema, gebiet, stufe]);
  if (!schema) return <Leer titel="Schema nicht gefunden"><button className="btn" onClick={() => nav({ ansicht: "schemata" })}>Zur Übersicht</button></Leer>;
  const liste = SCHEMATA.filter((s) => s.gebiet === schema.gebiet && s.stufe === schema.stufe);
  const i = liste.findIndex((s) => s.id === schema.id);
  const vorher = liste[i - 1]; const nachher = liste[i + 1];
  const kapitel = schema.kapitel ? kapitelFinden(schema.kapitel) : null;
  const karteId = `schema:${schema.id}`;
  return (
    <div className="lesson">
      <button className="zurueck" onClick={() => nav({ ansicht: "schemata" })}><IconZurueck /> Alle Schemata</button>
      <div className="lesson__kopf">
        <div>
          <Kicker>Prüfungsschema · {GEBIET_NAME[schema.gebiet]} · {STUFE_NAME[schema.stufe]}</Kicker>
          <h1>{schema.titel}</h1>
          <div className="tags"><span className="tag tag--marke">{schema.norm}</span><span className="tag">{schema.schritte.length} Schritte</span></div>
        </div>
        <div className="knopfreihe">
          <button className={`btn btn--linie${trainer ? " btn--marke" : ""}`} onClick={() => setTrainer(!trainer)}><IconShuffle /> {trainer ? "Schema anzeigen" : "Reihenfolge trainieren"}</button>
          <button className={`btn${hat(karteId) ? " btn--gruen" : ""}`} disabled={hat(karteId)} onClick={() => hinzufuegen({ id: karteId, typ: "schema", gebiet: schema.gebiet, stufe: schema.stufe, frage: `Prüfungsschema: ${schema.titel} (${schema.norm}) – nenne die Prüfungsschritte in der richtigen Reihenfolge.`, antwortHtml: `<ol>${schema.schritte.map((x) => `<li><strong>${x.t}</strong>${x.n ? ` – ${x.n}` : ""}${x.u ? `<ul>${x.u.map((u) => `<li>${u}</li>`).join("")}</ul>` : ""}</li>`).join("")}</ol>`, quelle: { titel: schema.titel, route: { gebiet: schema.gebiet, stufe: schema.stufe, ansicht: "schemata", id: schema.id } } })}><IconKarten /> {hat(karteId) ? "Auf dem Stapel" : "Auf den Kartenstapel"}</button>
        </div>
      </div>

      {trainer ? <SchemaTrainer schema={schema} onFertig={() => setTrainer(false)} /> : (
        <>
          <section className="panel">
            <p className="lead" style={{ marginTop: 0, marginBottom: 14 }}>{schema.kurz}</p>
            <ol className="schritte">
              {schema.schritte.map((s, j) => (
                <li key={j}>
                  <div>
                    <strong>{s.t}{s.n && <span className="norm norm--ruhig" style={{ marginLeft: 8 }}>{s.n}</span>}</strong>
                    {s.x && <span>{s.x}</span>}
                    {s.u && <ul className="unter">{s.u.map((u, k) => <li key={k}>{u}</li>)}</ul>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
          {schema.merke && <div className="kasten kasten--merke"><b>Merksatz</b><p>{schema.merke}</p></div>}
          {kapitel && (
            <button className="weiter" style={{ marginTop: 14 }} onClick={() => nav({ gebiet: kapitel.band.gebiet, stufe: kapitel.band.stufe, ansicht: "lehrbuch", id: kapitel.id })}>
              <Kicker neutral><IconBuch /> Im Lehrbuch vertiefen</Kicker>
              <h3>{kapitel.nr}. {kapitel.titel}</h3>
              <p>{kapitel.abschnitte.length} Abschnitte · {kapitel.minuten} Minuten</p>
            </button>
          )}
        </>
      )}

      <Blaettern vorher={vorher && vorher.titel} nachher={nachher && nachher.titel} onVorher={() => nav({ ansicht: "schemata", id: vorher.id })} onNachher={() => nav({ ansicht: "schemata", id: nachher.id })} labelVor="Vorheriges Schema" labelNach="Nächstes Schema" />
    </div>
  );
}

/* Trainer: Schritte in die richtige Reihenfolge bringen */
export function SchemaTrainer({ schema, onFertig, kompakt }) {
  const [seed, setSeed] = useState(() => Date.now());
  const start = useMemo(() => mischen(schema.schritte.map((s, i) => ({ ...s, i })), seed), [schema, seed]);
  const [reihe, setReihe] = useState(start);
  const [geprueft, setGeprueft] = useState(false);
  React.useEffect(() => { setReihe(start); setGeprueft(false); }, [start]);
  const bewegen = (von, nach) => {
    if (nach < 0 || nach >= reihe.length) return;
    const n = [...reihe]; const [x] = n.splice(von, 1); n.splice(nach, 0, x); setReihe(n); setGeprueft(false);
  };
  const richtig = reihe.filter((s, i) => s.i === i).length;
  const alle = richtig === reihe.length;
  const pruefen = () => { setGeprueft(true); if (alle) gutschreiben(XP.schema, `Schema „${schema.titel}“ richtig sortiert`); };
  return (
    <section className="panel">
      <div className="panel__head"><h2>{kompakt ? schema.titel : "Bringe die Prüfungsschritte in die richtige Reihenfolge"}</h2><span className="zaehler">{geprueft ? `${richtig} von ${reihe.length} richtig` : `${reihe.length} Schritte`}</span></div>
      <ol className="sortier">
        {reihe.map((s, i) => (
          <li key={s.i} className={geprueft ? (s.i === i ? "richtig" : "falsch") : ""}>
            <span><b style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-weich)", marginRight: 8 }}>{i + 1}.</b>{s.t}{geprueft && s.i !== i && <small style={{ display: "block", color: "var(--ink-weich)" }}>gehört an Position {s.i + 1}</small>}</span>
            <span className="sortier__knoepfe">
              <button onClick={() => bewegen(i, i - 1)} aria-label="nach oben" disabled={i === 0}>↑</button>
              <button onClick={() => bewegen(i, i + 1)} aria-label="nach unten" disabled={i === reihe.length - 1}>↓</button>
            </span>
          </li>
        ))}
      </ol>
      <div className="knopfreihe" style={{ marginTop: 14 }}>
        {!geprueft || !alle ? <button className="btn" onClick={pruefen}><IconHaken /> Prüfen</button> : <span className="tag tag--gruen">Alles richtig – +{XP.schema} XP</span>}
        <button className="btn btn--linie" onClick={() => setSeed(Date.now())}><IconShuffle /> Neu mischen</button>
        {onFertig && <button className="btn btn--geist" onClick={onFertig}>Schema ansehen</button>}
      </div>
    </section>
  );
}
