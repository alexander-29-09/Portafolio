document.addEventListener("DOMContentLoaded", function () {



// ================= NAV =================
function seleccionar(link) {
    const opciones = document.querySelectorAll('#links a');
    opciones.forEach(op => op.className = "");
    link.className = "seleccionado";

    const nav = document.getElementById("nav");
    if (nav) nav.className = "";
}

function responsiveMenu() {
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

    track.innerHTML += track.innerHTML;
    items = document.querySelectorAll(".proyecto");

    function actualizarCarrusel() {
        const itemWidth = items[0].offsetWidth + 20;
        const offset = index * itemWidth;

        track.style.transform = `translateX(-${offset}px)`;

        items.forEach(el => el.classList.remove("active"));
        items[index]?.classList.add("active");
    }

    function iniciarAutoScroll() {
        autoScroll = setInterval(() => {
            index++;

            if (index >= items.length / 2) {
                index = 0;
                track.style.transition = "none";
                track.style.transform = "translateX(0)";
                setTimeout(() => {
                    track.style.transition = "transform 0.8s";
                }, 50);
            }

            actualizarCarrusel();
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

});

