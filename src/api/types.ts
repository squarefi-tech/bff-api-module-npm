import {
  APIKeyRole,
  CardFormFactor,
  CardStatus,
  CardTransactionType,
  CardType,
  CounterpartyDestinationType,
  CounterpartyType,
  CurrencyType,
  IssuingProgramStatus,
  KYCStatuses,
  OrderStatuses,
  OrderType,
  SortingDirection,
  SubAccountType,
  WalletTransactionMethod,
  WalletTransactionRecordType,
  WalletTransactionStatus,
  WalletTransactionType,
} from '../constants';
import { WalletType } from '../';

export namespace API {
  export namespace Auth {
    export namespace Telegram {
      export interface Signin {
        tg_id: number;
        hash: string;
        init_data_raw: string;
      }
      export interface Signup {
        phone: string;
        tg_id: number;
        first_name: string;
        last_name?: string;
        hash: string;
        init_data_raw: string;
        referrer?: string;
        invite_code?: string;
        username: string;
      }
    }

    export interface Tokens {
      access_token: string;
      refresh_token: string;
    }
    export namespace UserData {
      export namespace Update {
        export interface Request {
          default_currency: string;
        }
      }

      export interface UserData {
        id: number;
        created_at: string;
        user_id: string;
        kyc_status: KYCStatuses | string;
        kyc_date: string;
        turnover_limit?: number;
        default_currency: string;
        tenant_id: string;
        user_group_id: string;
        is_developer: boolean;
        can_invite: boolean;
        total_turnover: {
          onramp: number;
          offramp: number;
          total: number;
        };
      }
    }

    export namespace Update {
      export namespace Phone {
        export interface Request {
          phone: string;
        }
      }
    }

    export namespace SignIn {
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

    export namespace SignUp {
      export namespace Password {
        export interface Request {
          email: string;
          password: string;
          invite_code?: string;
          referrer?: string;
        }
      }
    }
    // export interface SupabaseGetSessionResponse {
    //   session?: Tokens;
    //   // user?: User;
    //   error?: string;
    // }

    export namespace VerifyOtp {
      export type Response = { access_token: string; refresh_token: string; error?: string };
    }
  }

  export namespace Cards {
    export namespace Config {
      export interface Program {
        id: string;
        account_currency: string;
        brand: string;
        form_factor: CardFormFactor | string;
        name: string;
        card_limit: number;
        realtime_auth: boolean;
        tokenizable: boolean;
        vendor_id: string;
        purposes: string[] | null;
        type: CardType | string; // MOCK
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

      fiat_account: API.FiatAccounts.FiatAccount;
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
      fiat_account: API.FiatAccounts.FiatAccount;
      last4: string;
      card_status: string;
      form_factor: string;
      name_on_card: string | null;
      nick_name: string;
      wallet_id: string;
      type: string;
      tokenizable: boolean;
      issuing_programs: API.Cards.Config.Program;
      limits: API.Cards.Limits.Limits;
    }

    export interface FiatAccountCardListItem {
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
        export type CardsListSortingFields = Partial<
          Pick<IssuingCardListItem, 'created_at' | 'card_status' | 'last4' | 'nick_name' | 'name_on_card' | 'card_id'>
        >;
        export type CardsListFilteringFields = Partial<IssuingCardListItem>;

        export type CardsListRequestCommonParams = API.Common.Pagination.Request &
          API.Common.Sorting.Request<CardsListSortingFields> &
          API.Common.Filtering.Request<CardsListFilteringFields>;

        export interface ByWalletUuid extends CardsListRequestCommonParams {
          wallet_uuid: string;
        }

        export interface BySubaccountAndWalletUuid extends ByWalletUuid {
          filter?: Record<'fiat_account', Record<'type', SubAccountType>>;
        }

        export type ByFiatAccountAndWalletId = ByWalletUuid & {
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
      }
      export type StandAloneRequest = CommonRequest;

      export interface FiatAccountRequest extends CommonRequest {
        sub_account_id: string;
      }

      export type StandAloneResponse = IssuingCardDetailItem;
      export type FiatAccountResponse = IssuingCardDetailItem;
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
  }

