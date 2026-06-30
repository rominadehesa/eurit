const items = document.querySelectorAll(".services-menu li");
const articles = document.querySelectorAll(".container-details article");

const isMobile = () => window.innerWidth <= 768;

// Estado inicial
if (isMobile()) {
    items.forEach(i => i.classList.remove("active"));
    articles.forEach(a => a.classList.remove("active"));
}

items.forEach(item => {
    item.addEventListener("click", () => {

        const article = document.querySelector("." + item.id);

        if (isMobile()) {

            // Si ya está abierto, cerrarlo
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                article.classList.remove("active");
                return;
            }

            // Cerrar todos
            items.forEach(i => i.classList.remove("active"));
            articles.forEach(a => a.classList.remove("active"));

            // Abrir el seleccionado
            item.classList.add("active");
            article.classList.add("active");

        } else {

            // Desktop: comportamiento de tabs
            items.forEach(i => i.classList.remove("active"));
            articles.forEach(a => a.classList.remove("active"));

            item.classList.add("active");
            article.classList.add("active");
        }
    });
});