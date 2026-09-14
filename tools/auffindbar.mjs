/* Auffindbarkeit für eine Einzelseiten-Anwendung.

   Das Problem: Die App lebt hinter Hash-Routen (#/zivil/1/lehrbuch/…). Solche
   Adressen werden von Suchmaschinen nicht verlässlich indexiert, und ein
   leeres HTML-Grundgerüst mit nachgeladenem JavaScript erst recht nicht.

   Die ehrliche Lösung ist kein Trick, sondern echter Inhalt: Für jede
   Erklärung, jeden ausgearbeiteten Streitstand und die Vertrauensseiten wird
   eine eigenständige HTML-Seite erzeugt, die den Text tatsächlich enthält –
   lesbar auch ohne JavaScript. Sie verweist per canonical auf sich selbst und
   bietet den Sprung in die App an. Das ist keine Doorway-Page: Der Inhalt ist
   derselbe, der auch in der App steht, und die Seite steht für sich.

   Erzeugt: dist/s/<slug>.html, dist/sitemap.xml, dist/robots.txt.
   Aufruf: node tools/auffindbar.mjs  (läuft in `npm run build` mit) */

import fs from "node:fs";
import path from "node:path";
import { ERKLAERUNGEN } from "../src/data/erklaerungen.js";
import { STREITBILDER } from "../src/data/streitbilder.js";
import { KOMPETENZEN, kompetenzFinden } from "../src/data/kompetenzen.js";
import { LAENDER, WIDERSPRUCH_STAND } from "../src/data/laender.js";
import { PROTOKOLL, LETZTE_AENDERUNG } from "../src/data/protokoll.js";

const BASIS = process.env.JC_BASIS || "https://ccan-devoloper.github.io/juracampus";
const AUS = "dist";
const heute = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) => String(s).toLowerCase()
  .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

const GEBIET_NAME = { zivil: "Zivilrecht", oeff: "Öffentliches Recht", straf: "Strafrecht" };
const STUFE_NAME = { 1: "1. Staatsexamen", 2: "2. Staatsexamen" };

/* Das Grundgerüst. Bewusst ohne Framework: Die Seite muss ohne JavaScript
   vollständig lesbar sein, sonst hätte sie ihren Zweck verfehlt. */
