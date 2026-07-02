const items = document.querySelectorAll(".services-menu li");

const isMobile = () => window.innerWidth <= 768;

// Limpia todos los estados
function clearActive() {
    items.forEach(item => item.classList.remove("active"));

    document
        .querySelectorAll(".container-details article")
        .forEach(article => article.classList.remove("active"));
}

// Activa un item y su contenido
function activateItem(item) {

    clearActive();

    item.classList.add("active");

    const selector = isMobile()
        ? `.mobile-layout .${item.id}`
        : `.desktop-layout .${item.id}`;

    document.querySelectorAll(selector).forEach(article => {
        article.classList.add("active");
    });
}

// Estado inicial
const firstItem = document.querySelector(".services-menu li");
activateItem(firstItem);

// Click en los items
items.forEach(item => {

    item.addEventListener("click", () => {

        if (isMobile()) {

            const article = document.querySelector(`.mobile-layout .${item.id}`);

            // Si ya está abierto, cerrarlo
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                article.classList.remove("active");
                return;
            }

        }

        activateItem(item);

    });

});

// Cuando cambia entre mobile y desktop
let wasMobile = isMobile();

window.addEventListener("resize", () => {

    const mobile = isMobile();

    if (mobile !== wasMobile) {

        wasMobile = mobile;

        const activeItem =
            document.querySelector(".services-menu li.active") ||
            document.querySelector(".services-menu li");

        activateItem(activeItem);
    }

});