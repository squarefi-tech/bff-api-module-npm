# Squarefi BFF API SDK

A fully-typed TypeScript / JavaScript SDK for effortless interaction with the Squarefi **Back-For-Front** (BFF) API.

---

## ✨ Why use this SDK?

• Built-in token lifecycle management (refresh, revoke, storage helpers).  
• Strict TypeScript types generated from the OpenAPI contract.  
• Axios-powered HTTP client with automatic tenant & environment headers.  
• First-class support for **Telegram Mini-Apps** as well as Web.  
• Batteries included: constants, helpers & cryptography utilities.  
• Zero-config – just provide your API URLs and tenant id.

---

## 📦 Installation

```bash
# npm
yarn add squarefi-bff-api-module
# or
npm install squarefi-bff-api-module
```

The package ships with `.d.ts` files so no additional typings are required.

---

## ⚡️ Quick start

```ts
import { squarefi_bff_api_client as api, OrderType } from 'squarefi-bff-api-module';

// 1) Authenticate (choose the strategy that suits your flow)
await api.auth.signin.omni.email({
  email: 'alice@example.com',
  invite_code: 'optional',
});

// 2) Make authorised calls – tokens are forwarded automatically.
const wallets = await api.wallets.getAll();
const firstWalletUuid = wallets[0].uuid;

const cards = await api.issuing.cards.byWalletUuid.getAll({
  wallet_uuid: firstWalletUuid,
});

// 3) Exchange rates helper
await api.exchange.byOrderType[OrderType.DEPOSIT_FIAT_SEPA].getByFromCurrency(firstWalletUuid);

// 4) Real-time subscriptions (React only)
import { useSupabaseSubscription } from 'squarefi-bff-api-module';

const { isConnected } = useSupabaseSubscription({
  config: {
    channelName: 'my-channel',
    table: 'transactions',
    event: '*',
  },
  callback: (payload) => console.log('Real-time update:', payload),
});
```

---

## 🌐 Environment variables

The SDK reads connection details from process-level variables. When bundling for the browser, tools like **Vite**, **Webpack DefinePlugin**, or **Next.js** can safely inline those values at build time.

| Name                       | Description                                                          | Required                       | Example                       |
| -------------------------- | -------------------------------------------------------------------- | ------------------------------ | ----------------------------- |
| `API_URL`                  | Base URL of the BFF **v1** service                                   | ✅                             | `https://api-v1.squarefi.com` |
| `API_V2_URL`               | Base URL of the BFF **v2** service                                   | ✅                             | `https://api-v2.squarefi.com` |
| `API_TOTP_URL`             | Base URL of the **TOTP / OTP** micro-service                         | ⚠️ _If you use TOTP features_  | `https://totp.squarefi.com`   |
| `TENANT_ID`                | Your tenant / organisation identifier                                | ✅                             | `tenant_12345`                |
| `LOGOUT_URL`               | Frontend route where the user is redirected when refresh token fails | ❌                             | `/auth/logout`                |
| `SERVER_PUBLIC_KEY_BASE64` | PEM encoded key (base64) used for request signing                    | ✅                             | `MIIBIjANBgkqh…`              |
| `SUPABASE_URL`             | Supabase project URL for real-time subscriptions                     | ⚠️ _If you use Supabase hooks_ | `https://xyz.supabase.co`     |
| `SUPABASE_PUBLIC_KEY`      | Supabase public anon key for client authentication                   | ⚠️ _If you use Supabase hooks_ | `eyJhbGciOiJIUzI1NiIs…`       |

> ℹ️ When running in Node.js you can place these variables in a `.env` file and load them with [dotenv](https://npmjs.com/package/dotenv).

---

## 🔄 React Hooks

The SDK includes React hooks for real-time functionality powered by Supabase:

### useSupabaseSubscription

A hook for subscribing to real-time database changes via Supabase.

```tsx
import { useSupabaseSubscription } from 'squarefi-bff-api-module';

function MyComponent() {
  const { isConnected, isClientAvailable } = useSupabaseSubscription({
    config: {
      channelName: 'wallet-transactions',
      table: 'transactions',
      schema: 'public',
      event: 'INSERT', // 'INSERT' | 'UPDATE' | 'DELETE' | '*'
      filter: 'wallet_id=eq.123',
    },
    callback: (payload) => {
      console.log('New transaction:', payload);
    },
    enabled: true,
  });

  if (!isClientAvailable) {
    return <div>Supabase not configured</div>;
  }

  return <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>;
}
```

> ⚠️ **Important**: The hook will throw an error if Supabase environment variables are missing and you attempt to use it. Make sure to set `SUPABASE_URL` and `SUPABASE_PUBLIC_KEY` environment variables.

---

## 🗺️ API surface

`squarefi_bff_api_client` is a plain object where every property is a namespaced group of operations. The list below reflects the current SDK version (v1.18.13).

| Namespace           | Highlights                                                          |
| ------------------- | ------------------------------------------------------------------- |
| **auth**            | Omni/Telegram/Password sign-in & sign-up, token refresh, OTP verify |
| **counterparties**  | CRUD for counterparties & their destinations                        |
| **developer**       | Vendor & API key management                                         |
| **exchange**        | Exchange rates per order type / currency                            |
| **issuing**         | Virtual & physical cards, limits, controls, transactions            |
| **kyc**             | Sumsub flows, rails & form submission                               |
| **list**            | Static system lists – currencies, chains, countries                 |
| **orders**          | Create / calculate orders (including internal transfer)             |
| **persona**         | Persona in-app KYC inquiries                                        |
| **tenants**         | Tenant configuration                                                |
| **totp**            | TOTP generation / verification / revoke helpers                     |
| **user**            | User profile, contacts, OTP verification                            |
| **virtualAccounts** | Create & manage virtual IBAN accounts                               |
| **wallets**         | Wallet creation, addresses, balances, history                       |

> 📝 Every method returns a typed `Promise<Response>` so you get IDE autocompletion & compile-time safety.

---

## 🛠️ Development & contributing

1. Fork the repo and install dependencies:
   ```bash
   git clone https://github.com/squarefi-tech/bff-api-module-npm.git
   cd bff-api-module-npm
   npm ci
   ```
2. Generate/update OpenAPI types (if the backend spec changed):
   ```bash
   npm run generate:openapi-types
   ```
3. Run the linter & the test suite:
   ```bash
   npm test
   ```
4. Build the package:
   ```bash
   npm run build
   ```

Please open a PR once the checks are green. All contributions are welcome! 🤝

---

## 🔐 Security policy

If you discover a vulnerability, **do NOT** open a public issue. Instead please email *security@squarefi.com* with the details and we will respond promptly.

---

## 📄 License

[MIT](./LICENSE)

---

## 🔗 Links

• NPM – https://www.npmjs.com/package/squarefi-bff-api-module  
• GitHub – https://github.com/squarefi-tech/bff-api-module-npm
