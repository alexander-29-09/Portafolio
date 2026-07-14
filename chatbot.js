import { perfil, proyectos } from "./data.js";

// ================= ESTADO =================
let estado = "inicio";
let datos = {};
let historial = JSON.parse(localStorage.getItem("chat_historial")) || [];



const chatBox = document.getElementById("chat-body");
const input = document.getElementById("chat-input");
const status = document.querySelector(".chat-status");
const chat = document.getElementById("chatbot");
const toggleBtn = document.getElementById("chat-toggle");
const closeBtn = document.getElementById("close-chat");

let animandoChat = false;
let chatAbierto = false; // 🔥 IMPORTANTE
// ================= SONIDOS =================
const sonidoMensaje = new Audio("audio/mensaje.mp3");
const sonidoClick = new Audio("audio/button-09a.mp3");
const sonidoTyping = new Audio("audio/escritura.mp3");

sonidoMensaje.volume = 0.3;
sonidoClick.volume = 0.2;
sonidoTyping.volume = 0.2;


function normalizar(texto) {
    return texto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
// ================= VERIFICA QUE EL CV SE ENCUENTRE DISPONIBLE =================

async function verificarCV(url) {
    try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok;
    } catch {
        return false;
    }
}
// ================= Carga historial =================

//function cargarHistorial(){
chatBox.innerHTML = "";

historial.forEach(m => {
    const div = document.createElement("div");
    div.className = m.tipo === "user" ? "msg-user" : "msg-bot";
    div.innerHTML = m.texto;
    chatBox.appendChild(div);
});

chatBox.scrollTop = chatBox.scrollHeight;
//}
// ================= UTIL =================
function guardar(tipo, texto) {
    historial.push({ tipo, texto });
    localStorage.setItem("chat_historial", JSON.stringify(historial));
}

// ================= MENSAJES =================
function botMsg(texto) {
    const div = document.createElement("div");
    div.className = "msg-bot";
    div.innerHTML = texto;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (chatAbierto) {
        sonidoMensaje.currentTime = 0;
        sonidoMensaje.play().catch(() => { });
    }

    guardar("bot", texto);
}

function userMsg(texto) {
    const div = document.createElement("div");
    div.className = "msg-user";
    div.innerHTML = texto;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    guardar("user", texto);
}

// ================= TYPING =================
function typing() {
    const div = document.createElement("div");
    div.className = "msg-bot typing";
    div.id = "typing";
    div.innerHTML = "Escribiendo...";

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    sonidoTyping.loop = true;
    sonidoTyping.play().catch(() => { });
}

function removeTyping() {
    document.getElementById("typing")?.remove();

    sonidoTyping.pause();
    sonidoTyping.currentTime = 0;
}

