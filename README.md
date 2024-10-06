## 🧑  Autor

Quer me mandar uma mensagem ou dar uma espiada nas minhas redes sociais?

[![instagram](https://img.shields.io/badge/instagram-A425E4?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/dev_joseh/) [![youtube](https://img.shields.io/badge/youtube-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCHxmaCQRQcJ1Y1fWDvGPktQ) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/josé-hernanes-b4b155249/) 

## 🔧 Funções

- Registrar usuário no banco de dados
- Adicionar itens
- Adicionar pontos
- Ranking das pessoas com mais pontos

## 💻 Pré-requisitos

Antes de instalar, verifique se sua máquina atende aos seguintes requisitos:

* [Nodejs](https://nodejs.org/en/) v16.9.0 ou superior

# 🔧 Configurando o projeto

### 1. Baixe o repositório aqui no Github ou clone pelo terminal

```bash
git clone https://github.com/devjoseh/lixo_eletronico_panel.git
```

### 2. Instalando as dependencias

```bash
npm install
```

### 3. Configurando o banco de dados

Encontre o arquivo `.env.example` na raiz do projeto e renomeie para `.env`
Nesse arquivo é onde deve-se configurar o banco de dados. Segue o tutorial:

1. [Clique aqui](https://firebase.google.com/docs?hl=pt&authuser=0) para acessar o firebase
2. No canto superior direito, clique em `ir para o console`
3. Clique no botão de `adicionar projeto`
4. Coloque o nome da sua loja ou qualquer outro
5. Desative a opção `Ativar o Google Analytics neste projeto`
6. Clique em `criar projeto`
7. No menu lateral esquerdo, clique em `criação`
8. Selecione a opção `Realtime Database`
9. Clique em `criar banco de dados`
10. Verifique se está selecionado `Estados Unidos` e clique em `proxima`
11. Selecione `iniciar no modo bloqueado` e clique em `ativar`
12. Em baixo de `Realtime Database`, clique em `Regras`
13. Altere: `".read"` de `false` para `true`. Faça o mesmo com `".write"`
14. Clique em publicar
15. Após isso, clique em `Visão geral do projeto` no lado superior esquerdo
16. Clique no botão que se parece com: `</>`
17. Em apelido do app, coloque qualquer nome e não marque a caixa `Configure também...`
18. Clique em registrar app
19. Na opção `Usar o npm`
20. Copie esse código:

```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
```

21. Volte para a pasta do projeto e no arquivo `.env` substituia cada campo para seu respectivo dado
22. Pronto, banco de dados configurado :D

### 4. Rodando o site na máquina local

```bash
node app.js
```

> [!NOTE]
> Observação
> Você também pode hospedar este projeto no Vercel totalmente de graça <br>

## ⛔ Dúvidas / Sugestões / Problemas

Caso tenha alguma dúvida, sugestão ou tenha encontrado algum problema, por favor abra um **[issue](https://github.com/devjoseh/lixo_eletronico_panel/issues/new)** e aguarde por uma resposta.

## 🙌 Contribuições

Contribuições são muito bem vindas! Abra um em **[pull request](https://github.com/devjoseh/lixo_eletronico_panel/pulls)**.

## 📝 Licença

Este projeto está licenciado. Veja mais [detalhes](LICENSE)