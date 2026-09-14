import { useCallback, useMemo } from "react";
import { useSpeicher, laden, sichern, heute } from "./speicher";
import { gutschreiben, XP } from "./xp";

/* Gelesene Abschnitte (IDs). */
export function useGelesen() {
  const [liste, setListe] = useSpeicher("gelesen", []);
  const menge = useMemo(() => new Set(liste), [liste]);
  const umschalten = useCallback((id, minuten = 3) => {
    setListe((alt) => {
      if (alt.includes(id)) return alt.filter((x) => x !== id);
      gutschreiben(XP.abschnitt(minuten), "Abschnitt gelesen");
      return [...alt, id];
    });
  }, [setListe]);
  return { liste, menge, umschalten, setListe };
}

/* Bearbeitete Fälle: { [fallId]: { bewertung: 1|2|3, datum, versuche, skizze } } */
export function useFaelleStand() {
  const [stand, setStand] = useSpeicher("faelle", {});
  const bewerten = useCallback((id, bewertung) => {
    setStand((alt) => {
      const vorher = alt[id] || { versuche: 0 };
      if (!vorher.datum) gutschreiben(XP.fall(bewertung), "Fall gelöst");
      return { ...alt, [id]: { ...vorher, bewertung, datum: heute(), versuche: (vorher.versuche || 0) + 1 } };
    });
  }, [setStand]);
  const skizze = useCallback((id, text) => {
    setStand((alt) => ({ ...alt, [id]: { ...(alt[id] || { versuche: 0 }), skizze: text } }));
  }, [setStand]);
  return { stand, bewerten, skizze };
}

/* Karteikarten-Zustand (SM-2) je Karten-ID. */
export function useKartenStand() {
  const [stand, setStand] = useSpeicher("karten", {});
  const setzen = useCallback((id, wert) => setStand((alt) => ({ ...alt, [id]: wert })), [setStand]);
  const entfernen = useCallback((id) => setStand((alt) => { const n = { ...alt }; delete n[id]; return n; }), [setStand]);
  return { stand, setzen, entfernen, setStand };
}

/* Eigene Karteikarten (aus Abschnitten, Streitständen, Fällen „auf den Stapel gelegt“). */
export function useEigeneKarten() {
  const [karten, setKarten] = useSpeicher("eigene-karten", []);
  const hinzufuegen = useCallback((k) => setKarten((alt) => (alt.some((x) => x.id === k.id) ? alt : [...alt, { ...k, erstellt: heute() }])), [setKarten]);
  const entfernen = useCallback((id) => setKarten((alt) => alt.filter((x) => x.id !== id)), [setKarten]);
  const hat = useCallback((id) => karten.some((x) => x.id === id), [karten]);
  return { karten, hinzufuegen, entfernen, hat };
}

export function useNotizen() {
  const [notizen, setNotizen] = useSpeicher("notizen", {});
  const setzen = useCallback((id, text) => setNotizen((alt) => { const n = { ...alt }; if (text && text.trim()) n[id] = text; else delete n[id]; return n; }), [setNotizen]);
  return { notizen, setzen };
}

export function useLesezeichen() {
  const [liste, setListe] = useSpeicher("lesezeichen", []);
  const umschalten = useCallback((eintrag) => setListe((alt) => (alt.some((x) => x.id === eintrag.id) ? alt.filter((x) => x.id !== eintrag.id) : [{ ...eintrag, datum: heute() }, ...alt].slice(0, 200))), [setListe]);
  const hat = useCallback((id) => liste.some((x) => x.id === id), [liste]);
  return { liste, umschalten, hat };
}

/* Zuletzt geöffnete Inhalte (für „Weiterlernen“) */
export function merkeZuletzt(eintrag) {
  const alt = laden("verlauf", []);
  const neu = [{ ...eintrag, zeit: Date.now() }, ...alt.filter((x) => x.id !== eintrag.id)].slice(0, 30);
  sichern("verlauf", neu);
}
export function zuletzt(filter) {
  const liste = laden("verlauf", []);
  return filter ? liste.filter(filter) : liste;
}

export function anteil(erledigt, gesamt) {
  if (!gesamt) return 0;
  return Math.min(100, Math.max(0, Math.round((erledigt / gesamt) * 100)));
}
