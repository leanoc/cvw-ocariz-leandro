// ── Botón volver arriba ──────────────────────────────
var btnTop = document.getElementById("btn-top");
window.addEventListener("scroll", function () {
  btnTop.classList.toggle("visible", window.scrollY > 300);
});
btnTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── Acordeón (con soporte touch para celulares) ──────
document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
  var touching = false;

  function toggle(e) {
    e.preventDefault();
    var expanded = trigger.getAttribute("aria-expanded") === "true";
    var bodyId   = trigger.getAttribute("aria-controls");
    var body     = document.getElementById(bodyId);
    trigger.setAttribute("aria-expanded", String(!expanded));
    body.classList.toggle("open", !expanded);
  }

  // touchstart marca que empezó un toque
  trigger.addEventListener("touchstart", function () {
    touching = true;
  }, { passive: true });

  // touchend ejecuta el toggle (evita el doble disparo con click)
  trigger.addEventListener("touchend", function (e) {
    if (touching) {
      touching = false;
      toggle(e);
    }
  }, { passive: false });

  // click cubre desktop; en móvil solo actúa si no vino de touch
  trigger.addEventListener("click", function (e) {
    if (!touching) {
      toggle(e);
    }
  });

  // teclado para accesibilidad
  trigger.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(e);
    }
  });
});

// ── Scroll Spy: resaltar sección activa en el nav ────
var sections  = document.querySelectorAll("section[id], header[id]");
var navLinks  = document.querySelectorAll(".nav-links a");
var navHeight = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--nav-height")
) || 56;

function updateActiveNav() {
  var scrollY    = window.scrollY + navHeight + 10;
  var currentId  = "";

  sections.forEach(function (section) {
    if (section.offsetTop <= scrollY) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentId) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// ── Formulario simulado ──────────────────────────────
function handleFormSubmit(event) {
  event.preventDefault();
  var msg = document.getElementById("form-msg");
  msg.style.display = "block";
  event.target.reset();
  setTimeout(function () { msg.style.display = "none"; }, 4000);
}
