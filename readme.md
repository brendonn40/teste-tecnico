# Backend

API desenvolvida com Node.js, Prisma e PostgreSQL.

---

## 🧰 Pré-requisitos

- Node.js (v18+)
- Docker
- Yarn ou NPM

---

## 1️⃣ Subir o banco de dados

Execute o comando abaixo para iniciar um container PostgreSQL:

docker run --name postgres-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=app_db -p 5432:5432 -d postgres

2️⃣ Criar arquivo .env

Na raiz do projeto, crie um arquivo .env com o seguinte conteúdo:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/app_db"
JWT_SECRET="sua_chave_secreta_aqui"

3️⃣ Instalar dependências

Com Yarn: yarn install ou com NPM: npm install

4️⃣ Gerar os tipos do Prisma

yarn prisma generate ou npx prisma generate

5️⃣ Rodar as migrations

yarn prisma migrate dev ou npx prisma migrate dev

6️⃣ Iniciar o projeto

Com Yarn: yarn dev ou com NPM: npm run dev



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


# Testando a aplicação

1️⃣ Clique em cadastre se e preencha os dados.

2️⃣ Faça o login com seu email e senha

3️⃣ Adicione itens ao carrinho e finalize o pedido


# Decisões Técnicas

As tecnologias foram escolhidas priorizando simplicidade, produtividade e organização do projeto.

No backend, utilizei Node.js para construir a API por ser leve, amplamente utilizado e eficiente para aplicações web. Escolhi o Prisma como ORM por facilitar a modelagem do banco com tipagem segura e migrations organizadas. O banco de dados é PostgreSQL, por ser estável, confiável e adequado para aplicações que podem crescer no futuro.

A API foi estruturada separando responsabilidades em routes, controllers e services para manter organização, clareza e facilidade de manutenção.

A autenticação foi feita com JWT, por ser simples de implementar e funcionar bem em APIs desacopladas.

No frontend, utilizei React com Vite para ter um ambiente rápido de desenvolvimento e uma boa organização baseada em componentes. A separação entre frontend e backend facilita manutenção e futuras evoluções do sistema.

O uso de Docker para o banco ajuda a manter o ambiente padronizado e evita problemas de configuração.

As decisões focaram em:

Facilidade de desenvolvimento

Organização do código

Boa base para crescimento futuro









