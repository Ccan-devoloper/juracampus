/* Juristische Visualisierungen.

   Nicht jede Grafik hilft. Ein Balkendiagramm über Lernfortschritt zeigt
   nichts, was ein Satz nicht besser sagen würde. Drei Darstellungsformen
   tragen dagegen echte juristische Information, weil sie eine Struktur
   sichtbar machen, die im Fließtext verborgen bleibt:

     Entscheidungsbaum   Wo eine Klausur sich verzweigt, ist die Reihenfolge
                         der Fragen entscheidend – und genau die geht im Text
                         unter. „Erst fragen, ob weggenommen oder verfügt
                         wurde“ ist als Baum in fünf Sekunden erfasst.
     Zeitachse           Fristen sind Zahlen mit Reihenfolge. Nebeneinander
                         gestellt zeigen sie sofort, welche zuerst abläuft.
     Anspruchslandkarte  Die Prüfungsreihenfolge der Anspruchsgrundlagen ist
                         kein Ritual, sondern ein Sperrsystem: Ein Vertrag
                         sperrt § 985, das EBV sperrt Delikt und Bereicherung.

   Jeder Baum endet in einem Blatt mit Norm und einem Satz, warum es dort
   endet – sonst wäre es ein Schaubild ohne Aussage. */

export const BAEUME = [
  {
    id: "b-se", gebiet: "zivil", stufe: 1, k: "zivil1-leistungsstoerung",
    titel: "Schadensersatz statt oder neben der Leistung?",
    einstieg: "Der Gläubiger hat einen Schaden aus einer Pflichtverletzung und will ihn ersetzt haben.",
    wurzel: {
      f: "Wäre der Schaden durch eine ordnungsgemäße Nacherfüllung noch entfallen?",
      ja: {
        f: "Ist die Leistung noch möglich?",
        ja: { e: "Schadensersatz statt der Leistung", n: "§§ 280 I, III, 281 BGB", h: "Fristsetzung erforderlich – oder Entbehrlichkeit nach § 281 II BGB darlegen." },
        nein: { e: "Schadensersatz statt der Leistung bei Unmöglichkeit", n: "§§ 280 I, III, 283 BGB (nachträglich) oder § 311a II BGB (anfänglich)", h: "Keine Fristsetzung – sie wäre sinnlos. Bei § 311a II BGB knüpft das Vertretenmüssen an die Kenntnis bei Vertragsschluss an." },
      },
      nein: {
        f: "Geht es um den Schaden durch die Verzögerung als solche?",
        ja: { e: "Verzögerungsschaden", n: "§§ 280 I, II, 286 BGB", h: "Mahnung oder deren Entbehrlichkeit nach § 286 II BGB ist zusätzlich zu prüfen." },
        nein: { e: "Schadensersatz neben der Leistung", n: "§ 280 I BGB", h: "Keine Fristsetzung. Typisch: Mangelfolgeschäden, die endgültig eingetreten sind." },
      },
    },
  },
  {
    id: "b-raub", gebiet: "straf", stufe: 1, k: "straf1-raub",
    titel: "Raub, räuberischer Diebstahl oder räuberische Erpressung?",
    einstieg: "Der Täter setzt Nötigungsmittel ein und erlangt einen Vermögensvorteil.",
    wurzel: {
      f: "Wurde das Nötigungsmittel eingesetzt, um die Sache wegzunehmen (Finalzusammenhang)?",
      ja: {
        f: "Bestand Zueignungsabsicht hinsichtlich einer fremden beweglichen Sache?",
        ja: { e: "Raub", n: "§ 249 I StGB", h: "Qualifikationen des § 250 StGB prüfen: Beisichführen (Abs. 1) oder Verwenden (Abs. 2)." },
        nein: { e: "Räuberische Erpressung", n: "§§ 253, 255 StGB", h: "Ohne Zueignungsabsicht scheidet § 249 StGB aus; die Bereicherungsabsicht des § 253 StGB genügt." },
      },
      nein: {
        f: "War der Diebstahl bereits vollendet und diente die Gewalt der Beutesicherung?",
        ja: { e: "Räuberischer Diebstahl", n: "§ 252 StGB", h: "Erforderlich sind Betreffen auf frischer Tat und Beutesicherungsabsicht. Strafe wie beim Raub." },
        nein: { e: "Tatmehrheit aus Diebstahl und Nötigungsdelikt", n: "§§ 242, 223 ff. StGB, § 53 StGB", h: "Ohne Finalzusammenhang und ohne Beutesicherungsabsicht bleiben zwei selbständige Taten." },
      },
    },
  },
  {
    id: "b-eil", gebiet: "oeff", stufe: 1, k: "oeff1-eilrechtsschutz",
    titel: "§ 80 V oder § 123 VwGO?",
    einstieg: "Der Bürger braucht Rechtsschutz, bevor über die Hauptsache entschieden ist.",
    wurzel: {
      f: "Wäre in der Hauptsache die Anfechtungsklage statthaft, richtet sich der Angriff also gegen einen belastenden Verwaltungsakt?",
      ja: {
        f: "Beruht die sofortige Vollziehbarkeit auf einer behördlichen Anordnung nach § 80 II 1 Nr. 4 VwGO?",
        ja: { e: "Antrag auf Wiederherstellung der aufschiebenden Wirkung", n: "§ 80 V 1 Alt. 2 VwGO", h: "Zuerst § 80 III VwGO prüfen: Eine formelhafte Begründung trägt die Anordnung nicht." },
        nein: { e: "Antrag auf Anordnung der aufschiebenden Wirkung", n: "§ 80 V 1 Alt. 1 VwGO", h: "Einschlägig bei gesetzlichem Sofortvollzug, § 80 II 1 Nr. 1 bis 3a VwGO – etwa § 212a BauGB." },
      },
      nein: {
        f: "Soll ein bestehender Zustand gesichert oder ein neuer vorläufig geschaffen werden?",
        ja: { e: "Sicherungsanordnung", n: "§ 123 I 1 VwGO", h: "Anordnungsanspruch und Anordnungsgrund sind glaubhaft zu machen, § 920 II ZPO." },
        nein: { e: "Regelungsanordnung", n: "§ 123 I 2 VwGO", h: "Das Verbot der Vorwegnahme der Hauptsache ist zu beachten – Ausnahme nur bei schweren, unzumutbaren Nachteilen." },
      },
    },
  },
  {
    id: "b-diebstahl-betrug", gebiet: "straf", stufe: 1, k: "straf1-betrug",
    titel: "Diebstahl oder Betrug?",
    einstieg: "Der Täter erhält eine Sache nach einer Täuschung.",
    wurzel: {
      f: "Hat der Getäuschte den Gewahrsam freiwillig und mit dem Bewusstsein aufgegeben, ihn endgültig zu übertragen?",
      ja: {
        f: "Ist dadurch unmittelbar eine Vermögensminderung eingetreten?",
        ja: { e: "Betrug", n: "§ 263 I StGB", h: "Stoffgleichheit prüfen: Der erstrebte Vorteil muss die Kehrseite des Schadens sein." },
        nein: { e: "Versuchter Betrug", n: "§§ 263, 22, 23 StGB", h: "Ohne Schaden fehlt die Vollendung; bei Gesamtsaldierung ohne Minus bleibt nur der Versuch." },
      },
      nein: {
        f: "Wurde der Gewahrsam gegen den Willen des Inhabers gebrochen?",
        ja: { e: "Diebstahl (Trickdiebstahl)", n: "§ 242 I StGB", h: "Die Täuschung ändert nichts: Wer nur zur Ansicht aushändigt, verfügt nicht." },
        nein: { e: "Unterschlagung", n: "§ 246 I StGB", h: "Keine Wegnahme, aber Zueignung einer fremden beweglichen Sache – subsidiär gegenüber § 242 StGB." },
      },
    },
  },
  {
    id: "b-985", gebiet: "zivil", stufe: 1, k: "zivil1-ebv",
    titel: "Welche Ansprüche stehen dem Eigentümer zu?",
    einstieg: "Jemand hat eine fremde Sache in Besitz.",
    wurzel: {
      f: "Hat der Besitzer ein Recht zum Besitz, § 986 BGB?",
      ja: {
        f: "Hat er dieses Recht überschritten?",
        ja: { e: "Fremdbesitzerexzess", n: "§§ 823 ff. BGB, §§ 987 ff. BGB analog", h: "Für die Überschreitung entfällt der Schutz des § 993 I Hs. 2 BGB – insoweit haftet er deliktisch." },
        nein: { e: "Keine Ansprüche aus dem EBV", n: "§ 986 BGB", h: "Ohne Vindikationslage gelten die allgemeinen Regeln: Vertrag, Delikt, Bereicherung." },
      },
      nein: {
        f: "War der Besitzer bei Besitzerwerb bösgläubig oder ist er verklagt?",
        ja: { e: "Volle Haftung des bösgläubigen Besitzers", n: "§§ 987, 989, 990 BGB", h: "Nutzungsherausgabe und Schadensersatz; bei deliktischem Besitz zusätzlich § 992 BGB." },
        nein: { e: "Nur Herausgabe, keine Nutzungen", n: "§ 985 BGB, § 993 I Hs. 2 BGB", h: "Der redliche unverklagte Besitzer ist privilegiert – Delikt und Bereicherung sind gesperrt." },
      },
    },
  },
  {
    id: "b-kondiktion", gebiet: "zivil", stufe: 1, k: "zivil1-bereicherungsrecht",
    titel: "Welche Kondiktion ist einschlägig?",
    einstieg: "Jemand hat etwas erlangt, was ihm nicht zusteht.",
    wurzel: {
      f: "Wurde es durch eine bewusste und zweckgerichtete Mehrung fremden Vermögens erlangt – also durch Leistung?",
      ja: {
        f: "Fehlte der Rechtsgrund von Anfang an?",
        ja: { e: "Leistungskondiktion", n: "§ 812 I 1 Alt. 1 BGB", h: "Kondiziert wird ausschließlich im eigenen Leistungsverhältnis – auch im Dreipersonenverhältnis." },
        nein: { e: "condictio ob causam finitam", n: "§ 812 I 2 Alt. 1 BGB", h: "Der Rechtsgrund ist später weggefallen; bei Zweckverfehlung § 812 I 2 Alt. 2 BGB." },
      },
      nein: {
        f: "Hat der Empfänger das Erlangte durch Leistung eines Dritten erhalten?",
        ja: { e: "Keine Kondiktion – Subsidiarität", n: "§ 812 I 1 Alt. 2 BGB (gesperrt)", h: "Der Berechtigte ist auf § 816 I BGB gegen den Verfügenden verwiesen; Ausnahme § 816 I 2 BGB bei Unentgeltlichkeit." },
        nein: { e: "Eingriffskondiktion", n: "§ 812 I 1 Alt. 2 BGB", h: "Eingriff in den Zuweisungsgehalt eines fremden Rechts; daneben Rückgriffs- und Verwendungskondiktion." },
      },
    },
  },
  {
    id: "b-va", gebiet: "oeff", stufe: 1, k: "oeff1-verwaltungsakt",
    titel: "Liegt ein Verwaltungsakt vor?",
    einstieg: "Eine Behörde handelt, und es ist zu klären, welche Klageart statthaft ist.",
    wurzel: {
      f: "Ist die Maßnahme auf eine unmittelbare Rechtsfolge gerichtet – enthält sie also eine Regelung?",
      ja: {
        f: "Betrifft sie einen konkreten Einzelfall oder einen konkreten Sachverhalt?",
        ja: { e: "Verwaltungsakt", n: "§ 35 S. 1 VwVfG", h: "Statthaft ist die Anfechtungs- oder Verpflichtungsklage; § 80 VwGO gilt." },
        nein: { e: "Rechtsnorm", n: "Satzung, Rechtsverordnung", h: "Statthaft ist der Normenkontrollantrag nach § 47 VwGO oder die Feststellungsklage." },
      },
      nein: {
        f: "Wirkt die Maßnahme nach außen gegenüber einem Rechtssubjekt?",
        ja: { e: "Realakt", n: "kein Verwaltungsakt", h: "Statthaft sind allgemeine Leistungs- oder Feststellungsklage; im Eilverfahren § 123 VwGO." },
        nein: { e: "Verwaltungsinternes Handeln", n: "kein Verwaltungsakt", h: "Weisungen und Mitwirkungsakte haben keine unmittelbare Außenwirkung." },
      },
    },
  },
  {
    id: "b-taeterschaft", gebiet: "straf", stufe: 1, k: "straf1-taeterschaft",
    titel: "Täter oder Teilnehmer?",
    einstieg: "Mehrere sind an einer Tat beteiligt.",
    wurzel: {
      f: "Hat der Beteiligte den Tatbestand eigenhändig oder über einen Tatmittler verwirklicht?",
      ja: {
        f: "Handelte der Vordermann als Werkzeug, also ohne volle Verantwortung oder unter Irrtumsherrschaft?",
        ja: { e: "Mittelbare Täterschaft", n: "§ 25 I Alt. 2 StGB", h: "Versuchsbeginn nach der Gesamtlösung mit dem Entlassen des Tatmittlers." },
        nein: { e: "Unmittelbare Täterschaft", n: "§ 25 I Alt. 1 StGB", h: "Eigenhändige Verwirklichung aller Tatbestandsmerkmale." },
      },
      nein: {
        f: "Bestand ein gemeinsamer Tatplan mit einem Beitrag von Gewicht im Ausführungsstadium?",
        ja: { e: "Mittäterschaft", n: "§ 25 II StGB", h: "Wechselseitige Zurechnung – aber nicht des Exzesses eines Mittäters." },
        nein: { e: "Anstiftung oder Beihilfe", n: "§ 26 StGB oder § 27 StGB", h: "Hat er den Tatentschluss hervorgerufen: Anstiftung. Hat er nur gefördert: Beihilfe mit zwingender Milderung." },
      },
    },
  },
];

