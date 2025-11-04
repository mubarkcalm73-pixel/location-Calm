// script.js
document.addEventListener('DOMContentLoaded', function () {
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // نجمع البيانات لعرض (أو إرسالها لاحقًا إلى باك‌اند)
      const fd = new FormData(orderForm);
      const data = Object.fromEntries(fd.entries());

      // هنا يمكنك توصيل كود لإرسال البيانات إلى سيرفر عبر fetch إذا أردت.
      // الآن فقط نخزن مؤقتًا في localStorage (اختياري) ثم نعيد التوجيه لصفحة التأكيد
      try {
        localStorage.setItem('lastOrder', JSON.stringify(data));
      } catch (err) {
        // تجاهل لو لم تتوافر الامتيازات
      }

      // إعادة التوجيه إلى صفحة الشكر
      window.location.href = 'thankyou.html';
    });
  }

  // تحسين روابط الواتساب إن وُجدت في الصفحة (افتح في نافذة جديدة)
  document.querySelectorAll('a[href^="https://wa.me"]').forEach(a => {
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener');
  });
});
