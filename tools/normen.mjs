/* Erkennung von Normzitaten („§ 433 I BGB", „§§ 280 I, 241 II BGB", „Art. 94 I Nr. 4b GG")
   in Fließtext. Liefert Fundstellen mit Schlüsseln je Einzelnorm für das Normenregister. */

export const GESETZE = {
  BGB: "Bürgerliches Gesetzbuch", EGBGB: "Einführungsgesetz zum BGB", HGB: "Handelsgesetzbuch",
  ZPO: "Zivilprozessordnung", GVG: "Gerichtsverfassungsgesetz", FamFG: "Gesetz über das Verfahren in Familiensachen",
  ZVG: "Zwangsversteigerungsgesetz", InsO: "Insolvenzordnung", GmbHG: "GmbH-Gesetz", AktG: "Aktiengesetz",
  PartGG: "Partnerschaftsgesellschaftsgesetz", UmwG: "Umwandlungsgesetz", GenG: "Genossenschaftsgesetz",
  KSchG: "Kündigungsschutzgesetz", BetrVG: "Betriebsverfassungsgesetz", TzBfG: "Teilzeit- und Befristungsgesetz",
  AGG: "Allgemeines Gleichbehandlungsgesetz", ArbGG: "Arbeitsgerichtsgesetz", BUrlG: "Bundesurlaubsgesetz",
  EFZG: "Entgeltfortzahlungsgesetz", MuSchG: "Mutterschutzgesetz", ArbZG: "Arbeitszeitgesetz", TVG: "Tarifvertragsgesetz",
  NachwG: "Nachweisgesetz", ProdHaftG: "Produkthaftungsgesetz", StVG: "Straßenverkehrsgesetz", PflVG: "Pflichtversicherungsgesetz",
  UWG: "Gesetz gegen den unlauteren Wettbewerb", MarkenG: "Markengesetz", UrhG: "Urheberrechtsgesetz", PatG: "Patentgesetz",
  WEG: "Wohnungseigentumsgesetz", ErbbauRG: "Erbbaurechtsgesetz", GBO: "Grundbuchordnung", BeurkG: "Beurkundungsgesetz",
  RVG: "Rechtsanwaltsvergütungsgesetz", GKG: "Gerichtskostengesetz", BRAO: "Bundesrechtsanwaltsordnung", RPflG: "Rechtspflegergesetz",
  BNotO: "Bundesnotarordnung", RDG: "Rechtsdienstleistungsgesetz", VVG: "Versicherungsvertragsgesetz", KWG: "Kreditwesengesetz",
  ZAG: "Zahlungsdiensteaufsichtsgesetz", PStG: "Personenstandsgesetz", LPartG: "Lebenspartnerschaftsgesetz", VersAusglG: "Versorgungsausgleichsgesetz",
  GewSchG: "Gewaltschutzgesetz", BDSG: "Bundesdatenschutzgesetz", DSGVO: "Datenschutz-Grundverordnung", TMG: "Telemediengesetz",
  StGB: "Strafgesetzbuch", StPO: "Strafprozessordnung", JGG: "Jugendgerichtsgesetz", OWiG: "Gesetz über Ordnungswidrigkeiten",
  BtMG: "Betäubungsmittelgesetz", WaffG: "Waffengesetz", BZRG: "Bundeszentralregistergesetz", StVollzG: "Strafvollzugsgesetz",
  StrEG: "Gesetz über die Entschädigung für Strafverfolgungsmaßnahmen", KCanG: "Konsumcannabisgesetz", EGStGB: "Einführungsgesetz zum StGB",
  EGGVG: "Einführungsgesetz zum GVG", RiStBV: "Richtlinien für das Strafverfahren", StVO: "Straßenverkehrs-Ordnung", StVZO: "Straßenverkehrs-Zulassungs-Ordnung",
  FeV: "Fahrerlaubnis-Verordnung", GG: "Grundgesetz", BVerfGG: "Bundesverfassungsgerichtsgesetz", VwGO: "Verwaltungsgerichtsordnung",
  VwVfG: "Verwaltungsverfahrensgesetz", VwVG: "Verwaltungs-Vollstreckungsgesetz", VwZG: "Verwaltungszustellungsgesetz",
  BauGB: "Baugesetzbuch", BauNVO: "Baunutzungsverordnung", ROG: "Raumordnungsgesetz", BImSchG: "Bundes-Immissionsschutzgesetz",
  WHG: "Wasserhaushaltsgesetz", BNatSchG: "Bundesnaturschutzgesetz", KrWG: "Kreislaufwirtschaftsgesetz", UVPG: "Gesetz über die Umweltverträglichkeitsprüfung",
  GewO: "Gewerbeordnung", GastG: "Gaststättengesetz", HwO: "Handwerksordnung", VersG: "Versammlungsgesetz", BPolG: "Bundespolizeigesetz",
  BKAG: "Bundeskriminalamtgesetz", PassG: "Passgesetz", AufenthG: "Aufenthaltsgesetz", AsylG: "Asylgesetz", StAG: "Staatsangehörigkeitsgesetz",
  BBG: "Bundesbeamtengesetz", BeamtStG: "Beamtenstatusgesetg", IFG: "Informationsfreiheitsgesetz", UIG: "Umweltinformationsgesetz",
  BWahlG: "Bundeswahlgesetz", PartG: "Parteiengesetz", AbgG: "Abgeordnetengesetz", GOBT: "Geschäftsordnung des Bundestages",
  StHG: "Staatshaftungsgesetz", AEUV: "Vertrag über die Arbeitsweise der EU", EUV: "Vertrag über die Europäische Union",
  GRCh: "EU-Grundrechtecharta", EMRK: "Europäische Menschenrechtskonvention", AO: "Abgabenordnung", SGB: "Sozialgesetzbuch",
  KAG: "Kommunalabgabengesetz", HGrG: "Haushaltsgrundsätzegesetz", BHO: "Bundeshaushaltsordnung", TierSchG: "Tierschutzgesetz",
  IfSG: "Infektionsschutzgesetz", LuftSiG: "Luftsicherheitsgesetz", BVerwGG: "", VwKostG: "",
  /* Landesrecht – Polizei, Bau, Kommunales (Kürzel ohne Langname) */
  PolG: "Polizeigesetz (Land)", PAG: "Polizeiaufgabengesetz (Bayern)", ASOG: "Allgemeines Sicherheits- und Ordnungsgesetz (Berlin)",
  HSOG: "Hessisches Sicherheits- und Ordnungsgesetz", SOG: "Sicherheits- und Ordnungsgesetz (Land)", NPOG: "Niedersächsisches Polizei- und Ordnungsbehördengesetz",
  POG: "Polizei- und Ordnungsbehördengesetz (Rheinland-Pfalz)", OBG: "Ordnungsbehördengesetz (NRW)", SPolG: "Saarländisches Polizeigesetz",
  SächsPVDG: "Sächsisches Polizeivollzugsdienstgesetg", ThürPAG: "Thüringer Polizeiaufgabengesetz", BremPolG: "Bremisches Polizeigesetz",
  HmbSOG: "Hamburgisches SOG", BbgPolG: "Brandenburgisches Polizeigesetz", LVwG: "Landesverwaltungsgesetz (Schleswig-Holstein)",
  BauO: "Bauordnung (Land)", LBO: "Landesbauordnung", BayBO: "Bayerische Bauordnung", HBO: "Hessische Bauordnung", NBauO: "Niedersächsische Bauordnung",
  LBauO: "Landesbauordnung", SächsBO: "Sächsische Bauordnung", BbgBO: "Brandenburgische Bauordnung", HBauO: "Hamburgische Bauordnung", ThürBO: "Thüringer Bauordnung",
  BremLBO: "Bremische Landesbauordnung", GO: "Gemeindeordnung (Land)", GemO: "Gemeindeordnung (Land)", BayGO: "Bayerische Gemeindeordnung",
  HGO: "Hessische Gemeindeordnung", NKomVG: "Niedersächsisches Kommunalverfassungsgesetz", KSVG: "Kommunalselbstverwaltungsgesetz (Saarland)",
  SächsGemO: "Sächsische Gemeindeordnung", ThürKO: "Thüringer Kommunalordnung", KV: "Kommunalverfassung (Land)", BbgKVerf: "Brandenburgische Kommunalverfassung",
  KVG: "Kommunalverfassungsgesetz (Land)", KrO: "Kreisordnung (Land)", LKrO: "Landkreisordnung", BayVwVfG: "Bayerisches Verwaltungsverfahrensgesetz",
  LVwVfG: "Landesverwaltungsverfahrensgesetz", "VwVfG NRW": "Verwaltungsverfahrensgesetz NRW", LVerf: "Landesverfassung", BayVerf: "Bayerische Verfassung",
  "VwVG NRW": "Verwaltungsvollstreckungsgesetz NRW", LVwVG: "Landesverwaltungsvollstreckungsgesetz", "PolG NRW": "Polizeigesetz NRW", "PolG BW": "Polizeigesetz Baden-Württemberg",
  "BauO NRW": "Bauordnung NRW", "BauO Bln": "Bauordnung Berlin", "LBO BW": "Landesbauordnung Baden-Württemberg", "GO NRW": "Gemeindeordnung NRW",
  "GemO BW": "Gemeindeordnung Baden-Württemberg", "GemO RP": "Gemeindeordnung Rheinland-Pfalz", "KV M-V": "Kommunalverfassung Mecklenburg-Vorpommern",
  "GO LSA": "Gemeindeordnung Sachsen-Anhalt", "SOG LSA": "Sicherheits- und Ordnungsgesetz Sachsen-Anhalt", "SOG M-V": "Sicherheits- und Ordnungsgesetz Mecklenburg-Vorpommern",
  "Nds. SOG": "Niedersächsisches SOG", "POG RP": "Polizei- und Ordnungsbehördengesetz Rheinland-Pfalz", "LBauO M-V": "Landesbauordnung Mecklenburg-Vorpommern",
  "LBauO RP": "Landesbauordnung Rheinland-Pfalz", "BauO LSA": "Bauordnung Sachsen-Anhalt", "LBO SH": "Landesbauordnung Schleswig-Holstein",
  "Rom I-VO": "Rom-I-Verordnung", "Rom II-VO": "Rom-II-Verordnung", "Rom III-VO": "Rom-III-Verordnung", EuGVVO: "Brüssel-Ia-Verordnung",
  "Brüssel Ia-VO": "Brüssel-Ia-Verordnung", EuErbVO: "Europäische Erbrechtsverordnung", EuUnthVO: "Europäische Unterhaltsverordnung",
  VSBG: "Verbraucherstreitbeilegungsgesetz", PAngV: "Preisangabenverordnung", "BGB-InfoV": "BGB-Informationspflichten-Verordnung",
  WpHG: "Wertpapierhandelsgesetz", WpÜG: "Wertpapiererwerbs- und Übernahmegesetz", HeilprG: "Heilpraktikergesetz", ApoG: "Apothekengesetz",
  SprengG: "Sprengstoffgesetz", HundeG: "Hundegesetz (Land)", LHundG: "Landeshundegesetz", TierGesG: "Tiergesundheitsgesetz",
  SchulG: "Schulgesetz (Land)", HSchulG: "Hochschulgesetz (Land)", LPresseG: "Landespressegesetz", RStV: "Rundfunkstaatsvertrag", MStV: "Medienstaatsvertrag",
  BayVersG: "Bayerisches Versammlungsgesetz", NVersG: "Niedersächsisches Versammlungsgesetz", VersFG: "Versammlungsfreiheitsgesetz (Land)",
  KUG: "Kunsturhebergesetz", StrRehaG: "Strafrechtliches Rehabilitierungsgesetz", EGZPO: "Einführungsgesetz zur ZPO", EGInsO: "Einführungsgesetz zur InsO",
  UStG: "Umsatzsteuergesetz", EStG: "Einkommensteuergesetz", GewStG: "Gewerbesteuergesetz", GrStG: "Grundsteuergesetz", ErbStG: "Erbschaftsteuergesetz",
  AGVwGO: "Ausführungsgesetz zur VwGO (Land)", JustG: "Justizgesetz (Land)", AGGVG: "Ausführungsgesetz zum GVG (Land)", SGG: "Sozialgerichtsgesetz", FGO: "Finanzgerichtsordnung",
  ZustVO: "Zuständigkeitsverordnung", VO: "Verordnung", RL: "Richtlinie", EGV: "EG-Vertrag", "VwGO NRW": "", HKG: "", MoPeG: "Gesetz zur Modernisierung des Personengesellschaftsrechts",
  "Rom I": "Rom-I-Verordnung", "Rom II": "Rom-II-Verordnung", GmbH: "", AG: "",
};