function seite({ titel, beschreibung, pfad, appRoute, kicker, inhalt, jsonld }) {
  const url = `${BASIS}/s/${pfad}`;
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)} – JuraCampus</title>
<meta name="description" content="${esc(beschreibung)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beschreibung)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="JuraCampus">
<meta property="og:locale" content="de_DE">
<meta name="robots" content="index,follow,max-snippet:-1">
<style>
:root{--ink:#111725;--weich:#5b6577;--linie:#e3e7ee;--marke:#1b3faa;--papier:#fff;--grund:#f6f7fa}
@media (prefers-color-scheme:dark){:root{--ink:#e8ecf4;--weich:#9aa5b8;--linie:#232b3a;--marke:#89a6ff;--papier:#141a26;--grund:#0d1219}}
*{box-sizing:border-box}
body{margin:0;background:var(--grund);color:var(--ink);font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
.h{background:var(--papier);border-bottom:1px solid var(--linie);padding:14px 0}
.w{max-width:760px;margin:0 auto;padding:0 20px}
.h a{color:var(--ink);text-decoration:none;font-weight:700}
main{padding:32px 0 60px}
.k{display:inline-block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--marke);margin-bottom:10px}
h1{font-size:clamp(26px,5vw,36px);line-height:1.2;margin:0 0 14px}
h2{font-size:20px;margin:30px 0 10px}
h3{font-size:16px;margin:22px 0 6px}
p{margin:0 0 14px}
.lead{font-size:18px;color:var(--weich)}
ul,ol{padding-left:22px}
li{margin-bottom:7px}
blockquote{margin:0 0 16px;border-left:3px solid var(--marke);padding-left:14px;font-style:italic}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;background:var(--linie);border-radius:4px;padding:1px 6px}
.box{background:var(--papier);border:1px solid var(--linie);border-radius:12px;padding:18px 20px;margin:0 0 16px}
.app{display:inline-block;background:var(--marke);color:#fff;text-decoration:none;border-radius:8px;padding:11px 20px;margin:18px 0}
footer{border-top:1px solid var(--linie);padding:22px 0;color:var(--weich);font-size:13px}
footer a{color:var(--marke)}
table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:left;padding:7px 10px 7px 0;border-bottom:1px solid var(--linie)}
</style>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
<header class="h"><div class="w"><a href="${BASIS}/">JuraCampus</a></div></header>
<main><div class="w">
${kicker ? `<span class="k">${esc(kicker)}</span>` : ""}
<h1>${esc(titel)}</h1>
${inhalt}
<a class="app" href="${BASIS}/${appRoute}">In der Lernplattform öffnen</a>
</div></main>
<footer><div class="w">
<p>JuraCampus – Lernplattform für das 1. und 2. juristische Staatsexamen.
Redaktioneller Rechtsstand 13. September 2026; bei Gesetzesänderungen hat der amtliche Text Vorrang.
<a href="${BASIS}/#/methodik">Methodik und Änderungsprotokoll</a></p>
</div></footer>
</body>
</html>`;
}

const seiten = [];

/* ------------------------------------------------------- Erklärungen */
for (const e of ERKLAERUNGEN) {
  const k = kompetenzFinden(e.k);
  if (!k) continue;
  const pfad = `${slug(k.name)}-${k.gebiet}${k.stufe}.html`;
  const inhalt = `
<p class="lead">${esc(e.kurz)}</p>
<div class="box"><h3 style="margin-top:0">Klausurformulierung</h3><blockquote>${esc(e.formulierung)}</blockquote></div>
<h2>Prüfung Schritt für Schritt</h2>
<ol>${e.mittel.map((m) => `<li><strong>${esc(m.t)}</strong><br>${esc(m.x)}</li>`).join("")}</ol>
<h2>Beispiel und Gegenbeispiel</h2>
<div class="box"><p><strong>So greift es.</strong> ${esc(e.beispiel)}</p><p style="margin:0"><strong>So gerade nicht.</strong> ${esc(e.gegenbeispiel)}</p></div>
<h2>Typische Fehler</h2>
<ul>${e.fallen.map((f) => `<li><strong>${esc(f.f)}</strong> ${esc(f.w)}</li>`).join("")}</ul>
<h2>Vertiefung</h2>
${e.vertiefung.map((v) => `<h3>${esc(v.t)}</h3><p>${esc(v.x)}</p>`).join("")}`;
  seiten.push({
    pfad,
    prioritaet: k.relevanz === "hoch" ? "0.8" : "0.6",
    html: seite({
      titel: k.name,
      beschreibung: e.kurz.slice(0, 300),
      pfad,
      appRoute: `#/${k.gebiet}/${k.stufe}/kompetenzen`,
      kicker: `${GEBIET_NAME[k.gebiet]} · ${STUFE_NAME[k.stufe]}`,
      inhalt,
      jsonld: {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: k.name,
        description: e.kurz,
        inLanguage: "de",
        learningResourceType: "Erklärung",
        educationalLevel: STUFE_NAME[k.stufe],
        about: { "@type": "Thing", name: GEBIET_NAME[k.gebiet] },
        teaches: k.kurz,
        isPartOf: { "@type": "Course", name: "JuraCampus", url: BASIS },
        dateModified: LETZTE_AENDERUNG,
      },
    }),
  });
}

/* ------------------------------------------------------ Streitstände */
const probleme = JSON.parse(fs.readFileSync("src/data/probleme.json", "utf8")).probleme;
for (const b of STREITBILDER) {
  const p = probleme.find((x) => x.id === b.id);
  if (!p) continue;
  const pfad = `streitstand-${slug(p.titel)}.html`;
  const inhalt = `
<p class="lead">${esc(b.frage)}</p>
<div class="box"><h3 style="margin-top:0">Problemtrigger</h3><p style="margin:0">${esc(b.trigger)}</p></div>
<h2>Die Ansichten</h2>
${b.ansichten.map((a, i) => `
<h3>${esc(a.name)}${b.herrschend === i ? " (herrschend)" : ""}</h3>
<p>${esc(a.kurz)}</p>
<p><strong>Dafür spricht:</strong></p><ul>${a.pro.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
<p><strong>Dagegen spricht:</strong></p><ul>${a.contra.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}
${b.rspr ? `<h2>Rechtsprechung</h2><p>${esc(b.rspr)}</p>` : ""}
<h2>Entscheidungserheblichkeit</h2>
<div class="box"><p style="margin:0">${esc(b.erheblich)}</p></div>
<h2>Klausurformulierung</h2>
<blockquote>${esc(b.formulierung)}</blockquote>
${b.quelle ? `<p><code>${esc(b.quelle)}</code></p>` : ""}`;
  seiten.push({
    pfad,
    prioritaet: "0.7",
    html: seite({
      titel: p.titel,
      beschreibung: b.frage.slice(0, 300),
      pfad,
      appRoute: `#/${p.gebiet}/${p.stufe}/streit/${p.id}`,
      kicker: `Streitstand · ${p.bereich}`,
      inhalt,
      jsonld: {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: p.titel,
        description: b.frage,
        inLanguage: "de",
        learningResourceType: "Meinungsstreit",
        educationalLevel: STUFE_NAME[p.stufe],
        about: { "@type": "Thing", name: GEBIET_NAME[p.gebiet] },
        isPartOf: { "@type": "Course", name: "JuraCampus", url: BASIS },
        dateModified: LETZTE_AENDERUNG,
      },
    }),
  });
}

