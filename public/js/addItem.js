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

    showNotification("Aguarde enquanto os itens são registrados...", "info");

    try {
        // Verifica se o usuário existe no bd. Se não existir, retorna erro
        const response = await fetch(`/api/getValue/?path=App Fecarte/${id}`);
        if (!response.ok) throw new Error('Usuário não encontrado');

        // Cria o objeto com todos os itens
        const components = Array.from(document.querySelectorAll('.component')).map(component => {
            const name = component.querySelector('.componentName').value;
            const quantity = component.querySelector('.componentQuantity').value;
            return { item: name, quantity: Number(quantity) };
        });

        // Verifica se todos os campos foram preenchidos
        if (id && components.length > 0 && components.every(comp => comp.item && comp.quantity > 0)) {
            const result = { id, data: components };

            // Faz a atualização dos itens
            await fetch('/api/updateValue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            });

            showNotification("Dados enviados com sucesso!", "success");

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