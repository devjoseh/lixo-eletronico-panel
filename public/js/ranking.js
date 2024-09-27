document.getElementById('refreshBtn').addEventListener('click', async function() {
    showNotification("Aguarde enquanto os itens são enviados...", "info");

    try {
        const response = await fetch(`/api/getRanking`);
        console.log("response ranking")
        console.log(response)
        
        const data = await response.json();
        console.log("data ranking")
        console.log(data);
    } catch (error) {
        showNotification("Erro: " + error.message, "error");
        console.error(error)
    }
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 500);
    }, 3000);
}