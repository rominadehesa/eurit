
  const slides = [
    { label: "Esperienza pluridecennale", text: "Oltre 50 anni di attività nel settore industriale ci hanno permesso di costruire una rete di fornitori qualificati e un know-how tecnico difficilmente replicabile." },
    { label: "Dalla progettazione alla fornitura in serie", text: "Affianchiamo i clienti fin dalla fase di sviluppo del prodotto, ottimizzando la scelta del processo produttivo e anticipando potenziali criticità." },
    { label: "Gestione integrale della fornitura", text: "Ci occupiamo di tutto: ricerca fornitori, project management, gestione degli ordini in serie, controllo qualità, reclami, logistica e spedizioni." },
    { label: "Approccio orientato al cliente", text: "Le vostre esigenze sono al centro di ogni nostra decisione. Non proponiamo soluzioni standard: ogni commessa viene trattata su misura." },
    { label: "Ottimizzazione della base fornitori", text: "Riduciamo la complessità del vostro parco fornitori consolidando più commodity in un unico partner, con vantaggi in termini di costi e governance." },
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