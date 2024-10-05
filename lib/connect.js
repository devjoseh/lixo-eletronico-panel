import { initializeApp } from "firebase/app";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
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