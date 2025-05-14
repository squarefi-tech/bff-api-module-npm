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

// System operations (currencies, chains, countries)
const currencies = await squarefi_bff_api_client.list.currencies.getAll();
const chains = await squarefi_bff_api_client.list.chains.getAll();
const countries = await squarefi_bff_api_client.list.countries.getAll();
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
- `squarefi_bff_api_client.issuing` - Card issuing operations
  - Create and manage cards
  - Card limits and controls
  - Transaction history
  - Card status management
- `squarefi_bff_api_client.kyc` - Know Your Customer procedures
  - Sumsub integration
  - Persona inquiries initialization
- `squarefi_bff_api_client.list` - System data operations
  - Currencies list (`/system/currencies`)
  - Chains list (`/system/chains`)
  - Countries list (`/system/countries`)
- `squarefi_bff_api_client.orders` - Order management
  - Create orders by type
  - Calculate exchange rates
  - Support for INTERNAL_TRANSFER order type
- `squarefi_bff_api_client.rails` - KYC onboarding rails
  - Manage onboarding rails and flows
- `squarefi_bff_api_client.forms` - KYC forms
  - Manage and submit KYC forms
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

| Variable                 | Description                                   | Required | Example              |
| ------------------------ | --------------------------------------------- | -------- | -------------------- |
| API_URL                  | Base URL for the Squarefi BFF API             | Yes      | `https://api-v1.url` |
| API_V2_URL               | Base URL for the Squarefi BFF API             | Yes      | `https://api-v2.url` |
| TENANT_ID                | Your tenant identifier                        | Yes      | `tenant_12345`       |
| LOGOUT_URL               | Your frontend-app logout route                | No       | '/auth/logout'       |
| SERVER_PUBLIC_KEY_BASE64 | Server provides base64-encoded PEM format key | Yes      | 'example'            |

## 🚀 Features

- 🔒 Built-in token management and authentication
- 📱 Telegram integration support
- 💪 Full TypeScript support with strict typing
- 🔄 Axios-based HTTP client
- 📦 Comprehensive constants and types
- 🛡️ Secure request handling
- 🔑 Multi-tenant support
- 🧩 Persona KYC integration
- 📝 Rails and Forms modules for flexible onboarding/compliance

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

- react: >=18.x.x

## 📝 Changelog

See [CHANGELOG.md](https://github.com/squarefi-tech/bff-api-module-npm/blob/main/CHANGELOG.md) for a list of changes and updates.

## 📄 License

MIT

## 🔗 Repository

This package is available on [GitHub](https://github.com/squarefi-tech/bff-api-module-npm) and [npm](https://www.npmjs.com/package/squarefi-bff-api-module).
