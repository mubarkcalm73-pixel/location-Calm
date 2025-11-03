(function(){
  // Theme toggle
  const toggle = document.getElementById('themeToggle');
  const body = document.body;
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') body.classList.add('dark');
  toggle.addEventListener('click', ()=>{
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Client form flow: بعد الارسال تظهر صفحة الانتظار وتخفي صفحة العميل
  const form = document.getElementById('clientForm');
  const clientSection = document.getElementById('client');
  const waitingSection = document.getElementById('waiting');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    // محاكاة اتمام العملية: هنا يمكنك ادخال طلب إلى API
    clientSection.classList.add('hidden');
    waitingSection.classList.remove('hidden');

    // حفظ بيانات بسيطة في localStorage لعرض لاحقاً او تتبع
    const data = new FormData(form);
    const obj = {};
    data.forEach((v,k)=> obj[k]=v);
    localStorage.setItem('lastOrder', JSON.stringify(obj));
  });

  // زر العودة
  document.getElementById('backToHome').addEventListener('click', ()=>{
    waitingSection.classList.add('hidden');
    clientSection.classList.remove('hidden');
    location.hash = '#home';
  });

  // تحسين تجربة الروابط السهلة
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    });
  });
})();
