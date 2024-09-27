document.getElementById('refreshBtn').addEventListener('click', async function() {
    showNotification("Aguarde enquanto os itens são enviados...", "info");

    try {
        const response = await fetch(`/api/getValue/App Fecarte`);
        console.log(response)
    } catch (error) {
        showNotification("Erro: " + error.message, "error");
        console.error(error)
    }
});