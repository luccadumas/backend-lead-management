# Lead Management System Backend

A Node.js/TypeScript backend for managing leads, built with Express.js e banco de dados flexível (SQLite por padrão, SQL Server opcional).

## Features

- RESTful API for lead management
- SQLite database (default, zero config) ou SQL Server (opcional)
- Email notifications for accepted leads
- Automatic price discount for leads over $500
- Clean Architecture with DDD principles
- TypeScript for type safety
- Express.js for routing and middleware
- Swagger documentation

## Prerequisites

- Node.js (v14 ou superior)
- npm ou yarn
- (Opcional) SQL Server instalado, se quiser rodar com SQL Server

## Installation

1. Clone o repositório:
```bash
git clone <repository-url>
cd backend-lead-management
```

2. Instale as dependências:
```bash
yarn
```

3. Crie um arquivo `.env` na raiz do projeto. Exemplo para rodar com SQLite (recomendado para desenvolvimento):
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (SQLite)
DB_TYPE=sqlite
DB_PATH=./dev.sqlite

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SALES_EMAIL=sales@test.com
```

Se quiser rodar com SQL Server, use este exemplo:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (SQL Server)
DB_TYPE=mssql
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=yourStrong(!)Password
DB_DATABASE=lead_management

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SALES_EMAIL=sales@test.com
```

4. (Opcional) Se for usar SQL Server, crie o banco de dados manualmente:
```sql
CREATE DATABASE lead_management;
```

## Rodando a aplicação

1. Modo desenvolvimento (SQLite ou SQL Server):
```bash
yarn dev
```

2. Modo produção:
```bash
yarn build
yarn start
```

## Observações
- Por padrão, o projeto roda com SQLite, sem necessidade de instalar ou configurar banco de dados.
- Para usar SQL Server, basta ajustar as variáveis de ambiente.
- O arquivo do banco SQLite será criado automaticamente na primeira execução.

## API Endpoints

### Leads

- `GET /api/leads` - Get all leads
- `GET /api/leads/status/:status` - Get leads by status (invited, accepted, declined)
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads/:id/accept` - Accept a lead
- `POST /api/leads/:id/decline` - Decline a lead
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

## Project Structure

```
src/
├── application/         # Application services
├── domain/             # Domain entities and interfaces
├── infrastructure/     # Infrastructure implementations
│   ├── database/      # Database configuration
│   ├── repositories/  # Repository implementations
│   └── services/      # External services (email, etc.)
└── presentation/      # Controllers and routes
```

## Testing

Run the test suite:
```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 