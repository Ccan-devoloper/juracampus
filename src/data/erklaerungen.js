/* Dreistufige Erklärungen.

   Das Quellwerk ist ein Wiederholungswerk: Das mittlere Kapitel hat rund
   hundert Wörter. Das genügt, um jemanden zu erinnern – nicht, um jemandem
   die objektive Zurechnung beizubringen, der sie noch nie verstanden hat.
   Diese Datei schließt die Lücke, und zwar auf drei Ebenen, weil drei
   verschiedene Fragen dahinterstehen:

     kurz        30 Sekunden – „Worum geht es überhaupt?“
     mittel      3 bis 5 Minuten – „Wie prüfe ich das?“
     vertiefung  „Was macht daraus eine gute Klausur?“

   Dazu kommt, was in Lehrbüchern regelmäßig fehlt und in der Klausur
   entscheidet: ein Beispiel, ein Gegenbeispiel (die Abgrenzung wird nur am
   Fall klar), eine wörtlich verwendbare Klausurformulierung und die typischen
   Fehler samt Begründung, warum sie falsch sind.

   Feldnamen sind kurz gehalten, weil sie sich hundertfach wiederholen:
     k            Kompetenz-ID aus data/kompetenzen.js
     kurz         die 30-Sekunden-Antwort
     mittel       [{ t: Überschrift, x: Text }]
     beispiel     ein Fall, in dem es greift
     gegenbeispiel ein Fall, in dem es gerade nicht greift
     formulierung Satz für die Klausur, wörtlich verwendbar
     fallen       [{ f: der Fehler, w: warum er falsch ist }]
     vertiefung   [{ t: Überschrift, x: Text }] */

