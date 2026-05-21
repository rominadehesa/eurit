function createScrollAnimation(selector) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animar números
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }

                observer.unobserve(entry.target);
            }

        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = +element.getAttribute('data-target');
    const duration = 1500;

    let current = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        current += increment;

        if (current < target) {
            element.innerText = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.innerText =  target + '+';
        }
    }

    updateCounter();
}

createScrollAnimation('.fade-scroll');
createScrollAnimation('.numbers-scroll');