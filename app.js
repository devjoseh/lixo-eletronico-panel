import express from "express";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const apiPath = path.join(__dirname, 'api');
fs.readdirSync(apiPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = `/api/${file.replace('.js', '')}`;
        const modulePath = `./api/${file}`;
        
        import(modulePath).then((module) => {
            app.use(route, module.default);
        }).catch((err) => {
            console.error(`Erro ao carregar o módulo ${file}:`, err);
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});