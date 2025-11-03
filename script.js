// زر التبديل بين الوضع الليلي والنهاري
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

// التحقق من الوضع المحفوظ مسبقًا في LocalStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  modeToggle.textContent = "☀️";
} else {
  modeToggle.textContent = "🌙";
}

// عند الضغط على الزر
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    modeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
// تأثير الأكواد المتساقطة (Matrix effect)
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "01HTMLCSSJAVASCRIPT<>[]{}💻";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff4d4d"; // اللون الأحمر البرمجي
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 40);

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
