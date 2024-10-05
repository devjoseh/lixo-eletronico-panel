import { showNotification } from '../utils/notifications.js';
import { createInputs, clearInput } from '../utils/manageInputs.js';
import { returnItens } from '../utils/returnItens.js';

// Cria o componente para adicionar o nome do item e a quantidade
document.getElementById('addComponentBtn').addEventListener('click', function() {
    createInputs(document)
});

document.getElementById('submitBtn').addEventListener('click', async function() {
    const id = document.getElementById('idInput').value;
    const email = document.getElementById("emailInput").value;
    const nome = document.getElementById("nameInput").value;
    const pontos = document.getElementById("pointsInput").value;

    showNotification("Aguarde enquanto os itens são enviados...", "info");

    try {
        // Busca o usuário no banco de dados
        const response = await fetch(`/api/getValue/?path=App Fecarte/${id}`);

        // Cria o objeto com todos os itens
        const components = returnItens(document)

        // Verifica se todos os campos foram preenchidos
        if (id && email && nome && pontos && components.length > 0 && components.every(comp => comp.item && comp.quantity > 0)) {
            // Verifica se o usuário já possui algum item. Se existir, apenas adiciona os novos, se não existir, cria
            const updatedItems = response?.itens ? [...response.itens, ...components] : components;
            
            // Cria o usuário no banco de dados
            const dataInfos = {
                id,
                data: {
                    itens: updatedItems,
                    dataEmail: email, 
                    dataName: nome, 
                    dataPhone: id, 
                    dataPts: Number(pontos)
                }
            }

            await fetch('/api/updateValue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataInfos)
            });

            showNotification("Descartador registrado com sucesso!", "success");
            console.info(`O usuário com id ${id} teve os itens atualizados para:`, updatedItems)

            // Limpa todos os campos
            clearInput(document, [ "idInput", "emailInput", "nameInput", "pointsInput" ])
        } else {
            showNotification("Erro: Certifique-se de que todos os campos estão preenchidos corretamente.", "error");
        }
    } catch (error) {
        showNotification("Erro: " + error.message, "error");
        console.error(error)
    }
});