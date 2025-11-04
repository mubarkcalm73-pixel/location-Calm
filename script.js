// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // جمع الحقول
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      type: form.type.value,
      details: form.details.value.trim(),
      time: new Date().toISOString()
    };

    // تحقق بسيط
    if (!data.name || !data.email || !data.phone || !data.type) {
      alert('الرجاء تعبئة الحقول المطلوبة.');
      return;
    }

    // حفظ محلي مؤقت (يمكن استبداله بإرسال إلى باك-إند لاحقاً)
    try {
      const orders = JSON.parse(localStorage.getItem('mubark_orders') || '[]');
      orders.push(data);
      localStorage.setItem('mubark_orders', JSON.stringify(orders));
    } catch (err) {
      console.warn('localStorage not available', err);
    }

    // إعادة التوجيه إلى صفحة الشكر
    window.location.href = 'thanks.html';
  });
});
