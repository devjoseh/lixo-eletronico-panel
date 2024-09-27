import express from "express";
const app = express();
const port = process.env.PORT || 3000;

import { getValue, updateValue } from './public/database/functions.js';

app.use(express.static('public'));
app.use(express.json());

// Buscar Valor
app.get('/api/getValue/:id', async (req, res) => {
    try {
        const userInfo = await getValue(`App Fecarte/${req.params.id}`, null);
        if (!userInfo) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
    }
});

// Atualizar Valor
app.post('/api/updateValue', async (req, res) => {
    const { path, data } = req.body;

    try {
        const existingData = await getValue(`${path}`, null);
        
        let updatedItems;
        if (existingData && existingData.itens) {
            updatedItems = [...existingData.itens, ...data];
        } else {
            updatedItems = data;
        }
        
        await updateValue(`${path}`, { itens: updatedItems });
        res.json({ message: 'Itens adicionados com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar os itens', error });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});