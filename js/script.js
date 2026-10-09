const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".primary-nav");

navToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".primary-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
  });
});

// Purposeful scroll reveal with IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Demo tracking interaction.
const trackingForm = document.querySelector("#tracking-form");
const trackingInput = document.querySelector("#tracking-number");
const trackingResult = document.querySelector("#tracking-result");

trackingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = trackingInput.value.trim().toUpperCase();

  if (!value) return;

  const knownDemo = value === "STV-20481";
  trackingResult.innerHTML = knownDemo
    ? `<div class="result-success">
        <div><strong>STV-20481 · Abuja → Kano</strong><small>Last updated just now · Driver is on route</small></div>
        <span class="result-badge">IN TRANSIT</span>
      </div>`
    : `<div class="result-success">
        <div><strong>${escapeHtml(value)}</strong><small>Demo lookup received. Connect this form to your tracking API for live results.</small></div>
        <span class="result-badge">DEMO</span>
      </div>`;
});

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
}

// Quote form demo feedback.
const quoteForm = document.querySelector("#quote-form");
const quoteStatus = document.querySelector("#quote-status");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  quoteStatus.textContent = "Thanks — your quote request has been recieved.";
  quoteForm.reset();
});

// Animated stats when they enter the viewport.
const stats = document.querySelectorAll("[data-count]");

function animateCount(element) {
  const target = Number(element.dataset.count);
  const duration = 1100;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(target * eased);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  stats.forEach((stat) => statsObserver.observe(stat));
} else {
  stats.forEach((stat) => (stat.textContent = stat.dataset.count));
}
