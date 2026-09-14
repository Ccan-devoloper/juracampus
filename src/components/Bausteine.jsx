import React, { useEffect, useMemo, useRef, useState } from "react";
import { ankerRoute, fundstelleRoute, lade, werk } from "../lib/daten";
import { IconHaken, IconSchliessen, IconPfeil, IconZurueck } from "./Icons";

/* --------------------------------------------------- HTML aus dem Werk */

/* Rendert vorbereitetes HTML und leitet Klicks auf Normzitate (.norm) und
   interne Verweise (.verweis) weiter. */
export function Html({ html, className = "inhalt", nav, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const klick = (e) => {
      const norm = e.target.closest(".norm");
      if (norm && norm.dataset.n) {
        e.preventDefault();
        const r = norm.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent("jc-norm", { detail: { keys: norm.dataset.n.split(";"), zitat: norm.textContent, x: r.left, y: r.bottom } }));
        return;
      }
      const v = e.target.closest(".verweis");
      if (v && v.dataset.ziel && nav) {
        e.preventDefault();
        const ziel = ankerRoute(v.dataset.ziel);
        if (ziel) nav(ziel);
      }
    };
    el.addEventListener("click", klick);
    return () => el.removeEventListener("click", klick);
  }, [nav]);
  return <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html || "" }} {...rest} />;
}

/* Meinungsstreit-Signalwörter hervorheben (nur Anzeige) */
export function hervorheben(html) {
  if (!html) return html;
  return html
    .replace(/\b(herrschende[nr]? (?:Meinung|Auffassung|Ansicht|Lehre)|h\.\s?M\.|ganz h\.\s?M\.|überwiegende[nr]? (?:Meinung|Auffassung|Ansicht)|vorherrschende[nr]? (?:Meinung|Auffassung|Ansicht|Lösung))/g, '<span class="hervor-hm">$1</span>')
    .replace(/\b(Mindermeinung|Gegenansicht|Gegenauffassung|Gegenmeinung|a\.\s?A\.|andere Ansicht|Teil der Literatur|Literaturansicht|Lehre vom [A-ZÄÖÜ]\w+)/g, '<span class="hervor-mm">$1</span>')
    .replace(/\b(Rechtsprechung|BGH|BVerfG|BVerwG|BAG|EuGH|EGMR|BFH|Rspr\.)\b/g, '<span class="hervor-rspr">$1</span>')
    .replace(/\b(streitig|umstritten|Streitstand|Streit(?:frage)?)\b/g, '<span class="hervor-streit">$1</span>');
}

/* --------------------------------------------------------- Normen-Popover */

