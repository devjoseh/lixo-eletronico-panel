import { showNotification } from './notifications.js';

document.getElementById('addComponentBtn').addEventListener('click', function() {
    const componentsContainer = document.getElementById('componentsContainer');
    const newComponent = document.createElement('div');
    newComponent.classList.add('component');
    newComponent.innerHTML = `
        <input type="text" placeholder="Nome do Componente" class="componentName" required>
        <input type="number" placeholder="Quantidade" class="componentQuantity" required>
        <button class="removeBtn">Remover</button>
    `;
    componentsContainer.appendChild(newComponent);

    newComponent.querySelector('.removeBtn').addEventListener('click', function() {
        componentsContainer.removeChild(newComponent);
    });
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
        const components = Array.from(document.querySelectorAll('.component')).map(component => {
            const name = component.querySelector('.componentName').value;
            const quantity = component.querySelector('.componentQuantity').value;
            return { item: name, quantity: Number(quantity) };
        });

        // Verifica se todos os campos foram preenchidos
        if (id && email && nome && pontos && components.length > 0 && components.every(comp => comp.item && comp.quantity > 0)) {
            // Cria o usuário no banco de dados
            const dataInfos = { id, dataEmail: email, dataName: nome, dataPhone: id, dataPts: pontos }
            await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataInfos)
            });

            // Verifica se o usuário já possui algum item. Se existir, apenas adiciona os novos, se não existir, cria
            const updatedItems = response?.itens ? [...response.itens, ...components] : components;
            const result = { id, data: updatedItems };

            // Atualiza/cria os itens do usuario
            await fetch('/api/updateValue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            });

            showNotification("Registrador criado com sucesso!", "success");

            // Limpa todos os campos
            document.getElementById('idInput').value = '';
            const componentsContainer = document.getElementById('componentsContainer');
            const componentInputs = componentsContainer.querySelectorAll('.component');

            componentInputs.forEach(component => {
                component.querySelector('.componentName').value = '';
                component.querySelector('.componentQuantity').value = '';
            });

            componentsContainer.innerHTML = '';
        } else {
            showNotification("Erro: Certifique-se de que todos os campos estão preenchidos corretamente.", "error");
        }
    } catch (error) {
        showNotification("Erro: " + error.message, "error");
        console.error(error)
    }
});