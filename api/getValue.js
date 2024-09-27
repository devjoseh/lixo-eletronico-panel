// import { getValue } from '../lib/functions';

// export default async function handler(req, res) {
//     const { id } = req.query;

//     try {
//         const userInfo = await getValue(`App Fecarte/${id}`, null);
//         if (!userInfo) {
//             return res.status(404).json({ message: 'Usuário não encontrado' });
//         }
//         res.json(userInfo);
//     } catch (error) {
//         res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
//     }
// }

// api/getValue.js
import { getValue } from '../lib/functions.js';

export default async function handler(req, res) {
    const { id } = req.query; // Obtem o ID da query

    try {
        // Valida se o ID foi fornecido
        if (!id) {
            return res.status(400).json({ message: 'ID não fornecido' });
        }

        // Tenta buscar o valor no banco de dados
        const userInfo = await getValue(`App Fecarte/${id}`, null);
        if (!userInfo) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(userInfo);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error); // Adicione logs para depuração
        res.status(500).json({ message: 'Erro ao acessar o banco de dados', error });
    }
}
