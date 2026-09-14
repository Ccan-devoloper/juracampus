import React, { useState } from "react";
import { useSpeicher, exportieren, importieren, alleLoeschen } from "../lib/speicher";
import { werk } from "../lib/daten";
import { useLesezeichen, useEigeneKarten } from "../lib/fortschritt";
import { stand as xpStand, levelFuer, streak, LEVEL } from "../lib/xp";
import { Kicker, Dialog } from "./Bausteine";
import { IconLesezeichen } from "./Icons";

export default function Einstellungen({ nav, dunkel, setDunkel }) {
  const [ziel, setZiel] = useSpeicher("tagesziel", 60);
  const [einst, setEinst] = useSpeicher("einstellungen", { lesegroesse: 17 });
  const { liste: lesezeichen, umschalten } = useLesezeichen();
  const { karten } = useEigeneKarten();
  const [meldung, setMeldung] = useState("");
  const [loeschen, setLoeschen] = useState(false);
  const xp = xpStand();
  const level = levelFuer(xp.gesamt || 0);

  const herunterladen = () => {
    const blob = new Blob([JSON.stringify(exportieren(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `juracampus-lernstand-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const hochladen = (e) => {
    const datei = e.target.files && e.target.files[0]; if (!datei) return;
    datei.text().then((t) => { try { importieren(JSON.parse(t)); setMeldung("Lernstand eingespielt – die Seite wird neu geladen."); setTimeout(() => window.location.reload(), 900); } catch (err) { setMeldung(err.message); } });
  };

  return (
    <>
      <div className="pagehead">
        <div><Kicker>Einstellungen</Kicker><h1>Einstellungen und Lernstand</h1><p className="lead">Alles bleibt auf diesem Gerät. Über Export und Import nimmst du deinen Stand auf ein anderes Gerät mit.</p></div>
      </div>
      <div className="raster raster--2">
        <section className="panel">
          <h2 style={{ marginBottom: 8 }}>Darstellung und Ziele</h2>
          <label className="einstellung"><span>Dunkles Design</span><input type="checkbox" checked={!!dunkel} onChange={(e) => setDunkel(e.target.checked)} style={{ width: 20, height: 20, accentColor: "var(--marke-text)" }} /></label>
          <label className="einstellung"><span>Tagesziel in XP (60 ≈ 30 Minuten)</span><input type="number" min="10" max="500" step="10" value={ziel} onChange={(e) => setZiel(Math.max(10, Math.min(500, Number(e.target.value) || 60)))} /></label>
          <label className="einstellung"><span>Schriftgröße im Lehrbuch ({einst.lesegroesse || 17} px)</span><input type="range" min="14" max="22" value={einst.lesegroesse || 17} onChange={(e) => setEinst({ ...einst, lesegroesse: Number(e.target.value) })} /></label>
        </section>
        <section className="panel">
          <h2 style={{ marginBottom: 8 }}>Dein Stand</h2>
          <div className="stat"><span>Erfahrungspunkte</span><b>{xp.gesamt || 0} XP</b></div>
          <div className="stat"><span>Level</span><b>{level.stufe} · {level.name}</b></div>
          <div className="stat"><span>Streak</span><b>{streak(xp)} Tage</b></div>
          <div className="stat"><span>Eigene Karteikarten</span><b>{karten.length}</b></div>
          <div className="stat"><span>Lesezeichen</span><b>{lesezeichen.length}</b></div>
          <p style={{ fontSize: 12.5, color: "var(--ink-weich)", marginTop: 10 }}>Levelstufen: {LEVEL.map((l) => `${l.name} (${l.ab})`).join(" · ")}</p>
        </section>
      </div>
      <div className="raster raster--2" style={{ marginTop: 14 }}>
        <section className="panel">
          <h2 style={{ marginBottom: 8 }}>Sichern und übertragen</h2>
          <p style={{ fontSize: 14, color: "var(--ink-weich)" }}>Der Export enthält gelesene Abschnitte, Fallbewertungen, Karteikartenstände, Notizen, Lesezeichen, Lernplan und Punkte.</p>
          <div className="knopfreihe">
            <button className="btn" onClick={herunterladen}>Lernstand als Datei sichern</button>
            <label className="btn btn--linie" style={{ cursor: "pointer" }}>Datei einspielen<input type="file" accept="application/json" onChange={hochladen} style={{ display: "none" }} /></label>
          </div>
          {meldung && <p style={{ marginTop: 10, fontSize: 13.5 }}>{meldung}</p>}
          <hr style={{ border: 0, borderTop: "1px solid var(--linie)", margin: "16px 0" }} />
          <button className="btn btn--klein btn--rot" onClick={() => setLoeschen(true)}>Gesamten Lernstand löschen</button>
        </section>
        <section className="panel">
          <div className="panel__head"><h2>Lesezeichen</h2><span className="zaehler">{lesezeichen.length}</span></div>
          {lesezeichen.length === 0 ? <p style={{ color: "var(--ink-weich)" }}>Noch nichts gemerkt. In Kapiteln, Streitständen und Fällen gibt es den Knopf „Merken“.</p> : (
            <div className="heute-aufgaben">
              {lesezeichen.map((l) => <div key={l.id} className="aufgabe" style={{ cursor: "default" }}><span className="aufgabe__check" style={{ border: 0, background: "var(--marke-hell)", color: "var(--marke-text)" }}><IconLesezeichen voll /></span><span><button className="btn btn--geist" style={{ padding: 0, fontSize: 14.5 }} onClick={() => nav(l.route)}><strong>{l.titel}</strong></button><span>{l.typ} · {l.datum}</span></span><button className="tag" onClick={() => umschalten(l)}>entfernen</button></div>)}
            </div>
          )}
        </section>
      </div>
      <section className="panel" style={{ marginTop: 14 }}>
        <h2 style={{ marginBottom: 8 }}>Über JuraCampus</h2>
        <p style={{ fontSize: 14, color: "var(--ink-weich)" }}>{werk.stand} Das Werk umfasst {werk.zaehler.kapitel} Kapitel in {werk.baende.length} Fachbänden, {werk.zaehler.faelle} Fälle, {werk.zaehler.probleme} Streitstände, {werk.zaehler.normen} Einzelnormen und {werk.zaehler.begriffe.toLocaleString("de-DE")} Lexikonbegriffe. Die Examensrelevanz-Marker („Dauerbrenner“, „Regelmäßig“, „Grundlage“) sind eine redaktionelle Einschätzung. Bei Gesetzesänderungen hat der amtliche Text Vorrang – die Rechtsstandsseite nennt die kritischen Bereiche.</p>
      </section>
      {loeschen && (
        <Dialog titel="Lernstand wirklich löschen?" onSchliessen={() => setLoeschen(false)}>
          <p>Gelesene Abschnitte, Karteikarten, Fallbewertungen, Notizen, Punkte und Lesezeichen werden unwiderruflich entfernt. Vorher sichern?</p>
          <div className="knopfreihe"><button className="btn btn--rot" onClick={() => { alleLoeschen(); window.location.hash = "#/start"; window.location.reload(); }}>Ja, alles löschen</button><button className="btn btn--linie" onClick={() => setLoeschen(false)}>Abbrechen</button></div>
        </Dialog>
      )}
    </>
  );
}