/* Kürzel absteigend nach Länge, damit „VwVfG NRW" vor „VwVfG" gefunden wird. */
const KUERZEL = Object.keys(GESETZE)
  .filter((k) => !["GmbH", "AG", "VO", "RL", "VwGO NRW", "HKG", "BVerwGG", "VwKostG", "MoPeG"].includes(k))
  .sort((a, b) => b.length - a.length)
  .map((k) => k.replace(/[.\-]/g, (m) => `\\${m}`).replace(/ /g, "\\s"));

const GESETZ_ALT = `(?:${KUERZEL.join("|")})`;
/* Zeichen, die zwischen der ersten Nummer und dem Gesetzeskürzel stehen dürfen. */
const INNEN = String.raw`(?:\s?(?:Abs\.|Absatz|Satz|S\.|Nr\.|Nrn\.|Hs\.|Halbs\.|lit\.|Alt\.|Var\.|Ziff\.|Buchst\.|analog|entsprechend|ff\.|f\.|und|oder|bis|bzw\.|i\.\s?V\.\s?m\.|iVm|[IVX]+|\d+[a-z]?|[a-z]\)?|[,\-–]|§§?|Art\.|Artt\.))*?`;
export const NORM_RE = new RegExp(String.raw`(?<![\wäöüÄÖÜ§])(§§?|Art\.|Artt\.)\s?(\d+[a-z]?)${INNEN}\s(${GESETZ_ALT})(?![\wäöüÄÖÜ\-])`, "g");

