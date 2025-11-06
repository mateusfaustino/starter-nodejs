# Starter Node.js API

API REST escalável seguindo arquitetura MVC organizada em camadas.

## Requisitos

- Node.js >= 18
- npm >= 9
- Docker (opcional, para execução containerizada)

## Instalação

```bash
npm install
```

## Execução em desenvolvimento

```bash
npm run dev
```

## Execução em produção

```bash
npm start
```

A API ficará disponível em `http://localhost:3000` por padrão.

## Estrutura do Projeto

A estrutura segue as diretrizes descritas em `documentation/estrutura-projeto.md`:

```
src/
├── app.js
├── config/
│   ├── database.js
│   └── env.js
├── controllers/
│   └── users.controller.js
├── database/
│   └── migrations/
│       └── 20240201000000-create-users-table.js
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   └── user.model.js
├── repositories/
│   └── users.repository.js
├── routes/
│   ├── index.js
│   └── v1/
│       └── users.routes.js
├── services/
│   └── users.service.js
├── utils/
│   ├── errors.js
│   ├── logger.js
│   └── password.js
└── validators/
    └── users.validator.js
```

## Endpoints Principais

- `GET /api/v1/users` — Lista usuários cadastrados.
- `POST /api/v1/users` — Cria um novo usuário.
- `POST /api/v1/users/login` — Autentica um usuário e retorna um token JWT.

## Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e ajuste os valores conforme o ambiente.

```bash
cp .env.example .env
```

## Testes

Os diretórios `tests/unit` e `tests/integration` estão prontos para receber testes com a ferramenta de sua preferência (Jest, Mocha, etc.).

## Docker

Para executar o projeto utilizando Docker e Docker Compose:

```bash
docker-compose up --build
```

A aplicação ficará disponível em `http://localhost:3000` e o MongoDB em `mongodb://localhost:27017`.

Para parar os containers:

```bash
docker-compose down
```
