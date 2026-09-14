import { useCallback, useEffect, useState } from "react";

/* Alle Schlüssel tragen das Präfix „jc-“, damit Export/Import und Zurücksetzen
   nur die eigenen Daten anfassen. */
export const PRAEFIX = "jc-";

export function laden(schluessel, standard) {
  try {
    const roh = localStorage.getItem(PRAEFIX + schluessel);
    return roh === null ? standard : JSON.parse(roh);
  } catch {
    return standard;
  }
}

export function sichern(schluessel, wert) {
  try {
    localStorage.setItem(PRAEFIX + schluessel, JSON.stringify(wert));
  } catch {
    /* Speicher voll oder gesperrt – dann gilt der Stand nur für diese Sitzung. */
  }
}

/* React-State, der sich selbst in localStorage spiegelt. Änderungen aus
   anderen Tabs werden über das storage-Ereignis übernommen. */
export function useSpeicher(schluessel, standard) {
  const [wert, setWert] = useState(() => laden(schluessel, standard));
  useEffect(() => { sichern(schluessel, wert); }, [schluessel, wert]);
  useEffect(() => {
    const auf = (e) => { if (e.key === PRAEFIX + schluessel && e.newValue !== null) { try { setWert(JSON.parse(e.newValue)); } catch { /* ignorieren */ } } };
    window.addEventListener("storage", auf);
    return () => window.removeEventListener("storage", auf);
  }, [schluessel]);
  const setzen = useCallback((v) => setWert((alt) => (typeof v === "function" ? v(alt) : v)), []);
  return [wert, setzen];
}

/* Gesamten Lernstand als JSON exportieren / importieren. */
export function exportieren() {
  const daten = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PRAEFIX)) { try { daten[k.slice(PRAEFIX.length)] = JSON.parse(localStorage.getItem(k)); } catch { /* überspringen */ } }
  }
  return { app: "juracampus", version: 1, exportiert: new Date().toISOString(), daten };
}

export function importieren(paket) {
  if (!paket || paket.app !== "juracampus" || typeof paket.daten !== "object") throw new Error("Kein gültiger JuraCampus-Export.");
  for (const [k, v] of Object.entries(paket.daten)) sichern(k, v);
}

export function alleLoeschen() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(PRAEFIX)) keys.push(k); }
  keys.forEach((k) => localStorage.removeItem(k));
}

export const heute = () => new Date().toISOString().slice(0, 10);
