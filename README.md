# Books API

Uma API REST para gestão de usuário e livros de uma biblioteca.

## Ambiente

- NodeJS **v12.18.1** ou mais recente ([Downloads](https://nodejs.org/));
- NPM **v6.14.6** ou mais recente (é instalado juntamente com o NodeJS);
- MySQL **v5.7** ([Downloads](https://dev.mysql.com/downloads/mysql/));
- Yarn **1.22.4** ou mais recente ([Instalação](https://yarnpkg.com/getting-started/install)).

## Getting Started

- Clone o repositório em sua máquina utlizando o comando `git clone https://github.com/luanglopes/books-api.git` ou [baixe o .zip](https://github.com/luanglopes/books-api/archive/master.zip);
- Na raiz do projeto execute o comando `yarn` para instalar as dependências;
- Crie um arquivo `.env` seguindo a estrutura do arquivo `.env.example` e coloque as variáveis do seu ambiente;
- Crie um arquivo `ormconfig.json` seguindo a estrutura do arquivo `ormconfig.example.json` e coloque as variáveis do seu ambiente;
  - Lembre-se de criar a base de dados da aplicação no seu banco de dados.
  - Esse é um arquivo de configuração do TypeORM, [mais detalhes](https://typeorm.io/#/using-ormconfig).
- Execute o comando `yarn typeorm migration:run` para fazer a criação das tabelas no banco.

#### Executando a aplicação

- **Desenvolvimento** Execute o comando `yarn dev`;
- **Produção**;
  - Execute o comando `yarn build` para criar um build de produção;
    - O build é gerado na pasta `dist` na raiz do projeto.
  - Execute o comando `yarn start` para executar a build de produção;
  - Recomendo utilizar o [PM2](https://pm2.keymetrics.io/) para execução real em produção.

**Obs.:** A API estará diposnível em `http://localhost:PORT` sendo `PORT` a porta que você definiu no arquivo `.env`.

## Rotas

Dentro da raiz do projeto existe um arquivo chamado `postman_collection.json`, este é um arquivo de coleção do postman com as rotas da API.

[Baixar Postman](https://www.postman.com/downloads/)

[Tutoriais do Postman](https://learning.postman.com/)

## Docker

### Dev

O arquivo `docker-compose.yml` na raiz pode ser utilizado para executar a aplicação e o banco de dados dentro de conatiners do docker, utilize o comando `yarn dev:docker` para executar o subir de desevolvimento, esse comando utiliza o docker-compose tenha certeza que ele está instalado. O dockerfile utilizado para esse ambiente é o `DcokerfileDev`.

### Prod

Na raiz do projeto existe um arquivo de configuração do docker que pode ser utlizado para montar uma imagem com NodeJS para executar a aplicação em um container, para isso execute o comando `docker build -t <nome_da_nova_iamgem> .` na raiz do projeto.

## FAQ

### Por que TypeScript?

O TypeScript adiciona interfaces, enums e tipagem estática ao JavaScript, o que ajuda muito na hora de aplicar o DDD e princípios S.O.L.I.D, facilitando a definição das "regras" a serem seguidas utilizando interfaces, desta forma é possível fazer com que os serviços (onde é implementada a regra de negócio) possam depender apenas de interfaces e não de implementações diretas.

### Quais melhorias poderiam ser implementadas?

- [x] Implementar container de injeção de dependências (ex.: [tsyringe](https://github.com/microsoft/tsyringe));
- [x] Testes unitários nos serviços (ex.: [Jest](https://jestjs.io/));
- [ ] Testes de integração na API (ex.: [Jest](https://jestjs.io/) + [supertest](https://github.com/visionmedia/supertest)).
- [x] Validação de query params, route params e body das requisições (ex.: [Joi](https://github.com/hapijs/joi), [celebrate](https://github.com/arb/celebrate))
- [ ] Implementar serializers para garantir contratos da API e não enviar campos sensíveis para o cliente (ex.: ??)