  export namespace Counterparties {
    export interface Counterparty {
      id: string;
      email: string;
      phone: string;
      name: string;
      nickname: string;
      type: CounterpartyType | string;
      created_at: string;
    }
    export namespace Destination {
      export namespace List {
        export interface DestinationListItemCommonFields {
          id: string;
          nickname: string;
          type: CounterpartyDestinationType | string;
          created_at: string;
        }

        export interface DestinationListItemExternalBankingData {
          account_number: string;
          routing_number: string;
          bank_name: string;
          note: string;
          swift_bic: string;
          address?: {
            city?: string;
            country_id?: number;
            postcode?: string;
            street1?: string;
            street2?: string;
            memo?: string;
          };
        }

        export interface DestinationListItemExternalCryptoData {
          address: string;
          currency_id: string;
        }

        export interface DestinationListItemWithExternalBankingData extends DestinationListItemCommonFields {
          type:
            | CounterpartyDestinationType.DOMESTIC_WIRE
            | CounterpartyDestinationType.ACH
            | CounterpartyDestinationType.SWIFT
            | CounterpartyDestinationType.SEPA;
          external_banking_data: DestinationListItemExternalBankingData;
          external_crypto_data?: never;
        }

        export interface DestinationListItemWithExternalCryptoData extends DestinationListItemCommonFields {
          type: CounterpartyDestinationType.CRYPTO_EXTERNAL | CounterpartyDestinationType.CRYPTO_INTERNAL;
          external_banking_data?: never;
          external_crypto_data: DestinationListItemExternalCryptoData;
        }

        export type CounterpartyDestinationListItem =
          | DestinationListItemWithExternalBankingData
          | DestinationListItemWithExternalCryptoData;

        export interface Request {
          wallet_id: string;
          counterparty_account_id: string;
          limit?: number;
          offset?: number;
          search?: string;
          type?: CounterpartyDestinationType | string;
          sort_by?: 'created_at' | 'nickname' | 'type';
          sort_order?: SortingDirection;
          filter?: {
            type?: CounterpartyDestinationType;
            nickname?: string;
            created_at?: string;
          };
        }

        export type Response = {
          total: number;
          data: CounterpartyDestinationListItem[];
        };
      }

      export namespace Detail {
        export type DestinationDetailItemCommonFields =
          API.Counterparties.Destination.List.DestinationListItemCommonFields;

        export interface DestinationDetailItemExternalBankingData
          extends API.Counterparties.Destination.List.DestinationListItemExternalBankingData {
          address: API.Counterparties.Destination.List.DestinationListItemExternalBankingData['address'] & {
            country?: API.Location.Countries.Country;
          };
        }

        export interface DestinationDetailItemExternalCryptoData
          extends API.Counterparties.Destination.List.DestinationListItemExternalCryptoData {
          currency: API.Currencies.Currency;
        }

        export interface DestinationDetailItemWithExternalBankingData extends DestinationDetailItemCommonFields {
          type:
            | CounterpartyDestinationType.DOMESTIC_WIRE
            | CounterpartyDestinationType.ACH
            | CounterpartyDestinationType.SWIFT
            | CounterpartyDestinationType.SEPA;
          external_banking_data: DestinationDetailItemExternalBankingData;
          external_crypto_data?: never;
        }

        export interface DestinationDetailItemWithExternalCryptoData extends DestinationDetailItemCommonFields {
          type: CounterpartyDestinationType.CRYPTO_EXTERNAL | CounterpartyDestinationType.CRYPTO_INTERNAL;
          external_banking_data?: never;
          external_crypto_data: DestinationDetailItemExternalCryptoData;
        }

        export type DestinationDetailItem =
          | DestinationDetailItemWithExternalBankingData
          | DestinationDetailItemWithExternalCryptoData;
        export interface Request {
          wallet_id: string;
          counterparty_account_id: string;
          counterparty_destination_id: string;
        }

        export type Response = DestinationDetailItem;
      }

      export namespace Create {
        export interface Request {
          wallet_id: string;
          counterparty_account_id: string;
          type: CounterpartyDestinationType;
          nickname: string;
          external_banking_data?: API.Counterparties.Destination.Detail.DestinationDetailItemExternalBankingData;
          external_crypto_data?: API.Counterparties.Destination.Detail.DestinationDetailItemExternalCryptoData;
        }

