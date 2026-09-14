import React, { useState } from "react";
import { erklaerungFuer } from "../data/erklaerungen";
import { IconPfeil, IconStreit, IconAuge } from "./Icons";

/* Drei Stufen, weil drei verschiedene Fragen dahinterstehen. Die Stufe bleibt
   gespeichert: Wer einmal auf „Vertiefung" gestellt hat, will das Thema
   durchdringen und soll nicht bei jedem Knoten neu klicken. */
const STUFEN = [
  { id: "kurz", label: "30 Sekunden", text: "Worum geht es?" },
  { id: "mittel", label: "3 bis 5 Minuten", text: "Wie prüfe ich das?" },
  { id: "tief", label: "Vertiefung", text: "Was macht die gute Klausur aus?" },
];

export default function Erklaerung({ kompetenzId, offenAb = "kurz", kompakt }) {
  const e = erklaerungFuer(kompetenzId);
  const [stufe, setStufe] = useState(offenAb);
  if (!e) return null;

  return (
    <section className={`erklaerung${kompakt ? " erklaerung--kompakt" : ""}`}>
      <div className="erklaerung__stufen" role="tablist" aria-label="Erklärungstiefe">
        {STUFEN.map((s) => (
          <button key={s.id} role="tab" aria-selected={stufe === s.id} className="erklaerung__stufe" onClick={() => setStufe(s.id)}>
            <b>{s.label}</b>
            <span>{s.text}</span>
          </button>
        ))}
      </div>

      <div className="erklaerung__inhalt">
        {stufe === "kurz" && (
          <>
            <p className="erklaerung__kurz">{e.kurz}</p>
            {e.formulierung && <Formulierung text={e.formulierung} />}
          </>
        )}

        {stufe === "mittel" && (
          <>
            <ol className="erklaerung__schritte">
              {e.mittel.map((m, i) => (
                <li key={i}><strong>{m.t}</strong><p>{m.x}</p></li>
              ))}
            </ol>
            <div className="beispielpaar">
              <div className="beispiel beispiel--ja">
                <span>So greift es</span>
                <p>{e.beispiel}</p>
              </div>
              <div className="beispiel beispiel--nein">
                <span>So gerade nicht</span>
                <p>{e.gegenbeispiel}</p>
              </div>
            </div>
            {e.formulierung && <Formulierung text={e.formulierung} />}
            <Fallen fallen={e.fallen} />
          </>
        )}

        {stufe === "tief" && (
          <>
            <div className="erklaerung__tief">
              {e.vertiefung.map((v, i) => (
                <div key={i} className="vertiefung">
                  <h4><IconStreit /> {v.t}</h4>
                  <p>{v.x}</p>
                </div>
              ))}
            </div>
            <Fallen fallen={e.fallen} />
          </>
        )}
      </div>
    </section>
  );
}

function Formulierung({ text }) {
  const [kopiert, setKopiert] = useState(false);
  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 1800);
    } catch { setKopiert(false); }
  };
  return (
    <div className="formulierung">
      <div className="formulierung__kopf">
        <span>Klausurformulierung</span>
        <button className="btn btn--klein btn--geist" onClick={kopieren}>{kopiert ? "kopiert" : "kopieren"}</button>
      </div>
      <blockquote>{text}</blockquote>
    </div>
  );
}

function Fallen({ fallen }) {
  if (!fallen || !fallen.length) return null;
  return (
    <div className="fehlerfallen">
      <h4>Fehlerfallen</h4>
      <ul>
        {fallen.map((f, i) => (
          <li key={i}>
            <strong>{f.f}</strong>
            <span>{f.w}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Kleiner Aufhänger für Listen: „Zu dieser Kompetenz gibt es eine Erklärung." */
export function ErklaerungsHinweis({ kompetenzId, onOeffnen }) {
  if (!erklaerungFuer(kompetenzId)) return null;
  return (
    <button className="erklaerungshinweis" onClick={onOeffnen}>
      <IconAuge /> Erklärung in drei Stufen <IconPfeil />
    </button>
  );
}
