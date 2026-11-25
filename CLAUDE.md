# CLAUDE.md – Projekt WERKSTATT24

## Rolle und Ziel
- WERKSTATT24 ist ein **fiktiver Demo-Shop** für Heimwerkerbedarf, Werkzeuge und Zubehör. Er ist Teil einer KI-Weiterbildung.
- Alle Unternehmens- und Produktdaten sind erfunden.
- Ich soll jede Lösung selbst verstehen und präsentieren können. Unterstütze und erkläre, statt Lösungen ohne Verständnis zu liefern.

## Zielgruppe und Positionierung
- Private Heimwerker, vor allem Gelegenheits-Heimwerker und Einsteiger.
- Leitsatz: „Alles, was du für dein Projekt brauchst – easy erklärt, easy gemacht."

## Startprodukte und Preise (fiktiv)
- Akkuschrauber W24 Compact 18V – 79,90 €
- Werkzeugkoffer W24 Basic, 45-teilig – 49,90 €
- Schrauben und Dübel-Set Universal W24, 150-teilig – 14,90 €
- Geplant sind 10–12 Produkte. Bundles sind vorerst nicht vorgesehen.
- Änderungen an Produkten und Preisen nur nach meiner Freigabe.

## Arbeitsweise
- Antworte auf Deutsch, verständlich und Schritt für Schritt. Ich bin kein Programmierer.
- Erkläre kurz, was du tust und warum.
- Bei Fehlern: erst die Ursache einfach erklären, dann die Lösung.
- Arbeite in kleinen Schritten und frage nach, wenn eine Entscheidung offen ist.
- Erfinde keine Produktdetails. Kennzeichne Annahmen als Annahmen.

## Gestaltung
- Modern und übersichtlich, viel Weißraum, gute Lesbarkeit, ausreichende Kontraste (auch bei Buttons und Links).
- Produktschema: 1. Produktname und Preis / 2. Ein Satz: Wofür ist es gut? / 3. Das ist dabei / 4. Dafür eignet es sich (2–3 Beispiele) / 5. Gut zu wissen.
- Einheitliches Namensschema für Produkte (Marke W24).

## Pflichtangaben
- Der Demo-Hinweis muss gut sichtbar bleiben (Demo-Streifen oben, Hinweise im Fußbereich).
- Nur erfundene Testdaten verwenden.
- Keine echten Bestellungen, keine Zahlungsabwicklung. Preise sind fiktiv.
- Keine geschützten Marken oder Logos realer Unternehmen.

## Tonalität
- Freundlich, klar, lösungsorientiert, wie ein hilfsbereiter Nachbar mit Werkstatt-Erfahrung.
- Einfache Sprache, kurze Sätze, Ansprache mit „du".
- Ermutigend, aber ohne Übertreibung und ohne erfundene Leistungsdaten.

## Sicherheit
- API-Schlüssel, Passwörter und Zugangsdaten gehören nie in den Code oder auf GitHub, sondern in `.env`-Dateien, die in `.gitignore` stehen. Weise aktiv darauf hin.

## Git
- Erinnere mich regelmäßig daran, Arbeitsstände mit Git zu sichern.
- **Commit und Push nur, wenn ich ausdrücklich darum bitte.** Nie von dir aus.
- **Vor jedem Commit** prüfst du alle Dateien, die gesichert werden sollen (`git status`, `git diff`), auf Passwörter, API-Schlüssel, Tokens und echte persönliche Daten. Du sagst mir das Ergebnis, bevor du committest. Bei einem Fund: nichts committen, mich informieren.
- Vor jedem Git-Befehl sagst du mir kurz, was er tut und was ich selbst tun muss.
- `.gitignore` schützt geheime Dateien (`.env` usw.). Sie darf nicht abgeschwächt werden. Niemals `git add -f` für ignorierte Dateien verwenden.
- Beispiele in Commits und Dateien nur mit erfundenen Testdaten.

## Projektstruktur und Regeln für die Website
- `website/index.html` = Inhalt und Struktur (inkl. Inline-SVG-Symbole)
- `website/css/style.css` = Gestaltung (Farbvariablen, Layout, Media Queries)
- `website/js/app.js` = Verhalten (bisher nur das mobile Menü)
- `website/fonts/` = lokale Schriften mit Lizenzen (aktuell nur eine README, es werden Systemschriften genutzt)
- `_sicherung/` = Sicherungskopie des Stands vor dem Umbau
- Es werden keine externen Ressourcen geladen (keine Google Fonts, CDNs, externe Skripte, Bilder oder Icons).
- Bei 320 px Breite darf kein seitliches Scrollen entstehen.
- Tippflächen sind mindestens 24 × 24 CSS-Pixel groß.
- Ohne JavaScript bleibt die Navigation immer sichtbar.
- Keine zusätzlichen Shop-Funktionen ohne meine Freigabe.
