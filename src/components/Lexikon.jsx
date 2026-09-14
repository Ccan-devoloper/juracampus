import React, { useMemo, useState } from "react";
import { useMehrere, fundstelleRoute, werk } from "../lib/daten";
import { Kicker, Laden, useDebounce } from "./Bausteine";
import { IconSuche } from "./Icons";

const BUCHSTABEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Lexikon({ route, nav }) {
  const daten = useMehrere(["lexikon", "suche"]);
  const [buchstabe, setBuchstabe] = useState("A");
  const [q, setQ] = useState("");
  const [begriff, setBegriff] = useState(route.id || null);
  const dq = useDebounce(q, 150);
  const alle = useMemo(() => (daten ? Object.entries(daten.lexikon.buchstaben).flatMap(([b, liste]) => liste.map((t) => ({ b, t }))) : []), [daten]);
  const liste = useMemo(() => {
    if (!daten) return [];
    if (dq.trim()) { const s = dq.toLowerCase(); const alias = Object.entries(daten.lexikon.aliase).find(([typo]) => typo.toLowerCase() === s); const such = alias ? alias[1].toLowerCase() : s; return alle.filter((x) => x.t.toLowerCase().includes(such)).slice(0, 300); }
    return alle.filter((x) => x.b === buchstabe);
  }, [daten, alle, dq, buchstabe]);
  const treffer = useMemo(() => {
    if (!daten || !begriff) return [];
    const s = begriff.toLowerCase().replace(/\s*\(.*\)$/, "");
    return daten.suche.map((e) => { const t = e.text.toLowerCase(); const titel = e.titel.toLowerCase(); let score = 0; if (titel.includes(s)) score += 5; const n = t.split(s).length - 1; score += Math.min(n, 5); return { e, score }; }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 12);
  }, [daten, begriff]);
  if (!daten) return <Laden text="Lexikon wird geladen …" />;
  const TYP = { abschnitt: "Lehrbuch", fall: "Fall", problem: "Streitstand", rechtsstand: "Rechtsstand" };
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>Register · alle Rechtsgebiete</Kicker>
          <h1>Lexikon</h1>
          <p className="lead">{werk.zaehler.begriffe.toLocaleString("de-DE")} Fachbegriffe beider Examina. Ein Klick auf den Begriff zeigt, wo er im Werk erklärt oder verwendet wird.</p>
        </div>
      </div>
      <div className="suchfeld"><IconSuche /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Begriff suchen (auch Schreibvarianten) …" aria-label="Lexikon durchsuchen" /></div>
      {!dq.trim() && <div className="abc">{BUCHSTABEN.map((b) => <button key={b} aria-pressed={b === buchstabe} disabled={!daten.lexikon.buchstaben[b]} onClick={() => setBuchstabe(b)}>{b}</button>)}</div>}
      <div className="raster raster--2" style={{ alignItems: "start" }}>
        <div className="begriffe">
          {liste.map((x, i) => <button key={x.t + i} className="begriff" aria-pressed={begriff === x.t} onClick={() => setBegriff(x.t)}>{x.t}</button>)}
          {liste.length === 0 && <p style={{ color: "var(--ink-weich)" }}>Kein Begriff gefunden.</p>}
        </div>
        <aside className="panel" style={{ position: "sticky", top: "calc(var(--kopf) + var(--leiste-h) + var(--stufen-h) + 12px)" }}>
          {!begriff ? <p style={{ color: "var(--ink-weich)", margin: 0 }}>Begriff auswählen, um die Fundstellen im Werk zu sehen.</p> : (
            <>
              <div className="panel__head"><h2>{begriff}</h2><span className="zaehler">{treffer.length} Fundstellen</span></div>
              {treffer.length === 0 && <p style={{ color: "var(--ink-weich)" }}>Der Begriff ist als Stichwort registriert, im Fließtext aber nicht wörtlich enthalten. Die Volltextsuche findet verwandte Stellen.</p>}
              <div className="treffer">
                {treffer.map(({ e }) => <button key={e.id} className="treffer__eintrag" onClick={() => { const z = fundstelleRoute(e.typ, e.id); if (z) nav(z); }}><small>{TYP[e.typ]} · {e.pfad}</small><strong>{e.titel}</strong><p>{ausschnitt(e.text, begriff)}</p></button>)}
              </div>
              <div className="knopfreihe" style={{ marginTop: 12 }}><button className="btn btn--klein btn--linie" onClick={() => nav({ global: "suche", id: begriff })}>Volltextsuche nach „{begriff}“</button></div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}

export function ausschnitt(text, wort, breite = 150) {
  const i = text.toLowerCase().indexOf(wort.toLowerCase());
  if (i < 0) return text.slice(0, breite) + (text.length > breite ? " …" : "");
  const a = Math.max(0, i - breite / 2); const b = Math.min(text.length, i + wort.length + breite / 2);
  return (a > 0 ? "… " : "") + text.slice(a, b) + (b < text.length ? " …" : "");
}
