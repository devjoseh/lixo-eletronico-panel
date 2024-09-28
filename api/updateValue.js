import { getValue, updateValue } from '../lib/functions.js';

export default async function handler(req, res) {
    const { id, data } = req.body;

    try {
        const existingData = await getValue(`App Fecarte/${id}`, null);
        const updatedItems = existingData?.itens ? [...existingData.itens, ...data] : data;

        await updateValue(`App Fecarte/${id}`, { itens: updatedItems });
        res.json({ message: 'Itens adicionados com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar os itens', error });
    }
}