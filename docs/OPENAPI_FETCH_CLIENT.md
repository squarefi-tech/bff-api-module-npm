# OpenAPI Fetch Client

Новый типизированный HTTP-клиент на базе `openapi-fetch`, который работает параллельно с существующим axios-клиентом. Клиент использует те же типы из `openapi-typescript` и обеспечивает полную типобезопасность на уровне путей API.

## Установка

Клиент уже установлен в проекте. Для использования просто импортируйте нужный клиент:

```typescript
import { openApiClientV1, openApiClientV2, openApiClientTOTP } from '../utils/openapiClientFactory';
```

## Основные возможности

- ✅ Полная типизация путей и параметров API
- ✅ Автодополнение в IDE
- ✅ Автоматический refresh токенов
- ✅ Очередь запросов при refresh
- ✅ Поддержка SSR (Server-Side Rendering)
- ✅ Работает как на клиенте, так и на сервере
- ✅ Использует те же типы, что и текущий axios-клиент

## Доступные клиенты

Проект предоставляет три готовых клиента:

- `openApiClientV1` - для API V1
- `openApiClientV2` - для API V2 (с Bearer токенами)
- `openApiClientTOTP` - для TOTP API (с Bearer токенами)

## Базовое использование

### GET запрос

```typescript
import { openApiClientV2 } from '../utils/openapiClientFactory';
import { handleResponse } from '../utils/openapiHelpers';

// Простой GET запрос
const { data, error } = await openApiClientV2.GET('/user');

if (error) {
  throw error;
}

console.log(data);
```

### POST запрос

```typescript
const { data, error } = await openApiClientV2.POST('/auth/sign-in', {
  body: {
    email: 'user@example.com',
    password: 'password123',
  },
  headers: {
    'x-bypass-unauthorized': 'true', // Для bypass refresh логики
  },
});

if (error) throw error;
console.log(data);
```

### PATCH запрос

```typescript
const { data, error } = await openApiClientV2.PATCH('/user/user-data', {
  body: {
    name: 'John Doe',
  },
});

if (error) throw error;
console.log(data);
```

### DELETE запрос

```typescript
const { data, error } = await openApiClientV2.DELETE('/some-resource/{id}', {
  params: {
    path: { id: '123' },
  },
});

if (error) throw error;
```

## Работа с path параметрами

OpenAPI Fetch автоматически типизирует path параметры:

```typescript
// Старый способ (axios):
apiClientV2.getRequest(`/kyc/${wallet_id}/entity`);

// Новый способ (openapi-fetch):
const { data, error } = await openApiClientV2.GET('/kyc/{wallet_id}/entity', {
  params: {
    path: { wallet_id: '123' },
  },
});
```

### Несколько path параметров

```typescript
const { data, error } = await openApiClientV2.GET('/kyc/{wallet_id}/rails/{rail_id}', {
  params: {
    path: {
      wallet_id: '123',
      rail_id: '456',
    },
  },
});
```

## Работа с query параметрами

```typescript
const { data, error } = await openApiClientV2.GET('/some-endpoint', {
  params: {
    query: {
      limit: 10,
      offset: 0,
      sort: 'created_at',
    },
  },
});
```

## Helper функции

Для упрощения работы с ответами клиента предоставлены helper функции:

### `handleResponse<T>(response)`

Автоматически обрабатывает ответ и возвращает данные или выбрасывает ошибку:

```typescript
import { handleResponse } from '../utils/openapiHelpers';

const response = await openApiClientV2.GET('/user');
const userData = handleResponse(response); // Автоматически обрабатывает ошибки
```

### `createTypedRequest<T>(requestFn)`

Обертка для создания типизированных запросов:

```typescript
import { createTypedRequest } from '../utils/openapiHelpers';

const userData = await createTypedRequest(async () =>
  openApiClientV2.GET('/user'),
);
```

### `isSuccessResponse(response)` и `isErrorResponse(response)`

Проверка типа ответа:

```typescript
import { isSuccessResponse, isErrorResponse } from '../utils/openapiHelpers';

const response = await openApiClientV2.GET('/user');

if (isSuccessResponse(response)) {
  console.log(response.data);
} else if (isErrorResponse(response)) {
  console.error(response.error);
}
```

