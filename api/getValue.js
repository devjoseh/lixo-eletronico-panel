import { getValue } from '../lib/functions.js';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        if (!id) {
            return res.status(400).json({ message: 'ID não fornecido' });
        }

        const userInfo = await getValue(`App Fecarte/${id}`, null);
        if (!userInfo) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(userInfo);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
    }
}
