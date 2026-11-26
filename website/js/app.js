/* Verhalten der Seite: hier nur das mobile Menü. */
(function () {
  var html = document.documentElement;
  var knopf = document.querySelector(".menue-knopf");
  var nav = document.getElementById("hauptnavigation");
  if (!knopf || !nav) { return; }

  // Meldet dem CSS: "JavaScript läuft". Erst jetzt darf das Menü auf dem Handy einklappen.
  html.classList.add("js");

  // Menü öffnen (true) oder schließen (false) und aria-expanded für Screenreader mitführen
  function setzeMenue(offen) {
    html.classList.toggle("nav-offen", offen);
    knopf.setAttribute("aria-expanded", offen ? "true" : "false");
  }

  // Klick auf "Menü": wechselt zwischen auf und zu
  knopf.addEventListener("click", function () {
    setzeMenue(knopf.getAttribute("aria-expanded") !== "true");
  });

  // Klick auf einen Menülink: Menü wieder zuklappen
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { setzeMenue(false); }
  });

  // Escape: Menü zuklappen und Fokus zurück auf die Menü-Schaltfläche
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && knopf.getAttribute("aria-expanded") === "true") {
      setzeMenue(false);
      knopf.focus();
    }
  });

  // Fenster wird auf Desktopbreite vergrößert: Zustand zurücksetzen
  var desktop = window.matchMedia("(min-width: 801px)");
  desktop.addEventListener("change", function (e) {
    if (e.matches) { setzeMenue(false); }
  });
})();

/* ===== Warenkorb =====
   Produktdaten (Name, Preis) werden beim Klick aus dem HTML gelesen, es gibt keine eigene Produktliste.
   Gespeichert wird im LocalStorage unter einem Schlüssel: [{id, name, preisCent, menge}].
   Gerechnet wird nur in ganzen Cent, angezeigt wird im deutschen Euroformat. */
