import {
  APIKeyRole,
  CardFormFactor,
  CardStatus,
  CardTransactionType,
  CardType,
  CounterpartyDestinationType,
  CurrencyType,
  IssuingProgramStatus,
  OrderStatuses,
  OrderType,
  SortingDirection,
  SubAccountType,
} from '../../constants';

import { components, operations, paths } from './autogen/apiV2.types';
import { components as componentsV1Frontend, paths as pathsV1Frontend } from './autogen/apiV1Frontend.types';
import { paths as pathsV1Legacy } from './autogen/apiV1Legacy.types';

export namespace API {
  export namespace Auth {
    export namespace RefreshToken {
      export type Request = operations['AuthController_refreshToken']['requestBody']['content']['application/json'];
      export type Response =
        operations['AuthController_refreshToken']['responses']['200']['content']['application/json'];
    }
    export namespace Telegram {
      export namespace Signin {
        export type Request = operations['AuthTelegramController_signIn']['requestBody']['content']['application/json'];
        export type Response =
          operations['AuthTelegramController_signIn']['responses']['200']['content']['application/json'];
      }
      export namespace Signup {
        export type Request = operations['AuthTelegramController_signUp']['requestBody']['content']['application/json'];
        export type Response =
          operations['AuthTelegramController_signUp']['responses']['200']['content']['application/json'];
      }
    }

    export interface Tokens {
      access_token: string;
      refresh_token: string;
    }

    export namespace Update {
      export namespace Phone {
        export interface Request {
          phone: string;
        }
      }
    }

    export namespace SignIn {
      export namespace ByType {
        export type Request = operations['AuthController_signIn']['requestBody']['content']['application/json'];
        export type Response = API.Auth.Tokens;
      }

      export namespace Omni {
        export namespace Email {
          export namespace OTP {
            export interface Request {
              email: string;
              invite_code?: string;
              referrer?: string;
              redirect_url?: string;
            }
          }
        }

        export namespace Phone {
          export namespace OTP {
            export interface Request {
              phone: string;
              invite_code?: string;
              referrer?: string;
            }
          }
        }
      }
    }

    export namespace SignUp {
      export namespace ByType {
        export type Request = operations['AuthController_signUp']['requestBody']['content']['application/json'];
      }

      export namespace Password {
        export interface Request {
          email: string;
          password: string;
          invite_code?: string;
          referrer?: string;
        }
      }
    }

    export namespace Register {
      export type Request = operations['AuthController_register']['requestBody']['content']['application/json'];
      export type Response = operations['AuthController_register']['responses']['200']['content']['application/json'];
    }
    // export interface SupabaseGetSessionResponse {
    //   session?: Tokens;
    //   // user?: User;
    //   error?: string;
    // }

    export namespace VerifyOtp {
      export type Response = {
        access_token: string;
        refresh_token: string;
        error?: string;
      };
    }
  }
  export namespace BankData {
    export namespace GetByCode {
      export type Request = pathsV1Frontend['/frontend/bank-data']['get']['parameters']['query'];
      export type Response =
        pathsV1Frontend['/frontend/bank-data']['get']['responses'][200]['content']['application/json'];
    }
  }

  export namespace Cards {
    export namespace Config {
      export type IssuingProgramOrderType = {
        id: string;
        order_types_id: OrderType | string;
        issuing_programs_id: string;
      };
      export interface Program {
        id: string;
        account_currency: string;
        brand: string;
        form_factor: CardFormFactor | string;
        consent_text: string | null;
        name: string;
        // card_limit: number;   deprecated, use max_cards instead
        max_cards: number;
        realtime_auth: boolean;
        tokenizable: boolean;
        kyc_rails_id: string;
        integration_vendor_id: string;
        vendor_id: string;
        type: CardType | string; // MOCK
        order_types: IssuingProgramOrderType[];
        sub_account_type: SubAccountType | string;
        description: string | null;
        icon: string | null;
        card_issuing_fee: number | null;
        card_monthly_fee: number | null;
        initial_topup: number | null;
        status?: IssuingProgramStatus | string;
      }
    }
    export interface User {
      email: string;
      whitelabel: string;
      id: string;
      nickname: string;
      role: string;
      status: string;
      user_type: string;
      invite_accept: boolean;
      is_new_client: boolean;
      account: {
        first_name: string;
        middle_name: string;
        last_name: string;
        date_of_birth: string;
        phone: string;
        type: string;
        id: string;
        user_id: number;
        tg_account: string;
        company: {
          name: string;
          registration_number: string;
          phone: string;
          primary_contact_email: string;
          id: string;
        };
      };
    }

    export namespace Limits {
      export interface Limits {
        all_time_enabled: boolean;
        all_time_cap: number;
        all_time_spent: number;
        daily_enabled: boolean;
        daily_cap: number;
        daily_spent: number;
        weekly_enabled: boolean;
        weekly_cap: number;
        weekly_spent: number;
        monthly_enabled: boolean;
        monthly_cap: number;
        monthly_spent: number;
        yearly_enabled: boolean;
        yearly_cap: number;
        yearly_spent: number;
        per_transaction_enabled: boolean;
        per_transaction_cap: number;
        per_transaction_spent: number;
      }
      export interface UpdateRequest {
        all_time_cap?: number;
        daily_cap?: number;
        weekly_cap?: number;
        monthly_cap?: number;
        yearly_cap?: number;
        per_transaction_cap?: number;
      }
    }

    export interface IssuingCardListItem {
      brand: string;
      card_id: string;
      card_status: string;
      created_at: string;
      nick_name: string | null;
      wallet_id: string;
      program_id: string;
      limits?: API.Cards.Limits.Limits;
      fiat_account: API.Issuing.SubAccounts.SubAccount;
      last4: string;
      request_id: string;
      name_on_card: string | null;
      type: CardType | string;
      form_factor: CardFormFactor | string;
      tokenizable: boolean;
    }

    export interface IssuingCardDetailItem {
      id: string;
      brand: string;
      card_id: string;
      fiat_account: API.Issuing.SubAccounts.SubAccount;
      last4: string;
      card_status: string;
      form_factor: string;
      name_on_card: string | null;
      nick_name: string;
      wallet_id: string;
      type: string;
      tokenizable: boolean;
      issuing_programs: API.Cards.Config.Program;
      limits?: API.Cards.Limits.Limits;
    }

    export interface SubAccountCardListItem {
      type: string;
      brand: string;
      last4: string;
      card_id: string;
      nick_name: string;
      vendor_id: string;
      wallet_id: string;
      created_at: string;
      program_id: string;
      request_id: string;
      card_number: string;
      card_status: string;
      expiry_year: number;
      form_factor: string;
      tokenizable: boolean;
      expiry_month: number;
      fiat_account: string;
      name_on_card: string;
    }

    export namespace CardsList {
      export namespace Request {
        export type ByWalletUuid = NonNullable<pathsV1Legacy['/issuing/cards']['get']['parameters']['query']>;

        export type BySubaccountAndWalletUuid = ByWalletUuid & {
          filter?: Record<'fiat_account', Record<'type', SubAccountType>>;
        };

        export type BySubAccountAndWalletId = Omit<ByWalletUuid, 'fiat_account_id'> & {
          fiat_account_id: string;
        };
      }

      export type Response = {
        count: number;
        data: IssuingCardListItem[];
      };
    }

    export interface TransactionItem {
      vendor_transaction_id: string;
      created_at: string;
      cleared_at: string;
      merchant: {
        name: string;
        category_code: string;
        city: string;
        country: string;
      };
      last4: string;
      title: string;
      billing_amount: number;
      billing_currency: string;
      transaction_amount: number;
      transaction_currency: string;
      vendor_sub_account_id: string;
      failure_reason: string;
      status: string;
      transaction_type: CardTransactionType | string;
      is_credit: boolean;
      has_receipt: boolean;
      adjustment_type: string;
      review_status: string;
      group: string;
      total_amount: number;
    }

    export interface TransactionsList {
      data: TransactionItem[];
      has_more: boolean;
      count: number;
    }

    export namespace Transactions {
      export namespace List {
        type Query = NonNullable<pathsV1Legacy['/issuing/transactions']['get']['parameters']['query']>;

        export type StatusFilter = NonNullable<Query['status']>;

        export type ByCardIdRequest = Omit<Query, 'card_id'> & { card_id: string };

        export type BySubAccountIdRequest = Omit<Query, 'fiat_account_id'> & { fiat_account_id: string };
      }
    }

    export interface SensitiveData {
      card_number: string;
      cvv: string;
      expiry_month: number;
      expiry_year: number;
      security_code?: string;
    }

    export interface OTP {
      created_at: number;
      internal_card_id: string;
      otp: string;
      valid_to: number;
    }

    export type AuthorizationControls = {
      allowed_merchant_categories: string[];
      allowed_transaction_count: string;
    };

    export type TransactionLimit = {
      amount: number;
      interval: string;
    };

    export namespace Create {
      export interface CommonRequest {
        program_id: string;
        request_id: string;
        nick_name: string;
        wallet_id: string;
        initial_topup?: number;
        currency_id?: string;
        user_data_id: string;
      }
      export type StandAloneRequest = CommonRequest;

      export interface SubAccountRequest extends CommonRequest {
        sub_account_id: string;
      }

      export type StandAloneResponse = IssuingCardDetailItem;
      export type SubAccountResponse = {
        card_id: string;
        status: string;
      };

      export type ExtendedSubAccountResponse = SubAccountResponse & {
        sub_account_id: string;
      };
    }
  }

  export namespace Chains {
    export interface Chain {
      id: number;
      name: string;
      symbol: string;
      is_beta: boolean | null;
    }

    export type ChainList = {
      count: number;
      data: Chain[];
    };
  }

  export namespace Common {
    export namespace Pagination {
      export interface Request {
        limit: number;
        offset: number;
      }
    }

    export namespace Sorting {
      export interface Request<T> {
        sort_by?: keyof Partial<T>;
        sort_order?: SortingDirection;
      }
    }

    export namespace Filtering {
      export interface Request<T> {
        filter?: Partial<Record<keyof T, any>>;
      }
    }

    export namespace Encrypted {
      export interface Request {
        encrypted_key: string;
      }
      export interface Response {
        data: string;
        success: boolean;
        encrypted: boolean;
        iv: string;
      }
    }
  }

  // Контрагенты обслуживаются фронт-модулем (/frontend/counterparty/*).
  // Реквизиты бэкенд отдаёт под ключами banking_data / crypto_data / internal_data;
  // на уровне SDK мы сохраняем исторический downstream-контракт external_banking_data /
  // external_crypto_data (маппинг живёт в api/counterparties.ts), а INTERNAL добавлен
  // аддитивной третьей веткой union — старые потребители banking/crypto его не замечают.
  export namespace Counterparties {
    export type CounterpartyType = componentsV1Frontend['schemas']['CounterpartyAccount']['type'];
    export type Counterparty = componentsV1Frontend['schemas']['CounterpartyAccount'];
    export type CounterpartyWithDestinations = Counterparty & {
      destinations: Destination.List.CounterpartyDestinationListItem[];
    };
    export namespace Destination {
      export type CounterpartyDestinationType = componentsV1Frontend['schemas']['CounterpartyDestination']['type'];
      // Используем Extract для явного извлечения значений из CounterpartyDestinationType
      // Это гарантирует, что мы используем только существующие значения и TypeScript сможет проверить полноту покрытия
      export type BankingDestinationType =
        | Extract<CounterpartyDestinationType, 'FEDWIRE'>
        | Extract<CounterpartyDestinationType, 'ACH'>
        | Extract<CounterpartyDestinationType, 'SWIFT'>
        | Extract<CounterpartyDestinationType, 'SEPA'>
        | Extract<CounterpartyDestinationType, 'CHAPS'>
        | Extract<CounterpartyDestinationType, 'FPS'>;
      export type CryptoDestinationType =
        | Extract<CounterpartyDestinationType, 'CRYPTO_EXTERNAL'>
        | Extract<CounterpartyDestinationType, 'CRYPTO_INTERNAL'>;
      export type InternalDestinationType = Extract<CounterpartyDestinationType, 'INTERNAL'>;
      export type DestinationType = BankingDestinationType | CryptoDestinationType | InternalDestinationType;
      export namespace List {
        export interface DestinationListItemCommonFields {
          id: string;
          nickname: string | null;
          type: CounterpartyDestinationType;
          created_at: string;
        }

        // Реквизиты переиспользуют схемы фронт-модуля как источник правды по nullability.
        // Имена ключей (external_banking_data / external_crypto_data) сохранены ради downstream.
        export type DestinationListItemExternalBankingData = NonNullable<
          componentsV1Frontend['schemas']['CounterpartyBankingData']
        >;

        export type DestinationListItemExternalCryptoData = NonNullable<
          componentsV1Frontend['schemas']['CounterpartyCryptoData']
        >;

        export type DestinationInternalData = NonNullable<componentsV1Frontend['schemas']['CounterpartyInternalData']>;

        export interface DestinationListItemWithExternalBankingData extends DestinationListItemCommonFields {
          type: BankingDestinationType;
          external_banking_data: DestinationListItemExternalBankingData;
          external_crypto_data?: never;
          internal_data?: never;
        }

        export interface DestinationListItemWithExternalCryptoData extends DestinationListItemCommonFields {
          type: CryptoDestinationType;
          external_banking_data?: never;
          external_crypto_data: DestinationListItemExternalCryptoData;
          internal_data?: never;
        }

