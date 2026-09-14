import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useRoute, navigiere } from "./lib/router";
import { useSpeicher, laden } from "./lib/speicher";
import { werk, bandFuer, GEBIET_NAME, STUFE_NAME } from "./lib/daten";
import { stand as xpStand, streak, levelFuer } from "./lib/xp";
import { landFinden } from "./data/laender";
import { NormPopover, XpToast, Laden } from "./components/Bausteine";
import {
  IconCockpit, IconBuch, IconSchema, IconStreit, IconFaelle, IconKarten, IconTraining, IconKlausur, IconPlan,
  IconRegister, IconLexikon, IconAktuell, IconSuche, IconPokal, IconSonne, IconMond, IconZurueck, IconPfeil, IconBlitz, IconEinstellungen, IconMehr, IconStart,
} from "./components/Icons";

const Start = lazy(() => import("./components/Start"));
const Cockpit = lazy(() => import("./components/Cockpit"));
const Kompetenzen = lazy(() => import("./components/Kompetenzen"));
const Sitzung = lazy(() => import("./components/Sitzung"));
const Lehrbuch = lazy(() => import("./components/Lehrbuch"));
const Schemata = lazy(() => import("./components/Schemata"));
const Streit = lazy(() => import("./components/Streit"));
const Faelle = lazy(() => import("./components/Faelle"));
const Karten = lazy(() => import("./components/Karten"));
const Training = lazy(() => import("./components/Training"));
const Klausur = lazy(() => import("./components/Klausur"));
const Lernplan = lazy(() => import("./components/Lernplan"));
const Normenregister = lazy(() => import("./components/Normenregister"));
const Lexikon = lazy(() => import("./components/Lexikon"));
const Rechtsstand = lazy(() => import("./components/Rechtsstand"));
const Landesrecht = lazy(() => import("./components/Landesrecht"));
const Suche = lazy(() => import("./components/Suche"));
const Einstellungen = lazy(() => import("./components/Einstellungen"));

const ANSICHTEN = [
  { id: "cockpit", label: "Cockpit", Icon: IconCockpit, gruppe: "" },
  { id: "sitzung", label: "Lernsitzung", Icon: IconStart },
  { id: "kompetenzen", label: "Kompetenzen", Icon: IconPokal },
  { id: "lehrbuch", label: "Lehrbuch", Icon: IconBuch, gruppe: "Lernen" },
  { id: "schemata", label: "Schemata", Icon: IconSchema },
  { id: "streit", label: "Streitstände", Icon: IconStreit },
  { id: "faelle", label: "Fälle", Icon: IconFaelle },
  { id: "karten", label: "Karteikarten", Icon: IconKarten, gruppe: "Üben" },
  { id: "training", label: "Training", Icon: IconTraining },
  { id: "klausur", label: "Klausurmodus", Icon: IconKlausur },
  { id: "plan", label: "Lernplan", Icon: IconPlan },
];

const GLOBAL = [
  { id: "normen", label: "Normenregister", Icon: IconRegister },
  { id: "lexikon", label: "Lexikon", Icon: IconLexikon },
  { id: "rechtsstand", label: "Rechtsstand 2026", Icon: IconAktuell },
  { id: "landesrecht", label: "Landesrecht", Icon: IconRegister },
];

const GEBIETE = [
  { id: "zivil", kuerzel: "ZR", name: "Zivilrecht", status: "BGB · HGB · ZPO" },
  { id: "oeff", kuerzel: "ÖR", name: "Öffentliches Recht", status: "GG · VwGO · Polizei · Bau" },
  { id: "straf", kuerzel: "StR", name: "Strafrecht", status: "StGB · StPO" },
];

const FARBE_TIEF = { zivil: "#0c1b4d", oeff: "#0b4a33", straf: "#3a1708" };

function useXpAnzeige() {
  const [s, setS] = useState(() => xpStand());
  useEffect(() => {
    const auf = () => setS(xpStand());
    window.addEventListener("jc-xp", auf);
    window.addEventListener("storage", auf);
    return () => { window.removeEventListener("jc-xp", auf); window.removeEventListener("storage", auf); };
  }, []);
  return { gesamt: s.gesamt || 0, streak: streak(s), level: levelFuer(s.gesamt || 0) };
}

