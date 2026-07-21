# KI-Prozessanalyse — Tool-Analyse

Interaktive Website zum Whitepaper [„KI in der Prozessanalyse“](https://epub.uni-bayreuth.de/id/eprint/8942/1/KI_in_der_Prozessanalyse.pdf). Besucher:innen beantworten 5 Fragen zu ihrem Prozessmanagement-Kontext und erhalten eine personalisierte Tool-Empfehlung (ADONIS / SUMM AI / PICTURE nova / Open-Source-Stack).

Plain HTML/CSS/vanilla JS — kein Build-Schritt, kein Node erforderlich. Einfach `index.html` im Browser öffnen oder per GitHub Pages ausliefern.

## Seiten

| Datei | Zweck |
|---|---|
| `index.html` | Landing: Hero mit Beispiel-Ergebnis, Anwendungsfälle, Tool-Übersicht, Social Proof |
| `wizard.html` | 5-Fragen-Tool-Analyse (Client-State via `localStorage`) |
| `ergebnis.html` | Empfehlung, Begründung, Einschränkung, Alternative, Antwort-Zusammenfassung; optionales PDF-per-E-Mail-Formular |
| `methodik.html` | Anwendungsfälle, Bewertungskriterien, Open-Source-Tools-Tabelle |
| `impressum.html`, `datenschutz.html` | Rechtstexte (**Platzhalter**, siehe unten) |

## Struktur

```
css/styles.css              Design-Tokens, Layout, Komponenten
js/wizard-data.js           Fragen, Tools, Scoring-Funktion (Empfehlungslogik)
js/wizard.js                Rendert die Fragen-Schritte
js/process-path.js          Fortschrittsanzeige (Prozesspfad-Signaturelement)
js/open-source-tools.js     Daten + Render-Funktion für die 6 Open-Source-Tools (methodik.html + ergebnis.html)
js/ergebnis.js               Empfehlung berechnen, Gründe/Einschränkung/Antworten anzeigen
```

Empfehlungslogik: `computeRecommendation()` in `js/wizard-data.js` vergibt pro Antwort Punkte an die vier Tools (`SCORE_TABLE`) und wählt die höchste als Primär-, die zweithöchste als Alternativempfehlung. `getRecommendationReasons()` leitet daraus die personalisierten Gründe auf der Ergebnisseite ab.

## Offene Punkte vor Livegang

- **PDF/Mail-Integration**: Das "Ergebnis als PDF erhalten"-Formular auf `ergebnis.html` ist bewusst deaktiviert (kein Fake-Erfolg) — es fehlt noch eine echte PDF-Generierung und ein Mail-/CRM-Endpoint.
- **Rechtstexte**: `impressum.html` und `datenschutz.html` enthalten Platzhalter, die vor Livegang durch geprüfte Inhalte ersetzt werden müssen.
- **FIM-Kontaktadresse**: Der Mailto-Link auf `ergebnis.html` nutzt eine Platzhalter-Adresse (`beratung@fim-rc.de`).
