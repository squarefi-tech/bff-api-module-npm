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
await squarefi_bff_api_client.auth.signin.omni.email({
  email: 'user@example.com',
  invite_code: 'optional_invite_code',
  referrer: 'optional_referrer',
  redirect_url: 'optional_redirect_url',
});

// Telegram authentication
await squarefi_bff_api_client.auth.signin.telegram({
  tg_id: 123456789,
  hash: 'telegram_hash',
  init_data_raw: 'telegram_init_data',
});

// Password authentication
await squarefi_bff_api_client.auth.signin.password('user@example.com', 'password');

// OTP verification
await squarefi_bff_api_client.auth.otp.verify.email('user@example.com', 'otp_token');
await squarefi_bff_api_client.auth.otp.verify.phone('+1234567890', 'otp_token');

// User operations
const userData = await squarefi_bff_api_client.user.get();
const userProfile = await squarefi_bff_api_client.user.userData.get();

// Wallet operations
const wallets = await squarefi_bff_api_client.wallets.getAll();
const walletDetails = await squarefi_bff_api_client.wallets.getByUuid('wallet_uuid');

// Card operations
const cards = await squarefi_bff_api_client.issuing.cards.byWalletUuid.getAll({
  wallet_uuid: 'wallet_uuid',
  limit: 10,
  offset: 0,
});

// Exchange operations
const exchangeRates = await squarefi_bff_api_client.exchange.byOrderType[OrderType.DEPOSIT_FIAT_SEPA].getByFromCurrency(
  'from_uuid'
);
```

## 📚 Available API Modules

Access different API functionalities through the client:

- `squarefi_bff_api_client.auth` - Authentication and authorization
  - OTP verification (email/phone)
  - Sign in (email/phone/telegram/password)
  - Sign up (email/telegram)
  - Token refresh
- `squarefi_bff_api_client.counterparties` - Counterparty management
  - List, create, update counterparties
  - Manage counterparty destinations
- `squarefi_bff_api_client.developer` - Developer tools
  - API key management
  - Vendor management
- `squarefi_bff_api_client.exchange` - Currency exchange operations
  - Get exchange rates by order type
  - Get rates by currency
- `squarefi_bff_api_client.fiat_accounts` - Fiat account management
  - List accounts with/without cards
  - Create and manage fiat accounts
  - Transaction history
- `squarefi_bff_api_client.issuing` - Card issuing operations
  - Create and manage cards
  - Card limits and controls
  - Transaction history
  - Card status management
- `squarefi_bff_api_client.kyc` - Know Your Customer procedures
  - Sumsub integration
- `squarefi_bff_api_client.list` - Listing and pagination utilities
  - Currencies list
  - Chains list
- `squarefi_bff_api_client.location` - Location services
  - Countries list
- `squarefi_bff_api_client.orders` - Order management
  - Create orders by type
  - Calculate exchange rates
- `squarefi_bff_api_client.tenants` - Tenant management operations
  - Tenant configuration
- `squarefi_bff_api_client.user` - User profile operations
  - Get/update user data
  - Update contact information
  - OTP verification
- `squarefi_bff_api_client.wallets` - Crypto wallet operations
  - Create and manage wallets
  - Address management
  - Transaction history
  - Balance tracking

## ⚙️ Environment Variables

| Variable   | Description                       | Required | Example              |
| ---------- | --------------------------------- | -------- | -------------------- |
| API_URL    | Base URL for the Squarefi BFF API | Yes      | `https://api-v1.url` |
| API_V2_URL | Base URL for the Squarefi BFF API | Yes      | `https://api-v2.url` |
| TENANT_ID  | Your tenant identifier            | Yes      | `tenant_12345`       |
| LOGOUT_URL | Your logout route                 | Yes      | '/auth/logout'       |

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

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and updates.

## 📄 License

MIT
