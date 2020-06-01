# Books API

Uma API REST para gestão de usuário e livros de uma biblioteca.

## Ambiente

- NodeJS **v10.16.0** ou mais recente ([Downloads](https://nodejs.org/));
- NPM **v6.10.3** ou mais recente (é instalado juntamente com o NodeJS);
- MySQL **v5.7** ([Downloads](https://dev.mysql.com/downloads/mysql/));
- Yarn **1.22** ([Instalação](https://yarnpkg.com/getting-started/install)).

## Getting Started

- Clone o repositório em sua máquina utlizando o comando `git clone https://github.com/luanglopes/books-api.git` ou [baixe o .zip](https://github.com/luanglopes/books-api/archive/master.zip);
- Na raiz do projeto execute o comando `yarn` para instalar as dependências;
- Crie um arquivo `.env` seguindo a estrutura do arquivo `example.env` e coloque as variáveis do seu ambiente;
  - Lembre-se de criar a base de dados da aplicação no seu banco de dados.
- Execute o comando `yarn typeorm migration:run` para fazer a criação das tabelas no banco.

#### Executando a aplicação

- **Desenvolvimento** Execute o comando `yarn dev:server`;
- **Produção**;
  - Execute o comando `yarn build` para criar um build de produção;
    - O build é gerado na pasta `dist` na raiz do projeto.
  - Execute o comando `yarn start` para executar a build de produção;
  - Recomendo utilizar o [PM2](https://pm2.keymetrics.io/) para execução real em produção.

**Obs.:** A API estará diposnível em `http://localhost:PORT` sendo `PORT` a porta que você definiu no arquivo `.env`.

## Rotas

Dentro da raiz do projeto existe um arquivo chamado `postman_collection.json`, este é um arquivo de coleção do postman com as rotas da API.

[Baixar Postman](https://www.getpostman.com/downloads/)

[Tutoriais do Postman](https://www.getpostman.com/resources/videos-tutorials/)

## Docker

Na raiz do projeto existe um arquivo de configuração do docker que pode ser utlizado para montar uma imagem com NodeJS para executar a aplicação em um container, para isso execute o comando `docker build -t <nome_da_nova_iamgem> .` na raiz do projeto.

# FAQ

### Por que TypeScript?

O TypeScript adiciona interfaces, enums e tipagem estática ao JavaScript, o que ajuda muito na hora de aplicar o DDD, facilitando a definição das "regras" a serem seguidas utilizando interfaces e fazendo com que os serviços (onde é implementada a regra de negócio) possam depender apenas delas e não de implementações diretas.

### Quais melhorias poderiam ser implementadas?

- Implementar contaoner de injeção de dependências (ex.: [tsyringe](https://github.com/microsoft/tsyringe));
- Testes unitário nos serviços (ex.: [Jest](https://jestjs.io/));
- Testes de integração na API (ex.: [Jest](https://jestjs.io/) + [supertest](https://github.com/visionmedia/supertest)).
