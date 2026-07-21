# KI-Prozessanalyse — Tool-Analyse

Interaktive Website zum Whitepaper [„KI in der Prozessanalyse“](https://epub.uni-bayreuth.de/id/eprint/8942/1/KI_in_der_Prozessanalyse.pdf). Besucher:innen beantworten 5 Fragen zu ihrem Prozessmanagement-Kontext und erhalten eine personalisierte Tool-Empfehlung (ADONIS / SUMM AI / PICTURE nova / Open-Source-Stack).

Plain HTML/CSS/vanilla JS — kein Build-Schritt, kein Node erforderlich. Einfach `index.html` im Browser öffnen oder per GitHub Pages ausliefern.

## Seiten

| Datei | Zweck |
|---|---|
| `index.html` | Landing: Hero, Anwendungsfälle, Tool-Übersicht, Social Proof |
| `wizard.html` | 5-Fragen-Tool-Analyse (Client-State via `localStorage`) |
| `ergebnis.html` | Empfehlung + Begründung + E-Mail-Gate + FIM-Kontakt |
| `report.html` | Whitepaper-Download, freigeschaltet nach E-Mail-Gate |
| `methodik.html` | Anwendungsfälle und Bewertungskriterien |
| `impressum.html`, `datenschutz.html` | Rechtstexte (**Platzhalter**, siehe unten) |

## Struktur

```
css/styles.css        Design-Tokens, Layout, Komponenten
js/wizard-data.js      Fragen, Tools, Scoring-Funktion (Empfehlungslogik)
js/wizard.js           Rendert die Fragen-Schritte
js/process-path.js     Fortschrittsanzeige (Prozesspfad-Signaturelement)
js/ergebnis.js         Empfehlung berechnen, Antworten anzeigen, Lead-Form
```

Empfehlungslogik: `computeRecommendation()` in `js/wizard-data.js` vergibt pro Antwort Punkte an die vier Tools (`SCORE_TABLE`) und wählt die höchste als Primär-, die zweithöchste als Alternativempfehlung.

## Offene Punkte vor Livegang

- **CRM/Mail-Endpoint**: Das E-Mail-Gate (`js/ergebnis.js`) speichert aktuell nur lokal — Anbindung an ein echtes CRM/Mail-Tool fehlt noch.
- **Rechtstexte**: `impressum.html` und `datenschutz.html` enthalten Platzhalter, die vor Livegang durch geprüfte Inhalte ersetzt werden müssen.
- **FIM-Kontaktadresse**: Der Mailto-Link auf `ergebnis.html` nutzt eine Platzhalter-Adresse (`beratung@fim-rc.de`).