export function NormPopover({ nav }) {
  const [offen, setOffen] = useState(null);
  const [normen, setNormen] = useState(null);
  useEffect(() => {
    const auf = (e) => { setOffen(e.detail); if (!normen) lade("normen").then(setNormen); };
    const zu = (e) => { if (e.key === "Escape") setOffen(null); };
    const weg = () => setOffen(null);
    window.addEventListener("jc-norm", auf);
    window.addEventListener("keydown", zu);
    window.addEventListener("hashchange", weg);
    return () => { window.removeEventListener("jc-norm", auf); window.removeEventListener("keydown", zu); window.removeEventListener("hashchange", weg); };
  }, [normen]);
  useEffect(() => {
    if (!offen) return undefined;
    const schliessen = (e) => { if (!e.target.closest(".normpop") && !e.target.closest(".norm")) setOffen(null); };
    const t = setTimeout(() => document.addEventListener("click", schliessen), 0);
    return () => { clearTimeout(t); document.removeEventListener("click", schliessen); };
  }, [offen]);
  if (!offen) return null;
  const key = offen.keys[0];
  const gesetzKurz = key.split(" ")[0] === "Rom" ? key.split(" ").slice(0, 2).join(" ") : key.replace(/ (§|Art\.) .*$/, "");
  const eintrag = normen && normen.gesetze.flatMap((g) => g.normen).find((n) => n.key === key);
  const links = Math.min(offen.x, window.innerWidth - 440);
  const oben = offen.y + 8 + 380 > window.innerHeight ? Math.max(8, offen.y - 400) : offen.y + 8;
  return (
    <div className="normpop" style={{ left: Math.max(8, links), top: oben }} role="dialog" aria-label={`Norm ${offen.zitat}`}>
      <div className="normpop__kopf">
        <div>
          <strong>{offen.zitat}</strong>
          <span>{werk.gesetze[gesetzKurz] || gesetzKurz}</span>
        </div>
        <button className="iconbtn" style={{ color: "var(--ink)", borderColor: "var(--linie)", width: 30, height: 30 }} onClick={() => setOffen(null)} aria-label="Schließen"><IconSchliessen /></button>
      </div>
      {!normen && <p style={{ fontSize: 13, color: "var(--ink-weich)" }}>Fundstellen werden geladen …</p>}
      {normen && !eintrag && <p style={{ fontSize: 13, color: "var(--ink-weich)" }}>Keine weiteren Fundstellen im Werk.</p>}
      {eintrag && (
        <>
          <p style={{ fontSize: 12.5, color: "var(--ink-weich)", margin: 0 }}>{eintrag.anzahl} Fundstelle{eintrag.anzahl === 1 ? "" : "n"} im Werk</p>
          <ul>
            {eintrag.fundstellen.slice(0, 12).map((f) => (
              <li key={f.id}><button onClick={() => { setOffen(null); const z = fundstelleRoute(f.typ, f.id); if (z) nav(z); }}><small>{f.typ === "abschnitt" ? "Lehrbuch" : f.typ === "fall" ? "Fall" : f.typ === "problem" ? "Streitstand" : "Rechtsstand"}</small>{f.t}</button></li>
            ))}
          </ul>
        </>
      )}
      <div className="normpop__fuss">
        <button className="btn btn--klein btn--linie" onClick={() => { setOffen(null); nav({ global: "normen", id: gesetzKurz, sub: key }); }}>Im Normenregister <IconPfeil /></button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- Kleinteile */

export const Kicker = ({ children, neutral }) => <span className={`kicker${neutral ? " kicker--neutral" : ""}`}>{children}</span>;

export function Ring({ p, zahl, titel, text, klasse = "" }) {
  return (
    <div className="fortschritt">
      <div className={`ring ${klasse}`} style={{ "--p": `${p}%` }}><b>{zahl ?? `${p}%`}</b></div>
      <h3>{titel}</h3>
      <p>{text}</p>
    </div>
  );
}

export const Laden = ({ text = "Inhalte werden geladen …" }) => <div className="laden" role="status" aria-live="polite">{text}</div>;

export const Leer = ({ titel, text, children }) => (
  <div className="leer"><strong>{titel}</strong>{text && <p>{text}</p>}{children}</div>
);

export function Blaettern({ vorher, nachher, onVorher, onNachher, labelVor = "Vorheriges Kapitel", labelNach = "Nächstes Kapitel" }) {
  return (
    <div className="blaettern">
      {vorher ? <button onClick={onVorher}><small><IconZurueck /> {labelVor}</small><strong>{vorher}</strong></button> : <span />}
      {nachher ? <button onClick={onNachher}><small>{labelNach} <IconPfeil /></small><strong>{nachher}</strong></button> : <span />}
    </div>
  );
}

export const Haken = () => <IconHaken />;

/* XP-Toast: reagiert auf das Ereignis „jc-xp“ */
export function XpToast() {
  const [toast, setToast] = useState(null);
  useEffect(() => {
    let timer;
    const auf = (e) => { setToast(e.detail); clearTimeout(timer); timer = setTimeout(() => setToast(null), 2300); };
    window.addEventListener("jc-xp", auf);
    return () => { window.removeEventListener("jc-xp", auf); clearTimeout(timer); };
  }, []);
  if (!toast) return null;
  return <div className="toast" role="status"><b>+{toast.punkte} XP</b> {toast.grund}</div>;
}

/* Kleiner Dialog */
export function Dialog({ titel, onSchliessen, children }) {
  useEffect(() => {
    const zu = (e) => { if (e.key === "Escape") onSchliessen(); };
    window.addEventListener("keydown", zu);
    return () => window.removeEventListener("keydown", zu);
  }, [onSchliessen]);
  return (
    <div className="dialog" onClick={(e) => { if (e.target === e.currentTarget) onSchliessen(); }}>
      <div className="dialog__box" role="dialog" aria-modal="true" aria-label={titel}>
        <div className="panel__head"><h2>{titel}</h2><button className="btn btn--klein btn--linie" onClick={onSchliessen}>Schließen</button></div>
        {children}
      </div>
    </div>
  );
}

/* Textsuche in Listen: einfache Tokensuche, alle Wörter müssen vorkommen. */
export function passt(text, q) {
  if (!q) return true;
  const t = text.toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => t.includes(w));
}

export function useDebounce(wert, ms = 200) {
  const [v, setV] = useState(wert);
  useEffect(() => { const t = setTimeout(() => setV(wert), ms); return () => clearTimeout(t); }, [wert, ms]);
  return v;
}

/* Mischen mit festem Startwert (damit ein Quiz reproduzierbar bleibt) */
export function mischen(liste, seed = Date.now()) {
  const a = [...liste];
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function useMemoMischen(liste, seed) {
  return useMemo(() => mischen(liste, seed), [liste, seed]);
}
