# Squarefi BFF API Module

A TypeScript/JavaScript client for interacting with the Squarefi BFF API.

## Installation

```bash
npm install squarefi-bff-api-module
```

## Usage

```typescript
import { createApiClient } from 'squarefi-bff-api-module';

const api = createApiClient({
  baseURL: 'YOUR_API_BASE_URL',
  tenantId: 'YOUR_TENANT_ID',
  isBearerToken: true,
});

// Make API calls
const response = await api.getRequest('/some-endpoint');
```

## Features

- Full TypeScript support
- Axios-based HTTP client
- Token management
- Telegram integration support
- Comprehensive constants and types

## License

MIT
