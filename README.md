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

Este projeto utiliza as seguintes tecnologias:

Node.js: Ambiente de execução JavaScript.
Express: Framework para criação de APIs.
MongoDB: Banco de dados NoSQL.
Mongoose: Biblioteca para modelar dados no MongoDB.
JWT (JSON Web Tokens): Para autenticação e autorização de usuários.
Bcrypt: Para criptografar senhas.
TypeScript: Superset de JavaScript que traz tipagem estática.
Cors: Para habilitar solicitações entre diferentes origens.
