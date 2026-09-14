# JuraCampus

Lernplattform für das 1. und 2. juristische Staatsexamen. Grundlage ist das Werk
„Jura Gesamtwissen – Master 1. und 2. Staatsexamen“ (redaktioneller Stand
13. September 2026) in neun Bänden. React 18 + Vite, ein
einziges CSS-Designsystem, keine Konten, kein Backend – der Lernstand liegt im Browser.

## Was drin ist

- **Lehrbuch** in sechs Fachbänden (Zivilrecht, Öffentliches Recht, Strafrecht · jeweils
  1. und 2. Examen): 273 Kapitel, 692 Abschnitte mit Textziffern, Lesezeit,
  Examensrelevanz-Marker, Abhaken, Notizen, Lesezeichen, Schriftgröße, Druck. Jedes Normzitat
  ist anklickbar und zeigt alle Fundstellen im Werk (Norm-Popover).
- **Lernsitzung** („Ich habe jetzt X Minuten“): 10, 25, 45 oder 90 Minuten – daraus baut die
  Seite einen konkreten Plan aus dem Lernstand. Fällige Karten zuerst (gedeckelt, damit nicht
  jeder Abend ein Karteikartenabend wird), die Restzeit dorthin, wo der Nachweis am dünnsten
  ist. Jeder Schritt nennt seinen Grund; erledigt wird aus dem Lernstand erkannt, nicht
  abgehakt.
- **Kompetenzen**: 103 Kompetenzknoten (Stellvertretung, objektive Zurechnung,
  Verfahrensrüge …) statt Prozentbalken. Jeder Knoten bekommt einen Beherrschungsgrad aus
  vier unabhängigen Nachweisen – gelesene Abschnitte (Verstehen), bewertete Fälle (Anwenden),
  Abrufwahrscheinlichkeit der Karten (Behalten), Quizquote je Frage (Kontrolle). Wer nur liest,
  kommt nicht über „Grundlagen“ hinaus: die Zahl der belegten Nachweisarten deckelt den Wert
  (1 → 42, 2 → 66, 3 → 84, 4 → 100). Jeder Knoten nennt den nächsten Schritt als Satz und die
  typische Verwechslung.
- **Prüfungsschemata**: 84 Aufbauschemata beider Examina mit Normen, Unterpunkten und
  Merksatz; Trainer für die Reihenfolge; Verknüpfung mit dem Lehrbuchkapitel.
- **Streitstände**: 227 Einzelprobleme (Band 8) mit hervorgehobener h. M., Gegenansicht,
  Rechtsprechung und Streitpunkt, verwandten Fällen und Problemen.
- **Fälle**: 249 Fälle (Band 9) als Sachverhalt → Kernfragen → eigene Lösungsskizze →
  gesperrte Lösungsskizze → Examenshinweis → Selbstbewertung; Klassiker-Register.
- **Karteikarten** mit FSRS-Wiederholung aus Definitionen, Streitständen, Fällen, Schemata,
  Normen, Rechtsstand 2026 und eigenen Karten (aus jedem Abschnitt „auf den Kartenstapel“).
- **Training**: Wissens-Quiz, Definitionen-Trainer, Normen-Trainer, Schema-Trainer,
  Rechtsstand-Trainer; falsche Antworten setzen die zugehörige Karte auf „morgen fällig“.
- **Klausurmodus**: Fälle unter Zeit mit laufender Uhr, gesperrter Lösung und Auswertung.
- **Lernplan**: verteilt die Kapitel bis zum Examenstermin, hält Wiederholungswochen frei
  und zeigt, ob man im Plan liegt.
- **Normenregister** (über 800 Einzelnormen aus 32 Gesetzen, automatisch aus allen Zitaten),
  **Lexikon** (2.325 Begriffe mit Fundstellen), **Rechtsstand 2026** (Sperrliste veralteter
  Zahlen und Normen, Hinweise im Lehrbuch), **Volltextsuche** über alle Bände.
- **Motivation**: Tagesziel, Streak, Kompetenzstufe, Erfahrungspunkte; Cockpit mit „Heute dran“
  und den fünf Kompetenzen mit dem größten Hebel.
- Dunkelmodus, Mobil-Navigation, Tastaturkürzel (`/` Suche, `Alt+←/→`, Leertaste und `1 2 3`
  in der Kartensitzung), PWA-Manifest, Export/Import des Lernstands.

## Starten

```bash
npm install
npm run import   # quelle/*.html → src/data/*.json (Umlaute, Normzitate, Register, Suchindex)
npm run check    # Konsistenzprüfung der Daten und der handgepflegten Datensätze
npm run dev      # http://localhost:8080
npm run build    # Produktionsbuild nach dist/
```

