// زر الوضع الليلي/النهاري
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

// تحقق من الوضع المحفوظ مسبقًا
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  modeToggle.textContent = "☀️";
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
