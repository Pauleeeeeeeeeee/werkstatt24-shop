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
