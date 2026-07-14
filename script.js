document.addEventListener("DOMContentLoaded", function () {



    // ================= NAV =================
    window.seleccionar = function (link) {
        const opciones = document.querySelectorAll('#links a');
        opciones.forEach(op => op.className = "");
        link.className = "seleccionado";

        const nav = document.getElementById("nav");
        if (nav) nav.className = "";
    }

    window.responsiveMenu = function () {
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


    /*=========================================
                MODAL
    =========================================*/

    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const cerrar = document.querySelector(".cerrar");

    cerrar.addEventListener("click", () => {
        modal.classList.remove("active");
        modalContent.innerHTML = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            modalContent.innerHTML = "";
        }
    });
    /*=========================================
          CARRUSELES (PROYECTOS Y CERTIFICADOS)
    =========================================*/

    inicializarCarrusel(
        ".carousel",
        ".carousel-track",
        ".proyecto"
    );

    inicializarCarrusel(
        ".certificados-carousel",
        ".certificados-track",
        ".certificado"
    );

    function inicializarCarrusel(carouselClass, trackClass, itemClass) {

        const carousel = document.querySelector(carouselClass);
        const track = document.querySelector(trackClass);

        if (!carousel || !track) return;

        let items = track.querySelectorAll(itemClass);

        if (items.length == 0) return;

        //Duplicar elementos
        track.innerHTML += track.innerHTML;

        items = track.querySelectorAll(itemClass);

        let indice = 0;
        let auto;

        function actualizar() {

            const ancho = items[0].getBoundingClientRect().width + 20;

            track.style.transform =
                `translateX(-${indice * ancho}px)`;

            items.forEach(item => item.classList.remove("active"));

            // Número de tarjetas originales
            const total = items.length / 2;

            // Tarjeta que quedará al centro
            let centro = indice + 1;

            if (centro >= total) {
                centro = 0;
            }

            // Activar la tarjeta central
            items[centro].classList.add("active");
            items[centro + total].classList.add("active");

        }

        function iniciar() {

            auto = setInterval(() => {

                indice++;

                if (indice >= items.length / 2) {

                    indice = 0;

                    track.style.transition = "none";
                    track.style.transform = "translateX(0px)";

                    actualizar();

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            track.style.transition = "transform 1.8s ease";
                        });
                    });

                    return;
                }

                actualizar();

            }, 9000);

        }

        function detener() {

            clearInterval(auto);

        }

        actualizar();

        iniciar();

        carousel.addEventListener("mouseenter", detener);

        carousel.addEventListener("mouseleave", iniciar);

        /*==================================
                DRAG
        ==================================*/

        let presionado = false;

        let inicioX = 0;

        let indiceInicial = 0;

        carousel.addEventListener("mousedown", (e) => {

            presionado = true;

            inicioX = e.clientX;

            indiceInicial = indice;

            detener();

        });

        window.addEventListener("mouseup", () => {

            if (!presionado) return;

            presionado = false;

            iniciar();

        });

        window.addEventListener("mousemove", (e) => {

            if (!presionado) return;

            const diferencia = e.clientX - inicioX;

            if (Math.abs(diferencia) < 70) return;

            if (diferencia < 0) {

                indice++;

            } else {

                indice--;

            }

            if (indice < 0) {

                indice = items.length / 2 - 1;

            }

            if (indice >= items.length / 2) {

                indice = 0;

            }

            actualizar();

            presionado = false;

        });

        /*==================================
                MODAL
        ==================================*/

        items.forEach(card => {

            card.addEventListener("click", () => {

                const img = card.querySelector("img");
                const video = card.querySelector("video");
                const iframe = card.querySelector("iframe");

                modalContent.innerHTML = "";

                if (img) {

                    modalContent.innerHTML =
                        `<img src="${img.src}">`;

                }

                if (video) {

                    modalContent.innerHTML =
                        `<video controls autoplay>
                    <source src="${video.querySelector("source").src}">
                </video>`;

                }

                if (iframe) {

                    modalContent.innerHTML =
                        `<iframe src="${iframe.src}" allowfullscreen></iframe>`;

                }

                modal.classList.add("active");

            });

        });

    }


});