        export interface DestinationListItemWithInternalData extends DestinationListItemCommonFields {
          type: InternalDestinationType;
          external_banking_data?: never;
          external_crypto_data?: never;
          internal_data: DestinationInternalData;
        }

        export type CounterpartyDestinationListItem =
          | DestinationListItemWithExternalBankingData
          | DestinationListItemWithExternalCryptoData
          | DestinationListItemWithInternalData;

        export type Request =
          pathsV1Frontend['/frontend/counterparty/destinations/wallet/{wallet_id}']['get']['parameters']['path'] &
            NonNullable<
              pathsV1Frontend['/frontend/counterparty/destinations/wallet/{wallet_id}']['get']['parameters']['query']
            >;

        export type Response = {
          total: number;
          data: CounterpartyDestinationListItem[];
        };
      }

      // Фронт-модуль отдаёт одну и ту же схему destination и в списке, и в детальном эндпоинте,
      // поэтому Detail-типы — алиасы List ради обратной совместимости импортов downstream.
      export namespace Detail {
        export type DestinationDetailItemCommonFields = List.DestinationListItemCommonFields;
        export type DestinationDetailItemExternalBankingData = List.DestinationListItemExternalBankingData;
        export type DestinationDetailItemExternalCryptoData = List.DestinationListItemExternalCryptoData;
        export type DestinationDetailItemWithExternalBankingData = List.DestinationListItemWithExternalBankingData;
        export type DestinationDetailItemWithExternalCryptoData = List.DestinationListItemWithExternalCryptoData;
        export type DestinationDetailItemWithInternalData = List.DestinationListItemWithInternalData;
        export type DestinationDetailItem = List.CounterpartyDestinationListItem;

        export interface Request {
          counterparty_destination_id: string;
          // wallet_id / counterparty_account_id бэкенду не нужны (роут /destinations/{id}),
          // оставлены опциональными ради существующих вызовов downstream.
          wallet_id?: string;
          counterparty_account_id?: string;
        }

        export type Response = DestinationDetailItem;
      }

      export namespace Create {
        export interface ExternalBankingData {
          account_number: string;
          routing_number: string;
          bank_name: string;
          note: string;
          swift_bic: string;
        }
        // Тело создания задаём вручную: в спеке banking_data / crypto_data — пустые
        // плейсхолдеры (Record<string, never>), а наружу мы держим external_* контракт.
        // Реквизиты переиспользуют схемы листинга через Pick — отбираем только input-поля,
        // без серверных (created_at проставляет бэкенд) и read-only (crypto.currency).
        export interface Request {
          wallet_id?: string;
          counterparty_account_id: string;
          type: CounterpartyDestinationType;
          nickname?: string;
          external_banking_data?: Pick<
            List.DestinationListItemExternalBankingData,
            'account_number' | 'routing_number' | 'bank_name' | 'swift_bic' | 'iban' | 'sort_code' | 'note' | 'address'
          >;

          external_crypto_data?: Pick<List.DestinationListItemExternalCryptoData, 'currency_id' | 'address' | 'memo'>;

          internal_data?: Pick<List.DestinationInternalData, 'wallet_id' | 'description'>;
        }

        export type Response = Detail.DestinationDetailItem;
      }

      export namespace Delete {
        // Бэк убрал обязательный OTP request_id из квери delete-эндпоинта (раньше тянулся из спеки).
        // Оставляем его опциональным вручную, чтобы не ломать существующие вызовы.
        export type Request = {
          counterparty_destination_id: string;
          request_id?: string;
          wallet_id?: string;
          counterparty_account_id?: string;
        };

        export type Response = void;
      }

      export namespace Update {
        export type Request =
          pathsV1Frontend['/frontend/counterparty/destinations/{id}']['patch']['requestBody']['content']['application/json'] & {
            counterparty_destination_id: string;
            wallet_id?: string;
            counterparty_account_id?: string;
          };

        export type Response = Detail.DestinationDetailItem;
      }

      // GET /frontend/counterparty/destinations/{id}/internal-transfer — read-only проверка,
      // может ли получатель дестинации принять мгновенный internal-перевод. В спеке path-параметр
      // зовётся id — переименовываем его вручную в counterparty_destination_id ради единой семантики.
      export namespace InternalTransfer {
        export interface Request {
          counterparty_destination_id: string;
        }

        export type Response = componentsV1Frontend['schemas']['InternalTransferAvailability'];
      }
    }

    // Single-resource роуты (/accounts/{id}, /destinations/{id}) в спеке зовут path-параметр
    // просто id — переименовываем его вручную в counterparty_account_id / counterparty_destination_id,
    // чтобы держать единую семантику имён по всему SDK. Остальное (query, body) берём из спеки.
    export namespace GetById {
      export interface Request {
        counterparty_account_id: string;
        wallet_id?: string;
      }

      export type Response = CounterpartyWithDestinations;
    }

    export namespace List {
      export type Request =
        pathsV1Frontend['/frontend/counterparty/accounts/wallet/{wallet_id}']['get']['parameters']['path'] &
          NonNullable<
            pathsV1Frontend['/frontend/counterparty/accounts/wallet/{wallet_id}']['get']['parameters']['query']
          >;

      export type Response = {
        total: number;
        data: Counterparty[];
      };
    }

    export namespace Create {
      export type Request =
        pathsV1Frontend['/frontend/counterparty/accounts/wallet/{wallet_id}']['post']['parameters']['path'] &
          pathsV1Frontend['/frontend/counterparty/accounts/wallet/{wallet_id}']['post']['requestBody']['content']['application/json'];

      export type Response = Counterparty;
    }

    export namespace Update {
      export type Request =
        pathsV1Frontend['/frontend/counterparty/accounts/{id}']['patch']['requestBody']['content']['application/json'] & {
          counterparty_account_id: string;
          wallet_id?: string;
        };

      export type Response = Counterparty;
    }

    export namespace Delete {
      export interface Request {
        counterparty_account_id: string;
        wallet_id?: string;
      }

      // Фронт-модуль на удаление аккаунта возвращает только сообщение, без объекта контрагента.
      export type Response = { message: string };
    }
  }

  export namespace Currencies {
    interface CommonCurrencyFields {
      uuid: string;
      decimal: number | null;
      is_memo: boolean | null;
      is_stablecoin: boolean;
      is_enabled: boolean; // added
      render_decimal: number;
      meta: {
        icon: string;
        name: string;
        symbol: string;
        description: string;
      };
      type: CurrencyType; // moved
    }
    export interface CryptoCurrency extends CommonCurrencyFields {
      is_crypto: true;
      meta: CommonCurrencyFields['meta'] & {
        chain_id: number;
        contract: string;
        chain_name: string;
      };
    }
    export interface FiatCurrency extends CommonCurrencyFields {
      is_crypto: false;
      meta: CommonCurrencyFields['meta'] & {
        code: string;
        iso_code: number;
        sign: string;
      };
    }

    export type Currency = CryptoCurrency | FiatCurrency;

    export type CurrencyList = {
      count: number;
      data: Currency[];
    };

    // Упрощенная версия валюты (используется в некоторых эндпоинтах)
    export interface SimplifiedCurrency {
      icon?: string | null;
      name: string;
      uuid: string;
      symbol: string;
      decimal: number;
    }
  }

  export namespace Developer {
    export namespace ApiCode {
      export interface ApiCode {
        role: APIKeyRole | string;
        name: string;
        id: string;
        created_at: string;
        updated_at: string;
      }
      export namespace Create {
        export interface Request {
          name: string;
          role: APIKeyRole;
        }
        export interface Response extends ApiCode {
          apiKey: string;
          key_hash: string;
        }
      }

      export namespace Update {
        export interface Request {
          uuid: string;
          // name: string;
          role: APIKeyRole;
        }
      }

      export namespace Rotate {
        export interface Request {
          uuid: string;
        }
        export interface Response {
          apiKey: string;
        }
      }
    }

    export namespace Vendors {
      export interface Vendor {
        id: string;
        name: string;
        type: string;
        currency: string;
        currency_id: string;
      }
    }
  }

  export namespace Exchange {
    // export interface F2C {
    //   crypto_uuid: string;
    //   crypto_symbol: string;
    //   fiat_uuid: string;
    //   fiat_code: string;
    //   rate: number;
    //   min_amount: number;
    // }

    // export interface C2F {
    //   crypto_uuid: string;
    //   crypto_symbol: string;
    //   fiat_uuid: string;
    //   fiat_code: string;
    //   rate: number;
    //   min_amount: number;
    // }

    // export interface C2C {
    //   from_uuid: string;
    //   from_symbol: string;
    //   to_uuid: string;
    //   to_symbol: string;
    //   rate: number;
    //   min_amount: string;
    // }

    export interface Exchange {
      // id: number;
      updated_at: string;
      from: string;
      to: string;
      rate: number;
      inverted_rate: number;
      rate_source: string;
      from_uuid: string;
      to_uuid: string;
      min_amount: string;
      offramp_enabled: boolean;
      onramp_enabled: boolean;
    }
  }

  export namespace Frontend {
    export namespace Access {
      export namespace Keys {
        export interface Key {
          id: string;
          name: string;
          role: APIKeyRole;
          wallet_id: string;
          created_at: string;
          is_enabled: boolean;
        }

        export interface ExtendedKey extends Key {
          key: string;
        }

        export namespace Create {
          export type Request = {
            name: string;
            role: APIKeyRole;
            wallet_id: string;
          };
          export type Response = {
            success: boolean;
            data: API.Frontend.Access.Keys.ExtendedKey;
          };
        }

        export namespace List {
          export type Response = {
            success: boolean;
            data: API.Frontend.Access.Keys.Key[];
          };
        }

        export namespace Regenerate {
          export type Response = {
            success: boolean;
            data: API.Frontend.Access.Keys.ExtendedKey;
          };
        }

        export namespace Revoke {
          export type Response = {
            success: boolean;
            data: {
              id: string;
              revoked_at: string;
            };
          };
        }
      }
    }

