// Temple SASE: header state, mobile menu, copy-email button, award "expand all", footer year.
(function () {
  document.documentElement.classList.remove("no-js");

  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero, .gala-hero");

  // Header turns solid once the dark hero has scrolled past.
  function updateHeader() {
    if (!header) return;
    // A hero taller than the screen has text under the header, so go solid almost right away.
    var limit = hero && hero.offsetHeight < window.innerHeight ? hero.offsetHeight - 100 : 40;
    header.classList.toggle("is-solid", window.scrollY > limit);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader);
  updateHeader();

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
    });
  }

  // Copy-to-clipboard buttons (sponsor email)
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var status = btn.parentElement.querySelector("[role=status]");
      var text = btn.getAttribute("data-copy");
      function done(msg) { if (status) status.textContent = msg; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { done("Copied " + text); },
          function () { done("Couldn’t copy. The address is " + text); }
        );
      } else {
        done("The address is " + text);
      }
    });
  });

  // Awards: expand or collapse every criteria list at once
  var expandBtn = document.querySelector("[data-expand-all]");
  if (expandBtn) {
    var panels = document.querySelectorAll(".award__more");
    expandBtn.addEventListener("click", function () {
      var open = expandBtn.getAttribute("aria-pressed") !== "true";
      panels.forEach(function (d) { d.open = open; });
      expandBtn.setAttribute("aria-pressed", String(open));
      expandBtn.textContent = open ? "Collapse all criteria" : "Expand all criteria";
    });
  }

  // Upcoming events: hide anything whose date has passed, and count down to deadlines.
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  function parseDay(str) {
    var p = str.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  var events = document.querySelectorAll(".event[data-date]");
  if (events.length) {
    var shown = 0;
    events.forEach(function (ev) {
      var past = parseDay(ev.getAttribute("data-date")) < today;
      ev.hidden = past;
      if (!past) shown++;
    });
    var empty = document.querySelector(".events__empty");
    if (empty) empty.hidden = shown > 0;
  }
  document.querySelectorAll("[data-countdown]").forEach(function (el) {
    var days = Math.round((parseDay(el.getAttribute("data-countdown")) - today) / 86400000);
    el.textContent = days > 1 ? "(" + days + " days left)" : days === 1 ? "(tomorrow)" : days === 0 ? "(today)" : "";
  });

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
