// ===================================
// 1. رسوم الخلفية المتحركة (Particle Animation)
// ===================================
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ... (باقي كود Particle Animation كما هو) ...

// ===================================
// 2. التحكم بصوت النقر
// ===================================
const clickSound = document.getElementById("click-sound");

// التأكد من وجود العنصر قبل محاولة التشغيل
if (clickSound) {
    document.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Click sound blocked by browser:", e)); 
    });
}


// ===================================
// 3. لوحة منتقي الألوان (Theme Picker) - (مصحح)
// ===================================
const picker = document.getElementById("color-picker");

// للتأكد من وجود منتقي الألوان قبل محاولة التعامل معه
if (picker) {
    // تطبيق اللون المحفوظ عند التحميل
    const savedColor = localStorage.getItem("main-color");
    if (savedColor) {
        document.documentElement.style.setProperty("--main-color", savedColor);
        picker.value = savedColor;
    }

    // معالج حدث تغيير اللون - استخدام 'change' لضمان عمله في الجوال
    picker.addEventListener("change", (e) => {
        const newColor = e.target.value;
        document.documentElement.style.setProperty("--main-color", newColor);
        localStorage.setItem("main-color", newColor);
    });
}


// ===================================
// 4. التنقل السلس (Smooth Scrolling)
// ===================================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// ===================================
// 5. قائمة الجوال (Mobile Menu Toggle)
// ===================================
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // إغلاق القائمة عند النقر على رابط (مهم للجوال)
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
        });
    });
}