export const ZEITACHSEN = [
  {
    id: "z-anfechtung", gebiet: "zivil", stufe: 1, k: "zivil1-anfechtung",
    titel: "Fristen der Anfechtung",
    einstieg: "Zwei Fristen, zwei völlig verschiedene Maßstäbe.",
    punkte: [
      { t: "Kenntnis", label: "Kenntnis des Anfechtungsgrundes", text: "Der Lauf beginnt mit positiver Kenntnis – nicht mit Kennenmüssen.", ton: "start" },
      { t: "unverzüglich", label: "§§ 119, 120 BGB", text: "Ohne schuldhaftes Zögern, § 121 I BGB. In der Praxis ein bis zwei Wochen; Zeit für Rechtsrat ist zuzugestehen.", ton: "eng" },
      { t: "1 Jahr", label: "§ 123 BGB", text: "Ein Jahr ab Entdeckung der Täuschung oder Ende der Zwangslage, § 124 I, II BGB.", ton: "weit" },
      { t: "10 Jahre", label: "Absolute Grenze", text: "Nach zehn Jahren seit Abgabe der Erklärung ist die Anfechtung ausgeschlossen, § 121 II, § 124 III BGB.", ton: "ende" },
    ],
  },
  {
    id: "z-verjaehrung", gebiet: "zivil", stufe: 1, k: "zivil1-verjaehrung",
    titel: "Verjährungsfristen im Überblick",
    einstieg: "Die Regelverjährung ist kenntnisabhängig, die Sonderfristen nicht.",
    punkte: [
      { t: "2 Jahre", label: "Kaufvertrag, § 438 I Nr. 3 BGB", text: "Ab Ablieferung der Sache. Bei Bauwerken fünf Jahre, § 438 I Nr. 2 BGB.", ton: "eng" },
      { t: "3 Jahre", label: "Regelverjährung, §§ 195, 199 BGB", text: "Ab Schluss des Jahres, in dem der Anspruch entstand und der Gläubiger Kenntnis erlangte.", ton: "start" },
      { t: "10 Jahre", label: "Höchstfrist ohne Kenntnis", text: "Kenntnisunabhängig ab Entstehung, § 199 III Nr. 1, IV BGB.", ton: "weit" },
      { t: "30 Jahre", label: "Herausgabe und Titel", text: "Herausgabeansprüche aus Eigentum, § 197 I Nr. 2 BGB, und titulierte Ansprüche, § 197 I Nr. 3 BGB.", ton: "ende" },
    ],
  },
  {
    id: "z-vwgo", gebiet: "oeff", stufe: 1, k: "oeff1-anfechtungsklage",
    titel: "Fristen im Verwaltungsprozess",
    einstieg: "Alle laufen ab Bekanntgabe oder Zustellung – wenn die Rechtsbehelfsbelehrung stimmt.",
    punkte: [
      { t: "1 Monat", label: "Widerspruch, § 70 I VwGO", text: "Ab Bekanntgabe des Verwaltungsakts, dort wo das Vorverfahren stattfindet.", ton: "start" },
      { t: "1 Monat", label: "Klage, § 74 I VwGO", text: "Ab Zustellung des Widerspruchsbescheids – oder ab Bekanntgabe, wo kein Vorverfahren stattfindet.", ton: "eng" },
      { t: "1 Jahr", label: "Fehlerhafte Belehrung, § 58 II VwGO", text: "Fehlt die Rechtsbehelfsbelehrung oder ist sie unrichtig, gilt die Jahresfrist.", ton: "weit" },
      { t: "2 Wochen", label: "Wiedereinsetzung, § 60 II VwGO", text: "Nach Wegfall des Hindernisses, mit Nachholung der versäumten Handlung.", ton: "ende" },
    ],
  },
  {
    id: "z-revision", gebiet: "straf", stufe: 2, k: "straf2-revision-zulaessigkeit",
    titel: "Fristen der Revision",
    einstieg: "Zwei Fristen, die nacheinander laufen – und ein Formzwang, der nur für die zweite gilt.",
    punkte: [
      { t: "1 Woche", label: "Einlegung, § 341 I StPO", text: "Ab Verkündung des Urteils, bei Abwesenheit ab Zustellung. Der Angeklagte kann selbst einlegen.", ton: "start" },
      { t: "1 Monat", label: "Begründung, § 345 I StPO", text: "Ab Ablauf der Einlegungsfrist oder ab Zustellung des Urteils, je nachdem was später liegt.", ton: "eng" },
      { t: "Formzwang", label: "§ 345 II StPO", text: "Die Begründung braucht eine Verteidigerschrift oder das Protokoll der Geschäftsstelle – der Angeklagte kann sie nicht selbst verfassen.", ton: "weit" },
      { t: "1 Woche", label: "Wiedereinsetzung, § 45 I StPO", text: "Nach Wegfall des Hindernisses; das Verteidigerverschulden wird dem Angeklagten nicht zugerechnet.", ton: "ende" },
    ],
  },
  {
    id: "z-zpo", gebiet: "zivil", stufe: 2, k: "zivil2-versaeumnis",
    titel: "Fristen im Zivilprozess",
    einstieg: "Vier Fristen, die in der Assessorklausur regelmäßig zusammentreffen.",
    punkte: [
      { t: "2 Wochen", label: "Verteidigungsanzeige, § 276 I 1 ZPO", text: "Im schriftlichen Vorverfahren; danach droht das Versäumnisurteil ohne mündliche Verhandlung.", ton: "start" },
      { t: "2 Wochen", label: "Einspruch, § 339 I ZPO", text: "Ab Zustellung des Versäumnisurteils. Der Einspruch versetzt in die Lage vor der Säumnis zurück." , ton: "eng" },
      { t: "1 Monat", label: "Berufung, § 517 ZPO", text: "Ab Zustellung des Urteils, spätestens fünf Monate nach Verkündung." , ton: "weit" },
      { t: "2 Monate", label: "Berufungsbegründung, § 520 II ZPO", text: "Ab Zustellung des Urteils; verlängerbar nach § 520 II 2, 3 ZPO." , ton: "ende" },
    ],
  },
];

