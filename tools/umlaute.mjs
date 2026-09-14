/* Rückumwandlung der Transliterationen ae/oe/ue → ä/ö/ü und ausgewählter
   ss-Schreibungen → ß. Die Quelle (Bände 1–4) ist teilweise ohne Umlaute
   gesetzt; ein Lernprodukt braucht korrekte Orthographie.

   Regeln (konservativ – lieber ein „ae" stehen lassen als ein falsches „ä"):
   - kein Umlaut nach a/e/o/q (Bauer, Steuer, neue, Quelle) und in „zuer"/„zuei"
     (zuerst, zuerkennen, Zueignung, zueinander)
   - Ausnahmewörter (aktuell, individuell, Michael, Israel, Goethe, Poesie …)
   - ß nur für eine geprüfte Liste von Stämmen (maßgeblich, gemäß, außer, groß,
     schließ-, Verstoß, Fuß, Maßregel …), nie pauschal. */

const AUSNAHMEN = [
  /* ue */
  "aktuell", "eventuell", "individuell", "manuell", "virtuell", "punktuell",
  "intellektuell", "sexuell", "graduell", "visuell", "kontinuierlich", "duell",
  "duett", "statue", "residuum", "kontinuum", "vakuum", "menuett", "ritual",
  /* ae */
  "israel", "michael", "rafael", "raphael", "ismael", "aerosol", "aerodynam", "paella", "aequator",
  /* oe */
  "goethe", "boeing", "oeuvre", "poesie", "poet", "koexist", "koedu", "moers", "soest",
  "coesfeld", "itzehoe", "koeffizient",
];

const MARKER = "";

function schuetzen(text) {
  const merker = [];
  let t = text;
  for (const w of AUSNAHMEN) {
    t = t.replace(new RegExp(w, "gi"), (m) => { merker.push(m); return `${MARKER}${merker.length - 1}${MARKER}`; });
  }
  /* „zuer"/„zuei" bleibt (zuerst, zuerkennen, Zueignung, zueinander) */
  t = t.replace(/zue(?=[ri])/gi, (m) => { merker.push(m); return `${MARKER}${merker.length - 1}${MARKER}`; });
  return { t, merker };
}

const SS = [
  [/äusser/g, "äußer"], [/Äusser/g, "Äußer"],
  [/ausser/g, "außer"], [/Ausser/g, "Außer"],
  [/aussen/g, "außen"], [/Aussen/g, "Außen"],
  [/massgeb/g, "maßgeb"], [/Massgeb/g, "Maßgeb"],
  [/massnahme/g, "maßnahme"], [/Massnahme/g, "Maßnahme"],
  [/massstab/g, "maßstab"], [/Massstab/g, "Maßstab"],
  [/massregel/g, "maßregel"], [/Massregel/g, "Maßregel"],
  [/massvoll/g, "maßvoll"],
  [/(ü|Ü)bermass/g, "$1bermaß"], [/(a|A)usmass/g, "$1usmaß"], [/(s|S)trafmass/g, "$1trafmaß"],
  [/(h|H)öchstmass/g, "$1öchstmaß"], [/(m|M)indestmass/g, "$1indestmaß"],
  [/gemäss/g, "gemäß"], [/Gemäss/g, "Gemäß"],
  [/mässig/g, "mäßig"], [/Mässig/g, "Mäßig"],
  [/gröss/g, "größ"], [/Gröss/g, "Größ"],
  [/gross/g, "groß"], [/Gross/g, "Groß"],
  [/strasse/g, "straße"], [/Strasse/g, "Straße"],
  [/schliess/g, "schließ"], [/Schliess/g, "Schließ"],
  [/fuss/g, "fuß"], [/Fuss/g, "Fuß"],
  [/stoss/g, "stoß"], [/Stoss/g, "Stoß"], [/stösse/g, "stöße"], [/Stösse/g, "Stöße"],
  [/bloss/g, "bloß"], [/Bloss/g, "Bloß"],
  [/heiss/g, "heiß"], [/Heiss/g, "Heiß"],
  [/(?<![Bb]e|[Nn]ach|[Aa]us|[Vv]er|[Hh]in|[Aa]n)weiss/g, "weiß"], [/(?<![Bb]e|[Nn]ach|[Aa]us|[Vv]er|[Hh]in|[Aa]n)Weiss/g, "Weiß"],
  [/säuem/g, "säum"],
  [/reiss/g, "reiß"], [/Reiss/g, "Reiß"],
  [/fliess/g, "fließ"], [/Fliess/g, "Fließ"],
  [/geniess/g, "genieß"], [/Geniess/g, "Genieß"],
  [/schiess/g, "schieß"], [/Schiess/g, "Schieß"],
  [/giess/g, "gieß"], [/Giess/g, "Gieß"],
  [/spass/g, "spaß"], [/Spass/g, "Spaß"],
  [/bussgeld/g, "bußgeld"], [/Bussgeld/g, "Bußgeld"], [/geldbusse/g, "geldbuße"], [/Geldbusse/g, "Geldbuße"],
  [/preussen/g, "preußen"], [/Preussen/g, "Preußen"],
  [/fleiss/g, "fleiß"], [/Fleiss/g, "Fleiß"],
  [/besass/g, "besaß"],
  [/liess/g, "ließ"], [/Liess/g, "Ließ"],
  [/stiess/g, "stieß"], [/hiess/g, "hieß"],
  [/verstoss/g, "verstoß"], [/Verstoss/g, "Verstoß"],
  [/grüsse/g, "grüße"], [/Grüsse/g, "Grüße"],
  [/süss/g, "süß"],
];