        export interface Response extends API.Counterparties.Destination.Detail.DestinationDetailItemCommonFields {
          id: string;
          nickname: string;
          created_at: string;
          type: CounterpartyDestinationType;
          external_banking_data?: API.Counterparties.Destination.Detail.DestinationDetailItemExternalBankingData;
          external_crypto_data?: API.Counterparties.Destination.Detail.DestinationDetailItemExternalCryptoData;
        }
      }

      export namespace Update {
        export interface Request {
          wallet_id: string;
          counterparty_account_id: string;
          counterparty_destination_id: string;
          nickname: string;
        }

        export type Response = API.Counterparties.Destination.Detail.DestinationDetailItemCommonFields;
      }
    }

    export namespace GetById {
      export interface Request {
        wallet_id: string;
        counterparty_account_id: string;
      }

      export type Response = Counterparty;
    }

    export namespace List {
      export interface Request {
        wallet_id: string;
        offset?: number;
        limit?: number;
        sort_by?: 'created_at' | 'nickname' | 'type' | 'email' | 'phone';
        sort_order?: SortingDirection;
        filter?: {
          type?: CounterpartyDestinationType;
          nickname?: string;
          created_at?: string;
        };
      }

      export type Response = {
        total: number;
        data: Counterparty[];
      };
    }

    export namespace Create {
      export interface Request {
        email: string;
        phone: string;
        wallet_id: string;
        nickname: string;
        type: CounterpartyType;
      }

      export type Response = Counterparty;
    }

    export namespace Update {
      export interface Request {
        wallet_id: string;
        counterparty_account_id: string;
        nickname: string;
      }

      export type Response = Counterparty;
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

  export namespace FiatAccounts {
    export type Transaction = API.Cards.TransactionItem;
    export type FiatAccountDetails = {
      iban: string;
      bank_name: string;
      swift_code: string;
      bank_address: string;
      receiver_name: string;
      payment_details: string;
      reference_number: string;
      registration_number: string;
    };

    export type TransactionList = {
      count: number;
      data: Transaction[];
      has_more: boolean;
    };
    export interface FiatAccount {
      balance: number;
      cards_count: number;
      created_at: string;
      currency: API.Currencies.FiatCurrency;
      fiat_balance: number;
      type: SubAccountType | string;
      id: string;
      issuing_program: API.Cards.Config.Program;
      nick_name: string;
      program_id: string;
      payment_types: Array<{ order_type: OrderType }>;
      realtime_auth: [
        {
          crypto_token: string;
          fiat_account: string;
          id: string;
          priority: number;
        }
      ];
      realtimeauth_balance: number;
      status: string;
      total_balance: number;
      wallet_id: string;
      account_details?: FiatAccountDetails;
    }

    export interface FiatAccountWithCards extends FiatAccount {
      cards: API.Cards.IssuingCardListItem[];
    }
  }

  export namespace FiatAccountsV2 {
    export type FiatAccountDetails = {
      iban: string;
      bank_name: string;
      swift_code: string;
      bank_address: string;
      receiver_name: string;
      payment_details: string;
      reference_number: string;
      registration_number: string;
    };

    export interface FiatAccount {
      balance: number;
      cards_count: number;
      created_at: string;
      currency: API.Currencies.FiatCurrency;
      fiat_balance: number;
      id: string;
      issuing_program: API.Cards.Config.Program;
      nick_name: string;
      program_id: string;
      realtimeauth_balance: number;
      status: string;
      total_balance: number;
      wallet_id: string;
    }

    export namespace ExtendedFiatAccount {
      export interface ExtendedFiatAccount extends FiatAccount {
        account_details?: FiatAccountDetails;
        payment_types: Array<{ order_type: OrderType }>;
        realtime_auth: [
          {
            crypto_token: string;
            fiat_account: string;
            id: string;
            priority: number;
          }
        ];
      }
      export interface Request {
        wallet_uuid: string;
        fiat_account_id: string;
      }

