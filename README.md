# Books API

Uma API REST para gestão de usuário e livros de uma biblioteca.

## Ambiente

- NodeJS **v10.16.0** ou mais recente ([Downloads](https://nodejs.org/));
- NPM **v6.10.3** ou mais recente (é instalado juntamente com o NodeJS);
- MySQL **v5.7** ([Downloads](https://dev.mysql.com/downloads/mysql/));

## Getting Started

- Clone o repositório em sua máquina utlizando o comando `git clone https://github.com/luanglopes/books-api.git` ou [baixe o .zip](https://github.com/luanglopes/books-api/archive/master.zip);
- Na raiz do projeto execute o comando `npm i` para instalar as dependências;
- Crie um arquivo `.env` seguindo a estrutura do arquivo `example.env` e coloque as variáveis do seu ambiente;
  - Lembre-se de criar a base de dados da aplicação no seu banco de dados
- Execute o comando `npx knex migrate:latest` para fazer a criação das tabelas no banco
- Execute o comando `npx knex seed:run` para criar os registros inicias;
  - Esse comando vai criar um usuário administrador.

### Usuário Administrador:

Ao executar todos os passos da seção Getting Started será criado o seguinte usuário:

- **Email:** admin@example.com
- **Senha:** 123456

#### Executando a aplicação

- **Desenvolvimento** Execute o comando `npm run dev`;
- **Produção** Execute o comando `npm start`;
  - Recomendo utilizar o [PM2](https://pm2.keymetrics.io/) para execução real em produção.

**Obs.:** A API estará diposnível em `http://localhost:PORT` sendo `PORT` a porta que você definiu no arquivo `.env`

## Rotas

Dentro da raiz do projeto existe um arquivo chamado `postman_collection.json`, este é um arquivo de coleção do postman com as rotas da API.

[Baixar Postman](https://www.getpostman.com/downloads/)

[Tutoriais do Postman](https://www.getpostman.com/resources/videos-tutorials/)
