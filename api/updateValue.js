import { getValue, updateValue } from '../lib/functions.js';

export default async function handler(req, res) {
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
}