export const LANDKARTEN = [
  {
    id: "lk-zivil", gebiet: "zivil", stufe: 1, k: "zivil1-anspruchsaufbau",
    titel: "Anspruchslandkarte Zivilrecht",
    einstieg: "Die Reihenfolge ist kein Ritual, sondern ein Sperrsystem: Was oben steht, kann darunterliegende Ansprüche ausschließen.",
    gruppen: [
      { name: "Vertraglich", eintraege: [
        { n: "§ 433 I, II BGB", t: "Kaufvertrag – Übereignung und Kaufpreis" },
        { n: "§§ 437, 434 BGB", t: "Mängelrechte ab Gefahrübergang" },
        { n: "§§ 280 ff. BGB", t: "Schadensersatz wegen Pflichtverletzung" },
        { n: "§§ 346 ff. BGB", t: "Rückgewähr nach Rücktritt" },
      ], sperrt: "Ein wirksamer Vertrag gibt ein Recht zum Besitz und sperrt damit § 985 BGB über § 986 BGB." },
      { name: "Vertragsähnlich", eintraege: [
        { n: "§§ 280 I, 311 II, 241 II BGB", t: "culpa in contrahendo" },
        { n: "§§ 677, 683, 670 BGB", t: "Berechtigte Geschäftsführung ohne Auftrag" },
        { n: "§§ 677, 678, 687 II BGB", t: "Unberechtigte und angemaßte Eigengeschäftsführung" },
      ], sperrt: "Ab Gefahrübergang verdrängt das Kaufrecht die culpa in contrahendo, soweit es um fahrlässig falsche Beschaffenheitsangaben geht." },
      { name: "Dinglich", eintraege: [
        { n: "§ 985 BGB", t: "Herausgabe vom Besitzer ohne Recht zum Besitz" },
        { n: "§§ 987 ff. BGB", t: "Nutzungen, Schadensersatz, Verwendungen" },
        { n: "§ 1004 BGB", t: "Beseitigung und Unterlassung" },
        { n: "§ 812 I 1 Alt. 2 BGB", t: "Eingriffskondiktion – aber subsidiär" },
      ], sperrt: "Das Eigentümer-Besitzer-Verhältnis sperrt nach § 993 I Hs. 2 BGB Delikts- und Bereicherungsrecht." },
      { name: "Deliktisch", eintraege: [
        { n: "§ 823 I BGB", t: "Verletzung absoluter Rechte" },
        { n: "§ 823 II BGB", t: "Verstoß gegen ein Schutzgesetz – auch reine Vermögensschäden" },
        { n: "§ 826 BGB", t: "Vorsätzliche sittenwidrige Schädigung" },
        { n: "§ 831 BGB", t: "Haftung für Verrichtungsgehilfen, mit Exkulpation" },
      ], sperrt: "Bei laufender Vindikationslage gesperrt; ebenso bei Weiterfresserschäden nur unter den Voraussetzungen der Stoffgleichheit." },
      { name: "Bereicherungsrechtlich", eintraege: [
        { n: "§ 812 I 1 Alt. 1 BGB", t: "Leistungskondiktion" },
        { n: "§ 816 I 1 BGB", t: "Verfügung eines Nichtberechtigten" },
        { n: "§ 951 I BGB", t: "Ausgleich bei gesetzlichem Eigentumsverlust" },
      ], sperrt: "Immer zuletzt: Das Bereicherungsrecht korrigiert, was nach allen anderen Regeln übrig bleibt." },
    ],
  },
  {
    id: "lk-oeff", gebiet: "oeff", stufe: 1, k: "oeff1-oeff-methodik",
    titel: "Klagearten im Verwaltungsprozess",
    einstieg: "Die Verfahrensart folgt dem Begehren – und sie bestimmt alles Weitere.",
    gruppen: [
      { name: "Gegen einen Verwaltungsakt", eintraege: [
        { n: "§ 42 I Alt. 1 VwGO", t: "Anfechtungsklage – Aufhebung eines belastenden Verwaltungsakts" },
        { n: "§ 113 I 4 VwGO", t: "Fortsetzungsfeststellungsklage nach Erledigung" },
        { n: "§ 80 V VwGO", t: "Eilrechtsschutz gegen die Vollziehbarkeit" },
      ], sperrt: "Solange ein Verwaltungsakt vorliegt, sind allgemeine Leistungs- und Feststellungsklage gesperrt." },
      { name: "Auf einen Verwaltungsakt", eintraege: [
        { n: "§ 42 I Alt. 2 VwGO", t: "Verpflichtungsklage – Versagungsgegen- oder Untätigkeitsklage" },
        { n: "§ 113 V VwGO", t: "Verpflichtungs- oder Bescheidungsurteil je nach Spruchreife" },
        { n: "§ 123 VwGO", t: "Einstweilige Anordnung, weil § 80 V hier nicht greift" },
      ], sperrt: "§ 80 V VwGO hilft nicht – die Ablehnung hat keinen vollziehbaren Inhalt." },
      { name: "Sonstiges Handeln", eintraege: [
        { n: "§ 43 VwGO", t: "Feststellungsklage, subsidiär nach § 43 II VwGO" },
        { n: "allgemeine Leistungsklage", t: "Auf Realakt, Unterlassen, Geldleistung ohne Verwaltungsakt" },
        { n: "§ 47 VwGO", t: "Normenkontrolle gegen Satzungen und Rechtsverordnungen" },
      ], sperrt: "Die Feststellungsklage tritt hinter Gestaltungs- und Leistungsklage zurück, § 43 II 1 VwGO." },
    ],
  },
  {
    id: "lk-straf", gebiet: "straf", stufe: 1, k: "straf1-deliktsaufbau",
    titel: "Prüfungsreihenfolge im Strafrecht",
    einstieg: "Tatkomplexe vor Beteiligten, Beteiligte vor Delikten, schwerere vor leichteren.",
    gruppen: [
      { name: "1. Tatbestand", eintraege: [
        { n: "objektiv", t: "Handlung, Erfolg, Kausalität, objektive Zurechnung, Tätermerkmale" },
        { n: "subjektiv", t: "Vorsatz nach § 16 I StGB, besondere Absichten" },
      ], sperrt: "Der subjektive Tatbestand wird nie vor dem objektiven geprüft – der Vorsatz braucht einen Bezugspunkt." },
      { name: "2. Rechtswidrigkeit", eintraege: [
        { n: "§ 32 StGB", t: "Notwehr – keine Güterabwägung, Korrektur nur über die Gebotenheit" },
        { n: "§ 34 StGB", t: "Rechtfertigender Notstand – volle Interessenabwägung" },
        { n: "§§ 228, 229, 904 BGB", t: "Defensiv- und Aggressivnotstand, Selbsthilfe" },
        { n: "Einwilligung", t: "Dispositionsbefugnis, Einwilligungsfähigkeit, Grenze § 228 StGB" },
      ], sperrt: "Durch die Tatbestandsverwirklichung indiziert – nur prüfen, wenn der Sachverhalt Anlass gibt." },
      { name: "3. Schuld", eintraege: [
        { n: "§§ 19, 20, 21 StGB", t: "Schuldfähigkeit" },
        { n: "§ 17 StGB", t: "Verbotsirrtum – Unrechtsbewusstsein" },
        { n: "§ 35 StGB", t: "Entschuldigender Notstand" },
        { n: "§ 33 StGB", t: "Notwehrexzess aus Verwirrung, Furcht oder Schrecken" },
      ], sperrt: "Danach folgen Strafzumessung, Konkurrenzen, Strafantrag und Verjährung." },
    ],
  },
];

export const baeumeFuer = (gebiet, stufe) => BAEUME.filter((b) => b.gebiet === gebiet && b.stufe === stufe);
export const achsenFuer = (gebiet, stufe) => ZEITACHSEN.filter((z) => z.gebiet === gebiet && z.stufe === stufe);
export const karteFuer = (gebiet, stufe) => LANDKARTEN.find((l) => l.gebiet === gebiet && l.stufe === stufe) || null;
export const visualisierungenFuer = (kompetenzId) => [
  ...BAEUME.filter((b) => b.k === kompetenzId).map((b) => ({ ...b, art: "baum" })),
  ...ZEITACHSEN.filter((z) => z.k === kompetenzId).map((z) => ({ ...z, art: "achse" })),
  ...LANDKARTEN.filter((l) => l.k === kompetenzId).map((l) => ({ ...l, art: "karte" })),
];