      export type Response = ExtendedFiatAccount;
    }

    export interface FiatAccountWithCards extends FiatAccount {
      cards: API.Cards.IssuingCardListItem[];
    }

    export interface FiatAccountsList<T extends FiatAccount | FiatAccountWithCards> {
      count: number;
      data: T[];
    }

    export type FiatAccountsListWithCards = FiatAccountsList<FiatAccountWithCards>;
    export type FiatAccountsListWithoutCards = FiatAccountsList<FiatAccount>;

    export namespace CreateFiatAccount {
      export interface Request {
        wallet_id: string;
        program_id: string;
      }
      export type Response = {
        id: string;
        balance: number;
        nick_name: string;
        wallet_id: string;
        created_at: string;
        account_currency: string;
        type: SubAccountType | string;
        program_id: string;
        status: 'ACTIVE';
        fiat: {
          code: string;
          uuid: string;
          symbol: string;
          enabled: boolean;
          coingecko: string;
        };
        issuing_program: {
          id: string;
          form_factor: CardFormFactor | string;
          brand: string;
          tokenizable: boolean;
          type: CardType | string;
        };
      };
    }

    export namespace Transactions {
      // export type Transaction = API.Cards.TransactionItem;
      export type Transaction = {
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
        transaction_type: string;
        is_credit: boolean;
        has_receipt: boolean;
        adjustment_type: string;
        review_status: string;
        group: string;
        total_amount: number;
      };

      export namespace TransactionList {
        export interface Request {
          fiat_account_id: string;
          wallet_uuid: string;
          limit?: number;
          offset?: number;
        }
        export interface Response {
          count: number;
          data: Transaction[];
          has_more: boolean;
        }
      }
    }
  }

  export namespace Issuing {
    export namespace Programs {
      export type Response = {
        count: number;
        data: API.Cards.Config.Program[];
      };
    }
  }

  export namespace KYC {
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
        export type Response = API.Location.Countries.Country[];
      }
    }
  }
  export namespace Orders {
    export namespace Create {
      export namespace ByOrderType {
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
            wallet_uuid: string;
            crypto_uuid: string;
            to_address: string;
            memo?: string;
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

        export namespace TRANSFER_CARD_WHOLESALE {
          export type Request = {
            amount: number;
            wallet_id: string;
            currency_id: string;
            vendor_id: string;
          };
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
        order_type: OrderType.WITHDRAWAL_CRYPTO;
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
    //     is_subsctract: boolean;
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
        status: OrderStatuses | string;
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
    //           is_subsctract: boolean;
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

    //       export namespace FiatAccount {
    //         export type Request = {
    //           amount: number;
    //           fiat_uuid: string;
    //           wallet_uuid: string;
    //           crypto_uuid: string;
    //           fiat_account_id: string;
    //           is_subsctract: boolean;
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
  }

  export namespace User {
    export interface User {
      id: string;
      aud: string;
      confirmation_sent_at: string;
      recovery_sent_at: string;
      email_change_sent_at: string;
      new_email: string;
      new_phone: string;
      invited_at: string;
      action_link: string;
      email: string;
      phone: string;
      created_at: string;
      confirmed_at: string;
      email_confirmed_at: string;
      phone_confirmed_at: string;
      last_sign_in_at: string;
      role: string;
      updated_at: string;
      identities: string[];
      is_anonymous: boolean;
      factors: string[];
    }

    export namespace UpdateUser {
      export namespace Phone {
        export namespace RequestOTP {
          export type Request = {
            phone: string;
            access_token: string;
            refresh_token: string;
          };
        }
        export namespace Confirm {
          export type Request = {
            phone: string;
            token: string;
          };
        }
      }

      export namespace Email {
        export namespace RequestOTP {
          export type Request = {
            email: string;
            access_token: string;
            refresh_token: string;
          };
        }

        export namespace Confirm {
          export type Request = {
            email: string;
            token: string;
          };
        }
      }
    }

    export namespace UserData {
      export interface UserData {
        can_invite: boolean;
        created_at: string;
        id: number;
        kyc_date: string;
        kyc_status: KYCStatuses | string;
        referral_name: string;
        tenant_id: string;
        turnover_limit: number;
        user_id: string;
        default_currency: string;
        is_developer: boolean; // have to add in API V2
        user_group_id: string | null; // have to add in API V2
      }

