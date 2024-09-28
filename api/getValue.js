import { getValue } from '../lib/functions.js';

export default async function handler(req, res) {
    const { path } = req.query;

    try {
        if (!path) {
            return res.status(400).json({ message: 'Caminho não especificado' });
        }

        const data = await getValue(`${path}`, null);
        if (!data) {
            return res.status(404).json({ message: 'Informação não encontrada' });
        }

        res.json(data);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
    }
}
