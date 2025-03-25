# Squarefi BFF API Module

A professional TypeScript/JavaScript SDK for seamless integration with Squarefi BFF API.

## 📦 Installation

```bash
npm install squarefi-bff-api-module
```

## 🔧 Usage

```typescript
import { squarefi_bff_api_client } from 'squarefi-bff-api-module';

// Authentication
await squarefi_bff_api_client.auth.login(credentials);

// Exchange operations
const rates = await squarefi_bff_api_client.exchange.getRates();

// Tenant operations
const tenantInfo = await squarefi_bff_api_client.tenants.getTenantInfo();

// Wallet operations
const balance = await squarefi_bff_api_client.wallets.getBalance();

// Fiat accounts
const accounts = await squarefi_bff_api_client.fiat_accounts.getAccounts();
```

## 📚 Available API Modules

Access different API functionalities through the client:

- `squarefi_bff_api_client.auth` - Authentication and authorization
- `squarefi_bff_api_client.exchange` - Currency exchange operations
- `squarefi_bff_api_client.fiat_accounts` - Fiat account management
- `squarefi_bff_api_client.issuing` - Card issuing operations
- `squarefi_bff_api_client.kyc` - Know Your Customer procedures
- `squarefi_bff_api_client.list` - Listing and pagination utilities
- `squarefi_bff_api_client.orders` - Order management
- `squarefi_bff_api_client.tenants` - Tenant management operations
- `squarefi_bff_api_client.user` - User profile operations
- `squarefi_bff_api_client.wallets` - Crypto wallet operations

## ⚙️ Environment Variables

| Variable   | Description                       | Required | Example              |
| ---------- | --------------------------------- | -------- | -------------------- |
| API_URL    | Base URL for the Squarefi BFF API | Yes      | `https://api-v1.url` |
| API_V2_URL | Base URL for the Squarefi BFF API | Yes      | `https://api-v2.url` |
| TENANT_ID  | Your tenant identifier            | Yes      | `tenant_12345`       |

## 🚀 Features

- 🔒 Built-in token management and authentication
- 📱 Telegram integration support
- 💪 Full TypeScript support with strict typing
- 🔄 Axios-based HTTP client
- 📦 Comprehensive constants and types
- 🛡️ Secure request handling
- 🔑 Multi-tenant support

## 🛠️ Development

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test
```

## 🔐 Security

The module implements industry-standard security practices:

- Secure token management
- Request signing
- Rate limiting protection
- HTTPS enforcement
- Multi-tenant isolation

## Dependencies

### Main Dependencies

- axios: 1.6.7
- @telegram-apps/sdk-react: 3.1.2

### Peer Dependencies

- react: ^18.x.x

## 📚 API Documentation

Each module provides a set of type-safe methods for interacting with specific API endpoints. For detailed API documentation, please refer to our [API Documentation](link-to-your-docs).

## 🆘 Support

For support and questions, please [open an issue](link-to-issues) or contact our support team.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](link-to-contributing) for details.

## 📄 License

MIT