// ================= BOTONES =================
function botones(opciones) {
    const div = document.createElement("div");
    div.className = "quick-actions";

    opciones.forEach(op => {
        const btn = document.createElement("button");
        btn.textContent = op.texto;
        btn.onclick = () => enviarOpcion(op.valor);
        div.appendChild(btn);
    });

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ================= BIENVENIDA =================
function bienvenida() {
    botMsg(`
👋 Hola, soy Criss el asistente virtual de <b>${perfil.nombre}</b><br><br>
Estoy aquí para ayudarte a conocer su perfil, proyectos o colaborar contigo.
    `);

    botones([
        { texto: "💼 Experiencia", valor: "experiencia" },
        { texto: "🚀 Proyectos", valor: "proyectos" },
        { texto: "🧠 Habilidades", valor: "habilidades" },
        { texto: "🎓 Estudios", valor: "estudios" },
        { texto: "🙋 Sobre mí", valor: "sobre mi" },
        { texto: "📩 Contacto", valor: "contacto" },
        { texto: "📄 Descargar CV", valor: "cv" }
    ]);
}

// ================= PROYECTOS =================
function mostrarProyectos() {
    let html = "🚀 <b>Proyectos destacados:</b><br><br>";

    proyectos.forEach(p => {
        html += `<b>${p.nombre}</b><br>${p.descripcion}<br><br>`;
    });

    botMsg(html);

    botones(proyectos.map(p => ({
        texto: p.nombre,
        valor: p.id
    })));
}

function detalleProyecto(msg) {

    const p = proyectos.find(x =>
        msg.includes(x.id) ||
        msg.includes(x.nombre.toLowerCase())
    );

    if (!p) {
        botMsg("No encontré ese proyecto 😅 intenta con otro");
        return;
    }

    botMsg(`
🚀 <b>${p.nombre}</b><br><br>
${p.descripcion}<br><br>

🛠 <b>Tecnologías:</b><br>
${p.tecnologias.join(", ")}<br><br>

📌 ${p.detalle}
    `);
}
// ================= RESPONDER =================
// ================= RESPONDER =================
function responder(msg) {

    if (!msg) return;
    msg = normalizar(msg);

    // 🔄 VOLVER A INICIO (IMPORTANTE PONERLO ARRIBA)
    if (msg.includes("menu") || msg.includes("inicio") || msg.includes("volver")) {
        estado = "inicio";
        botMsg("Perfecto 😄 volvamos al inicio 👇");
        bienvenida();
        return;
    }

    // 👋 SALUDO
    if (msg.includes("hola") || msg.includes("buenas") || msg.includes("hey")) {
        estado = "inicio";
        bienvenida();
        return;
    }

    // 💼 EXPERIENCIA
    if (msg.includes("experiencia")) {
        estado = "inicio";
        botMsg(`
💼 <b>Experiencia profesional</b><br><br>

${perfil.nombre} cuenta con experiencia en desarrollo web, backend, bases de datos y soporte técnico.<br><br>

Ha trabajado en proyectos reales aplicando buenas prácticas y tecnologías modernas.<br><br>

<b>📌 Experiencia laboral:</b><br><br>

<b>Comdata / Digitex El Salvador</b> | Soporte técnico<br>
Agosto 2021 – Agosto 2025<br>
Resolución de incidencias técnicas para clientes PYMES y usuarios finales, soporte remoto, configuración de servicios, documentación y seguimiento de casos.<br><br>

<b>Torrefactora de Café San José La Majada</b> | Asistente de Ventas<br>
Enero 2020 – Julio 2020<br>
Atención al cliente, gestión de pedidos y apoyo en procesos administrativos.
        `);
        return;
    }

    // 🧠 HABILIDADES
    if (msg.includes("habilidades")) {
        estado = "inicio";

        botMsg(`
Perfecto 👌 te comento que <b>${perfil.nombre}</b> posee habilidades personales y técnicas.<br><br>

Te las muestro 👇<br><br>

🧠 <b>Habilidades técnicas:</b><br>
- ${perfil.habilidades.tecnicas.join("<br>- ")}<br><br>

🤝 <b>Habilidades blandas:</b><br>
- ${perfil.habilidades.blandas.join("<br>- ")}
    `);

        return;
    }

    // DESCARGAR DE CV 

    if (msg.includes("cv") || msg.includes("curriculum") || msg.includes("hoja de vida")) {
        estado = "inicio";

        const urlCV = "cv/Curriculum.pdf";

        botMsg("🔎 Verificando disponibilidad del CV...");

        verificarCV(urlCV).then(existe => {

            if (existe) {
                botMsg(`
📄 <b>Currículum de ${perfil.nombre}</b><br><br>

Puedes descargarlo aquí 👇<br><br>

<a href="${urlCV}" download target="_blank" class="btn-cv">
⬇ Descargar CV
</a>
            `);
            } else {
                botMsg(`
⚠️ Al parecer aún no he subido mi CV.<br><br>

Pero puedes solicitarlo directamente y con gusto te lo envío 📩👇
            `);

                botones([
                    { texto: "📩 Contactar", valor: "contacto" }
                ]);
            }

        });

        return;
    }
    //  Sobre mi

    if (msg.includes("sobre") || msg.includes("perfil") || msg.includes("personal")) {
        estado = "inicio";

        botMsg(`
🙋 <b>Sobre ${perfil.nombre}</b><br><br>

${perfil.sobre_mi}
    `);

        return;
    }
    //  Estudios
    if (msg.includes("estudio")) {
        estado = "inicio";

        botMsg(`
🎓 <b>Formación académica</b><br><br>

${perfil.nombre} cuenta con la siguiente formación:<br><br>

📊 ${perfil.estudios}<br><br>

Además, se mantiene en constante aprendizaje para fortalecer sus habilidades en desarrollo y tecnología.
    `);

        return;
    }

    // 🚀 PROYECTOS
    if (msg.includes("proyecto") || msg.includes("trabajos")) {
        estado = "proyectos";
        mostrarProyectos();
        return;
    }

    // 🔍 DETALLE DE PROYECTOS (SOLO SI ESTÁ EN ESE ESTADO)
    if (estado === "proyectos") {
        detalleProyecto(msg);
        return;
    }

    // 📩 CONTACTO
    if (msg.includes("contacto") || msg.includes("contratar")) {
        estado = "nombre";
        botMsg("Perfecto 🙌 ¿Cuál es tu nombre?");
        return;
    }

    if (estado === "nombre") {
        datos.nombre = msg;
        estado = "email";
        botMsg(`Mucho gusto ${msg} 😊 ¿Cuál es tu correo?`);
        return;
    }

    if (estado === "email") {
        datos.email = msg;
        estado = "mensaje";
        botMsg("Escribe tu mensaje 👇");
        return;
    }

    if (estado === "mensaje") {
        datos.mensaje = msg;

        botMsg("📩 Enviando mensaje...");

        fetch("https://portafolio-ebt4.onrender.com/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
            .then(() => botMsg("🔥 Mensaje enviado correctamente. Te responderán pronto 😉"))
            .catch(() => botMsg("⚠️ Error al enviar el mensaje"));

        estado = "inicio";
        return;
    }

    // 🤖 RESPUESTA DEFAULT
    botMsg("Puedo ayudarte con proyectos, experiencia o contacto 😊");
}

// ================= EVENTOS =================
window.enviarOpcion = function (valor) {
    sonidoClick.play().catch(() => { });

    userMsg(valor);
    typing();

    const tiempo = 700 + Math.random() * 800;

    setTimeout(() => {
        removeTyping();
        responder(valor);
    }, tiempo);
};

if (input) {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            const msg = this.value.trim();
            if (!msg) return;

            this.value = "";

            sonidoClick.play().catch(() => { });

            userMsg(msg);
            typing();

            const tiempo = 700 + Math.random() * 800;

            setTimeout(() => {
                removeTyping();
                responder(msg);
            }, tiempo);
        }
    });
}

