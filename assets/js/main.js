// Temple SASE: header state, mobile menu, copy-email button, award "expand all", footer year.
(function () {
  document.documentElement.classList.remove("no-js");

  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero, .gala-hero");

  // Header turns solid once the dark hero has scrolled past.
  function updateHeader() {
    if (!header) return;
    var limit = hero ? hero.offsetHeight - 80 : 40;
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

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
