const btnBurger = document.getElementById('btn-burger');
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');
const nav = document.getElementById('nav-mobile');
const header = document.querySelector('nav');

btnBurger.addEventListener('click', function (e) {
    e.stopPropagation(); // Evita que el click llegue al document

    nav.classList.toggle('active');
    header.classList.toggle('active');
    burgerIcon.style.display = nav.classList.contains('active') ? 'none' : 'block';
    closeIcon.style.display = nav.classList.contains('active') ? 'block' : 'none';

    if (nav.classList.contains('active')) {
        nav.style.padding = "2vh 4vw";
    } else {
        nav.style.padding = "";
    }
});

// Evita que se cierre al hacer click dentro del menú
nav.addEventListener('click', function (e) {
    e.stopPropagation();
});

// Cierra el menú al hacer click en cualquier otra parte
document.addEventListener('click', function () {
    nav.classList.remove('active');
    header.classList.remove('active');
    nav.style.padding = "";
});