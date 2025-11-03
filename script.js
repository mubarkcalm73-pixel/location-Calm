const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  modeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});
