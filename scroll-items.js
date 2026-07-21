const container = document.querySelector("#processes main");

document.getElementById("arrow-right").addEventListener("click", () => {
    container.style.paddingRight = "10vw";

    container.scrollTo({
        left: container.scrollWidth,
        behavior: "smooth"
    });
});

document.getElementById("arrow-left").addEventListener("click", () => {
    container.scrollTo({
        left: 0,
        behavior: "smooth"
    });

    container.style.paddingRight = "0";
});