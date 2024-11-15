# Teste para a a vaga de Desenvolvedor Fullstack ( Javascript ) # 1

Primeira etapa do recrutamentoa vaga de Desenvolvedor Fullstack ( Javascript )

# Estrutura do projecto

project/
|-- app/
| |-- controllers/
| | |-- authController.ts
| | |-- bookingController.ts
| | |-- serviceController.ts
|-- domain/
| |-- entities/
| | |-- User.ts
| |-- repositories/
| | |-- IUserRepository.ts
| |-- services/
| | |-- authService.ts
|-- infrastructure/
| |-- db/
| | |-- mongoDb.ts
| |-- repositories/
| | |-- UserRepository.ts
|-- utils/
| |-- jwt.ts
| |-- security.ts
|-- routes.ts
|-- server.ts


# Como Rodar o Projeto Localmente
Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

Node.js (preferencialmente versão 18 ou superior)
Docker e Docker Compose (caso queira rodar com Docker)
Passo 1: Instalar Dependências

Instale as dependências do projeto:
- npm install

# Passo 2: Rodar a Aplicação
- npm run dev (para desenvolvimento)
  ou
- npm run build  e depois npm start (para produção)


# Passo 3: Rodar com Docker
Se preferir rodar com Docker, siga os passos abaixo:
Build da imagem Docker:

Para construir a imagem Docker, execute o comando:
- docker-compose up --build

Rotas da API:

Aqui estão as rotas disponíveis para interação com a API:

1. Autenticação e Registro

POST /register: Registra um novo usuário (cliente ou prestador de serviço).

POST /login: Realiza o login e retorna um token JWT.

2. Serviços (para prestadores de serviços)

POST /service: Adiciona um novo serviço (requer role de "provider").

PUT /updateService: Atualiza um serviço existente (requer role de "provider").

DELETE /deleteService: Deleta um serviço (requer role de "provider").

PUT /updateSlots: Atualiza a disponibilidade de slots de um serviço (requer role de "provider").

3. Reservas (para clientes)

POST /booking: Cria uma nova reserva (requer role de "client").

PUT /booking/:bookingId/update-date: Atualiza a data de uma reserva existente (requer role de "client").

DELETE /booking/:bookingId: Cancela uma reserva (requer role de "client").

GET /clientHistory/:clientId: Obtém o histórico de reservas de um cliente (requer role de "client").

GET /providerHistory/:serviceId: Obtém o histórico de reservas de um serviço (requer role de "provider").

PUT /updateBalance: Atualiza o saldo do cliente (requer role de "client").

4. Autorização

Autenticação com JWT: A maioria das rotas exige um token JWT válido no cabeçalho de Authorization para autenticação.

# Tecnologias

- **Node.js** e **Express.js** para construir a API REST.
- **TypeScript** para garantir segurança de tipos e facilitar a manutenção do código.
- **MongoDB** (usando **Mongoose**) para armazenamento de dados.
- **Docker** para contêinerização e facilitar a implantação da aplicação.
- **express-validator** para validação e sanitização de dados de entrada.
- **express-rate-limit** para prevenir ataques de **brute-force**.
- 
# Conctactos :
Linkedin : https://www.linkedin.com/in/pedro-diassala-18178b203/

