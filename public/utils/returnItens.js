// Pega todos os itens que foram adicionados e retorna apenas o nome e a quantidade
export function returnItens(document) {
    return Array.from(document.querySelectorAll('.component')).map(component => {
        const name = component.querySelector('.componentName').value;
        const quantity = component.querySelector('.componentQuantity').value;
        return { item: name, quantity: Number(quantity) };
    });
}