import { updateMultipleValues } from '../lib/functions.js';

export default async function handler(req, res) {
    const { id, points } = req.body;

    try {
        await updateMultipleValues(`App Fecarte/${id}`, "add", { dataPts: points })
        res.json({ message: 'Pontos adicionados com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar os pontos', error });
    }
}