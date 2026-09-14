import React, { useEffect, useMemo, useState } from "react";
import { useDaten, fundstelleRoute, werk } from "../lib/daten";
import { Kicker, Laden, passt } from "./Bausteine";
import { IconSuche } from "./Icons";

export default function Normenregister({ route, nav }) {
  const normen = useDaten("normen");
  const [q, setQ] = useState("");
  const [offen, setOffen] = useState(route.sub || null);
  const gesetz = route.id || "BGB";
  useEffect(() => { setOffen(route.sub || null); }, [route.sub]);
  const g = useMemo(() => (normen.daten ? normen.daten.gesetze.find((x) => x.kurz === gesetz) || normen.daten.gesetze[0] : null), [normen.daten, gesetz]);
  if (!normen.daten) return <Laden text="Normenregister wird geladen …" />;
  const liste = g.normen.filter((n) => passt(`${n.key} ${n.zitate.join(" ")} ${n.fundstellen.map((f) => f.t).join(" ")}`, q));
  const TYP = { abschnitt: "Lehrbuch", fall: "Fall", problem: "Streitstand", rechtsstand: "Rechtsstand" };
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>Register · alle Rechtsgebiete</Kicker>
          <h1>Normenregister</h1>
          <p className="lead">{werk.zaehler.normen} Einzelnormen aus {normen.daten.gesetze.length} Gesetzen – automatisch aus allen Zitaten des Werks gewonnen. Jede Norm zeigt, wo sie im Lehrbuch, in Streitständen und Fällen behandelt wird.</p>
        </div>
      </div>
      <div className="gesetze-nav">
        {normen.daten.gesetze.map((x) => <button key={x.kurz} className={`tag${x.kurz === g.kurz ? " tag--marke" : ""}`} onClick={() => { setQ(""); nav({ global: "normen", id: x.kurz }); }} title={x.name}>{x.kurz} <span style={{ opacity: .6 }}>{x.normen.length}</span></button>)}
      </div>
      <div className="gesetzgruppe"><h2>{g.kurz}</h2><span>{g.name} · {g.normen.length} Normen</span></div>
      <div className="suchfeld"><IconSuche /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`In ${g.kurz} suchen: Paragraph, Zitat oder Fundstelle …`} aria-label="Normen durchsuchen" /></div>
      <div className="register">
        {liste.map((n) => (
          <div key={n.key} className="register__zeile" id={n.key}>
            <b><button className="btn btn--klein btn--geist" style={{ fontFamily: "var(--mono)", padding: 0 }} onClick={() => setOffen(offen === n.key ? null : n.key)}>{n.art ? "Art." : "§"} {n.nr} {g.kurz}</button><br /><small style={{ fontFamily: "var(--sans)", fontWeight: 400, color: "var(--ink-weich)" }}>{n.anzahl} Fundstelle{n.anzahl === 1 ? "" : "n"}</small></b>
            <div>
              {(offen === n.key ? n.fundstellen : n.fundstellen.slice(0, 4)).map((f) => (
                <button key={f.id} className="register__treffer" onClick={() => { const z = fundstelleRoute(f.typ, f.id); if (z) nav(z); }}><small>{TYP[f.typ]}</small>{f.t}</button>
              ))}
              {n.fundstellen.length > 4 && offen !== n.key && <button className="register__treffer" style={{ color: "var(--marke-text)" }} onClick={() => setOffen(n.key)}>+ {n.fundstellen.length - 4} weitere</button>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
