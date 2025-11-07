# Guia de Migrations para MongoDB

Este documento descreve como estruturar e executar migrations para o banco de dados MongoDB utilizado na API. As instruções consideram a arquitetura atual, baseada no Mongoose, e utilizam o `User Model` como exemplo prático.

## Visão Geral da Integração com o Banco de Dados

- A conexão é inicializada em `src/config/database.js`, que utiliza o `mongoose.connect` apontando para `env.mongoUri`.
- Os modelos, como `src/models/user.model.js`, definem os esquemas usados pelos repositórios.
- A pasta `src/database/migrations/` armazena arquivos de migrations versionados (timestamp + descrição) com funções `up` e `down`.

Manter o padrão acima garante que cada alteração estrutural no banco seja rastreável, revisável e reproduzível em diferentes ambientes.

## Pré-requisitos

1. Ter o MongoDB em execução (localmente ou remoto) e a variável `MONGO_URI` configurada.
2. Confirmar que as dependências estão instaladas (`npm install`).
3. Garantir que o projeto conecta no banco antes de rodar migrations:
   ```bash
   node -e "require('./src/config/database').connectDatabase().then(() => process.exit())"
   ```

## Criando uma Nova Migration

### 1. Definir a Estrutura do Arquivo

- Nomeie o arquivo com o padrão `YYYYMMDDHHmmss-descricao.js`.
- Salve-o em `src/database/migrations/`.
- Use o template abaixo:
  ```javascript
  const mongoose = require('mongoose');

  module.exports = {
    up: async () => {
      // lógica para aplicar a migration
    },
    down: async () => {
      // lógica para desfazer a migration
    },
  };
  ```

### 2. Exemplo: Migration para a Collection `users`

Suponha que precisamos alinhar a collection com o `User Model` (`src/models/user.model.js`). A migration pode validar o esquema e aplicar índices:

```javascript
const mongoose = require('mongoose');

module.exports = {
  up: async () => {
    const { db } = mongoose.connection;

    const collectionExists = await db.listCollections({ name: 'users' }).hasNext();
    if (!collectionExists) {
      await db.createCollection('users', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'password'],
            properties: {
              name: { bsonType: 'string', minLength: 3 },
              email: { bsonType: 'string', pattern: '^.+@.+\\..+$' },
              password: { bsonType: 'string' },
              avatarUrl: { bsonType: ['string', 'null'] },
              createdAt: { bsonType: 'date' },
              updatedAt: { bsonType: 'date' },
            },
            additionalProperties: false,
          },
        },
      });
    }

    await db.collection('users').createIndex({ email: 1 }, { unique: true, name: 'users_email_unique' });
  },

  down: async () => {
    const { db } = mongoose.connection;
    const collectionExists = await db.listCollections({ name: 'users' }).hasNext();

    if (collectionExists) {
      await db.collection('users').dropIndex('users_email_unique').catch((error) => {
        if (error.codeName !== 'IndexNotFound') {
          throw error;
        }
      });
      await db.dropCollection('users');
    }
  },
};
```

### 3. Aplicar a Migration

1. Conecte ao banco usando a função já existente:
   ```javascript
   const { connectDatabase } = require('../config/database');
   const migration = require('../database/migrations/20240201000000-create-users-table');

   (async () => {
     await connectDatabase();
     await migration.up();
     process.exit(0);
   })().catch((error) => {
     console.error(error);
     process.exit(1);
   });
   ```
   > Salve este snippet como `scripts/run-migration.js` ou execute-o via Node REPL conforme necessário.

2. Para desfazer, substitua `migration.up()` por `migration.down()`.

3. Automatize com scripts NPM, se desejar:
   ```json
   {
     "scripts": {
       "migration:up": "node scripts/run-migration.js",
       "migration:down": "node scripts/run-migration.js --down"
     }
   }
   ```
   Adapte o `run-migration.js` para ler argumentos da linha de comando e decidir qual função executar.

## Boas Práticas

- **Idempotência**: escreva migrations que possam rodar mais de uma vez sem corromper dados (verificações antes de criar collections ou índices).
- **Rollback**: implemente `down` com a mesma atenção que `up` para possibilitar reversões seguras.
- **Versionamento**: nunca edite migrations aplicadas em produção; crie novas migrations para mudanças adicionais.
- **Revisões**: utilize code review para garantir que migrations complexas sejam validadas por outra pessoa da equipe.

Seguindo os passos acima, as alterações na estrutura do MongoDB ficarão alinhadas com os modelos da aplicação, garantindo rastreabilidade e consistência em todos os ambientes.
