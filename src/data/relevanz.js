/* Examensrelevanz je Kapitel – redaktionelle Einschätzung nach der
   Häufigkeit in Examensklausuren (Erfahrungswerte der Repetitorien und der
   veröffentlichten Klausurstatistiken). Drei Stufen:
   hoch = Dauerbrenner, mittel = regelmäßig, basis = Grundlage/Exot.
   Zuordnung über Stichwörter im Kapiteltitel; Standard ist „mittel“. */

const HOCH = [
  /Kaufrecht/, /Leistungsst/, /Schadensrecht/, /Stellvertretung/, /Anfechtung/, /Deliktsrecht/, /Bereicherungsrecht/,
  /Eigentumserwerb an beweglichen/, /Eigentumsschutz/, /Eigent(ue|ü)mer-Besitzer/, /Werkvertrag/, /Mietrecht/, /Allgemeiner Teil/,
  /Schuldrecht Allgemeiner/, /Anspruchsmatrix/, /Gesamtpr(ue|ü)fungsreihenfolge/, /Schnellkontrolle/, /Endkontrolle/,
  /Anfechtungsklage/, /Verpflichtungsklage/, /Rechtm(ae|ä)ssigkeit eines Verwaltungsakts/, /Verwaltungsakt/, /Grundrechte/, /Freiheitsrechte/,
  /Polizei- und Ordnungsrecht/, /Baurecht/, /Vorl(ae|ä)ufiger Rechtsschutz/, /Verfassungsbeschwerde/, /Verwaltungsrechtsweg/,
  /Grundlagen und Aufbau der Straftat/, /Vorsatz und Irrt/, /Rechtswidrigkeit/, /T(ae|ä)terschaft und Teilnahme/, /Versuch und R(ue|ü)cktritt/,
  /Diebstahl/, /Betrug/, /Raub/, /Delikte gegen Leben/, /Objektive Zurechnung/, /Unterlassungsdelikte/, /Verm(oe|ö)gensdelikte/,
  /Relationstechnik/, /Zul(ae|ä)ssigkeit der Klage/, /Aufbau des Zivilurteils/, /Tatbestand$/, /Entscheidungsgr(ue|ü)nde/, /Vers(ae|ä)umnisurteil/,
  /Prozessaufrechnung/, /Anwaltsklausur/, /Kl(ae|ä)gerklausur/, /Beklagtenklausur/, /Zwangsvollstreckung/,
  /verwaltungsgerichtliche Urteil/, /Tenorierung/, /Widerspruchsbescheid/, /Beh(oe|ö)rdenklausur/, /Anklageschrift/, /Aufbau der Anklageschrift/,
  /Revision/, /Verfahrensr(ue|ü)ge/, /Sachr(ue|ü)ge/, /Beruhen/, /Zwangsma(ss|ß)nahmen/, /Beweisverwertungsverbote/, /Konkreter Anklagesatz/,
];
const BASIS = [
  /Internationales Privatrecht/, /digitale Produkte/, /Register/, /Arbeitsweise/, /Zweck dieses/, /Methodik/, /Grundmethodik/, /Grundprinzip/,
  /Kommunalrecht/, /Europarecht/, /Familienrecht/, /Erbrecht/, /Weitere Vertragstypen/, /Gesch(ae|ä)ftsf(ue|ü)hrung ohne Auftrag/,
  /Brandstiftung/, /Aussagedelikte/, /Urkundendelikte/, /Strassenverkehrsdelikte|Stra(ss|ß)enverkehrsdelikte/, /Erfolgsqualifikation/,
  /Urkundenprozess/, /Verteilungsverfahren/, /Kostenfestsetzung/, /Rechtsanwaltsgeb(ue|ü)hren/, /Streitwert/, /Prozesskostenhilfe/, /Gerichtsbescheid/,
  /Beiladung/, /Rechtsmittelbelehrung/, /Fristenmanagement/, /Wiedereinsetzung/, /Jugendstrafrecht/, /Einziehung/, /Fahrerlaubnis/,
  /Gesamtstrafenbildung/, /Begleitverf(ue|ü)gung/, /Beweismittelverzeichnis/, /Personalien/, /Statthaftigkeit/, /Revisionsantr(ae|ä)ge/, /praktische Form/,
  /Leitentscheidungsverfahren/, /Fortsetzungsfeststellung/, /Normenkontrolle/, /Nebenbestimmungen/, /Staatshaftung/, /Handelsrecht/, /Gesellschaftsrecht/,
];

export function relevanzFuer(titel) {
  if (HOCH.some((re) => re.test(titel))) return "hoch";
  if (BASIS.some((re) => re.test(titel))) return "basis";
  return "mittel";
}

export const RELEVANZ = {
  hoch: { label: "Dauerbrenner", kurz: "hoch", text: "nahezu in jeder Klausurrunde – Schema muss ohne Nachdenken laufen" },
  mittel: { label: "Regelmäßig", kurz: "mittel", text: "regelmäßig geprüft, oft als Nebenproblem" },
  basis: { label: "Grundlage", kurz: "basis", text: "seltener Schwerpunkt – zuerst die Kernblöcke sichern" },
};
