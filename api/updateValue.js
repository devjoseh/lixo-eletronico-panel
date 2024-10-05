import { updateValue } from '../lib/functions.js';

export default async function handler(req, res) {
    const { id, data } = req.body;

    try {
        const path = `App Fecarte/${id}`
        
        await updateValue(path, data);
        console.info(`Atualização realizada com sucesso em ${path}, dados:`, data)
        res.json({ message: 'Atualização realizada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar atualizar uma informação', error });
    }
}
