import { updateValue } from '../lib/functions.js';

export default async function handler(req, res) {
    const { id, dataEmail, dataName, dataPhone, dataPts } = req.body;

    try {
        await updateValue(`App Fecarte/${id}`, { dataEmail, dataName, dataPhone, dataPts });
        res.json({ message: 'Descartador registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar os itens', error });
    }
}