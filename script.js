// theme toggle (persistent)
const themeToggle = (() => {
  const key = 'site-theme';
  const root = document.documentElement;
  function apply(theme){
    if(theme === 'dark') {
      root.style.setProperty('--bg','#0b1220');
      root.style.setProperty('--card','#08111b');
      root.style.setProperty('--text','#e6eef8');
      root.style.setProperty('--muted','#9fb0c7');
      localStorage.setItem(key,'dark');
    } else {
      root.style.removeProperty('--bg');
      root.style.removeProperty('--card');
      root.style.removeProperty('--text');
      root.style.removeProperty('--muted');
      localStorage.setItem(key,'light');
    }
  }
  const saved = localStorage.getItem(key);
  if(saved === 'dark') apply('dark');
  // attach to all toggles
  document.querySelectorAll('#themeToggle, #themeToggle2').forEach(btn => {
    btn.addEventListener('click', () => {
      const now = localStorage.getItem(key) === 'dark' ? 'light' : 'dark';
      apply(now);
      btn.textContent = now === 'dark' ? '☀️' : '🌙';
    });
    // initial label
    btn.textContent = localStorage.getItem(key) === 'dark' ? '☀️' : '🌙';
  });
})();

// year
document.querySelectorAll('#year, #year2, #year3').forEach(el => {
  if(el) el.textContent = new Date().getFullYear();
});

// form submit -> save and redirect to waiting
const form = document.getElementById('requestForm');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const obj = {};
    fd.forEach((v,k) => obj[k]=v);
    // save locally (or send to server here)
    localStorage.setItem('lastRequest', JSON.stringify(obj));
    // visual feedback
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'جارٍ الإرسال...';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      // redirect to waiting page
      window.location.href = 'waiting.html';
    }, 900);
  });
}

// display summary on waiting page
const orderSummary = document.getElementById('orderSummary');
if(orderSummary){
  const data = localStorage.getItem('lastRequest');
  if(data){
    try{
      const obj = JSON.parse(data);
      const wrap = document.createElement('div');
      wrap.className = 'summary-inner';
      wrap.innerHTML = `
        <p><strong>الاسم:</strong> ${obj.name || '-'}</p>
        <p><strong>البريد:</strong> ${obj.email || '-'}</p>
        <p><strong>الهاتف:</strong> ${obj.phone || '-'}</p>
        <p><strong>نوع المشروع:</strong> ${obj.type || '-'}</p>
      `;
      orderSummary.appendChild(wrap);
    }catch(e){}
  }
}

// smooth links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  });
});
