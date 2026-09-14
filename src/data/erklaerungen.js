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

export const ERKLAERUNGEN = [...ZIVIL_1];

const nachKompetenz = new Map(ERKLAERUNGEN.map((e) => [e.k, e]));
export const erklaerungFuer = (kompetenzId) => nachKompetenz.get(kompetenzId) || null;
export const hatErklaerung = (kompetenzId) => nachKompetenz.has(kompetenzId);