/* -------------------------------------------------------- Landesrecht */
for (const l of LAENDER) {
  const pfad = `landesrecht-${slug(l.name)}.html`;
  const inhalt = `
<p class="lead">Welche Gesetze Sie im Öffentlichen Recht zitieren, wenn Sie in ${esc(l.name)} Examen schreiben.</p>
<table>
<tr><th>Gefahrenabwehr</th><td><code>${esc(l.polizei.k)}</code> ${esc(l.polizei.n)}<br>Generalklausel: <code>${esc(l.polizei.general)}</code></td></tr>
<tr><th>Bauordnungsrecht</th><td><code>${esc(l.bau.k)}</code> ${esc(l.bau.n)}</td></tr>
<tr><th>Kommunalrecht</th><td><code>${esc(l.kommunal.k)}</code> ${esc(l.kommunal.n)}</td></tr>
<tr><th>Verwaltungsverfahren</th><td><code>${esc(l.vwvfg.k)}</code> ${esc(l.vwvfg.n)}</td></tr>
<tr><th>Vollstreckung</th><td><code>${esc(l.vollstreckung.k)}</code> ${esc(l.vollstreckung.n)}</td></tr>
</table>
<h2>Widerspruchsverfahren</h2>
<p><strong>${esc(WIDERSPRUCH_STAND[l.widerspruch.stand].label)}.</strong> ${esc(l.widerspruch.text)}</p>
<h2>Was in ${esc(l.name)} anders ist</h2>
<p>${esc(l.besonderheit)}</p>
<div class="box"><p style="margin:0"><strong>Grenze dieser Angabe.</strong> Hier stehen Gesetzeskürzel und der Grundstand des
Vorverfahrens – beides über Jahre stabil. Nicht enthalten sind Klausurzahlen, Notenstufen und Termine.
Die Ausnahmen vom Vorverfahren stehen in den Ausführungsgesetzen zur VwGO und werden regelmäßig geändert;
im Zweifel gilt das Landesrecht in seiner aktuellen Fassung.</p></div>`;
  seiten.push({
    pfad,
    prioritaet: "0.6",
    html: seite({
      titel: `Landesrecht ${l.name}`,
      beschreibung: `Gefahrenabwehr nach ${l.polizei.k}, Bauordnungsrecht nach ${l.bau.k}, Stand des Widerspruchsverfahrens in ${l.name}.`,
      pfad,
      appRoute: "#/landesrecht",
      kicker: "Landesrecht",
      inhalt,
      jsonld: {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: `Landesrecht ${l.name}`,
        inLanguage: "de",
        learningResourceType: "Übersicht",
        about: { "@type": "Thing", name: "Öffentliches Recht" },
        isPartOf: { "@type": "Course", name: "JuraCampus", url: BASIS },
        dateModified: LETZTE_AENDERUNG,
      },
    }),
  });
}