export function umlaute(text) {
  if (!text || !/ae|oe|ue|Ae|Oe|Ue|ss/.test(text)) return text;
  const { t: geschuetzt, merker } = schuetzen(text);
  let t = geschuetzt;
  /* Bezuege, zuegig, Zuechter → Bezüge, zügig, Züchter */
  t = t.replace(/zue(?=[gcn])/g, "zü").replace(/Zue(?=[gcn])/g, "Zü");
  /* Vorsilben ge-/be- vor Umlaut: geaendert, geaeussert, geoeffnet, geuebt, beaeugt */
  t = t.replace(/(?<=[gGbB]e)ae/g, "ä").replace(/(?<=[gGbB]e)oe/g, "ö").replace(/(?<=[gG]e)ue(?=b)/g, "ü");
  /* Umlaute – nicht nach a/e/o/q (Bauer, Steuer, neue, Quelle) und nicht in geschützten Wörtern */
  t = t.replace(/(?<![aeoqAEOQ])ue/g, "ü").replace(/(?<![aeoqAEOQ])Ue/g, "Ü");
  t = t.replace(/(?<![aeoAEO])ae/g, "ä").replace(/(?<![aeoAEO])Ae/g, "Ä");
  t = t.replace(/(?<![aeoAEO])oe/g, "ö").replace(/(?<![aeoAEO])Oe/g, "Ö");
  t = t.replace(new RegExp(`${MARKER}(\\d+)${MARKER}`, "g"), (_, n) => merker[Number(n)]);
  for (const [re, ersatz] of SS) t = t.replace(re, ersatz);
  return t;
}

/* Selbsttest: `node tools/umlaute.mjs` */
if (process.argv[1] && process.argv[1].endsWith("/umlaute.mjs")) {
  const proben = {
    "geaendert, geaeussert, geoeffnet, ausgeuebt, bereuen, beaeugt": "geändert, geäußert, geöffnet, ausgeübt, bereuen, beäugt",
    "Beweisstation, Beweissicherung, Nachweisschwierigkeit, weiss, Weissbier, saeumig": "Beweisstation, Beweissicherung, Nachweisschwierigkeit, weiß, Weißbier, säumig",
    "Rechtsgeschaeftslehre": "Rechtsgeschäftslehre",
    "Der Kaeufer schuldet Kaufpreiszahlung": "Der Käufer schuldet Kaufpreiszahlung",
    "Zueignungsabsicht und zuerst": "Zueignungsabsicht und zuerst",
    "Bezuege, zuegig, Zuechter": "Bezüge, zügig, Züchter",
    "Bauer, Steuer, neue Mauer, Quelle, bequem": "Bauer, Steuer, neue Mauer, Quelle, bequem",
    "aktuell, individuell, eventuell": "aktuell, individuell, eventuell",
    "Michael, Israel, Goethe, Poesie": "Michael, Israel, Goethe, Poesie",
    "Ueberschuss, Oeffentlich, Aerztin": "Überschuss, Öffentlich, Ärztin",
    "grundsaetzlich massgeblich gemaess regelmaessig": "grundsätzlich maßgeblich gemäß regelmäßig",
    "Massnahme, Massstab, Massregel, Ausmass": "Maßnahme, Maßstab, Maßregel, Ausmaß",
    "ausserdem draussen gross Strasse schliesslich ausschliesslich": "außerdem draußen groß Straße schließlich ausschließlich",
    "Verstoss, Verstösse, Anstoss, Fussgaenger, bloss": "Verstoß, Verstöße, Anstoß, Fußgänger, bloß",
    "Insassen, Genossenschaft, Beschluss, Prozess, muss, dass, Masse, Erlass": "Insassen, Genossenschaft, Beschluss, Prozess, muss, dass, Masse, Erlass",
    "Bussgeld, Geldbusse, Omnibussen": "Bußgeld, Geldbuße, Omnibussen",
    "besass, liess, unterliess, hiess": "besaß, ließ, unterließ, hieß",
    "anzuerkennen, zueinander, Zuerkennung": "anzuerkennen, zueinander, Zuerkennung",
    "Einfluss, Fluss, Abschluss, Genuss, Missbrauch": "Einfluss, Fluss, Abschluss, Genuss, Missbrauch",
    "gewiss, Wissen, Beweis": "gewiss, Wissen, Beweis",
    "Vertraege ueber digitale Produkte": "Verträge über digitale Produkte",
    "Verhaeltnismaessigkeit": "Verhältnismäßigkeit",
    "Heizoel, Oel, Boerse": "Heizöl, Öl, Börse",
    "Trauer, Dauer, genauer, Feuer, treue, Betreuer": "Trauer, Dauer, genauer, Feuer, treue, Betreuer",
    "Konsequenz Frequenz quer": "Konsequenz Frequenz quer",
    "Gesamtpruefungsreihenfolge Erlöschen": "Gesamtprüfungsreihenfolge Erlöschen",
  };
  let fehler = 0;
  for (const [ein, soll] of Object.entries(proben)) {
    const ist = umlaute(ein);
    if (ist !== soll) { fehler++; console.log("FEHLER:", JSON.stringify(ein), "→", JSON.stringify(ist), "erwartet", JSON.stringify(soll)); }
  }
  console.log(fehler ? `${fehler} Fehler` : `alle ${Object.keys(proben).length} Proben bestanden`);
  process.exit(fehler ? 1 : 0);
}
