/* Bundesland als Produktebene.

   Juristische Ausbildung ist Landesrecht. Wer in Bayern Polizeirecht lernt,
   zitiert das PAG; wer in Nordrhein-Westfalen lernt, das PolG NRW und das
   OBG NRW – und in Schleswig-Holstein steht beides zusammen mit dem
   Vollstreckungsrecht in einem einzigen Gesetz, dem LVwG. Eine Plattform, die
   das ignoriert, lehrt an der Klausur vorbei.

   Diese Datei ist bewusst eng gehalten: Sie enthält die Kürzel der drei
   klausurrelevanten Landesgesetze und den Stand des Widerspruchsverfahrens.
   Beides ist über Jahre stabil und nachprüfbar. Was sich häufiger ändert –
   Zahl der Klausuren, Notenstufen, Termine – steht hier bewusst nicht drin:
   Eine falsche Zahl wäre schlimmer als keine.

   Der Hinweis „im Zweifel gilt das Landesrecht“ ist keine Floskel, sondern
   eine Aussage über den Geltungsanspruch dieser Seite. */

export const LAENDER = [
  {
    id: "bw", name: "Baden-Württemberg", kurz: "BW",
    polizei: { k: "PolG BW", n: "Polizeigesetz Baden-Württemberg", general: "§ 3 PolG BW" },
    bau: { k: "LBO", n: "Landesbauordnung für Baden-Württemberg" },
    kommunal: { k: "GemO BW", n: "Gemeindeordnung für Baden-Württemberg" },
    vollstreckung: { k: "LVwVG", n: "Landesverwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "LVwVfG", n: "Landesverwaltungsverfahrensgesetz" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren ist im Grundsatz erhalten; einzelne Bereiche sind ausgenommen." },
    besonderheit: "Das Polizeigesetz trennt nicht zwischen Polizei- und Ordnungsbehörden – eine einheitliche Polizei im materiellen Sinn.",
  },
  {
    id: "by", name: "Bayern", kurz: "BY",
    polizei: { k: "PAG", n: "Polizeiaufgabengesetz", general: "Art. 11 PAG" },
    bau: { k: "BayBO", n: "Bayerische Bauordnung" },
    kommunal: { k: "GO", n: "Gemeindeordnung für den Freistaat Bayern" },
    vollstreckung: { k: "BayVwZVG", n: "Bayerisches Verwaltungszustellungs- und Vollstreckungsgesetz" },
    vwvfg: { k: "BayVwVfG", n: "Bayerisches Verwaltungsverfahrensgesetz" },
    widerspruch: { stand: "fakultativ", text: "In weiten Bereichen ist das Widerspruchsverfahren fakultativ: Der Bürger kann wählen, ob er Widerspruch einlegt oder unmittelbar klagt." },
    besonderheit: "Bayern zitiert im Landesrecht Artikel statt Paragraphen – „Art. 11 PAG“, nicht „§ 11 PAG“. Das LStVG regelt die Sicherheitsbehörden neben dem PAG.",
  },
  {
    id: "be", name: "Berlin", kurz: "BE",
    polizei: { k: "ASOG Bln", n: "Allgemeines Sicherheits- und Ordnungsgesetz", general: "§ 17 ASOG Bln" },
    bau: { k: "BauO Bln", n: "Bauordnung für Berlin" },
    kommunal: { k: "BezVG", n: "Bezirksverwaltungsgesetz" },
    vollstreckung: { k: "VwVG", n: "Verwaltungs-Vollstreckungsgesetz des Bundes, anwendbar über Landesrecht" },
    vwvfg: { k: "VwVfG Bln", n: "Verwaltungsverfahrensgesetz Berlin (Verweis auf das VwVfG des Bundes)" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Als Stadtstaat kennt Berlin kein klassisches Gemeinderecht; an seine Stelle tritt das Bezirksverwaltungsrecht.",
  },
  {
    id: "bb", name: "Brandenburg", kurz: "BB",
    polizei: { k: "BbgPolG / OBG", n: "Brandenburgisches Polizeigesetz und Ordnungsbehördengesetz", general: "§ 10 OBG, § 10 BbgPolG" },
    bau: { k: "BbgBO", n: "Brandenburgische Bauordnung" },
    kommunal: { k: "BbgKVerf", n: "Kommunalverfassung des Landes Brandenburg" },
    vollstreckung: { k: "VwVGBbg", n: "Verwaltungsvollstreckungsgesetz für das Land Brandenburg" },
    vwvfg: { k: "VwVfGBbg", n: "Verwaltungsverfahrensgesetz für das Land Brandenburg" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht; für einzelne Materien gelten Ausnahmen." },
    besonderheit: "Trennungssystem: Ordnungsbehörden nach dem OBG, Polizeivollzugsdienst nach dem BbgPolG. Die Abgrenzung ist Klausurstoff.",
  },
  {
    id: "hb", name: "Bremen", kurz: "HB",
    polizei: { k: "BremPolG", n: "Bremisches Polizeigesetz", general: "§ 10 BremPolG" },
    bau: { k: "BremLBO", n: "Bremische Landesbauordnung" },
    kommunal: { k: "BremVerf", n: "Landesverfassung und Ortsgesetze" },
    vollstreckung: { k: "BremVwVG", n: "Bremisches Verwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "BremVwVfG", n: "Bremisches Verwaltungsverfahrensgesetz" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Zwei-Städte-Staat aus Bremen und Bremerhaven mit eigenen Zuständigkeitsregeln.",
  },
  {
    id: "hh", name: "Hamburg", kurz: "HH",
    polizei: { k: "SOG", n: "Gesetz zum Schutz der öffentlichen Sicherheit und Ordnung", general: "§ 3 SOG" },
    bau: { k: "HBauO", n: "Hamburgische Bauordnung" },
    kommunal: { k: "BezVG", n: "Bezirksverwaltungsgesetz" },
    vollstreckung: { k: "HmbVwVG", n: "Hamburgisches Verwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "HmbVwVfG", n: "Hamburgisches Verwaltungsverfahrensgesetz" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Stadtstaat ohne Gemeinderecht im klassischen Sinn; das SOG ist deutlich knapper gefasst als die Flächenland-Polizeigesetze.",
  },
  {
    id: "he", name: "Hessen", kurz: "HE",
    polizei: { k: "HSOG", n: "Hessisches Gesetz über die öffentliche Sicherheit und Ordnung", general: "§ 11 HSOG" },
    bau: { k: "HBO", n: "Hessische Bauordnung" },
    kommunal: { k: "HGO", n: "Hessische Gemeindeordnung" },
    vollstreckung: { k: "HessVwVG", n: "Hessisches Verwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "HVwVfG", n: "Hessisches Verwaltungsverfahrensgesetz" },
    widerspruch: { stand: "eingeschränkt", text: "Das Widerspruchsverfahren ist für zahlreiche Materien abgeschafft; die Ausnahmen stehen im Ausführungsgesetz zur VwGO." },
    besonderheit: "Das HSOG regelt Gefahrenabwehr- und Polizeibehörden gemeinsam; die Gefahrenabwehrbehörden sind eigenständig geregelt.",
  },
  {
    id: "mv", name: "Mecklenburg-Vorpommern", kurz: "MV",
    polizei: { k: "SOG M-V", n: "Sicherheits- und Ordnungsgesetz Mecklenburg-Vorpommern", general: "§ 13 SOG M-V" },
    bau: { k: "LBauO M-V", n: "Landesbauordnung Mecklenburg-Vorpommern" },
    kommunal: { k: "KV M-V", n: "Kommunalverfassung für das Land Mecklenburg-Vorpommern" },
    vollstreckung: { k: "VwVfG M-V", n: "Vollstreckung im Verwaltungsverfahrensgesetz mitgeregelt" },
    vwvfg: { k: "VwVfG M-V", n: "Verwaltungsverfahrens-, Zustellungs- und Vollstreckungsgesetz M-V" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Verfahrens-, Zustellungs- und Vollstreckungsrecht stehen in einem einzigen Landesgesetz.",
  },
  {
    id: "ni", name: "Niedersachsen", kurz: "NI",
    polizei: { k: "NPOG", n: "Niedersächsisches Polizei- und Ordnungsbehördengesetz", general: "§ 11 NPOG" },
    bau: { k: "NBauO", n: "Niedersächsische Bauordnung" },
    kommunal: { k: "NKomVG", n: "Niedersächsisches Kommunalverfassungsgesetz" },
    vollstreckung: { k: "NVwVG", n: "Niedersächsisches Verwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "NVwVfG", n: "Niedersächsisches Verwaltungsverfahrensgesetz" },
    widerspruch: { stand: "eingeschränkt", text: "Das Widerspruchsverfahren ist weitgehend abgeschafft; für bestimmte Bereiche wurde es wieder eingeführt." },
    besonderheit: "Das frühere Nds. SOG heißt seit 2019 NPOG und fasst Polizei- und Ordnungsbehördenrecht zusammen.",
  },
  {
    id: "nw", name: "Nordrhein-Westfalen", kurz: "NW",
    polizei: { k: "PolG NRW / OBG NRW", n: "Polizeigesetz und Ordnungsbehördengesetz Nordrhein-Westfalen", general: "§ 8 PolG NRW, § 14 OBG NRW" },
    bau: { k: "BauO NRW", n: "Bauordnung für das Land Nordrhein-Westfalen" },
    kommunal: { k: "GO NRW", n: "Gemeindeordnung für das Land Nordrhein-Westfalen" },
    vollstreckung: { k: "VwVG NRW", n: "Verwaltungsvollstreckungsgesetz für das Land Nordrhein-Westfalen" },
    vwvfg: { k: "VwVfG NRW", n: "Verwaltungsverfahrensgesetz für das Land Nordrhein-Westfalen" },
    widerspruch: { stand: "eingeschränkt", text: "Das Widerspruchsverfahren wurde weitgehend abgeschafft und für einzelne Materien wieder eingeführt – die Prüfung des einschlägigen Rechtsgebiets ist unerlässlich." },
    besonderheit: "Klassisches Trennungssystem: § 14 OBG NRW für die Ordnungsbehörden, § 8 PolG NRW für den Polizeivollzugsdienst. Die Abgrenzung über § 1 I PolG NRW ist Standardeinstieg jeder Klausur.",
  },
  {
    id: "rp", name: "Rheinland-Pfalz", kurz: "RP",
    polizei: { k: "POG", n: "Polizei- und Ordnungsbehördengesetz Rheinland-Pfalz", general: "§ 9 POG" },
    bau: { k: "LBauO", n: "Landesbauordnung Rheinland-Pfalz" },
    kommunal: { k: "GemO", n: "Gemeindeordnung Rheinland-Pfalz" },
    vollstreckung: { k: "LVwVG", n: "Landesverwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "LVwVfG", n: "Landesverwaltungsverfahrensgesetz" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Das POG fasst Polizei- und Ordnungsbehördenrecht in einem Gesetz zusammen.",
  },
  {
    id: "sl", name: "Saarland", kurz: "SL",
    polizei: { k: "SPolG", n: "Saarländisches Polizeigesetz", general: "§ 8 SPolG" },
    bau: { k: "LBO", n: "Landesbauordnung Saarland" },
    kommunal: { k: "KSVG", n: "Kommunalselbstverwaltungsgesetz" },
    vollstreckung: { k: "SVwVG", n: "Saarländisches Verwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "SVwVfG", n: "Saarländisches Verwaltungsverfahrensgesetz" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Das KSVG regelt Gemeinden und Gemeindeverbände gemeinsam.",
  },
  {
    id: "sn", name: "Sachsen", kurz: "SN",
    polizei: { k: "SächsPBG / SächsPVDG", n: "Sächsisches Polizeibehördengesetz und Polizeivollzugsdienstgesetz", general: "§ 3 SächsPBG" },
    bau: { k: "SächsBO", n: "Sächsische Bauordnung" },
    kommunal: { k: "SächsGemO", n: "Gemeindeordnung für den Freistaat Sachsen" },
    vollstreckung: { k: "SächsVwVG", n: "Sächsisches Verwaltungsvollstreckungsgesetz" },
    vwvfg: { k: "SächsVwVfZG", n: "Sächsisches Verwaltungsverfahrens- und Verwaltungszustellungsgesetz" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Sachsen hat das frühere einheitliche Polizeigesetz 2019 in zwei Gesetze geteilt: Behörden und Vollzugsdienst.",
  },
  {
    id: "st", name: "Sachsen-Anhalt", kurz: "ST",
    polizei: { k: "SOG LSA", n: "Gesetz über die öffentliche Sicherheit und Ordnung des Landes Sachsen-Anhalt", general: "§ 13 SOG LSA" },
    bau: { k: "BauO LSA", n: "Bauordnung des Landes Sachsen-Anhalt" },
    kommunal: { k: "KVG LSA", n: "Kommunalverfassungsgesetz des Landes Sachsen-Anhalt" },
    vollstreckung: { k: "VwVG LSA", n: "Verwaltungsvollstreckungsgesetz des Landes Sachsen-Anhalt" },
    vwvfg: { k: "VwVfG LSA", n: "Verwaltungsverfahrensgesetz Sachsen-Anhalt" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Das SOG LSA regelt Sicherheitsbehörden und Polizei gemeinsam.",
  },
  {
    id: "sh", name: "Schleswig-Holstein", kurz: "SH",
    polizei: { k: "LVwG", n: "Allgemeines Verwaltungsgesetz für das Land Schleswig-Holstein", general: "§ 174 LVwG" },
    bau: { k: "LBO", n: "Landesbauordnung für das Land Schleswig-Holstein" },
    kommunal: { k: "GO SH", n: "Gemeindeordnung für Schleswig-Holstein" },
    vollstreckung: { k: "LVwG", n: "Vollstreckung im LVwG mitgeregelt, §§ 228 ff." },
    vwvfg: { k: "LVwG", n: "Verwaltungsverfahrensrecht im LVwG mitgeregelt" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Die Besonderheit des Landes: Verwaltungsverfahren, Gefahrenabwehr und Vollstreckung stehen in einem einzigen Gesetz, dem LVwG. Wer aus einem anderen Land kommt, sucht sonst vergeblich nach einem Polizeigesetz.",
  },
  {
    id: "th", name: "Thüringen", kurz: "TH",
    polizei: { k: "ThürOBG / ThürPAG", n: "Thüringer Ordnungsbehördengesetz und Polizeiaufgabengesetz", general: "§ 5 ThürOBG" },
    bau: { k: "ThürBO", n: "Thüringer Bauordnung" },
    kommunal: { k: "ThürKO", n: "Thüringer Kommunalordnung" },
    vollstreckung: { k: "ThürVwZVG", n: "Thüringer Verwaltungszustellungs- und Vollstreckungsgesetz" },
    vwvfg: { k: "ThürVwVfG", n: "Thüringer Verwaltungsverfahrensgesetz" },
    widerspruch: { stand: "grundsätzlich", text: "Das Widerspruchsverfahren besteht im Grundsatz fort." },
    besonderheit: "Trennungssystem aus Ordnungsbehördengesetz und Polizeiaufgabengesetz.",
  },
];

export const WIDERSPRUCH_STAND = {
  grundsätzlich: { label: "besteht", ton: "gruen", text: "Vor der Anfechtungs- und Verpflichtungsklage ist grundsätzlich ein Widerspruchsverfahren durchzuführen, §§ 68 ff. VwGO." },
  fakultativ: { label: "fakultativ", ton: "orange", text: "Der Bürger kann zwischen Widerspruch und unmittelbarer Klage wählen. In der Klausur ist beides zu erörtern." },
  eingeschränkt: { label: "weitgehend abgeschafft", ton: "rot", text: "Für viele Materien entfällt das Vorverfahren; die Klagefrist läuft dann ab Bekanntgabe des Ausgangsbescheids. Die einschlägige Ausnahme muss geprüft werden." },
};

export const landFinden = (id) => LAENDER.find((l) => l.id === id) || null;

/* Ersetzt die generischen Kürzel des Werks durch die des gewählten Landes.
   Das Werk schreibt „PolG“, „BauO“, „GemO“ – in der Klausur steht dort das
   Gesetz des Prüfungslandes. */
export function landesnorm(text, land) {
  if (!land || !text) return text;
  return String(text)
    .replace(/\bPolG\b(?! NRW| BW)/g, land.polizei.k)
    .replace(/\bBauO\b(?! NRW| Bln| LSA)/g, land.bau.k)
    .replace(/\bGemO\b(?! BW)/g, land.kommunal.k);
}
