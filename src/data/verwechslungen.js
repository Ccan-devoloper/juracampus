/* Fehleranalyse: die Verwechslungen beim Namen nennen.

   „Hier war noch ein Fehler“ hilft niemandem. Klausuren gehen an
   wiederkehrenden Verwechslungen kaputt, und die sind benennbar: Vertreter
   und Bote, Einwendung und Einrede, Anfangsverdacht und hinreichender
   Tatverdacht, Sachrüge und Verfahrensrüge. Wer sie einmal sauber getrennt
   hat, macht den Fehler nicht mehr.

   Jede Verwechslung besteht aus zwei Begriffen, dem einen Merkmal, an dem
   sie sich scheiden, und kurzen Fällen, die jeweils dem einen oder anderen
   zuzuordnen sind. Das Training fragt nicht nach Definitionen, sondern nach
   der Zuordnung – denn genau daran scheitert es in der Klausur. */

export const VERWECHSLUNGEN = [
  {
    k: "zivil1-stellvertretung", a: "Vertreter", b: "Bote",
    merkmal: "Der Vertreter bildet einen eigenen Willen; der Bote überbringt einen fremden, fertigen Willen.",
    folge: "Beim Vertreter kommt es nach § 166 BGB auf seine Kenntnis an, und er haftet nach § 179 BGB. Beim Boten ist der Geschäftsherr Erklärender, Irrtümer laufen über § 120 BGB.",
    faelle: [
      { s: "A schickt B mit dem Auftrag los, den Wagen „für höchstens 8.000 Euro“ zu kaufen. B verhandelt und einigt sich auf 7.500 Euro.", r: "a", w: "B hatte einen eigenen Entscheidungsspielraum innerhalb der Weisung – das macht ihn zum Vertreter, auch bei enger Weisung." },
      { s: "A gibt B einen verschlossenen Umschlag mit der unterschriebenen Bestellung und sagt: „Wirf das bei V ein.“", r: "b", w: "B überbringt eine fertige Erklärung des A, ohne eigenen Willen – klassischer Erklärungsbote." },
      { s: "A ruft B an: „Sag V, ich nehme das Angebot an.“ B richtet es aus.", r: "b", w: "Auch der mündliche Überbringer ist Bote. Die Erklärung ist die des A." },
      { s: "A sagt zu B: „Kauf mir irgendein passendes Auto.“ B sucht aus und schließt ab.", r: "a", w: "Vollständiger Entscheidungsspielraum – eindeutig Stellvertretung nach § 164 I BGB." },
    ],
  },
  {
    k: "zivil1-verjaehrung", a: "Einwendung", b: "Einrede",
    merkmal: "Die Einwendung wirkt von selbst und ist von Amts wegen zu berücksichtigen; die Einrede wirkt nur, wenn sie erhoben wird.",
    folge: "Im Gutachten steht die Einwendung unter „erloschen“, die Einrede unter „durchsetzbar“ – und die Einrede nur, wenn der Sachverhalt ihre Geltendmachung hergibt.",
    faelle: [
      { s: "Der Schuldner hat gezahlt.", r: "a", w: "Erfüllung nach § 362 BGB ist rechtsvernichtende Einwendung – der Anspruch erlischt, ohne dass sich jemand darauf berufen müsste." },
      { s: "Der Anspruch ist seit vier Jahren fällig, der Schuldner schweigt dazu.", r: "b", w: "Verjährung ist Einrede, § 214 I BGB. Ohne Geltendmachung bleibt der Anspruch durchsetzbar." },
      { s: "Der Vertrag war wegen Geschäftsunfähigkeit nichtig.", r: "a", w: "Rechtshindernde Einwendung – der Anspruch ist nie entstanden." },
      { s: "Der Käufer will erst zahlen, wenn geliefert wird.", r: "b", w: "§ 320 BGB ist eine Einrede; sie führt zur Verurteilung Zug um Zug, nicht zur Abweisung." },
      { s: "Der Gläubiger hat auf die Forderung verzichtet.", r: "a", w: "Erlassvertrag nach § 397 BGB – rechtsvernichtende Einwendung." },
    ],
  },
  {
    k: "zivil1-leistungsstoerung", a: "statt der Leistung", b: "neben der Leistung",
    merkmal: "Wäre der Schaden durch eine ordnungsgemäße Nacherfüllung noch entfallen? Dann statt der Leistung – mit Fristsetzung.",
    folge: "Schadensersatz statt der Leistung braucht §§ 281, 282 oder 283 BGB und eine Frist. Neben der Leistung genügt § 280 I BGB.",
    faelle: [
      { s: "Die mangelhafte Maschine verursacht einen Brand in der Halle.", r: "b", w: "Der Hallenschaden ist endgültig eingetreten; keine Nacherfüllung hätte ihn verhindert." },
      { s: "Der Käufer deckt sich nach erfolgloser Frist teurer ein und verlangt die Differenz.", r: "a", w: "Der Mehrpreis wäre bei Nacherfüllung nicht angefallen – Äquivalenzinteresse." },
      { s: "Der Verkäufer liefert drei Wochen zu spät; dem Käufer entgehen Aufträge.", r: "b", w: "Verzögerungsschaden neben der Leistung, §§ 280 I, II, 286 BGB – die Mahnung ersetzt nicht die Fristsetzung." },
      { s: "Der Besteller verlangt die Kosten der Mangelbeseitigung durch einen Dritten.", r: "a", w: "Die Kosten treten an die Stelle der geschuldeten mangelfreien Leistung." },
    ],
  },
  {
    k: "zivil1-anfechtung", a: "Motivirrtum", b: "Eigenschaftsirrtum",
    merkmal: "Eigenschaft ist ein der Sache oder Person dauerhaft anhaftendes, verkehrswesentliches Merkmal. Der Wert selbst ist keine Eigenschaft, sondern deren Ergebnis.",
    folge: "Der Motivirrtum berechtigt nicht zur Anfechtung; der Eigenschaftsirrtum nach § 119 II BGB schon – ab Gefahrübergang allerdings verdrängt durch das Kaufrecht.",
    faelle: [
      { s: "Der Käufer irrt über den Marktwert des Gemäldes.", r: "a", w: "Der Wert ist keine Eigenschaft – sonst wäre jeder schlechte Kauf anfechtbar." },
      { s: "Der Käufer hält das Gemälde für ein Original, es ist eine Kopie.", r: "b", w: "Die Echtheit haftet dem Werk dauerhaft an und bestimmt den Wert – verkehrswesentliche Eigenschaft." },
      { s: "Der Käufer irrt über die Bebaubarkeit des Grundstücks.", r: "b", w: "Die Bebaubarkeit ist ein dauerhaftes rechtliches Verhältnis des Grundstücks." },
      { s: "Der Käufer nimmt an, er werde die Finanzierung bekommen.", r: "a", w: "Eine Erwartung über die eigene Situation – reiner Motivirrtum." },
    ],
  },
  {
    k: "straf1-vorsatz-irrtum", a: "error in persona", b: "aberratio ictus",
    merkmal: "Beim error in persona trifft der Täter genau das Objekt, auf das er zielte, und irrt nur über dessen Identität. Bei der aberratio ictus geht der Angriff fehl.",
    folge: "Der error in persona ist bei gleichwertigen Objekten unbeachtlich – vollendete Tat. Die aberratio ictus führt nach der Konkretisierungslehre zu Versuch und Fahrlässigkeit in Tateinheit.",
    faelle: [
      { s: "A erschießt im Dunkeln den Mann an der Haustür, den er für seinen Feind hält. Es ist der Nachbar.", r: "a", w: "A traf genau den Menschen, auf den er zielte – Identitätsirrtum." },
      { s: "A zielt auf B, verreißt und trifft den danebenstehenden C.", r: "b", w: "Der Angriff geht fehl; das anvisierte Objekt bleibt unverletzt." },
      { s: "A legt eine Bombe unter das Auto des B. Der Wagen wird von C gefahren, der stirbt.", r: "a", w: "Die Individualisierung erfolgte über das Auto; wer darin sitzt, ist Identitätsfrage. Der BGH behandelt das als error in persona." },
      { s: "A wirft einen Stein nach B, verfehlt ihn und trifft eine Fensterscheibe.", r: "b", w: "Fehlgehen des Angriffs, dazu ungleichwertige Objekte – versuchte Körperverletzung und fahrlässige Sachbeschädigung." },
    ],
  },
  {
    k: "straf1-etbi", a: "Erlaubnistatbestandsirrtum", b: "Erlaubnisirrtum",
    merkmal: "Der Erlaubnistatbestandsirrtum betrifft Tatsachen: Der Täter nimmt eine Lage an, die es nicht gibt. Der Erlaubnisirrtum betrifft das Recht: Er kennt die Lage und hält seine Reaktion für erlaubt.",
    folge: "Der Erlaubnistatbestandsirrtum führt nach herrschender Meinung zur Fahrlässigkeitsstrafbarkeit, § 16 I 2 StGB analog. Der Erlaubnisirrtum ist Verbotsirrtum, § 17 StGB – bei Vermeidbarkeit bleibt die Vorsatzstrafe.",
    faelle: [
      { s: "A hält den nachts auf ihn zulaufenden Jogger für einen Angreifer und schlägt zu.", r: "a", w: "A irrt über die tatsächliche Lage – es gibt keinen Angriff." },
      { s: "A weiß, dass B ihn nur beleidigt hat, hält den Schlag aber für eine erlaubte Reaktion.", r: "b", w: "A kennt die Lage richtig und irrt über die Grenzen des Notwehrrechts." },
      { s: "A meint, er dürfe den fliehenden Dieb erschießen, um die Beute zu retten.", r: "b", w: "Die Notwehrlage besteht; A irrt über die Erforderlichkeit und damit über das Recht." },
      { s: "A hält die Attrappe in der Hand des B für eine echte Waffe.", r: "a", w: "Tatsachenirrtum über die Gefährlichkeit des Angriffs." },
    ],
  },
  {
    k: "straf1-betrug", a: "Diebstahl", b: "Betrug",
    merkmal: "Hat der Getäuschte den Gewahrsam freiwillig und mit Verfügungsbewusstsein endgültig übertragen? Dann Betrug. Sonst Diebstahl.",
    folge: "Die Vermögensverfügung ist das ungeschriebene Merkmal des § 263 StGB. Sie schließt die Wegnahme aus – beide Tatbestände sind alternativ.",
    faelle: [
      { s: "Der Kunde lässt sich Uhren „zur Ansicht“ geben und rennt damit weg.", r: "a", w: "Der Verkäufer behält die Aufsicht und gibt den Gewahrsam nicht endgültig auf." },
      { s: "Der Kunde zahlt mit einer gefälschten Überweisungsbestätigung; der Händler übergibt die Ware.", r: "b", w: "Der Händler übergibt bewusst und endgültig – Vermögensverfügung." },
      { s: "Der Täter tauscht im Laden das Preisschild und zahlt den niedrigeren Preis an der Kasse.", r: "b", w: "Die Kassiererin übereignet bewusst; sie irrt nur über den Preis." },
      { s: "Der Täter steckt die Ware ein und geht an der Kasse vorbei.", r: "a", w: "Gewahrsamsbruch ohne jede Verfügung." },
    ],
  },
  {
    k: "oeff1-rechtmaessigkeit-va", a: "formelle Rechtmäßigkeit", b: "materielle Rechtmäßigkeit",
    merkmal: "Formell ist alles, was den Weg zur Entscheidung betrifft: Zuständigkeit, Verfahren, Form. Materiell ist der Inhalt: Tatbestand, Rechtsfolge, Ermessen, Verhältnismäßigkeit.",
    folge: "Formelle Fehler können nach §§ 45, 46 VwVfG geheilt oder unbeachtlich sein – materielle nie.",
    faelle: [
      { s: "Die Behörde hat den Betroffenen nicht angehört.", r: "a", w: "§ 28 VwVfG betrifft das Verfahren; Heilung nach § 45 I Nr. 3 VwVfG möglich." },
      { s: "Die Behörde hat ihr Ermessen nicht erkannt.", r: "b", w: "Ermessensnichtgebrauch ist ein materieller Fehler und weder heilbar noch unbeachtlich." },
      { s: "Der Bescheid enthält keine Begründung.", r: "a", w: "§ 39 VwVfG ist Formvorschrift; Nachholung nach § 45 I Nr. 2 VwVfG." },
      { s: "Die Maßnahme war unverhältnismäßig.", r: "b", w: "Die Verhältnismäßigkeit ist Grenze der Rechtsfolge und damit materiell." },
      { s: "Eine örtlich unzuständige Behörde hat entschieden.", r: "a", w: "Zuständigkeit ist formell; nach § 46 VwVfG bei gebundener Entscheidung sogar unbeachtlich." },
    ],
  },
  {
    k: "oeff1-eilrechtsschutz", a: "§ 80 V VwGO", b: "§ 123 VwGO",
    merkmal: "Richtet sich der Angriff gegen einen belastenden Verwaltungsakt, ist § 80 V VwGO einschlägig. In allen anderen Fällen § 123 VwGO – so ordnet es § 123 V VwGO an.",
    folge: "Der falsche Antrag ist unzulässig. Bei der Verpflichtungssituation hilft § 80 V nicht, weil die Ablehnung nichts vollzieht.",
    faelle: [
      { s: "Die Gewerbeuntersagung ist für sofort vollziehbar erklärt worden.", r: "a", w: "Belastender Verwaltungsakt – Antrag auf Wiederherstellung der aufschiebenden Wirkung." },
      { s: "Der Student will vorläufig zum Studium zugelassen werden.", r: "b", w: "In der Hauptsache Verpflichtungsklage; § 80 V hilft nicht." },
      { s: "Der Nachbar wehrt sich gegen die Baugenehmigung des Bauherrn.", r: "a", w: "§ 212a BauGB nimmt dem Widerspruch die aufschiebende Wirkung – §§ 80a III, 80 V VwGO." },
      { s: "Der Bürger will die Löschung rechtswidrig gespeicherter Daten erreichen.", r: "b", w: "Realakt, kein Verwaltungsakt – einstweilige Anordnung." },
    ],
  },
  {
    k: "oeff1-einzelgrundrechte", a: "Inhaltsbestimmung", b: "Enteignung",
    merkmal: "Enteignung ist der gezielte, vollständige oder teilweise Entzug konkreter Eigentumspositionen zur Erfüllung einer öffentlichen Aufgabe. Alles andere ist Inhalts- und Schrankenbestimmung.",
    folge: "Die Enteignung braucht eine Junktimklausel nach Art. 14 III 2 GG. Eine unverhältnismäßige Inhaltsbestimmung wird nicht zur Enteignung – sie braucht eine Ausgleichsregelung.",
    faelle: [
      { s: "Ein Gesetz verpflichtet Denkmaleigentümer zum Erhalt auf eigene Kosten.", r: "a", w: "Generell-abstrakte Bestimmung von Inhalt und Schranken; ohne Ausgleichsregelung verfassungswidrig." },
      { s: "Für eine Bundesstraße wird ein Grundstück durch Verwaltungsakt entzogen.", r: "b", w: "Gezielter Güterbeschaffungsvorgang zur Erfüllung einer öffentlichen Aufgabe." },
      { s: "Eine Naturschutzverordnung verbietet die bisherige landwirtschaftliche Nutzung.", r: "a", w: "Nutzungsbeschränkung ohne Entzug – Inhaltsbestimmung, ggf. ausgleichspflichtig." },
      { s: "Ein Gesetz überträgt Grundstücke von Privaten auf eine öffentliche Gesellschaft.", r: "b", w: "Legalenteignung mit Güterbeschaffung – Art. 14 III GG." },
    ],
  },
  {
    k: "straf2-aktenmethode", a: "Anfangsverdacht", b: "hinreichender Tatverdacht",
    merkmal: "Der Anfangsverdacht verlangt zureichende tatsächliche Anhaltspunkte, § 152 II StPO. Der hinreichende Tatverdacht verlangt, dass die Verurteilung wahrscheinlicher ist als der Freispruch.",
    folge: "Der Anfangsverdacht rechtfertigt Ermittlungen, der hinreichende die Anklage. Wer den falschen Maßstab anlegt, klagt zu früh an oder stellt zu früh ein.",
    faelle: [
      { s: "Eine anonyme Anzeige nennt konkrete Details zu einer Tat.", r: "a", w: "Zureichende tatsächliche Anhaltspunkte für Ermittlungen – mehr nicht." },
      { s: "Zwei unabhängige Zeugen und ein Sachbeweis stützen den Vorwurf.", r: "b", w: "Nach vorläufiger Bewertung ist die Verurteilung wahrscheinlicher als der Freispruch." },
      { s: "Der einzige Belastungszeuge wird in der Hauptverhandlung von § 52 StPO Gebrauch machen.", r: "a", w: "Für Ermittlungen genügt es; für die Anklage nicht, weil die Aussage nicht verwertbar sein wird." },
      { s: "Der Beschuldigte ist geständig und das Geständnis wird durch objektive Befunde gestützt.", r: "b", w: "Hinreichender Tatverdacht – Anklage nach § 170 I StPO." },
    ],
  },
  {
    k: "straf2-sachruege", a: "Sachrüge", b: "Verfahrensrüge",
    merkmal: "Die Sachrüge greift das Urteil anhand seiner Gründe an. Die Verfahrensrüge greift den Weg zum Urteil an und verlangt vollständigen Tatsachenvortrag nach § 344 II 2 StPO.",
    folge: "Die Sachrüge muss nicht begründet werden; die Verfahrensrüge scheitert ohne Darlegung schon an der Zulässigkeit.",
    faelle: [
      { s: "Die Urteilsgründe lassen offen, woraus sich der Vorsatz ergibt.", r: "a", w: "Darstellungsmangel – erkennbar allein aus den Gründen." },
      { s: "Das Gericht hat einen Beweisantrag ohne Beschluss übergangen.", r: "b", w: "Verfahrensfehler nach §§ 244 VI, 34 StPO; vollständiger Vortrag erforderlich." },
      { s: "Die Beweiswürdigung widerspricht einem gesicherten Erfahrungssatz.", r: "a", w: "Rechtsfehler in der Würdigung, sichtbar in den Gründen – § 261 StPO." },
      { s: "Die Hauptverhandlung fand teilweise in Abwesenheit des Verteidigers statt.", r: "b", w: "Absoluter Revisionsgrund nach § 338 Nr. 5 StPO – aber darzulegen." },
    ],
  },
  {
    k: "zivil2-relation", a: "Schlüssigkeit", b: "Erheblichkeit",
    merkmal: "Schlüssig ist der Klägervortrag, wenn er – als wahr unterstellt – den Antrag trägt. Erheblich ist der Beklagtenvortrag, wenn er – als wahr unterstellt – dem Anspruch entgegensteht.",
    folge: "Unschlüssige Klage: Abweisung ohne Beweisaufnahme. Unerhebliche Verteidigung: Urteil nach Klägervortrag. Nur wenn beides zutrifft, wird Beweis erhoben.",
    faelle: [
      { s: "Der Kläger trägt zur Fälligkeit seiner Forderung nichts vor.", r: "a", w: "Die Klägerstation scheitert – die Klage ist unschlüssig." },
      { s: "Der Beklagte bestreitet den Vertragsschluss pauschal, obwohl er die Urkunde nicht angreift.", r: "b", w: "Unsubstantiiertes Bestreiten, § 138 II, III ZPO – unerheblich." },
      { s: "Der Beklagte trägt vor, er habe bereits gezahlt, und benennt einen Zeugen.", r: "b", w: "Erheblich: Erfüllung würde den Anspruch vernichten; Beweis ist zu erheben." },
      { s: "Der Kläger beziffert seinen Schaden nicht.", r: "a", w: "Ohne bezifferten Antrag und tragende Tatsachen ist die Klage unschlüssig." },
    ],
  },
  {
    k: "oeff2-behoerdenklausur", a: "Bescheidstil", b: "Gutachtenstil",
    merkmal: "Der Bescheidstil entscheidet zuerst und begründet danach. Der Gutachtenstil fragt zuerst und entscheidet am Ende.",
    folge: "Der Prüfungsvermerk ist internes Gutachten, der Bescheid äußere Regelung. Ein Konjunktiv im Bescheid ist ein Handwerksfehler.",
    faelle: [
      { s: "„Ihnen wird untersagt, das Gebäude zu Wohnzwecken zu nutzen. Rechtsgrundlage ist § 82 BauO.“", r: "a", w: "Entscheidung zuerst, Begründung danach – richtiger Bescheidstil." },
      { s: "„Fraglich ist, ob eine genehmigungspflichtige Nutzungsänderung vorliegt.“", r: "b", w: "Gehört in den Prüfungsvermerk, nicht in den Bescheid." },
      { s: "„Es könnte eine Nutzungsuntersagung in Betracht kommen.“", r: "b", w: "Konjunktiv und Erwägung – der Adressat erfährt nicht, was gilt." },
      { s: "„Die Anordnung ist verhältnismäßig, weil ein milderes Mittel nicht zur Verfügung steht.“", r: "a", w: "Feststellung mit Begründung – Bescheidstil." },
    ],
  },
];

export const verwechslungFuer = (kompetenzId) => VERWECHSLUNGEN.find((v) => v.k === kompetenzId) || null;
export const verwechslungenFuer = (gebiet, stufe) => VERWECHSLUNGEN.filter((v) => v.k.startsWith(`${gebiet}${stufe}-`));
