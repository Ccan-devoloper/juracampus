import React from "react";
import { streitbildFuer } from "../data/streitbilder";
import { IconStreit, IconHaken, IconAuge, IconKlausur, IconStern } from "./Icons";

/* Der Streitstand als Ablauf, nicht als Absatz. Die beiden Ansichten stehen
   nebeneinander, damit man sie vergleichen kann statt sie nacheinander zu
   lesen – und die Entscheidungserheblichkeit steht vor der Formulierung,
   weil sie darüber entscheidet, ob überhaupt formuliert wird. */
export default function Streitbild({ id }) {
  const s = streitbildFuer(id);
  if (!s) return null;
  return (
    <section className="streitbild">
      <ol className="streitbild__schritte">
        <li className="sb sb--trigger">
          <span className="sb__no">1</span>
          <div>
            <h4><IconAuge /> Problemtrigger</h4>
            <p>{s.trigger}</p>
          </div>
        </li>
        <li className="sb sb--frage">
          <span className="sb__no">2</span>
          <div>
            <h4><IconStreit /> Die Streitfrage</h4>
            <p className="sb__frage">{s.frage}</p>
          </div>
        </li>
      </ol>

      <div className="ansichten">
        {s.ansichten.map((a, i) => (
          <article key={i} className={`ansicht${s.herrschend === i ? " ansicht--hm" : ""}`}>
            <header>
              <span className="ansicht__nr">{i + 3}</span>
              <div>
                <h4>{a.name}</h4>
                {s.herrschend === i && <span className="tag tag--gruen">herrschend</span>}
              </div>
            </header>
            <p className="ansicht__kurz">{a.kurz}</p>
            <div className="argumente">
              <div>
                <h5>Dafür spricht</h5>
                <ul>{a.pro.map((x, k) => <li key={k}>{x}</li>)}</ul>
              </div>
              <div>
                <h5>Dagegen spricht</h5>
                <ul className="contra">{a.contra.map((x, k) => <li key={k}>{x}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ol className="streitbild__schritte" start={s.ansichten.length + 3}>
        {s.rspr && (
          <li className="sb sb--rspr">
            <span className="sb__no">{s.ansichten.length + 3}</span>
            <div>
              <h4><IconHaken /> Rechtsprechung</h4>
              <p>{s.rspr}</p>
            </div>
          </li>
        )}
        <li className="sb sb--erheblich">
          <span className="sb__no">{s.ansichten.length + (s.rspr ? 4 : 3)}</span>
          <div>
            <h4><IconStern /> Entscheidungserheblichkeit</h4>
            <p>{s.erheblich}</p>
          </div>
        </li>
        <li className="sb sb--formulierung">
          <span className="sb__no">{s.ansichten.length + (s.rspr ? 5 : 4)}</span>
          <div>
            <h4><IconKlausur /> Klausurformulierung</h4>
            <blockquote>{s.formulierung}</blockquote>
            {s.quelle && <p className="sb__quelle">{s.quelle}</p>}
          </div>
        </li>
      </ol>
    </section>
  );
}
