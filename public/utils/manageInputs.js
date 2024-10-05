// Adiciona um novo input de item
export function createInputs(document) {
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
}

// Limpa os inputs de itens
export function clearInput(document, inputs) {
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if(element) element.value = "";
    })

    const componentsContainer = document.getElementById('componentsContainer');
    const componentInputs = componentsContainer.querySelectorAll('.component');

    componentInputs.forEach(component => {
        component.querySelector('.componentName').value = '';
        component.querySelector('.componentQuantity').value = '';
    });

    componentsContainer.innerHTML = '';

    createInputs(document)
}