(function () {
  var SCHLUESSEL = "werkstatt24-warenkorb";
  var MAX_MENGE = 10;
  var VERSAND_CENT = 490;          // 4,90 €
  var GRENZE_FREI_CENT = 5000;     // ab 50,00 € Warenwert versandkostenfrei
  var notKorb = null;              // Reserve im Arbeitsspeicher, falls der Browser das Speichern sperrt
  var bestellt = false;            // true, solange die Bestätigung der Demo-Bestellung gezeigt wird

  var euroFormat = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
  function formatEuro(cent) { return euroFormat.format(cent / 100); }

  function istGanzzahl(n) { return typeof n === "number" && isFinite(n) && Math.floor(n) === n; }

  // Prüft gelesene Daten: ungültige oder doppelte Einträge werden verworfen
  function bereinige(liste) {
    var ergebnis = [];
    if (!Array.isArray(liste)) { return ergebnis; }
    liste.forEach(function (z) {
      if (z && typeof z.id === "string" && z.id && typeof z.name === "string" &&
          istGanzzahl(z.preisCent) && z.preisCent >= 0 &&
          istGanzzahl(z.menge) && z.menge >= 1 && z.menge <= MAX_MENGE &&
          !ergebnis.some(function (e) { return e.id === z.id; })) {
        ergebnis.push({ id: z.id, name: z.name.slice(0, 200), preisCent: z.preisCent, menge: z.menge });
      }
    });
    return ergebnis;
  }

  // Nur LESEN: beim Seitenaufruf wird nie etwas gespeichert
  function ladeKorb() {
    if (notKorb) { return notKorb; }
    try {
      var roh = localStorage.getItem(SCHLUESSEL);
      return roh ? bereinige(JSON.parse(roh)) : [];
    } catch (fehler) { return []; }
  }

  // Ist der Warenkorb leer, wird der Eintrag ganz gelöscht. Gibt false zurück, wenn Speichern nicht geht.
  function speichereKorb(korb) {
    try {
      if (korb.length === 0) { localStorage.removeItem(SCHLUESSEL); }
      else { localStorage.setItem(SCHLUESSEL, JSON.stringify(korb)); }
      notKorb = null;
      return true;
    } catch (fehler) {
      notKorb = korb.length ? korb : null;
      return false;
    }
  }

  function zaehleArtikel(korb) {
    return korb.reduce(function (summe, z) { return summe + z.menge; }, 0);
  }

  function finde(korb, id) {
    for (var i = 0; i < korb.length; i++) { if (korb[i].id === id) { return i; } }
    return -1;
  }

  // "79,90 €" -> 7990 (Cent). Gibt null zurück, wenn der Text kein Preis ist.
  function preisInCent(text) {
    var treffer = /(\d+),(\d{2})/.exec(text.replace(/\./g, ""));
    return treffer ? parseInt(treffer[1], 10) * 100 + parseInt(treffer[2], 10) : null;
  }

  // Zähler in der Kopfzeile (auf jeder Seite)
  function aktualisiereZaehler() {
    var link = document.querySelector(".warenkorb");
    if (link) { link.textContent = "Warenkorb (" + zaehleArtikel(ladeKorb()) + ")"; }
  }

  // Bestätigung unter dem Button: sichtbar und für Screenreader (role="status" im HTML).
  // Erst leeren, dann kurz später füllen, damit auch eine gleiche Meldung erneut vorgelesen wird.
  function zeigeMeldung(feld, text) {
    var alle = document.querySelectorAll(".korb-meldung");
    for (var i = 0; i < alle.length; i++) { alle[i].textContent = ""; }
    window.setTimeout(function () {
      feld.appendChild(document.createTextNode(text + " "));
      var link = document.createElement("a");
      link.href = document.querySelector(".warenkorb").getAttribute("href");
      link.textContent = "Zum Warenkorb";
      feld.appendChild(link);
    }, 60);
  }

  // ---- In den Warenkorb legen (Startseite und Produktseiten) ----
  document.addEventListener("click", function (e) {
    var knopf = e.target.closest("[data-produkt-id]");
    if (!knopf) { return; }
    var box = knopf.closest(".karte, .detail");
    var titel = box && box.querySelector("h1, h3");
    var preis = box && box.querySelector(".preis");
    var feld = box && box.querySelector(".korb-meldung");
    if (!titel || !preis || !feld) { return; }
    var cent = preisInCent(preis.textContent);
    if (cent === null) { return; }

    var id = knopf.getAttribute("data-produkt-id");
    var name = titel.textContent.trim();
    var korb = ladeKorb();
    var pos = finde(korb, id);
    var text;

    if (pos >= 0 && korb[pos].menge >= MAX_MENGE) {
      text = "Maximal " + MAX_MENGE + " Stück pro Produkt: " + name + " liegt schon " + MAX_MENGE + "-mal im Warenkorb.";
    } else {
      if (pos >= 0) { korb[pos].menge += 1; }
      else { korb.push({ id: id, name: name, preisCent: cent, menge: 1 }); }
      text = name + " wurde in den Warenkorb gelegt.";
      if (!speichereKorb(korb)) {
        text += " Dein Browser erlaubt kein Speichern, der Warenkorb bleibt nur bis zum Seitenwechsel erhalten.";
      }
    }
    aktualisiereZaehler();
    zeigeMeldung(feld, text);
  });

  // ---- Warenkorbseite (nur aktiv, wenn es #warenkorb-inhalt gibt) ----
  var inhalt = document.getElementById("warenkorb-inhalt");
  if (inhalt) {
    var leer = document.getElementById("korb-leer");
    var voll = document.getElementById("korb-voll");
    var fertig = document.getElementById("korb-fertig");
    var zeilen = document.getElementById("korb-zeilen");
    var status = document.getElementById("korb-status");

    var neu = function (tag, text, klasse) {
      var element = document.createElement(tag);
      if (text) { element.textContent = text; }
      if (klasse) { element.className = klasse; }
      return element;
    };

    var knopfFuer = function (id, aktion) {
      var knoepfe = zeilen.querySelectorAll("button[data-aktion]");
      for (var i = 0; i < knoepfe.length; i++) {
        if (knoepfe[i].getAttribute("data-id") === id && knoepfe[i].getAttribute("data-aktion") === aktion) {
          return knoepfe[i];
        }
      }
      return null;
    };

    var neuerKnopf = function (text, klasse, aktion, id, beschriftung, gesperrt) {
      var k = neu("button", text, klasse);
      k.type = "button";
      k.setAttribute("data-aktion", aktion);
      k.setAttribute("data-id", id);
      k.setAttribute("aria-label", beschriftung);
      k.disabled = !!gesperrt;
      return k;
    };

    var zelle = function (beschriftung) {
      var td = document.createElement("td");
      if (beschriftung) { td.setAttribute("data-label", beschriftung); }
      return td;
    };

    var rendere = function () {
      var korb = ladeKorb();
      if (korb.length === 0) {
        leer.hidden = bestellt;
        fertig.hidden = !bestellt;
        voll.hidden = true;
        zeilen.textContent = "";
        return;
      }
      bestellt = false;
      leer.hidden = true;
      fertig.hidden = true;
      voll.hidden = false;
      zeilen.textContent = "";

      var zwischen = 0;
      korb.forEach(function (z) {
        var summe = z.preisCent * z.menge;
        zwischen += summe;
        var tr = document.createElement("tr");

        var th = neu("th", z.name);
        th.scope = "row";
        tr.appendChild(th);

        var tdPreis = zelle("Einzelpreis");
        tdPreis.textContent = formatEuro(z.preisCent);
        tr.appendChild(tdPreis);

        var tdMenge = zelle("Menge");
        var steuerung = neu("div", "", "menge-steuerung");
        steuerung.appendChild(neuerKnopf("−", "menge-knopf", "minus", z.id,
          "Menge von " + z.name + " um 1 verringern, aktuell " + z.menge, z.menge <= 1));
        var wert = neu("span", "", "menge-wert");
        wert.appendChild(neu("span", "Menge: ", "nur-leser"));
        wert.appendChild(document.createTextNode(String(z.menge)));
        steuerung.appendChild(wert);
        steuerung.appendChild(neuerKnopf("+", "menge-knopf", "plus", z.id,
          "Menge von " + z.name + " um 1 erhöhen, aktuell " + z.menge, z.menge >= MAX_MENGE));
        tdMenge.appendChild(steuerung);
        tr.appendChild(tdMenge);

        var tdSumme = zelle("Summe");
        tdSumme.textContent = formatEuro(summe);
        tr.appendChild(tdSumme);

        var tdWeg = zelle("");
        tdWeg.appendChild(neuerKnopf("Entfernen", "entfernen-knopf", "entfernen", z.id,
          z.name + " aus dem Warenkorb entfernen", false));
        tr.appendChild(tdWeg);

        zeilen.appendChild(tr);
      });

      var versand = zwischen >= GRENZE_FREI_CENT ? 0 : VERSAND_CENT;
      document.getElementById("summe-zwischen").textContent = formatEuro(zwischen);
      document.getElementById("summe-versand").textContent = versand === 0 ? "kostenlos" : formatEuro(versand);
      document.getElementById("summe-gesamt").textContent = formatEuro(zwischen + versand);
      document.getElementById("korb-steuerhinweis").textContent = versand === 0
        ? "In der Gesamtsumme ist die Mehrwertsteuer bereits enthalten. Ab " + formatEuro(GRENZE_FREI_CENT) +
          " Warenwert ist der Versand kostenlos, deshalb fallen keine Versandkosten an."
        : "In der Gesamtsumme sind die Mehrwertsteuer und die Versandkosten von " + formatEuro(versand) +
          " bereits enthalten.";
    };

    // Plus, Minus, Entfernen
    zeilen.addEventListener("click", function (e) {
      var knopf = e.target.closest("button[data-aktion]");
      if (!knopf) { return; }
      var id = knopf.getAttribute("data-id");
      var aktion = knopf.getAttribute("data-aktion");
      var korb = ladeKorb();
      var pos = finde(korb, id);
      if (pos < 0) { return; }
      var z = korb[pos];
      var ansage;

      if (aktion === "plus" && z.menge < MAX_MENGE) {
        z.menge += 1;
        ansage = z.name + ": Menge jetzt " + z.menge + ".";
      } else if (aktion === "minus" && z.menge > 1) {
        z.menge -= 1;
        ansage = z.name + ": Menge jetzt " + z.menge + ".";
      } else if (aktion === "entfernen") {
        korb.splice(pos, 1);
        ansage = z.name + " wurde aus dem Warenkorb entfernt.";
      } else { return; }

      speichereKorb(korb);
      rendere();
      aktualisiereZaehler();
      status.textContent = "";
      window.setTimeout(function () { status.textContent = ansage; }, 60);

      // Fokus nicht verlieren: nach dem Neuzeichnen auf einen passenden Knopf setzen
      if (aktion === "entfernen") {
        var rest = zeilen.querySelectorAll("button[data-aktion='entfernen']");
        if (rest.length) { rest[Math.min(pos, rest.length - 1)].focus(); }
        else { document.getElementById("korb-leer-titel").focus(); }
      } else {
        var gleich = knopfFuer(id, aktion);
        var anderer = knopfFuer(id, aktion === "plus" ? "minus" : "plus");
        (gleich && !gleich.disabled ? gleich : anderer).focus();
      }
    });

    // Demo-Bestellung: nichts wird gesendet, der Warenkorb wird nur geleert
    document.getElementById("bestellen").addEventListener("click", function () {
      bestellt = true;
      speichereKorb([]);
      rendere();
      aktualisiereZaehler();
      document.getElementById("korb-fertig-titel").focus();
    });

    rendere();
  }

  aktualisiereZaehler();

  // Warenkorb wurde in einem anderen Tab geändert, oder Seite kommt aus dem Zwischenspeicher zurück
  function neuLaden() {
    aktualisiereZaehler();
    if (inhalt) { rendere(); }
  }
  window.addEventListener("storage", function (e) {
    if (e.key === SCHLUESSEL || e.key === null) { neuLaden(); }
  });
  window.addEventListener("pageshow", function (e) { if (e.persisted) { neuLaden(); } });
})();
