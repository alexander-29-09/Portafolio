
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    
    var x = document.getElementById("nav");
    x.className = "";
}

function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}


window.onscroll = function() { efectoHabilidades() };


function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        document.getElementById("html").classList.add("barra-progreso1");
        document.getElementById("js").classList.add("barra-progreso2");
        document.getElementById("C#").classList.add("barra-progreso3");
        document.getElementById("DB").classList.add("barra-progreso4");
        document.getElementById("net").classList.add("barra-progreso5");
        document.getElementById("redes").classList.add("barra-progreso6");
        document.getElementById("puntualidad").classList.add("barra-progreso7");
        document.getElementById("equipo").classList.add("barra-progreso8");
        document.getElementById("responsabilidad").classList.add("barra-progreso9");
    }

}
//efecto de particulas
particlesJS("particles-js", {
  particles: {
    number: {
      value: 60
    },
    color: {
      value: "#58e4f7"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 3
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#58e4f7",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
});

// Carrusel de proyectos
let index = 0;
let autoScroll;

const track = document.querySelector(".carousel-track");
let items = document.querySelectorAll(".proyecto");

// duplicar para efecto infinito
track.innerHTML += track.innerHTML;
items = document.querySelectorAll(".proyecto");

function actualizarCarrusel() {
    const itemWidth = items[0].offsetWidth + 20;
    const offset = index * itemWidth;

    track.style.transform = `translateX(-${offset}px)`;

    // quitar active
    items.forEach(el => el.classList.remove("active"));

    // activar el actual
    items[index].classList.add("active");
}

// AUTO SCROLL SUAVE
function iniciarAutoScroll() {
    autoScroll = setInterval(() => {
        index++;

        if (index >= items.length / 2) {
            index = 0;
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            setTimeout(() => {
                track.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
            }, 50);
        }

        actualizarCarrusel();
    }, 3000);
}

// PAUSA
function detenerAutoScroll() {
    clearInterval(autoScroll);
}

const carousel = document.querySelector(".carousel");

carousel.addEventListener("mouseenter", detenerAutoScroll);
carousel.addEventListener("mouseleave", iniciarAutoScroll);

// TOUCH (SWIPE)
let startX = 0;

carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    detenerAutoScroll();
});

carousel.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        index++;
    } else if (endX - startX > 50) {
        index--;
    }

    actualizarCarrusel();
    iniciarAutoScroll();
});

// INIT
actualizarCarrusel();
iniciarAutoScroll();
//Chatbot
let estado = "inicio";
let datos = {};
let historial = [];

// ===== TOGGLE  =====
function toggleChat(){
    const chat = document.getElementById("chatbot");
    chat.classList.toggle("hidden");
    chat.classList.toggle("active");
}
const chat = document.getElementById("chatbot");




// ===== SONIDO =====
const sonido = new Audio("audio/button-09a.mp3");
sonido.volume = 0.03;

// ===== AUTO SCROLL =====
function scrollChat(){
    const chat = document.getElementById("chat-body");
    chat.scrollTop = chat.scrollHeight;
}


// ===== MENSAJES =====
function userMsg(text){
    let chat = document.getElementById("chat-body");

    let msg = document.createElement("div");
    msg.className = "msg-user";
    msg.innerText = text;

    chat.appendChild(msg);
   // sonido.play().catch(()=>{});
    chat.scrollTop = chat.scrollHeight;
}
/*
function guardarChat() {
    localStorage.setItem("chatHistorial", document.getElementById("chat-body").innerHTML);
}*/
function botMsg(text){
     let chat = document.getElementById("chat-body");

    let msg = document.createElement("div");
    msg.className = "msg-bot";
    msg.innerHTML = text;

    chat.appendChild(msg);
    
    chat.scrollTop = chat.scrollHeight;

    // solo si el chat está abierto
    if (chatAbierto) {
        sonido.play().catch(()=>{});
    }
}
/*window.onload = function () {
    const historial = localStorage.getItem("chatHistorial");
    if (historial) {
        document.getElementById("chat-body").innerHTML = historial;
    }
};*/
// ===== INDICADOR ESCRIBIENDO =====
const typingSound = new Audio("audio/escritura.mp3");
function typing(){
    let chat = document.getElementById("chat-body");

    let msg = document.createElement("div");
    msg.className = "msg-bot typing";
    msg.id = "typing";
    msg.innerText = "Escribiendo...";

    chat.appendChild(msg);
    typingSound.loop = true;
    typingSound.play().catch(()=>{});

    chat.scrollTop = chat.scrollHeight;
}

function removeTyping(){
    let t = document.getElementById("typing");
    if(t) t.remove();
    typingSound.pause();
    typingSound.currentTime = 0;
}

// ===== IA SIMULADA =====




// INPUT
document.getElementById("chat-input").addEventListener("keydown", function(e){

    if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();

        let msg = this.value.trim();
        if(msg === "") return;

        this.value = "";

        userMsg(msg);
        historial.push({user: msg});

        typing();

        setTimeout(()=>{
            removeTyping();
            responder(msg.toLowerCase());
        }, 800);
    }
});

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

//ocultar estado de chat al dar click 
const toggle = document.getElementById("chat-toggle");
let chatAbierto = false;
let animandoChat = false;

let primeraApertura = true;

document.getElementById("chat-toggle").onclick = function () {

    if (animandoChat) return; // vita doble click

    const chat = document.getElementById("chatbot");
    const status = document.querySelector(".chat-status");

    animandoChat = true;

    if (!chatAbierto) {
        // ABRIR
        chat.classList.remove("hidden");

        setTimeout(() => {
            chat.classList.add("active");
            animandoChat = false;
        }, 10);

        status.style.display = "none";

        chatAbierto = true;

        if (primeraApertura) {
            setTimeout(() => {
                botMsg("¡Hola! 👋 Soy Criss, el asistente de Samuel 🤖<br> dime en qué puedo ayudarte, Puedo ayudarte con:<br><br>💼 Experiencia<br>🧠 Habilidades<br>📊 Estudios<br>📩 Contacto<br><br>Solo dime 👇 ");
            }, 800);

            primeraApertura = false;
        }

    } else {
        // CERRAR
        chat.classList.remove("active");

        setTimeout(() => {
            chat.classList.add("hidden");
            animandoChat = false;
        }, 300);

        status.style.display = "flex";

        chatAbierto = false;
    }
};
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

    botMsg("📩 Enviando mensaje...");

    fetch("https://portafolio-ebt4.onrender.com/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "ok"){
            botMsg("🔥 Mensaje enviado correctamente.<br>Samuel te responderá pronto 📩");
        } else {
            botMsg("❌ Hubo un problema al enviar el mensaje, puedes enviar un correo directo a samuelalexandergalicia@outlook.es");
        }
    })
    .catch(err => {
        console.error(err);
        botMsg("⚠️ Error de conexión con el servidor, por favor intentalo mas tarde o envia un correo directo a samuelalexandergalicia@outlook.es ");
    });

    estado = "fin";
    return;
}

    botMsg("Interesante 🤔… puedo ayudarte mejor si me dices algo sobre experiencia, habilidades o contacto.");
}



document.getElementById("close-chat").onclick = function () {
    document.getElementById("chat-toggle").click();
};
// BOTÓN VOLVER ARRIBA
const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
});

btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

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
    document.getElementById("status-text").textContent = estados[i];
}, 3000);