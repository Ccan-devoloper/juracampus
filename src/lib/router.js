import { useEffect, useState } from "react";
import { laden, sichern } from "./speicher";

/* Hash-Routing ohne Bibliothek.
   Campus-Routen:  #/zivil/1/lehrbuch/b1-k14/b1-k14-2
   Globale Routen: #/normen/BGB%20%C2%A7%20433 · #/lexikon · #/rechtsstand · #/suche/wort */

export const GEBIETE = ["zivil", "oeff", "straf"];
export const GLOBAL = ["normen", "lexikon", "rechtsstand", "landesrecht", "methodik", "suche", "einstellungen", "start"];

export function parseHash(hash) {
  const teile = (hash || "").replace(/^#\/?/, "").split("/").filter(Boolean).map((t) => { try { return decodeURIComponent(t); } catch { return t; } });
  if (!teile.length) return null;
  if (GEBIETE.includes(teile[0])) {
    const stufe = teile[1] === "2" ? 2 : 1;
    return { gebiet: teile[0], stufe, ansicht: teile[2] || "cockpit", id: teile[3] || null, sub: teile[4] || null };
  }
  if (GLOBAL.includes(teile[0])) return { global: teile[0], id: teile[1] || null, sub: teile[2] || null };
  return null;
}

export function bauHash(r) {
  const enc = (s) => encodeURIComponent(s);
  if (r.global) return `#/${r.global}${r.id ? "/" + enc(r.id) : ""}${r.sub ? "/" + enc(r.sub) : ""}`;
  return `#/${r.gebiet}/${r.stufe}/${r.ansicht || "cockpit"}${r.id ? "/" + enc(r.id) : ""}${r.sub ? "/" + enc(r.sub) : ""}`;
}

function startRoute() {
  const gespeichert = laden("zuletzt", null);
  const aus = parseHash(window.location.hash);
  if (aus) return aus;
  if (gespeichert && gespeichert.gebiet) return { gebiet: gespeichert.gebiet, stufe: gespeichert.stufe || 1, ansicht: "cockpit", id: null, sub: null };
  return { global: "start", id: null, sub: null };
}

export function useRoute() {
  const [route, setRoute] = useState(startRoute);
  useEffect(() => {
    const auf = () => { const r = parseHash(window.location.hash); if (r) setRoute(r); };
    window.addEventListener("hashchange", auf);
    if (!window.location.hash) window.history.replaceState(null, "", bauHash(route));
    return () => window.removeEventListener("hashchange", auf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (route.gebiet) sichern("zuletzt", { gebiet: route.gebiet, stufe: route.stufe });
  }, [route]);
  return route;
}

/* Navigation: relative Änderungen gegenüber der aktuellen Route. */
export function navigiere(route, aenderung) {
  let ziel;
  if (aenderung.global) ziel = { global: aenderung.global, id: aenderung.id || null, sub: aenderung.sub || null };
  else {
    const basis = route.gebiet ? route : (laden("zuletzt", null) || { gebiet: "zivil", stufe: 1 });
    ziel = { gebiet: aenderung.gebiet || basis.gebiet, stufe: aenderung.stufe || basis.stufe || 1, ansicht: aenderung.ansicht || "cockpit", id: aenderung.id || null, sub: aenderung.sub || null };
  }
  const hash = bauHash(ziel);
  if (window.location.hash === hash) window.dispatchEvent(new HashChangeEvent("hashchange"));
  else window.location.hash = hash;
}