/* ------------------------------------------------------ Vertrauensseite */
{
  const pfad = "methodik.html";
  const inhalt = `
<p class="lead">Wer juristische Inhalte anbietet, schuldet zwei Angaben: wie er arbeitet und wo seine Aussagen enden.</p>
<h2>Änderungsprotokoll</h2>
<ul>${PROTOKOLL.map((p) => `<li><strong>${esc(p.datum)} – ${esc(p.titel)}.</strong> ${esc(p.text)}${p.umfang ? ` <code>${esc(p.umfang)}</code>` : ""}</li>`).join("")}</ul>
<h2>Grenzen</h2>
<p>Die Inhalte sind nicht durch eine externe Redaktion gegengelesen. Die Examensrelevanz-Marker sind eine redaktionelle
Einschätzung, keine Auswertung von Prüfungsstatistiken. Der Rechtsstand ist der des Quellwerks; spätere
Gesetzesänderungen sind nicht eingearbeitet, solange sie im Protokoll nicht ausgewiesen sind. Es findet keine
menschliche Korrektur eigener Klausuren statt.</p>`;
  seiten.push({
    pfad,
    prioritaet: "0.9",
    html: seite({
      titel: "Methodik und Änderungsprotokoll",
      beschreibung: "Wie JuraCampus arbeitet, was geprüft wird, was nicht – und wann was geändert wurde.",
      pfad,
      appRoute: "#/methodik",
      kicker: "Vertrauen",
      inhalt,
      jsonld: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Methodik und Änderungsprotokoll",
        inLanguage: "de",
        dateModified: LETZTE_AENDERUNG,
        isPartOf: { "@type": "Course", name: "JuraCampus", url: BASIS },
      },
    }),
  });
}

/* ------------------------------------------------------------ Schreiben */
const ordner = path.join(AUS, "s");
fs.mkdirSync(ordner, { recursive: true });
for (const s of seiten) fs.writeFileSync(path.join(ordner, s.pfad), s.html);

/* Übersichtsseite, damit die Einzelseiten untereinander verlinkt sind –
   isolierte Seiten ohne eingehende Verweise werden schlechter gefunden. */
const index = seite({
  titel: "Alle Erklärungen, Streitstände und Landesrechtsübersichten",
  beschreibung: `${seiten.length} Einzelseiten zu Kompetenzen, Meinungsstreiten und Landesrecht für beide Staatsexamina.`,
  pfad: "index.html",
  appRoute: "#/",
  kicker: "Übersicht",
  inhalt: `<p class="lead">${seiten.length} Seiten mit vollständigem Text – lesbar auch ohne JavaScript.</p>
<h2>Erklärungen zu den Kompetenzen</h2>
<ul>${seiten.filter((s) => !/^streitstand-|^landesrecht-|^methodik/.test(s.pfad)).map((s) => `<li><a href="${BASIS}/s/${s.pfad}">${esc(s.pfad.replace(/-(zivil|oeff|straf)[12]\.html$/, "").replace(/-/g, " "))}</a></li>`).join("")}</ul>
<h2>Streitstände</h2>
<ul>${seiten.filter((s) => s.pfad.startsWith("streitstand-")).map((s) => `<li><a href="${BASIS}/s/${s.pfad}">${esc(s.pfad.replace(/^streitstand-|\.html$/g, "").replace(/-/g, " "))}</a></li>`).join("")}</ul>
<h2>Landesrecht</h2>
<ul>${seiten.filter((s) => s.pfad.startsWith("landesrecht-")).map((s) => `<li><a href="${BASIS}/s/${s.pfad}">${esc(s.pfad.replace(/^landesrecht-|\.html$/g, "").replace(/-/g, " "))}</a></li>`).join("")}</ul>`,
  jsonld: { "@context": "https://schema.org", "@type": "CollectionPage", name: "JuraCampus – Einzelseiten", inLanguage: "de", dateModified: LETZTE_AENDERUNG },
});
fs.writeFileSync(path.join(ordner, "index.html"), index);

const eintraege = [
  { loc: `${BASIS}/`, pri: "1.0" },
  { loc: `${BASIS}/s/`, pri: "0.9" },
  ...seiten.map((s) => ({ loc: `${BASIS}/s/${s.pfad}`, pri: s.prioritaet })),
];
fs.writeFileSync(path.join(AUS, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${eintraege.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${heute}</lastmod><priority>${e.pri}</priority></url>`).join("\n")}
</urlset>
`);

fs.writeFileSync(path.join(AUS, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${BASIS}/sitemap.xml
`);

console.log(`Auffindbarkeit: ${seiten.length + 1} statische Seiten in dist/s/, sitemap.xml mit ${eintraege.length} Einträgen, robots.txt`);
