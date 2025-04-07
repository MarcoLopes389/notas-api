# API de Notas

API para gerenciamento de notas e usuários com autenticação JWT.

## Funcionalidades

- Autenticação JWT (login/registro)
- CRUD de notas
- Compartilhamento de notas
- WebSockets para atualizações em tempo real
- Documentação com Swagger

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:
   ```
   cp .env.example .env
   ```
4. Inicie o banco de dados PostgreSQL
5. Execute as migrações:
   ```
   npm run migration:run
   ```
6. Inicie o servidor:
   ```
   npm run start:dev
   ```

## Autenticação

### Login

Para autenticar, envie uma requisição POST para `/auth/login` com o seguinte corpo:

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

A resposta será um token JWT:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### WebSockets

Para autenticar em WebSockets, envie o token JWT no cabeçalho de autorização:

```javascript
const socket = io('http://localhost:3000', {
  extraHeaders: {
    Authorization: `Bearer ${token}`
  }
});
```

## Documentação

A documentação da API está disponível em `/api` quando o servidor estiver em execução.

## Tecnologias Utilizadas

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Swagger
- WebSocket

## Requisitos

- Node.js
- PostgreSQL

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=notas_db
```

4. Crie o banco de dados PostgreSQL:
```sql
CREATE DATABASE notas_db;
```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

2. Acesse a documentação da API:
```
http://localhost:3000/api
```

## Endpoints da API

### Usuários

- `POST /users` - Criar usuário
- `GET /users/:id` - Obter usuário por ID
- `PUT /users/:id` - Atualizar usuário

### Notas

- `POST /notes` - Criar nota
- `GET /notes` - Listar notas do usuário
- `GET /notes/:id` - Obter nota por ID
- `PUT /notes/:id` - Atualizar nota
- `DELETE /notes/:id` - Deletar nota
- `POST /notes/:id/share` - Compartilhar nota

## WebSocket

A API também suporta comunicação em tempo real via WebSocket:

- `noteCreated` - Evento emitido quando uma nota é criada
- `noteUpdated` - Evento emitido quando uma nota é atualizada
- `noteDeleted` - Evento emitido quando uma nota é deletada
- `getNotes` - Evento para obter todas as notas do usuário