# Lead Management System Backend

A Node.js/TypeScript backend for managing leads, built with Express.js and a flexible database (SQLite by default, SQL Server optional).

## Features

- RESTful API for lead management
- SQLite database (default, zero config) or SQL Server (optional)
- Email notifications for accepted leads (simulated via .txt file)
- Automatic price discount for leads over $500
- Clean Architecture with DDD principles
- TypeScript for type safety
- Express.js for routing and middleware
- Swagger documentation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- (Optional) SQL Server installed, if you want to run with SQL Server

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend-lead-management
```

2. Install dependencies:
```bash
yarn
# or
npm install
```

3. Create a `.env` file in the project root. Example for running with SQLite (recommended for development):
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

If you want to run with SQL Server, use this example:
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

4. (Optional) If using SQL Server, create the database manually:
```sql
CREATE DATABASE lead_management;
```

## Running the Application

1. Development mode (SQLite or SQL Server):
```bash
yarn dev
# or
npm run dev
```

2. Production mode:
```bash
yarn build
yarn start
# or
npm run build
npm start
```

## Email Simulation

Whenever a lead is accepted, instead of sending a real email, the system simulates the email by creating a `.txt` file in the `emails/` folder at the project root. Each file contains the recipient, subject, and content of the email that would have been sent. The filename includes the lead ID and a timestamp for easy identification.

This allows you to verify that the email notification logic is working, without needing a real SMTP server or sending actual emails.

## Notes
- By default, the project runs with SQLite, with no need to install or configure a database.
- To use SQL Server, just adjust the environment variables.
- The SQLite database file will be created automatically on first run.

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

## Postman Collection

A Postman collection is included in the `postman/` directory to help you test the API endpoints. The collection includes all available endpoints with example requests and environment variables.

To use the collection:

1. Open Postman
2. Import the collection file from `postman/lead-management-api.postman_collection.json`
3. (Optional) Import the environment file from `postman/lead-management-api.postman_environment.json`
4. Start making requests!

The collection includes:
- All API endpoints documented above
- Example request bodies
- Environment variables for easy configuration
- Tests for successful responses

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
# or
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 