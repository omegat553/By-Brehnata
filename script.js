const loader = document.getElementById("loader");
const site = document.getElementById("site");
const cake = document.getElementById("cake");
const clickHint = document.getElementById("clickHint");
const scrollHint = document.getElementById("scrollHint");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 650);
});

let started = false;

function startBirthday() {
  if (started) return;
  started = true;

  cake.classList.add("blown");
  site.classList.remove("locked");
  clickHint.classList.add("hidden");
  scrollHint.classList.remove("hidden");

  music.play().then(() => {
    musicToggle.textContent = "♫";
  }).catch(() => {
    musicToggle.textContent = "♫";
  });

  setTimeout(() => {
    document.getElementById("birthday").scrollIntoView({ behavior: "smooth" });
  }, 1300);
}

cake.addEventListener("click", startBirthday);
cake.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    startBirthday();
  }
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "♫";
    } catch (_) {}
  } else {
    music.pause();
    musicToggle.textContent = "Ⅱ";
  }
});

// Reveal sections while scrolling.
const sections = document.querySelectorAll(".reveal-section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.14 });

sections.forEach((section) => observer.observe(section));

// Memory modal.
const modal = document.getElementById("memoryModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalNumber = document.getElementById("modalNumber");

document.querySelectorAll(".memory-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    modalNumber.textContent = `MEMORY ${String(index + 1).padStart(2, "0")}`;
    modalTitle.textContent = card.dataset.title;
    modalText.textContent = card.dataset.text;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);

// Surprise popup.
const surpriseOverlay = document.getElementById("surpriseOverlay");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseClose = document.getElementById("surpriseClose");
const goFinal = document.getElementById("goFinal");

surpriseButton.addEventListener("click", () => {
  surpriseOverlay.classList.add("open");
  surpriseOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
});

function closeSurprise() {
  surpriseOverlay.classList.remove("open");
  surpriseOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

surpriseClose.addEventListener("click", closeSurprise);

goFinal.addEventListener("click", () => {
  closeSurprise();
  setTimeout(() => {
    document.getElementById("final").scrollIntoView({ behavior: "smooth" });
  }, 250);
});

// Replay: return to opening and reset.
document.getElementById("replayButton").addEventListener("click", () => {
  started = false;
  cake.classList.remove("blown");
  site.classList.add("locked");
  clickHint.classList.remove("hidden");
  scrollHint.classList.add("hidden");
  music.pause();
  music.currentTime = 0;
  musicToggle.textContent = "♫";
  document.getElementById("opening").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeSurprise();
  }
});
