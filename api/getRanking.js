import { getValue } from '../lib/functions.js';

export default async function handler(req, res) {
    try {
        const userInfo = await getValue(`App Fecarte`, null);
        res.json(userInfo);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
    }
}
