/* Änderungsprotokoll.

   Eine Lernplattform, die Rechtsstand behauptet, muss zeigen, wann sie was
   geändert hat. Sonst ist „Stand 2026“ eine Behauptung ohne Beleg. Dieses
   Protokoll ist deshalb nicht Marketing, sondern Teil der Rechtsstandsangabe:
   Wer prüfen will, ob eine Änderung eingearbeitet wurde, sieht es hier.

   Jeder Eintrag nennt Datum, Art und – wo es um Inhalte geht – die Zahl der
   betroffenen Einheiten. `art` steuert die Einfärbung:
     inhalt    neue oder geänderte juristische Inhalte
     methode   Änderungen am Lernverfahren
     technik   Darstellung, Bedienung, Datenhaltung
     korrektur Berichtigung eines Fehlers – bewusst eigene Kategorie */

export const PROTOKOLL = [
  {
    datum: "2026-09-14", art: "inhalt",
    titel: "Schaubilder und Fehleranalyse",
    text: "8 begehbare Entscheidungsbäume, 5 Fristenachsen und 3 Anspruchslandkarten. Dazu 14 Verwechslungspaare mit 58 Zuordnungsfällen und eine Fehleranalyse, die benennt, welche Unterscheidung schiefgeht.",
    umfang: "25 Schaubilder, 58 Zuordnungsfälle",
  },
  {
    datum: "2026-09-14", art: "inhalt",
    titel: "Bundesland als Produktebene",
    text: "Alle sechzehn Länder mit Gefahrenabwehr-, Bauordnungs-, Kommunal-, Verfahrens- und Vollstreckungsrecht, Generalklausel und Stand des Widerspruchsverfahrens. Die Erklärungen im Öffentlichen Recht zitieren nach der Wahl die Gesetze des Prüfungslandes.",
    umfang: "16 Länder",
  },
  {
    datum: "2026-09-14", art: "inhalt",
    titel: "Drei Fallklassen",
    text: "88 Microcases (zwei Minuten, ein Problem) und 6 vollständige Examensklausuren mit Bearbeitervermerk, laufender Uhr und Erwartungshorizont über je 100 Punkte. Die bisherigen 249 Fälle bilden die mittlere Klasse.",
    umfang: "88 Microcases, 6 Klausuren",
  },
  {
    datum: "2026-09-14", art: "inhalt",
    titel: "Streitstände im Achtschritt-Modell",
    text: "Die 49 wichtigsten Streitstände von Hand ausgearbeitet: Problemtrigger, Streitfrage, jede Ansicht mit tragenden Argumenten und Gegenargumenten, Rechtsprechung, Entscheidungserheblichkeit, Klausurformulierung, Quelle. Eine automatische Zerlegung der Quelltexte wurde verworfen, weil nur ein bis elf Prozent überhaupt Streitstruktur enthalten.",
    umfang: "49 von 227 Streitständen",
  },
  {
    datum: "2026-09-14", art: "inhalt",
    titel: "Dreistufige Erklärungen",
    text: "Für alle 60 hochrelevanten Kompetenzen beider Examina: 30 Sekunden, 3 bis 5 Minuten, Vertiefung – je mit Beispiel, Gegenbeispiel, kopierbarer Klausurformulierung und den typischen Fehlern samt Begründung. Rund 33.600 Wörter.",
    umfang: "60 Kompetenzen, 33.600 Wörter",
  },
  {
    datum: "2026-09-14", art: "methode",
    titel: "Adaptive Lernsitzung statt Wochenplan",
    text: "Zeitbudget angeben, Plan bekommen: fällige Karten zuerst (gedeckelt), Restzeit dorthin, wo der Nachweis am dünnsten ist. Erledigt wird aus dem Lernstand erkannt, nicht abgehakt.",
  },
  {
    datum: "2026-09-14", art: "methode",
    titel: "Kompetenzmodell statt Prozentbalken",
    text: "103 Kompetenzknoten mit einem Beherrschungsgrad aus vier unabhängigen Nachweisen. Die Zahl der belegten Nachweisarten deckelt den Wert: Wer nur liest, kommt nicht über 42 von 100 hinaus.",
    umfang: "103 Kompetenzen",
  },
  {
    datum: "2026-09-14", art: "methode",
    titel: "FSRS statt SM-2",
    text: "Der Wiederholungsalgorithmus schätzt für jede Karte getrennt Stabilität und Schwierigkeit und legt die Wiederholung vor den Punkt des Vergessens. Vier Bewertungsstufen statt drei; bestehende Kartenstände werden übernommen.",
  },
  {
    datum: "2026-09-14", art: "korrektur",
    titel: "Vertrauensaussagen präzisiert",
    text: "Die Kennzeichnung „Beck-online-validiert“ wurde entfernt. Sie legte eine fremde Qualitätsprüfung nahe, für die es keinen Beleg gibt. An ihre Stelle trat eine Methodikangabe, die sagt, was geprüft wurde und was nicht.",
  },
  {
    datum: "2026-09-13", art: "inhalt",
    titel: "Erstveröffentlichung",
    text: "Import des Quellwerks in 273 Kapitel mit 692 Abschnitten, 227 Streitstände, 249 Fälle, 2.325 Lexikonbegriffe, über 800 Einzelnormen. Dazu handgepflegt: 84 Prüfungsschemata, 71 Quizfragen, 327 Trainer-Normen.",
    umfang: "115.696 Wörter aus dem Quellwerk",
  },
];

export const ART_LABEL = {
  inhalt: { name: "Inhalt", ton: "marke" },
  methode: { name: "Lernverfahren", ton: "lila" },
  technik: { name: "Technik", ton: "gruen" },
  korrektur: { name: "Korrektur", ton: "rot" },
};

export const LETZTE_AENDERUNG = PROTOKOLL[0].datum;