// ================= INIT =================
setTimeout(() => {
    typing();

    setTimeout(() => {
        removeTyping();
        bienvenida();
    }, 1200);
}, 500);


if (toggleBtn && chat) {
    toggleBtn.addEventListener("click", () => {

        // 🔊 sonido click
        sonidoClick.currentTime = 0;
        sonidoClick.play().catch(() => { });

        // evitar doble click mientras anima
        if (animandoChat) return;
        animandoChat = true;

        if (!chatAbierto) {

            // ===== ABRIR =====
            chat.classList.remove("hidden");

            setTimeout(() => {
                chat.classList.add("active");
                animandoChat = false;
            }, 10);

            chatAbierto = true;

            // ocultar estado flotante
            if (status) status.style.display = "none";

            // 🔥 cargar historial
            cargarHistorial();

            // 🧠 si es primera vez
            if (historial.length === 0) {

                setTimeout(() => {
                    typing();

                    setTimeout(() => {
                        removeTyping();
                        bienvenida();
                    }, 1000);

                }, 300);
            }

        } else {

            // ===== CERRAR =====
            chat.classList.remove("active");

            setTimeout(() => {
                chat.classList.add("hidden");
                animandoChat = false;
            }, 300);

            chatAbierto = false;

            // mostrar estado otra vez
            if (status) status.style.display = "flex";
        }
    });
}

// botón cerrar
if (closeBtn && toggleBtn) {
    closeBtn.addEventListener("click", () => toggleBtn.click());
}