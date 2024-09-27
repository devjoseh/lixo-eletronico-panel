import { getValue } from '../lib/functions.js';

export default async function handler(req, res) {
    const { path } = req.query;

    try {
        if (!path) {
            return res.status(400).json({ message: 'Caminho não especificado' });
        }
        console.log("Caminho solicitado", path)

        const userInfo = await getValue(`${path}`, null);
        if (!userInfo) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(userInfo);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
    }
}
