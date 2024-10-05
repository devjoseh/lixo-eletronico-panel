import { showNotification } from '../utils/notifications.js';
import { createInputs, clearInput } from '../utils/manageInputs.js';
import { returnItens } from '../utils/returnItens.js';

document.getElementById('addComponentBtn').addEventListener('click', function() {
    createInputs(document)
});

document.getElementById('submitBtn').addEventListener('click', async function() {
    const id = document.getElementById('idInput').value;
    const points = document.getElementById('pointsInput').value;

    showNotification("Aguarde enquanto os itens são registrados...", "info");

    try {
        // Verifica se o usuário existe no bd. Se não existir, retorna erro
        const response = await fetch(`/api/getValue/?path=App Fecarte/${id}`);
        if (!response.ok) throw new Error('Usuário não encontrado');

        // Cria o objeto com todos os itens
        const components = returnItens(document)

        // Verifica se todos os campos foram preenchidos
        if (id && !points && components.length > 0 && components.every(comp => comp.item && comp.quantity > 0)) {
            // Verifica se o usuário já possui algum item. Se existir, apenas adiciona os novos, se não existir, cria
            const updatedItems = response?.itens ? [...response.itens, ...components] : components;

            const result = { 
                id,
                data: { itens: updatedItems }
            };

            // Faz a atualização dos itens
            await fetch('/api/updateValue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result)
            });

            showNotification("Dados enviados com sucesso!", "success");

            // Limpa todos os campos
            clearInput(document, [ "idInput", "pointsInput" ])
        } else if (id && points) {
            const result = { 
                id,
                type: "add",
                data: { dataPts: Number(points) }
            };

            await fetch('/api/updateMultiValues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result)
            });

            showNotification("Pontos adicionados com sucesso!", "success");

            // Limpa todos os campos
            clearInput(document, [ "idInput", "pointsInput" ])
        } else {
            showNotification("Erro: Certifique-se de que todos os campos estão preenchidos corretamente.", "error");
        }
    } catch (error) {
        showNotification("Erro: " + error.message, "error");
        console.error(error)
    }
});