const SATZ_TOKEN = /^(Abs\.|Absatz|Satz|S\.|Nr\.|Nrn\.|Hs\.|Halbs\.|lit\.|Alt\.|Var\.|Ziff\.|Buchst\.)$/;

/* Einzelnormen eines Zitats: „§§ 280 I, 311 II, 241 II BGB" → 280, 311, 241 (Sätze/Nummern werden nicht mitgezählt). */
export function einzelnormen(zitat) {
  const m = /^(§§?|Artt?\.)\s?(.*)\s(\S+(?:\s\S+)?)$/.exec(zitat.trim());
  if (!m) return [];
  let art = m[1].startsWith("Art");
  let gesetz = m[3];
  /* Gesetzeskürzel mit Leerzeichen (z. B. „PolG NRW") sicher bestimmen */
  const zitatOhne = zitat.trim();
  for (const k of Object.keys(GESETZE).sort((a, b) => b.length - a.length)) {
    if (zitatOhne.endsWith(" " + k)) { gesetz = k; break; }
  }
  const innen = zitatOhne.slice(m[1].length, zitatOhne.length - gesetz.length).trim();
  const tokens = innen.replace(/,/g, " , ").replace(/\s[\-–]\s/g, " - ").split(/\s+/).filter(Boolean);
  const nummern = [];
  /* Kontext: „para" – die nächste Zahl ist ein Paragraph; „abs" – sie ist Absatz/Satz/Nummer.
     Nach „§§" (Plural) gilt eine Zahl nach Komma als neuer Paragraph, nach „§" (Singular) als Untergliederung. */
  let plural = /^(§§|Artt\.)/.test(zitatOhne);
  let kontext = "para"; let erwarteNummer = true; let untergliedert = false;
  for (const tok of tokens) {
    if (/^(§§?|Artt?\.)$/.test(tok)) { art = tok.startsWith("Art"); plural = /^(§§|Artt\.)$/.test(tok); kontext = "para"; erwarteNummer = true; untergliedert = false; continue; }
    if (SATZ_TOKEN.test(tok)) { kontext = "abs"; untergliedert = true; erwarteNummer = false; continue; }
    if (/^[IVX]+$/.test(tok)) { kontext = "abs"; untergliedert = true; erwarteNummer = false; continue; }
    if (/^\d+[a-z]?$/.test(tok)) {
      /* „§§ 280 Abs. 1, 3, 283": kleine Zahl nach Komma innerhalb einer Absatzaufzählung ist Absatz, keine neue Norm */
      const kleineUntergliederung = kontext === "para" && untergliedert && parseInt(tok, 10) <= 9;
      if (erwarteNummer && kontext === "para" && !kleineUntergliederung) { nummern.push({ art, nr: tok }); untergliedert = false; }
      if (kontext === "para") kontext = "abs"; /* nach der Paragraphenzahl folgen Untergliederungen */
      erwarteNummer = false; continue;
    }
    if (tok === ",") { kontext = plural ? "para" : "abs"; erwarteNummer = true; continue; }
    if (/^(und|oder|bis|bzw\.|-|–)$/.test(tok)) { erwarteNummer = true; continue; /* Kontext bleibt */ }
    if (/i\.?V\.?m\.?/i.test(tok) || tok === "iVm" || tok === "i." || tok === "V." || tok === "m.") { kontext = "para"; erwarteNummer = true; continue; }
    if (/^(ff\.|f\.|analog|entsprechend)$/.test(tok)) { erwarteNummer = false; continue; }
    erwarteNummer = false;
  }
  /* Bindestrich-Bereiche „106-110" liegen als ein Token vor */
  for (const tok of tokens) {
    const r = /^(\d+[a-z]?)[\-–](\d+[a-z]?)$/.exec(tok);
    if (r) { nummern.push({ art, nr: r[1] }); nummern.push({ art, nr: r[2] }); }
  }
  const gesehen = new Set();
  return nummern.filter((n) => { const k = `${gesetz} ${n.art ? "Art." : "§"} ${n.nr}`; if (gesehen.has(k)) return false; gesehen.add(k); return true; })
    .map((n) => ({ key: `${gesetz} ${n.art ? "Art." : "§"} ${n.nr}`, gesetz, nr: n.nr, art: n.art }));
}

