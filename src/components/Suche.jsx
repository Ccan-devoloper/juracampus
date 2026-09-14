import React, { useMemo, useState } from "react";
import { useDaten, fundstelleRoute, GEBIET_NAME } from "../lib/daten";
import { SCHEMATA } from "../data/schemata";
import { Kicker, Laden, Leer } from "./Bausteine";
import { IconSuche } from "./Icons";

const TYP = { abschnitt: "Lehrbuch", fall: "Fall", problem: "Streitstand", rechtsstand: "Rechtsstand", schema: "Schema" };

function markiere(text, woerter) {
  if (!woerter.length) return text;
  const re = new RegExp(`(${woerter.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((teil, i) => (re.test(teil) ? <mark key={i}>{teil}</mark> : teil));
}

export default function Suche({ route, nav }) {
  const index = useDaten("suche");
  const [q, setQ] = useState(route.id || "");
  const [typ, setTyp] = useState("alle");
  const [gebiet, setGebiet] = useState("alle");
  const woerter = useMemo(() => q.toLowerCase().split(/\s+/).filter((w) => w.length > 1), [q]);
  const treffer = useMemo(() => {
    if (!index.daten || !woerter.length) return [];
    const eintraege = [...index.daten, ...SCHEMATA.map((s) => ({ id: s.id, typ: "schema", gebiet: s.gebiet, stufe: s.stufe, titel: s.titel, pfad: `${GEBIET_NAME[s.gebiet]} · Schemata`, text: `${s.norm} ${s.kurz} ${s.schritte.map((x) => `${x.t} ${(x.u || []).join(" ")}`).join(" ")} ${s.merke || ""}` }))];
    const aus = [];
    for (const e of eintraege) {
      if (typ !== "alle" && e.typ !== typ) continue;
      if (gebiet !== "alle" && e.gebiet !== gebiet && e.gebiet !== "alle") continue;
      const titel = e.titel.toLowerCase(); const text = e.text.toLowerCase();
      let score = 0;
      for (const w of woerter) { if (titel.includes(w)) score += 6; const n = text.split(w).length - 1; if (!n && !titel.includes(w)) { score = 0; break; } score += Math.min(n, 4); }
      if (score > 0) aus.push({ e, score });
    }
    return aus.sort((a, b) => b.score - a.score).slice(0, 60);
  }, [index.daten, woerter, typ, gebiet]);
  const absenden = (e) => { e.preventDefault(); nav({ global: "suche", id: q.trim() }); };
  return (
    <>
      <div className="pagehead">
        <div>
          <Kicker>Volltextsuche · alle Bände</Kicker>
          <h1>Suche</h1>
          <p className="lead">Durchsucht Lehrbuch, Streitstände, Fälle, Schemata und Rechtsstand. Mehrere Wörter müssen alle vorkommen; Treffer im Titel zählen mehr.</p>
        </div>
        {index.daten && <span className="zaehler">{treffer.length} Treffer</span>}
      </div>
      <form className="suchfeld" onSubmit={absenden}><IconSuche /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="z. B. Erklärungsbewusstsein, § 823, Trierer Weinversteigerung, Hilfsaufrechnung …" aria-label="Suchbegriff" autoFocus /></form>
      <div className="filter">
        {[["alle", "Alles"], ["abschnitt", "Lehrbuch"], ["problem", "Streitstände"], ["fall", "Fälle"], ["schema", "Schemata"], ["rechtsstand", "Rechtsstand"]].map(([id, l]) => <button key={id} aria-pressed={typ === id} onClick={() => setTyp(id)}>{l}</button>)}
        <span style={{ width: 8 }} />
        {[["alle", "Alle Gebiete"], ["zivil", "Zivilrecht"], ["oeff", "Öffentliches Recht"], ["straf", "Strafrecht"]].map(([id, l]) => <button key={id} aria-pressed={gebiet === id} onClick={() => setGebiet(id)}>{l}</button>)}
      </div>
      {!index.daten ? <Laden text="Suchindex wird geladen …" /> : !woerter.length ? <Leer titel="Suchbegriff eingeben" text="Tipp: Normen wie „§ 812“ oder Fallnamen wie „Jungbullen“ funktionieren ebenso wie Fachbegriffe." /> : treffer.length === 0 ? <Leer titel="Keine Treffer" text="Andere Schreibweise oder weniger Wörter probieren." /> : (
        <div className="treffer">
          {treffer.map(({ e }) => {
            const i = e.text.toLowerCase().indexOf(woerter[0]);
            const a = Math.max(0, i - 90); const b = Math.min(e.text.length, (i < 0 ? 0 : i) + 200);
            const ausschnitt = (a > 0 ? "… " : "") + e.text.slice(a, b) + (b < e.text.length ? " …" : "");
            const ziel = e.typ === "schema" ? { gebiet: e.gebiet, stufe: e.stufe, ansicht: "schemata", id: e.id } : fundstelleRoute(e.typ, e.id);
            return (
              <button key={e.typ + e.id} className="treffer__eintrag" onClick={() => ziel && nav(ziel)}>
                <small>{TYP[e.typ]} · {e.pfad}</small>
                <strong>{markiere(e.titel, woerter)}</strong>
                <p>{markiere(ausschnitt, woerter)}</p>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
