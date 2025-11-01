// animations simple
document.addEventListener('DOMContentLoaded', function(){
  // fade in sections
  document.querySelectorAll('.section, .main-header').forEach((el, i)=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(14px)';
    setTimeout(()=> {
      el.style.transition = 'all 700ms cubic-bezier(.22,.9,.32,1)';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 120 + i*150);
  });

  // contact form
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const mail = 'your-email@example.com'; // <-- ضع بريدك هنا أيضاً
      if(!name || !email || !message){
        document.getElementById('formMsg').textContent = 'يرجى تعبئة كل الحقول.';
        return;
      }
      const subject = encodeURIComponent('رسالة من موقعك — ' + name);
      const body = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\n\nالرسالة:\n${message}`);
      // فتح تطبيق البريد الافتراضي
      window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
      document.getElementById('formMsg').textContent = 'يتم فتح تطبيق البريد...';
    });
  }
});
