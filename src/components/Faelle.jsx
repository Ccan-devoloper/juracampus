import React, { useEffect, useMemo, useState } from "react";
import { useDaten, GEBIET_NAME, STUFE_NAME, abschnittFinden } from "../lib/daten";
import { useFaelleStand, useEigeneKarten, useLesezeichen, merkeZuletzt } from "../lib/fortschritt";
import { werk } from "../lib/daten";
import { Html, Kicker, Laden, Leer, Blaettern, passt } from "./Bausteine";
import { IconSuche, IconZurueck, IconKarten, IconLesezeichen, IconAuge, IconHaken, IconShuffle } from "./Icons";

export default function Faelle(props) {
  const faelle = useDaten("faelle");
  if (!faelle.daten) return <Laden text="Fälle werden geladen …" />;
  return props.route.id ? <Fallansicht {...props} daten={faelle.daten} /> : <Fallliste {...props} daten={faelle.daten} />;
}

const GRUPPEN = { A: "Standardfälle", B: "Standardfälle", C: "Standardfälle", D: "Aktenfälle", F: "Vertiefung" };

function Fallliste({ nav, gebiet, stufe, daten }) {
  const { stand } = useFaelleStand();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("alle");
  const [gruppe, setGruppe] = useState("alle");
  const alle = useMemo(() => daten.faelle.filter((f) => f.gebiet === gebiet && f.stufe === stufe), [daten, gebiet, stufe]);
  const gruppen = useMemo(() => [...new Set(alle.map((f) => GRUPPEN[f.teil] || "Weitere"))], [alle]);
  const liste = alle.filter((f) => {
    const b = stand[f.id]?.bewertung;
    if (status === "offen" && b) return false;
    if (status === "fertig" && !b) return false;
    if (status === "schwer" && b !== 1) return false;
    if (gruppe !== "alle" && (GRUPPEN[f.teil] || "Weitere") !== gruppe) return false;
    return passt(`${f.name} ${f.thema} ${f.anker} ${f.text}`, q);
  });
  const geloest = alle.filter((f) => stand[f.id]?.bewertung).length;
  const zufall = () => { const offen = alle.filter((f) => !stand[f.id]?.bewertung); const w = (offen.length ? offen : alle)[Math.floor(Math.random() * (offen.length ? offen : alle).length)]; if (w) nav({ ansicht: "faelle", id: w.id }); };
  const matrix = (daten.matrix || []).find((m) => m.gebiet === gebiet);
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Fälle</h1>
          <p className="lead">Jeder Fall hat vier Teile: Sachverhalt, Kernfragen, Lösungsskizze und Examenshinweis. Erst selbst lösen – die Lösung ist gesperrt, bis du sie aufdeckst. Danach bewertest du dich und der Fall wandert in dein Wiederholungssystem.</p>
        </div>
        <span className="zaehler">{geloest} / {alle.length} gelöst</span>
      </div>
      <div className="suchfeld"><IconSuche /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Fallname, Klassiker, Thema oder Norm …" aria-label="Fälle durchsuchen" /><button className="btn btn--klein btn--linie" onClick={zufall}><IconShuffle /> Zufallsfall</button></div>
      <div className="filter">
        {[["alle", "Alle"], ["offen", "Noch offen"], ["fertig", "Gelöst"], ["schwer", "Nochmal üben"]].map(([id, l]) => <button key={id} aria-pressed={status === id} onClick={() => setStatus(id)}>{l}</button>)}
        {gruppen.length > 1 && <><span style={{ width: 8 }} />{["alle", ...gruppen].map((g) => <button key={g} aria-pressed={gruppe === g} onClick={() => setGruppe(g)}>{g === "alle" ? "Alle Gruppen" : g}</button>)}</>}
      </div>
      {liste.length === 0 ? <Leer titel="Kein Fall gefunden" text="Filter zurücksetzen oder andere Suchbegriffe probieren." /> : (
        <div className="fallliste">
          {liste.map((f) => {
            const b = stand[f.id]?.bewertung;
            return (
              <button key={f.id} className={`fallkarte${b ? " fallkarte--fertig" : ""}`} onClick={() => nav({ ansicht: "faelle", id: f.id })}>
                <div className="fallkarte__kopf"><span>Fall {f.nr} · {f.teilName}</span>{b && <span className={`bewertet bewertet--${b}`}>{["", "nochmal", "geht so", "sicher"][b]}</span>}</div>
                <strong>{f.name}</strong>
                <p>{f.thema}{f.anker ? ` · ${f.anker}` : ""}</p>
                <div className="fallkarte__fuss">{(f.normen || []).slice(0, 3).map((n) => <span key={n} className="tag">{n}</span>)}<span className="tag">{Math.max(5, Math.round(f.woerter / 40))} Min.</span></div>
              </button>
            );
          })}
        </div>
      )}
      {matrix && stufe === 1 && (
        <section className="abschnitt">
          <div className="abschnitt__kopf"><h2>Klassiker-Register: {matrix.titel}</h2><span className="zaehler">{matrix.zeilen.length} Fallanker</span></div>
          <div className="panel"><p className="lead" style={{ marginTop: 0, marginBottom: 12 }}>Die bekannten Fallnamen dienen als Gedächtnisanker. Gelernt wird nicht der Name, sondern die Problemkombination.</p>
            <div className="matrix">{matrix.zeilen.map((z, i) => <div key={i} className="matrix__zeile"><b>{z.anker}</b><span>{z.konstellation}</span><span>{z.themen}</span></div>)}</div>
          </div>
        </section>
      )}
    </>
  );
}

