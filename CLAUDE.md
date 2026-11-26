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
- `website/produkte/` = eine Detailseite pro Produkt (siehe Abschnitt „Mehrseitige Website“)
- `website/warenkorb.html` = Warenkorbseite (siehe Abschnitt „Warenkorb“)
- `website/js/app.js` = Verhalten (mobiles Menü und Warenkorb)
- `website/fonts/` = lokale Schriften mit Lizenzen (aktuell nur eine README, es werden Systemschriften genutzt)
- `_sicherung/` = Sicherungskopie des Stands vor dem Umbau
- Es werden keine externen Ressourcen geladen (keine Google Fonts, CDNs, externe Skripte, Bilder oder Icons).
- Bei 320 px Breite darf kein seitliches Scrollen entstehen.
- Tippflächen sind mindestens 24 × 24 CSS-Pixel groß.
- Ohne JavaScript bleibt die Navigation immer sichtbar.
- Keine zusätzlichen Shop-Funktionen ohne meine Freigabe.

## Mehrseitige Website (Regeln)
- Jedes Produkt hat genau eine Detailseite in `website/produkte/`.
- Dateinamen nur mit Kleinbuchstaben und Bindestrichen, Umlaute und ß ausgeschrieben (ü → ue), z. B. `akkuschrauber-w24-compact-18v.html`.
- Relative Pfade: Startseite nutzt `css/style.css`, `js/app.js` und `produkte/<datei>.html`. Produktseiten nutzen `../css/style.css`, `../js/app.js` und `../index.html`. Keine absoluten Pfade, keine externen Ressourcen.
- Kopfzeile, Navigation, Demo-Streifen und Fußzeile sind auf allen Seiten gleich. Wird eine davon geändert, werden alle Seiten angepasst. Navigationslinks zeigen immer auf `index.html#…` (bzw. `../index.html#…`).
- Alle Seiten verwenden dieselbe `style.css` und `app.js`. Neue Stile werden nur ergänzt, bestehende nicht ohne Grund geändert.
- Produktdaten stehen direkt im HTML (keine Datenbank, kein JSON, kein Skript).
- Produktname, Bild und Preis müssen auf Startseite und Detailseite übereinstimmen. Änderungen nur nach meiner Freigabe.
- Jede Produktillustration (Startseite und Detailseite) hat einen aussagekräftigen Alternativtext (`role="img"` mit `aria-label`).
- Preise haben immer den Hinweis „inkl. MwSt., zzgl. Versand“.
- Versand, Lieferzeit und Rückgabe sind fiktiv und auf allen Produktseiten gleich: Versand pauschal 4,90 €, ab 50,00 € Warenwert kostenlos; Lieferzeit 2–4 Werktage; Rückgabe innerhalb von 14 Tagen ab Erhalt.
- Alle Produktdetailseiten enthalten dieselbe Breadcrumb-Navigation (`<nav class="brotkrumen" aria-label="Brotkrumen">` mit `<ol>`), direkt unter der Kopfzeile und über den Produktinformationen: Startseite (`../index.html`) › Produkte (`../index.html#produkte`) › aktueller Produktname. Der aktuelle Name ist kein Link, sondern `aria-current="page"`. Bei neuen Produktseiten wird sie mit angelegt. Es gibt nur eine Breadcrumb pro Seite.
- Jede Produktseite hat Rücklinks zur Produktübersicht (`../index.html#produkte`).
- Neue Produkte: Karte auf der Startseite (mit „Zum Produkt“ und „In den Warenkorb“), neue Detailseite nach dem Muster der bestehenden Seiten und diese Regeln.

## Warenkorb (Regeln)
- Der Warenkorb ist eine Demo: keine echten Bestellungen, keine Zahlung, keine persönlichen Daten, keine Eingabefelder dafür.
- Die Logik steht in `website/js/app.js`, die Seite in `website/warenkorb.html`, die Gestaltung in `style.css`. Keine externen Bibliotheken.
- Es gibt keine eigene Produktliste. Jeder „In den Warenkorb“-Button hat `data-produkt-id` (= Dateiname des Produkts ohne `.html`). Name (`h1`/`h3`) und Preis (`.preis`) liest `app.js` aus dem HTML der Karte bzw. Produktseite. Neben dem Button steht ein `div.korb-meldung` mit `role="status"` für die Bestätigung.
- LocalStorage: ein Schlüssel `werkstatt24-warenkorb`, Wert = JSON-Liste `[{id, name, preisCent, menge}]`. Geschrieben wird erst beim ersten Hinzufügen, beim reinen Seitenaufruf nie. Ist der Warenkorb leer, wird der Eintrag gelöscht (`removeItem`).
- Gelesene Daten werden geprüft (ganze Zahlen, Menge 1–10). Ausgabe nur mit `textContent`, nie mit `innerHTML`. Zugriffe auf LocalStorage immer mit `try/catch`.
- Rechnen nur in ganzen Cent, Anzeige im deutschen Euroformat (`Intl.NumberFormat("de-DE")`).
- Menge 1–10, Änderung über Plus-/Minus-Schaltflächen mit verständlichen Beschriftungen für Screenreader. Entfernen einzeln möglich.
- Versand: 4,90 € pauschal, ab 50,00 € Zwischensumme kostenlos. Die Gesamtsumme zeigt eindeutig, dass Mehrwertsteuer und Versandkosten enthalten sind.
- Der Zähler „Warenkorb (n)“ in der Kopfzeile zeigt die Gesamtzahl aller Artikel und wird auf jeder Seite von `app.js` gesetzt. Der Link zeigt auf `warenkorb.html` bzw. `../warenkorb.html`.
- Änderungen (Hinzufügen, Menge, Entfernen) werden sichtbar und per `role="status"` angesagt. Der Fokus geht nach dem Neuzeichnen nie verloren.
- Demo-Bestellung: Button „Demo-Bestellung absenden“ zeigt eine Bestätigung, leert den Warenkorb und löscht den Eintrag.
- Neue Produkte brauchen keinen Eintrag im Skript, nur den Button mit `data-produkt-id` im HTML.
