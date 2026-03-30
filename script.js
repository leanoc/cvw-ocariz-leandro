// ── Botón volver arriba ──────────────────────────────
    var btnTop = document.getElementById("btn-top");
    window.addEventListener("scroll", function () {
      btnTop.classList.toggle("visible", window.scrollY > 300);
    });
    btnTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ── Acordeón ────────────────────────────────────────
    document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
      function toggle() {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var bodyId = trigger.getAttribute("aria-controls");
        var body = document.getElementById(bodyId);
        trigger.setAttribute("aria-expanded", String(!expanded));
        body.classList.toggle("open", !expanded);
      }
      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    });

    // ── Scroll Spy: resaltar sección activa en el nav ──
    var sections = document.querySelectorAll("section[id], header[id]");
    var navLinks = document.querySelectorAll(".nav-links a");
    var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 56;

    function updateActiveNav() {
      var scrollY = window.scrollY + navHeight + 10;
      var currentId = "";

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) {
          currentId = section.getAttribute("id");
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove("active");
        var href = link.getAttribute("href");
        if (href === "#" + currentId) {
          link.classList.add("activ