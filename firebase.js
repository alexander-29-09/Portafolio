import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDGvJwiCPHyq7OiFSJP6NzlBnvX6UuwYrI",
    authDomain: "portafolio-59e19.firebaseapp.com",
    databaseURL: "https://portafolio-59e19-default-rtdb.firebaseio.com",
    projectId: "portafolio-59e19",
    storageBucket: "portafolio-59e19.firebasestorage.app",
    messagingSenderId: "565485261218",
    appId: "1:565485261218:web:0f0141299259576368a2fb",
    measurementId: "G-7KKHB11VF9"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Referencia al documento
const contadorRef = doc(db, "estadisticas", "visitas");


// ========================================
// MOSTRAR CONTADOR
// ========================================

async function mostrarContador() {

    try {

        const snap = await getDoc(contadorRef);

        if (!snap.exists()) {

            console.log("El documento todavía no existe.");

            document.getElementById("contador-visitas").textContent = "0";

            return;
        }

        const total = snap.data().total || 0;

        const contador = document.getElementById("contador-visitas");

        if (contador) {

            contador.textContent = Number(total).toLocaleString();

        }

    } catch (error) {

        console.error("Error al obtener el contador:", error);

    }

}


// ========================================
// CONTAR VISITA
// ========================================

async function contarVisita() {

    try {

        const elemento = document.getElementById("contador-visitas");

        if (!elemento) {

            console.error(
                "No se encontró el elemento #contador-visitas"
            );

            return;
        }


        const ultimaVisita =
            localStorage.getItem("ultima_visita");

        const ahora = Date.now();

        const unDia =
            24 * 60 * 60 * 1000;


        // Si ya visitó el sitio durante las últimas 24 horas
        if (
            ultimaVisita &&
            (ahora - Number(ultimaVisita) < unDia)
        ) {

            console.log(
                "Visita ya registrada durante las últimas 24 horas."
            );

            await mostrarContador();

            return;
        }


        // Obtener documento
        const snap = await getDoc(contadorRef);


        // Si no existe, crearlo
        if (!snap.exists()) {

            await setDoc(contadorRef, {

                total: 1

            });

            console.log("Documento creado. Visitas: 1");

        }

        // Si existe, incrementar
        else {

            await updateDoc(contadorRef, {

                total: increment(1)

            });

            console.log("Visita incrementada.");

        }


        // Guardar fecha de visita
        localStorage.setItem(
            "ultima_visita",
            ahora
        );


        // Mostrar contador actualizado
        await mostrarContador();


    } catch (error) {

        console.error(
            "ERROR DEL CONTADOR FIREBASE:",
            error
        );

    }

}



contarVisita();