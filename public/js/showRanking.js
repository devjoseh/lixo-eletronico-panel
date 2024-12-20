import { showNotification } from '../utils/notifications.js';

async function loadRanking() {
    showNotification("Carregando ranking...", "info");

    try {
        // Puxa as informações de todos os usuários do banco de dados
        const response = await fetch(`/api/getRanking/`);
        const data = await response.json();

        // Ordena da maior quantidade de pontos para o menor
        const sortedRanking = Object.values(data).sort((a, b) => b.dataPts - a.dataPts);

        // Exibe o ranking
        const rankingContainer = document.createElement('div');
        rankingContainer.classList.add('ranking-container');

        const rankingHeader = document.createElement('div');
        rankingHeader.className = 'ranking-header';
        const headers = ['Posição', 'Nome', 'Pontos'];

        headers.forEach(header => {
            const headerItem = document.createElement('div');
            headerItem.className = 'header-item';
            headerItem.textContent = header;
            rankingHeader.appendChild(headerItem);
        });
        rankingContainer.appendChild(rankingHeader);

        sortedRanking.forEach((user, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.classList.add('ranking-item');

            const position = document.createElement('div');
            position.className = 'position';
            position.textContent = `#${index + 1}`;

            const name = document.createElement('div');
            name.className = 'name';
            name.textContent = user.dataName;

            const points = document.createElement('div');
            points.className = 'points';
            points.textContent = `${user.dataPts} Pontos`;

            rankingItem.appendChild(position);
            rankingItem.appendChild(name);
            rankingItem.appendChild(points);
            rankingContainer.appendChild(rankingItem);
        });

        // Adicionando o ranking ao container
        const container = document.querySelector('.container');
        const existingRanking = document.querySelector('.ranking-container');
        if (existingRanking) existingRanking.remove();  // Remove o ranking anterior
        container.appendChild(rankingContainer);

        showNotification("Ranking atualizado com sucesso!", "success");
    } catch (error) {
        showNotification("Erro: " + error.message, "error");
        console.error(error);
    }
}

// Carrega o ranking toda vez que a página é carregada
document.addEventListener('DOMContentLoaded', loadRanking);
document.getElementById('refreshBtn').addEventListener('click', loadRanking);