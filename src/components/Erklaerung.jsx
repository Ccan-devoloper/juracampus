import React, { useState } from "react";
import { erklaerungFuer } from "../data/erklaerungen";
import { useSpeicher } from "../lib/speicher";
import { landFinden, WIDERSPRUCH_STAND } from "../data/laender";
import { visualisierungenFuer } from "../data/visualisierungen";
import Visualisierung from "./Visualisierung";
import { IconPfeil, IconStreit, IconAuge, IconRegister } from "./Icons";

/* Landesbezug: Im Öffentlichen Recht steht in der Klausur nicht „das
   Polizeigesetz", sondern das des Prüfungslandes. Wo das für eine Kompetenz
   den Unterschied macht, sagt die Erklärung es ausdrücklich. */
const LANDBEZUG = {
  "oeff1-polizeirecht": (l) => ({ titel: "In Ihrem Bundesland", zeilen: [`Gefahrenabwehr: ${l.polizei.n} (${l.polizei.k})`, `Generalklausel: ${l.polizei.general}`, `Vollstreckung: ${l.vollstreckung.k}`], text: l.besonderheit }),
  "oeff1-baurecht": (l) => ({ titel: "In Ihrem Bundesland", zeilen: [`Bauordnungsrecht: ${l.bau.n} (${l.bau.k})`, "Bauplanungsrecht bleibt Bundesrecht: BauGB und BauNVO"], text: "Die Abgrenzung von Planungs- und Ordnungsrecht ist überall gleich – die zitierte Bauordnung nicht." }),
  "oeff1-anfechtungsklage": (l) => ({ titel: "Vorverfahren in Ihrem Bundesland", zeilen: [`Widerspruchsverfahren: ${WIDERSPRUCH_STAND[l.widerspruch.stand].label}`], text: l.widerspruch.text }),
  "oeff1-verpflichtungsklage": (l) => ({ titel: "Vorverfahren in Ihrem Bundesland", zeilen: [`Widerspruchsverfahren: ${WIDERSPRUCH_STAND[l.widerspruch.stand].label}`], text: l.widerspruch.text }),
  "oeff2-widerspruchsbescheid": (l) => ({ titel: "Vorverfahren in Ihrem Bundesland", zeilen: [`Widerspruchsverfahren: ${WIDERSPRUCH_STAND[l.widerspruch.stand].label}`], text: l.widerspruch.text }),
  "oeff2-behoerdenklausur": (l) => ({ titel: "In Ihrem Bundesland", zeilen: [`Verwaltungsverfahren: ${l.vwvfg.k}`, `Vollstreckung und Zwangsmittel: ${l.vollstreckung.k}`, `Bauordnungsrecht: ${l.bau.k}`], text: "Der Bescheid zitiert Landesrecht – die Kürzel gehören in den verfügenden Teil und in die Begründung." }),
  "oeff1-oeff-methodik": (l) => ({ titel: "In Ihrem Bundesland", zeilen: [`Verwaltungsverfahren: ${l.vwvfg.k}`, `Kommunalrecht: ${l.kommunal.k}`], text: "Der Bearbeitervermerk nennt regelmäßig das anwendbare Landesrecht. Er geht jeder Annahme vor." }),
};

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
  const [landId] = useSpeicher("bundesland", null);
  const land = landFinden(landId);
  const bezug = LANDBEZUG[kompetenzId];
  const bilder = visualisierungenFuer(kompetenzId);
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
        {bezug && land && <LandBox {...bezug(land)} />}
        {stufe === "kurz" && (
          <>
            <p className="erklaerung__kurz">{e.kurz}</p>
            {e.formulierung && <Formulierung text={e.formulierung} />}
          </>
        )}

        {stufe === "mittel" && (
          <>
            {bilder.map((v) => <Visualisierung key={v.id} v={v} />)}
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

function LandBox({ titel, zeilen, text }) {
  return (
    <aside className="landbox">
      <h4><IconRegister /> {titel}</h4>
      <ul>{zeilen.map((z, i) => <li key={i}>{z}</li>)}</ul>
      {text && <p>{text}</p>}
    </aside>
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
