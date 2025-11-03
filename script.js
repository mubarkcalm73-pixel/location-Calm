const toggle = document.getElementById('theme-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  toggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});

const form = document.getElementById('clientForm');
const waiting = document.getElementById('waiting');

form.addEventListener('submit', e => {
  e.preventDefault();
  form.parentElement.classList.add('hidden');
  waiting.classList.remove('hidden');
  setTimeout(() => {
    waiting.innerHTML = '<h2>تم استلام طلبك بنجاح ✅</h2><p>سيتم التواصل معك قريباً.</p>';
  }, 3000);
});
