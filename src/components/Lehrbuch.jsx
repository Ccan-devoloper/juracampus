import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDaten, kapitelFinden, GEBIET_NAME, STUFE_NAME } from "../lib/daten";
import { useGelesen, useNotizen, useLesezeichen, useEigeneKarten, merkeZuletzt } from "../lib/fortschritt";
import { useSpeicher } from "../lib/speicher";
import { relevanzFuer, RELEVANZ } from "../data/relevanz";
import { SCHEMATA } from "../data/schemata";
import { Html, Kicker, Laden, Leer, Blaettern, passt } from "./Bausteine";
import { IconHaken, IconLesezeichen, IconNotiz, IconKarten, IconSuche, IconZurueck } from "./Icons";

export default function Lehrbuch(props) {
  return props.route.id ? <Kapitelansicht {...props} /> : <Kapitelliste {...props} />;
}

/* ------------------------------------------------------------ Liste */

function Kapitelliste({ nav, gebiet, stufe, band }) {
  const { menge: gelesen } = useGelesen();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("alle");
  const [relevanz, setRelevanz] = useState("alle");
  const teile = useMemo(() => {
    const map = new Map();
    for (const k of band.kapitel) { if (!map.has(k.teil)) map.set(k.teil, []); map.get(k.teil).push(k); }
    return [...map.entries()];
  }, [band]);
  const sichtbar = (k) => {
    const n = k.abschnitte.filter((a) => gelesen.has(a.id)).length;
    if (filter === "offen" && n === k.abschnitte.length) return false;
    if (filter === "fertig" && n !== k.abschnitte.length) return false;
    if (relevanz !== "alle" && relevanzFuer(k.titel) !== relevanz) return false;
    return passt(`${k.nr} ${k.titel} ${k.abschnitte.map((a) => a.titel).join(" ")}`, q);
  };
  const gesamt = band.kapitel.reduce((s, k) => s + k.abschnitte.length, 0);
  const gelesenN = band.kapitel.reduce((s, k) => s + k.abschnitte.filter((a) => gelesen.has(a.id)).length, 0);
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]} · Band {band.nr}</Kicker>
          <h1>Lehrbuch: {band.titel}</h1>
          <p className="lead">{band.untertitel}. {band.kapitel.length} Kapitel, {gesamt} Abschnitte, rund {Math.round(band.kapitel.reduce((s, k) => s + k.minuten, 0) / 60)} Stunden Lesezeit. Jeder Abschnitt lässt sich abhaken, notieren und als Karteikarte auf den Stapel legen.</p>
        </div>
        <span className="zaehler">{gelesenN} / {gesamt} gelesen</span>
      </div>
      <div className="suchfeld"><IconSuche /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kapitel oder Abschnitt suchen …" aria-label="Kapitel suchen" /></div>
      <div className="filter">
        {[["alle", "Alle"], ["offen", "Noch offen"], ["fertig", "Gelesen"]].map(([id, l]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{l}</button>)}
        <span style={{ width: 8 }} />
        {[["alle", "Jede Relevanz"], ["hoch", "Dauerbrenner"], ["mittel", "Regelmäßig"], ["basis", "Grundlage"]].map(([id, l]) => <button key={id} aria-pressed={relevanz === id} onClick={() => setRelevanz(id)}>{l}</button>)}
      </div>
      {teile.map(([teil, kapitel]) => {
        const liste = kapitel.filter(sichtbar);
        if (!liste.length) return null;
        return (
          <section key={teil}>
            <div className="teilkopf"><h2>{teil}</h2><span>{kapitel.length} Kapitel</span></div>
            <div className="kapitelliste">
              {liste.map((k) => {
                const n = k.abschnitte.filter((a) => gelesen.has(a.id)).length;
                const zustand = n === k.abschnitte.length ? "kapitel--fertig" : n > 0 ? "kapitel--teils" : "";
                const rel = relevanzFuer(k.titel);
                return (
                  <button key={k.id} className={`kapitel ${zustand}`} style={{ "--p": `${Math.round((n / k.abschnitte.length) * 100)}%` }} onClick={() => nav({ ansicht: "lehrbuch", id: k.id })}>
                    <span className="kapitel__check"><IconHaken /></span>
                    <span className="kapitel__nr">{k.nr}</span>
                    <span>
                      <h3>{k.titel}</h3>
                      <span className="kapitel__meta"><span className={`relevanz relevanz--${rel}`}>{RELEVANZ[rel].label}</span><span>{k.abschnitte.length} Abschnitt{k.abschnitte.length === 1 ? "" : "e"}</span><span>{k.minuten} Min.</span></span>
                    </span>
                    <span className="kapitel__rechts">{n}/{k.abschnitte.length} gelesen</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ---------------------------------------------------------- Kapitel */

function Kapitelansicht({ route, nav, gebiet, stufe, band }) {
  const meta = kapitelFinden(route.id);
  const daten = useDaten(`band${band.nr}`);
  const { menge: gelesen, umschalten, setListe } = useGelesen();
  const { notizen, setzen: notizSetzen } = useNotizen();
  const { hat: lesezeichenHat, umschalten: lesezeichenUmschalten } = useLesezeichen();
  const { hinzufuegen, hat: karteHat } = useEigeneKarten();
  const [einstellungen, setEinstellungen] = useSpeicher("einstellungen", { lesegroesse: 17 });
  const [notizOffen, setNotizOffen] = useState({});
  const [aktiv, setAktiv] = useState(route.sub);
  const faelle = useDaten("faelle");
  const probleme = useDaten("probleme");
  const inhaltRef = useRef(null);

  const kapitel = daten.daten ? daten.daten.kapitel.find((k) => k.id === route.id) : null;

  useEffect(() => {
    if (meta) merkeZuletzt({ id: meta.id, typ: "Lehrbuch", titel: `${meta.nr}. ${meta.titel}`, gebiet, stufe, route: { gebiet, stufe, ansicht: "lehrbuch", id: meta.id } });
  }, [meta, gebiet, stufe]);

  /* Unteranker anspringen, sobald der Inhalt da ist */
  useEffect(() => {
    if (!kapitel) return;
    if (route.sub) { const el = document.getElementById(route.sub); if (el) el.scrollIntoView({ block: "start" }); }
    else window.scrollTo({ top: 0 });
  }, [kapitel, route.sub, route.id]);

  /* Aktiven Abschnitt in der Seitennavigation nachführen */
  useEffect(() => {
    if (!kapitel || typeof IntersectionObserver === "undefined") return undefined;
    const beobachter = new IntersectionObserver((eintraege) => {
      const sichtbar = eintraege.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (sichtbar[0]) setAktiv(sichtbar[0].target.id);
    }, { rootMargin: "-20% 0px -60% 0px" });
    document.querySelectorAll(".tz[id]").forEach((el) => beobachter.observe(el));
    return () => beobachter.disconnect();
  }, [kapitel]);

  const index = band.kapitel.findIndex((k) => k.id === route.id);
  const vorher = band.kapitel[index - 1]; const nachher = band.kapitel[index + 1];

  /* Querverweise: Fälle und Streitstände mit gemeinsamen Normen */
  const normen = useMemo(() => new Set((kapitel ? kapitel.abschnitte : []).flatMap((a) => a.normen || [])), [kapitel]);
  const passendeFaelle = useMemo(() => {
    if (!faelle.daten || !normen.size) return [];
    return faelle.daten.faelle.filter((f) => f.gebiet === gebiet).map((f) => ({ f, n: (f.normen || []).filter((k) => normen.has(k)).length })).filter((x) => x.n >= 2).sort((a, b) => b.n - a.n).slice(0, 6).map((x) => x.f);
  }, [faelle.daten, normen, gebiet]);
  const passendeProbleme = useMemo(() => {
    if (!probleme.daten || !normen.size) return [];
    return probleme.daten.probleme.filter((p) => p.gebiet === gebiet).map((p) => ({ p, n: (p.normen || []).filter((k) => normen.has(k)).length })).filter((x) => x.n >= 1).sort((a, b) => b.n - a.n).slice(0, 6).map((x) => x.p);
  }, [probleme.daten, normen, gebiet]);
  const passendeSchemata = useMemo(() => SCHEMATA.filter((s) => s.gebiet === gebiet && s.stufe === stufe && (s.kapitel === route.id || (s.normen || []).some((n) => normen.has(n)))).slice(0, 5), [gebiet, stufe, route.id, normen]);

  if (!meta) return <Leer titel="Kapitel nicht gefunden"><button className="btn" onClick={() => nav({ ansicht: "lehrbuch" })}>Zur Kapitelübersicht</button></Leer>;
  if (!kapitel) return <Laden text="Kapitel wird geladen …" />;

  const rel = relevanzFuer(meta.titel);
  const alleIds = kapitel.abschnitte.map((a) => a.id);
  const alleGelesen = alleIds.every((id) => gelesen.has(id));
  const allesUmschalten = () => setListe((alt) => (alleGelesen ? alt.filter((id) => !alleIds.includes(id)) : [...new Set([...alt, ...alleIds])]));
  const groesse = einstellungen.lesegroesse || 17;
  const setGroesse = (g) => setEinstellungen({ ...einstellungen, lesegroesse: Math.min(22, Math.max(14, g)) });

  return (
    <div className="lesson">
      <button className="zurueck" onClick={() => nav({ ansicht: "lehrbuch" })}><IconZurueck /> Zur Kapitelübersicht</button>
      <div className="lesson__kopf">
        <div>
          <Kicker>{meta.teil} · Band {band.nr} · Kapitel {meta.nr}</Kicker>
          <h1>{meta.titel}</h1>
          <div className="tags">
            <span className={`relevanz relevanz--${rel}`} title={RELEVANZ[rel].text}>{RELEVANZ[rel].label}</span>
            <span className="tag">{meta.minuten} Minuten</span>
            <span className="tag">{kapitel.abschnitte.length} Abschnitt{kapitel.abschnitte.length === 1 ? "" : "e"}</span>
            <span className="tag">{meta.woerter.toLocaleString("de-DE")} Wörter</span>
          </div>
        </div>
        <div className="knopfreihe">
          <button className={`btn btn--linie${lesezeichenHat(meta.id) ? " btn--marke" : ""}`} onClick={() => lesezeichenUmschalten({ id: meta.id, titel: `${meta.nr}. ${meta.titel}`, typ: "Lehrbuch", route: { gebiet, stufe, ansicht: "lehrbuch", id: meta.id } })}><IconLesezeichen voll={lesezeichenHat(meta.id)} /> {lesezeichenHat(meta.id) ? "Gemerkt" : "Merken"}</button>
          <button className={`btn${alleGelesen ? " btn--gruen" : ""}`} onClick={allesUmschalten}>{alleGelesen ? "Kapitel gelesen ✓" : "Ganzes Kapitel abhaken"}</button>
        </div>
      </div>

      <div className="lese">
        <div ref={inhaltRef}>
          {kapitel.abschnitte.map((a, i) => {
            const istGelesen = gelesen.has(a.id);
            const karteId = `eigen:${a.id}`;
            return (
              <section key={a.id} id={a.id} className="tz">
                <div className="tz__no">
                  <b>Tz. {i + 1}</b>
                  <span>{a.nr || "Überblick"}</span>
                  <button aria-pressed={istGelesen} onClick={() => umschalten(a.id, meta.abschnitte[i]?.minuten || 3)}>{istGelesen ? "✓ gelesen" : "als gelesen"}</button>
                </div>
                <div className="tz__body">
                  <h2 className="tz__titel">{a.titel}</h2>
                  <Html html={a.html} nav={nav} />
                  {notizen[a.id] && !notizOffen[a.id] && <div className="kasten kasten--hinweis" style={{ fontFamily: "var(--sans)" }}><b>Meine Notiz</b><p style={{ whiteSpace: "pre-wrap" }}>{notizen[a.id]}</p></div>}
                  {notizOffen[a.id] && (
                    <textarea className="notizfeld" style={{ marginTop: 10 }} placeholder="Eigene Notiz zu diesem Abschnitt …" defaultValue={notizen[a.id] || ""} onBlur={(e) => notizSetzen(a.id, e.target.value)} autoFocus />
                  )}
                  <div className="tz__fuss">
                    <button className={`btn btn--klein${istGelesen ? " btn--gruen" : " btn--linie"}`} onClick={() => umschalten(a.id, meta.abschnitte[i]?.minuten || 3)}><IconHaken /> {istGelesen ? "Gelesen" : "Als gelesen markieren"}</button>
                    <button className="btn btn--klein btn--linie" aria-pressed={!!notizOffen[a.id]} onClick={() => setNotizOffen({ ...notizOffen, [a.id]: !notizOffen[a.id] })}><IconNotiz /> {notizen[a.id] ? "Notiz bearbeiten" : "Notiz"}</button>
                    <button className={`btn btn--klein${karteHat(karteId) ? " btn--marke" : " btn--linie"}`} disabled={karteHat(karteId)} onClick={() => hinzufuegen({ id: karteId, typ: "abschnitt", gebiet, stufe, frage: `Fasse zusammen: ${meta.nr}. ${meta.titel} – ${a.titel}`, antwortHtml: a.html, quelle: { titel: `${meta.nr}. ${meta.titel}`, route: { gebiet, stufe, ansicht: "lehrbuch", id: meta.id, sub: a.id } } })}><IconKarten /> {karteHat(karteId) ? "Auf dem Stapel" : "Auf den Kartenstapel"}</button>
                  </div>
                </div>
              </section>
            );
          })}

          {(passendeSchemata.length > 0 || passendeFaelle.length > 0 || passendeProbleme.length > 0) && (
            <section className="abschnitt">
              <div className="abschnitt__kopf"><h2>Dazu passt</h2><span className="zaehler">über gemeinsame Normen verknüpft</span></div>
              <div className="raster raster--auto">
                {passendeSchemata.length > 0 && <div className="panel"><h3>Schemata</h3><div className="heute-aufgaben" style={{ marginTop: 8 }}>{passendeSchemata.map((s) => <button key={s.id} className="aufgabe" onClick={() => nav({ ansicht: "schemata", id: s.id })}><span className="aufgabe__check" style={{ border: 0, background: "var(--marke-hell)" }} /><span><strong>{s.titel}</strong><span>{s.norm}</span></span><em>→</em></button>)}</div></div>}
                {passendeFaelle.length > 0 && <div className="panel"><h3>Fälle</h3><div className="heute-aufgaben" style={{ marginTop: 8 }}>{passendeFaelle.map((f) => <button key={f.id} className="aufgabe" onClick={() => nav({ ansicht: "faelle", id: f.id })}><span className="aufgabe__check" style={{ border: 0, background: "var(--orange-feld)" }} /><span><strong>{f.name}</strong><span>{f.thema}</span></span><em>→</em></button>)}</div></div>}
                {passendeProbleme.length > 0 && <div className="panel"><h3>Streitstände</h3><div className="heute-aufgaben" style={{ marginTop: 8 }}>{passendeProbleme.map((p) => <button key={p.id} className="aufgabe" onClick={() => nav({ ansicht: "streit", id: p.id })}><span className="aufgabe__check" style={{ border: 0, background: "var(--magenta-feld)" }} /><span><strong>{p.titel}</strong><span>{p.bereich}</span></span><em>→</em></button>)}</div></div>}
              </div>
            </section>
          )}

          <Blaettern vorher={vorher && `${vorher.nr}. ${vorher.titel}`} nachher={nachher && `${nachher.nr}. ${nachher.titel}`} onVorher={() => nav({ ansicht: "lehrbuch", id: vorher.id })} onNachher={() => nav({ ansicht: "lehrbuch", id: nachher.id })} />
        </div>

        <aside className="lese__seite">
          <nav className="inhaltsnav" aria-label="Abschnitte des Kapitels">
            <b>In diesem Kapitel</b>
            {kapitel.abschnitte.map((a, i) => (
              <a key={a.id} href={`#${a.id}`} className={`${aktiv === a.id ? "aktiv" : ""} ${gelesen.has(a.id) ? "gelesen" : ""}`} onClick={(e) => { e.preventDefault(); document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{a.nr || `Tz. ${i + 1}`} {a.titel}</a>
            ))}
          </nav>
          <div className="lese__werkzeuge">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px", fontSize: 13 }}>
              <span>Schriftgröße</span>
              <span className="knopfreihe" style={{ gap: 4 }}><button className="tag" onClick={() => setGroesse(groesse - 1)} aria-label="kleiner">A−</button><button className="tag" onClick={() => setGroesse(groesse + 1)} aria-label="größer">A+</button></span>
            </div>
            <button onClick={() => nav({ ansicht: "karten" })}><IconKarten /> Karteikarten lernen</button>
            <button onClick={() => window.print()}><IconNotiz /> Kapitel drucken</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