export default function App() {
  const route = useRoute();
  const [dunkel, setDunkel] = useSpeicher("dunkel", typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [einstellungen] = useSpeicher("einstellungen", { lesegroesse: 17 });
  const gebiet = route.gebiet || (laden("zuletzt", null) || {}).gebiet || "zivil";
  const stufe = route.stufe || (laden("zuletzt", null) || {}).stufe || 1;
  const nav = useCallback((a) => navigiere(route, a), [route]);
  const xp = useXpAnzeige();
  const [suche, setSuche] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = dunkel ? "dark" : "light";
    document.documentElement.dataset.gebiet = gebiet;
    document.documentElement.style.setProperty("--lesegroesse", `${einstellungen.lesegroesse || 17}px`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dunkel ? "#0a101c" : FARBE_TIEF[gebiet]);
  }, [dunkel, gebiet, einstellungen.lesegroesse]);

  /* Beim Routenwechsel nach oben – außer wenn ein Unteranker angesprungen wird. */
  useEffect(() => {
    if (!route.sub) window.scrollTo({ top: 0, behavior: "auto" });
  }, [route.global, route.gebiet, route.stufe, route.ansicht, route.id, route.sub]);

  /* Tastatur: „/“ fokussiert die Suche, Alt+Pfeile blättern in der Historie */
  useEffect(() => {
    const auf = (e) => {
      if (e.key === "/" && !/input|textarea/i.test(document.activeElement?.tagName || "")) { e.preventDefault(); document.getElementById("globale-suche")?.focus(); }
      if (e.altKey && e.key === "ArrowLeft") { e.preventDefault(); window.history.back(); }
      if (e.altKey && e.key === "ArrowRight") { e.preventDefault(); window.history.forward(); }
    };
    window.addEventListener("keydown", auf);
    return () => window.removeEventListener("keydown", auf);
  }, []);

  const band = useMemo(() => bandFuer(gebiet, stufe), [gebiet, stufe]);
  const istStart = route.global === "start";

  const sucheAbsenden = (e) => { e.preventDefault(); if (suche.trim()) nav({ global: "suche", id: suche.trim() }); };

  if (istStart) {
    return (
      <Suspense fallback={<Laden />}>
        <Start nav={nav} dunkel={dunkel} setDunkel={setDunkel} />
      </Suspense>
    );
  }

  const land = landFinden(laden("bundesland", null));
  const ansichtAktiv = route.global || route.ansicht || "cockpit";
  const Ansicht = (() => {
    if (route.global === "normen") return <Normenregister route={route} nav={nav} />;
    if (route.global === "lexikon") return <Lexikon route={route} nav={nav} />;
    if (route.global === "rechtsstand") return <Rechtsstand route={route} nav={nav} />;
    if (route.global === "landesrecht") return <Landesrecht route={route} nav={nav} />;
    if (route.global === "suche") return <Suche route={route} nav={nav} />;
    if (route.global === "einstellungen") return <Einstellungen route={route} nav={nav} dunkel={dunkel} setDunkel={setDunkel} />;
    const p = { route, nav, gebiet, stufe, band };
    switch (route.ansicht) {
      case "sitzung": return <Sitzung {...p} />;
      case "kompetenzen": return <Kompetenzen {...p} />;
      case "lehrbuch": return <Lehrbuch {...p} />;
      case "schemata": return <Schemata {...p} />;
      case "streit": return <Streit {...p} />;
      case "faelle": return <Faelle {...p} />;
      case "karten": return <Karten {...p} />;
      case "training": return <Training {...p} />;
      case "klausur": return <Klausur {...p} />;
      case "plan": return <Lernplan {...p} />;
      default: return <Cockpit {...p} />;
    }
  })();

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => nav({ ansicht: "cockpit" })} aria-label="Zum Cockpit">
          <span className="brand__mark">§</span>
          <span className="brand__text"><strong>JuraCampus</strong><span>{GEBIET_NAME[gebiet]} · {STUFE_NAME[stufe]}</span></span>
        </button>
        <div className="topbar__nav" role="group" aria-label="Verlauf">
          <button type="button" className="iconbtn" onClick={() => window.history.back()} aria-label="Zurück" title="Zurück (Alt + ←)"><IconZurueck /></button>
          <button type="button" className="iconbtn" onClick={() => window.history.forward()} aria-label="Vor" title="Vor (Alt + →)"><IconPfeil /></button>
        </div>
        <span className="topbar__spacer" />
        <form className="search" onSubmit={sucheAbsenden} role="search">
          <IconSuche />
          <input id="globale-suche" type="search" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Norm, Begriff, Fall oder Problem suchen" aria-label="Im Gesamtwerk suchen" />
          <kbd>/</kbd>
        </form>
        <button className="topbar__xp" onClick={() => nav({ ansicht: "cockpit" })} title={`Level ${xp.level.stufe}: ${xp.level.name}`}><IconBlitz /> <b>{xp.gesamt}</b> XP{xp.streak > 0 && <span> · 🔥 {xp.streak}</span>}</button>
        <button className="iconbtn" onClick={() => setDunkel(!dunkel)} aria-label={dunkel ? "Helles Design" : "Dunkles Design"} title={dunkel ? "Helles Design" : "Dunkles Design"}>{dunkel ? <IconSonne /> : <IconMond />}</button>
        <button className="iconbtn" onClick={() => nav({ global: "einstellungen" })} aria-label="Einstellungen" title="Einstellungen"><IconEinstellungen /></button>
      </header>

      <nav className="gebiete" aria-label="Rechtsgebiete">
        {GEBIETE.map((g) => (
          <button key={g.id} className="gebiet" aria-current={g.id === gebiet && !route.global ? "true" : undefined} onClick={() => nav({ gebiet: g.id, stufe, ansicht: "cockpit" })} title={`${g.name} öffnen`}>
            <b>{g.kuerzel}</b>
            <span><strong>{g.name}</strong> <small>{g.status}</small></span>
          </button>
        ))}
      </nav>

      <nav className="stufen" aria-label="Examensstufe und Register">
        {[1, 2].map((s) => (
          <button key={s} className="stufe" aria-current={s === stufe && !route.global ? "true" : undefined} onClick={() => nav({ gebiet, stufe: s, ansicht: route.global ? "cockpit" : (route.ansicht || "cockpit") })}>
            <b>{s}. EX</b> {s === 1 ? "Studium · 1. Staatsexamen" : "Referendariat · 2. Staatsexamen"}
          </button>
        ))}
        <span className="stufen__spacer" />
        <div className="stufen__global">
          {GLOBAL.map((g) => (
            <button key={g.id} className="stufe" aria-current={route.global === g.id ? "true" : undefined} onClick={() => nav({ global: g.id })}>
              <g.Icon /> {g.id === "landesrecht" && land ? land.kurz : g.label}
            </button>
          ))}
        </div>
      </nav>

      {!route.global && (
        <aside className="rail">
          <nav className="rail__nav" aria-label="Bereiche">
            {ANSICHTEN.map((a) => (
              <React.Fragment key={a.id}>
                {a.gruppe && <div className="rail__gruppe">{a.gruppe}</div>}
                <button className="rail__link" aria-current={ansichtAktiv === a.id ? "true" : undefined} onClick={() => nav({ ansicht: a.id })}><a.Icon /> {a.label}</button>
              </React.Fragment>
            ))}
          </nav>
          <RailBox band={band} xp={xp} />
        </aside>
      )}

      <main className={`page${route.global ? " page--global" : ""}`}>
        <Suspense fallback={<Laden />}>{Ansicht}</Suspense>
      </main>

      <nav className="bottomnav" aria-label="Schnellnavigation">
        {["cockpit", "sitzung", "kompetenzen", "karten"].map((id) => ANSICHTEN.find((a) => a.id === id)).map((a) => (
          <button key={a.id} aria-current={ansichtAktiv === a.id ? "true" : undefined} onClick={() => nav({ ansicht: a.id })}><a.Icon />{{ karten: "Karten", kompetenzen: "Können", sitzung: "Sitzung" }[a.id] || a.label}</button>
        ))}
        <MehrMenu nav={nav} aktiv={ansichtAktiv} />
      </nav>

      <NormPopover nav={nav} />
      <XpToast />
    </>
  );
}

