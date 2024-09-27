import { getValue } from '../lib/functions';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const userInfo = await getValue(`App Fecarte/${id}`, null);
        if (!userInfo) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
    }
}