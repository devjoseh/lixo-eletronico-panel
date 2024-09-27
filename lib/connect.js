import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBJMgEuHvSYZPJJ0IPlpozMG1spMEP5j4s",
    authDomain: "e-cycle-9a41a.firebaseapp.com",
    databaseURL: "https://e-cycle-9a41a-default-rtdb.firebaseio.com",
    projectId: "e-cycle-9a41a",
    storageBucket: "e-cycle-9a41a.appspot.com",
    messagingSenderId: "537233440596",
    appId: "1:537233440596:web:281c7c566546b5dc9052c1",
    measurementId: "G-CS3Q1K2V8X"
};

try {
    initializeApp(firebaseConfig);
    console.info(`O Banco de Dados foi conectado com sucesso!`);
} catch (error) {
    console.error(`Não foi possível se conectar ao Banco de Dados`);
    console.error(error);
}

import { getDatabase } from "firebase/database";
const db = getDatabase();

export default db;