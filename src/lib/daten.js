import { useEffect, useState } from "react";
import werk from "../data/werk.json";

/* Das Werk (Navigation, Zähler, Anker) wird sofort geladen; alle Inhalte
   kommen als eigene Chunks erst beim Aufruf. */
export { werk };

const lader = {
  band1: () => import("../data/band-1.json"),
  band2: () => import("../data/band-2.json"),
  band3: () => import("../data/band-3.json"),
  band4: () => import("../data/band-4.json"),
  band5: () => import("../data/band-5.json"),
  band6: () => import("../data/band-6.json"),
  probleme: () => import("../data/probleme.json"),
  faelle: () => import("../data/faelle.json"),
  lexikon: () => import("../data/lexikon.json"),
  normen: () => import("../data/normen.json"),
  rechtsstand: () => import("../data/rechtsstand.json"),
  suche: () => import("../data/suche.json"),
  definitionen: () => import("../data/definitionen.json"),
};

const cache = new Map();
export function lade(name) {
  if (!cache.has(name)) cache.set(name, lader[name]().then((m) => m.default));
  return cache.get(name);
}

export function useDaten(name) {
  const [daten, setDaten] = useState(() => (cache.has(name) && cache.get(name).wert) || null);
  const [fehler, setFehler] = useState(null);
  useEffect(() => {
    let aktiv = true;
    lade(name).then((d) => { cache.get(name).wert = d; if (aktiv) setDaten(d); }).catch((e) => aktiv && setFehler(e));
    return () => { aktiv = false; };
  }, [name]);
  return { daten, fehler, laedt: !daten && !fehler };
}

/* Mehrere Datensätze zugleich */
export function useMehrere(namen) {
  const key = namen.join("|");
  const [stand, setStand] = useState(null);
  useEffect(() => {
    let aktiv = true;
    Promise.all(namen.map(lade)).then((liste) => { if (aktiv) setStand(Object.fromEntries(namen.map((n, i) => [n, liste[i]]))); });
    return () => { aktiv = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return stand;
}

/* --------------------------------------------------------- Nachschlagen */

export const GEBIET_NAME = { zivil: "Zivilrecht", oeff: "Öffentliches Recht", straf: "Strafrecht" };
export const GEBIET_KURZ = { zivil: "ZR", oeff: "ÖR", straf: "StR" };
export const STUFE_NAME = { 1: "1. Staatsexamen", 2: "2. Staatsexamen" };
export const STUFE_KURZ = { 1: "Studium · 1. Examen", 2: "Referendariat · 2. Examen" };

export function bandFuer(gebiet, stufe) {
  return werk.baende.find((b) => b.gebiet === gebiet && b.stufe === stufe);
}

const kapitelIndex = new Map();
const abschnittIndex = new Map();
for (const b of werk.baende) {
  for (const k of b.kapitel) {
    kapitelIndex.set(k.id, { ...k, band: b });
    for (const a of k.abschnitte) abschnittIndex.set(a.id, { ...a, kapitel: k, band: b });
  }
}
export const kapitelFinden = (id) => kapitelIndex.get(id) || null;
export const abschnittFinden = (id) => abschnittIndex.get(id) || null;

/* Anker aus dem Quellwerk (pandoc-IDs) auf eine Route abbilden. */
export function ankerRoute(anker) {
  const z = werk.anker[anker];
  if (!z) return null;
  if (z.typ === "kapitel") { const k = kapitelIndex.get(z.id); return k ? { gebiet: k.band.gebiet, stufe: k.band.stufe, ansicht: "lehrbuch", id: k.id } : null; }
  if (z.typ === "abschnitt") { const a = abschnittIndex.get(z.id); return a ? { gebiet: a.band.gebiet, stufe: a.band.stufe, ansicht: "lehrbuch", id: a.kapitel.id, sub: a.id } : null; }
  if (z.typ === "problem") return { ansicht: "streit", id: z.id };
  if (z.typ === "fall") return { ansicht: "faelle", id: z.id };
  return null;
}

/* Route zu einer Fundstelle (Suchtreffer, Normenregister) */
export function fundstelleRoute(typ, id) {
  if (typ === "abschnitt") { const a = abschnittIndex.get(id); return a ? { gebiet: a.band.gebiet, stufe: a.band.stufe, ansicht: "lehrbuch", id: a.kapitel.id, sub: a.id } : null; }
  if (typ === "problem") return { ansicht: "streit", id };
  if (typ === "fall") return { ansicht: "faelle", id };
  if (typ === "rechtsstand") return { global: "rechtsstand", id };
  return null;
}