const TEILE = { sachverhalt: "Sachverhalt", kernfragen: "Kernfragen", loesung: "Lösungsskizze", hinweis: "Examenshinweis" };
const AKTE = { sachverhalt: "Aktenkern", kernfragen: "Bearbeitungsschwerpunkte", loesung: "Lösungsskizze", hinweis: "Examenshinweis" };

export function Fallansicht({ route, nav, gebiet, stufe, daten, klausur, onWeiter }) {
  const f = daten.faelle.find((x) => x.id === route.id);
  const { stand, bewerten, skizze } = useFaelleStand();
  const { hinzufuegen, hat } = useEigeneKarten();
  const { hat: gemerkt, umschalten: merken } = useLesezeichen();
  const [offen, setOffen] = useState(false);
  const [hinweisOffen, setHinweisOffen] = useState(false);
  const probleme = useDaten("probleme");
  useEffect(() => { setOffen(false); setHinweisOffen(false); window.scrollTo({ top: 0 }); }, [route.id]);
  useEffect(() => {
    if (f && !klausur) merkeZuletzt({ id: f.id, typ: "Fall", titel: f.name, gebiet: f.gebiet, stufe: f.stufe, route: { gebiet: f.gebiet, stufe: f.stufe, ansicht: "faelle", id: f.id } });
  }, [f, klausur]);
  const verwandteProbleme = useMemo(() => {
    if (!f || !probleme.daten) return [];
    const normen = new Set(f.normen || []);
    return probleme.daten.probleme.filter((p) => p.gebiet === f.gebiet).map((p) => ({ p, n: (p.normen || []).filter((k) => normen.has(k)).length })).filter((x) => x.n >= 1).sort((a, b) => b.n - a.n).slice(0, 4).map((x) => x.p);
  }, [f, probleme.daten]);
  const passendeAbschnitte = useMemo(() => {
    if (!f) return [];
    const normen = new Set(f.normen || []);
    const treffer = [];
    for (const b of werk.baende) { if (b.gebiet !== f.gebiet) continue; for (const k of b.kapitel) for (const a of k.abschnitte) { /* Normen der Abschnitte stehen nur in den Band-Daten; Näherung über Kapiteltitel */ if (f.thema && k.titel && f.thema.toLowerCase().split(/[\s,/–-]+/).some((w) => w.length > 5 && k.titel.toLowerCase().includes(w))) treffer.push({ k, a, b }); } }
    const seen = new Set();
    return treffer.filter((t) => { if (seen.has(t.k.id)) return false; seen.add(t.k.id); return true; }).slice(0, 3);
  }, [f]);
  if (!f) return <Leer titel="Fall nicht gefunden"><button className="btn" onClick={() => nav({ ansicht: "faelle" })}>Zur Übersicht</button></Leer>;
  const labels = f.art === "akte" ? AKTE : TEILE;
  const liste = daten.faelle.filter((x) => x.gebiet === f.gebiet && x.stufe === f.stufe);
  const i = liste.findIndex((x) => x.id === f.id);
  const vorher = liste[i - 1]; const nachher = liste[i + 1];
  const s = stand[f.id] || {};
  const karteId = `fall:${f.id}`;
  return (
    <div className="lesson">
      {!klausur && <button className="zurueck" onClick={() => nav({ ansicht: "faelle" })}><IconZurueck /> Alle Fälle</button>}
      <div className="lesson__kopf">
        <div>
          <Kicker>{klausur ? "Klausurmodus" : `Fall ${f.nr} · ${f.teilName}`} · {GEBIET_NAME[f.gebiet]} · {STUFE_NAME[f.stufe]}</Kicker>
          <h1>{f.name}</h1>
          <div className="tags">{f.thema && <span className="tag tag--marke">{f.thema}</span>}{f.anker && <span className="tag tag--magenta">Klassiker: {f.anker}</span>}{(f.normen || []).slice(0, 5).map((n) => <span key={n} className="tag">{n}</span>)}</div>
        </div>
        {!klausur && (
          <div className="knopfreihe">
            <button className={`btn btn--linie${gemerkt(f.id) ? " btn--marke" : ""}`} onClick={() => merken({ id: f.id, titel: f.name, typ: "Fall", route: { gebiet: f.gebiet, stufe: f.stufe, ansicht: "faelle", id: f.id } })}><IconLesezeichen voll={gemerkt(f.id)} /> {gemerkt(f.id) ? "Gemerkt" : "Merken"}</button>
            <button className={`btn${hat(karteId) ? " btn--gruen" : ""}`} disabled={hat(karteId)} onClick={() => hinzufuegen({ id: karteId, typ: "fall", gebiet: f.gebiet, stufe: f.stufe, frage: `Fall „${f.name}“: Löse den Fall.`, frageHtml: f.teile.sachverhalt, antwortHtml: `${f.teile.loesung || ""}${f.teile.hinweis ? `<div class="kasten kasten--merke"><b>Examenshinweis</b>${f.teile.hinweis}</div>` : ""}`, quelle: { titel: f.name, route: { gebiet: f.gebiet, stufe: f.stufe, ansicht: "faelle", id: f.id } } })}><IconKarten /> {hat(karteId) ? "Auf dem Stapel" : "Auf den Kartenstapel"}</button>
          </div>
        )}
      </div>

      <div className="fall">
        <section className="fall__block fall__sachverhalt"><b><i>1</i> {labels.sachverhalt}</b><Html html={f.teile.sachverhalt} nav={nav} /></section>
        {f.teile.kernfragen && (
          <section className="fall__block">
            <b><i>2</i> {labels.kernfragen}</b>
            {hinweisOffen || offen ? <Html html={f.teile.kernfragen} nav={nav} /> : <div className="knopfreihe"><p style={{ margin: 0, color: "var(--ink-weich)", fontSize: 14 }}>Erst selbst überlegen: Welche Anspruchsgrundlagen, Delikte oder Verfahrensfragen sind einschlägig?</p><button className="btn btn--klein btn--linie" onClick={() => setHinweisOffen(true)}><IconAuge /> Kernfragen anzeigen</button></div>}
          </section>
        )}
        <section className="fall__block">
          <b><i>3</i> Meine Lösungsskizze</b>
          <textarea className="arbeitsfeld" placeholder="Anspruchsgrundlage / Delikt / Verfahrensart … Prüfungsreihenfolge, Schwerpunkte, Streitentscheid, Ergebnis. Der Text bleibt auf diesem Gerät gespeichert." defaultValue={s.skizze || ""} onBlur={(e) => skizze(f.id, e.target.value)} />
        </section>
        {!offen ? (
          <section className="fall__block fall__gesperrt">
            <strong style={{ fontFamily: "var(--serif)", fontSize: 19 }}>Lösungsskizze gesperrt</strong>
            <p>Deck die Lösung erst auf, wenn deine eigene Skizze steht. So arbeitet das Wiederholungssystem mit ehrlichem Feedback.</p>
            <button className="btn btn--gross" onClick={() => setOffen(true)}><IconAuge /> Lösung aufdecken</button>
          </section>
        ) : (
          <>
            <section className="fall__block fall__loesung"><b><i>4</i> {labels.loesung}</b><Html html={f.teile.loesung} nav={nav} /></section>
            {f.teile.hinweis && <section className="fall__block fall__hinweis"><b><i>5</i> {labels.hinweis}</b><Html html={f.teile.hinweis} nav={nav} /></section>}
            <section className="fall__block">
              <b><i>6</i> Wie lief es?</b>
              <div className="bewertung">
                {[[1, "Nochmal", "Schwerpunkt verfehlt oder Streit übersehen"], [2, "Geht so", "Struktur stimmte, Details fehlten"], [3, "Sicher", "Reihenfolge, Streit und Ergebnis getroffen"]].map(([b, l, t]) => (
                  <button key={b} aria-pressed={s.bewertung === b} onClick={() => { bewerten(f.id, b); if (onWeiter) onWeiter(b); }}><IconHaken /> {l}<small>{t}</small></button>
                ))}
              </div>
              {s.datum && <p style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-weich)" }}>Zuletzt bearbeitet am {s.datum} · {s.versuche} Durchgang{s.versuche === 1 ? "" : "e"}</p>}
            </section>
          </>
        )}
      </div>

      {!klausur && (verwandteProbleme.length > 0 || passendeAbschnitte.length > 0) && (
        <div className="raster raster--2" style={{ marginTop: 14 }}>
          {verwandteProbleme.length > 0 && <div className="panel"><h3>Streitstände im Fall</h3><div className="heute-aufgaben" style={{ marginTop: 8 }}>{verwandteProbleme.map((p) => <button key={p.id} className="aufgabe" onClick={() => nav({ gebiet: p.gebiet, stufe: p.stufe, ansicht: "streit", id: p.id })}><span className="aufgabe__check" style={{ border: 0, background: "var(--magenta-feld)" }} /><span><strong>{p.titel}</strong><span>{p.bereich}</span></span><em>→</em></button>)}</div></div>}
          {passendeAbschnitte.length > 0 && <div className="panel"><h3>Im Lehrbuch</h3><div className="heute-aufgaben" style={{ marginTop: 8 }}>{passendeAbschnitte.map((t) => <button key={t.k.id} className="aufgabe" onClick={() => nav({ gebiet: t.b.gebiet, stufe: t.b.stufe, ansicht: "lehrbuch", id: t.k.id })}><span className="aufgabe__check" style={{ border: 0, background: "var(--marke-hell)" }} /><span><strong>{t.k.nr}. {t.k.titel}</strong><span>Band {t.b.nr} · {t.k.minuten} Min.</span></span><em>→</em></button>)}</div></div>}
        </div>
      )}
      {!klausur && <Blaettern vorher={vorher && vorher.name} nachher={nachher && nachher.name} onVorher={() => nav({ ansicht: "faelle", id: vorher.id })} onNachher={() => nav({ ansicht: "faelle", id: nachher.id })} labelVor="Vorheriger Fall" labelNach="Nächster Fall" />}
    </div>
  );
}
