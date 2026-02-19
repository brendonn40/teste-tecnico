# Backend

API desenvolvida com Node.js, Prisma e PostgreSQL.

---

## 🧰 Pré-requisitos

- Node.js (v18+)
- Docker
- Yarn ou NPM

---

## 1️⃣ Subir o banco de dados

Execute:
bash
docker run --name postgres-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=app_db \
  -p 5432:5432 \
  -d postgres

2️⃣ Criar arquivo .env

Na raiz do projeto, crie um arquivo .env com:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/app_db"
JWT_SECRET="sua_chave_secreta_aqui"

3️⃣ Instalar dependências
yarn install ou npm install

4️⃣ Rodar as migrations
yarn prisma migrate dev ou npx prisma migrate dev

5️⃣ Iniciar o projeto
yarn dev ou npm run dev



# Frontend

Aplicação frontend desenvolvida com Vite + React.

---

## 🧰 Pré-requisitos

- Node.js (v18+)
- Yarn ou NPM

---

1️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:
VITE_BASE_URL_API="http://localhost:3000"
certifique se que o backend está rodando na porta 3000

2️⃣ Instalar dependências

yarn install ou npm install

3️⃣ Iniciar o projeto
yarn dev
npm run dev


# Decisões Técnicas

As tecnologias foram escolhidas priorizando simplicidade, produtividade e organização do projeto.

No backend, utilizei Node.js para construir a API por ser leve, amplamente utilizado e eficiente para aplicações web. Escolhi o Prisma como ORM por facilitar a modelagem do banco com tipagem segura e migrations organizadas. O banco de dados é PostgreSQL, por ser estável, confiável e adequado para aplicações que podem crescer no futuro.

A autenticação foi feita com JWT, por ser simples de implementar e funcionar bem em APIs desacopladas.

No frontend, utilizei React com Vite para ter um ambiente rápido de desenvolvimento e uma boa organização baseada em componentes. A separação entre frontend e backend facilita manutenção e futuras evoluções do sistema.

O uso de Docker para o banco ajuda a manter o ambiente padronizado e evita problemas de configuração.

As decisões focaram em:

Facilidade de desenvolvimento

Organização do código

Boa base para crescimento futuro