const ZIVIL_1 = [
  {
    k: "zivil1-willenserklaerung",
    kurz: "Eine Willenserklärung ist die Äußerung eines auf eine Rechtsfolge gerichteten Willens. Sie hat einen objektiven Tatbestand (was ein verständiger Dritter der Äußerung entnimmt) und einen subjektiven (was der Erklärende wollte). Auseinander fallen dürfen beide – dann gilt zunächst das objektiv Erklärte, und der Irrende bekommt die Anfechtung.",
    mittel: [
      { t: "Objektiver Tatbestand", x: "Ein Verhalten hat Erklärungswert, wenn ein verständiger Empfänger in der Lage des tatsächlichen Empfängers ihm einen Rechtsfolgewillen entnehmen durfte. Maßgeblich ist nicht, was der Erklärende meinte, sondern der objektive Empfängerhorizont, §§ 133, 157 BGB." },
      { t: "Subjektiver Tatbestand", x: "Er zerfällt in drei Schichten: Handlungswille (bewusstes Verhalten – fehlt bei Reflex, Hypnose, geführter Hand; dann keine Willenserklärung), Erklärungsbewusstsein (das Bewusstsein, überhaupt rechtserheblich zu handeln) und Geschäftswille (der Wille gerade auf dieses Geschäft)." },
      { t: "Fehlendes Erklärungsbewusstsein", x: "Die herrschende Meinung lässt eine Willenserklärung auch ohne aktuelles Erklärungsbewusstsein entstehen, wenn der Erklärende bei verkehrsüblicher Sorgfalt hätte erkennen können, dass sein Verhalten als Erklärung verstanden wird (potentielles Erklärungsbewusstsein), und der Empfänger es tatsächlich so verstand. Er kann dann nach § 119 I BGB anfechten und haftet auf den Vertrauensschaden, § 122 BGB." },
      { t: "Fehlender Geschäftswille", x: "Er ist für die Wirksamkeit ohne Bedeutung – die Erklärung entsteht trotzdem. Der fehlende Geschäftswille ist genau der Fall des Irrtums und damit ein Anfechtungs-, kein Wirksamkeitsproblem." },
      { t: "Zugang, § 130 BGB", x: "Empfangsbedürftige Erklärungen unter Abwesenden werden wirksam, wenn sie so in den Machtbereich des Empfängers gelangen, dass unter gewöhnlichen Umständen mit Kenntnisnahme zu rechnen ist. Nicht nötig ist, dass er sie liest; nötig ist die Möglichkeit dazu zur verkehrsüblichen Zeit." },
    ],
    beispiel: "Bei einer Weinversteigerung hebt N die Hand, um einem Bekannten zu winken. Der Auktionator wertet das als Gebot. N hatte kein Erklärungsbewusstsein – wer aber im Versteigerungssaal deutlich die Hand hebt, muss mit dieser Deutung rechnen. Eine Willenserklärung liegt vor; N kann nach § 119 I BGB anfechten und schuldet § 122 BGB.",
    gegenbeispiel: "Derselbe N sitzt im Kino und hebt die Hand, um sich zu strecken. Auch wenn der Nachbar das für ein Angebot hält: Ein verständiger Empfänger entnimmt dem im Kino keinen Rechtsfolgewillen. Schon der objektive Tatbestand fehlt – es geht gar nicht erst um Anfechtung.",
    formulierung: "Das Verhalten des N müsste aus Sicht eines verständigen Empfängers in der Lage des V den Willen erkennen lassen, eine Rechtsfolge herbeizuführen. Maßgeblich ist der objektive Empfängerhorizont, §§ 133, 157 BGB.",
    fallen: [
      { f: "Erklärungsbewusstsein und Geschäftswille werden vermischt.", w: "Das Erklärungsbewusstsein betrifft die Frage, ob überhaupt rechtserheblich gehandelt wird; der Geschäftswille betrifft den Inhalt. Nur das Erste ist ein Wirksamkeitsproblem, das Zweite ist immer schon Anfechtung." },
      { f: "Nach Verneinen des subjektiven Tatbestands wird „kein Vertrag“ geschrieben und der Fall beendet.", w: "Die Klausur will die normative Zurechnung und anschließend §§ 119, 122 BGB sehen. Wer hier abbricht, verschenkt den ganzen zweiten Teil." },
      { f: "Zugang wird mit Kenntnisnahme gleichgesetzt.", w: "§ 130 I BGB verlangt nur die Möglichkeit der Kenntnisnahme unter gewöhnlichen Umständen. Wer den Briefkasten nicht leert, kann sich darauf nicht berufen." },
    ],
    vertiefung: [
      { t: "falsa demonstratio non nocet", x: "Verstehen beide Parteien dasselbe, obwohl sie es falsch bezeichnen, gilt das übereinstimmend Gewollte – die Auslegung nach dem Empfängerhorizont tritt zurück. Der Haakjöringsköd-Fall (RGZ 99, 147: Walfleisch statt Haifischfleisch) ist der Klassiker. Folge: Der Vertrag kommt über das Gewollte zustande, eine Anfechtung ist weder nötig noch möglich." },
      { t: "Abhandengekommene Willenserklärung", x: "Gelangt ein nur vorbereiteter Entwurf ohne Willen des Erklärenden in den Verkehr, fehlt es nach herrschender Auffassung an der Abgabe – keine Willenserklärung. Eine verkehrsschutzorientierte Gegenansicht lässt die Erklärung bei zurechenbarer Veranlassung wirken. Gegen sie spricht, dass sie die Willentlichkeit der Abgabe verwischt; der Empfänger ist über §§ 280 I, 311 II, 241 II BGB hinreichend geschützt." },
      { t: "Zugang unter Anwesenden", x: "Bei verkörperten Erklärungen unter Anwesenden (übergebener Brief) gilt § 130 BGB analog. Bei mündlichen Erklärungen folgt die herrschende Meinung der eingeschränkten Vernehmungstheorie: Zugang, wenn der Erklärende davon ausgehen durfte, richtig verstanden worden zu sein." },
    ],
  },
  {
    k: "zivil1-vertragsschluss",
    kurz: "Ein Vertrag kommt durch zwei übereinstimmende Willenserklärungen zustande: Angebot und Annahme. Das Angebot muss so bestimmt sein, dass die Annahme mit einem schlichten „Ja“ genügt; wer sich diese Bindung nicht leisten will, gibt nur eine invitatio ad offerendum ab.",
    mittel: [
      { t: "Angebot, § 145 BGB", x: "Empfangsbedürftige Willenserklärung, die alle wesentlichen Vertragsbestandteile (essentialia negotii: Parteien, Leistung, Gegenleistung) enthält und mit Rechtsbindungswillen abgegeben wird. Fehlt einer der Punkte, ist es kein Angebot." },
      { t: "invitatio ad offerendum", x: "Schaufenster, Kataloge, Webshop-Seiten und Zeitungsanzeigen sind regelmäßig kein Angebot, sondern nur die Aufforderung dazu – der Anbieter will sich nicht gegenüber jedem Interessenten binden, insbesondere wegen begrenzter Vorräte und der Zahlungsfähigkeit des Kunden." },
      { t: "Annahme, §§ 146 ff. BGB", x: "Vorbehaltlose Zustimmung zum Angebot. Sie muss rechtzeitig erfolgen: unter Anwesenden sofort (§ 147 I), unter Abwesenden innerhalb der Frist des § 147 II. Eine verspätete oder abändernde Annahme gilt nach § 150 BGB als neues Angebot." },
      { t: "Schweigen", x: "Schweigen ist grundsätzlich keine Erklärung. Ausnahmen: gesetzlich angeordnet (§§ 362 HGB, 516 II 2, 108 II BGB), vertraglich vereinbart oder im kaufmännischen Bestätigungsschreiben, wo Schweigen bei Kaufleuten den bestätigten Inhalt zum Vertragsinhalt macht." },
      { t: "Dissens, §§ 154, 155 BGB", x: "Offener Dissens (§ 154): Die Parteien wissen, dass sie sich über einen Punkt nicht geeinigt haben – im Zweifel kein Vertrag. Versteckter Dissens (§ 155): Sie halten sich für einig, sind es aber nicht – der Vertrag gilt, wenn er auch ohne den offenen Punkt geschlossen worden wäre." },
    ],
    beispiel: "V stellt einen Gebrauchtwagen mit Preisschild ins Schaufenster. K betritt den Laden und sagt: „Den nehme ich zu 8.000 Euro.“ Das ist das Angebot des K; V nimmt es an, indem er den Kaufvertrag unterschreibt.",
    gegenbeispiel: "K sagt nur: „Der interessiert mich, was ist Ihr bestes Angebot?“ Darin fehlt der Rechtsbindungswille ebenso wie der bestimmte Preis – kein Angebot, sondern Verhandlung.",
    formulierung: "Ein Kaufvertrag setzt zwei übereinstimmende Willenserklärungen voraus, §§ 145 ff. BGB. Die Präsentation im Schaufenster ist mangels Rechtsbindungswillens noch kein Angebot, sondern eine invitatio ad offerendum; das Angebot ging vielmehr von K aus.",
    fallen: [
      { f: "Das Schaufenster oder die Webseite wird als Angebot behandelt.", w: "Der Verkäufer will sich nicht gegenüber jedem binden – sonst hätte er bei Vorratsende so viele Verträge wie Interessenten. Die Reihenfolge Angebot/Annahme kehrt sich damit um, was für die Anfechtung und für § 150 II BGB erheblich ist." },
      { f: "Bei abweichender Annahme wird ein Vertrag mit dem abweichenden Inhalt angenommen.", w: "§ 150 II BGB ordnet an, dass darin ein neues Angebot liegt. Der Vertrag kommt erst zustande, wenn die Gegenseite dieses annimmt – notfalls konkludent durch Ausführung." },
      { f: "Schweigen wird als Zustimmung gewertet.", w: "Wer schweigt, erklärt nichts. Die Ausnahmen sind eng und müssen benannt werden – insbesondere das kaufmännische Bestätigungsschreiben, das beiderseitige Kaufmannseigenschaft oder zumindest kaufmännische Teilnahme am Rechtsverkehr voraussetzt." },
    ],
    vertiefung: [
      { t: "Verträge im Internet", x: "Beim Online-Kauf ist die Produktseite invitatio, die Bestellung das Angebot des Kunden, die Bestätigungsmail regelmäßig nur Zugangsbestätigung nach § 312i I 1 Nr. 3 BGB und noch keine Annahme. Die Annahme liegt meist in der Versandbestätigung oder der Lieferung – wichtig für die Frage, ob ein Preisfehler den Verkäufer bindet." },
      { t: "§ 151 BGB", x: "Auf den Zugang der Annahmeerklärung kann verzichtet werden, wenn er nach der Verkehrssitte nicht zu erwarten ist. Die Annahmeerklärung selbst entfällt damit nicht – nötig bleibt ein nach außen erkennbarer Betätigungswille, etwa das Einlagern der Ware für den Kunden." },
      { t: "Kaufmännisches Bestätigungsschreiben", x: "Es setzt Vertragsverhandlungen, ein zeitnahes Schreiben, Redlichkeit des Absenders und unterbliebenen Widerspruch voraus. Rechtsfolge ist die Geltung des bestätigten Inhalts – auch abweichend vom Verhandelten. Abzugrenzen ist die bloße Auftragsbestätigung, die nur das Verhandelte wiedergibt und damit § 150 II BGB unterfällt." },
    ],
  },
  {
    k: "zivil1-anfechtung",
    kurz: "Die Anfechtung vernichtet eine wirksame Willenserklärung rückwirkend, § 142 I BGB. Sie braucht einen Grund (§§ 119, 120, 123), eine Erklärung gegenüber dem Richtigen (§ 143) und die Einhaltung der Frist (§ 121 oder § 124). Preis der Anfechtung ist regelmäßig der Vertrauensschaden, § 122 BGB.",
    mittel: [
      { t: "Anfechtungsgrund", x: "§ 119 I Alt. 1: Inhaltsirrtum – der Erklärende weiß, was er sagt, irrt sich aber über dessen Bedeutung. § 119 I Alt. 2: Erklärungsirrtum – er sagt etwas anderes, als er sagen wollte (Vergreifen, Verschreiben). § 119 II: Irrtum über verkehrswesentliche Eigenschaften der Person oder Sache. § 120: Falschübermittlung. § 123: arglistige Täuschung oder widerrechtliche Drohung." },
      { t: "Kausalität", x: "Bei §§ 119, 120 BGB muss der Irrtum für die Erklärung ursächlich gewesen sein, und zwar subjektiv und bei verständiger Würdigung auch objektiv. Bei § 123 BGB genügt die Mitursächlichkeit; ein objektives Element wird nicht verlangt." },
      { t: "Erklärung und Gegner, § 143 BGB", x: "Die Anfechtung ist eine empfangsbedürftige Gestaltungserklärung. Anfechtungsgegner ist beim Vertrag der andere Teil (§ 143 II), bei einseitig empfangsbedürftigen Erklärungen der Empfänger, bei nicht empfangsbedürftigen jeder unmittelbar Begünstigte (§ 143 IV)." },
      { t: "Frist", x: "§§ 119, 120: unverzüglich nach Kenntnis des Anfechtungsgrundes, § 121 I – also ohne schuldhaftes Zögern, in der Praxis regelmäßig binnen ein bis zwei Wochen. § 123: ein Jahr ab Entdeckung der Täuschung beziehungsweise Ende der Zwangslage, § 124." },
      { t: "Rechtsfolge", x: "Nichtigkeit ex tunc, § 142 I BGB. Bereits Geleistetes wird über §§ 812 ff. BGB zurückabgewickelt. Der Anfechtende schuldet dem gutgläubigen Erklärungsempfänger den Vertrauensschaden, begrenzt auf das Erfüllungsinteresse, § 122 BGB – nicht aber bei § 123, weil der Getäuschte kein Vertrauen des Täuschenden zu schützen hat." },
    ],
    beispiel: "V will ein Bild für 1.000 Euro anbieten, verschreibt sich und schreibt 100 Euro. K nimmt an. V hat sich beim Erklärungsakt vergriffen – Erklärungsirrtum nach § 119 I Alt. 2. Er ficht unverzüglich an; der Vertrag ist ex tunc nichtig, K bekommt seinen Vertrauensschaden nach § 122 BGB.",
    gegenbeispiel: "V verkalkuliert sich intern und bietet deshalb 100 statt 1.000 Euro an. Hier stimmt die Erklärung mit dem Erklärungswillen überein; der Fehler liegt in der Willensbildung. Dieser bloße Motivirrtum berechtigt nicht zur Anfechtung – die Kalkulation ist grundsätzlich das Risiko des Anbietenden.",
    formulierung: "V könnte seine Willenserklärung wirksam angefochten haben. Dann müsste ein Anfechtungsgrund vorliegen, die Anfechtung gegenüber dem richtigen Gegner erklärt und die Anfechtungsfrist gewahrt sein.",
    fallen: [
      { f: "Der Motivirrtum wird als Eigenschaftsirrtum behandelt.", w: "§ 119 II BGB erfasst nur Eigenschaften, die der Sache oder Person auf Dauer anhaften und für den Verkehr wesentlich sind. Der Wert selbst ist keine Eigenschaft, sondern deren Ergebnis – sonst wäre jeder schlechte Kauf anfechtbar." },
      { f: "Die Anfechtung wird geprüft, bevor der Vertrag steht.", w: "Angefochten werden kann nur eine wirksame Erklärung. Erst Vertragsschluss, dann Wirksamkeitshindernisse, dann Anfechtung." },
      { f: "§ 122 BGB wird vergessen.", w: "Die Klausur will fast immer die Gegenleistung des Rücktrittsprivilegs sehen. Wer anficht, zahlt – das ist der Preis dafür, sich vom objektiv Erklärten zu lösen." },
    ],
    vertiefung: [
      { t: "Kalkulationsirrtum", x: "Der interne Kalkulationsirrtum ist unbeachtlich. Beim offenen Kalkulationsirrtum, bei dem die Berechnung offengelegt wird, verneint der BGH ebenfalls die Anfechtbarkeit, gewährt aber ausnahmsweise Schutz über § 242 BGB, wenn die Durchsetzung schlechthin untragbar wäre. Die Literatur will teils § 119 I analog anwenden." },
      { t: "Arglistige Täuschung durch Dritte", x: "§ 123 II BGB schränkt die Anfechtung ein, wenn ein Dritter täuscht: Sie ist nur möglich, wenn der Erklärungsempfänger die Täuschung kannte oder kennen musste. Nicht Dritter ist, wer im Lager des Erklärungsempfängers steht – Vertreter, Verhandlungsgehilfe, Vermittler." },
      { t: "Verhältnis zur Sachmängelhaftung", x: "Ab Gefahrübergang verdrängt das Kaufrecht die Anfechtung nach § 119 II BGB, weil sonst die kurzen Verjährungsfristen und der Vorrang der Nacherfüllung unterlaufen würden. Die Anfechtung nach § 123 BGB bleibt dagegen immer möglich – wer arglistig täuscht, verdient keinen Schutz durch § 438 BGB." },
    ],
  },
  {
    k: "zivil1-stellvertretung",
    kurz: "Stellvertretung heißt: Eine eigene Willenserklärung, im fremden Namen, mit Vertretungsmacht – dann wirkt das Geschäft für und gegen den Vertretenen, § 164 I BGB. Fehlt die Vertretungsmacht, ist der Vertrag schwebend unwirksam, und der Vertreter haftet nach § 179 BGB.",
    mittel: [
      { t: "Eigene Willenserklärung", x: "Der Vertreter bildet einen eigenen Willen; der Bote übermittelt nur einen fremden. Die Abgrenzung entscheidet über § 166 (Wissenszurechnung), über die Anfechtbarkeit und darüber, ob § 179 oder § 122 BGB einschlägig ist." },
      { t: "Im fremden Namen – Offenkundigkeit", x: "Der Vertretungswille muss nach außen erkennbar sein, ausdrücklich oder aus den Umständen, § 164 I 2 BGB. Fehlt er, wirkt das Geschäft für den Vertreter selbst, § 164 II BGB, und ein Irrtum darüber ist unbeachtlich. Ausnahmen: Geschäft für den, den es angeht (Bargeschäfte des täglichen Lebens) und unternehmensbezogenes Geschäft." },
      { t: "Vertretungsmacht", x: "Sie entsteht durch Gesetz (§§ 1629, 1789 BGB, § 35 GmbHG), durch Rechtsgeschäft (Vollmacht, § 167) oder durch Rechtsschein. Die Innenvollmacht wird gegenüber dem Vertreter erklärt, die Außenvollmacht gegenüber dem Dritten – letztere erlischt nur nach § 170 BGB." },
      { t: "Rechtsscheinvollmachten", x: "Duldungsvollmacht: Der Vertretene kennt das Auftreten des Vertreters und duldet es – er wird wie ein Bevollmächtigender behandelt. Anscheinsvollmacht: Er kennt es nicht, hätte es aber bei pflichtgemäßer Sorgfalt erkennen und verhindern können; nötig sind Dauer und Häufigkeit sowie Gutgläubigkeit des Dritten." },
      { t: "Vertreter ohne Vertretungsmacht", x: "Der Vertrag ist schwebend unwirksam und kann genehmigt werden, §§ 177, 184 BGB. Der Dritte kann nach § 177 II auffordern und nach § 178 widerrufen. Verweigert der Vertretene die Genehmigung, haftet der falsus procurator nach § 179 BGB: bei Kenntnis des Mangels auf Erfüllung oder Schadensersatz, bei Unkenntnis nur auf den Vertrauensschaden, § 179 II." },
    ],
    beispiel: "A lässt B seit zwei Jahren regelmäßig Waren in seinem Namen bestellen und bezahlt anstandslos. Als B erneut bestellt, widerruft A. Gegenüber dem gutgläubigen Lieferanten greift die Duldungsvollmacht – A muss zahlen.",
    gegenbeispiel: "B bestellt zum ersten Mal unter A's Namen; A erfährt davon erst nach der Lieferung. Weder Duldungs- noch Anscheinsvollmacht: Es fehlt an Dauer und Häufigkeit. Der Vertrag ist schwebend unwirksam; B haftet nach § 179 BGB.",
    formulierung: "Die Willenserklärung des B wirkt für und gegen A, wenn B eine eigene Willenserklärung im Namen des A mit Vertretungsmacht abgegeben hat, § 164 I 1 BGB.",
    fallen: [
      { f: "Vertreter und Bote werden nicht getrennt.", w: "Wer einen eigenen Entscheidungsspielraum hat, ist Vertreter – auch wenn er sich an enge Weisungen hält. Wer nur eine fertige Erklärung überbringt, ist Bote. Beim Boten ist der Geschäftsherr Erklärender; Irrtümer laufen über § 120 BGB." },
      { f: "Die Anscheinsvollmacht wird ohne Dauerelement bejaht.", w: "Ein einmaliges Auftreten genügt nicht. Sonst würde jede Sorgfaltspflichtverletzung zu einer Vertretungsmacht führen und das Rechtsgeschäft durch eine Haftung ersetzt." },
      { f: "§ 179 BGB wird geprüft, obwohl der Vertretene genehmigt hat.", w: "Die Genehmigung wirkt auf den Zeitpunkt der Vornahme zurück, § 184 I BGB. Damit war der Vertreter rückwirkend bevollmächtigt – für § 179 BGB ist kein Raum mehr." },
    ],
    vertiefung: [
      { t: "Missbrauch der Vertretungsmacht", x: "Der Vertreter handelt innerhalb seiner Vertretungsmacht, aber gegen seine Pflichten im Innenverhältnis. Grundsatz: Das Geschäft ist wirksam, weil der Rechtsverkehr sich auf die Vertretungsmacht verlassen können muss. Ausnahme bei Kollusion (sittenwidrig, § 138 BGB, nichtig) und bei Evidenz, wenn sich der Missbrauch dem Dritten geradezu aufdrängen musste – dann § 242 BGB, der Vertretene kann die Erfüllung verweigern." },
      { t: "§ 181 BGB", x: "Insichgeschäft und Mehrvertretung sind grundsätzlich verboten. Ausnahmen: Gestattung, ausschließliche Erfüllung einer Verbindlichkeit und – nach herrschender teleologischer Reduktion – das lediglich rechtlich vorteilhafte Geschäft, etwa die Schenkung der Eltern an das Kind. Verstoß führt nicht zur Nichtigkeit, sondern zur schwebenden Unwirksamkeit analog § 177 BGB." },
      { t: "§ 166 BGB", x: "Für Willensmängel und Kenntnis kommt es auf den Vertreter an, nicht auf den Vertretenen – § 166 I. Aber: Handelt der Vertreter nach bestimmten Weisungen, muss sich der Vertretene seine eigene Kenntnis entgegenhalten lassen, § 166 II. Das ist der Grund, warum sich niemand hinter einem gutgläubigen Strohmann verstecken kann." },
    ],
  },
  {
    k: "zivil1-anspruchsaufbau",
    kurz: "Die Zivilrechtsklausur wird nicht nach Kapiteln gelöst, sondern nach Ansprüchen: Wer will was von wem woraus? Jeder Anspruch wird in drei Schritten geprüft – entstanden, erloschen, durchsetzbar. Die Reihenfolge der Anspruchsgrundlagen ist dabei nicht beliebig.",
    mittel: [
      { t: "Die Frage", x: "„Wer will was von wem woraus?“ Zuerst die Parteien, dann das Begehren (Zahlung, Herausgabe, Unterlassung), dann die Anspruchsgrundlagen. Erst diese Fixierung macht den Sachverhalt bearbeitbar." },
      { t: "Reihenfolge der Anspruchsgrundlagen", x: "Vertragliche Ansprüche – vertragsähnliche (culpa in contrahendo, Geschäftsführung ohne Auftrag) – dingliche (§§ 985, 1004) – deliktische – bereicherungsrechtliche. Der Grund ist inhaltlich: Ein Vertrag kann ein Recht zum Besitz geben (§ 986) und damit § 985 ausschließen; das Eigentümer-Besitzer-Verhältnis sperrt Delikt und Bereicherung." },
      { t: "Entstanden", x: "Alle Tatbestandsmerkmale der Anspruchsgrundlage plus Wirksamkeit des Rechtsgeschäfts: Geschäftsfähigkeit, Form, §§ 134, 138, Stellvertretung, Bedingung. Rechtshindernde Einwendungen gehören hierher." },
      { t: "Erloschen", x: "Rechtsvernichtende Einwendungen: Erfüllung (§ 362), Aufrechnung (§ 389), Erlass (§ 397), Rücktritt (§ 346), Anfechtung (§ 142), Unmöglichkeit (§ 275), Widerruf." },
      { t: "Durchsetzbar", x: "Einreden, die geltend gemacht werden müssen: Verjährung (§ 214), Zurückbehaltungsrecht (§ 273), Einrede des nicht erfüllten Vertrags (§ 320), Stundung. Sie vernichten den Anspruch nicht, sie hemmen ihn." },
    ],
    beispiel: "K verlangt von V das Auto. Zu prüfen ist zuerst § 433 I 1 BGB – wenn der Kaufvertrag wirksam ist, hat K auch ein Recht zum Besitz, sodass § 985 BGB für V ausscheidet. Erst danach kommen die übrigen Grundlagen in Betracht.",
    gegenbeispiel: "Wer mit § 985 BGB beginnt, muss im Rahmen des § 986 BGB den ganzen Kaufvertrag inzident prüfen – und schreibt die Klausur dadurch zweimal. Die Reihenfolge ist kein Ritual, sie spart Zeit.",
    formulierung: "K könnte gegen V einen Anspruch auf Übereignung und Übergabe des Fahrzeugs aus § 433 I 1 BGB haben. Dann müsste zwischen den Parteien ein wirksamer Kaufvertrag zustande gekommen sein.",
    fallen: [
      { f: "Es wird nach Rechtsgebieten statt nach Ansprüchen gegliedert.", w: "Eine Überschrift „Kaufrecht“ beantwortet keine Frage des Sachverhalts. Jede Gliederungsebene muss einen Anspruch, ein Merkmal oder eine Einwendung benennen." },
      { f: "Einwendungen und Einreden werden vermischt.", w: "Einwendungen wirken von selbst, Einreden nur, wenn sie erhoben werden. Wer die Verjährung im Gutachten von Amts wegen berücksichtigt, prüft die Klausur am Gesetz vorbei." },
      { f: "Der Obersatz nennt das Begehren nicht.", w: "„Anspruch aus § 433“ ist unvollständig. Erst „Anspruch auf Zahlung des Kaufpreises in Höhe von 8.000 Euro aus § 433 II BGB“ macht prüfbar, ob der Anspruch besteht." },
    ],
    vertiefung: [
      { t: "Hilfsgutachten", x: "Wird eine Anspruchsgrundlage verneint, ist der Rest an sich nicht mehr zu prüfen. Verlangt der Bearbeitervermerk Vollständigkeit oder ist die Ablehnung zweifelhaft, wird hilfsgutachterlich weitergeprüft – deutlich gekennzeichnet und deutlich knapper." },
      { t: "Gutachten- und Urteilsstil", x: "Gutachtenstil dort, wo das Ergebnis offen ist: Obersatz, Definition, Subsumtion, Ergebnis. Urteilsstil dort, wo es offensichtlich ist: „Der Kaufvertrag ist wirksam, weil …“. Wer alles im Gutachtenstil schreibt, verliert die Zeit für den Schwerpunkt." },
      { t: "Anspruchskonkurrenz", x: "Mehrere Anspruchsgrundlagen bestehen nebeneinander, wenn das Gesetz keine Sperre anordnet. Sperren sind etwa §§ 993 I Hs. 2 (EBV gegen Delikt und Bereicherung), die kaufrechtliche Verjährung gegenüber § 823 bei Weiterfresserschäden und die Subsidiarität der Eingriffskondiktion gegenüber der Leistungskondiktion." },
    ],
  },
  {
    k: "zivil1-leistungsstoerung",
    kurz: "Das ganze Leistungsstörungsrecht hängt an § 280 I BGB: Pflichtverletzung, Vertretenmüssen, Schaden. Was dazukommt, hängt davon ab, welchen Schaden man will – Schadensersatz statt der Leistung braucht zusätzlich § 281, § 282 oder § 283, Verzugsschaden zusätzlich § 286.",
    mittel: [
      { t: "Schuldverhältnis und Pflichtverletzung", x: "Jedes Schuldverhältnis (auch das vorvertragliche nach §§ 311 II, 241 II) begründet Leistungs- und Schutzpflichten. Pflichtverletzung ist jedes Zurückbleiben hinter dem Pflichtenprogramm: Nichtleistung, verspätete Leistung, Schlechtleistung, Verletzung einer Schutzpflicht." },
      { t: "Vertretenmüssen, §§ 276, 278", x: "Der Schuldner hat Vorsatz und Fahrlässigkeit zu vertreten, § 276 I 1, und das Verschulden seiner Erfüllungsgehilfen wie eigenes, § 278. Die Beweislast ist umgekehrt: § 280 I 2 BGB vermutet das Vertretenmüssen; der Schuldner muss sich entlasten." },
      { t: "Schadensersatz neben der Leistung", x: "Er wird allein aus § 280 I BGB geschuldet und tritt neben den fortbestehenden Erfüllungsanspruch. Typisch sind Mangelfolgeschäden – die mangelhafte Maschine beschädigt die Produktionshalle." },
      { t: "Schadensersatz statt der Leistung", x: "Er ersetzt den Erfüllungsanspruch, § 281 IV BGB, und verlangt deshalb mehr: eine erfolglose Fristsetzung (§ 281 I), deren Entbehrlichkeit (§ 281 II) oder Unmöglichkeit (§ 283, § 311a II). Die Fristsetzung ist das Recht zur zweiten Andienung – wer sie übergeht, verliert den Anspruch." },
      { t: "Verzug, § 286", x: "Fälligkeit, Durchsetzbarkeit, Mahnung (oder deren Entbehrlichkeit nach § 286 II) und Vertretenmüssen. Der Verzug begründet den Ersatz des Verzögerungsschadens, verschärft die Haftung nach § 287 und löst Verzugszinsen nach § 288 aus." },
    ],
    beispiel: "V liefert eine mangelhafte Maschine, die einen Brand in der Halle des K auslöst. Der Hallenschaden ist Schadensersatz neben der Leistung – § 280 I BGB genügt, eine Fristsetzung wäre sinnlos, weil der Schaden bereits eingetreten ist.",
    gegenbeispiel: "K verlangt die Differenz zwischen dem Kaufpreis und dem teureren Deckungskauf. Das ist Schadensersatz statt der Leistung: §§ 280 I, III, 281 BGB, und dafür muss K erst erfolglos eine Frist gesetzt haben.",
    formulierung: "K könnte gegen V einen Anspruch auf Schadensersatz statt der Leistung aus §§ 280 I, III, 281 I 1 BGB haben. Dazu müsste V eine fällige Leistung trotz angemessener Fristsetzung nicht erbracht haben.",
    fallen: [
      { f: "Schadensersatz statt und neben der Leistung werden vertauscht.", w: "Die Abgrenzung lautet: Wäre der Schaden durch eine ordnungsgemäße Nacherfüllung noch entfallen? Dann statt der Leistung (Fristsetzung nötig). Ist er endgültig eingetreten? Dann neben der Leistung (keine Fristsetzung)." },
      { f: "Die Fristsetzung wird übergangen.", w: "§ 281 I BGB gibt dem Schuldner das Recht zur zweiten Andienung. Ohne Frist und ohne einen Fall des § 281 II BGB besteht der Anspruch nicht – das ist einer der häufigsten Klausurfehler überhaupt." },
      { f: "§ 280 I 2 BGB wird als Anspruchsvoraussetzung geprüft.", w: "Die Norm regelt nur die Beweislast. Im Gutachten heißt das: Vertretenmüssen wird vermutet, zu prüfen ist allein, ob der Sachverhalt Entlastungstatsachen hergibt." },
    ],
    vertiefung: [
      { t: "§ 311a II BGB", x: "Bei anfänglicher Unmöglichkeit gibt es keine Pflicht, die verletzt werden könnte – deshalb greift nicht § 283, sondern § 311a II. Anknüpfungspunkt des Vertretenmüssens ist dort nicht die Nichtleistung, sondern die Kenntnis oder das Kennenmüssen des Leistungshindernisses bei Vertragsschluss." },
      { t: "Schutzpflichtverletzung, § 282", x: "Wird eine Pflicht aus § 241 II BGB so verletzt, dass dem Gläubiger die Leistung durch den Schuldner nicht mehr zuzumuten ist, kann er Schadensersatz statt der Leistung verlangen – ohne Fristsetzung, aber mit dem Merkmal der Unzumutbarkeit, das eine Gesamtabwägung verlangt." },
      { t: "Verhältnis zum Rücktritt", x: "Rücktritt und Schadensersatz statt der Leistung schließen sich seit 2002 nicht mehr aus, § 325 BGB. Der Gläubiger kann zurücktreten und zusätzlich seinen Schaden verlangen; er muss sich dann aber die ersparte Gegenleistung anrechnen lassen." },
    ],
  },
  {
    k: "zivil1-unmoeglichkeit",
    kurz: "§ 275 BGB nimmt dem Schuldner die Leistungspflicht, wenn die Leistung unmöglich oder grob unverhältnismäßig ist – von Gesetzes wegen, ohne dass jemand etwas erklären müsste. Was mit der Gegenleistung passiert, sagt § 275 IV in Verbindung mit § 326 BGB.",
    mittel: [
      { t: "§ 275 I – echte Unmöglichkeit", x: "Die Leistung kann von niemandem erbracht werden (objektiv) oder jedenfalls nicht vom Schuldner (subjektiv, Unvermögen). Beides befreit. Zeitlich unterschieden wird zwischen anfänglicher (§ 311a) und nachträglicher Unmöglichkeit (§ 283)." },
      { t: "§ 275 II – praktische Unmöglichkeit", x: "Der Aufwand steht in einem groben Missverhältnis zum Leistungsinteresse des Gläubigers – der Ring auf dem Grund des Sees. Der Schuldner muss die Einrede erheben; bei der Abwägung ist zu berücksichtigen, ob er das Hindernis zu vertreten hat." },
      { t: "§ 275 III – persönliche Unzumutbarkeit", x: "Nur bei höchstpersönlich zu erbringenden Leistungen: Die Sängerin, deren Kind lebensgefährlich erkrankt ist. Auch dies ist eine Einrede." },
      { t: "Gefahrtragung, § 326", x: "Entfällt die Leistungspflicht, entfällt grundsätzlich auch der Gegenleistungsanspruch, § 326 I 1. Ausnahmen: § 326 II 1 Alt. 1 (der Gläubiger ist allein oder weit überwiegend verantwortlich) und Alt. 2 (Unmöglichkeit während des Annahmeverzugs) – dann bleibt die Gegenleistung geschuldet." },
      { t: "Gattungsschuld und Konkretisierung", x: "Bei der Gattungsschuld wird der Schuldner erst frei, wenn die ganze Gattung untergeht – oder wenn sich die Schuld nach § 243 II BGB auf ein konkretes Stück konkretisiert hat. Dafür muss er das seinerseits Erforderliche getan haben, was von Hol-, Bring- und Schickschuld abhängt." },
    ],
    beispiel: "V verkauft K ein bestimmtes Gemälde; vor Übergabe verbrennt es. Die Leistung ist objektiv unmöglich, V wird nach § 275 I BGB frei. Da keiner der Beteiligten es zu vertreten hat, entfällt auch der Kaufpreisanspruch, § 326 I 1 BGB.",
    gegenbeispiel: "V schuldet 100 Kisten Wein einer bestimmten Sorte; sein Lager brennt ab. Die Gattung besteht fort, also keine Unmöglichkeit – V muss sich am Markt eindecken. Erst wenn die ganze Sorte vernichtet wäre, griffe § 275 I BGB.",
    formulierung: "Der Anspruch könnte nach § 275 I BGB ausgeschlossen sein. Dann müsste die Leistung für den Schuldner oder für jedermann unmöglich geworden sein.",
    fallen: [
      { f: "§ 275 BGB wird als Einrede behandelt.", w: "Nur die Absätze II und III sind Einreden. Absatz I wirkt von selbst; der Anspruch erlischt, ohne dass sich jemand darauf berufen müsste." },
      { f: "Die Konkretisierung wird bei der Schickschuld schon mit der Aussonderung bejaht.", w: "Bei der Schickschuld hat der Schuldner das Erforderliche erst getan, wenn er die Sache einer geeigneten Transportperson übergeben hat. Die bloße Aussonderung im Lager genügt nicht." },
      { f: "§ 326 II BGB wird vergessen.", w: "Gerade der Annahmeverzug ist der klassische Klausurfall: Wer die Sache nicht abholt, trägt die Preisgefahr. Wer nur § 326 I prüft, kommt zum falschen Ergebnis." },
    ],
    vertiefung: [
      { t: "Stellvertretendes commodum, § 285", x: "Erlangt der Schuldner für den untergegangenen Gegenstand einen Ersatz – Versicherungsleistung, Schadensersatzanspruch gegen den Schädiger –, kann der Gläubiger dessen Herausgabe verlangen. Verlangt er es, bleibt er zur Gegenleistung verpflichtet, § 326 III BGB." },
      { t: "Preisgefahr beim Kauf, §§ 446, 447", x: "Die Preisgefahr geht mit Übergabe über, § 446. Beim Versendungskauf schon mit Übergabe an die Transportperson, § 447 – jedoch nicht beim Verbrauchsgüterkauf, § 475 II BGB, wo es beim Grundsatz des § 446 bleibt." },
      { t: "Zweckstörungen", x: "Von der Unmöglichkeit zu trennen sind Zweckfortfall und Zweckerreichung. Bleibt die Leistung möglich, ist sie zu erbringen; ist nur der Verwendungszweck entfallen, hilft allenfalls § 313 BGB (Störung der Geschäftsgrundlage), der Anpassung vor Auflösung vorsieht." },
    ],
  },
  {
    k: "zivil1-ruecktritt",
    kurz: "Der Rücktritt wandelt den Vertrag in ein Rückgewährschuldverhältnis um, § 346 I BGB. Er ist ein Gestaltungsrecht: Erklärung nach § 349, Grund aus § 323 (Pflichtverletzung) oder § 326 V (Unmöglichkeit) – und kein Verschulden nötig.",
    mittel: [
      { t: "Rücktrittsgrund", x: "Gesetzlich: § 323 I (fällige Leistung nicht oder nicht vertragsgemäß erbracht, Frist erfolglos), § 323 IV (vor Fälligkeit bei offensichtlichem Eintritt), § 326 V (Unmöglichkeit, ohne Frist), § 324 (Schutzpflichtverletzung). Oder vertraglich vereinbart." },
      { t: "Fristsetzung und ihre Entbehrlichkeit", x: "Regel: angemessene Frist. Entbehrlich nach § 323 II bei ernsthafter und endgültiger Erfüllungsverweigerung, beim relativen Fixgeschäft und bei besonderen Umständen unter Abwägung; im Kaufrecht ergänzend § 440 BGB." },
      { t: "Ausschluss, § 323 V und VI", x: "Bei Teilleistung nur Rücktritt vom ganzen Vertrag, wenn der Gläubiger kein Interesse an der Teilleistung hat, § 323 V 1. Bei unerheblicher Pflichtverletzung ist der Rücktritt ausgeschlossen, § 323 V 2 – die Erheblichkeitsschwelle liegt beim Sachmangel nach der Rechtsprechung regelmäßig bei rund fünf Prozent des Kaufpreises. Kein Rücktritt, wenn der Gläubiger weit überwiegend verantwortlich ist, § 323 VI." },
      { t: "Rechtsfolge", x: "Rückgewähr der empfangenen Leistungen und Herausgabe der Nutzungen, § 346 I. Ist Rückgewähr in Natur nicht möglich, tritt Wertersatz an ihre Stelle, § 346 II – mit den wichtigen Ausnahmen des § 346 III, insbesondere Nr. 3: Bei gesetzlichem Rücktrittsrecht entfällt der Wertersatz, wenn der Berechtigte die eigenübliche Sorgfalt gewahrt hat." },
      { t: "Rücktritt und Schadensersatz", x: "Beides ist nebeneinander möglich, § 325 BGB. Der Rücktritt beseitigt die Leistungspflichten, der Schadensersatz gleicht das Interesse aus." },
    ],
    beispiel: "K kauft ein Auto, das einen Getriebeschaden hat. K setzt V eine Frist zur Nachbesserung; V lässt sie verstreichen. K tritt zurück: § 437 Nr. 2, § 323 I BGB. Er gibt das Auto zurück, V den Kaufpreis; K muss die gezogenen Nutzungen ersetzen, also den Gebrauchsvorteil für die gefahrenen Kilometer.",
    gegenbeispiel: "Der Wagen hat lediglich einen kleinen Lackkratzer, dessen Beseitigung 120 Euro kostet, bei einem Kaufpreis von 20.000 Euro. Der Rücktritt ist nach § 323 V 2 BGB ausgeschlossen; K bleibt bei Nacherfüllung und Minderung.",
    formulierung: "K könnte wirksam vom Kaufvertrag zurückgetreten sein, §§ 437 Nr. 2, 323 I BGB. Dann müsste ein Rücktrittsgrund vorliegen, die Rücktrittserklärung abgegeben und der Rücktritt nicht ausgeschlossen sein.",
    fallen: [
      { f: "Der Rücktritt wird an einem Verschulden gemessen.", w: "Der Rücktritt ist verschuldensunabhängig – das ist sein entscheidender Unterschied zum Schadensersatz. Wer beim Rücktritt § 276 BGB prüft, hat die Systematik nicht erfasst." },
      { f: "§ 323 V 2 BGB wird übersehen.", w: "Die Erheblichkeitsschwelle ist eine der am häufigsten geprüften Weichen im Kaufrecht. Sie erfordert eine Abwägung, keine reine Prozentrechnung – Arglist macht jede Pflichtverletzung erheblich." },
      { f: "Nutzungsersatz wird vergessen.", w: "§ 346 I BGB verlangt die Herausgabe der gezogenen Nutzungen. Beim Fahrzeug ist das der zeitanteilige lineare Wertverzehr nach der Formel Kaufpreis mal gefahrene Kilometer geteilt durch die erwartete Restlaufleistung." },
    ],
    vertiefung: [
      { t: "Verbrauchsgüterkauf und Nutzungsersatz", x: "Der EuGH (Quelle, C-404/06) hat entschieden, dass der Verbraucher für die Nutzung einer im Wege der Nacherfüllung ersetzten Sache keinen Wertersatz schuldet. § 475 III 1 BGB setzt das um. Beim Rücktritt bleibt es dagegen beim Nutzungsersatz." },
      { t: "Widerruf statt Rücktritt", x: "Beim Verbrauchervertrag im Fernabsatz besteht ein Widerrufsrecht nach §§ 312g, 355 BGB. Es ist grundlos und fristgebunden, die Rechtsfolgen richten sich nach §§ 355 ff., 357 BGB – nicht nach § 346. Die Verwechslung ist ein klassischer Fehler in Verbraucherfällen." },
      { t: "Rücktritt vom Rücktritt", x: "Die Rücktrittserklärung ist als Gestaltungserklärung grundsätzlich unwiderruflich; das Rückgewährschuldverhältnis entsteht endgültig. Anfechtbar bleibt sie nach allgemeinen Regeln, und die Parteien können sich einvernehmlich anders einigen." },
    ],
  },
  {
    k: "zivil1-kaufrecht",
    kurz: "Das Kaufrecht hängt an einer einzigen Weiche: Lag bei Gefahrübergang ein Mangel vor? Wenn ja, öffnet § 437 BGB drei Türen – Nacherfüllung, Rücktritt oder Minderung, Schadensersatz. Und alle drei haben denselben Vorschalter: die Fristsetzung.",
    mittel: [
      { t: "Mangelbegriff, § 434 BGB", x: "Seit 2022 dreistufig: subjektive Anforderungen (vereinbarte Beschaffenheit, vorausgesetzte Verwendung, Zubehör), objektive Anforderungen (Eignung für die gewöhnliche Verwendung, übliche Beschaffenheit, Probe, Werbeaussagen) und Montageanforderungen. Die Ware muss allen dreien genügen – eine Abweichung von den objektiven Anforderungen ist beim Verbrauchsgüterkauf nur nach § 476 I 2 BGB wirksam abbedungen." },
      { t: "Gefahrübergang", x: "Maßgeblicher Zeitpunkt ist die Übergabe, § 446 BGB, beim Versendungskauf die Übergabe an die Transportperson, § 447 – außer beim Verbrauchsgüterkauf, § 475 II. Spätere Verschlechterungen sind kein Mangel." },
      { t: "Nacherfüllung, § 439", x: "Der Käufer wählt zwischen Nachbesserung und Nachlieferung. Der Verkäufer kann die gewählte Art verweigern, wenn sie nur mit unverhältnismäßigen Kosten möglich ist, § 439 IV. Die Aufwendungen der Nacherfüllung trägt der Verkäufer, § 439 II – einschließlich Ausbau- und Einbaukosten, § 439 III." },
      { t: "Rücktritt und Minderung", x: "Beides setzt eine erfolglose Fristsetzung voraus, §§ 437 Nr. 2, 323 I, 441. Die Minderung berechnet sich nach der Verhältnisformel des § 441 III: Der Kaufpreis wird im Verhältnis des mangelfreien zum mangelhaften Wert herabgesetzt. Anders als der Rücktritt ist die Minderung nicht durch § 323 V 2 ausgeschlossen – sie ist gerade der Weg für unerhebliche Mängel." },
      { t: "Verjährung, § 438", x: "Zwei Jahre ab Ablieferung, bei Bauwerken fünf Jahre, bei Arglist die Regelverjährung der §§ 195, 199 BGB. Beim Verbrauchsgüterkauf darf die Frist nicht unter zwei Jahre verkürzt werden, § 476 II." },
    ],
    beispiel: "K kauft einen Gebrauchtwagen mit zugesicherter Laufleistung von 60.000 Kilometern; tatsächlich sind es 160.000. Abweichung von der vereinbarten Beschaffenheit, § 434 II 1 Nr. 1 BGB – Sachmangel. Nach erfolgloser Frist kann K zurücktreten, und weil V es wusste, auch anfechten nach § 123 BGB.",
    gegenbeispiel: "K kauft denselben Wagen ausdrücklich „gekauft wie gesehen, unter Ausschluss jeder Gewährleistung“ und entdeckt später Rost am Unterboden. Der Haftungsausschluss greift – außer bei Arglist, § 444 BGB, und außer beim Verbrauchsgüterkauf, § 476 I.",
    formulierung: "Die Kaufsache müsste bei Gefahrübergang mangelhaft gewesen sein. Ein Sachmangel liegt vor, wenn die Sache nicht den subjektiven, den objektiven und den Montageanforderungen des § 434 BGB entspricht.",
    fallen: [
      { f: "Die Vermutungsfrist des § 477 BGB wird noch mit sechs Monaten angegeben.", w: "Seit dem 1. Januar 2022 beträgt sie ein Jahr; sechs Monate gelten nur noch für lebende Tiere. Die Norm verschiebt nur die Beweislast für den Zeitpunkt, nicht für den Mangel selbst." },
      { f: "Vor dem Gefahrübergang wird der Mangelbegriff geprüft.", w: "Ohne Gefahrübergang kein Mängelrecht, sondern allgemeines Leistungsstörungsrecht: Vor Übergabe gilt § 433 I 2 BGB und damit der Erfüllungsanspruch." },
      { f: "§ 437 BGB wird als Anspruchsgrundlage zitiert.", w: "§ 437 BGB ist eine Rechtsgrundverweisung auf die genannten Vorschriften. Der Obersatz lautet deshalb „§§ 437 Nr. 3, 280 I, III, 281 BGB“, nicht „§ 437 Nr. 3 BGB“." },
    ],
    vertiefung: [
      { t: "Aliud und Zuweniglieferung", x: "§ 434 V BGB stellt die Lieferung einer anderen Sache und die Zuweniglieferung dem Sachmangel gleich. Damit gilt das Mängelrecht, nicht das allgemeine Leistungsstörungsrecht – wichtig für Verjährung und Fristsetzung." },
      { t: "Weiterfresserschaden", x: "Beschädigt ein Mangel die Kaufsache selbst weiter (das mangelhafte Bauteil zerstört die Maschine), stellt sich die Frage nach § 823 I BGB. Der BGH bejaht eine Eigentumsverletzung, wenn der Mangel zunächst auf einen abgrenzbaren Teil beschränkt war und sich die „Stoffgleichheit“ mit dem Mangelunwert verneinen lässt – praktisch bedeutsam wegen der längeren Deliktsverjährung." },
      { t: "Regress in der Lieferkette", x: "§§ 445a, 445b BGB geben dem Verkäufer Rückgriff gegen seinen Lieferanten ohne eigene Fristsetzung, mit Ablaufhemmung der Verjährung. Beim Verbrauchsgüterkauf sind diese Vorschriften nach § 478 BGB zwingend." },
    ],
  },
  {
    k: "zivil1-schadensrecht",
    kurz: "Das Schadensrecht beantwortet nicht das Ob, sondern das Wie viel. Grundsatz ist die Naturalrestitution nach § 249 I BGB, Maßstab die Differenzhypothese: Vermögenslage mit dem Ereignis, verglichen mit der Lage ohne es.",
    mittel: [
      { t: "Naturalrestitution und Geldersatz", x: "§ 249 I: Herstellung des Zustands, der ohne das Ereignis bestünde. § 249 II 1: Bei Personen- und Sachschäden kann der Gläubiger stattdessen den erforderlichen Geldbetrag verlangen. § 251: Geldentschädigung, wenn Herstellung unmöglich oder ungenügend ist oder unverhältnismäßige Aufwendungen erfordert." },
      { t: "Haftungsausfüllende Kausalität und Zurechnung", x: "Zwischen der Rechtsgutsverletzung und dem Schaden muss Kausalität bestehen. Zugerechnet wird nur, was vom Schutzzweck der verletzten Norm erfasst ist und nicht dem allgemeinen Lebensrisiko zuzuordnen ist." },
      { t: "Vorteilsausgleichung", x: "Vorteile, die adäquat kausal auf dem Schadensereignis beruhen, sind anzurechnen, wenn dies dem Zweck des Ersatzanspruchs entspricht und den Schädiger nicht unbillig entlastet – etwa „neu für alt“, nicht dagegen Leistungen einer Summenversicherung." },
      { t: "Mitverschulden, § 254", x: "Absatz 1: Mitwirkung bei der Entstehung. Absatz 2: Verletzung der Warn- und Schadensminderungspflicht. Rechtsfolge ist eine Quotelung nach Verursachungs- und Verschuldensanteilen; § 254 II 2 rechnet das Verschulden des Erfüllungsgehilfen zu." },
      { t: "Immaterieller Schaden", x: "Nur, soweit das Gesetz es anordnet, § 253 I. § 253 II gewährt Schmerzensgeld bei Verletzung von Körper, Gesundheit, Freiheit und sexueller Selbstbestimmung – bei jeder Haftungsnorm, also auch bei Vertrags- und Gefährdungshaftung." },
    ],
    beispiel: "Nach einem Unfall lässt der Geschädigte sein Auto für 4.000 Euro reparieren, obwohl der Wiederbeschaffungswert 5.000 Euro beträgt. Das ist Naturalrestitution nach § 249 II 1 BGB und bleibt unterhalb der Opfergrenze – erstattungsfähig.",
    gegenbeispiel: "Die Reparatur würde 9.000 Euro kosten. Nun greift § 251 II BGB: Die Aufwendungen sind unverhältnismäßig, geschuldet ist der Wiederbeschaffungsaufwand. Die Rechtsprechung lässt eine 130-Prozent-Grenze zu, wenn der Geschädigte das Fahrzeug tatsächlich repariert und weiter nutzt.",
    formulierung: "Der ersatzfähige Schaden bestimmt sich nach der Differenzhypothese: zu vergleichen ist die tatsächliche Vermögenslage des Geschädigten mit derjenigen, die ohne das schädigende Ereignis bestünde.",
    fallen: [
      { f: "Haftungsbegründende und haftungsausfüllende Kausalität werden vermischt.", w: "Die haftungsbegründende Kausalität führt zur Rechtsgutsverletzung und unterliegt dem Strengbeweis des § 286 ZPO; die haftungsausfüllende führt zum Schaden und unterliegt der Beweiserleichterung des § 287 ZPO. Das ist kein Formalismus, sondern entscheidet Prozesse." },
      { f: "Mitverschulden wird nur beim Schadensersatzanspruch geprüft.", w: "§ 254 BGB gilt für jeden Schadensersatzanspruch, auch für vertragliche und für Gefährdungshaftung. Er ist im Gutachten regelmäßig ein eigener Prüfungspunkt am Ende." },
      { f: "Schmerzensgeld wird nur bei § 823 BGB gewährt.", w: "§ 253 II BGB ist eine allgemeine Rechtsfolgennorm und gilt auch bei Vertragsverletzung – etwa bei der ärztlichen Behandlung im Rahmen des Behandlungsvertrags, §§ 630a ff. BGB." },
    ],
    vertiefung: [
      { t: "Drittschadensliquidation", x: "Anspruch und Schaden fallen zufällig auseinander – typisch bei mittelbarer Stellvertretung, obligatorischer Gefahrentlastung und Obhutsfällen. Der Anspruchsinhaber kann den fremden Schaden geltend machen; der Geschädigte kann Abtretung nach § 285 BGB analog verlangen. Abzugrenzen vom Vertrag mit Schutzwirkung zugunsten Dritter, der dem Dritten einen eigenen Anspruch gibt." },
      { t: "Frustrierte Aufwendungen", x: "Aufwendungen, die sich nur wegen der Pflichtverletzung als nutzlos erweisen, sind kein Schaden nach der Differenzhypothese – sie wären ohnehin angefallen. § 284 BGB gibt hier einen Anspruch wahlweise statt des Schadensersatzes statt der Leistung." },
      { t: "Kommerzialisierungsgedanke", x: "Der Nutzungsausfall bei Sachen wird ersetzt, wenn es sich um Güter handelt, auf deren ständige Verfügbarkeit die eigenwirtschaftliche Lebenshaltung typischerweise angewiesen ist – Kraftfahrzeug ja, Schwimmbad nein. Der Große Senat hat daraus eine enge Ausnahme gemacht, keine Regel." },
    ],
  },
  {
    k: "zivil1-eigentumserwerb",
    kurz: "Eigentum an beweglichen Sachen geht über durch Einigung und Übergabe, § 929 S. 1 BGB. Alles Weitere sind Ersatzformen der Übergabe (§§ 929 S. 2, 930, 931) oder Ersatzformen der Berechtigung – der gutgläubige Erwerb nach §§ 932 ff.",
    mittel: [
      { t: "Einigung", x: "Dinglicher Vertrag über den Eigentumsübergang, streng getrennt vom Verpflichtungsgeschäft (Trennungsprinzip) und in seiner Wirksamkeit davon unabhängig (Abstraktionsprinzip). Die Einigung muss im Zeitpunkt der Übergabe noch bestehen." },
      { t: "Übergabe und ihre Surrogate", x: "§ 929 S. 1: vollständiger Besitzverlust des Veräußerers und Besitzerwerb des Erwerbers. § 929 S. 2: brevi manu traditio, der Erwerber hat die Sache schon. § 930: Besitzkonstitut, der Veräußerer bleibt Besitzmittler – das ist die Grundlage der Sicherungsübereignung. § 931: Abtretung des Herausgabeanspruchs." },
      { t: "Berechtigung", x: "Der Veräußerer muss Eigentümer sein oder mit Zustimmung des Eigentümers handeln, § 185 BGB. Fehlt die Berechtigung, hilft nur der gutgläubige Erwerb." },
      { t: "Gutgläubiger Erwerb, §§ 932 ff.", x: "Voraussetzungen: Rechtsgeschäft im Sinne eines Verkehrsgeschäfts, Rechtsschein (Besitz des Veräußerers), guter Glaube an das Eigentum – ausgeschlossen bei Kenntnis und grober Fahrlässigkeit, § 932 II – und kein Abhandenkommen, § 935. Bei § 933 muss die Übergabe tatsächlich nachgeholt werden, bei § 934 genügt die Abtretung beziehungsweise der Besitzerwerb." },
      { t: "§ 935 – Abhandenkommen", x: "Gestohlene, verlorene oder sonst ohne Willen des unmittelbaren Besitzers abhanden gekommene Sachen können nicht gutgläubig erworben werden. Ausnahme: Geld, Inhaberpapiere und öffentliche Versteigerung, § 935 II." },
    ],
    beispiel: "V übereignet K sein Auto durch Einigung und Übergabe, § 929 S. 1 BGB. Dass der zugrunde liegende Kaufvertrag wegen Geschäftsunfähigkeit nichtig ist, ändert am Eigentumsübergang nichts – das Abstraktionsprinzip. Rückabgewickelt wird über § 812 I 1 Alt. 1 BGB.",
    gegenbeispiel: "D stiehlt das Auto und verkauft es an den gutgläubigen K. Kein Erwerb: § 935 I BGB sperrt den gutgläubigen Erwerb bei abhandengekommenen Sachen. V bleibt Eigentümer und kann nach § 985 BGB herausverlangen.",
    formulierung: "K könnte nach § 929 S. 1 BGB Eigentum erworben haben. Dazu müssten sich V und K über den Eigentumsübergang geeinigt haben, die Sache übergeben worden und V berechtigt gewesen sein.",
    fallen: [
      { f: "Verpflichtungs- und Verfügungsgeschäft werden zusammengezogen.", w: "Das Trennungsprinzip ist der Kern des deutschen Sachenrechts. Wer „durch den Kaufvertrag ist K Eigentümer geworden“ schreibt, disqualifiziert sich im Sachenrecht sofort." },
      { f: "Der gute Glaube wird auf die Verfügungsbefugnis bezogen.", w: "§ 932 BGB schützt nur den guten Glauben an das Eigentum, nicht an die Verfügungsbefugnis. Die Ausnahme ist § 366 HGB für den Handelsverkehr." },
      { f: "Der Eigentumsvorbehalt wird als aufschiebend bedingte Übergabe behandelt.", w: "Bedingt ist die Einigung, nicht die Übergabe, § 449 I in Verbindung mit § 158 I BGB. Der Käufer hat bis zur Zahlung nur ein Anwartschaftsrecht." },
    ],
    vertiefung: [
      { t: "Anwartschaftsrecht", x: "Das wesensgleiche Minus zum Eigentum: Es entsteht beim Eigentumsvorbehalt mit der bedingten Einigung, ist übertragbar nach §§ 929 ff. analog, pfändbar und nach § 823 I BGB geschützt. Beim Zwischenverfügungsschutz greift § 161 I BGB." },
      { t: "Verlängerter Eigentumsvorbehalt", x: "Der Vorbehaltskäufer wird zur Weiterveräußerung ermächtigt (§ 185) und tritt die künftigen Kaufpreisforderungen im Voraus ab. Konfliktfeld ist die Kollision mit der Globalzession der Bank – nach der Rechtsprechung ist die Globalzession sittenwidrig, soweit sie den Lieferanten knebelt, wenn sie keine dingliche Teilverzichtsklausel enthält." },
      { t: "Geheißerwerb", x: "Übergabe im Sinne des § 929 BGB verlangt keinen Durchgangserwerb: Der Veräußerer kann einen Dritten anweisen, unmittelbar an den Erwerber zu leisten. Für den gutgläubigen Erwerb ist dann entscheidend, wem der Erwerber den Besitzerwerb zurechnet – die sogenannte Geheißperson vermittelt den Rechtsschein." },
    ],
  },
  {
    k: "zivil1-ebv",
    kurz: "Das Eigentümer-Besitzer-Verhältnis regelt, was gilt, wenn jemand eine fremde Sache ohne Recht zum Besitz hat: § 985 gibt die Herausgabe, §§ 987 ff. regeln Nutzungen, Schadensersatz und Verwendungen – und sperren dabei das Delikts- und Bereicherungsrecht.",
    mittel: [
      { t: "Vindikationslage", x: "Der Anspruchsteller ist Eigentümer, der Anspruchsgegner Besitzer, und dieser hat kein Recht zum Besitz, § 986 BGB. Nur wenn diese Lage besteht, gelten die §§ 987 ff. – das ist die Eintrittskarte in das ganze System." },
      { t: "Die Typen des Besitzers", x: "Redlicher unverklagter Besitzer: geschützt, § 993 I Hs. 2 – keine Haftung für Nutzungen und Schäden. Verklagter oder bösgläubiger Besitzer: §§ 987, 989, 990 – Nutzungsherausgabe und Schadensersatz. Deliktischer Besitzer: § 992 – volle Deliktshaftung. Unentgeltlicher Erwerber: § 988." },
      { t: "Verwendungen, §§ 994 ff.", x: "Notwendige Verwendungen sind dem redlichen Besitzer zu ersetzen, § 994 I; dem bösgläubigen nur nach Geschäftsführungsrecht, § 994 II. Nützliche Verwendungen erhält nur der redliche unverklagte Besitzer, und nur soweit der Wert noch besteht, § 996. Gesichert wird der Anspruch durch das Zurückbehaltungsrecht des § 1000." },
      { t: "Die Sperrwirkung", x: "§ 993 I Hs. 2 BGB schließt Ansprüche aus Delikt und Bereicherung aus. Der Grund: Der redliche Besitzer, der sich für den Eigentümer hält, soll nicht schlechter stehen als ein Eigentümer. Ausnahmen sind § 992 (deliktischer Besitzer) und der Fremdbesitzerexzess." },
      { t: "Nach Rückgabe", x: "Endet die Vindikationslage, bleiben die entstandenen Ansprüche bestehen. Für die Zeit danach gelten wieder die allgemeinen Regeln." },
    ],
    beispiel: "K hat gutgläubig ein gestohlenes Fahrrad gekauft und fährt damit ein Jahr lang. E verlangt Herausgabe nach § 985 BGB. Nutzungsersatz für das Jahr schuldet K nicht: Er war redlich und unverklagt, § 993 I Hs. 2 BGB.",
    gegenbeispiel: "K erfährt nach sechs Monaten von der Herkunft und fährt weiter. Ab diesem Zeitpunkt ist er bösgläubig; für die zweite Hälfte schuldet er Nutzungsherausgabe nach §§ 990 I, 987 BGB und haftet nach §§ 990, 989 für Schäden.",
    formulierung: "Der Anspruch setzt eine Vindikationslage voraus: E müsste Eigentümer, B Besitzer und B dem E gegenüber nicht zum Besitz berechtigt sein, §§ 985, 986 BGB.",
    fallen: [
      { f: "Die §§ 987 ff. werden geprüft, ohne zuvor die Vindikationslage festzustellen.", w: "Ohne Vindikationslage gibt es kein EBV, sondern nur die allgemeinen Regeln. Die Prüfung beginnt deshalb immer bei § 985 BGB." },
      { f: "Die Sperrwirkung wird übersehen.", w: "Wer nach dem EBV noch § 823 oder § 812 prüft, ohne § 993 I Hs. 2 BGB zu erwähnen, zeigt, dass er das System nicht kennt. Die Sperre ist der eigentliche Prüfungsstoff." },
      { f: "Der Fremdbesitzerexzess wird übersehen.", w: "Wer sein Besitzrecht überschreitet – der Mieter, der das Auto zerstört –, kann sich nicht auf den Schutz des redlichen Besitzers berufen. Nach herrschender Meinung haftet er nach Deliktsrecht, weil er hinsichtlich der Überschreitung nicht schutzwürdig ist." },
    ],
    vertiefung: [
      { t: "Nicht-so-berechtigter Besitzer", x: "Wer ein Besitzrecht hat, es aber überschreitet, steht zwischen den Stühlen. Die herrschende Meinung wendet die §§ 987 ff. analog an, soweit die Überschreitung reicht, und lässt im Übrigen das Besitzrecht bestehen." },
      { t: "§ 988 BGB und der rechtsgrundlose Erwerb", x: "Wortlaut: unentgeltlicher Erwerb. Die herrschende Meinung wendet die Norm analog auf den rechtsgrundlosen Erwerb an, weil der Erwerber sonst besser stünde als der Beschenkte. Die Gegenansicht will stattdessen § 812 BGB unmittelbar anwenden und hält die Sperrwirkung insoweit für teleologisch reduziert." },
      { t: "Verwendungsbegriff", x: "Verwendung ist jede Vermögensaufwendung, die der Sache zugutekommt. Streitig ist, ob auch grundlegende Umgestaltungen erfasst sind: Die Rechtsprechung verlangt, dass die Sache in ihrer Substanz erhalten bleibt (enger Verwendungsbegriff); die Literatur lässt teils jede werterhöhende Aufwendung genügen." },
    ],
  },
  {
    k: "zivil1-deliktsrecht",
    kurz: "§ 823 I BGB schützt eine abschließende Liste von Rechten und Rechtsgütern. Geprüft wird in drei Stufen: Rechtsgutsverletzung, Verletzungshandlung samt haftungsbegründender Kausalität, Rechtswidrigkeit und Verschulden. Reine Vermögensschäden sind nicht erfasst – dafür gibt es § 823 II und § 826.",
    mittel: [
      { t: "Rechtsgutsverletzung", x: "Leben, Körper, Gesundheit, Freiheit, Eigentum und sonstige Rechte. „Sonstiges Recht“ meint absolute Rechte mit Zuweisungsgehalt und Ausschlussfunktion – Anwartschaftsrecht, Besitz, Persönlichkeitsrecht, Recht am eingerichteten und ausgeübten Gewerbebetrieb. Nicht dazu gehört das Vermögen als solches." },
      { t: "Verletzungshandlung und Kausalität", x: "Handlung ist jedes willensgetragene Verhalten; beim Unterlassen ist eine Rechtspflicht zum Handeln erforderlich, insbesondere aus Verkehrssicherungspflicht. Kausalität nach der Äquivalenztheorie, korrigiert durch Adäquanz und Schutzzweck der Norm." },
      { t: "Rechtswidrigkeit", x: "Bei unmittelbaren Verletzungen wird sie durch den Erfolg indiziert. Bei mittelbaren Verletzungen und Unterlassen ist sie positiv festzustellen, und zwar über die Verletzung einer Verkehrspflicht. Rechtfertigungsgründe: §§ 227 bis 229 BGB, § 904, Einwilligung." },
      { t: "Verschulden", x: "Vorsatz oder Fahrlässigkeit, § 276 II BGB, mit objektiviertem Maßstab nach Verkehrskreisen. Deliktsfähigkeit nach §§ 827, 828 BGB, für Kinder im Straßenverkehr erst ab zehn Jahren, § 828 II." },
      { t: "§ 823 II und § 826", x: "§ 823 II: Verstoß gegen ein Schutzgesetz, das gerade den Verletzten und das verletzte Interesse schützen soll – erfasst auch reine Vermögensschäden. § 826: vorsätzliche sittenwidrige Schädigung, Auffangtatbestand für besonders verwerfliches Verhalten." },
    ],
    beispiel: "Der Gastwirt streut bei Glatteis nicht; ein Gast stürzt und bricht sich den Arm. Gesundheitsverletzung durch Unterlassen, Verkehrssicherungspflicht verletzt, damit rechtswidrig, Fahrlässigkeit gegeben – § 823 I BGB.",
    gegenbeispiel: "Der Wirt sagt fahrlässig eine Reservierung ab, der Gast verliert dadurch ein Geschäft. Reiner Vermögensschaden ohne Rechtsgutsverletzung – § 823 I BGB greift nicht. In Betracht kommen nur vertragliche Ansprüche oder § 826 BGB.",
    formulierung: "A könnte gegen B einen Anspruch aus § 823 I BGB haben. Dazu müsste B ein von § 823 I BGB geschütztes Rechtsgut des A widerrechtlich und schuldhaft verletzt haben.",
    fallen: [
      { f: "Das Vermögen wird als sonstiges Recht behandelt.", w: "§ 823 I BGB ist bewusst enumerativ. Das Vermögen ist kein absolutes Recht – der Gesetzgeber wollte gerade keine allgemeine Vermögenshaftung aus Fahrlässigkeit." },
      { f: "Bei Unterlassen wird die Rechtswidrigkeit indiziert.", w: "Die Erfolgsindikation gilt nur bei unmittelbaren positiven Verletzungshandlungen. Beim Unterlassen und bei mittelbaren Verletzungen ist die Verkehrspflichtverletzung das eigentliche Prüfungsprogramm." },
      { f: "§ 823 II BGB wird ohne Prüfung des Schutzzwecks bejaht.", w: "Nicht jede Norm ist ein Schutzgesetz. Nötig ist, dass sie individualschützend ist und dass der konkret Verletzte sowie die Art des Schadens in ihren Schutzbereich fallen." },
    ],
    vertiefung: [
      { t: "Produzentenhaftung", x: "Der BGH kehrt die Beweislast für Konstruktions-, Fabrikations- und Instruktionsfehler um: Steht die Fehlerhaftigkeit im Herrschaftsbereich des Herstellers fest, muss dieser sich entlasten. Daneben steht die verschuldensunabhängige Haftung nach dem ProdHaftG mit ihrem Selbstbehalt und den Haftungshöchstgrenzen." },
      { t: "Allgemeines Persönlichkeitsrecht", x: "Als Rahmenrecht aus Art. 1 I, 2 I GG entwickelt. Die Rechtswidrigkeit ist durch Güter- und Interessenabwägung positiv festzustellen; Sphärentheorie (Intim-, Privat-, Sozialsphäre) und die Kriterien der Caroline-Rechtsprechung geben die Struktur. Geldentschädigung nicht nach § 253 II, sondern unmittelbar aus Art. 1 I, 2 I GG bei schwerwiegender Verletzung und fehlender anderweitiger Genugtuung." },
      { t: "Haftung für Verrichtungsgehilfen, § 831", x: "Eigene Haftung des Geschäftsherrn für vermutetes Auswahl- und Überwachungsverschulden, mit Exkulpationsmöglichkeit nach § 831 I 2. Das unterscheidet die Norm von § 278 BGB, der kein eigenes Verschulden verlangt und keine Entlastung kennt – der Hauptgrund, warum die Vertragshaftung im Gutachten regelmäßig weiter reicht." },
    ],
  },
  {
    k: "zivil1-bereicherungsrecht",
    kurz: "Das Bereicherungsrecht korrigiert Vermögensverschiebungen ohne Rechtsgrund. Erste und wichtigste Frage: Ist etwas durch Leistung erlangt oder in sonstiger Weise? Davon hängt alles Weitere ab – die Kondiktionsart, die Parteien und die Einwendungen.",
    mittel: [
      { t: "Leistungskondiktion, § 812 I 1 Alt. 1", x: "Etwas erlangt – durch Leistung, also durch bewusste und zweckgerichtete Mehrung fremden Vermögens – ohne Rechtsgrund. Die Leistungsbeziehung bestimmt, wer von wem kondiziert: Gekondiziert wird immer innerhalb des Leistungsverhältnisses." },
      { t: "Nichtleistungskondiktion, § 812 I 1 Alt. 2", x: "Eingriffskondiktion (Eingriff in den Zuweisungsgehalt eines fremden Rechts), Rückgriffskondiktion, Verwendungskondiktion. Sie ist gegenüber der Leistungskondiktion subsidiär: Was der Empfänger durch Leistung eines anderen erlangt hat, kann ein Dritter nicht kondizieren." },
      { t: "Weitere Tatbestände", x: "§ 812 I 2 Alt. 1: späterer Wegfall des Rechtsgrundes (condictio ob causam finitam). § 812 I 2 Alt. 2: Zweckverfehlung. § 813: Leistung trotz dauernder Einrede. § 817: Verstoß gegen Gesetz oder gute Sitten, mit der Kondiktionssperre des § 817 S. 2." },
      { t: "Umfang, §§ 818, 819", x: "Herausgabe des Erlangten samt Nutzungen und Surrogaten, § 818 I; bei Unmöglichkeit Wertersatz, § 818 II. Zentrale Begrenzung ist der Wegfall der Bereicherung, § 818 III. Ab Kenntnis vom Mangel oder Rechtshängigkeit haftet der Empfänger verschärft nach §§ 818 IV, 819, 292 BGB – dann ist § 818 III versperrt." },
      { t: "Dreipersonenverhältnisse", x: "Grundregel: Jeder kondiziert in seinem Leistungsverhältnis. In der Anweisungslage (Anweisender, Angewiesener, Empfänger) ist maßgeblich, wem die Zuwendung aus Sicht des Empfängers zuzurechnen ist. Fehlt die Anweisung, fehlt eine Leistung des Angewiesenen – dann Direktkondiktion." },
    ],
    beispiel: "K zahlt den Kaufpreis, obwohl der Kaufvertrag wegen Geschäftsunfähigkeit nichtig ist. K hat an V geleistet, ohne Rechtsgrund – Rückforderung nach § 812 I 1 Alt. 1 BGB.",
    gegenbeispiel: "D verkauft und übereignet dem gutgläubigen K das Fahrrad des E. E kann von K nicht kondizieren: K hat durch Leistung des D erlangt, sodass die Nichtleistungskondiktion des E subsidiär ist. E kondiziert den Erlös bei D, § 816 I 1 BGB.",
    formulierung: "V könnte gegen K einen Anspruch auf Rückzahlung aus § 812 I 1 Alt. 1 BGB haben. Dazu müsste K etwas durch Leistung des V ohne rechtlichen Grund erlangt haben.",
    fallen: [
      { f: "Die Subsidiarität der Nichtleistungskondiktion wird übersehen.", w: "Sie ist der Schlüssel aller Dreipersonenfälle. Wer sie nicht benennt, löst Anweisungsfälle zwangsläufig falsch, weil er Durchgriffskondiktionen zulässt, die das Gesetz gerade vermeiden will." },
      { f: "„Etwas erlangt“ wird ungenau bestimmt.", w: "Erlangt ist nicht „der Kaufpreis“, sondern konkret „Eigentum und Besitz an den Geldscheinen“ oder „die Befreiung von einer Verbindlichkeit“. Nur die präzise Bestimmung trägt später § 818 II und III." },
      { f: "§ 818 III BGB wird beim bösgläubigen Empfänger angewandt.", w: "Ab Kenntnis oder Rechtshängigkeit gilt die verschärfte Haftung, §§ 818 IV, 819 I BGB. Der Entreicherungseinwand ist dann ausgeschlossen." },
    ],
    vertiefung: [
      { t: "Saldotheorie", x: "Bei gegenseitigen nichtigen Verträgen werden die Kondiktionen nicht isoliert, sondern saldiert – wer die Sache zurückgibt, bekommt nur den Saldo. Damit wird verhindert, dass § 818 III einseitig zulasten einer Partei wirkt. Ausnahmen: Minderjährige, arglistig Getäuschte und Fälle des § 817 S. 2 – dort gilt die Zweikondiktionentheorie, weil der Schutzzweck sonst leerliefe." },
      { t: "§ 816 I 1 und 2 BGB", x: "Verfügt ein Nichtberechtigter wirksam, schuldet er dem Berechtigten das Erlangte. Streitig ist, ob das der Erlös oder nur der objektive Wert ist – die herrschende Meinung gibt den gesamten Erlös, weil sonst der Nichtberechtigte den Gewinn behielte. Bei unentgeltlicher Verfügung haftet nach § 816 I 2 der Erwerber unmittelbar." },
      { t: "§ 817 S. 2 BGB", x: "Wer selbst gegen Gesetz oder gute Sitten verstößt, kann nicht zurückfordern. Die Norm wird eng ausgelegt, weil sie sonst rechtswidrige Zustände zementiert: Der BGH hat sie bei Schwarzarbeit angewandt (Werklohn und Rückforderung ausgeschlossen), bei Darlehen zur Finanzierung sittenwidriger Geschäfte dagegen teleologisch reduziert." },
    ],
  },
];

