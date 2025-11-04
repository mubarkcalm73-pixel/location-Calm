// script.js
(function () {
  // عناصر التبديل (قد يوجد أكثر من زر في صفحات مختلفة)
  const toggles = Array.from(document.querySelectorAll('#themeToggle, #themeToggleHeader, #themeToggleContact'));
  const body = document.body;

  // تحميل حالة الثيم من localStorage (افتراض: "dark" أو "light")
  const saved = localStorage.getItem('mubark_theme') || 'dark';
  applyTheme(saved);

  // ربط الأحداث
  toggles.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = body.classList.contains('light') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('mubark_theme', next);
    });
  });

  function applyTheme(name) {
    if (name === 'light') {
      body.classList.add('light');
      toggles.forEach(b => { if (b) b.textContent = '☀️'; });
    } else {
      body.classList.remove('light');
      toggles.forEach(b => { if (b) b.textContent = '🌙'; });
    }
  }

  // نموذج الطلب: حفظ في localStorage ثم الانتقال إلى صفحة الشكر (if exists)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        type: form.type.value,
        details: form.details.value.trim(),
        time: new Date().toISOString()
      };
      if (!data.name || !data.email || !data.phone || !data.type) {
        alert('الرجاء تعبئة الحقول المطلوبة.');
        return;
      }
      try {
        const orders = JSON.parse(localStorage.getItem('mubark_orders') || '[]');
        orders.push(data);
        localStorage.setItem('mubark_orders', JSON.stringify(orders));
      } catch (err) {
        console.warn('localStorage not available', err);
      }
      // إظهار صفحة انتظار ثم شكر (ننتقل لصفحة التحميل)
      location.href = 'loading.html';
    });
  }
})();
<script>
  const btn = document.getElementById('themeToggle');

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('mubark_theme', isLight ? 'light' : 'dark');
  });

  // عند فتح الصفحة نتأكد من حفظ الوضع السابق
  window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('mubark_theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
  });
</script>