/* Alle Zitate in einem Text mit Positionen. */
export function findeNormen(text) {
  const treffer = [];
  NORM_RE.lastIndex = 0;
  let m;
  while ((m = NORM_RE.exec(text)) !== null) {
    treffer.push({ start: m.index, ende: m.index + m[0].length, zitat: m[0], gesetz: m[3], normen: einzelnormen(m[0]) });
  }
  return treffer;
}

export function normSortierung(a, b) {
  const na = parseInt(a.nr, 10); const nb = parseInt(b.nr, 10);
  if (na !== nb) return na - nb;
  return a.nr.localeCompare(b.nr);
}

if (process.argv[1] && process.argv[1].endsWith("normen.mjs")) {
  const proben = [
    "Der Verkäufer ist nach § 433 I BGB verpflichtet; Schadensersatz nach §§ 280 I, III, 281 BGB; Zuständigkeit Art. 94 I Nr. 4b GG i.V.m. §§ 13 Nr. 8a, 91 ff. BVerfGG.",
    "Nach § 130 I 1 BGB und § 204 I Nr. 1 BGB sowie §§ 106-110 BGB; § 44 Abs. 1 S. 2 VwGO; § 8 PolG NRW; Art. 2 I i.V.m. Art. 1 I GG; § 23 Nr. 1 GVG; §§ 985, 823 BGB.",
    "§ 812 I 1 Alt. 1 BGB; § 242 BGB; Art. 12 I GG; § 80 V VwGO; § 35 S. 1 VwVfG; § 22 Nr. 3 StGB; § 100a StPO; § 3 BauO NRW; § 55 GO NRW.",
    "§§ 280 Abs. 1 und 2, 286 BGB; § 281 I 2, 3 BGB; §§ 280 Abs. 1, 3, 283 BGB; §§ 94, 946 BGB; § 823 I, II BGB; §§ 437 Nr. 1, 439 BGB.",
  ];
  for (const p of proben) {
    for (const t of findeNormen(p)) console.log(JSON.stringify(t.zitat), "→", t.normen.map((n) => n.key).join(" | "));
  }
}
