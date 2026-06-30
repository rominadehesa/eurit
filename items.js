const items = document.querySelectorAll(".services-menu li");
const articles = document.querySelectorAll(".container-details article");

items.forEach(item => {
    item.addEventListener("click", () => {

        // Quitar active de todos
        items.forEach(i => i.classList.remove("active"));
        articles.forEach(a => a.classList.remove("active"));

        // Activar el seleccionado
        item.classList.add("active");

        // Mostrar el article correspondiente
        document.querySelector("." + item.id).classList.add("active");
    });
});