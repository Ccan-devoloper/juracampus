import React, { useMemo, useState } from "react";
import { useSpeicher } from "../lib/speicher";
import { microFuer } from "../data/fallklassen";
import { gutschreiben, XP } from "../lib/xp";
import { Kicker, Leer, mischen } from "./Bausteine";
import { IconPfeil, IconShuffle, IconHaken, IconAuge } from "./Icons";

/* Microcase: ein Problem, eine Frage, sofortige Rückmeldung. Er schließt die
   Lücke zwischen Karteikarte (kennt nur Abfrage) und Übungsfall (braucht eine
   halbe Stunde). Bewertet wird selbst – aber erst nach dem Aufdecken, und die
   Frage lautet nicht „wusste ich das?", sondern „hätte ich es in der Klausur
   geschrieben?". Das ist ein deutlich strengerer Maßstab. */

const URTEIL = [
  { w: 1, label: "Daneben", text: "Ergebnis oder Begründung falsch" },
  { w: 2, label: "Teilweise", text: "Ergebnis richtig, Begründung wackelig" },
  { w: 3, label: "Getroffen", text: "Ergebnis und tragender Grund sicher" },
];

export default function Microcases({ gebiet, stufe, nav }) {
  const alle = useMemo(() => microFuer(gebiet, stufe), [gebiet, stufe]);
  const [stand, setStand] = useSpeicher("microcases", {});
  const [seed, setSeed] = useState(() => Date.now());
  const [nurOffen, setNurOffen] = useState(true);
  const [i, setI] = useState(0);
  const [offen, setOffen] = useState(false);

  const runde = useMemo(() => {
    const basis = nurOffen ? alle.filter((m) => !stand[m.id]) : alle;
    return mischen(basis.length ? basis : alle, seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alle, seed, nurOffen]);

  if (!alle.length) return <Leer titel="Für diesen Bereich gibt es noch keine Microcases" text="Die Sammlung wächst Gebiet für Gebiet." />;

  const m = runde[i];
  const geloest = alle.filter((x) => stand[x.id]).length;
  const sicher = alle.filter((x) => stand[x.id]?.w === 3).length;

  const bewerten = (w) => {
    setStand({ ...stand, [m.id]: { w, datum: new Date().toISOString().slice(0, 10) } });
    gutschreiben(w === 3 ? 8 : w === 2 ? 5 : 3, "Microcase gelöst");
    setOffen(false);
    setI(i + 1);
  };

  if (!m) {
    return (
      <div className="panel quiz">
        <div className="mitte">
          <span className="ergebnis-zahl">{geloest}</span>
          <strong>{geloest === alle.length ? "Alle Microcases dieses Bereichs bearbeitet" : "Runde beendet"}</strong>
          <p>{sicher} davon sicher getroffen. Was danebenlag, kommt in der nächsten Runde wieder.</p>
          <div className="knopfreihe" style={{ justifyContent: "center", marginTop: 16 }}>
            <button className="btn" onClick={() => { setSeed(Date.now()); setI(0); setNurOffen(false); }}><IconShuffle /> Neue Runde</button>
            <button className="btn btn--linie" onClick={() => nav({ ansicht: "faelle" })}>Zu den Übungsfällen</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="microkopf">
        <span className="zaehler">{i + 1} von {runde.length} in dieser Runde · {geloest} von {alle.length} insgesamt bearbeitet</span>
        <div className="knopfreihe">
          <button className="btn btn--klein btn--geist" aria-pressed={nurOffen} onClick={() => { setNurOffen(!nurOffen); setSeed(Date.now()); setI(0); setOffen(false); }}>
            {nurOffen ? "Nur neue" : "Alle"}
          </button>
          <button className="btn btn--klein btn--geist" onClick={() => { setOffen(false); setI(i + 1); }}>Überspringen</button>
        </div>
      </div>

      <article className="microcase">
        <div className="microcase__marke">
          <Kicker>Microcase</Kicker>
          <span>{(m.n || []).join(" · ")}</span>
        </div>
        <p className="microcase__sachverhalt">{m.s}</p>
        <h2 className="microcase__frage">{m.f}</h2>

        {!offen ? (
          <>
            <p className="microcase__hinweis">Antworten Sie zuerst für sich – in einem Satz, mit dem tragenden Grund. Erst dann aufdecken.</p>
            <button className="btn btn--gross" onClick={() => setOffen(true)}><IconAuge /> Antwort aufdecken</button>
          </>
        ) : (
          <>
            <div className="microcase__antwort">
              <h3>Antwort</h3>
              <p>{m.a}</p>
              <h3>Warum</h3>
              <p>{m.w}</p>
            </div>
            <div className="microcase__urteil">
              <span>Hätten Sie das in der Klausur so geschrieben?</span>
              <div className="knopfreihe">
                {URTEIL.map((u) => (
                  <button key={u.w} className={`btn btn--klein bewertung bewertung--${u.w}`} onClick={() => bewerten(u.w)} title={u.text}>
                    {u.w === 3 && <IconHaken />} {u.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </article>

      <p className="microcase__fuss">
        Microcases sind bewusst kurz: ein Problem, zwei Minuten, sofortige Rückmeldung. Sie ersetzen keinen Übungsfall –
        sie prüfen, ob der einzelne Punkt sitzt, bevor er im großen Fall gebraucht wird. <button className="linkknopf" onClick={() => nav({ ansicht: "kompetenzen" })}>Zum Kompetenzprofil <IconPfeil /></button>
      </p>
    </>
  );
}
