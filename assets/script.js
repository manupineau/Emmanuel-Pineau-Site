// Emmanuel Pineau — script partagé (site statique, sans dépendance)

document.addEventListener("DOMContentLoaded", () => {
  /* --- menu mobile --- */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav.primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      })
    );
  }

  /* --- numérotation de catalogue (01, 02, ...) --- */
  document.querySelectorAll(".contact-sheet").forEach((sheet) => {
    const frames = sheet.querySelectorAll(".frame");
    frames.forEach((frame, i) => {
      const idxEl = frame.querySelector(".index-num");
      if (idxEl && !idxEl.dataset.manual) {
        idxEl.textContent = String(i + 1).padStart(2, "0");
      }
    });
  });

  /* --- révélation au scroll --- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* --- formulaire de contact : simulation d'envoi (à remplacer par un vrai backend / service type Formspree) --- */
  const form = document.querySelector("form.contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      const original = btn.textContent;
      btn.textContent = "Message sent ✓";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2500);
    });
  }
});