const OEFF_1 = [
  {
    k: "oeff1-oeff-methodik",
    kurz: "Die öffentlich-rechtliche Klausur hat eine feste Reihenfolge: erst die richtige Verfahrensart, dann Zulässigkeit, dann Begründetheit – und in der Begründetheit erst formelle, dann materielle Rechtmäßigkeit. Wer die Reihenfolge kennt, hat die halbe Klausur.",
    mittel: [
      { t: "Verfahrensart zuerst", x: "Sie bestimmt alles Weitere. Was begehrt der Kläger? Aufhebung eines belastenden Verwaltungsakts (Anfechtungsklage), Erlass eines begünstigenden (Verpflichtungsklage), sonstiges Tun oder Unterlassen (allgemeine Leistungsklage), Feststellung (§ 43 VwGO), Normenkontrolle (§ 47 VwGO)." },
      { t: "Zulässigkeit", x: "Rechtsweg (§ 40 VwGO), Statthaftigkeit, Klagebefugnis (§ 42 II), Vorverfahren (§ 68), Frist (§ 74), Beteiligten- und Prozessfähigkeit, richtiger Beklagter (§ 78), Zuständigkeit, Rechtsschutzbedürfnis." },
      { t: "Formelle Rechtmäßigkeit", x: "Zuständigkeit (sachlich, örtlich, instanziell), Verfahren (Anhörung nach § 28 VwVfG, Mitwirkung anderer Behörden) und Form (§ 37 VwVfG, Begründung nach § 39). Fehler können nach §§ 45, 46 VwVfG geheilt oder unbeachtlich sein – das ist fast immer der Schwerpunkt." },
      { t: "Materielle Rechtmäßigkeit", x: "Ermächtigungsgrundlage, deren Tatbestandsvoraussetzungen, Rechtsfolge einschließlich Ermessen (§ 40 VwVfG, § 114 VwGO) und Verhältnismäßigkeit. Bei Grundrechten: Schutzbereich, Eingriff, verfassungsrechtliche Rechtfertigung – in dieser Reihenfolge, nie vermischt." },
      { t: "Vorbehalt und Vorrang des Gesetzes", x: "Art. 20 III GG. Vorrang: Die Verwaltung darf nicht gegen geltendes Recht verstoßen. Vorbehalt: Für Eingriffe in Freiheit und Eigentum sowie für alles Wesentliche braucht sie eine gesetzliche Grundlage. Die Ermächtigungsgrundlage ist deshalb der erste Prüfungspunkt der materiellen Rechtmäßigkeit, nicht der letzte." },
    ],
    beispiel: "Der Bürger wehrt sich gegen eine Nutzungsuntersagung. Statthaft ist die Anfechtungsklage, § 42 I Alt. 1 VwGO, weil eine belastende Regelung mit Außenwirkung aufgehoben werden soll. Erst danach stellt sich die Frage nach Bauordnungsrecht und Ermessen.",
    gegenbeispiel: "Derselbe Bürger will eine Baugenehmigung erhalten. Hier hilft die Anfechtungsklage nicht, auch wenn ein Ablehnungsbescheid vorliegt: Statthaft ist die Verpflichtungsklage in Gestalt der Versagungsgegenklage – der Ablehnungsbescheid wird dabei mit aufgehoben, ist aber nicht das Ziel.",
    formulierung: "Die Klage ist zulässig, wenn der Verwaltungsrechtsweg eröffnet ist und die übrigen Sachentscheidungsvoraussetzungen vorliegen. Der Verwaltungsrechtsweg ist nach § 40 I 1 VwGO eröffnet, wenn eine öffentlich-rechtliche Streitigkeit nichtverfassungsrechtlicher Art vorliegt, die nicht ausdrücklich einem anderen Gericht zugewiesen ist.",
    fallen: [
      { f: "Formelle und materielle Rechtmäßigkeit werden vermischt.", w: "Die Anhörung gehört zur formellen, die Verhältnismäßigkeit zur materiellen Rechtmäßigkeit. Wer beides in einem Block prüft, verliert die Heilungs- und Unbeachtlichkeitsvorschriften der §§ 45, 46 VwVfG aus dem Blick." },
      { f: "Die Ermächtigungsgrundlage wird erst am Ende gesucht.", w: "Ohne Ermächtigungsgrundlage ist der belastende Verwaltungsakt bereits rechtswidrig – das folgt aus dem Vorbehalt des Gesetzes. Sie steht am Anfang der materiellen Prüfung." },
      { f: "Der Bearbeitervermerk wird nicht gelesen.", w: "Er ist die oberste Arbeitsanweisung: Er kann Landesrecht vorgeben, die Zulässigkeit als gegeben unterstellen oder eine bestimmte Verfahrensart verlangen. Wer daran vorbeischreibt, verliert Punkte unabhängig von der Qualität." },
    ],
    vertiefung: [
      { t: "Abgrenzung öffentliches und privates Recht", x: "Modifizierte Subjektstheorie (Sonderrechtstheorie): Öffentlich-rechtlich ist eine Norm, die einen Träger öffentlicher Gewalt gerade in dieser Eigenschaft berechtigt oder verpflichtet. Daneben Subordinations- und Interessentheorie, die aber jeweils zu eng sind. Maßgeblich ist die Natur des Rechtsverhältnisses, nicht die Bezeichnung durch die Beteiligten." },
      { t: "Zwei-Stufen-Theorie", x: "Bei der Vergabe öffentlicher Leistungen wird zwischen dem Ob (öffentlich-rechtlich, Verwaltungsakt) und dem Wie (regelmäßig privatrechtlich, Vertrag) getrennt. Praktisch wichtig für Subventionen und die Nutzung öffentlicher Einrichtungen – der Rechtsweg spaltet sich entsprechend auf." },
      { t: "§ 46 VwVfG und seine Grenze", x: "Ein Verfahrens- oder Formfehler führt nicht zur Aufhebung, wenn offensichtlich ist, dass er die Entscheidung in der Sache nicht beeinflusst hat. Bei Ermessensentscheidungen ist das praktisch nie der Fall, weil eine andere Entscheidung stets denkbar bleibt. Die Norm ist damit im Kern auf gebundene Entscheidungen beschränkt." },
    ],
  },
  {
    k: "oeff1-verwaltungsakt",
    kurz: "Der Verwaltungsakt ist der Schlüsselbegriff des Verwaltungsrechts, weil an ihm die Klageart, die Bestandskraft und die Vollstreckbarkeit hängen. § 35 S. 1 VwVfG nennt fünf Merkmale: hoheitliche Maßnahme einer Behörde auf dem Gebiet des öffentlichen Rechts zur Regelung eines Einzelfalls mit unmittelbarer Außenwirkung.",
    mittel: [
      { t: "Behörde und Hoheitlichkeit", x: "Behörde im funktionellen Sinne, § 1 IV VwVfG: jede Stelle, die Aufgaben der öffentlichen Verwaltung wahrnimmt – auch Beliehene. Hoheitlich meint einseitiges Handeln in Über-Unterordnung, im Gegensatz zum öffentlich-rechtlichen Vertrag." },
      { t: "Regelung", x: "Die Maßnahme muss auf eine unmittelbare Rechtsfolge gerichtet sein: Ge- oder Verbot, Gestaltung, Feststellung. Keine Regelung sind Realakte (Abschleppen, Auskunft, Warnung), vorbereitende Maßnahmen und bloße Hinweise." },
      { t: "Einzelfall", x: "Konkret-individuell. Abzugrenzen von der Rechtsnorm (abstrakt-generell) und der Allgemeinverfügung, § 35 S. 2 VwVfG: konkret-generell (Versammlungsauflösung), sachbezogen (Verkehrszeichen) oder benutzungsregelnd." },
      { t: "Unmittelbare Außenwirkung", x: "Die Maßnahme muss die Rechtsstellung eines Rechtssubjekts außerhalb der Verwaltung berühren. Verwaltungsinterne Weisungen und Mitwirkungsakte anderer Behörden haben sie nicht – anders beim besonderen Gewaltverhältnis, das als solches nicht mehr anerkannt ist." },
      { t: "Nebenbestimmungen, § 36 VwVfG", x: "Befristung, Bedingung, Widerrufsvorbehalt, Auflage, Auflagenvorbehalt. Bei gebundenen Verwaltungsakten nur zulässig, wenn das Gesetz es erlaubt oder sie die Voraussetzungen sichern sollen, § 36 I; bei Ermessensverwaltungsakten nach pflichtgemäßem Ermessen, § 36 II." },
    ],
    beispiel: "Die Bauaufsichtsbehörde untersagt die Nutzung eines Gebäudes. Hoheitliche Maßnahme, öffentlich-rechtlich, Regelung eines Einzelfalls, unmittelbare Außenwirkung – Verwaltungsakt nach § 35 S. 1 VwVfG. Statthaft ist deshalb die Anfechtungsklage.",
    gegenbeispiel: "Die Behörde lässt ein verkehrswidrig geparktes Fahrzeug abschleppen. Das Abschleppen selbst ist Realakt ohne Regelungscharakter – Verwaltungsakt war allenfalls die vorausgehende (auch konkludente) Wegfahraufforderung. Gegen die Kosten geht es per Anfechtungsklage, gegen den Vollzug per allgemeiner Leistungs- oder Feststellungsklage.",
    formulierung: "Die Maßnahme müsste ein Verwaltungsakt sein. Ein Verwaltungsakt ist nach § 35 S. 1 VwVfG jede Verfügung, Entscheidung oder andere hoheitliche Maßnahme, die eine Behörde zur Regelung eines Einzelfalls auf dem Gebiet des öffentlichen Rechts trifft und die auf unmittelbare Rechtswirkung nach außen gerichtet ist.",
    fallen: [
      { f: "Der Realakt wird zum Verwaltungsakt erklärt.", w: "Es fehlt die Regelung. Der Unterschied entscheidet über die Klageart und über § 80 VwGO – gegen Realakte gibt es keinen Suspensiveffekt, sondern § 123 VwGO." },
      { f: "Nebenbestimmungen werden pauschal isoliert angefochten.", w: "Nach der Rechtsprechung ist die isolierte Anfechtung bei allen Nebenbestimmungen statthaft; ob sie Erfolg hat, ist eine Frage der Begründetheit, nämlich der Teilbarkeit. Die früher verbreitete Trennung nach Auflage und modifizierender Auflage ist überholt." },
      { f: "Die Bekanntgabe wird übersehen.", w: "Ein Verwaltungsakt wird erst mit Bekanntgabe wirksam, § 43 I VwVfG. Davon hängen Fristbeginn und Bestandskraft ab; § 41 VwVfG regelt die Zugangsfiktion von drei Tagen." },
    ],
    vertiefung: [
      { t: "Nichtigkeit, § 44 VwVfG", x: "Ein Verwaltungsakt ist nichtig bei besonders schwerwiegendem und offensichtlichem Fehler (Absatz 1) sowie in den absoluten Fällen des Absatzes 2. Absatz 3 nennt Fehler, die gerade nicht zur Nichtigkeit führen – vor allem die örtliche Unzuständigkeit. Rechtsfolge: Der Verwaltungsakt ist von Anfang an unwirksam, § 43 III; statthaft ist trotzdem die Anfechtungsklage (Wahlrecht mit der Nichtigkeitsfeststellungsklage nach § 43 VwGO)." },
      { t: "Rücknahme und Widerruf, §§ 48, 49 VwVfG", x: "§ 48 betrifft rechtswidrige, § 49 rechtmäßige Verwaltungsakte. Bei begünstigenden Verwaltungsakten ist der Vertrauensschutz das Zentrum: § 48 II für Geldleistungen mit Vertrauenstatbestand und Abwägung, § 48 III mit Vermögensnachteilsausgleich. Die Jahresfrist des § 48 IV beginnt nach dem Großen Senat erst mit voller Kenntnis aller Tatsachen, nicht mit Kenntnis der Rechtswidrigkeit." },
      { t: "Verwaltungsakt mit Drittwirkung", x: "Die Baugenehmigung begünstigt den Bauherrn und belastet den Nachbarn. Für den Nachbarn ist die Anfechtungsklage statthaft, seine Klagebefugnis folgt aus drittschützenden Normen (Abstandsflächen, § 15 BauNVO, Gebot der Rücksichtnahme). § 80a VwGO regelt den vorläufigen Rechtsschutz in dieser Dreieckslage." },
    ],
  },
  {
    k: "oeff1-rechtsweg",
    kurz: "§ 40 I 1 VwGO eröffnet den Verwaltungsrechtsweg für öffentlich-rechtliche Streitigkeiten nichtverfassungsrechtlicher Art, soweit keine aufdrängende oder abdrängende Sonderzuweisung besteht. Die eigentliche Arbeit steckt in der Abgrenzung von öffentlichem und privatem Recht.",
    mittel: [
      { t: "Aufdrängende Sonderzuweisungen zuerst", x: "Gibt es eine Norm, die den Rechtsweg ausdrücklich eröffnet – etwa § 54 BeamtStG, § 126 BBG, § 6 UZwGBw –, ist die Prüfung beendet. Erst wenn keine besteht, geht es zur Generalklausel." },
      { t: "Öffentlich-rechtliche Streitigkeit", x: "Maßgeblich ist die Natur des Rechtsverhältnisses, aus dem der Anspruch hergeleitet wird. Modifizierte Subjektstheorie: Die streitentscheidende Norm muss einen Träger öffentlicher Gewalt gerade als solchen berechtigen oder verpflichten." },
      { t: "Nichtverfassungsrechtlich", x: "Doppelte Verfassungsunmittelbarkeit: Streiten Verfassungsorgane über Verfassungsrecht, ist es eine verfassungsrechtliche Streitigkeit und beim BVerfG oder Landesverfassungsgericht angesiedelt. Der Bürger, der sich auf Grundrechte beruft, streitet dagegen nicht verfassungsrechtlich." },
      { t: "Abdrängende Sonderzuweisungen", x: "Art. 34 S. 3 GG (Amtshaftung zu den Zivilgerichten), § 40 II VwGO (Aufopferung, enteignungsgleicher Eingriff, öffentlich-rechtliche Verwahrung), § 23 EGGVG (Justizverwaltungsakte), §§ 51 SGG, 33 FGO." },
      { t: "Bindungswirkung", x: "Ist der Rechtsweg eröffnet, entscheidet das Gericht den Rechtsstreit unter allen rechtlichen Gesichtspunkten, § 17 II 1 GVG – mit Ausnahme der in Art. 34 S. 3 GG genannten Ansprüche. Bei Unzuständigkeit wird verwiesen, § 17a II GVG." },
    ],
    beispiel: "Ein Student klagt gegen die Exmatrikulation. Streitentscheidend ist das Hochschulgesetz, das die Universität als Trägerin öffentlicher Gewalt verpflichtet – öffentlich-rechtliche Streitigkeit, keine Sonderzuweisung, Verwaltungsrechtsweg nach § 40 I 1 VwGO.",
    gegenbeispiel: "Derselbe Student verlangt Schadensersatz, weil ein Beamter der Universität ihn bei einer Amtshandlung verletzt hat. Für den Amtshaftungsanspruch aus § 839 BGB in Verbindung mit Art. 34 GG sind nach Art. 34 S. 3 GG die ordentlichen Gerichte zuständig – trotz öffentlich-rechtlicher Natur.",
    formulierung: "Der Verwaltungsrechtsweg ist nach § 40 I 1 VwGO eröffnet, wenn eine öffentlich-rechtliche Streitigkeit nichtverfassungsrechtlicher Art vorliegt und diese nicht durch Bundesgesetz einem anderen Gericht ausdrücklich zugewiesen ist.",
    fallen: [
      { f: "Die Sonderzuweisungen werden vergessen.", w: "Art. 34 S. 3 GG und § 40 II VwGO sind der häufigste Fehler bei Staatshaftungsfällen. Der Folgenbeseitigungsanspruch bleibt dagegen beim Verwaltungsgericht – er ist kein Ersatzanspruch." },
      { f: "Die Abgrenzung wird nach dem Handelnden statt nach der Norm vorgenommen.", w: "Auch die Behörde kann privatrechtlich handeln (fiskalische Hilfsgeschäfte, erwerbswirtschaftliche Betätigung). Umgekehrt kann der Beliehene hoheitlich handeln. Entscheidend ist die streitentscheidende Norm." },
      { f: "Der Rechtsweg wird mit der Zuständigkeit verwechselt.", w: "Der Rechtsweg beantwortet, welche Gerichtsbarkeit; die Zuständigkeit, welches Gericht innerhalb dieser Gerichtsbarkeit (§§ 45 ff. VwGO). Beides sind eigene Prüfungspunkte." },
    ],
    vertiefung: [
      { t: "Kommunale Einrichtungen", x: "Klassischer Fall der Zwei-Stufen-Theorie: Der Anspruch auf Zulassung zur Stadthalle (das Ob) ist öffentlich-rechtlich und wird per Verpflichtungsklage verfolgt; die Ausgestaltung des Nutzungsverhältnisses (das Wie) kann privatrechtlich sein. Bei rein privatrechtlicher Ausgestaltung bleibt der Zulassungsanspruch dennoch öffentlich-rechtlich, weil § 10 II GemO ihn gewährt." },
      { t: "Verwaltungsprivatrecht", x: "Nimmt die Verwaltung öffentliche Aufgaben in privatrechtlicher Form wahr, bleibt sie an Grundrechte und Gleichbehandlung gebunden. Der Rechtsweg richtet sich gleichwohl nach der gewählten Form – zu den Zivilgerichten. Das ist der Preis der Formenwahlfreiheit." },
      { t: "Streit über den Rechtsweg im Gutachten", x: "Bei gemischten Sachverhalten ist § 17 II GVG der Schlüssel: Das zuständige Gericht entscheidet unter allen Gesichtspunkten. In der Klausur genügt deshalb regelmäßig die Feststellung des Schwerpunkts – mit einer sauberen Ausnahme für Art. 34 S. 3 GG." },
    ],
  },
  {
    k: "oeff1-anfechtungsklage",
    kurz: "Die Anfechtungsklage ist die Standardklage gegen belastende Verwaltungsakte, § 42 I Alt. 1 VwGO. Ihr Ziel ist die Aufhebung. Begründet ist sie, wenn der Verwaltungsakt rechtswidrig ist und den Kläger dadurch in seinen Rechten verletzt, § 113 I 1 VwGO.",
    mittel: [
      { t: "Statthaftigkeit", x: "Es muss ein Verwaltungsakt vorliegen, der noch nicht erledigt ist. Bei Erledigung geht es zur Fortsetzungsfeststellungsklage, § 113 I 4 VwGO." },
      { t: "Klagebefugnis, § 42 II VwGO", x: "Die Möglichkeit einer eigenen Rechtsverletzung. Beim Adressaten belastender Verwaltungsakte folgt sie schon aus Art. 2 I GG – Adressatentheorie. Beim Dritten bedarf es einer drittschützenden Norm nach der Schutznormtheorie." },
      { t: "Vorverfahren und Frist", x: "Widerspruch nach §§ 68 ff. VwGO, soweit das Landesrecht es nicht abgeschafft hat; Frist ein Monat ab Bekanntgabe, § 70. Klagefrist ein Monat ab Zustellung des Widerspruchsbescheids, § 74 I. Bei fehlender oder unrichtiger Rechtsbehelfsbelehrung ein Jahr, § 58 II." },
      { t: "Begründetheit", x: "Der Verwaltungsakt ist rechtswidrig, wenn die Ermächtigungsgrundlage fehlt oder ihre Voraussetzungen nicht vorliegen oder die Rechtsfolge fehlerhaft gesetzt wurde. Zusätzlich verlangt § 113 I 1 VwGO die Verletzung subjektiver Rechte des Klägers – die objektive Rechtswidrigkeit genügt nicht." },
      { t: "Maßgeblicher Zeitpunkt", x: "Grundsätzlich die letzte Behördenentscheidung, also der Widerspruchsbescheid. Ausnahmen bei Dauerverwaltungsakten (Zeitpunkt der mündlichen Verhandlung) und wenn das materielle Recht anderes vorgibt." },
    ],
    beispiel: "Der Gaststättenbetreiber klagt gegen den Widerruf seiner Erlaubnis. Verwaltungsakt, Adressat, Widerspruch erfolglos, Monatsfrist gewahrt – zulässig. Begründet, wenn der Widerruf rechtswidrig ist, was ihn als Adressat zugleich in seinen Rechten verletzt.",
    gegenbeispiel: "Ein Anwohner klagt gegen dieselbe Erlaubnis eines Nachbarn, weil ihn der Lärm stört. Er ist nicht Adressat; seine Klagebefugnis hängt davon ab, ob die Vorschriften über den Immissionsschutz gerade auch ihn schützen. Ohne drittschützende Norm ist die Klage bereits unzulässig.",
    formulierung: "Die Anfechtungsklage ist begründet, soweit der Verwaltungsakt rechtswidrig und der Kläger dadurch in seinen Rechten verletzt ist, § 113 I 1 VwGO.",
    fallen: [
      { f: "Die Rechtsverletzung wird nicht eigenständig geprüft.", w: "§ 113 I 1 VwGO verlangt beides. Bei Drittklagen ist gerade die Rechtsverletzung der Schwerpunkt: Der Verwaltungsakt kann objektiv rechtswidrig sein, ohne den Nachbarn in eigenen Rechten zu verletzen." },
      { f: "Die Klagebefugnis wird mit der Begründetheit verwechselt.", w: "In der Zulässigkeit genügt die Möglichkeit einer Rechtsverletzung – sie darf nur nicht offensichtlich und eindeutig ausgeschlossen sein. Wer dort schon durchprüft, schreibt die Klausur zweimal." },
      { f: "Das Vorverfahren wird ungeprüft angenommen.", w: "Mehrere Länder haben es weitgehend abgeschafft. Die Klausur nennt das anwendbare Landesrecht; wer dazu nichts sagt, verliert einen sicheren Punkt." },
    ],
    vertiefung: [
      { t: "Fortsetzungsfeststellungsklage", x: "Erledigt sich der Verwaltungsakt nach Klageerhebung, gilt § 113 I 4 VwGO unmittelbar; bei Erledigung vor Klageerhebung wendet die herrschende Meinung die Norm analog an. Das besondere Feststellungsinteresse kann sich aus Wiederholungsgefahr, Rehabilitationsinteresse, Präjudizialität für einen Amtshaftungsprozess oder – bei tiefgreifenden Grundrechtseingriffen – aus dem Gebot effektiven Rechtsschutzes ergeben." },
      { t: "Schutznormtheorie", x: "Eine Norm ist drittschützend, wenn sie nicht nur dem Allgemeininteresse dient, sondern zumindest auch dem Schutz individueller Interessen eines abgrenzbaren Personenkreises. Typische Beispiele im Baurecht: Abstandsflächen, § 15 I 2 BauNVO, Festsetzungen über die Art der baulichen Nutzung (Gebietserhaltungsanspruch) und das Gebot der Rücksichtnahme." },
      { t: "§ 113 I 2 VwGO", x: "Ist der Verwaltungsakt bereits vollzogen, kann der Kläger die Rückgängigmachung beantragen – der Vollzugsfolgenbeseitigungsanspruch im Gewand einer prozessualen Annexentscheidung. Das erspart einen zweiten Prozess und wird in Klausuren gern übersehen." },
    ],
  },
  {
    k: "oeff1-verpflichtungsklage",
    kurz: "Mit der Verpflichtungsklage erstreitet man einen begünstigenden Verwaltungsakt, § 42 I Alt. 2 VwGO. Sie hat zwei Gestalten: Versagungsgegenklage nach einem Ablehnungsbescheid und Untätigkeitsklage nach § 75 VwGO. Die Rechtsfolge steht in § 113 V VwGO – Verpflichtung oder Bescheidung.",
    mittel: [
      { t: "Zwei Gestalten", x: "Versagungsgegenklage: Die Behörde hat abgelehnt; der Ablehnungsbescheid wird zusammen mit der Verpflichtung aufgehoben. Untätigkeitsklage: Die Behörde hat nicht entschieden; § 75 VwGO erlaubt die Klage nach drei Monaten ohne zureichenden Grund, ohne Vorverfahren." },
      { t: "Klagebefugnis", x: "Der Kläger muss möglicherweise einen Anspruch auf den Verwaltungsakt haben. Bei gebundenen Entscheidungen folgt das aus der Anspruchsnorm, bei Ermessensentscheidungen aus dem Anspruch auf ermessensfehlerfreie Entscheidung." },
      { t: "Begründetheit, § 113 V VwGO", x: "Satz 1: Ist die Sache spruchreif und besteht ein Anspruch, verurteilt das Gericht zum Erlass. Satz 2: Ist sie nicht spruchreif – typischerweise bei Ermessen oder Beurteilungsspielraum –, ergeht ein Bescheidungsurteil unter Beachtung der Rechtsauffassung des Gerichts." },
      { t: "Spruchreife", x: "Sie fehlt, wenn der Behörde noch Entscheidungsspielraum zusteht. Bei Ermessensreduzierung auf null wird sie wieder hergestellt: Dann gibt es nur eine rechtmäßige Entscheidung, und das Gericht verpflichtet unmittelbar." },
      { t: "Maßgeblicher Zeitpunkt", x: "Hier kommt es – anders als bei der Anfechtungsklage – regelmäßig auf die letzte mündliche Verhandlung an. Der Kläger will einen Verwaltungsakt für die Zukunft; eine zwischenzeitliche Rechtsänderung wirkt sich deshalb aus." },
    ],
    beispiel: "Der Bauherr klagt auf Erteilung der Baugenehmigung. § 75 BauO gewährt bei Vorliegen der Voraussetzungen einen gebundenen Anspruch. Sind alle Voraussetzungen erfüllt, ist die Sache spruchreif, und das Gericht verpflichtet zur Erteilung, § 113 V 1 VwGO.",
    gegenbeispiel: "Der Beamte klagt auf Beförderung. Der Dienstherr hat einen Beurteilungsspielraum bei der Eignungsbewertung; die Sache ist nicht spruchreif. Das Gericht kann nur zur Neubescheidung verpflichten, § 113 V 2 VwGO – auf die Beförderung selbst besteht kein Anspruch.",
    formulierung: "Die Verpflichtungsklage ist begründet, soweit die Ablehnung rechtswidrig und der Kläger dadurch in seinen Rechten verletzt ist und er einen Anspruch auf den begehrten Verwaltungsakt hat, § 113 V 1 VwGO.",
    fallen: [
      { f: "Es wird nur die Aufhebung des Ablehnungsbescheids beantragt.", w: "Damit erreicht der Kläger nichts: Die Behörde könnte erneut ablehnen. Der Antrag muss auf Verpflichtung gerichtet sein; die Aufhebung ist nur die Kehrseite." },
      { f: "Die Spruchreife wird nicht geprüft.", w: "Sie entscheidet über Verpflichtungs- oder Bescheidungsurteil und damit über den Tenor. Bei Ermessen ist ein Verpflichtungsurteil ohne Ermessensreduzierung auf null ein Verstoß gegen die Gewaltenteilung." },
      { f: "Bei Untätigkeit wird das Vorverfahren verlangt.", w: "§ 75 S. 1 VwGO stellt die Klage gerade abweichend von § 68 VwGO frei. Die Dreimonatsfrist des § 75 S. 2 ist eine Sachurteilsvoraussetzung, die bis zur letzten mündlichen Verhandlung nachgeholt werden kann." },
    ],
    vertiefung: [
      { t: "Ermessensreduzierung auf null", x: "Sie kommt in Betracht, wenn Grundrechte betroffen sind und jede andere Entscheidung unverhältnismäßig wäre, bei Selbstbindung der Verwaltung über Art. 3 I GG und Verwaltungsvorschriften oder bei einer Zusicherung nach § 38 VwVfG. Im Polizeirecht ist sie der Standardfall des Anspruchs auf Einschreiten bei erheblicher Gefahr für Leben und Gesundheit." },
      { t: "Beurteilungsspielraum", x: "Anders als das Ermessen betrifft er die Tatbestandsseite. Anerkannt bei Prüfungsentscheidungen, beamtenrechtlichen Beurteilungen, Entscheidungen weisungsfreier Gremien und prognostischen Entscheidungen mit hoher Komplexität. Die gerichtliche Kontrolle beschränkt sich auf Verfahrensfehler, Verkennung des Begriffs, unrichtigen Sachverhalt und sachfremde Erwägungen." },
      { t: "Konkurrentenklage", x: "Beim Streit um eine Stelle oder eine begrenzte Zulassung hilft die Verpflichtungsklage allein nicht: Der Bewerber muss zusätzlich verhindern, dass die Stelle besetzt wird. Deshalb § 123 VwGO – der Anspruch aus Art. 33 II GG auf ein faires Auswahlverfahren wird im Eilverfahren gesichert; nach Ernennung greift der Grundsatz der Ämterstabilität." },
    ],
  },
  {
    k: "oeff1-eilrechtsschutz",
    kurz: "Zwei Wege, streng nach der Hauptsache getrennt: Geht es gegen einen Verwaltungsakt, ist § 80 V VwGO einschlägig; geht es um alles andere, § 123 VwGO. § 123 V VwGO ordnet diesen Vorrang ausdrücklich an.",
    mittel: [
      { t: "Die Weiche", x: "Wäre in der Hauptsache die Anfechtungsklage statthaft, ist es § 80 V VwGO (bei Drittbeteiligung § 80a). Wäre es die Verpflichtungs-, Leistungs- oder Feststellungsklage, ist es § 123 VwGO. Die Ausnahme: Bei der Verpflichtungssituation mit vorangegangener Ablehnung greift § 80 V nicht, weil die Ablehnung keinen vollziehbaren Inhalt hat." },
      { t: "§ 80 V VwGO", x: "Statthaft, wenn Widerspruch oder Anfechtungsklage keine aufschiebende Wirkung haben – also in den Fällen des § 80 II. Das Gericht ordnet die aufschiebende Wirkung an (§ 80 II 1 Nr. 1 bis 3a) oder stellt sie wieder her (§ 80 II 1 Nr. 4). Maßstab ist eine Interessenabwägung, in die die Erfolgsaussichten der Hauptsache als wichtigster Faktor einfließen." },
      { t: "§ 123 VwGO", x: "Sicherungsanordnung (Absatz 1 Satz 1) zur Erhaltung des bestehenden Zustands, Regelungsanordnung (Satz 2) zur vorläufigen Regelung. Voraussetzungen: Anordnungsanspruch und Anordnungsgrund, beide glaubhaft zu machen, § 123 III VwGO in Verbindung mit § 920 II ZPO." },
      { t: "Verbot der Vorwegnahme der Hauptsache", x: "Das Eilverfahren darf die Hauptsache grundsätzlich nicht vorwegnehmen. Ausnahme, wenn sonst schwere und unzumutbare Nachteile drohen und der Antrag hohe Erfolgsaussichten hat – dann verlangt Art. 19 IV GG die Ausnahme." },
      { t: "Formelle Anforderungen an § 80 II 1 Nr. 4", x: "Die Anordnung der sofortigen Vollziehung braucht eine schriftliche, auf den Einzelfall bezogene Begründung, § 80 III VwGO. Formelhafte Wendungen genügen nicht. Das Gericht prüft diesen Punkt eigenständig vor der Interessenabwägung." },
    ],
    beispiel: "Die Behörde untersagt den Gaststättenbetrieb und ordnet die sofortige Vollziehung an. Der Betreiber beantragt nach § 80 V 1 Alt. 2 VwGO die Wiederherstellung der aufschiebenden Wirkung. Das Gericht prüft zuerst § 80 III, dann die Erfolgsaussichten der Anfechtungsklage.",
    gegenbeispiel: "Ein Student will vorläufig zum Studium zugelassen werden. In der Hauptsache wäre die Verpflichtungsklage statthaft; § 80 V VwGO hilft nicht, weil die Ablehnung nichts vollzieht. Richtig ist ein Antrag auf Erlass einer einstweiligen Anordnung nach § 123 I 2 VwGO.",
    formulierung: "Der Antrag ist nach § 80 V 1 Alt. 2 VwGO statthaft, weil die Behörde die sofortige Vollziehung des Verwaltungsakts nach § 80 II 1 Nr. 4 VwGO angeordnet hat und dem Widerspruch deshalb keine aufschiebende Wirkung zukommt.",
    fallen: [
      { f: "§ 80 V und § 123 VwGO werden verwechselt.", w: "§ 123 V VwGO ordnet den Vorrang des § 80 V an. Wer den falschen Weg wählt, hat einen unzulässigen Antrag – die Klausur ist an dieser Stelle regelmäßig entschieden." },
      { f: "§ 80 III VwGO wird übergangen.", w: "Der Begründungsmangel führt allein zur Aufhebung der Vollziehungsanordnung, ohne dass es auf die Erfolgsaussichten ankäme. Er ist der schnellste Weg zum Erfolg des Antrags und wird deshalb häufig eingebaut." },
      { f: "Im Rahmen des § 123 VwGO wird nur der Anordnungsanspruch geprüft.", w: "Der Anordnungsgrund – die besondere Eilbedürftigkeit – ist eine eigenständige Voraussetzung. Ohne ihn bleibt es beim Hauptsacheverfahren, auch wenn der Anspruch besteht." },
    ],
    vertiefung: [
      { t: "Anfechtungsklage des Nachbarn und § 80a", x: "In der Dreieckslage – Baugenehmigung für den Bauherrn, Widerspruch des Nachbarn – hat der Widerspruch nach § 212a I BauGB keine aufschiebende Wirkung. Der Nachbar beantragt nach §§ 80a III, 80 V VwGO deren Anordnung; das Gericht wägt das Interesse des Bauherrn an der Bauausführung gegen das Interesse des Nachbarn ab." },
      { t: "Gegenstand der Interessenabwägung", x: "Herrschend ist die Orientierung an den Erfolgsaussichten: Ist die Klage offensichtlich erfolgreich, überwiegt das Aussetzungsinteresse; ist sie offensichtlich aussichtslos, das Vollzugsinteresse. Nur bei offenem Ausgang folgt eine reine Folgenabwägung. Bei gesetzlich angeordnetem Sofortvollzug (§ 80 II 1 Nr. 1 bis 3) hat der Gesetzgeber die Abwägung bereits vorstrukturiert." },
      { t: "Hängebeschluss", x: "Droht die Vollziehung noch vor der Entscheidung über den Eilantrag, kann das Gericht einen Zwischenbeschluss erlassen – ungeschrieben, aber aus Art. 19 IV GG abgeleitet. In der Anwaltsklausur gehört der entsprechende Antrag zum Pflichtprogramm." },
    ],
  },
  {
    k: "oeff1-rechtmaessigkeit-va",
    kurz: "Ein Verwaltungsakt ist rechtmäßig, wenn eine Ermächtigungsgrundlage besteht, er formell und materiell rechtmäßig ist. Formell heißt Zuständigkeit, Verfahren, Form; materiell heißt Tatbestand erfüllt, Rechtsfolge fehlerfrei gesetzt, verhältnismäßig.",
    mittel: [
      { t: "Ermächtigungsgrundlage", x: "Für belastende Verwaltungsakte zwingend, Art. 20 III GG. Sie muss selbst verfassungsgemäß sein – bei Zweifeln ist das inzident zu prüfen, bei nachkonstitutionellen Parlamentsgesetzen mit dem Vorbehalt des Art. 100 I GG." },
      { t: "Formelle Rechtmäßigkeit", x: "Zuständigkeit: sachlich (welche Art Behörde), örtlich (§ 3 VwVfG), instanziell. Verfahren: Anhörung nach § 28 VwVfG, Mitwirkung Dritter, Beteiligung von Ausschüssen. Form: grundsätzlich formfrei, § 37 II VwVfG, mit Begründungspflicht bei schriftlichen Verwaltungsakten, § 39." },
      { t: "Heilung und Unbeachtlichkeit", x: "§ 45 VwVfG heilt Verfahrens- und Formfehler bis zum Abschluss der letzten Tatsacheninstanz – die unterbliebene Anhörung kann nachgeholt werden. § 46 VwVfG macht Fehler unbeachtlich, wenn offensichtlich ist, dass sie die Entscheidung nicht beeinflusst haben; bei Ermessen greift das praktisch nie." },
      { t: "Materielle Rechtmäßigkeit", x: "Tatbestandsvoraussetzungen der Ermächtigungsgrundlage, einschließlich unbestimmter Rechtsbegriffe (voll überprüfbar, außer bei Beurteilungsspielraum). Dann die Rechtsfolge: gebunden oder Ermessen." },
      { t: "Ermessen, § 40 VwVfG und § 114 VwGO", x: "Drei Fehlerarten: Ermessensnichtgebrauch (die Behörde erkennt ihr Ermessen nicht), Ermessensüberschreitung (sie wählt eine nicht vorgesehene Rechtsfolge) und Ermessensfehlgebrauch (sachfremde Erwägungen, Verstoß gegen den Zweck der Ermächtigung oder gegen Grundrechte). Hinzu kommt die Verhältnismäßigkeit als Grenze jeder Ermessensausübung." },
    ],
    beispiel: "Die Behörde untersagt eine Nutzung, ohne den Betroffenen anzuhören. Verfahrensfehler nach § 28 I VwVfG – aber heilbar nach § 45 I Nr. 3 VwVfG durch Nachholung bis zum Abschluss der ersten Instanz, § 45 II.",
    gegenbeispiel: "Dieselbe Behörde hat die Anhörung nachgeholt, aber ihr Ermessen überhaupt nicht erkannt und die Untersagung für zwingend gehalten. Das ist Ermessensnichtgebrauch und weder heilbar noch nach § 46 VwVfG unbeachtlich – der Verwaltungsakt ist rechtswidrig.",
    formulierung: "Der Verwaltungsakt ist formell rechtmäßig, wenn die Behörde zuständig war, das vorgeschriebene Verfahren eingehalten und die Form gewahrt hat.",
    fallen: [
      { f: "§ 46 VwVfG wird bei Ermessensentscheidungen bejaht.", w: "Die Norm verlangt, dass offensichtlich keine andere Entscheidung in der Sache hätte getroffen werden können. Bei Ermessen bleibt eine andere Entscheidung stets denkbar – die Anwendung scheidet praktisch aus." },
      { f: "Die Verhältnismäßigkeit wird nur beim Ermessen geprüft.", w: "Sie ist Verfassungsrecht und bindet auch die gebundene Verwaltung – dort schlägt sie allerdings auf die Verfassungsmäßigkeit der Ermächtigungsgrundlage durch, nicht auf die Rechtsanwendung." },
      { f: "Nachgeschobene Ermessenserwägungen werden übersehen.", w: "§ 114 S. 2 VwGO erlaubt die Ergänzung im Prozess, nicht aber die erstmalige Ausübung oder den Austausch der tragenden Gründe. Die Grenze ist die Wesensänderung des Verwaltungsakts." },
    ],
    vertiefung: [
      { t: "Anhörung und § 28 II VwVfG", x: "Die Anhörung kann entbehrlich sein bei Gefahr im Verzug, bei Massenverfahren, bei Allgemeinverfügungen und bei Vollstreckungsmaßnahmen. Die Ausnahmen sind eng auszulegen; die Behörde trägt die Darlegungslast. Nachholung nach § 45 setzt voraus, dass sie ihre Funktion noch erfüllen kann – reine Formalität genügt nicht." },
      { t: "Umdeutung, § 47 VwVfG", x: "Ein fehlerhafter Verwaltungsakt kann in einen anderen umgedeutet werden, wenn dieser auf dasselbe Ziel gerichtet, in gleicher Verfahrensart und Form erlassbar und die Voraussetzungen erfüllt sind. Unzulässig, wenn die Rechtsfolge für den Betroffenen ungünstiger wäre oder eine Ermessensentscheidung in eine gebundene umgedeutet würde." },
      { t: "Verfassungsmäßigkeit der Ermächtigungsgrundlage", x: "Sie ist inzident zu prüfen, wenn der Sachverhalt Anlass gibt. Formelle Verfassungsmäßigkeit: Gesetzgebungskompetenz (Art. 70 ff. GG), Verfahren (Art. 76 ff.), Form. Materiell: Bestimmtheit, Verhältnismäßigkeit, Grundrechte, Zitiergebot des Art. 19 I 2 GG. Im Polizeirecht ist das Bestimmtheitsgebot bei Generalklauseln der Dauerbrenner." },
    ],
  },
  {
    k: "oeff1-grundrechte-allgemein",
    kurz: "Jede Freiheitsgrundrechtsprüfung hat drei Schritte: Schutzbereich, Eingriff, verfassungsrechtliche Rechtfertigung. Bei Gleichheitsrechten lautet sie: Ungleichbehandlung von wesentlich Gleichem, verfassungsrechtliche Rechtfertigung. Wer die beiden Schemata vermischt, verliert die Struktur.",
    mittel: [
      { t: "Schutzbereich", x: "Persönlich: Wer ist Grundrechtsträger? Deutschengrundrechte gelten nur für Deutsche im Sinne des Art. 116 GG, für EU-Bürger greift teils Art. 18 AEUV, sonst Art. 2 I GG. Juristische Personen nach Art. 19 III GG, soweit das Grundrecht wesensmäßig anwendbar ist. Sachlich: Welches Verhalten ist erfasst?" },
      { t: "Eingriff", x: "Klassischer Eingriffsbegriff: final, unmittelbar, rechtsförmig, mit Befehl und Zwang. Moderner Begriff: jedes staatliche Handeln, das dem Einzelnen ein grundrechtlich geschütztes Verhalten ganz oder teilweise unmöglich macht – erfasst auch mittelbare und faktische Beeinträchtigungen wie staatliche Warnungen oder Subventionen an Konkurrenten." },
      { t: "Schranken", x: "Einfacher Gesetzesvorbehalt (etwa Art. 8 II, 12 I 2 GG), qualifizierter Gesetzesvorbehalt (Art. 11 II, 13 GG), vorbehaltlose Grundrechte (Art. 4, 5 III, 9 III GG) – dort nur verfassungsimmanente Schranken: kollidierendes Verfassungsrecht, aufgelöst durch praktische Konkordanz." },
      { t: "Schranken-Schranken", x: "Das Gesetz muss formell verfassungsmäßig sein, dem Bestimmtheitsgebot genügen, das Zitiergebot des Art. 19 I 2 GG wahren, darf kein Einzelfallgesetz sein (Art. 19 I 1), muss den Wesensgehalt achten (Art. 19 II) – und vor allem verhältnismäßig sein." },
      { t: "Verhältnismäßigkeit", x: "Legitimer Zweck, Geeignetheit (Zweckförderung genügt), Erforderlichkeit (kein gleich wirksames, milderes Mittel), Angemessenheit (Abwägung zwischen Eingriffsintensität und Gewicht des verfolgten Zwecks). Die Angemessenheit ist der eigentliche Prüfungsstoff – hier wird der Fall entschieden." },
    ],
    beispiel: "Ein Versammlungsverbot greift in Art. 8 I GG ein. Schranke ist Art. 8 II GG für Versammlungen unter freiem Himmel; Schranken-Schranke ist die Verhältnismäßigkeit, die nach der Brokdorf-Entscheidung eine konkrete Gefahrenprognose verlangt und das Verbot als ultima ratio behandelt.",
    gegenbeispiel: "Eine staatliche Subvention an einen Konkurrenten verbietet niemandem etwas. Nach dem klassischen Eingriffsbegriff läge kein Eingriff vor; nach dem modernen Begriff kommt einer in Betracht, wenn die Maßnahme final auf die Marktposition wirkt und von erheblichem Gewicht ist – das ist der eigentliche Streitpunkt.",
    formulierung: "Der Eingriff in den Schutzbereich ist verfassungsrechtlich gerechtfertigt, wenn er auf einer verfassungsmäßigen gesetzlichen Grundlage beruht und die Grenzen der Schranken-Schranken wahrt, insbesondere verhältnismäßig ist.",
    fallen: [
      { f: "Die Verhältnismäßigkeit wird ohne konkrete Abwägung behauptet.", w: "Geeignetheit und Erforderlichkeit sind selten das Problem – die Angemessenheit ist es. Sie verlangt, die konkreten Belastungen und die konkreten Schutzgüter zu benennen und zu gewichten, nicht Leerformeln." },
      { f: "Bei vorbehaltlosen Grundrechten wird ein einfaches Gesetz als Schranke akzeptiert.", w: "Art. 4 I GG kennt keinen Gesetzesvorbehalt. Eingriffe sind nur zum Schutz kollidierenden Verfassungsrechts zulässig, und zwar durch ein Gesetz, das diese Kollision auflöst – nicht durch jedes beliebige Gesetz." },
      { f: "Art. 2 I GG wird geprüft, obwohl ein spezielleres Grundrecht einschlägig ist.", w: "Die allgemeine Handlungsfreiheit ist subsidiär. Wer sie neben Art. 12 oder Art. 14 GG prüft, zeigt, dass er die Konkurrenzen nicht beherrscht." },
    ],
    vertiefung: [
      { t: "Mittelbare Drittwirkung", x: "Grundrechte binden nach Art. 1 III GG nur den Staat. Zwischen Privaten wirken sie mittelbar über die Generalklauseln und unbestimmten Rechtsbegriffe des Zivilrechts (Lüth). Das BVerfG hat diese Wirkung zuletzt verstärkt – bei Stadionverboten und marktbeherrschenden Plattformen nähert sie sich einer unmittelbaren Bindung an." },
      { t: "Schutzpflichten", x: "Aus den Grundrechten folgt nicht nur ein Abwehrrecht, sondern auch eine Pflicht des Staates, das geschützte Gut vor Eingriffen Dritter zu bewahren. Maßstab ist das Untermaßverbot: Der Staat muss einen wirksamen Mindestschutz gewährleisten, hat aber weiten Gestaltungsspielraum. Bedeutsam bei Umwelt, Sicherheit und dem Klimabeschluss von 2021." },
      { t: "Wesentlichkeitstheorie", x: "Der Gesetzgeber muss alle für die Grundrechtsausübung wesentlichen Fragen selbst regeln und darf sie nicht der Verwaltung überlassen. Je intensiver der Eingriff und je grundrechtsrelevanter die Materie, desto dichter muss die gesetzliche Regelung sein. Das ist der verfassungsrechtliche Hintergrund vieler Streitfragen um Generalklauseln." },
    ],
  },
  {
    k: "oeff1-einzelgrundrechte",
    kurz: "Die Einzelgrundrechte unterscheiden sich weniger im Aufbau als in ihren Besonderheiten: Art. 5 in der Wechselwirkungslehre, Art. 12 in der Dreistufentheorie, Art. 14 in der Trennung von Inhaltsbestimmung und Enteignung, Art. 3 in der neuen Formel.",
    mittel: [
      { t: "Art. 5 I GG", x: "Meinung ist jedes Werturteil; Tatsachenbehauptungen nur, soweit sie zur Meinungsbildung beitragen – die erwiesen unwahre Tatsachenbehauptung ist nicht geschützt. Schranke ist das allgemeine Gesetz nach Art. 5 II, das nach der Wechselwirkungslehre (Lüth) seinerseits im Lichte der Meinungsfreiheit auszulegen ist." },
      { t: "Art. 12 I GG", x: "Einheitliches Grundrecht mit Dreistufentheorie (Apothekenurteil): Berufsausübungsregelungen sind schon durch vernünftige Gemeinwohlerwägungen gerechtfertigt; subjektive Zulassungsvoraussetzungen verlangen den Schutz eines wichtigen Gemeinschaftsguts; objektive Zulassungsvoraussetzungen nur die Abwehr nachweisbarer oder höchstwahrscheinlicher schwerer Gefahren für überragend wichtige Gemeinschaftsgüter." },
      { t: "Art. 14 GG", x: "Geschützt ist das Eigentum in seiner konkreten Ausgestaltung durch die Rechtsordnung – nicht das Vermögen. Zu trennen sind die Inhalts- und Schrankenbestimmung (Art. 14 I 2, generell-abstrakt, verhältnismäßig, ggf. mit Ausgleichsregelung) und die Enteignung (Art. 14 III, gezielter Güterbeschaffungsvorgang, nur durch oder aufgrund Gesetzes mit Junktimklausel)." },
      { t: "Art. 3 I GG", x: "Willkürformel für sachbezogene Differenzierungen: Ein sachlicher Grund genügt. Neue Formel für personenbezogene und für solche, die sich auf die Ausübung von Freiheitsrechten auswirken: Verhältnismäßigkeitsprüfung der Ungleichbehandlung. Art. 3 III GG enthält absolute Differenzierungsverbote." },
      { t: "Art. 2 I in Verbindung mit Art. 1 I GG", x: "Das allgemeine Persönlichkeitsrecht mit seinen Ausprägungen: Recht am eigenen Bild und Wort, informationelle Selbstbestimmung (Volkszählung), Vertraulichkeit und Integrität informationstechnischer Systeme (Online-Durchsuchung), Selbstdarstellung, Resozialisierung." },
    ],
    beispiel: "Ein Gesetz verlangt für die Zulassung als Rechtsanwalt die bestandene zweite Staatsprüfung. Das ist eine subjektive Zulassungsvoraussetzung – sie knüpft an die persönliche Qualifikation an und ist zum Schutz der Rechtspflege als wichtigem Gemeinschaftsgut gerechtfertigt.",
    gegenbeispiel: "Ein Gesetz begrenzt die Zahl der Anwaltszulassungen pro Landgerichtsbezirk. Das ist eine objektive Zulassungsschranke – vom Einzelnen nicht beeinflussbar. Sie wäre nur zur Abwehr nachweisbarer schwerer Gefahren für ein überragend wichtiges Gemeinschaftsgut zulässig und damit verfassungswidrig.",
    formulierung: "Der Eingriff betrifft die Freiheit der Berufswahl in Gestalt einer subjektiven Zulassungsvoraussetzung. Er ist nur gerechtfertigt, wenn er dem Schutz eines wichtigen Gemeinschaftsguts dient und verhältnismäßig ist.",
    fallen: [
      { f: "Art. 14 GG wird auf das Vermögen als solches angewandt.", w: "Geschützt sind konkrete vermögenswerte Rechtspositionen, nicht das Vermögen. Deshalb ist die Auferlegung von Geldleistungspflichten grundsätzlich kein Eingriff in Art. 14 GG – Ausnahme nur bei erdrosselnder Wirkung." },
      { f: "Inhaltsbestimmung und Enteignung werden vermischt.", w: "Die Enteignung ist nach dem BVerfG seit dem Nassauskiesungsbeschluss ein gezielter, vollständiger oder teilweiser Entzug konkreter Eigentumspositionen zur Erfüllung einer öffentlichen Aufgabe. Alles andere ist Inhalts- und Schrankenbestimmung – eine „enteignende Wirkung“ macht daraus keine Enteignung." },
      { f: "Bei Art. 5 I GG wird die Wechselwirkungslehre vergessen.", w: "Ohne sie ist jedes allgemeine Gesetz eine wirksame Schranke, und die Meinungsfreiheit wäre wertlos. Die Wechselwirkung ist der eigentliche Prüfungsstoff: Das Gesetz muss im Licht des Grundrechts ausgelegt und angewandt werden." },
    ],
    vertiefung: [
      { t: "Ausgleichspflichtige Inhaltsbestimmung", x: "Eine Inhalts- und Schrankenbestimmung kann im Einzelfall unverhältnismäßig sein. Statt sie zu verwerfen, verlangt das BVerfG eine gesetzliche Ausgleichsregelung (Denkmalschutz-Entscheidung). Fehlt sie, ist das Gesetz verfassungswidrig – der Betroffene kann nicht einfach Geld verlangen, sondern muss den Verwaltungsakt anfechten." },
      { t: "Art. 8 GG und die Brokdorf-Entscheidung", x: "Versammlungsfreiheit ist konstituierend für die Demokratie. Daraus folgen: weites Verständnis des Versammlungsbegriffs, Kooperationsgebot, Verbot nur als ultima ratio bei unmittelbarer Gefahr für die öffentliche Sicherheit, und die Pflicht der Behörde, versammlungsfreundlich zu handeln. Bei gemischten Veranstaltungen entscheidet das Gepräge." },
      { t: "Konkurrenzen", x: "Spezialität geht vor: Art. 12 verdrängt Art. 2 I für berufsbezogenes Verhalten, Art. 14 schützt das Erworbene, Art. 12 das Erwerben. Art. 5 I und Art. 8 stehen nebeneinander, wenn eine Versammlung der Meinungskundgabe dient. Idealkonkurrenz ist möglich, wenn verschiedene Aspekte betroffen sind." },
    ],
  },
  {
    k: "oeff1-polizeirecht",
    kurz: "Polizeirecht ist Gefahrenabwehr: Eine Maßnahme ist rechtmäßig, wenn eine Ermächtigungsgrundlage besteht, eine Gefahr für ein Schutzgut vorliegt, der richtige Adressat in Anspruch genommen wird und die Maßnahme verhältnismäßig ist. Die Spezialbefugnis geht immer der Generalklausel vor.",
    mittel: [
      { t: "Ermächtigungsgrundlage", x: "Erst Standardmaßnahmen (Identitätsfeststellung, Platzverweis, Durchsuchung, Ingewahrsamnahme, Sicherstellung), dann die Generalklausel. Die Generalklausel ist subsidiär: Wo der Gesetzgeber einen Eingriff typisiert hat, hat er ihn abschließend geregelt." },
      { t: "Schutzgut und Gefahr", x: "Öffentliche Sicherheit: die Unverletzlichkeit der Rechtsordnung, der subjektiven Rechte und Rechtsgüter des Einzelnen sowie der Bestand des Staates und seiner Einrichtungen. Öffentliche Ordnung: die ungeschriebenen Regeln, deren Befolgung als unerlässlich für ein gedeihliches Zusammenleben angesehen wird – wegen des Bestimmtheitsgebots nur noch selten tragfähig." },
      { t: "Gefahrbegriff", x: "Konkrete Gefahr: Sachlage, die bei ungehindertem Ablauf mit hinreichender Wahrscheinlichkeit zu einem Schaden führt. Die erforderliche Wahrscheinlichkeit sinkt, je höherwertiger das bedrohte Gut ist. Ex-ante-Sicht eines besonnenen Beamten – deshalb ist auch die Anscheinsgefahr eine Gefahr, der Gefahrenverdacht erlaubt nur Gefahrerforschungseingriffe." },
      { t: "Adressat", x: "Handlungsstörer (Verhaltensverantwortlicher), Zustandsstörer (Sachherrschaft, mit der Opfergrenze bei Wertverlust), Nichtstörer nur unter den engen Voraussetzungen des polizeilichen Notstands: gegenwärtige erhebliche Gefahr, keine anderen Möglichkeiten, Zumutbarkeit, Entschädigung." },
      { t: "Verhältnismäßigkeit und Ermessen", x: "Entschließungsermessen (ob) und Auswahlermessen (wer, wie). Bei erheblichen Gefahren für Leben und Gesundheit reduziert sich das Entschließungsermessen auf null. Die Verhältnismäßigkeit ist gesetzlich ausdrücklich angeordnet und in der Klausur der Schwerpunkt." },
    ],
    beispiel: "Ein Betrunkener randaliert nachts vor einer Gaststätte. Die Polizei spricht einen Platzverweis aus – Standardbefugnis, konkrete Gefahr für die öffentliche Sicherheit, Handlungsstörer, mildestes geeignetes Mittel gegenüber der Ingewahrsamnahme.",
    gegenbeispiel: "Dieselbe Polizei nimmt ihn in Gewahrsam, obwohl der Platzverweis genügt hätte. Die Maßnahme ist nicht erforderlich und deshalb rechtswidrig – auch wenn die Gefahr bestand und er Störer war.",
    formulierung: "Die Maßnahme müsste auf einer Ermächtigungsgrundlage beruhen. Da die Standardbefugnisse abschließend sind, ist die Generalklausel nur anwendbar, soweit keine speziellere Befugnisnorm eingreift.",
    fallen: [
      { f: "Die Generalklausel wird trotz einschlägiger Standardmaßnahme herangezogen.", w: "Die Standardbefugnisse sind abschließende Spezialregelungen mit eigenen Voraussetzungen. Ihre Umgehung über die Generalklausel verletzt den Vorbehalt des Gesetzes und ist der klassische Einstiegsfehler." },
      { f: "Die Anscheinsgefahr wird verneint, weil kein Schaden drohte.", w: "Maßgeblich ist die Ex-ante-Sicht. Durfte der Beamte bei verständiger Würdigung von einer Gefahr ausgehen, war die Maßnahme rechtmäßig – die Frage der Kostentragung ist davon zu trennen." },
      { f: "Die Störerauswahl wird nicht begründet.", w: "Stehen mehrere Störer zur Verfügung, ist das Auswahlermessen auszuüben – Leitlinie ist die effektive Gefahrenabwehr, nicht die Zahlungsfähigkeit. Der Ausgleich zwischen den Störern erfolgt zivilrechtlich, teils analog § 426 BGB." },
    ],
    vertiefung: [
      { t: "Anscheinsgefahr, Gefahrenverdacht, Putativgefahr", x: "Anscheinsgefahr: Ex ante durfte von einer Gefahr ausgegangen werden, obwohl objektiv keine bestand – die Maßnahme ist rechtmäßig, die Kosten trägt regelmäßig nicht der Anscheinsstörer, wenn er den Anschein nicht zurechenbar verursacht hat. Gefahrenverdacht: Die Behörde weiß, dass sie es nicht weiß – zulässig sind nur Gefahrerforschungsmaßnahmen. Putativgefahr: Der Beamte irrt vorwerfbar – die Maßnahme ist rechtswidrig." },
      { t: "Zweckveranlasser", x: "Wer durch sein Verhalten die Gefahr zwar nicht selbst verursacht, sie aber gezielt oder objektiv bezweckt herbeiführt, wird als Handlungsstörer behandelt. Die subjektive Theorie verlangt Zielgerichtetheit, die objektive eine natürliche Einheit von Verhalten und Störung. Klassisch bei provozierenden Veranstaltungen und Schaufensterwerbung, die Menschenansammlungen auslöst." },
      { t: "Polizeirecht und Versammlungsrecht", x: "Das Versammlungsgesetz ist Spezialgesetz mit Sperrwirkung (Polizeifestigkeit der Versammlung). Vor Auflösung der Versammlung sind allgemeine polizeirechtliche Maßnahmen gegen Teilnehmer gesperrt, soweit sie sich gegen die Versammlungsteilnahme richten. Erst nach Auflösung nach § 15 III VersG lebt das allgemeine Polizeirecht auf." },
    ],
  },
  {
    k: "oeff1-baurecht",
    kurz: "Bauplanungsrecht beantwortet, ob gebaut werden darf – §§ 29 bis 35 BauGB, gestaffelt nach der Lage des Grundstücks. Bauordnungsrecht beantwortet, wie gebaut werden darf – Landesrecht, Abstandsflächen, Standsicherheit. Die Baugenehmigung prüft beides.",
    mittel: [
      { t: "Die Weiche des § 29 BauGB", x: "Erfasst sind bauliche Anlagen, die genehmigungs-, zustimmungs- oder anzeigepflichtig sind. Dann entscheidet die Lage: Bebauungsplangebiet (§ 30), unbeplanter Innenbereich (§ 34), Außenbereich (§ 35), Planaufstellung (§ 33)." },
      { t: "§ 30 BauGB", x: "Bei qualifiziertem Bebauungsplan (Art und Maß der baulichen Nutzung, überbaubare Grundstücksfläche, örtliche Verkehrsflächen) richtet sich die Zulässigkeit allein nach dessen Festsetzungen, ergänzt durch BauNVO. Befreiungen nach § 31 II BauGB – dort steckt regelmäßig der Streit." },
      { t: "§ 34 BauGB", x: "Im Innenbereich muss sich das Vorhaben nach Art und Maß der baulichen Nutzung, Bauweise und überbaubarer Grundstücksfläche in die Eigenart der näheren Umgebung einfügen. Bei faktischen Baugebieten gilt § 34 II mit der BauNVO. Erschließung muss gesichert sein, das Ortsbild gewahrt bleiben." },
      { t: "§ 35 BauGB", x: "Der Außenbereich soll freigehalten werden. Privilegierte Vorhaben (Absatz 1) sind zulässig, wenn öffentliche Belange nicht entgegenstehen; sonstige (Absatz 2), wenn sie öffentliche Belange nicht beeinträchtigen – das ist der strengere Maßstab. Absatz 3 nennt die Belange." },
      { t: "Gebot der Rücksichtnahme", x: "Verankert in § 15 I 2 BauNVO, im Einfügen des § 34 I und im Entgegenstehen öffentlicher Belange nach § 35. Es ist die zentrale drittschützende Figur: Wer sich auf eine unzumutbare Beeinträchtigung berufen kann, ist klagebefugt und in seinen Rechten verletzt." },
    ],
    beispiel: "Im faktischen allgemeinen Wohngebiet soll eine Diskothek entstehen. Nach § 34 II BauGB in Verbindung mit § 4 BauNVO ist sie dort nicht zulässig; der Nachbar kann sich auf den Gebietserhaltungsanspruch berufen – unabhängig von einer konkreten Beeinträchtigung.",
    gegenbeispiel: "Dieselbe Diskothek entsteht im benachbarten Gewerbegebiet, stört den Anwohner aber durch Lärm. Der Gebietserhaltungsanspruch hilft nicht, weil der Nachbar in einem anderen Baugebiet liegt. Bleibt nur das Gebot der Rücksichtnahme – und das verlangt Unzumutbarkeit, nicht bloße Belästigung.",
    formulierung: "Das Vorhaben ist bauplanungsrechtlich zulässig, wenn es sich nach Art und Maß der baulichen Nutzung, der Bauweise und der Grundstücksfläche, die überbaut werden soll, in die Eigenart der näheren Umgebung einfügt und die Erschließung gesichert ist, § 34 I 1 BauGB.",
    fallen: [
      { f: "Planungs- und Ordnungsrecht werden vermischt.", w: "Abstandsflächen sind Landesbauordnungsrecht, nicht § 34 BauGB. Wer beides vermengt, prüft die falsche Norm und verliert zugleich die Trennung der Drittschutzfiguren." },
      { f: "Der Gebietserhaltungsanspruch wird gebietsübergreifend gewährt.", w: "Er beruht auf dem wechselseitigen Austauschverhältnis der Grundeigentümer innerhalb desselben Baugebiets. Über die Gebietsgrenze hinweg hilft nur die Rücksichtnahme." },
      { f: "§ 31 II BauGB wird ohne Prüfung der Grundzüge der Planung bejaht.", w: "Die Befreiung setzt voraus, dass die Grundzüge der Planung nicht berührt werden. Das ist die eigentliche Hürde – die drei Befreiungsgründe kommen erst danach." },
    ],
    vertiefung: [
      { t: "Nachbarschutz im Baurecht", x: "Drei Figuren: Gebietserhaltungsanspruch (Art der Nutzung, innerhalb des Gebiets, ohne Beeinträchtigung), Gebot der Rücksichtnahme (unzumutbare Beeinträchtigung im Einzelfall), drittschützende Vorschriften des Bauordnungsrechts (Abstandsflächen, Brandschutz). Das Maß der baulichen Nutzung ist grundsätzlich nicht drittschützend – Ausnahme über die Rücksichtnahme." },
      { t: "Bauvorbescheid und Teilbaugenehmigung", x: "Der Vorbescheid entscheidet verbindlich über eine einzelne Frage (meist die planungsrechtliche Zulässigkeit) und ist ein eigener Verwaltungsakt mit Bindungswirkung. Für den Nachbarn bedeutet das: Er muss bereits gegen den Vorbescheid vorgehen, sonst ist die Frage bestandskräftig geklärt." },
      { t: "§ 212a BauGB und der Eilrechtsschutz", x: "Widerspruch und Anfechtungsklage des Nachbarn gegen die Baugenehmigung haben keine aufschiebende Wirkung. Der Nachbar muss deshalb nach §§ 80a III, 80 V VwGO vorgehen – versäumt er das, schafft der Bauherr vollendete Tatsachen, und das Rechtsschutzbedürfnis der Hauptsache kann entfallen." },
    ],
  },
  {
    k: "oeff1-verfassungsprozess",
    kurz: "Vor dem BVerfG gibt es kein allgemeines Verfahren, sondern einen Katalog: Verfassungsbeschwerde (Art. 93 I Nr. 4a GG), Organstreit (Nr. 1), abstrakte (Nr. 2) und konkrete Normenkontrolle (Art. 100 I GG), Bund-Länder-Streit (Nr. 3). Die Verfahrensart bestimmt Antragsteller, Antragsgegenstand und Prüfungsmaßstab.",
    mittel: [
      { t: "Verfassungsbeschwerde", x: "Zulässigkeit: Beschwerdefähigkeit (jedermann, auch juristische Personen nach Art. 19 III GG), Beschwerdegegenstand (jeder Akt öffentlicher Gewalt), Beschwerdebefugnis (Möglichkeit der Verletzung eigener, gegenwärtiger und unmittelbarer Grundrechte), Rechtswegerschöpfung und Subsidiarität, Frist (§ 93 BVerfGG), Form." },
      { t: "Urteilsverfassungsbeschwerde", x: "Das BVerfG ist keine Superrevisionsinstanz. Geprüft wird nur die Verletzung spezifischen Verfassungsrechts: Übersehen eines Grundrechts, grundsätzlich unrichtige Anschauung von seiner Bedeutung, oder ein Ergebnis, das zur Bedeutung des Grundrechts außer Verhältnis steht (Hecksche Formel)." },
      { t: "Organstreit", x: "Antragsteller und Antragsgegner sind oberste Bundesorgane oder Beteiligte, die durch das Grundgesetz oder eine Geschäftsordnung mit eigenen Rechten ausgestattet sind – auch Abgeordnete und Fraktionen. Antragsgegenstand ist eine rechtserhebliche Maßnahme oder Unterlassung; Maßstab sind die organschaftlichen Rechte, nicht Grundrechte." },
      { t: "Abstrakte Normenkontrolle", x: "Antragsberechtigt sind Bundesregierung, Landesregierung und ein Viertel der Mitglieder des Bundestages. Nötig ist ein objektives Klarstellungsinteresse, kein subjektives Recht. Prüfungsmaßstab ist das gesamte Bundesverfassungsrecht." },
      { t: "Konkrete Normenkontrolle", x: "Das Fachgericht legt vor, wenn es ein nachkonstitutionelles förmliches Gesetz für verfassungswidrig hält und es auf dessen Gültigkeit ankommt, Art. 100 I GG. Die Überzeugung des Gerichts muss dargelegt und die Entscheidungserheblichkeit begründet werden – hier scheitern die meisten Vorlagen." },
    ],
    beispiel: "Ein Bürger rügt, ein Fachgericht habe bei der Auslegung einer zivilrechtlichen Generalklausel seine Meinungsfreiheit verkannt. Das ist eine Urteilsverfassungsbeschwerde; das BVerfG prüft, ob das Gericht die Ausstrahlungswirkung des Art. 5 I GG grundsätzlich verkannt hat.",
    gegenbeispiel: "Derselbe Bürger rügt, das Gericht habe den Sachverhalt falsch gewürdigt und das einfache Recht fehlerhaft angewandt. Das ist keine Verletzung spezifischen Verfassungsrechts – die Verfassungsbeschwerde ist unbegründet, weil das BVerfG keine Superrevisionsinstanz ist.",
    formulierung: "Die Verfassungsbeschwerde ist zulässig, wenn der Beschwerdeführer beschwerdefähig und beschwerdebefugt ist, ein tauglicher Beschwerdegegenstand vorliegt, der Rechtsweg erschöpft ist und Frist und Form gewahrt sind, §§ 90 ff. BVerfGG.",
    fallen: [
      { f: "Bei der Rechtssatzverfassungsbeschwerde wird die Rechtswegerschöpfung verlangt.", w: "Gegen ein Gesetz gibt es keinen fachgerichtlichen Rechtsweg. Zu prüfen ist stattdessen die Subsidiarität: Kann der Beschwerdeführer einen Vollzugsakt abwarten und dagegen vorgehen, muss er das tun." },
      { f: "Im Organstreit werden Grundrechte als Maßstab geprüft.", w: "Der Organstreit schützt organschaftliche Rechte aus dem Grundgesetz. Ein Abgeordneter kann seinen Status aus Art. 38 I 2 GG rügen, nicht aber seine Grundrechte." },
      { f: "Die Frist wird bei Gesetzen mit einem Monat angesetzt.", w: "§ 93 III BVerfGG gibt gegen Gesetze ein Jahr ab Inkrafttreten. Die Monatsfrist des § 93 I gilt für Entscheidungen." },
    ],
    vertiefung: [
      { t: "Selbst, gegenwärtig, unmittelbar", x: "Bei der Rechtssatzverfassungsbeschwerde ist das die entscheidende Hürde. Selbst: eigene Betroffenheit, nicht die Dritter. Gegenwärtig: schon und noch betroffen – bei künftiger Betroffenheit genügt, dass sich der Beschwerdeführer bereits jetzt einrichten muss. Unmittelbar: ohne weiteren Vollzugsakt; fehlt es daran, hilft die Subsidiarität zugleich als Korrektiv." },
      { t: "Grundrechtsgleiche Rechte", x: "Art. 93 I Nr. 4a GG nennt neben den Grundrechten die Rechte aus Art. 20 IV, 33, 38, 101, 103 und 104 GG. Praktisch am wichtigsten sind der gesetzliche Richter (Art. 101 I 2) und das rechtliche Gehör (Art. 103 I) – Letzteres verlangt vor der Verfassungsbeschwerde die Anhörungsrüge, sonst fehlt die Rechtswegerschöpfung." },
      { t: "Tenor bei Verfassungswidrigkeit", x: "Regelfall ist die Nichtigerklärung, § 78 BVerfGG. Das BVerfG erklärt stattdessen häufig nur die Unvereinbarkeit mit einer Fortgeltungsanordnung, wenn die Nichtigkeit einen noch verfassungsferneren Zustand schüfe oder dem Gesetzgeber mehrere Wege offenstehen – typisch bei Gleichheitsverstößen und im Steuerrecht." },
    ],
  },
];

export const ERKLAERUNGEN = [...ZIVIL_1, ...OEFF_1];

const nachKompetenz = new Map(ERKLAERUNGEN.map((e) => [e.k, e]));
export const erklaerungFuer = (kompetenzId) => nachKompetenz.get(kompetenzId) || null;
export const hatErklaerung = (kompetenzId) => nachKompetenz.has(kompetenzId);
