# Guia de Configuração do MongoDB

Este documento descreve como configurar e utilizar o MongoDB no contexto da aplicação **starter-nodejs**, incluindo a instalação de ferramentas, conexão usando o MongoDB Compass e boas práticas para ambientes de desenvolvimento e produção.

## 1. Visão geral da integração no projeto

A aplicação utiliza o [Mongoose](https://mongoosejs.com/) como ODM para conectar-se ao MongoDB.

- O arquivo [`src/config/env.js`](../src/config/env.js) carrega variáveis de ambiente via `dotenv` e define `MONGO_URI`.
- [`src/config/database.js`](../src/config/database.js) importa `mongoose` e executa `mongoose.connect(env.mongoUri, { autoIndex: true })` ao iniciar o servidor.
- Modelos são definidos em [`src/models`](../src/models), por exemplo [`user.model.js`](../src/models/user.model.js), e repositórios em [`src/repositories`](../src/repositories).

Para que a aplicação suba corretamente, um servidor MongoDB precisa estar em execução e acessível pelo URI configurado.

## 2. Pré-requisitos

1. **Node.js e npm** instalados (versão 18 ou superior recomendada).
2. **Docker** (opcional, mas recomendado para levantar um MongoDB local rapidamente).
3. **MongoDB Compass** instalado para gestão visual do banco de dados.

### Instalando o MongoDB Compass

1. Acesse <https://www.mongodb.com/products/compass>.
2. Baixe a versão correspondente ao seu sistema operacional.
3. Execute o instalador e finalize o processo com as opções padrão.

## 3. Iniciando um servidor MongoDB

### Opção A: usando Docker (recomendado para desenvolvimento)

1. Certifique-se de que o Docker está em execução.
2. No diretório do projeto, execute:

   ```bash
   docker-compose up -d mongo
   ```

   Isso criará um contêiner MongoDB exposto em `mongodb://localhost:27017`.

3. Para derrubar o contêiner ao final, use `docker-compose down`.

### Opção B: instalando o MongoDB localmente

1. Acesse <https://www.mongodb.com/try/download/community>.
2. Baixe e instale o MongoDB Community Server seguindo o guia do seu sistema.
3. Inicie o serviço MongoDB (por exemplo, `brew services start mongodb-community` no macOS ou `sudo systemctl start mongod` no Linux).

## 4. Configurando a aplicação

1. Crie um arquivo `.env` na raiz do projeto (caso ainda não exista) com o conteúdo:

   ```env
   MONGO_URI=mongodb://localhost:27017/starter-nodejs
   JWT_SECRET=sua-chave-secreta
   JWT_EXPIRES_IN=1h
   ```

2. Garanta que o servidor MongoDB esteja em execução.
3. Inicie a aplicação:

   ```bash
   npm install
   npm run dev
   ```

4. A aplicação se conectará ao banco e criará a base `starter-nodejs` automaticamente ao persistir dados.

## 5. Conectando com o MongoDB Compass

1. Abra o MongoDB Compass.
2. Clique em **New Connection**.
3. Em **Connection String**, insira o URI utilizado pela aplicação, por exemplo:

   ```
   mongodb://localhost:27017/starter-nodejs
   ```

4. Clique em **Connect**. Se estiver usando Docker, certifique-se de que o contêiner está rodando.
5. Após conectar, você poderá visualizar os bancos de dados e coleções. As coleções serão criadas automaticamente quando a aplicação gravar dados (por exemplo, a coleção `users`).

### Ajustando opções avançadas (opcional)

- Para ambientes seguros, utilize conexões com autenticação (ex.: `mongodb://usuario:senha@host:27017/db`).
- Em `Advanced Connection Options`, você pode configurar SSL, replica sets, entre outros recursos conforme necessário.

## 6. Boas práticas

- **Variáveis de ambiente:** Nunca commite URIs com usuários e senhas. Use `.env` ou gerenciadores de segredos.
- **Monitoramento:** Utilize logs e ferramentas como o Compass ou o Atlas para monitorar performance e índices.
- **Índices:** Com `autoIndex: true`, índices definidos nos schemas são criados automaticamente. Em produção, considere gerenciar índices manualmente para evitar overhead em runtime.
- **Backups:** Para ambientes críticos, configure rotinas de backup (ex.: `mongodump`/`mongorestore` ou snapshots de volume se estiver em containers).
- **Segurança:** Em produção, habilite autenticação, utilize redes privadas/VPCs e considere o MongoDB Atlas para hospedagem gerenciada.

## 7. Resolução de problemas

| Problema | Possível causa | Como resolver |
| --- | --- | --- |
| `MongoServerSelectionError` ao iniciar a aplicação | Servidor MongoDB indisponível ou URI incorreto | Verifique se o contêiner/serviço está rodando e se o `MONGO_URI` está correto. |
| Compass não conecta | Porta bloqueada, URI incorreto ou autenticação exigida | Confirme firewall/porta 27017, revise URI e credenciais. |
| Coleções não aparecem | Nenhum dado gravado ainda | Insira dados via API ou Compass para que a coleção seja criada. |

## 8. Próximos passos

- Automatize o provisionamento do banco usando scripts ou infraestrutura como código.
- Configure pipelines de CI/CD para executar testes que dependem do MongoDB (usando contêineres efêmeros).
- Avalie o uso de ambientes gerenciados como MongoDB Atlas para produção.

---

Seguindo este guia, você terá o MongoDB configurado e integrado com a aplicação **starter-nodejs**, pronto para desenvolvimento e testes.
