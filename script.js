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

// ================= CHATBOT =================
let estado = "inicio";
let datos = {};
let historial = [];

let chatAbierto = false;
let animandoChat = false;
let primeraApertura = true;

// ===== PERFIL =====
const perfil = {
    nombre: "Samuel Galicia",

    pitch: "desarrollador enfocado en crear soluciones web funcionales, con bases sólidas en backend, bases de datos y experiencia construyendo proyectos reales",

    educacion: "Egresado de Ingeniería en Sistemas y Computación, en proceso de preespecialización en Ciencia de Datos",

    fortalezas: [
        "Capacidad para desarrollar soluciones completas (frontend + backend)",
        "Enfoque en resolver problemas reales",
        "Aprendizaje continuo y adaptación rápida",
        "Buenas prácticas en desarrollo"
    ],

    habilidades_tecnicas: [
        "HTML", "CSS", "JavaScript",
        "C#", ".NET", "ASP.NET MVC",
        "SQL Server", "MySQL"
    ],

    habilidades_blandas: [
        "Responsabilidad",
        "Puntualidad",
        "Proactividad",
        "Trabajo en equipo",
        "Comunicación efectiva"
    ],

    cursos: [
        "Desarrollo Web Frontend (Alura Latam)",
        "Fundamentos de programación",
        "Bases de datos",
        "Desarrollo personal"
    ],

    experiencia: [
        "Desarrollo de sistemas web funcionales",
        "Creación de chatbot interactivo",
        "Gestión y diseño de bases de datos",
        "Soporte técnico y resolución de incidencias"
    ],

    proyectos: [
        "Sistema de gestión de contraseñas con seguridad por usuario",
        "Chatbot web conectado a backend en Python",
        "Aplicaciones web con ASP.NET MVC"
    ]
};

// ===== ELEMENTOS =====
const chat = document.getElementById("chatbot");
const toggleBtn = document.getElementById("chat-toggle");
const closeBtn = document.getElementById("close-chat");
const status = document.querySelector(".chat-status");

// ===== SONIDO =====
const sonido = new Audio("audio/button-09a.mp3");
sonido.volume = 0.03;

// ===== MENSAJES =====
function userMsg(text){
    const chatBody = document.getElementById("chat-body");
    if (!chatBody) return;

    const msg = document.createElement("div");
    msg.className = "msg-user";
    msg.innerText = text;

    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botMsg(text){
    const chatBody = document.getElementById("chat-body");
    if (!chatBody) return;

    const msg = document.createElement("div");
    msg.className = "msg-bot";
    msg.innerHTML = text;

    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;

    if (chatAbierto) sonido.play().catch(()=>{});
}

// ===== TYPING =====
const typingSound = new Audio("audio/escritura.mp3");

function typing(){
    const chatBody = document.getElementById("chat-body");
    if (!chatBody) return;

    const msg = document.createElement("div");
    msg.className = "msg-bot typing";
    msg.id = "typing";
    msg.innerText = "Escribiendo...";

    chatBody.appendChild(msg);

    typingSound.loop = true;
    typingSound.play().catch(()=>{});

    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping(){
    document.getElementById("typing")?.remove();
    typingSound.pause();
    typingSound.currentTime = 0;
}

// ===== TOGGLE CHAT =====
if (toggleBtn) {
    toggleBtn.onclick = function () {

        if (animandoChat) return;

        animandoChat = true;

        if (!chatAbierto) {
            chat.classList.remove("hidden");

            setTimeout(() => {
                chat.classList.add("active");
                animandoChat = false;
            }, 10);

            if (status) status.style.display = "none";

            chatAbierto = true;

            if (primeraApertura) {
                setTimeout(() => {
                    botMsg("¡Hola! 👋 Soy Criss 🤖<br>, el asistente virtual de Samuela ¿Qué deseas saber?");
                }, 800);
                primeraApertura = false;
            }

        } else {
            chat.classList.remove("active");

            setTimeout(() => {
                chat.classList.add("hidden");
                animandoChat = false;
            }, 300);

            if (status) status.style.display = "flex";

            chatAbierto = false;
        }
    };
}

// ===== CLOSE CHAT =====
if (closeBtn && toggleBtn) {
    closeBtn.onclick = () => toggleBtn.click();
}

// ===== INPUT =====
const input = document.getElementById("chat-input");

if (input) {
    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const msg = this.value.trim();
            if (!msg) return;

            this.value = "";

            userMsg(msg);
            typing();

            setTimeout(() => {
                removeTyping();
                responder(msg.toLowerCase());
            }, 800);
        }
    });
}

