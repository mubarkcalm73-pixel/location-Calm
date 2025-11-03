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

// تعريف فئة الجزيئات (Particle Class)
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // سرعة أفقية (بين -0.5 و 0.5)
        this.sx = Math.random() - 0.5; 
        // سرعة عمودية (بين -0.5 و 0.5)
        this.sy = Math.random() - 0.5; 
        this.u(); // تحديث الموقع الأولي
    }

    // تحديث موقع الجزيء
    u() {
        this.x += this.sx;
        this.y += this.sy;

        // ارتداد الجزيء عند الوصول إلى حافة الشاشة
        if (this.x < 0 || this.x > canvas.width) {
            this.sx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.sy *= -1;
        }
    }

    // رسم الجزيء
    d() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        // رسم دائرة بنصف قطر 2
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); 
        ctx.fill();
    }
}

// إنشاء 100 جزيء
let ps = [];
for (let i = 0; i < 100; i++) {
    ps.push(new Particle());
}

// حلقة الرسوم المتحركة الرئيسية
(function a() {
    // مسح الشاشة لإعادة رسم الجزيئات
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    // تحديث ورسم كل جزيء
    ps.forEach(p => {
        p.u();
        p.d();
    });

    // طلب الإطار التالي للحركة
    requestAnimationFrame(a);
})();

// ===================================
// 2. التحكم بصوت النقر
// ===================================

const clickSound = document.getElementById("click-sound");

// تشغيل الصوت عند النقر في أي مكان (مع الأخذ في الاعتبار قيود المتصفح على التشغيل التلقائي)
document.addEventListener("click", () => {
    clickSound.currentTime = 0;
    // إضافة .catch لمنع الأخطاء في حال منع المتصفح تشغيل الصوت
    clickSound.play().catch(e => console.log("Click sound blocked by browser:", e)); 
});

// ===================================
// 3. لوحة منتقي الألوان (Theme Picker)
// ===================================

const picker = document.getElementById("color-picker");

// 3.1. تطبيق اللون المحفوظ عند التحميل
const savedColor = localStorage.getItem("main-color");
if (savedColor) {
    document.documentElement.style.setProperty("--main-color", savedColor);
    picker.value = savedColor;
}

// 3.2. معالج حدث تغيير اللون
picker.addEventListener("input", (e) => {
    const newColor = e.target.value;
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
    // تطبيق اللون الجديد على متغير CSS
    document.documentElement.style.setProperty("--main-color", newColor);
    
    // حفظ اللون في التخزين المحلي
    localStorage.setItem("main-color", newColor);
});

// ===================================
// ===================================
// 5. قائمة الجوال (Mobile Menu Toggle)
// ===================================
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

// إغلاق القائمة عند النقر على رابط (مهم للجوال)
document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
    });
});
