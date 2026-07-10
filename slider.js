const langCache = {}; // evita re-fetchear el mismo idioma más de una vez

async function getTranslations(lang) {
  if (langCache[lang]) return langCache[lang]; // ya lo tenemos en memoria
  const res = await fetch(`lang/${lang}.json`);
  if (!res.ok) throw new Error(`No se pudo cargar lang/${lang}.json`);
  const data = await res.json();
  langCache[lang] = data;
  return data;
}

async function initWhyChooseUsSlider(lang) {
  lang = lang || localStorage.getItem('preferred_lang') || 'it';

  let translations;
  try {
    translations = await getTranslations(lang);
  } catch (err) {
    console.error('[whyChooseUsSlider]', err);
    return;
  }

  const slidesObj = translations?.whyChooseUs?.slides;
  if (!slidesObj) return;

  const slides = Object.keys(slidesObj)
    .sort()
    .map(key => slidesObj[key])
    .filter(s => s.label || s.text);

  if (slides.length === 0) return;

  let cur = 0;
  const labelEl = document.querySelector('#perche-sceglierci .label');
  const textEl  = document.querySelector('#perche-sceglierci .text');
  const dotsEl  = document.getElementById('dots');

  dotsEl.innerHTML = '';

  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => go(i));
    dotsEl.appendChild(d);
  });

  function go(i) {
    cur = i;
    labelEl.textContent = slides[cur].label;
    textEl.textContent = slides[cur].text;
    document.querySelectorAll('#dots .dot').forEach((d, j) => d.classList.toggle('active', j === cur));
  }

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const newPrev = prevBtn.cloneNode(true);
  const newNext = nextBtn.cloneNode(true);
  prevBtn.replaceWith(newPrev);
  nextBtn.replaceWith(newNext);

  newPrev.addEventListener('click', () => go((cur - 1 + slides.length) % slides.length));
  newNext.addEventListener('click', () => go((cur + 1) % slides.length));

  go(0);
}

// Carga inicial al entrar a la página
initWhyChooseUsSlider();

// Se re-ejecuta al instante cuando el usuario elige un idioma, sin esperar a ir.js
document.querySelectorAll('.lang-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const lang = opt.dataset.code.toLowerCase();
    initWhyChooseUsSlider(lang); // sin setTimeout, sin depender de localStorage
  });
});