      export namespace UpdateUserData {
        export type Request = {
          default_currency: string;
        };

        export type Response = API.User.UserData.UserData;
      }
    }
  }

  export namespace Wallets {
    export interface WallletBalanceCryptoDetails {
      uuid: string;
      amount: number;
      fiat_amount: number;
      currency: API.Currencies.Currency;
    }
    export interface WalletBalanceItem {
      symbol: string;
      icon: string;
      name: string;
      is_crypto: boolean;
      decimal?: number | null;
      amount: number;
      fiat_amount: number;
      details: WallletBalanceCryptoDetails[];
    }

    export type WalletBalance = WalletBalanceItem[];

    export namespace WalletChain {
      export interface WalletChain {
        uuid: string;
        created_ad: string;
        address: string;
        wallet_uuid: string;
        chain: number;
      }

      export namespace Create {
        export interface Request {
          wallet_uuid: string;
          chain: number;
          label: string;
        }
        export type Response = WalletChain;
      }
    }

    export interface Wallet {
      uuid: string;
      type: WalletType | string;
      created_at: string;
      fiat_total: number;
      crypto_total: number;
      total_amount: number;
      balance: WalletBalance;
    }

    export namespace WalletsList {
      export interface WalletsListItem {
        type: WalletType | string;
        uuid: string;
        created_at: string;
      }

      export type Response = {
        total: number;
        data: WalletsListItem[];
      };
    }

    export namespace WalletTransactions {
      export interface WalletTransactionMeta {
        transaction_hash?: string;
        fee?: number;
        order_id?: string;
        from_address?: string; // not added on backend
        to_address?: string;
        network_fee?: number;
        network_fee_currency?: string;
        fee_currency?: string;
        billing_amount?: number;
        utila_transaction?: string;
        transcation_amount?: number;
        transaction_amount?: number;
        billing_amount_currency?: string;
        transcation_amount_currency?: string;
        transaction_amount_currency?: string;
        exchange_rate?: number;
        fiat_account_id?: string;
        txid?: string;
        chain_id?: number;
        from_user_data?: number;
        to_user_data?: number;
        to_card_id?: string;
        to_card_last4?: string;
        to_fiat_account_id?: string;
        to_vendor_id?: string;
      }
      export interface Transaction {
        id: number;
        created_at: string;
        type: WalletTransactionType | string;
        method: WalletTransactionMethod | string;
        status: WalletTransactionStatus | string;
        amount: number;
        from: string | null; // deprecated?
        to: string | null; // deprecated?
        wallet_id: string;
        txid: string; // deprecated?
        info: string;
        currency: API.Currencies.Currency;
        record_type: WalletTransactionRecordType | string;
        meta?: WalletTransactionMeta;
      }

      export interface DetailedTransaction {
        id: number;
        amount: number;
        created_at: string;
        from: string;
        info: string;
        status: WalletTransactionStatus | string;
        to: string;
        txid: string;
        type: WalletTransactionType | string;
        wallet_id: string;
        method: WalletTransactionMethod | string;
        meta: WalletTransactionMeta;
        record_type: WalletTransactionRecordType | string;
        currency: API.Currencies.Currency;
      }

      export namespace GetByUuid {
        export type Request = {
          wallet_uuid: string;
          uuid: string;
        };
      }

      export namespace TransactionList {
        export type Request = {
          wallet_uuid: string;
          limit?: number;
          offset?: number;
          filter?: {
            created_at?: string;
            from?: string;
            status?: WalletTransactionStatus;
            to?: string;
            type?: WalletTransactionType;
            method?: WalletTransactionMethod;
            record_type?: WalletTransactionRecordType;
            'currency.uuid'?: string;
            'meta.billing_amount_currency'?: string;
            'meta.transaction_amount_currency'?: string;
            address?: string;
            from_created_at?: string;
            to_created_at?: string;
          };
        };
        export type Response = {
          total: number;
          data: Transaction[];
        };
      }
    }
  }
}
