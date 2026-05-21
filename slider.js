
  const slides = [
    { label: "Esperienza pluridecennale", text: "Oltre 50 anni di attività nel settore industriale ci hanno permesso di costruire una rete di fornitori qualificati e un know-how tecnico difficilmente replicabile." },
    { label: "Slide 2", text: "Contenido del segundo slide..." },
    { label: "Slide 3", text: "Contenido del tercer slide..." },
    { label: "Slide 4", text: "Contenido del cuarto slide..." },
    { label: "Slide 5", text: "Contenido del quinto slide..." },
  ];

  let cur = 0;
  const labelEl = document.querySelector('.label');
  const textEl = document.querySelector('.text');
  const dotsEl = document.getElementById('dots');

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
    document.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === cur));
  }

  document.getElementById('prev').addEventListener('click', () => go((cur - 1 + slides.length) % slides.length));
  document.getElementById('next').addEventListener('click', () => go((cur + 1) % slides.length));

  go(0);