
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


// ===== TOGGLE  =====
function toggleChat(){
    const chat = document.getElementById("chatbot");
    chat.classList.toggle("hidden");
    chat.classList.toggle("active");
}
const chat = document.getElementById("chatbot");
// ABRIR / CERRAR (BURBUJA)
document.getElementById("chat-toggle").onclick = function () {
    if (chat.classList.contains("hidden")) {
        chat.classList.remove("hidden");
        setTimeout(() => chat.classList.add("active"), 10);
    } else {
        chat.classList.remove("active");
        setTimeout(() => chat.classList.add("hidden"), 300);
    }
};

// BOTÓN CERRAR (X)
document.getElementById("close-chat").onclick = function () {
    chat.classList.remove("active");
    setTimeout(() => chat.classList.add("hidden"), 300);
};


// ===== SONIDO =====
const sonido = new Audio("audio/button-09a.mp3");

// ===== AUTO SCROLL =====
function scrollChat(){
    const chat = document.getElementById("chat-body");
    chat.scrollTop = chat.scrollHeight;
}

// ===== MENSAJES =====
function userMsg(text){
    const chat = document.getElementById("chat-body");
    chat.innerHTML += `<div class="msg-user">${text}</div>`;
   // guardarChat();
    scrollChat();
}
/*
function guardarChat() {
    localStorage.setItem("chatHistorial", document.getElementById("chat-body").innerHTML);
}*/
function botMsg(text){
    const chat = document.getElementById("chat-body");
    chat.innerHTML += `<div class="msg-bot">${text}</div>`;
   // guardarChat();
    scrollChat();
}
/*window.onload = function () {
    const historial = localStorage.getItem("chatHistorial");
    if (historial) {
        document.getElementById("chat-body").innerHTML = historial;
    }
};*/
// ===== INDICADOR ESCRIBIENDO =====
function typing(){
    document.getElementById("chat-body").innerHTML += `<div class="typing">Escribiendo...</div>`;
    scrollChat();
}

function removeTyping(){
    const typingEl = document.querySelector(".typing");
    if(typingEl) typingEl.remove();
}

// ===== IA SIMULADA =====
let estado = "inicio";
let datos = {};

setTimeout(()=>{
    botMsg("¡Hola! 👋 Soy el asistente de Samuel 🤖<br>¿Quieres contactarlo o ver sus proyectos?");
},1000);

// INPUT
document.getElementById("chat-input").addEventListener("keydown", function(e){

    // ENTER sin SHIFT
    if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();

        let msg = this.value.trim();
        if(msg === "") return;

        this.value = "";

        userMsg(msg);
        typing();

        setTimeout(()=>{
            removeTyping();
            responder(msg.toLowerCase());
        },1000);
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

// ===== RESPUESTAS =====
function responder(msg){

    if(estado === "inicio"){

        // PERFIL GENERAL
        if(msg.includes("quien") || msg.includes("samuel") || msg.includes("perfil")){
            botMsg(`Te cuento 👨‍💻<br><br>
            Samuel es un ${perfil.pitch}.<br><br>
            ${perfil.educacion}.<br><br>
            Se caracteriza por su enfoque en resultados y su capacidad de adaptarse rápidamente a nuevas tecnologías 🚀`);
        }

        // EXPERIENCIA CON VALOR
        else if(msg.includes("experiencia") || msg.includes("trabajo")){
            botMsg(`Claro 👌 te doy un resumen concreto:<br><br>
            🔹 ${perfil.experiencia.join("<br>🔹 ")}<br><br>
            Algo importante es que no solo tiene conocimiento teórico, sino que ya ha trabajado en soluciones reales 💡`);
        }

        // HABILIDADES + ENFOQUE
        else if(msg.includes("habilidad") || msg.includes("tecnologia")){
            botMsg(`A nivel técnico 💻:<br><br>
            🔧 ${perfil.habilidades_tecnicas.join("<br>🔧 ")}<br><br>
            Esto le permite trabajar tanto en frontend como en backend sin problema.`);
        }

        // FORTALEZAS 
        else if(msg.includes("fortaleza") || msg.includes("porque contratar")){
            botMsg(`Buena pregunta 👀<br><br>
            Algunas razones por las que Samuel destaca:<br><br>
            ⭐ ${perfil.fortalezas.join("<br>⭐ ")}<br><br>
            Es alguien que no solo programa, sino que busca soluciones eficientes.`);
        }

        // PROYECTOS 
        else if(msg.includes("proyecto")){
            botMsg(`Aquí es donde demuestra lo que sabe hacer 🚀<br><br>
            🔹 ${perfil.proyectos.join("<br>🔹 ")}<br><br>
            Son proyectos enfocados en resolver necesidades reales, no solo académicas.`);
        }

        // EDUCACIÓN
        else if(msg.includes("estudio") || msg.includes("educacion")){
            botMsg(`🎓 ${perfil.educacion}.<br><br>
            Además, complementa su formación con cursos y práctica constante.`);
        }

        // CURSOS
        else if(msg.includes("curso")){
            botMsg(`Samuel también se ha preparado constantemente 📚:<br><br>
            📌 ${perfil.cursos.join("<br>📌 ")}<br><br>
            Siempre está aprendiendo nuevas tecnologías.`);
        }

        // CONTACTO 
        else if(msg.includes("contactar") || msg.includes("contratar")){
            botMsg(`Excelente decisión 💼<br><br>
            Samuel está abierto a oportunidades donde pueda aportar y seguir creciendo.<br><br>
            Por favor dime tu nombre 👇`);
            estado = "nombre";
        }

        // RESPUESTA GENERAL
        else{
            botMsg(`Hola 👋 soy el asistente de Samuel 🤖<br><br>
            Si estás evaluando su perfil puedo ayudarte con:<br><br>
            💼 Experiencia<br>
            💻 Habilidades<br>
            🚀 Proyectos<br>
            ⭐ Fortalezas<br><br>
            O si lo prefieres, te ayudo a contactarlo directamente 😉`);
        }
    }

    // ===== FLUJO CONTACTO =====
    else if(estado === "nombre"){
        datos.nombre = msg;
        botMsg(`Perfecto ${msg} 🙌<br>¿Cuál es tu correo?`);
        estado = "email";
    }

    else if(estado === "email"){
        datos.email = msg;
        botMsg("Gracias 👍 ahora dime brevemente qué necesitas o qué tipo de oportunidad tienes, por favor hazlo en un mismo texto. Gracias");
        estado = "mensaje";
    }

    else if(estado === "mensaje"){
        datos.mensaje = msg;

        fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datos)
        });

        botMsg("🚀 Listo, tu mensaje fue enviado.<br>Samuel te responderá lo antes posible.");
        estado = "inicio";
    }
}