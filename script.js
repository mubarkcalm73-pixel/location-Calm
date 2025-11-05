/* script.js */
document.addEventListener('DOMContentLoaded', function(){
  // theme toggle
  const root = document.body;
  const saved = localStorage.getItem('themePref');
  if(saved) root.setAttribute('data-theme', saved);

  // attach toggles (all pages have #themeToggle if present)
  const themeToggle = document.querySelector('#themeToggle');
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      const next = (current === 'light') ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('themePref', next);
    });
  }

  // simple contact form behavior (all pages)
  const contactForm = document.querySelector('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.querySelector('#name')?.value.trim();
      const phone = document.querySelector('#phone')?.value.trim();
      const msg = document.querySelector('#message')?.value.trim();
      if(!name || !phone || !msg){
        alert('يرجى ملء الحقول المطلوبة: الاسم، الهاتف، وبيان الرسالة.');
        return;
      }
      const email = 'ANAS.SHIHAB72@gmail.com'; // البريد المستخدم
      const subject = encodeURIComponent('طلب خدمة شحن من ' + name);
      const body = encodeURIComponent(`الاسم: ${name}\nالهاتف: ${phone}\n\n${msg}\n\nتم الإرسال من موقع ANAS SHIHAB`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    });
  }

  // tracking demo (on tracking.html)
  const trackForm = document.querySelector('#trackForm');
  if(trackForm){
    trackForm.addEventListener('submit', function(e){
      e.preventDefault();
      const no = document.querySelector('#trackNumber')?.value.trim();
      if(!no){ alert('أدخل رقم التتبع'); return; }
      const container = document.querySelector('#trackResult');
      container.innerHTML = `<div style="font-weight:700">نتيجة التتبع لرقم: ${escapeHtml(no)}</div>`;
      const statuses = [
        {t:'تم استلام الشحنة من المرسل', d:'2025-10-30 09:15'},
        {t:'تم ترتيب الشحنة للنقل', d:'2025-10-31 14:40'},
        {t:'الشحنة في طريقها إلى نقطة الانطلاق', d:'2025-11-01 07:20'},
        {t:'وصلت الشحنة إلى الميناء / المطار', d:'2025-11-03 11:55'},
        {t:'في مرحلة التخليص الجمركي', d:'2025-11-05 16:30'},
        {t:'جاري التوصيل إلى المستلم', d:'2025-11-06 12:00'}
      ];
      const count = Math.floor(Math.random() * statuses.length) + 1;
      const list = statuses.slice(0, count).reverse();
      list.forEach(s=>{
        const itm = document.createElement('div');
        itm.style.padding='10px';
        itm.style.marginTop='8px';
        itm.style.borderLeft='4px solid var(--accent)';
        itm.style.background='rgba(0,0,0,0.03)';
        itm.innerHTML = `<div style="font-weight:700">${escapeHtml(s.t)}</div><div style="color:var(--muted)">${escapeHtml(s.d)}</div>`;
        container.appendChild(itm);
      });
    });
  }

  function escapeHtml(str){ return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }
});