Der Build läuft mit `base: "./"` unter jeder Domain und unter GitHub Pages. Der Workflow in
`.github/workflows/deploy.yml` deployt bei jedem Push auf den Standardbranch. Damit er greift,
muss GitHub Pages einmalig eingeschaltet werden: Repository → Settings → Pages → Source
„GitHub Actions“. Die Seite liegt danach unter `https://ccan-devoloper.github.io/juracampus/`.

## Projektstruktur

```
quelle/                 Quellwerk (Pandoc-HTML, neun Bände)
tools/
  import.mjs            Importer: Bände → Kapitel/Abschnitte, Streitstände, Fälle, Lexikon,
                        Normenregister, Rechtsstand, Suchindex, Definitionen
  umlaute.mjs           ae/oe/ue → ä/ö/ü, geprüfte ß-Liste (mit Selbsttest)
  normen.mjs            Erkennung von Normzitaten, Einzelnormen, Gesetzeskürzel
  pruefen.mjs           Konsistenzprüfung
  kompetenz-check.mjs   Abdeckung des Kompetenzmodells: welcher Inhalt landet in welchem Knoten
src/
  App.jsx               Shell: Kopfleiste, Rechtsgebiete, Examensstufe, Rail, Routing
  index.css             Designsystem (deutsche Farbtoken, Markenfarbe je Rechtsgebiet)
  lib/                  router, daten (Lazy-Loading), speicher, fortschritt, xp, wiederholung,
                        karten, kompetenz (Zuordnung und Beherrschungsgrad),
                        sitzung (adaptive Tagesplanung)
  components/           Start, Cockpit, Sitzung, Kompetenzen, Lehrbuch, Schemata, Streit, Faelle,
                        Karten, Training,
                        Klausur, Lernplan, Normenregister, Lexikon, Rechtsstand, Suche,
                        Einstellungen, Bausteine, Icons
  data/
    *.json              generiert (nicht von Hand bearbeiten)
    schemata.js         Prüfungsschemata (handgepflegt)
    quiz.js             Multiple-Choice-Fragen
    normenquiz.js       Norm ↔ Inhalt für Trainer und Karten
    relevanz.js         Examensrelevanz je Kapitel (redaktionelle Einschätzung)
    kompetenzen.js      Kompetenzknoten mit Normen, Kapitel-Regex, Stichworten, Verwechslungen
```

## Designsystem

Dieselbe Bildsprache wie Examenscampus: dunkle Kopfleiste, Markenfarbe des Rechtsgebiets
(Zivilrecht Blau, Öffentliches Recht Grün, Strafrecht Rot), runde Karten, Pillen, Space Grotesk
für Überschriften, Inter für Text, IBM Plex Mono für Normen, Source Serif für die Leseansicht.
Alle Farben kommen aus den deutschen CSS-Variablen in `src/index.css` (`--papier`, `--grund`,
`--feld`, `--linie`, `--ink`, `--ink-weich`, `--marke`, `--marke-tief`, `--marke-text`,
`--marke-hell`, `--rot`, `--orange`, `--magenta`, `--gruen`, `--lila`).

## Inhalte ergänzen

- Neues Schema: Eintrag in `src/data/schemata.js` (`id`, `gebiet`, `stufe`, `titel`, `norm`,
  `kapitel`, `normen`, `schritte`, `merke`). Über `normen` entstehen die Querverweise.
- Neue Quizfrage: `src/data/quiz.js` (vier Optionen, `richtig` als Index, `erklaerung`).
- Neue Norm im Trainer: `src/data/normenquiz.js`.
- Neuer Text im Werk: `quelle/jura-gesamtwissen-2026.html` ändern, `npm run import`.

- Neue Kompetenz: Eintrag in `src/data/kompetenzen.js` (`id`, `name`, `kurz`, `relevanz`,
  `normen`, `kapitel` als Regex, `stichworte`, optional `schema` und `verwechslung`).
  `node tools/kompetenz-check.mjs` zeigt sofort, welche Inhalte dadurch zugeordnet werden.

`npm run check` prüft, dass alle Verweise auf existierende Kapitel zeigen, keine
redaktionellen Spuren des Quellabgleichs in den Inhalten stehen und dass jeder Kompetenzknoten
Inhalte findet. Derzeit sind je Gebiet 84–100 % der Abschnitte, 71–100 % der Streitstände,
80–100 % der Fälle und 83–100 % der Quizfragen einem Knoten zugeordnet.

## Rechtsstand

Redaktioneller Stichtag 13. September 2026.
Bei Gesetzesänderungen hat der amtliche Text Vorrang; die Seite „Rechtsstand 2026“ nennt die
kritischen Bereiche (§ 23 GVG, § 511 ZPO, Art. 94 GG, MoPeG, § 477 BGB, §§ 479a ff. BGB u. a.).
Die Examensrelevanz-Marker sind eine redaktionelle Einschätzung.
