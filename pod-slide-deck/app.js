const slides = Array.from(document.querySelectorAll(".slide"));
const progressBar = document.getElementById("progressBar");
const weekOf = document.getElementById("weekOf");
const form = document.getElementById("entryForm");
const formStatus = document.getElementById("formStatus");
let currentSlide = 0;

const listMap = {
  progress: document.getElementById("progressList"),
  challenges: document.getElementById("challengeList"),
  actions: document.getElementById("actionList"),
  priorities: document.getElementById("priorityList"),
};

const noteInputs = {
  agenda: document.getElementById("agendaNote"),
  progress: document.getElementById("progressNote"),
  challenge: document.getElementById("challengeNote"),
  action: document.getElementById("actionNote"),
  priority: document.getElementById("priorityNote"),
};

function setWeekOf() {
  const today = new Date();
  const options = { month: "short", day: "numeric", year: "numeric" };
  weekOf.textContent = today.toLocaleDateString(undefined, options);
}

function updateSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("is-active", idx === index);
  });
  currentSlide = index;
  const progress = ((index + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function renderList(target, items) {
  if (!target) return;
  if (!items.length) {
    target.innerHTML = "<p class=\"empty\">No updates yet. Add one on the Update slide.</p>";
    return;
  }
  target.innerHTML = items
    .map(
      (item) => `
      <div class="list-item">
        <strong>${item.owner}</strong>
        <span>${item.detail}</span>
        <span class="status">Status: ${item.status}</span>
      </div>
    `
    )
    .join("");
}

function refreshLists() {
  Promise.all([
    podDB.getAllItems(podDB.storeNames.progress),
    podDB.getAllItems(podDB.storeNames.challenges),
    podDB.getAllItems(podDB.storeNames.actions),
    podDB.getAllItems(podDB.storeNames.priorities),
  ]).then(([progress, challenges, actions, priorities]) => {
    renderList(listMap.progress, progress);
    renderList(listMap.challenges, challenges);
    renderList(listMap.actions, actions);
    renderList(listMap.priorities, priorities);
  });
}

function loadNotes() {
  Object.entries(noteInputs).forEach(([key, input]) => {
    podDB.getNote(key).then((content) => {
      input.value = content;
    });
  });
}

function bindControls() {
  document.getElementById("prevBtn").addEventListener("click", () => {
    updateSlide(Math.max(0, currentSlide - 1));
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    updateSlide(Math.min(slides.length - 1, currentSlide + 1));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      updateSlide(Math.min(slides.length - 1, currentSlide + 1));
    }
    if (event.key === "ArrowLeft") {
      updateSlide(Math.max(0, currentSlide - 1));
    }
  });

  document.querySelectorAll(".save-note").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.note;
      const input = noteInputs[category];
      const status = document.querySelector(`[data-status="${category}"]`);
      podDB.putNote(category, input.value).then(() => {
        if (status) {
          status.textContent = "Saved to meeting notes.";
          setTimeout(() => {
            status.textContent = "";
          }, 2000);
        }
      });
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = {
    owner: formData.get("owner"),
    detail: formData.get("detail"),
    status: formData.get("status"),
  };
  const category = formData.get("category");

  podDB.addItem(category, payload).then(() => {
    form.reset();
    formStatus.textContent = "Update saved. Slides refreshed.";
    refreshLists();
    setTimeout(() => {
      formStatus.textContent = "";
    }, 2000);
  });
});

setWeekOf();
updateSlide(0);

podDB.seedDatabase().then(() => {
  refreshLists();
  loadNotes();
});

bindControls();
