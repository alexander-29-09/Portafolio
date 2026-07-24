


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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const contadorRef = doc(db, "estadisticas", "visitas");

async function contarVisita() {

    const ultimaVisita = localStorage.getItem("ultima_visita");

    const ahora = Date.now();

    const unDia = 24 * 60 * 60 * 1000;

    if (ultimaVisita && (ahora - Number(ultimaVisita) < unDia)) {

        mostrarContador();

        return;
    }

    const snap = await getDoc(contadorRef);

    if (!snap.exists()) {

        await setDoc(contadorRef, {

            total: 1

        });

    } else {

        await updateDoc(contadorRef, {

            total: increment(1)

        });

    }

    localStorage.setItem("ultima_visita", ahora);

    mostrarContador();

}
async function mostrarContador() {

    const snap = await getDoc(contadorRef);

    if (!snap.exists()) return;

    const total = snap.data().total;

    document.getElementById("contador-visitas").innerHTML =
        total.toLocaleString();

}

contarVisita();