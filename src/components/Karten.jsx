import React, { useEffect, useMemo, useState } from "react";
import { useMehrere, GEBIET_NAME, STUFE_NAME, fundstelleRoute } from "../lib/daten";
import { useKartenStand, useEigeneKarten } from "../lib/fortschritt";
import { useSpeicher } from "../lib/speicher";
import { bewerten, sitzung, STUFEN, vorschau, HEUTE, kartenAbruf } from "../lib/wiederholung";
import { gutschreiben, XP } from "../lib/xp";
import { kartenBauen, KARTENTYPEN } from "../lib/karten";
import { Html, Kicker, Laden, Leer } from "./Bausteine";
import { IconAuge, IconKarten, IconShuffle } from "./Icons";

export default function Karten({ nav, gebiet, stufe, route }) {
  const daten = useMehrere(["definitionen", "probleme", "faelle", "rechtsstand"]);
  const { stand, setzen } = useKartenStand();
  const { karten: eigene, entfernen } = useEigeneKarten();
  const [einst, setEinst] = useSpeicher("karten-einstellungen", { neuProTag: 15, typen: KARTENTYPEN.map((t) => t.id) });
  /* Aus der Lernsitzung kommt die Route #/…/karten/los-20: direkt starten,
     gedeckelt auf die geplante Kartenzahl. Sonst wird aus „20 Minuten" doch
     wieder ein offener Karteikartenabend. */
  const auftrag = /^los-(\d+)$/.exec(route?.id || "");
  const [nurFaellig, setNurFaellig] = useState(false);
  const [aktiv, setAktiv] = useState(!!auftrag);
  const deckel = auftrag ? Number(auftrag[1]) : null;

  const alle = useMemo(() => (daten ? kartenBauen({ gebiet, stufe, ...daten, eigene, typen: einst.typen }) : []), [daten, gebiet, stufe, eigene, einst.typen]);
  const heute = HEUTE();
  const faellig = alle.filter((k) => stand[k.id] && stand[k.id].due <= heute);
  const neu = alle.filter((k) => !stand[k.id]);
  const gelernt = alle.filter((k) => stand[k.id]);
  const heuteNeu = Object.values(stand).filter((s) => s.hist && s.hist.length === 1 && s.last === heute).length;
  const neuHeuteRest = Math.max(0, (einst.neuProTag || 15) - heuteNeu);

  if (!daten) return <Laden text="Kartenstapel wird gebaut …" />;

  const typUmschalten = (id) => setEinst({ ...einst, typen: einst.typen.includes(id) ? einst.typen.filter((t) => t !== id) : [...einst.typen, id] });

  if (aktiv) {
    let ids = sitzung(alle.map((k) => k.id), stand, { neuMax: nurFaellig ? 0 : neuHeuteRest, faelligMax: 80 });
    if (deckel) ids = ids.slice(0, deckel);
    const kartenMap = new Map(alle.map((k) => [k.id, k]));
    return <Lernsitzung karten={ids.map((id) => kartenMap.get(id))} stand={stand} setzen={setzen} nav={nav} onEnde={() => { setAktiv(false); if (deckel) nav({ ansicht: "sitzung" }); }} entfernen={entfernen} auftrag={!!deckel} />;
  }

  const verteilung = KARTENTYPEN.map((t) => ({ ...t, n: alle.filter((k) => k.typ === t.id).length, f: faellig.filter((k) => k.typ === t.id).length }));

  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</Kicker>
          <h1>Karteikarten</h1>
          <p className="lead">Definitionen, Streitstände, Fälle, Schemata, Normen und der Rechtsstand 2026 als Karten. Wiederholt wird nach FSRS: Das Verfahren schätzt für jede Karte getrennt, wie fest das Wissen sitzt und wie schwer der Stoff dir fällt, und legt die Wiederholung genau vor den Punkt, an dem du sie vergessen würdest.</p>
        </div>
        <span className="zaehler">{alle.length} Karten · {faellig.length} fällig · {neu.length} neu</span>
      </div>

      <div className="training">
        <div>
          <section className="panel panel--marke">
            <div className="panel__head"><h2>{faellig.length > 0 ? `${faellig.length} Karte${faellig.length === 1 ? "" : "n"} fällig` : neu.length > 0 ? "Heute neue Karten lernen" : "Alles wiederholt"}</h2><span className="zaehler">bis zu {Math.min(neuHeuteRest, neu.length)} neue Karten heute</span></div>
            <p style={{ marginBottom: 14 }}>{faellig.length > 0 ? "Fällige Karten zuerst, danach neue – eine Sitzung dauert etwa 10 bis 20 Minuten." : neu.length > 0 ? "Der Stapel ist frisch. Jede Karte, die du bewertest, bekommt ihren eigenen Wiederholungsrhythmus." : "Komm morgen wieder oder erweitere den Stapel über die Kartentypen."}</p>
            <div className="knopfreihe">
              <button className="btn btn--gross" disabled={faellig.length + Math.min(neuHeuteRest, neu.length) === 0} onClick={() => { setNurFaellig(false); setAktiv(true); }}><IconKarten /> Lernsitzung starten</button>
              {faellig.length > 0 && <button className="btn btn--linie" onClick={() => { setNurFaellig(true); setAktiv(true); }}>Nur fällige</button>}
            </div>
          </section>

          <section className="abschnitt">
            <div className="abschnitt__kopf"><h2>Kartentypen im Stapel</h2><span className="zaehler">an- und abwählbar</span></div>
            <div className="modus-wahl">
              {verteilung.map((t) => (
                <button key={t.id} className="modus" aria-pressed={einst.typen.includes(t.id)} onClick={() => typUmschalten(t.id)}>
                  <b>{t.label}</b>
                  <span>{t.hinweis}</span>
                  <em>{einst.typen.includes(t.id) ? `${t.n} Karten · ${t.f} fällig` : "ausgeblendet"}</em>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="seitenstat">
          <div className="panel">
            <h3>Dein Stapel</h3>
            <div className="stat"><span>Karten gesamt</span><b>{alle.length}</b></div>
            <div className="stat"><span>Im Wiederholungssystem</span><b>{gelernt.length}</b></div>
            <div className="stat"><span>Heute fällig</span><b>{faellig.length}</b></div>
            <div className="stat"><span>Noch nie gesehen</span><b>{neu.length}</b></div>
            <div className="stat"><span>Heute neu gelernt</span><b>{heuteNeu}</b></div>
          </div>
          <div className="panel">
            <h3>Einstellungen</h3>
            <label className="einstellung"><span>Neue Karten pro Tag</span><input type="number" min="0" max="100" value={einst.neuProTag} onChange={(e) => setEinst({ ...einst, neuProTag: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })} /></label>
            <p style={{ fontSize: 12.5, color: "var(--ink-weich)", marginTop: 8 }}>Tastatur in der Sitzung: <kbd>Leertaste</kbd> Antwort zeigen, <kbd>1</kbd> bis <kbd>4</kbd> bewerten.</p>
          </div>
          {eigene.filter((k) => k.gebiet === gebiet && k.stufe === stufe).length > 0 && (
            <div className="panel">
              <h3>Eigene Karten</h3>
              <p style={{ fontSize: 13, color: "var(--ink-weich)" }}>{eigene.filter((k) => k.gebiet === gebiet && k.stufe === stufe).length} Karten aus Lehrbuch, Streitständen, Fällen und Schemata.</p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

function Lernsitzung({ karten, stand, setzen, nav, onEnde, entfernen, auftrag }) {
  const [i, setI] = useState(0);
  const [offen, setOffen] = useState(false);
  const [ergebnis, setErgebnis] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const karte = karten[i];

  useEffect(() => {
    const auf = (e) => {
      if (/input|textarea/i.test(document.activeElement?.tagName || "")) return;
      if (e.key === " " && !offen) { e.preventDefault(); setOffen(true); }
      if (offen && ["1", "2", "3", "4"].includes(e.key)) { e.preventDefault(); bewertung(STUFEN[Number(e.key) - 1].g); }
    };
    window.addEventListener("keydown", auf);
    return () => window.removeEventListener("keydown", auf);
  });

  if (!karte) {
    const gesamt = ergebnis[1] + ergebnis[2] + ergebnis[3] + ergebnis[4];
    return (
      <div className="panel quiz">
        <div className="mitte">
          <span className="ergebnis-zahl">{gesamt}</span>
          <strong>{gesamt === 0 ? "Keine Karten in dieser Sitzung" : "Karten wiederholt"}</strong>
          {gesamt > 0 && <p>{ergebnis[4]} leicht · {ergebnis[3]} gut · {ergebnis[2]} schwer · {ergebnis[1]} nochmal. Jede Karte kommt wieder, kurz bevor du sie vergisst.</p>}
          <div className="knopfreihe" style={{ justifyContent: "center", marginTop: 16 }}>
            <button className="btn" onClick={onEnde}>{auftrag ? "Zurück zur Lernsitzung" : "Zurück zum Stapel"}</button>
            <button className="btn btn--linie" onClick={() => nav({ ansicht: "cockpit" })}>Zum Cockpit</button>
          </div>
        </div>
      </div>
    );
  }

  const bewertung = (q) => {
    const neu = bewerten(stand[karte.id], q);
    setzen(karte.id, neu);
    gutschreiben(XP.karte(q), q >= 4 ? "Karte sofort gewusst" : q === 3 ? "Karte gewusst" : q === 2 ? "Karte mit Mühe" : "Karte nochmal");
    setErgebnis((e) => ({ ...e, [q]: e[q] + 1 }));
    setOffen(false);
    setI(i + 1);
  };
  const s = stand[karte.id];
  const typ = KARTENTYPEN.find((t) => t.id === (karte.typ === "eigen" ? "eigen" : karte.typ));
  const ziel = karte.quelle?.route || (karte.quelle?.fundstelle ? fundstelleRoute("abschnitt", karte.quelle.fundstelle) : null);

  return (
    <div className="training">
      <div className={`karte${offen ? " karte--umgedreht" : ""}`} key={karte.id + (offen ? "-a" : "-f")}>
        <div className="karte__meta">
          <span>Karte {i + 1} von {karten.length} · {typ ? typ.label : karte.typ}</span>
          <span>{s ? `${s.n}× gesehen · Stabilität ${Math.round(s.s ?? s.iv ?? 0)} Tage · Abruf ${Math.round(kartenAbruf(s) * 100)} %` : "neu"}</span>
        </div>
        <div className="karte__frage">
          <small>{typ ? typ.hinweis : ""}</small>
          {karte.frage}
          {karte.hinweis && <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-weich)", marginTop: 8 }}>{karte.hinweis}</p>}
          {karte.frageHtml && <Html html={karte.frageHtml} className="inhalt inhalt--kompakt" nav={nav} />}
        </div>
        {offen && (
          <div className="karte__antwort">
            <small>Antwort</small>
            <Html html={karte.antwortHtml} className="inhalt inhalt--kompakt" nav={nav} />
            {(ziel || karte.quelle?.titel) && <p className="karte__quelle">Quelle: {karte.quelle?.titel} {ziel && <button onClick={() => nav(ziel)}>öffnen</button>}</p>}
          </div>
        )}
        <div className="karte__steuerung">
          {!offen ? <button className="btn btn--gross" onClick={() => setOffen(true)}><IconAuge /> Antwort zeigen <small>Leertaste</small></button> : STUFEN.map((st, k) => (
            <button key={st.g} className={`btn btn--${st.ton}`} onClick={() => bewertung(st.g)} title={`${st.hinweis} – nächste Wiederholung in ${vorschau(s, st.g)} Tagen`}>{st.label} <small>{vorschau(s, st.g)} T · {k + 1}</small></button>
          ))}
        </div>
      </div>
      <aside className="seitenstat">
        <div className="panel">
          <h3>Sitzung</h3>
          <div className="stat"><span>Leicht</span><b>{ergebnis[4]}</b></div>
          <div className="stat"><span>Gut</span><b>{ergebnis[3]}</b></div>
          <div className="stat"><span>Schwer</span><b>{ergebnis[2]}</b></div>
          <div className="stat"><span>Nochmal</span><b>{ergebnis[1]}</b></div>
          <div className="stat"><span>Verbleibend</span><b>{karten.length - i}</b></div>
          <div className="knopfreihe" style={{ marginTop: 12 }}>
            <button className="btn btn--klein btn--linie" onClick={() => { setOffen(false); setI(i + 1); }}><IconShuffle /> Überspringen</button>
            {karte.typ === "eigen" && <button className="btn btn--klein btn--linie" onClick={() => { entfernen(karte.id); setOffen(false); setI(i + 1); }}>Karte löschen</button>}
            <button className="btn btn--klein btn--geist" onClick={onEnde}>Sitzung beenden</button>
          </div>
        </div>
        <div className="panel">
          <h3>So bewertest du</h3>
          <p style={{ fontSize: 13, color: "var(--ink-weich)" }}><b>Leicht</b>: sofort da. <b>Gut</b>: gewusst. <b>Schwer</b>: nur mit Mühe erinnert. <b>Nochmal</b>: nicht gewusst, morgen wieder. Die Unterscheidung zwischen „Schwer“ und „Gut“ ist der Kern des Verfahrens: Sie trennt sicheres Wissen von knapp Erinnertem.</p>
        </div>
      </aside>
    </div>
  );
}