    export namespace Issuing {
      type CardsRoot = pathsV1Frontend['/frontend/issuing/cards'];
      type CardRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}'];
      type CardFreezeRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}/freeze'];
      type CardUnfreezeRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}/unfreeze'];
      type CardLimitsRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}/limits'];
      type CardSensitiveRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}/sensitive'];
      type CardTransactionsRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}/transactions'];
      type SubAccountTransactionsRoot =
        pathsV1Frontend['/frontend/issuing/sub-accounts/{sub_account_id}/transactions'];
      type CardDepositRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}/deposit'];
      type CardWithdrawRoot = pathsV1Frontend['/frontend/issuing/cards/{card_id}/withdraw'];
      type SubAccountDepositRoot = pathsV1Frontend['/frontend/issuing/sub-accounts/{sub_account_id}/deposit'];
      type SubAccountWithdrawRoot = pathsV1Frontend['/frontend/issuing/sub-accounts/{sub_account_id}/withdraw'];
      type CardholdersRoot = pathsV1Frontend['/frontend/issuing/cardholders'];
      type CardholderRoot = pathsV1Frontend['/frontend/issuing/cardholders/{cardholder_id}'];
      type CardholderSubmitRoot = pathsV1Frontend['/frontend/issuing/cardholders/{cardholder_id}/submit'];
      type CardholderDocumentsUploadRoot = pathsV1Frontend['/frontend/issuing/cardholder-documents'];
      type CardholderAttachDocumentsRoot = pathsV1Frontend['/frontend/issuing/cardholders/{cardholder_id}/documents'];

      // The spec narrows the returned `status` to `PENDING | COMPLETE | FAILED`, but the handler
      // answers with the raw order status (`formatOrderResponse` -> `status: order.status`), so a
      // workflow-routed program reports `PROCESSING` — the card routes even document that. Widen to
      // the SDK's order-status union so an exhaustive `switch` cannot silently treat an in-flight
      // transfer as a failure.
      type WithOrderStatus<T extends { data?: { status?: string } }> = Omit<T, 'data'> & {
        data?: Omit<NonNullable<T['data']>, 'status'> & { status?: `${OrderStatuses}` };
      };

      export namespace SubAccounts {
        type SubAccountsRoot = pathsV1Frontend['/frontend/issuing/sub-accounts'];
        type SubAccountRoot = pathsV1Frontend['/frontend/issuing/sub-accounts/{sub_account_id}'];

        export namespace List {
          /** `ids` is comma-separated — a targeted read of specific sub-accounts through the list shape. */
          export type Request = NonNullable<SubAccountsRoot['get']['parameters']['query']>;
          export type Response = SubAccountsRoot['get']['responses']['200']['content']['application/json'];
          /**
           * A `fiat_accounts` row enriched with computed balances, currency and the program embed.
           * `issuing_program.cardholder_requirements` carries the program's cardholder KYC bar even
           * when the program is hidden from the caller's config listing (rail visibility, group
           * whitelist) — the sub-account payload is the one place it can always be read from.
           */
          export type SubAccount = NonNullable<Response['data']>[number];
        }

        // The byId response shape varies (external vendor resource vs the local fallback that
        // carries the program embed) — prefer `list` with `ids` for a stable local-first shape.
        export namespace Get {
          export type Request = {
            sub_account_id: string;
          };
          export type Response = SubAccountRoot['get']['responses']['200']['content']['application/json'];
        }

        export namespace Create {
          export type Request = SubAccountsRoot['post']['requestBody']['content']['application/json'];
          export type Response = SubAccountsRoot['post']['responses']['201']['content']['application/json'];
        }

        export namespace Transactions {
          export type Request = {
            sub_account_id: string;
          } & NonNullable<SubAccountTransactionsRoot['get']['parameters']['query']>;
          export type Response =
            SubAccountTransactionsRoot['get']['responses']['200']['content']['application/json'];
          export type Transaction = NonNullable<Response['data']>[number];
        }

        export namespace Deposit {
          export type Request = {
            sub_account_id: string;
          } & SubAccountDepositRoot['post']['requestBody']['content']['application/json'];
          export type Response = WithOrderStatus<
            SubAccountDepositRoot['post']['responses']['200']['content']['application/json']
          >;
        }

        export namespace Withdraw {
          export type Request = {
            sub_account_id: string;
          } & SubAccountWithdrawRoot['post']['requestBody']['content']['application/json'];
          export type Response = WithOrderStatus<
            SubAccountWithdrawRoot['post']['responses']['200']['content']['application/json']
          >;
        }
      }

      export namespace Cards {
        export namespace List {
          export type Request = NonNullable<CardsRoot['get']['parameters']['query']>;
          export type Response = CardsRoot['get']['responses']['200']['content']['application/json'];
          // Unlike the legacy `GET /issuing/cards` item, `sub_account.balance` here is read from the
          // B2B ledger (`issuing.sub_accounts.total_available`) — the same source as the sub-account
          // endpoint — so it matches what the card itself reports.
          export type Card = NonNullable<Response['data']>[number];
        }

        export namespace Get {
          export type Request = { card_id: string };
          export type Response = CardRoot['get']['responses']['200']['content']['application/json'];
          export type Card = NonNullable<Response['data']>;
        }

        /** Rename (and other editable card fields). */
        export namespace Update {
          export type Request = {
            card_id: string;
          } & CardRoot['patch']['requestBody']['content']['application/json'];
          export type Response = CardRoot['patch']['responses']['200']['content']['application/json'];
        }

        /** Close the card — terminal, unlike freeze. */
        export namespace Close {
          export type Request = { card_id: string };
          export type Response = CardRoot['delete']['responses']['200']['content']['application/json'];
        }

        export namespace Freeze {
          export type Request = { card_id: string };
          export type Response = CardFreezeRoot['put']['responses']['200']['content']['application/json'];
        }

        export namespace Unfreeze {
          export type Request = { card_id: string };
          export type Response = CardUnfreezeRoot['put']['responses']['200']['content']['application/json'];
        }

        export namespace Limits {
          export type Request = {
            card_id: string;
          } & CardLimitsRoot['put']['requestBody']['content']['application/json'];
          export type Response = CardLimitsRoot['put']['responses']['200']['content']['application/json'];
        }

        /**
         * Card PAN/CVV in PLAINTEXT. Server-to-server only — a browser or mobile client
         * should use `SensitiveEncrypted`, which never puts the PAN in a readable body.
         */
        export namespace Sensitive {
          export type Request = { card_id: string };
          export type Response = CardSensitiveRoot['get']['responses']['200']['content']['application/json'];
        }

        /**
         * Card PAN/CVV over an end-to-end encrypted channel: the client's AES-256 key is
         * sent encrypted to the server's RSA public key, and the answer comes back
         * encrypted with that same key. The SDK does the key exchange and the decryption,
         * so the caller just receives the decrypted payload.
         */
        export namespace SensitiveEncrypted {
          export type Request = { card_id: string };
          export type Response = API.Cards.SensitiveData;
        }

        export namespace Transactions {
          export type Request = {
            card_id: string;
          } & NonNullable<CardTransactionsRoot['get']['parameters']['query']>;
          export type Response = CardTransactionsRoot['get']['responses']['200']['content']['application/json'];
          export type Transaction = NonNullable<Response['data']>[number];
        }

        // Unified create: the endpoint routes to the balance or prepaid flow by the program's
        // `sub_account_type`, so the client never branches on card type. Replaces the legacy
        // `issuing.cards.create.*` (POST /issuing/cards/create|balance) methods.
        export namespace Create {
          // The spec marks `cardholder_id` required, but the handler equally accepts
          // `assigned_user_data_uuid` (or the caller's own identity) and resolves the cardholder
          // LINKED to that user via issuing_cardholder_links — provision the cardholder first
          // through `frontend.issuing.cardholders`. The money fields were added in SFI-2129 and
          // may lag in the deployed spec, so they are declared here explicitly.
          export type Request = Omit<
            CardsRoot['post']['requestBody']['content']['application/json'],
            'cardholder_id'
          > & {
            cardholder_id?: string;
            /** Card assignee (`user_data.uuid`); their linked cardholder is used. */
            assigned_user_data_uuid?: string;
            /**
             * TOTAL wallet debit at issuance (fee + card top-up). Accepted only on group
             * tariffs that already mandate an initial top-up. Requires `currency_id`.
             */
            initial_topup?: number;
            /** Wallet currency to debit; required whenever the tariff has a fee or a top-up. */
            currency_id?: string;
            /** Client-generated id stored with the card (idempotency/tracing reference). */
            request_id?: string;
          };
          // 201 data is the same decorated shape as GET /cards/{card_id}: `data.id` is the card
          // id, `data.sub_account_id` the (possibly just-provisioned) sub-account. The top-up
          // outcome fields were added in the SFI-2129 review round and may lag in the deployed
          // spec, so they are declared here explicitly.
          export type Response = CardsRoot['post']['responses']['201']['content']['application/json'] & {
            /**
             * Outcome of the tariff-mandated initial top-up when the tariff moved money:
             * `topup_skipped` when no top-up applied, `topup_failed` when the card was created
             * but the top-up could not be executed — a 201 alone is NOT proof the card is funded.
             */
            initial_topup_status?: 'completed' | 'topup_failed' | 'topup_skipped';
            /** Why the top-up failed; populated when `initial_topup_status` is `topup_failed`. */
            initial_topup_error?: string;
          };
        }

        export namespace Deposit {
          export type Request = {
            card_id: string;
          } & CardDepositRoot['post']['requestBody']['content']['application/json'];
          // The spec documents no `200` body for the card-level wrappers, but the controller resolves
          // the sub-account from `card_id` and then `return`s the sub-account handler
          // (`IssuingV2SubAccountController.depositByCard` -> `.deposit`), so the body is identical.
          export type Response = SubAccounts.Deposit.Response;
        }

        export namespace Withdraw {
          export type Request = {
            card_id: string;
          } & CardWithdrawRoot['post']['requestBody']['content']['application/json'];
          export type Response = SubAccounts.Withdraw.Response;
        }
      }

      // Cardholder create flow is three steps: create the DRAFT (`Create`), upload + attach the KYC
      // files (`Documents.Upload` -> `Documents.Attach`, or upload before the draft exists), then
      // `Submit` to register at the vendor. See the endpoint descriptions in the OpenAPI spec.
      export namespace Cardholders {
        // The deployed schema documents only the identity subset; the wire actually carries the
        // flattened cardholder record + flat vendor fields + the CORE annotations (SFI-2129).
        // Widened here until the spec regen catches up — the extension mirrors the backend's
        // `CardholderWire`.
        export type Cardholder = componentsV1Frontend['schemas']['IssuingCardholder'] & {
          created_at?: string;
          wallet_id?: string | null;
          issuing_program_id?: string | null;
          /** DRAFT until the cardholder is submitted and registered at the vendor. */
          status?: 'DRAFT' | 'ACTIVE';
          gender?: string | null;
          cardholder_relationship?: 'EMPLOYEE' | 'CONTRACTOR' | null;
          address?: {
            line1?: string;
            line2?: string | null;
            city?: string;
            state?: string | null;
            postal_code?: string;
            country?: string;
          } | null;
          gov_id_type?: string | null;
          gov_id_number?: string | null;
          gov_id_country?: string | null;
          gov_id_issuance_date?: string | null;
          gov_id_expiration_date?: string | null;
          /** Personal tax id (US: SSN) — independent of the gov_id document. */
          tax_identification_number?: string | null;
          kyc_documents?: {
            type?: 'selfie' | 'gov_id_front' | 'gov_id_back';
            filename?: string | null;
            content_type?: string;
            size?: number;
            uploaded_at?: string;
          }[];
          /**
           * Fields the program's KYC bar still wants (submit 400 `missing` vocabulary, e.g.
           * `address.line1`, `documents: selfie`) — what the completion form should collect.
           */
          missing_kyc_fields?: string[];
          /** CORE user this cardholder is linked to; null for manually-created cardholders. */
          user_data_uuid?: string | null;
          vendor_id?: string | null;
          vendor_name?: string | null;
          vendor_type?: string | null;
          /** Vendor-side cardholder id; null while a review is pending. */
          vendor_user_id?: string | null;
          vendor_status?: string | null;
          review_status?: string | null;
          reject_reason?: string | null;
        };

        // Swap the thin spec schema for the widened `Cardholder` in a response envelope.
        type WithCardholder<T extends { data?: unknown }> = Omit<T, 'data'> & { data?: Cardholder };
        type WithCardholderList<T extends { data?: unknown }> = Omit<T, 'data'> & { data?: Cardholder[] };

        export namespace List {
          export type Request = NonNullable<CardholdersRoot['get']['parameters']['query']> & {
            /**
             * Only cardholders LINKED to this CORE user (`user_data.uuid`). Manually created
             * cardholders have no link and never match. Added in SFI-2129.
             */
            user_data_id?: string;
          };
          export type Response = WithCardholderList<
            CardholdersRoot['get']['responses']['200']['content']['application/json']
          >;
        }

        // On a duplicate (same email + wallet + issuing_program) the endpoint answers `409` and
        // the error body carries an optional `error.details.cardholder_id` — the existing
        // cardholder to adopt instead of dead-ending (that identity key is not client-searchable).
        // The SDK does not type error envelopes, so the field is documented here rather than declared.
        export namespace Create {
          export type Request = CardholdersRoot['post']['requestBody']['content']['application/json'];
          export type Response = WithCardholder<
            CardholdersRoot['post']['responses']['201']['content']['application/json']
          >;
        }

        export namespace Get {
          export type Request = {
            cardholder_id: string;
          } & NonNullable<CardholderRoot['get']['parameters']['query']>;
          export type Response = WithCardholder<
            CardholderRoot['get']['responses']['200']['content']['application/json']
          >;
        }

        // PATCH /frontend/issuing/cardholders/{cardholder_id} — complete a DRAFT's dossier
        // (address / phone / email / tax id / gov_id fields) before submitting it. Not in the
        // deployed spec yet, so declared by hand.
        export namespace Update {
          export type Request = {
            cardholder_id: string;
            /** Query param — the wallet the cardholder belongs to (ADMIN role required). */
            wallet_id: string;
          } & Partial<
            Pick<
              Create.Request,
              | 'first_name'
              | 'last_name'
              | 'email'
              | 'phone'
              | 'birth_date'
              | 'nationality'
              | 'gender'
              | 'cardholder_relationship'
              | 'address'
              | 'gov_id_type'
              | 'gov_id_number'
              | 'gov_id_country'
              | 'gov_id_issuance_date'
              | 'gov_id_expiration_date'
              | 'tax_identification_number'
            >
          >;
          export type Response = { success?: boolean; data?: Cardholder; message?: string };
        }

        // POST /frontend/issuing/cardholders/eligibility — batch verdicts for a member picker
        // ("can a card be issued to this user, and if not, what stands in the way"). Computed
        // from local data only; the created draft's `missing_kyc_fields` stays authoritative.
        // Not in the deployed spec yet, so declared by hand.
        export namespace Eligibility {
          export type Verdict =
            /** An ACTIVE cardholder is linked — create the card right away. */
            | 'READY'
            /** A draft is linked — complete `will_require`, submit, then create the card. */
            | 'DRAFT'
            /** No cardholder yet, but the member clears the creation gates. */
            | 'CAN_CREATE'
            /** A verification review is in flight; wait. */
            | 'PENDING'
            /** No approved verification or no KYC applicant — the member must verify. */
            | 'NEEDS_VERIFICATION'
            /**
             * The member IS verified, but not to the level THIS program demands (a
             * required document — usually the selfie — was never captured). Same
             * remediation as NEEDS_VERIFICATION; read the program's
             * `cardholder_requirements.level` to name the bar ("requires FULL").
             */
            | 'NEEDS_VERIFICATION_UPGRADE'
            /**
             * A verification came back with a FINAL rejection — only support can
             * reset it. Never render an actionable "verify now" for this state.
             */
            | 'REJECTED'
            /** Not an active member of this wallet. */
            | 'NOT_MEMBER';

          export type Request = {
            wallet_id: string;
            issuing_program_id: string;
            /** user_data uuids of the members to evaluate, max 100 per request. */
            user_data_ids: string[];
          };

          export type Item = {
            user_data_id: string;
            verdict: Verdict;
            /** The linked cardholder for READY/DRAFT verdicts, null otherwise. */
            cardholder_id: string | null;
            /** Fields to collect by hand (submit `missing` vocabulary). */
            will_require: string[];
            /**
             * The KYC level this program demands, named for the copy on a
             * NEEDS_VERIFICATION_UPGRADE row. Prefer the program's
             * `cardholder_requirements.level` when the program is in hand; this is
             * the same value carried on the verdict for convenience. Null when the
             * program bar could not be read.
             */
            required_level?: 'minimal' | 'basic' | 'full' | null;
          };

          export type Response = { success?: boolean; data?: Item[] };
        }

        export namespace Delete {
          export type Request = {
            cardholder_id: string;
          } & NonNullable<CardholderRoot['delete']['parameters']['query']>;
          export type Response = CardholderRoot['delete']['responses']['200']['content']['application/json'];
        }

        export namespace Submit {
          export type Request = {
            cardholder_id: string;
          } & CardholderSubmitRoot['post']['parameters']['query'];
          export type Response = WithCardholder<
            CardholderSubmitRoot['post']['responses']['200']['content']['application/json']
          >;
        }

        export namespace Documents {
          // 'selfie' | 'gov_id_front' | 'gov_id_back' — derived from the multipart form fields so a
          // new document type in the spec shows up here automatically.
          export type DocumentType =
            keyof CardholderDocumentsUploadRoot['post']['requestBody']['content']['multipart/form-data'];

          export namespace Upload {
            // The spec types the multipart fields as binary strings; on the client they must be the
            // actual File/Blob the camera produced (the vendor review rejects re-encoded photos).
            export type Request = {
              wallet_id: string;
            } & { [K in DocumentType]?: File | Blob };
            export type Response =
              CardholderDocumentsUploadRoot['post']['responses']['201']['content']['application/json'];
            export type Document = NonNullable<NonNullable<Response['data']>['documents']>[number];
          }

          export namespace Discard {
            export type Request = {
              document_id: string;
              wallet_id: string;
            };
          }

          export namespace Attach {
            export type Request = {
              cardholder_id: string;
              wallet_id: string;
            } & CardholderAttachDocumentsRoot['post']['requestBody']['content']['application/json'];
            // The spec leaves `data` as an empty object, but the endpoint documents (and returns)
            // the updated cardholder with refreshed kyc_documents — widen it accordingly.
            type RawResponse = CardholderAttachDocumentsRoot['post']['responses']['200']['content']['application/json'];
            export type Response = Omit<RawResponse, 'data'> & { data?: Cardholder };
          }
        }
      }

      export namespace Config {
        export namespace Programs {
          type ProgramsRoot = pathsV1Frontend['/frontend/issuing/config/programs'];
          type ProgramByIdRoot = pathsV1Frontend['/frontend/issuing/config/programs/{id}'];

          /**
           * A program as the frontend config route returns it — including `cardholder_requirements`
           * (the per-program cardholder KYC bar) and `kyc_rails_id` (the wallet UI hides programs on
           * a closed/rejected rail). Both come straight from the generated spec.
           */
          export type Program = NonNullable<
            ProgramsRoot['get']['responses']['200']['content']['application/json']['data']
          >[number];

          /**
           * The per-program cardholder KYC bar (`level` / `required` / `required_documents` /
           * `country_rules`). Set in the program's vendor config, so it can change without a
           * release — read it instead of hardcoding the form.
           */
          export type CardholderRequirements = NonNullable<Program['cardholder_requirements']>;

          /** The KYC level a program demands. */
          export type CardholderKycLevel = NonNullable<CardholderRequirements['level']>;

          /** What each country changes about the cardholder dossier (a `country_rules` entry). */
          export type CountryRule = NonNullable<NonNullable<CardholderRequirements['country_rules']>[string]>;

          export namespace List {
            export type Request = NonNullable<ProgramsRoot['get']['parameters']['query']>;
            export type Response = ProgramsRoot['get']['responses']['200']['content']['application/json'];
          }

          export namespace Get {
            export type Request = {
              id: string;
            } & NonNullable<ProgramByIdRoot['get']['parameters']['query']>;
            export type Response = ProgramByIdRoot['get']['responses']['200']['content']['application/json'];
            /**
             * The byId payload: the same program fields as the list item, but `order_types` is the
             * DETAILED form ({id, tokens}) — flatten to ids when a list-shaped Program is needed.
             */
            export type Data = NonNullable<Response['data']>;
          }
        }
      }
    }
  }

  // export namespace SubAccountsV2 {
  //   export type SubAccountDetails = {
  //     iban: string;
  //     bank_name: string;
  //     swift_code: string;
  //     bank_address: string;
  //     receiver_name: string;
  //     payment_details: string;
  //     reference_number: string;
  //     registration_number: string;
  //   };

  //   export interface SubAccount {
  //     balance: number;
  //     cards_count: number;
  //     created_at: string;
  //     currency: API.Currencies.FiatCurrency;
  //     fiat_balance: number;
  //     id: string;
  //     issuing_program: API.Cards.Config.Program;
  //     nick_name: string;
  //     program_id: string;
  //     realtimeauth_balance: number;
  //     status: string;
  //     total_balance: number;
  //     wallet_id: string;
  //   }

  //   export namespace ExtendedSubAccount {
  //     export interface ExtendedSubAccount extends SubAccount {
  //       account_details?: SubAccountDetails;
  //       payment_types: Array<{ order_type: OrderType }>;
  //       realtime_auth: [
  //         {
  //           crypto_token: string;
  //           fiat_account: string;
  //           id: string;
  //           priority: number;
  //         }
  //       ];
  //     }
  //     export interface Request {
  //       wallet_uuid: string;
  //       fiat_account_id: string;
  //     }

  //     export type Response = ExtendedSubAccount;
  //   }

  //   export interface SubAccountWithCards extends SubAccount {
  //     cards: API.Cards.IssuingCardListItem[];
  //   }

  //   export interface SubAccountsList<T extends SubAccount | SubAccountWithCards> {
  //     count: number;
  //     data: T[];
  //   }

  //   export type SubAccountsListWithCards = SubAccountsList<SubAccountWithCards>;
  //   export type SubAccountsListWithoutCards = SubAccountsList<SubAccount>;

  //   export namespace CreateSubAccount {
  //     export interface Request {
  //       wallet_id: string;
  //       program_id: string;
  //     }
  //     export type Response = {
  //       id: string;
  //       balance: number;
  //       nick_name: string;
  //       wallet_id: string;
  //       created_at: string;
  //       account_currency: string;
  //       type: SubAccountType | string;
  //       program_id: string;
  //       status: 'ACTIVE';
  //       fiat: {
  //         code: string;
  //         uuid: string;
  //         symbol: string;
  //         enabled: boolean;
  //         coingecko: string;
  //       };
  //       issuing_program: {
  //         id: string;
  //         form_factor: CardFormFactor | string;
  //         brand: string;
  //         tokenizable: boolean;
  //         type: CardType | string;
  //       };
  //     };
  //   }

  //   export namespace Transactions {
  //     // export type Transaction = API.Cards.TransactionItem;
  //     export type Transaction = {
  //       vendor_transaction_id: string;
  //       created_at: string;
  //       cleared_at: string;
  //       merchant: {
  //         name: string;
  //         category_code: string;
  //         city: string;
  //         country: string;
  //       };
  //       last4: string;
  //       title: string;
  //       billing_amount: number;
  //       billing_currency: string;
  //       transaction_amount: number;
  //       transaction_currency: string;
  //       vendor_sub_account_id: string;
  //       failure_reason: string;
  //       status: string;
  //       transaction_type: string;
  //       is_credit: boolean;
  //       has_receipt: boolean;
  //       adjustment_type: string;
  //       review_status: string;
  //       group: string;
  //       total_amount: number;
  //     };

  //     export namespace TransactionList {
  //       export interface Request {
  //         fiat_account_id: string;
  //         wallet_uuid: string;
  //         limit?: number;
  //         offset?: number;
  //       }
  //       export interface Response {
  //         count: number;
  //         data: Transaction[];
  //         has_more: boolean;
  //       }
  //     }
  //   }
  // }

  export namespace Issuing {
    export namespace Programs {
      export type Request = {
        wallet_id: string;
      };
      export type Response = {
        count: number;
        data: API.Cards.Config.Program[];
      };
    }

    export namespace SubAccounts {
      export type Transaction = API.Cards.TransactionItem;
      export type SubAccountDetails = {
        iban: string;
        bank_name: string;
        swift_code: string;
        bank_address: string;
        receiver_name: string;
        payment_details: string;
        reference_number: string;
        registration_number: string;
      };
      export type SubAccountCryptoDetails = {
        currency_id: string;
        deposit_address: string;
        chain_id: number;
        memo?: string;
      };

      export namespace TransactionList {
        export interface Request {
          sub_account_id: string;
          limit: number;
          offset: number;
          card_id?: string;
          from_timestamp?: string;
          to_timestamp?: string;
          status?: string;
        }
        export interface Response {
          count: number;
          data: Transaction[];
          has_more: boolean;
        }
      }
      export interface SubAccount {
        balance: number;
        cards_count: number;
        created_at: string;
        currency: API.Currencies.FiatCurrency;
        fiat_balance: number;
        type: SubAccountType | string;
        id: string;
        // payment_types: Array<{ order_type: OrderType }>; deprecated, use order_types inside issuing_program
        issuing_program: API.Cards.Config.Program;
        nick_name: string;
        program_id: string;
        realtime_auth: [
          {
            crypto_token: string;
            fiat_account: string;
            id: string;
            priority: number;
          },
        ];
        realtimeauth_balance: number;
        status: string;
        total_balance: number;
        wallet_id: string;
        account_details?: SubAccountDetails;
        crypto_details?: SubAccountCryptoDetails[];
      }

      export namespace WithCards {
        export interface SubAccountWithCards extends SubAccount {
          cards: API.Cards.IssuingCardListItem[];
        }
        export interface Response {
          count: number;
          data: SubAccountWithCards[];
          has_more: boolean;
        }
      }
      export namespace WithoutCards {
        export interface Request {
          wallet_uuid: string;
          limit: number;
          offset: number;
          type?: SubAccountType;
        }
        export interface Response {
          count: number;
          data: SubAccount[];
          has_more: boolean;
        }
      }
    }
  }

  export namespace KYC {
    export type KYCStatus = components['schemas']['KycEntityDto']['status'];
    type InitDataCollectionEndpoint = paths['/kyc/init/{wallet_id}/{type}']['post'];
    type ResumeDataCollectionEndpoint = paths['/kyc/resume/{wallet_id}/{verification_ref}']['post'];

    export namespace DataCollection {
      export type Type = InitDataCollectionEndpoint['parameters']['path']['type'];

      export namespace Init {
        export type Request = InitDataCollectionEndpoint['parameters']['path'];
        export type Response = InitDataCollectionEndpoint['responses']['200']['content']['application/json'];
      }

      export namespace Resume {
        export type Request = ResumeDataCollectionEndpoint['parameters']['path'];
        export type Response = ResumeDataCollectionEndpoint['responses']['200']['content']['application/json'];
      }
    }

    export namespace Sumsub {
      export namespace GenerateToken {
        export interface Request {
          user_data_id: number;
        }
        export interface Response extends Request {
          token: string;
        }
      }
    }

    export namespace Entity {
      export type Entity = components['schemas']['KycEntityDto'];
      export namespace Get {
        export type Request = operations['KycEntitiesController_findOne']['parameters']['path'];
        export type Response =
          operations['KycEntitiesController_findOne']['responses']['200']['content']['application/json'];
      }
    }
    export namespace Forms {
      export namespace FormField {
        export type FormFieldType =
          | 'text'
          | 'email'
          | 'password'
          | 'radio'
          | 'select'
          | 'checkbox'
          | 'textarea'
          | 'number'
          | 'date'
          | 'switch'
          | 'file';

        export interface FormFieldValidation {
          pattern?: string;
          min?: number;
          max?: number;
          min_length?: number;
          max_length?: number;
          message?: string;
        }

        export interface FormFieldOption {
          label: string;
          value: string;
        }
        export interface FormField {
          name: string;
          type: FormFieldType;
          label: string;
          placeholder?: string;
          required?: boolean;
          order?: number;
          options?: FormFieldOption[];
          rows?: number;
          value?: string;
          accept?: string;
          validation?: FormFieldValidation;
        }
      }

      export namespace FormGroup {
        export type FormGroupFieldType = 'group' | 'field';
        export interface FormGroupFieldGroup {
          type: 'group';
          fields: API.KYC.Forms.FormGroup.FormGroup[];
        }
        export interface FormGroupFieldField {
          type: 'field';
          field: API.KYC.Forms.FormField.FormField;
        }
        export interface FormGroup {
          name?: string;
          isArray?: boolean;
          label: string;
          fields: Array<FormGroupFieldGroup | FormGroupFieldField>;
        }
      }
    }

    export namespace Rails {
      export type RailStatus = components['schemas']['WalletKycRailDto']['status'];

      export type WalletRail = components['schemas']['WalletKycRailDto'];
      export type WalletRailExtraActions = components['schemas']['WalletKycRailExtraActionDto'];

      export type WalletRailTermsAndConditions = components['schemas']['WalletKycRailTermsAndConditionsDto'];

      export namespace RailInfo {
        export type RailInfo = components['schemas']['WalletKycRailTypeDto'];

        export namespace SingleRail {
          export type Request = operations['WalletKycRailsController_findOne']['parameters']['path'];
          export type Response = RailInfo;
        }

        export namespace List {
          export type Request = {
            wallet_id: string;
          };
          export type Response = components['schemas']['GetWalletKycRailsResponseDto'];
        }
      }

      export namespace Submit {
        export namespace Single {
          export type Request = operations['WalletKycRailsController_findOne']['parameters']['path'];
          export type Response = components['schemas']['WalletKycRailTypeDto'];
        }
      }

      export namespace Terms {
        export namespace Confirm {
          export type Request = operations['WalletKycRailsController_confirmTermsAndConditions']['parameters']['path'];
          export type Response = components['schemas']['WalletKycRailTypeDto'];
        }
      }
    }
  }

  export namespace Location {
    export namespace Countries {
      export interface Country {
        id: number;
        capital: string;
        currency: string;
        currency_name: string;
        currency_symbol: string;
        emoji: string;
        emojiU: string;
        flag: number;
        iso2: string;
        iso3: string;
        latitude: number;
        longitude: number;
        name: string;
        nationality: string;
        native: string;
        numeric_code: string;
        phonecode: string;
        region: string;
        region_id: number;
        subregion: string;
        subregion_id: number;
        timezones: object[]; // TODO: add type
        tld: string;
        translations: object[]; // TODO: add type
        wikiDataId: string;
      }

      export namespace List {
        export type Response = {
          total: number;
          data: Country[];
        };
      }
    }
    export namespace States {
      export type State = components['schemas']['StateDto'];
      export namespace List {
        export type Request = operations['SystemController_states']['parameters']['path'];
        export type Response = operations['SystemController_states']['responses']['200']['content']['application/json'];
      }
    }
  }
  export namespace Orders {
    export namespace Create {
      export namespace ByOrderType {
        export namespace INTERNAL_TRANSFER {
          export interface Request {
            amount: number;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
          }

          export interface Response {
            created_at: string;
            order_uuid: string;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
            amount_from: number;
            order_type: 'EXCHANGE_CRYPTO_INTERNAL';
            status: OrderStatus;
            amount_to: number;
            info: string;
            meta: {
              fee: number;
              order_uuid: string;
              to_address: string;
              fee_currency: string;
              billing_amount: number;
              transaction_amount: number;
              billing_amount_currency: string;
              transaction_amount_currency: string;
              network_fee: number;
            };
            id: string;
          }
        }

        export namespace TRANSFER_CARD_PREPAID {
          // NOT USED
          export interface Request {
            amount: number;
            wallet_uuid: string;
            card_id: string;
          }

          export interface Response {
            created_at: string;
            order_uuid: string;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
            amount_from: number;
            order_type: 'TRANSFER_CARD_PREPAID';
            status: OrderStatus;
            amount_to: number;
            info: string;
            meta: {
              fee: number;
              order_uuid: string;
              fee_currency: string;
              exchange_rate: number;
              billing_amount: number;
              vendor_id: string;
              transaction_amount: number;
              billing_currency: string;
              transaction_currency: string;
              network_fee: number;
            };
            id: string;
          }
        }

        export namespace OMNIBUS_CRYPTO_WITHDRAWAL {
          export interface Request {
            idempotency_key: string;
            counterparty_account_id: string;
            amount: number;
            wallet_uuid: string;
            currency_id: string;
            memo?: string;
            note?: string;
          }

          export interface Response {
            created_at: string;
            order_uuid: string;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
            amount_from: number;
            order_type: 'OMNIBUS_CRYPTO_WITHDRAWAL';
            status: OrderStatus;
            amount_to: number;
            info: string;
            meta: {
              fee: number;
              order_uuid: string;
              to_address: string;
              fee_currency: string;
              idempotency_key: string;
              counterparty_account_id: string;
              billing_amount: number;
              billing_currency: string;
              transaction_amount: number;
              transaction_currency: string;
              network_fee: number;
            };
            id: string;
          }
        }

        export namespace TRANSFER_CARD_SUBACCOUNT {
          export type Request = {
            amount: number;
            wallet_uuid: string;
            from_uuid: string;
            sub_account_id: string;
          };

          export type Response = {
            id: number;
            created_at: string;
            order_uuid: string;
            wallet_uuid: string;
            fiat_uuid: string;
            crypto_uuid: string;
            amount_fiat: number;
            payment_method: string;
            redirect_url: string;
            status: string;
            provider_uuid: string;
          };
        }
        export namespace WITHDRAWAL_CRYPTO {
          export type Request = {
            amount: number;
            is_subsctract: boolean;
            is_reverse: boolean;
            wallet_uuid: string;
            crypto_uuid: string;
            to_address: string;
            memo?: string;
            note?: string;
          };

          export type Response = {
            id: number;
            created_at: string;
            order_uuid: string;
            wallet_uuid: string;
            crypto_uuid: string;
            amount: number;
            status: string;
            network: string;
            to_address: string;
            txid: string;
          };
        }
        export namespace EXCHANGE_CRYPTO_INTERNAL {
          export type Request = {
            amount: number;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
          };
          export type Response = {
            id: number;
            // TODO: add response
          };
        }

        export namespace EXCHANGE_OMNI {
          export type Request = {
            amount: number;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
          };
          export type Response = {
            created_at: string;
            order_uuid: string;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
            amount_from: number;
            order_type: 'EXCHANGE_OMNI';
            status: OrderStatus;
            amount_to: number;
            info: string;
            meta: {
              fee: number;
              order_uuid: string;
              to_address: string;
              fee_currency: string;
              billing_amount: number;
              transaction_amount: number;
              billing_amount_currency: string;
              transaction_amount_currency: string;
              network_fee: number;
            };
            id: string;
          };
        }

        export namespace TRANSFER_CARD_WHOLESALE {
          export type Request = {
            amount: number;
            wallet_id: string;
            currency_id: string;
            vendor_id: string;
          };
          export type Response = null;
        }

        export namespace TBD_SWIFT_WITHDRAWAL {
          export type Request = {
            amount: number;
            wallet_uuid: string;
            currency_id: string;
          };
          export type Response = null;
        }
        export namespace WITHDRAW_CARD_PREPAID {
          export type Request = {
            amount: number;
            wallet_uuid: string;
            card_id: string;
          };

          export type Response = null;
        }

        export namespace WITHDRAW_CARD_SUBACCOUNT {
          export type Request = {
            amount: number;
            wallet_uuid: string;
            sub_account_id: string;
          };

          export type Response = null;
        }
      }
    }
    export namespace Calc {
      interface CommonRequestParams {
        from_currency: string;
        to_currency: string;
        amount: number;
        is_reverse?: boolean;
        signal?: AbortSignal;
      }

      export interface WithdrawCryptoRequest extends CommonRequestParams {
        order_type:
          | OrderType.WITHDRAWAL_CRYPTO
          | OrderType.TRANSFER_INTERNAL
          | OrderType.OMNIBUS_CRYPTO_TRANSFER
          | OrderType.SEGREGATED_CRYPTO_TRANSFER;
        to_address?: string;
      }

      export interface NonWithdrawCryptoRequest extends CommonRequestParams {
        order_type: Exclude<OrderType, OrderType.WITHDRAWAL_CRYPTO>;
        to_address?: never;
      }

      export type Request = NonWithdrawCryptoRequest | WithdrawCryptoRequest;
      export interface Response {
        from_currency: string;
        to_currency: string;
        from_symbol: string;
        to_symbol: string;
        from_amount: number;
        net_amount: number;
        result_amount: number;
        fees: number;
        comission: number;
        base_markup: number;
        network_fee: number;
        transaction_fee: number;
        rate: number;
        direction: 'c2f' | 'f2c' | 'c2c';
      }
    }

    export type OrderStatus = 'NEW' | 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE' | 'ERROR' | 'FAILED';

    export namespace OrderTypes {
      export type OrderTypeKycRail = {
        id: string;
        kyc_rail_id: string;
      };
      export interface OrderInfo {
        id: string;
        transaction_type: string | null;
        description: string | null;
        direction: 'deposit' | 'withdrawal';
        is_internal: boolean;
        // kyc_rails_id: string | null; // deprecated use order_types_kyc_rails instead
        order_types_kyc_rails: OrderTypeKycRail[];
        payment_method: API.Orders.V2.OrderTypes.PaymentMethod;
        /** Optional minimum amount the product should allow for this order type */
        min_amount: number | null;
        /** Optional maximum amount the product should allow for this order type */
        max_amount: number | null;
        /** Whether payouts for this order type are limited to the wallet owner's own account */
        first_party_only: boolean;
      }

      export namespace List {
        export type Response = OrderInfo[];
      }
    }

    // export namespace OffRamp {
    //   // deprecated
    //   export interface Item {
    //     id: number;
    //     created_at: string;
    //     order_uuid: string;
    //     wallet_uuid: string;
    //     fiat_uuid: string;
    //     crypto_uuid: string;
    //     amount_fiat: number;
    //     payment_method: string;
    //     card_number: string;
    //     status: string;
    //     provider_uuid: string;
    //   }
    //   export interface Request {
    //     amount: number;
    //     wallet_uuid: string;
    //     crypto_uuid: string;
    //     fiat_uuid: string;
    //     card_number: string;
    //     is_subtract: boolean;
    //   }
    //   export type Response = Item;
    // }

    export namespace Status {
      export interface Response {
        id: number;
        created_at: string;
        order_uuid: string;
        wallet_uuid: string;
        crypto_uuid: string;
        status: OrderStatus;
        amount: number;
        comission: number;
        net_amount: number;
        type: OrderType | string;
      }
    }

    // export namespace OrdersIssuing { // deprecated
    //   export namespace Topup {
    //     export namespace Internal {
    //       export namespace Card {
    //         export type Request = {
    //           amount: number;
    //           fiat_uuid: string;
    //           wallet_uuid: string;
    //           crypto_uuid: string;
    //           card_id: string;
    //           is_subtract: boolean;
    //         };
    //         export interface Response {
    //           id: number;
    //           created_at: string;
    //           order_uuid: string;
    //           wallet_uuid: string;
    //           fiat_uuid: string;
    //           crypto_uuid: string;
    //           amount_fiat: number;
    //           payment_method: string;
    //           status: string;
    //           provider_uuid: string;
    //           card_number: string;
    //           amount_crypto: number;
    //           comission: number;
    //         }
    //       }

    //       export namespace SubAccount {
    //         export type Request = {
    //           amount: number;
    //           fiat_uuid: string;
    //           wallet_uuid: string;
    //           crypto_uuid: string;
    //           fiat_account_id: string;
    //           is_subtract: boolean;
    //         };

    //         export interface Response {
    //           id: number;
    //           created_at: string;
    //           order_uuid: string;
    //           wallet_uuid: string;
    //           fiat_uuid: string;
    //           crypto_uuid: string;
    //           amount_fiat: number;
    //           payment_method: string;
    //           status: string;
    //           provider_uuid: string;
    //           card_number: string;
    //           amount_crypto: number;
    //           comission: number;
    //         }
    //       }
    //     }
    //   }
    // }
    export namespace V2 {
      export interface Document {
        url: string;
        description: string;
      }
      export namespace Calc {
        interface CommonRequestParams {
          from_currency_id: string;
          to_currency_id: string;
          amount: number;
          is_reverse: boolean;
          is_subtract: boolean;
          signal?: AbortSignal;
        }

        export interface WithdrawCryptoRequest extends CommonRequestParams {
          order_type:
            | OrderType.WITHDRAWAL_CRYPTO
            | OrderType.TRANSFER_INTERNAL
            | OrderType.OMNIBUS_CRYPTO_TRANSFER
            | OrderType.SEGREGATED_CRYPTO_TRANSFER;
          to_address?: string;
        }

        export interface NonWithdrawCryptoRequest extends CommonRequestParams {
          order_type: Exclude<OrderType, OrderType.WITHDRAWAL_CRYPTO>;
          to_address?: never;
        }

        export type Request = NonWithdrawCryptoRequest | WithdrawCryptoRequest;
        export interface Response {
          from_currency: string;
          to_currency: string;
          from_symbol: string;
          to_symbol: string;
          from_amount: number;
          net_amount: number;
          result_amount: number;
          fees: number;
          comission: number;
          base_markup: number;
          network_fee: number;
          transaction_fee: number;
          rate: number;
          direction: 'c2f' | 'f2c' | 'c2c';
        }
      }

      export namespace Create {
        export namespace Common {
          export namespace Request {
            export interface BaseOrderParams {
              request_id: string;
              amount: number;
              wallet_id: string;
              from_currency_id: string;
              to_currency_id: string;
              is_subtract: boolean;
              is_reverse: boolean;
              reference?: string;
              note?: string;
              documents?: Document[];
            }

            export interface OrderWithCounterpartyParams extends BaseOrderParams {
              counterparty_destination_id: string;
            }

            export interface OrderWithWalletAccountParams extends BaseOrderParams {
              wallet_account_id: string;
            }

            export interface OrderWithVirtualAccountParams extends BaseOrderParams {
              virtual_account_id: string;
            }

            export interface OrderWithSubAccountParams extends BaseOrderParams {
              sub_account_id: string;
            }
          }

          export namespace Response {
            export interface BaseOrderResponse {
              order_uuid: string;
              wallet_uuid: string;
              from_uuid: string;
              to_uuid: string;
              amount_from: number;
              amount_to: number;
              status: OrderStatus;
              created_at: string;
              info: string;
              id: string;
            }

            export interface HifiOrderResponse extends BaseOrderResponse {
              order_type: string;
              meta: {
                request_id: string;
                counterparty_account_id: string;
                fee: number;
                fee_currency: string;
                billing_amount: number;
                billing_currency: string;
                transaction_amount: number;
                transaction_currency: string;
                order_uuid: string;
              };
            }

            export interface CryptoTransferResponse extends BaseOrderResponse {
              order_type: 'OMNIBUS_CRYPTO_WITHDRAWAL';
              meta: {
                fee: number;
                order_uuid: string;
                to_address: string;
                fee_currency: string;
                request_id: string;
                counterparty_account_id: string;
                billing_amount: number;
                billing_currency: string;
                transaction_amount: number;
                transaction_currency: string;
                network_fee: number;
              };
            }

            export interface RnCardsResponse extends BaseOrderResponse {
              order_type: 'RN_CARDS_OFFRAMP';
              meta: {
                request_id: string;
                sub_account_id: string;
                to_address: string;
                deposit_chain_id: number;
                fee: number;
                fee_currency: string;
                billing_amount: number;
                billing_currency: string;
                transaction_amount: number;
                transaction_currency: string;
                order_uuid: string;
              };
            }

            export interface L2FResponse extends BaseOrderResponse {
              order_type:
                | 'L2F_SEPA_OFFRAMP'
                | 'L2F_SWIFT_OFFRAMP'
                | 'L2F_ACH_OFFRAMP'
                | 'L2F_WIRE_OFFRAMP'
                | 'L2F_CHAPS_OFFRAMP'
                | 'L2F_FPS_OFFRAMP';
              meta: {
                request_id: string;
                virtual_account_id: string;
              };
            }

            export interface BraleResponse extends BaseOrderResponse {
              order_type: 'BRL_WIRE_OFFRAMP' | 'BRL_ACH_OFFRAMP' | 'BRL_RTP_OFFRAMP';
              meta: {
                request_id: string;
                virtual_account_id: string;
              };
            }

            export interface DlsResponse extends BaseOrderResponse {
              order_type: 'DLS_WIRE_OFFRAMP' | 'DLS_ACH_OFFRAMP' | 'DLS_SEPA_OFFRAMP' | 'DLS_SWIFT_OFFRAMP';
              meta: {
                request_id: string;
                virtual_account_id: string;
              };
            }
          }
        }

        export namespace ByOrderType {
          export namespace INTERNAL_TRANSFER {
            export type Request =
              pathsV1Legacy['/v2/orders/TRANSFER_INTERNAL']['post']['requestBody']['content']['application/json'];
            export type Response =
              pathsV1Legacy['/v2/orders/TRANSFER_INTERNAL']['post']['responses']['200']['content']['application/json'];
          }

          export namespace HIFI_WIRE_ONRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.HifiOrderResponse & { order_type: 'HIFI_WIRE_ONRAMP' };
          }

          export namespace HIFI_ACH_ONRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.HifiOrderResponse & { order_type: 'HIFI_ACH_ONRAMP' };
          }

          export namespace HIFI_SEPA_ONRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.HifiOrderResponse & { order_type: 'HIFI_SEPA_ONRAMP' };
          }

          export namespace HIFI_WIRE_OFFRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.HifiOrderResponse & { order_type: 'HIFI_WIRE_OFFRAMP' };
          }

          export namespace HIFI_ACH_OFFRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.HifiOrderResponse & { order_type: 'HIFI_ACH_OFFRAMP' };
          }

          export namespace HIFI_SEPA_OFFRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.HifiOrderResponse & { order_type: 'HIFI_SEPA_OFFRAMP' };
          }
          export namespace TBD_SWIFT_WITHDRAWAL {
            export type Request = Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.HifiOrderResponse & { order_type: 'HIFI_SEPA_OFFRAMP' };
          }

          export namespace OMNIBUS_CRYPTO_TRANSFER {
            export type Request = Omit<Common.Request.OrderWithWalletAccountParams, 'to_currency_id'> &
              Omit<Common.Request.OrderWithCounterpartyParams, 'to_currency_id'>;
            export type Response = Common.Response.CryptoTransferResponse;
          }
          export namespace SEGREGATED_CRYPTO_TRANSFER {
            export type Request = Omit<Common.Request.OrderWithWalletAccountParams, 'to_currency_id'> &
              Omit<Common.Request.OrderWithCounterpartyParams, 'to_currency_id'>;
            export type Response = Common.Response.CryptoTransferResponse;
          }
          export namespace RN_CARDS_OFFRAMP {
            export type Request = Common.Request.OrderWithSubAccountParams;
            export type Response = Common.Response.RnCardsResponse;
          }

          export namespace L2F_SEPA_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.L2FResponse & { order_type: 'L2F_SEPA_OFFRAMP' };
          }

          export namespace L2F_SWIFT_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.L2FResponse & { order_type: 'L2F_SWIFT_OFFRAMP' };
          }

          export namespace L2F_ACH_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.L2FResponse & { order_type: 'L2F_ACH_OFFRAMP' };
          }

          export namespace L2F_WIRE_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.L2FResponse & { order_type: 'L2F_WIRE_OFFRAMP' };
          }

          export namespace L2F_CHAPS_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.L2FResponse & { order_type: 'L2F_CHAPS_OFFRAMP' };
          }

          export namespace L2F_FPS_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.L2FResponse & { order_type: 'L2F_FPS_OFFRAMP' };
          }

          export namespace BRL_WIRE_OFFRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams & { virtual_account_id?: string };
            export type Response = Common.Response.BraleResponse & { order_type: 'BRL_WIRE_OFFRAMP' };
          }

          export namespace BRL_ACH_OFFRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams & { virtual_account_id?: string };
            export type Response = Common.Response.BraleResponse & { order_type: 'BRL_ACH_OFFRAMP' };
          }

          export namespace BRL_RTP_OFFRAMP {
            export type Request = Common.Request.OrderWithCounterpartyParams &
              Common.Request.OrderWithVirtualAccountParams;
            export type Response = Common.Response.BraleResponse & { order_type: 'BRL_RTP_OFFRAMP' };
          }

          export namespace DLS_WIRE_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.DlsResponse & { order_type: 'DLS_WIRE_OFFRAMP' };
          }

          export namespace DLS_ACH_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.DlsResponse & { order_type: 'DLS_ACH_OFFRAMP' };
          }

          export namespace DLS_SEPA_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.DlsResponse & { order_type: 'DLS_SEPA_OFFRAMP' };
          }

          export namespace DLS_SWIFT_OFFRAMP {
            export type Request = Common.Request.OrderWithVirtualAccountParams &
              Common.Request.OrderWithCounterpartyParams;
            export type Response = Common.Response.DlsResponse & { order_type: 'DLS_SWIFT_OFFRAMP' };
          }
        }
      }

      export namespace OrderTypes {
        export type PaymentMethod =
          | 'ACH'
          | 'FEDWIRE'
          | 'SWIFT'
          | 'SEPA'
          | 'SEPA_CT'
          | 'CHAPS'
          | 'FPS'
          | 'RTP'
          | 'CARD'
          | 'CRYPTO_EXTERNAL'
          | 'CRYPTO_INTERNAL';

        export type OrderTypeKycRail = {
          id: string;
          kyc_rail_id: string;
        };
        export interface OrderInfo {
          id: OrderType | string;
          transaction_type: string | null;
          description: string | null;
          direction: string | null;
          is_internal: boolean;
          // kyc_rails_id: string | null; // deprecated use order_types_kyc_rails instead
          payment_method: PaymentMethod;
          is_trusted: boolean;
          /** Optional minimum amount the product should allow for this order type */
          min_amount: number | null;
          /** Optional maximum amount the product should allow for this order type */
          max_amount: number | null;
          /** Whether payouts for this order type are limited to the wallet owner's own account */
          first_party_only: boolean;
          order_types_kyc_rails: OrderTypeKycRail[];
        }

        export namespace List {
          export type Response = OrderInfo[];
        }
      }

      export namespace List {
        export namespace ByWallet {
          export type OrderListStatusFilter = Record<'status', OrderStatus[] | OrderStatus>;
          export type OrderListOrderTypeFilter = Record<'order_type', OrderType[] | OrderType>;
          export type OrderListFromUuidFilter = Record<'from_uuid', string[] | string>;
          export type OrderListToUuidFilter = Record<'to_uuid', string[] | string>;

          export type OrderListFilter =
            OrderListStatusFilter | OrderListOrderTypeFilter | OrderListFromUuidFilter | OrderListToUuidFilter;
          export interface Request {
            wallet_uuid: string;
            offset?: number;
            limit?: number;
            sort_by?: string;
            sort_order?: 'asc' | 'desc';
            filters?: OrderListFilter[];
            date_from?: string;
            date_to?: string;
          }

          export interface PaymentOriginatorAddress {
            address_line1?: string | null;
            city?: string | null;
            state?: string | null;
            postal_code?: string | null;
            country?: string | null;
          }

          export interface PaymentOriginatorProfile {
            name: string;
            address?: PaymentOriginatorAddress;
          }

          export interface PaymentOriginatorAccountInfo {
            account_number: string;
            routing_number?: string | null;
            swift_bic?: string | null;
            institution_name?: string | null;
          }

          export interface PaymentOriginator {
            profile: PaymentOriginatorProfile;
            account_information: PaymentOriginatorAccountInfo;
            reference?: string | null;
            memo?: string | null;
          }

          export interface OrderMeta {
            order_uuid: string;
            request_id?: string | null;
            billing_amount?: number;
            billing_currency?: string;
            // billing_amount_currency?: string; // double billing_currency field
            transaction_amount?: number;
            transaction_currency?: string;
            // transaction_amount_currency?: string; // double transaction_currency field
            network_fee?: number | null;
            network_fee_currency?: string | null;
            exchange_rate?: number;
            fee?: number;
            fee_currency?: string;
            from_currency_id?: string;
            from_crypto_address?: string | null;
            to_currency_id?: string;
            chain_id?: number | null;
            counterparty_destination_id?: string | null;
            counterparty_account_id?: string | null;
            counterparty_account_name?: string | null;
            counterparty_account_nickname?: string | null;
            virtual_account_id?: string | null;
            virtual_account_name?: string | null;
            to_crypto_address?: string | null;
            reference?: string | null;
            note?: string | null;
            order_id?: string | null;
            originator?: PaymentOriginator | null;
            sub_account_id?: string | null;
            to_address?: string | null;
            sub_account_currency?: string | null;
            crypto_transaction_hash?: string | null;
            // Дополнительные поля для разных типов ордеров
            workflow_type?: string;
            processing_type?: string;
            workflow_status?: string;
            qstash_message_id?: string;
            vendor_account_id?: string;
            processing_started_at?: string;
            workflow_status_updated_at?: string;
            card_id?: string;
            vendor_id?: string;
            fiat_account_id?: string;
            from_wallet_uuid?: string;
            to_wallet_uuid?: string;
          }

          export interface OrderItem {
            id: string;
            order_uuid: string;
            request_id?: string | null;
            wallet_uuid: string;
            from_uuid: string;
            to_uuid: string;
            amount_from: number;
            amount_to: number;
            order_type: string;
            status: OrderStatus;
            created_at: string;
            updated_at?: string | null;
            sub_account_id?: string | null;
            meta: OrderMeta;
            info?: string | null;
            comment?: string | null;
          }

          export type Response = {
            data: OrderItem[];
            count: number;
            has_more: boolean;
          };
        }

        export namespace Csv {
          export interface Request {
            wallet_uuid: string;
            filters?: API.Orders.V2.List.ByWallet.OrderListFilter[];
            date_from?: string;
            date_to?: string;
          }
          export type Response = string;
        }
      }

      export namespace GetById {
        export interface Request {
          order_uuid: string;
        }

        export interface CounterpartyAccount {
          id: string;
          name: string;
          type: string;
          email?: string | null;
          phone?: string | null;
          wallet_id: string;
        }

        export interface ExternalBankingData {
          id: string;
          account_number: string;
          routing_number?: string | null;
          bank_name: string;
          swift_bic?: string | null;
          iban?: string | null;
          note?: string | null;
          address_id?: string | null;
        }

        export interface ExternalCryptoData {
          id: string;
          address: string;
          currency_id: string;
          memo?: string | null;
        }

        export interface CounterpartyDestination {
          id: string;
          counterparty_account_id: string;
          nickname?: string | null;
          type: string;
          external_banking_data_id?: string | null;
          external_crypto_data_id?: string | null;
          created_at: string;
          updated_at: string;
          deleted_at?: string | null;
          is_deleted?: boolean | null;
          internal_wallet_data_id?: string | null;
          counterparty_account: CounterpartyAccount;
          external_banking_data?: ExternalBankingData | null;
          external_crypto_data?: ExternalCryptoData | null;
        }

        export interface IntegrationVendorExtended extends API.VirtualAccounts.Programs.IntegrationVendor {
          type: string;
        }

        export interface DepositInstructionAddress {
          address_line1: string;
          city: string;
          state: string;
          postal_code: string;
          country_code: string;
        }

        export interface VirtualAccountDetails {
          id: string;
          created_at: string;
          wallet_id: string;
          status: string;
          account_currency: string;
          destination_currency: string;
          destination_address?: string | null;
          va_programs_id: string;
          integration_vendor_id: string;
          vendor_account_id: string;
          vendor_status: string;
          current_balance: number;
          available_balance: number;
          customer_name: string;
          asset_type_id: string;
          deposit_type: string;
          meta?: Record<string, unknown>;
          is_deposit_enabled?: boolean;
          // account_details: API.VirtualAccounts.VirtualAccount.AccountDetails | null; // deprecated
          deposit_instructions?: API.VirtualAccounts.VirtualAccount.DepositInstruction.DepositInstruction[];
          account_currency_details: API.Currencies.SimplifiedCurrency;
          destination_currency_details: API.Currencies.SimplifiedCurrency;
          integration_vendor: IntegrationVendorExtended;
        }

        export type OrderDetails = API.Orders.V2.List.ByWallet.OrderItem & {
          request_id?: string | null;
          updated_at: string;
          fee?: number | null;
          fee_currency_id?: string | null;
          network_fee?: number | null;
          network_fee_currency_id?: string | null;
          exchange_rate?: number | null;
          from_currency_id?: string | null;
          to_currency_id?: string | null;
          workflow_run_id?: string | null;
          wallet: { uuid: string; tenant_id: string };
          from_currency: API.Currencies.SimplifiedCurrency;
          to_currency: API.Currencies.SimplifiedCurrency;
          virtual_account?: VirtualAccountDetails | null;
          counterparty_destination?: CounterpartyDestination | null;
          documents?: unknown[];
        };

        export type Response = OrderDetails;
      }
    }

    export namespace Frontend {
      // Supporting document attached to an order at creation time, accepted via the optional
      // `documents` field on every orders.frontend.create.withdrawal.* method.
      export type OrderDocumentInput = componentsV1Frontend['schemas']['OrderDocumentInput'];

      // Result payload returned inside the `orders.frontend.calc` response envelope (`{ success, data }`).
      export type OrderCalculation = componentsV1Frontend['schemas']['OrderCalculation'];

      // Shared success envelope returned by every create/approve/cancel frontend order endpoint.
      export type OrderEnvelope = {
        success?: boolean;
        data?: componentsV1Frontend['schemas']['Order'];
        message?: string;
      };

      export namespace Create {
        export namespace Withdrawal {
          export namespace Crypto {
            export type Request = componentsV1Frontend['schemas']['FrontendCryptoTransferRequest'];
            export type Response = OrderEnvelope;
          }

          export namespace Internal {
            export type Request =
              pathsV1Frontend['/frontend/orders/withdrawal/internal']['post']['requestBody']['content']['application/json'];
            export type Response = OrderEnvelope;
          }

          export namespace Wire {
            export type Request = componentsV1Frontend['schemas']['FrontendL2FOrderRequest'];
            export type Response = OrderEnvelope;
          }

          export namespace Ach {
            export type Request = componentsV1Frontend['schemas']['FrontendL2FOrderRequest'];
            export type Response = OrderEnvelope;
          }

          export namespace Sepa {
            export type Request = componentsV1Frontend['schemas']['FrontendL2FOrderRequest'];
            export type Response = OrderEnvelope;
          }

          export namespace Swift {
            export type Request = componentsV1Frontend['schemas']['FrontendL2FOrderRequest'];
            export type Response = OrderEnvelope;
          }

          export namespace Chaps {
            export type Request = componentsV1Frontend['schemas']['FrontendL2FOrderRequest'];
            export type Response = OrderEnvelope;
          }

          export namespace Fps {
            export type Request = componentsV1Frontend['schemas']['FrontendL2FOrderRequest'];
            export type Response = OrderEnvelope;
          }
        }

        export namespace Exchange {
          export type Request = componentsV1Frontend['schemas']['FrontendExchangeOrderRequest'];
          export type Response = OrderEnvelope;
        }
      }

      export namespace Approve {
        export type Request = {
          order_id: string;
        } & pathsV1Frontend['/frontend/orders/{order_id}/approve']['post']['requestBody']['content']['application/json'];
        export type Response = OrderEnvelope;
      }

      export namespace Cancel {
        export type Request = {
          order_id: string;
        } & pathsV1Frontend['/frontend/orders/{order_id}/cancel']['post']['requestBody']['content']['application/json'];
        export type Response = OrderEnvelope;
      }

      export namespace Comment {
        export type Request = {
          order_id: string;
          wallet_id: string;
          comment?: string | null;
        };
        export type Response = {
          success: boolean;
          data: API.Orders.V2.List.ByWallet.OrderItem;
        };
      }

      export namespace Calc {
        export type Request = pathsV1Frontend['/frontend/orders/calc']['get']['parameters']['query'] & {
          signal?: AbortSignal;
        };
        export type Response =
          pathsV1Frontend['/frontend/orders/calc']['get']['responses'][200]['content']['application/json'];
      }

      export namespace GetById {
        export type Request = pathsV1Frontend['/frontend/orders/id/{order_id}']['get']['parameters']['path'];
        export type Response =
          pathsV1Frontend['/frontend/orders/id/{order_id}']['get']['responses'][200]['content']['application/json'];
      }

      export namespace GetByUuid {
        export type Request = pathsV1Frontend['/frontend/orders/uuid/{order_uuid}']['get']['parameters']['path'];
        export type Response =
          pathsV1Frontend['/frontend/orders/uuid/{order_uuid}']['get']['responses'][200]['content']['application/json'];
      }

      export namespace List {
        export namespace ByWallet {
          export interface Request {
            wallet_uuid: string;
            offset?: number;
            limit?: number;
            sort_by?: string;
            sort_order?: 'asc' | 'desc';
            filters?: API.Orders.V2.List.ByWallet.OrderListFilter[];
            date_from?: string;
            date_to?: string;
            show_low_balance?: 'true' | 'false';
          }
          export type Response =
            pathsV1Frontend['/frontend/orders/wallet/{wallet_uuid}']['get']['responses'][200]['content']['application/json'];
        }

        export namespace Csv {
          export interface Request {
            wallet_uuid: string;
            filters?: API.Orders.V2.List.ByWallet.OrderListFilter[];
            date_from?: string;
            date_to?: string;
            show_low_balance?: 'true' | 'false';
          }
          export type Response = string;
        }
      }

      export namespace Types {
        export namespace List {
          // The OpenAPI spec leaves this 200 body untyped (content: never); reuse the order-types shape.
          export type Response = API.Orders.OrderTypes.List.Response;
        }

        export namespace GetById {
          export type Request = pathsV1Frontend['/frontend/orders/types/{id}']['get']['parameters']['path'];
          export type Response = API.Orders.OrderTypes.OrderInfo;
        }
      }
    }
  }

  export namespace Tenant {
    export type Config = components['schemas']['SystemConfigDto'];
  }

  export namespace TOTP {
    export namespace OTPVerification {
      export type OTPVerificationChannelType = 'EMAIL' | 'SMS' | 'TOTP' | 'APP' | 'TG_TEST';
      export type OTPVerificationStatus = 'PENDING' | 'APPROVED' | 'DENIED';
      export type OTPVerificationChannelInfo = {
        channel: OTPVerificationChannelType;
        validity: number;
        max_requests: number;
      };
      export type OTPVerificationInfo = {
        request_id: string;
        status: OTPVerificationStatus;
        created_at: string;
        updated_at: string;
      };

      export namespace Create {
        export type Request = {
          request_id: string;
          amount: number;
          order_type: string;
          wallet_id: string;
          meta: {
            currency: string;
            from_currency_id: string;
            from_currency: string;
            to_currency_id: string;
            to_currency: string;
            from_amount: number;
            to_amount: number;
            counterparty_account_id: string;
            counterparty_destination_id: string;
            type: 'ORDER';
            sub_type: OrderType;
            note?: string;
            refference?: string;
          };
        };

        export type Response = {
          request_id: string;
          status: OTPVerificationStatus;
          channels: OTPVerificationChannelInfo[];
        };
      }

      export namespace RequestOtp {
        export type Request = {
          request_id: string;
          channel: OTPVerificationChannelType;
        };

        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          details?: string;
          validity?: number;
          requests_made?: number;
          max_requests?: number;
        };
      }

      export namespace Verify {
        export type Request = {
          request_id: string;
          channel: OTPVerificationChannelType;
          otp: string;
        };

        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          details?: string;
        };
      }
    }
    export namespace TOTP {
      export namespace Generate {
        export type Request = {
          user_name: string;
          service_name: string;
        };

        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          data?: {
            id: string;
            qrCode: string;
            secret: string;
          };
        };
      }

      export namespace Verify {
        export type Request = {
          token: string;
          otp: string;
        };

        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          details?: string;
        };
      }

      export namespace Revoke {
        export type Request = {
          token: string;
        };

        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          details?: string;
        };
      }

      export namespace Activate {
        export type Request = {
          token: string;
        };

        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          details?: string;
          data?: {
            activated: boolean;
          };
        };
      }

      export namespace GenerateEncrypted {
        export type Request = {
          user_name: string;
          service_name: string;
          public_key: string;
        };

        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          details?: string;
          data?: string;
        };
      }

      export namespace Status {
        export type Response = {
          success?: boolean;
          error?: boolean;
          message?: string;
          details?: string;
          has_active_totp?: boolean;
        };
      }
    }
  }

  export namespace VirtualAccounts {
    export namespace Create {
      export interface Request {
        wallet_id: string;
        va_programs_id: string;
      }

      export type Response = {
        id: string;
      };
    }

    export namespace GetByUuid {
      export interface Request {
        uuid: string;
      }

      export type Response = API.VirtualAccounts.VirtualAccount.VirtualAccountDetailItem;
    }

    export namespace GetAll {
      export interface Request {
        wallet_uuid: string;
        limit: number;
        offset: number;
      }

      export type Response = {
        count: number;
        has_more: boolean;
        data: API.VirtualAccounts.VirtualAccount.VirtualAccountListItem[];
      };
    }

    export namespace VirtualAccount {
      export interface Beneficiary {
        name: string;
        address: string;
      }

      // export interface AccountDetails { // deprecated
      //   bankName: string;
      //   bankAddress: string;
      //   beneficiary: API.VirtualAccounts.VirtualAccount.Beneficiary;
      //   swiftCode: string;
      //   ach?: {
      //     accountNumber: string;
      //     routingNumber: string;
      //   };
      //   rtp?: {
      //     accountNumber: string;
      //     routingNumber: string;
      //   };
      //   wire?: {
      //     accountNumber: string;
      //     routingNumber: string;
      //   };
      //   swift?: {
      //     accountNumber: string;
      //     routingNumber: string;
      //   };
      // }

      export interface PaymentRail {
        currency: string;
        paymentRail: string[];
      }

      export interface Destination {
        chain: string;
        currency: string;
        walletAddress: string;
      }

      export namespace DepositInstruction {
        export type InstructionType =
          'ACH' | 'FEDWIRE' | 'SWIFT' | 'CHAPS' | 'FPS' | 'SEPA' | 'CRYPTO_EXTERNAL' | 'CRYPTO_INTERNAL' | 'SEPA_CT';

        export interface Address {
          city: string;
          state: string;
          postal_code: string;
          country_code: string;
          address_line1: string;
          address_line2: string;
        }

        export interface Common {
          memo: string;
          asset_type_id: string;
          account_number: string;
          institution_name: string;
          instruction_type: InstructionType;
          account_holder_address?: Address;
          institution_address?: Address;
          account_holder_name?: string;
          account_routing_number?: string;
          swift_bic?: string;
          iban?: string;
          sort_code?: string;
        }
        export interface ACH extends Common {
          instruction_type: 'ACH';
        }
        export interface FEDWIRE extends Common {
          instruction_type: 'FEDWIRE';
          account_holder_name: string;
          account_routing_number: string;
          institution_address: Address;
          account_holder_address: Address;
        }

        export interface SWIFT extends Common {
          instruction_type: 'SWIFT';
          swift_bic: string;
          institution_address: Address;
          account_holder_address: Address;
        }

        // export interface SEPA_CT extends Common { // DEPRECATED, use SEPA instead
        //   instruction_type: 'SEPA_CT';
        //   iban: string;
        //   swift_bic: string;
        //   institution_address: Address;
        //   account_holder_address: Address;
        // }

        export interface SEPA extends Common {
          instruction_type: 'SEPA';
          iban: string;
          swift_bic: string;
          institution_address: Address;
          account_holder_address: Address;
        }

        export interface CHAPS extends Common {
          instruction_type: 'CHAPS';
          account_holder_name: string;
          sort_code: string;
          account_holder_address: Address;
          institution_address: Address;
        }

        export interface FPS extends Common {
          instruction_type: 'FPS';
          account_holder_name: string;
          sort_code: string;
          account_holder_address: Address;
          institution_address: Address;
        }

        export type DepositInstruction = ACH | FEDWIRE | SWIFT | SEPA | CHAPS | FPS | Common;
      }

      export interface OrderType {
        order_type_id: string;
      }

      export interface VirtualAccountListItem {
        id: string;
        created_at: string;
        wallet_id: string;
        status: string;
        balance: number;
        total_balance: number;
        account_currency: API.Currencies.Currency;
        va_programs_id: string;
        destination_currency: API.Currencies.Currency;
        destination_address: string;
        integration_vendor_id: string;
        vendor_account_id: string;
        // account_details: API.VirtualAccounts.VirtualAccount.AccountDetails; // deprecated
        virtual_accounts_program: API.VirtualAccounts.Programs.Program;
        deposit_instructions?: API.VirtualAccounts.VirtualAccount.DepositInstruction.DepositInstruction[];
      }
      export interface VirtualAccountDetailItem {
        account_currency: string;
        // account_currency_details: API.Currencies.Currency;
        // account_details: API.VirtualAccounts.VirtualAccount.AccountDetails; // deprecated
        balance: number;
        crypto_deposit_details: {
          currency_id: string;
          deposit_address: string;
          chain_id: number;
        }[];
        created_at: string;
        destination_address: string;
        destination_currency: string;
        // destination_currency_details: API.Currencies.Currency;
        deposit_instructions?: API.VirtualAccounts.VirtualAccount.DepositInstruction.DepositInstruction[];
        id: string;
        integration_vendor_id: string;
        order_types: string[];
        status: string;
        total_balance: number;
        va_programs_id: string;
        vendor_account_id: string;
        virtual_accounts_program: API.VirtualAccounts.Programs.Program;
        wallet_id: string;
      }
    }
    export namespace Programs {
      export interface OrderType {
        id: string;
        description: string | null;
      }
      export interface OrderTypeListItem {
        order_type: API.VirtualAccounts.Programs.OrderType;
        order_type_id: string;
      }

      export interface CurrencyItem {
        icon: string | null;
        name: string;
        type: string;
        uuid: string;
        symbol: string;
      }

      export interface IntegrationVendor {
        id: string;
        code: string;
        name: string;
      }

      export interface Program {
        id: string;
        name: string;
        vendor_id: string | null;
        tenant_id: string;
        status: string;
        account_currency_id: string;
        description: string;
        icon: string | null;
        code: string;
        kyc_rails_id: string;
        consent_text: string | null;
        integration_vendors_id: string;
        is_hidden: boolean;
        destination_currency_id: string;
        integration_vendor: API.VirtualAccounts.Programs.IntegrationVendor;
        account_currency_details: API.VirtualAccounts.Programs.CurrencyItem;
        destination_currency_details: API.VirtualAccounts.Programs.CurrencyItem;
        virtual_accounts_programs_order_types: API.VirtualAccounts.Programs.OrderTypeListItem[];
      }

      export namespace List {
        export interface Request {
          offset: number;
          limit: number;
          pagination?: boolean;
          wallet_id: string;
        }
        export interface Response {
          data: Program[];
          count: number;
          has_more: boolean;
        }
      }
    }
  }

  export namespace User {
    export namespace UpdateUser {
      export namespace Phone {
        export namespace RequestOTP {
          export type Request =
            operations['AuthenticatedUserController_changePhone']['requestBody']['content']['application/json'];
        }
        export namespace Confirm {
          export type Request =
            operations['AuthenticatedUserController_changePhoneNumberConfirm']['requestBody']['content']['application/json'];
        }
      }

      export namespace Email {
        export namespace RequestOTP {
          export type Request =
            operations['AuthenticatedUserController_changeEmail']['requestBody']['content']['application/json'];
        }

        export namespace Confirm {
          export type Request =
            operations['AuthenticatedUserController_changeEmailConfirm']['requestBody']['content']['application/json'];
        }
      }
    }

    export namespace UserData {
      export type UserData = components['schemas']['UserDataEntity'];

      export namespace Get {
        export type Request = operations['UserController_getMyUserData']['parameters']['query'];
        export type Response =
          operations['UserController_getMyUserData']['responses']['200']['content']['application/json'];
      }

      export namespace Update {
        export type Request =
          operations['UserController_updateMyUserData']['requestBody']['content']['application/json'];

        export type Response =
          operations['UserController_updateMyUserData']['responses']['200']['content']['application/json'];
      }
    }

    export namespace Verification {
      // Steps of the per-user Sumsub ladder: `data` collects the base profile (name, birth date,
      // nationality), `documents` and `face` are the optional follow-up steps. Their outcome is
      // reported back on user-data as `identity_verification_status` / `face_verification_status`.
      export type Flow = components['schemas']['UserVerificationFlow'];

      export namespace Init {
        export type Request =
          operations['UserVerificationController_init']['requestBody']['content']['application/json'];
        export type Response =
          operations['UserVerificationController_init']['responses']['200']['content']['application/json'];
      }

      export namespace Resume {
        export type Response =
          operations['UserVerificationController_resume']['responses']['200']['content']['application/json'];
      }
    }
  }

  export namespace Wallets {
    export interface SimplifiedWallet {
      uuid: string;
      user_id: string;
      tenant_id: string;
    }

    type WalletsRoot = pathsV1Frontend['/frontend/wallets'];
    type WalletByIdRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}'];
    type WalletBalanceRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/balance'];
    type WalletDashboardRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/dashboard'];
    type WalletAddressesRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/addresses'];
    type WalletAddressByChainRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/addresses/{chain}'];
    type WalletTransactionsRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/transactions'];
    type WalletTransactionByIdRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/transactions/{transaction_id}'];
    type WalletTransactionsCsvRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/transactions/csv'];
    type WalletInvitesRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/invites'];
    type WalletInviteByIdRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/invites/{invite_id}'];
    type AcceptInviteRoot = pathsV1Frontend['/frontend/wallets/accept-invite'];
    type DeclineInviteRoot = pathsV1Frontend['/frontend/wallets/decline-invite'];
    type InviteInfoRoot = pathsV1Frontend['/frontend/wallets/invite-info'];
    type UsersLookupRoot = pathsV1Frontend['/frontend/wallets/users/lookup'];
    type WalletUsersRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/users'];
    type WalletUserByIdRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/users/{user_data_uuid}'];
    type WalletUserActivateRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/users/{user_data_uuid}/activate'];
    type WalletUserDeactivateRoot = pathsV1Frontend['/frontend/wallets/{wallet_id}/users/{user_data_uuid}/deactivate'];

    export namespace WalletsList {
      export type Request = NonNullable<WalletsRoot['get']['parameters']['query']>;
      export type Response = WalletsRoot['get']['responses']['200']['content']['application/json'];
      export type WalletsListItem = NonNullable<Response['data']>[number];
    }

    export namespace Wallet {
      export namespace Create {
        export type Request = NonNullable<WalletsRoot['post']['requestBody']>['content']['application/json'];
        export type Response = WalletsRoot['post']['responses']['201']['content']['application/json'];
      }

      export namespace GetByUuid {
        export type Request = WalletByIdRoot['get']['parameters']['path'] &
          NonNullable<WalletByIdRoot['get']['parameters']['query']>;
        export type Response = WalletByIdRoot['get']['responses']['200']['content']['application/json'];
      }

      export namespace Update {
        export type Request = WalletByIdRoot['patch']['parameters']['path'] &
          WalletByIdRoot['patch']['requestBody']['content']['application/json'];
        export type Response = WalletByIdRoot['patch']['responses']['200']['content']['application/json'];
      }
    }

    export namespace Balance {
      export type Request = WalletBalanceRoot['get']['parameters']['path'] &
        NonNullable<WalletBalanceRoot['get']['parameters']['query']>;
      export type Response = WalletBalanceRoot['get']['responses']['200']['content']['application/json'];
    }

    export namespace Dashboard {
      export type Request = WalletDashboardRoot['get']['parameters']['path'] &
        NonNullable<WalletDashboardRoot['get']['parameters']['query']>;
      export type Response = WalletDashboardRoot['get']['responses']['200']['content']['application/json'];
    }

    export namespace WalletChain {
      export namespace GetAll {
        export type Request = WalletAddressesRoot['get']['parameters']['path'] &
          NonNullable<WalletAddressesRoot['get']['parameters']['query']>;
        export type Response = WalletAddressesRoot['get']['responses']['200']['content']['application/json'];
      }
      export namespace GetByChain {
        export type Request = WalletAddressByChainRoot['get']['parameters']['path'];
        export type Response = WalletAddressByChainRoot['get']['responses']['200']['content']['application/json'];
      }
      export namespace Create {
        export type Request = WalletAddressByChainRoot['post']['parameters']['path'] &
          NonNullable<NonNullable<WalletAddressByChainRoot['post']['requestBody']>['content']['application/json']>;
        export type Response = WalletAddressByChainRoot['post']['responses']['201']['content']['application/json'];
      }
    }

    export namespace WalletTransactions {
      export namespace TransactionList {
        export type Request = WalletTransactionsRoot['get']['parameters']['path'] &
          NonNullable<WalletTransactionsRoot['get']['parameters']['query']>;
        export type Response = WalletTransactionsRoot['get']['responses']['200']['content']['application/json'];

        export namespace ExportCsv {
          export type Request = WalletTransactionsCsvRoot['get']['parameters']['path'] &
            NonNullable<WalletTransactionsCsvRoot['get']['parameters']['query']>;
          export type Response = WalletTransactionsCsvRoot['get']['responses']['200']['content']['text/csv'];
        }
      }

      export namespace GetById {
        export type Request = WalletTransactionByIdRoot['get']['parameters']['path'];
        export type Response = WalletTransactionByIdRoot['get']['responses']['200']['content']['application/json'];
      }
    }

    export namespace Users {
      export namespace Lookup {
        export type Request = UsersLookupRoot['get']['parameters']['query'];
        export type Response = UsersLookupRoot['get']['responses']['200']['content']['application/json'];
      }

      export namespace GetAll {
        export type Request = WalletUsersRoot['get']['parameters']['path'] &
          NonNullable<WalletUsersRoot['get']['parameters']['query']>;
        export type Response = WalletUsersRoot['get']['responses']['200']['content']['application/json'];
      }

      export namespace Add {
        export type Request = WalletUsersRoot['post']['parameters']['path'] &
          WalletUsersRoot['post']['requestBody']['content']['application/json'];
        export type Response = WalletUsersRoot['post']['responses']['201']['content']['application/json'];
      }

      export namespace UpdateRole {
        export type Request = WalletUserByIdRoot['patch']['parameters']['path'] &
          WalletUserByIdRoot['patch']['requestBody']['content']['application/json'];
        export type Response = WalletUserByIdRoot['patch']['responses']['200']['content']['application/json'];
      }

      export namespace Remove {
        export type Request = WalletUserByIdRoot['delete']['parameters']['path'];
        export type Response = WalletUserByIdRoot['delete']['responses']['200']['content']['application/json'];
      }

      export namespace Activate {
        export type Request = WalletUserActivateRoot['post']['parameters']['path'];
        export type Response = WalletUserActivateRoot['post']['responses']['200']['content']['application/json'];
      }

      export namespace Deactivate {
        export type Request = WalletUserDeactivateRoot['post']['parameters']['path'];
        export type Response = WalletUserDeactivateRoot['post']['responses']['200']['content']['application/json'];
      }
    }

    export namespace Invites {
      export type WalletInvite = componentsV1Frontend['schemas']['WalletInvite'];

      export namespace Info {
        export type Request = InviteInfoRoot['get']['parameters']['query'];
        export type Response = InviteInfoRoot['get']['responses']['200']['content']['application/json'];
      }

      export namespace Accept {
        export type Request = AcceptInviteRoot['post']['requestBody']['content']['application/json'];
        export type Response = AcceptInviteRoot['post']['responses']['200']['content']['application/json'];
      }

      export namespace Decline {
        export type Request = DeclineInviteRoot['post']['requestBody']['content']['application/json'];
        export type Response = DeclineInviteRoot['post']['responses']['200']['content']['application/json'];
      }

      export namespace GetAll {
        export type Request = WalletInvitesRoot['get']['parameters']['path'] &
          NonNullable<WalletInvitesRoot['get']['parameters']['query']>;
        export type Response = WalletInvitesRoot['get']['responses']['200']['content']['application/json'];
      }

      export namespace Create {
        export type Request = WalletInvitesRoot['post']['parameters']['path'] &
          WalletInvitesRoot['post']['requestBody']['content']['application/json'];
        export type Response = WalletInvitesRoot['post']['responses']['201']['content']['application/json'];
      }

      export namespace GetById {
        export type Request = WalletInviteByIdRoot['get']['parameters']['path'];
        export type Response = WalletInviteByIdRoot['get']['responses']['200']['content']['application/json'];
      }

      export namespace Delete {
        export type Request = WalletInviteByIdRoot['delete']['parameters']['path'];
        export type Response = WalletInviteByIdRoot['delete']['responses']['200']['content']['application/json'];
      }
    }
  }

  export namespace Statements {
    export namespace Pdf {
      export type Request = {
        wallet_uuid: string;
        from_date?: string; // ISO 8601
        to_date?: string; // ISO 8601
        crypto_id?: string; // UUID
        logo?: string;
      };
      export type Response = Blob;
    }
  }

  export namespace Storage {
    export namespace KYC {
      export namespace Upload {
        export type Response =
          operations['StorageController_uploadKycFile']['responses']['201']['content']['application/json'];
      }

      export namespace GetFileUrl {
        export type Request = {
          path: string;
        };
        export type Response =
          operations['StorageController_getFileUrl']['responses']['200']['content']['application/octet-stream'];
      }

      export namespace GetFileById {
        export interface Request {
          folderId: string;
          fileId: string;
        }
        export type Response =
          operations['StorageController_getFile']['responses']['200']['content']['application/octet-stream'];
      }
    }
  }

  export namespace Referrals {
    export namespace Levels {
      export type Response =
        operations['ReferralsController_getLevels']['responses']['200']['content']['application/json'];
    }

    export namespace Income {
      export namespace List {
        export type Request = operations['ReferralsController_getIncomeList']['parameters']['query'];
        export type Response =
          operations['ReferralsController_getIncomeList']['responses']['200']['content']['application/json'];
      }

      export namespace Progress {
        export type Response =
          operations['ReferralsController_getProgress']['responses']['200']['content']['application/json'];
      }

      export namespace Summary {
        export type Response =
          operations['ReferralsController_getSummary']['responses']['200']['content']['application/json'];
      }
    }
  }
}
