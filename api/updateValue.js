import { getValue, updateValue } from '../lib/functions.js';

export default async function handler(req, res) {
    console.log('Request Body:', req.body); // Adicione esta linha
    const { id, data } = req.body;

    try {
        const existingData = await getValue(`App Fecarte/${id}`, null);

        let updatedItems;
        if (existingData && existingData.itens) {
            updatedItems = [...existingData.itens, ...data];
        } else {
            updatedItems = data;
        }

        await updateValue(`App Fecarte/${id}`, { itens: updatedItems });
        res.json({ message: 'Itens adicionados com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar os itens', error });
    }
}

// import { getValue, updateValue } from '../lib/functions';

// export default async function handler(req, res) {
//     console.log('Request Body:', req.body); // Adicione esta linha
//     const { path, data } = req.body;

//     try {
//         const existingData = await getValue(`${path}`, null);
//         const updatedItems = existingData?.itens ? [...existingData.itens, ...data] : data;

//         await updateValue(`${path}`, { itens: updatedItems });
//         res.json({ message: 'Itens adicionados com sucesso!' });
//     } catch (error) {
//         console.error('Erro ao atualizar os itens:', error); // Log de erro
//         res.status(500).json({ message: 'Erro ao adicionar os itens', error });
//     }
// }
