// Temple SASE — header state, mobile menu, scroll reveals and hero photo drift.
(function () {
  document.documentElement.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");
  var hero = document.querySelector("[data-hero]");

  // Header turns solid once the dark hero has scrolled past.
  function updateHeader() {
    if (!header) return;
    var limit = hero ? hero.offsetHeight - 80 : 40;
    header.classList.toggle("is-solid", window.scrollY > limit);
  }

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Hero photos drift at different speeds as you scroll.
  var floats = reduceMotion ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-drift]"));
  var ticking = false;
  function drift() {
    var y = window.scrollY;
    floats.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-drift")) || 0;
      el.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
    });
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    updateHeader();
    if (floats.length && !ticking) {
      ticking = true;
      window.requestAnimationFrame(drift);
    }
  }, { passive: true });
  window.addEventListener("resize", updateHeader);
  updateHeader();

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

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
