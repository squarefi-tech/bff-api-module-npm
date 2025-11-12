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
} from '../../constants';
import { WalletType } from '../..';
import { components, operations, paths } from './autogen/apiV2.types';

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
    export namespace GetBankDataByAccountNumber {
      export type Request = operations['BankDataController_getBankDataByCode']['parameters']['query'];
      export type Response =
        operations['BankDataController_getBankDataByCode']['responses']['200']['content']['application/json'];
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

        export type BySubAccountAndWalletId = ByWalletUuid & {
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

  export namespace Counterparties {
    export interface Counterparty {
      id: string;
      email: string;
      phone: string;
      name: string;
      nickname?: string | null;
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
          account_number?: string;
          routing_number?: string;
          bank_name: string;
          note: string;
          swift_bic?: string;
          address: {
            city: string;
            country_id: number;
            state_id: number;
            postcode: string;
            street1: string;
            street2?: string;
          };
        }

        export interface DestinationListItemExternalCryptoData {
          address: string;
          currency_id: string;
          memo?: string;
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
            state?: API.Location.States.State;
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
        export interface ExternalBankingData {
          account_number: string;
          routing_number: string;
          bank_name: string;
          note: string;
          swift_bic: string;
        }
        export interface Request {
          wallet_id: string;
          counterparty_account_id: string;
          type: CounterpartyDestinationType;
          nickname: string;
          external_banking_data?: API.Counterparties.Destination.Detail.DestinationDetailItemExternalBankingData;

          external_crypto_data?: Pick<
            API.Counterparties.Destination.Detail.DestinationDetailItemExternalCryptoData,
            'currency_id' | 'address' | 'memo'
          >;
        }

        export type Response = API.Counterparties.Destination.Detail.DestinationDetailItem;
      }

      export namespace Delete {
        export interface Request {
          wallet_id: string;
          counterparty_account_id: string;
          counterparty_destination_id: string;
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
          search?: string;
        };
      }

      export type Response = {
        total: number;
        data: Counterparty[];
      };
    }

    export namespace Create {
      export type Request = Omit<Counterparty, 'id' | 'created_at'> & {
        wallet_id: string;
      };

      export type Response = Counterparty;
    }

    export namespace Update {
      export type Request = Partial<Omit<Counterparty, 'id' | 'created_at'>> & {
        wallet_id: string;
        counterparty_account_id: string;
      };

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
            status: OrderStatuses;
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
            status: OrderStatuses;
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
            status: OrderStatuses;
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
            status: OrderStatuses;
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

    export namespace OrderTypes {
      export type OrderTypeKycRail = {
        id: string;
        kyc_rail_id: string;
      };
      export interface OrderInfo {
        id: string;
        transaction_type: string;
        description: string | null;
        direction: 'deposit' | 'withdrawal';
        is_internal: boolean;
        // kyc_rails_id: string | null; // deprecated use order_types_kyc_rails instead
        order_types_kyc_rails: OrderTypeKycRail[];
        payment_method: OrderType | string;
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
            }

            export interface OrderWithCounterpartyParams extends BaseOrderParams {
              counterparty_destination_id: string;
            }

            export interface OrderWithWalletAccountParams extends BaseOrderParams {
              wallet_account_id: string;
            }

            export interface OrderWithVirtualAccountParams extends BaseOrderParams {
              virtual_account_id?: string;
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
              status: OrderStatuses;
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
              order_type: 'L2F_SEPA_OFFRAMP' | 'L2F_SWIFT_OFFRAMP' | 'L2F_ACH_OFFRAMP' | 'L2F_WIRE_OFFRAMP';
              meta: {
                request_id: string;
                virtual_account_id: string;
              };
            }
          }
        }

        export namespace ByOrderType {
          export namespace INTERNAL_TRANSFER {
            export interface Request {
              wallet_id: string;
              from_crypto_uuid: string;
              to_wallet_id: string;
              to_wallet_uuid: string;
              amount: number;
              request_id: string;
              is_subtract: boolean;
              is_reverse: boolean;
            }

            export type Response = null;
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
            export type Request = Common.Request.OrderWithCounterpartyParams;
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
        }
      }

      export namespace OrderTypes {
        export interface OrderInfo {
          id: string;
          transaction_type: string;
          description: string | null;
          direction: 'deposit' | 'withdrawal';
          is_internal: boolean;
          kyc_rails_id: string | null;
          payment_method: OrderType | string;
        }

        export namespace List {
          export type Response = OrderInfo[];
        }
      }

      export namespace List {
        export namespace ByWallet {
          export interface Request {
            wallet_uuid: string;
            offset?: number;
            limit?: number;
            sort_by?: string;
            sort_order?: 'asc' | 'desc';
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
            status: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED' | 'CANCELED';
            created_at: string;
            updated_at?: string | null;
            sub_account_id?: string | null;
            meta: OrderMeta;
            info?: string | null;
          }

          export type Response = OrderItem[];
        }
      }

      export namespace GetById {
        export interface Request {
          order_uuid: string;
        }

        export type OrderMetaExtended = Omit<
          API.Orders.V2.List.ByWallet.OrderMeta,
          'to_crypto_address' | 'sub_account_id' | 'to_address' | 'sub_account_currency' | 'crypto_transaction_hash'
        >;

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

        export interface DepositInstruction {
          instruction_type: string;
          asset_type_id: string;
          account_number: string;
          routing_number?: string;
          account_routing_number?: string;
          institution_name: string;
          account_holder_name?: string;
          memo: string;
          institution_address?: DepositInstructionAddress;
          account_holder_address?: DepositInstructionAddress;
        }

        export interface VirtualAccountAccountDetails {
          rail_account_id: string;
          rail_asset_type: string;
          rail_product_id: string;
          rail_customer_id: string;
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
          account_details: VirtualAccountAccountDetails;
          deposit_instructions?: DepositInstruction[];
          account_currency_details: API.Currencies.SimplifiedCurrency;
          destination_currency_details: API.Currencies.SimplifiedCurrency;
          integration_vendor: IntegrationVendorExtended;
        }

        export type OrderDetails = Omit<API.Orders.V2.List.ByWallet.OrderItem, 'id' | 'meta'> & {
          id: string;
          meta: OrderMetaExtended;
          request_id: string;
          updated_at: string;
          wallet: API.Wallets.SimplifiedWallet;
          from_currency: API.Currencies.SimplifiedCurrency;
          to_currency: API.Currencies.SimplifiedCurrency;
          virtual_account?: VirtualAccountDetails | null;
          counterparty_destination?: CounterpartyDestination | null;
        };

        export type Response = OrderDetails;
      }
    }
  }

  export namespace Persona {
    export namespace Inquiries {
      export type InquiryType = operations['PersonaController_initInquiry']['parameters']['path']['type'];
      export namespace Init {
        export type Request = operations['PersonaController_initInquiry']['parameters']['path'];
        export type Response =
          operations['PersonaController_initInquiry']['responses']['200']['content']['application/json'];
      }
      export namespace Resume {
        export type Request = operations['PersonaController_resumeInquiry']['parameters']['path'];
        export type Response =
          operations['PersonaController_resumeInquiry']['responses']['200']['content']['application/json'];
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
          meta?: {
            currency?: string;
            description?: string;
            counterparty_account_id?: string;
            from_currency_id?: string;
            to_currency_id?: string;
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

      export type Response = API.VirtualAccounts.VirtualAccount.VirtualAccountDetailItem;
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

      export interface AccountDetails {
        bankName: string;
        bankAddress: string;
        beneficiary: API.VirtualAccounts.VirtualAccount.Beneficiary;
        swiftCode: string;
        ach?: {
          accountNumber: string;
          routingNumber: string;
        };
        rtp?: {
          accountNumber: string;
          routingNumber: string;
        };
        wire?: {
          accountNumber: string;
          routingNumber: string;
        };
        swift?: {
          accountNumber: string;
          routingNumber: string;
        };
      }

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
        export type InstructionType = 'ACH' | 'FEDWIRE' | 'SWIFT' | 'SEPA_CT' | 'CHAPS' | 'FPS';

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
        export interface SEPA extends Common {
          instruction_type: 'SEPA_CT';
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
        account_currency: API.Currencies.Currency;
        va_programs_id: string;
        destination_currency: API.Currencies.Currency;
        destination_address: string;
        integration_vendor_id: string;
        vendor_account_id: string;
        account_details: API.VirtualAccounts.VirtualAccount.AccountDetails;
        virtual_accounts_program: API.VirtualAccounts.Programs.Program;
        deposit_instructions?: API.VirtualAccounts.VirtualAccount.DepositInstruction.DepositInstruction[];
      }
      export interface VirtualAccountDetailItem {
        account_currency: string;
        account_currency_details: API.Currencies.Currency;
        account_details: API.VirtualAccounts.VirtualAccount.AccountDetails;
        balance: number;
        crypto_deposit_details: {
          currency_id: string;
          deposit_address: string;
          chain_id: number;
        }[];
        created_at: string;
        destination_address: string;
        destination_currency: string;
        destination_currency_details: API.Currencies.Currency;
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
    export type User = components['schemas']['UserEntity'];

    export namespace Get {
      export type Request = operations['UserController_getMe']['parameters']['query'];
      export type Response = operations['UserController_getMe']['responses']['200']['content']['application/json'];
    }

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
  }

  export namespace Wallets {
    // Упрощенная версия кошелька (используется в некоторых эндпоинтах)
    export interface SimplifiedWallet {
      uuid: string;
      user_id: string;
      tenant_id: string;
    }

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
          limit: number;
          offset: number;
          filter?: Partial<components['schemas']['TransactionsFilter']>;
        };
        export type Response = {
          total: number;
          data: Transaction[];
        };

        export namespace ExportCsv {
          export type Request = {
            wallet_uuid: string;
            filter?: Partial<components['schemas']['TransactionsFilter']>;
          };
          export type Response = string;
        }
      }
    }
  }
}