// ===== RESPUESTAS =====
function responder(msg){

    // 🔥 DETECCIÓN INTELIGENTE
    if(msg.includes("experiencia") || msg.includes("trabajo")){
        botMsg("Hey 👀 te cuento algo interesante...<br><br>Samuel ha trabajado desarrollando sistemas web, incluyendo un gestor de contraseñas 🔐 con seguridad avanzada, manejo de usuarios y base de datos.<br><br>También ha creado chatbots conectados a backend en Python y aplicaciones en ASP.NET 💻<br><br>Es alguien que no solo aprende… sino que construye 🚀");
        return;
    }

    if(msg.includes("habilidad") || msg.includes("skills")){
        botMsg("Buena pregunta 👌<br><br>Samuel combina habilidades técnicas y blandas:<br><br>💻 Técnicas:<br>- HTML, CSS, JavaScript<br>- C# y ASP.NET MVC<br>- SQL Server / MySQL<br>- Python (chatbots)<br><br>🤝 Blandas:<br>- Responsabilidad<br>- Trabajo en equipo<br>- Comunicación<br>- Proactividad<br><br>Un perfil bastante completo para un perfil junior 🔥");
        return;
    }

    if(msg.includes("estudio") || msg.includes("universidad")){
        botMsg("Samuel es egresado de Ingeniería en Sistemas 💻<br>y actualmente está en proceso de preespecialización en Ciencia de Datos 📊<br><br>Eso significa que no solo desarrolla… también entiende datos, análisis y lógica avanzada 👀");
        return;
    }

    if(msg.includes("contratar") || msg.includes("reclutar")){
        botMsg("Te lo digo directo 👇<br><br>Si buscas alguien que:<br><br>✔ Aprende rápido<br>✔ Ya desarrolla proyectos reales<br>✔ Tiene bases sólidas en backend y frontend<br><br>Samuel es una excelente opción para iniciar como desarrollador JR 🚀<br><br>¿Quieres contactarlo? 😄");
        return;
    }

    if(msg.includes("proyecto")){
        botMsg("Samuel ha trabajado en varios proyectos interesantes 👇<br><br>🔐 Sistema de gestión de contraseñas<br>🤖 Chatbot inteligente con backend<br>🌐 Aplicaciones web con base de datos<br><br>Puedes verlos en la sección de portafolio 👆🔥");
        return;
    }

    // ===== FLUJO CONTACTO =====
    if(estado === "inicio"){
        botMsg("No comprendo tu pregunta 🥹 por favor dime que deseas. 🤖<br><br>Puedo contarte sobre su experiencia, habilidades o ayudarte a contactarlo.<br><br>¿Qué te gustaría saber?");
        estado = "menu";
        return;
    }

    if(estado === "menu"){
        if(msg.includes("contact")){
            botMsg("Perfecto 🙌<br>Vamos a ponerte en contacto directo con Samuel.<br><br>¿Cuál es tu nombre?");
            estado = "nombre";
        } else {
            botMsg("Puedo ayudarte con:<br><br>💼 Experiencia<br>🧠 Habilidades<br>📊 Estudios<br>📩 Contacto<br><br>Solo dime 👇");
        }
        return;
    }

    if(estado === "nombre"){
        datos.nombre = msg;
        botMsg(`Mucho gusto ${msg} 😄<br>¿Cuál es tu correo?`);
        estado = "email";
        return;
    }

    if(estado === "email"){
        datos.email = msg;
        botMsg("Perfecto 👍<br>Ahora escribe el mensaje que deseas enviar:");
        estado = "mensaje";
        return;
    }

    if(estado === "mensaje"){
        datos.mensaje = msg;

        botMsg("📩 Enviando...");

        fetch("https://portafolio-ebt4.onrender.com/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
        .then(async res => {
            const data = await res.json().catch(()=> ({}));
            if (!res.ok) throw new Error(data.error || "Error servidor");
            return data;
        })
        .then(() => {
            botMsg("🔥 Mensaje enviado correctamente");
        })
        .catch(err => {
            console.error(err);
            botMsg("⚠️ Error: " + err.message);
        });

        estado = "fin";
        return;
    }


    botMsg("Interesante 🤔… puedo ayudarte mejor si me dices algo sobre experiencia, habilidades o contacto.");
}


// ================= BOTÓN TOP =================
const btnTop = document.getElementById("btnTop");

if (btnTop) {
    window.addEventListener("scroll", () => {
        btnTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    btnTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ================= STATUS =================
const statusText = document.getElementById("status-text");

if (statusText) {
    const estados = [
        "En línea",
        "Responde en minutos",
        "Estoy disponible 👀",
        "¿Hablamos?",
        "Listo para ayudarte 💬"
    ];

    let i = 0;

    setInterval(() => {
        i = (i + 1) % estados.length;
        statusText.textContent = estados[i];
    }, 3000);
}

});

