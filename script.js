const clockEl = document.getElementById("clock");
const dayEl = document.getElementById("day");
const greetingEl = document.getElementById("greeting");
const nameModal = document.getElementById("nameModal");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");

function openModal() {
  nameModal.classList.remove("hidden");
  nameModal.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => nameInput.focus());
}

function closeModal() {
  nameModal.classList.add("hidden");
  nameModal.setAttribute("aria-hidden", "true");
}

function getStoredName() {
  return "";
}
function setStoredName(_) {
  /* no-op */
}

function formatClock(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function formatDay(date) {
  return date.toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function updateTime() {
  const now = new Date();
  clockEl.textContent = formatClock(now);
  dayEl.textContent = formatDay(now);
}

function updateGreeting(name) {
  const trimmed = (name || "").trim();
  const safeName = trimmed.replace(/[<>]/g, "");
  greetingEl.textContent = safeName ? `Merhaba, ${safeName}!` : "Merhaba!";
}

function requestNameEachLoad() {
  openModal();
}

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = nameInput.value.trim();
  if (!value) return;
  updateGreeting(value);
  closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nameModal.classList.contains("hidden")) {
    closeModal();
  }
});

// Init
updateTime();
requestNameEachLoad();
setInterval(updateTime, 1000);