function RailBox({ band, xp }) {
  const [gelesen, setGelesen] = useState(() => laden("gelesen", []));
  useEffect(() => {
    const auf = () => setGelesen(laden("gelesen", []));
    window.addEventListener("jc-xp", auf); window.addEventListener("storage", auf);
    return () => { window.removeEventListener("jc-xp", auf); window.removeEventListener("storage", auf); };
  }, []);
  if (!band) return null;
  const alle = band.kapitel.flatMap((k) => k.abschnitte.map((a) => a.id));
  const menge = new Set(gelesen);
  const n = alle.filter((id) => menge.has(id)).length;
  const p = alle.length ? Math.round((n / alle.length) * 100) : 0;
  return (
    <div className="rail__box">
      <b>Lehrbuch · Band {band.nr}</b>
      <strong>{p} %</strong>
      <div className="rail__balken"><span style={{ width: `${p}%` }} /></div>
      <p>{n} von {alle.length} Abschnitten gelesen · Level {xp.level.stufe} {xp.level.name}</p>
    </div>
  );
}

function MehrMenu({ nav, aktiv }) {
  const [offen, setOffen] = useState(false);
  const rest = [...ANSICHTEN.filter((a) => !["cockpit", "sitzung", "kompetenzen", "karten"].includes(a.id)), ...GLOBAL.map((g) => ({ ...g, global: true })), { id: "einstellungen", label: "Einstellungen", Icon: IconEinstellungen, global: true }];
  return (
    <>
      <button aria-current={rest.some((r) => r.id === aktiv) ? "true" : undefined} onClick={() => setOffen(!offen)} aria-expanded={offen}><IconMehr />Mehr</button>
      {offen && (
        <div className="dialog" onClick={() => setOffen(false)}>
          <div className="dialog__box" style={{ alignSelf: "end" }}>
            <h2>Weitere Bereiche</h2>
            <div className="raster raster--2">
              {rest.map((r) => (
                <button key={r.id} className="kachel" onClick={() => { setOffen(false); nav(r.global ? { global: r.id } : { ansicht: r.id }); }}><r.Icon /><strong>{r.label}</strong></button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { ANSICHTEN, GEBIETE, GLOBAL };
export const zaehler = werk.zaehler;
