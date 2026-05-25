document.addEventListener("DOMContentLoaded", function () {



// ================= NAV =================
window.seleccionar = function(link) {
    const opciones = document.querySelectorAll('#links a');
    opciones.forEach(op => op.className = "");
    link.className = "seleccionado";

    const nav = document.getElementById("nav");
    if (nav) nav.className = "";
}

window.responsiveMenu = function() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    nav.className = nav.className === "" ? "responsive" : "";
}

// ================= SKILLS =================
window.onscroll = () => efectoHabilidades();

function efectoHabilidades() {
    const skills = document.getElementById("skills");
    if (!skills) return;

    const distancia = window.innerHeight - skills.getBoundingClientRect().top;

    if (distancia >= 300) {
        document.getElementById("html")?.classList.add("barra-progreso1");
        document.getElementById("js")?.classList.add("barra-progreso2");
        document.getElementById("C#")?.classList.add("barra-progreso3");
        document.getElementById("DB")?.classList.add("barra-progreso4");
        document.getElementById("net")?.classList.add("barra-progreso5");
        document.getElementById("redes")?.classList.add("barra-progreso6");
        document.getElementById("puntualidad")?.classList.add("barra-progreso7");
        document.getElementById("equipo")?.classList.add("barra-progreso8");
        document.getElementById("responsabilidad")?.classList.add("barra-progreso9");
    }
}

// ================= PARTICULAS =================
if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
        particles: {
            number: { value: 60 },
            color: { value: "#58e4f7" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#58e4f7",
                opacity: 0.4,
                width: 1
            },
            move: { enable: true, speed: 2 }
        }
    });
}


// ================= CARRUSEL =================
let index = 0;
let autoScroll;

const track = document.querySelector(".carousel-track");
let items = document.querySelectorAll(".proyecto");

if (track && items.length > 0) {

    // duplicar elementos
    track.innerHTML += track.innerHTML;

    // volver a obtener elementos
    items = document.querySelectorAll(".proyecto");

    // transición inicial
    track.style.transition = "transform 0.8s ease";

    function actualizarCarrusel() {

        const itemWidth = items[0].getBoundingClientRect().width;

        // GAP DEL CSS
        const gap = 20;

        const offset = index * (itemWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // efecto activo
        items.forEach(el => el.classList.remove("active"));

        if(items[index]){
            items[index].classList.add("active");
        }
    }

    function iniciarAutoScroll() {

        autoScroll = setInterval(() => {

            index++;

            // reset infinito
            if (index >= items.length / 2) {

                index = 0;

                track.style.transition = "none";
                track.style.transform = "translateX(0)";

                setTimeout(() => {
                    track.style.transition = "transform 0.8s ease";
                }, 50);
            }

            requestAnimationFrame(() => {
                actualizarCarrusel();
            });

        }, 3000);
    }

    function detenerAutoScroll() {
        clearInterval(autoScroll);
    }

    const carousel = document.querySelector(".carousel");

    if (carousel) {
        carousel.addEventListener("mouseenter", detenerAutoScroll);
        carousel.addEventListener("mouseleave", iniciarAutoScroll);
    }

    actualizarCarrusel();
    iniciarAutoScroll();
}

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const cerrar = document.querySelector(".cerrar");

document.querySelectorAll(".proyecto").forEach(card => {

    card.addEventListener("click", () => {

        const img = card.querySelector("img");
        const video = card.querySelector("video");
        const iframe = card.querySelector("iframe");

        modalContent.innerHTML = "";

        if(img){

            modalContent.innerHTML =
                `<img src="${img.src}">`;

        }

        if(video){

            modalContent.innerHTML =
                `<video controls autoplay>
                    <source src="${video.querySelector("source").src}">
                </video>`;
        }

        if(iframe){

            modalContent.innerHTML =
                `<iframe
                    src="${iframe.src}"
                    allowfullscreen>
                </iframe>`;
        }

        modal.classList.add("active");
    });
});

cerrar.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", e => {
    if(e.target === modal){
        modal.classList.remove("active");
    }
});

let isDown = false;
let startX;
let scrollLeft;

const carousel = document.querySelector(".carousel");

carousel.addEventListener("mousedown", e => {

    isDown = true;

    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
    isDown = false;
});

carousel.addEventListener("mouseup", () => {
    isDown = false;
});

carousel.addEventListener("mousemove", e => {

    if(!isDown) return;

    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;

    const walk = (x - startX) * 2;

    carousel.scrollLeft = scrollLeft - walk;
});

});