## Обработка ошибок

OpenAPI Fetch возвращает объект `{ data, error, response }`. Всегда проверяйте наличие ошибки:

```typescript
const { data, error } = await openApiClientV2.GET('/user');

if (error) {
  // Обработка ошибки
  console.error('Request failed:', error);
  throw error;
}

// Использование данных
console.log(data);
```

Или используйте helper функции:

```typescript
import { handleResponse } from '../utils/openapiHelpers';

try {
  const response = await openApiClientV2.GET('/user');
  const userData = handleResponse(response);
  console.log(userData);
} catch (error) {
  console.error('Request failed:', error);
}
```

## Автоматический refresh токенов

Клиент автоматически обрабатывает refresh токенов при получении 401 ошибки:

- Автоматически обновляет токен
- Ставит запросы в очередь во время refresh
- Повторяет запросы после успешного refresh
- Обрабатывает ошибки refresh (редирект на logout)

Для bypass refresh логики используйте заголовок:

```typescript
const { data, error } = await openApiClientV2.POST('/auth/sign-in', {
  body: { email, password },
  headers: {
    'x-bypass-unauthorized': 'true',
  },
});
```

## Заголовки

Клиент автоматически добавляет следующие заголовки:

- `x-tenant-id` - ID тенанта из переменной окружения
- `Authorization` - токен доступа (Bearer или plain token)
- `x-app-environment` - окружение приложения (web/telegram)

Вы можете добавить дополнительные заголовки:

```typescript
const { data, error } = await openApiClientV2.GET('/user', {
  headers: {
    'Custom-Header': 'value',
  },
});
```

## Сравнение с axios-клиентом

### Старый способ (axios)

```typescript
import { apiClientV2 } from '../utils/apiClientFactory';

const userData = await apiClientV2.getRequest<API.User.Get.Response>('/user');
```

### Новый способ (openapi-fetch)

```typescript
import { openApiClientV2 } from '../utils/openapiClientFactory';
import { handleResponse } from '../utils/openapiHelpers';

const response = await openApiClientV2.GET('/user');
const userData = handleResponse(response);
```

### Преимущества нового клиента

1. **Типизация путей**: TypeScript проверяет правильность пути на этапе компиляции
2. **Автодополнение**: IDE подсказывает доступные пути и параметры
3. **Меньший размер**: openapi-fetch легче axios
4. **Нативный fetch**: использует стандартный fetch API
5. **Лучшая типизация**: параметры запроса строго типизированы

## Примеры миграции

См. примеры в `src/api/examples/`:

- `auth.example.ts` - примеры для auth модуля
- `user.example.ts` - примеры для user модуля
- `kyc.example.ts` - примеры для KYC модуля с path параметрами

## SSR поддержка

Клиент автоматически определяет окружение (клиент/сервер) и корректно обрабатывает refresh токенов:

- На сервере: refresh логика отключена
- На клиенте: полная поддержка refresh токенов и редиректов

## Важные замечания

1. **Не удаляйте старый клиент**: Новый клиент работает параллельно со старым
2. **Типы совместимы**: Используются те же типы из `openapi-typescript`
3. **Постепенная миграция**: Вы можете мигрировать модули постепенно
4. **Обратная совместимость**: Старый клиент продолжает работать

## Troubleshooting

### Ошибка "No data in response"

Убедитесь, что endpoint возвращает данные. Проверьте тип ответа в OpenAPI спецификации.

### Ошибка типизации пути

Убедитесь, что путь точно соответствует OpenAPI спецификации. Используйте автодополнение IDE.

### Refresh токен не работает

Проверьте, что:
- Токен сохранен в localStorage
- Заголовок `x-bypass-unauthorized` не установлен
- Вы находитесь в браузерном окружении (не SSR)

## Дополнительные ресурсы

- [openapi-fetch документация](https://openapi-ts.dev/openapi-fetch/)
- [openapi-typescript документация](https://openapi-ts.dev/)
- Примеры использования в `src/api/examples/`

