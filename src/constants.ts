import { API } from '.';
import { IsEnumEqualToUnion, EnumUnionMismatch } from './utils/types';

export type ValueWithLabel = {
  value: string;
  label: string;
};

export type WalletTypeData = {
  [key: string]: ValueWithLabel;
};

export const falsyValues = ['false', '0', '', 'FALSE', false, null, undefined, NaN, 0];

export enum AppEnviroment {
  WEB = 'web',
  TELEGRAM = 'telegram',
}

export enum CardFormFactor {
  VIRTUAL = 'VIRTUAL',
  PHYSICAL = 'PHYSICAL',
}

export enum CardType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum CardTransactionType {
  AUTHORIZATION = 'AUTHORIZATION',
  CLEARING = 'CLEARING',
  REFUND = 'REFUND',
  REVERSAL = 'REVERSAL',
  ORIGINAL_CREDIT = 'ORIGINAL_CREDIT',
  FEE = 'FEE',
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PAYMENT = 'PAYMENT',
  PURCHASE = 'PURCHASE',
}

export enum WalletTransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

export enum WalletTransactionMethod {
  P2P = 'p2p',
  CRYPTO = 'crypto',
  BANK_TRANSFER = 'bank_transfer',
  EXCHANGE = 'exchange',
  SBP = 'sbp',
}

export enum WalletTransactionStatus {
  COMPLETE = 'complete',
  PENDING = 'pending',
  CANCELED = 'canceled',
  FAILED = 'failed',
  PROCESSING = 'processing',
  NEW = 'new',
}

export enum OrderTypePaymentMethod {
  ACH = 'ACH',
  SEPA = 'SEPA',
  SEPA_CT = 'SEPA_CT', // DEPRECATED, use SEPA instead
  SWIFT = 'SWIFT',
  // DOMESTIC_WIRE = 'DOMESTIC_WIRE', // DEPRECATED, use FEDWIRE instead
  FEDWIRE = 'FEDWIRE',
  CRYPTO_EXTERNAL = 'CRYPTO_EXTERNAL',
  CRYPTO_INTERNAL = 'CRYPTO_INTERNAL',
  CHAPS = 'CHAPS',
  FPS = 'FPS',
}

export const orderTypePaymentMethodCheck: IsEnumEqualToUnion<
  OrderTypePaymentMethod,
  API.Orders.V2.OrderTypes.PaymentMethod
> = true;
export type OrderTypePaymentMethodMismatch = EnumUnionMismatch<
  OrderTypePaymentMethod,
  API.Orders.V2.OrderTypes.PaymentMethod
>;

export enum OrderType {
  // when extend do not forget to add new order type to the enum WalletTransactionRecordType
  DEPOSIT_ISSUING_SA_CRYPTO_EXT = 'DEPOSIT_ISSUING_SA_CRYPTO_EXT',
  DEPOSIT_ISSUING_SA_SEPA_EXT = 'DEPOSIT_ISSUING_SA_SEPA_EXT',
  DEPOSIT_CRYPTO = 'DEPOSIT_CRYPTO',
  DEPOSIT_FIAT_SEPA = 'DEPOSIT_FIAT_SEPA',
  DEPOSIT_FIAT_SWIFT = 'DEPOSIT_FIAT_SWIFT',
  EXCHANGE_CRYPTO_INTERNAL = 'EXCHANGE_CRYPTO_INTERNAL',
  EXCHANGE_OMNI = 'EXCHANGE_OMNI',
  TRANSFER_CARD_PREPAID = 'TRANSFER_CARD_PREPAID',
  CARD_ISSUING_FEE = 'CARD_ISSUING_FEE',
  TRANSFER_CARD_SUBACCOUNT = 'TRANSFER_CARD_SUBACCOUNT',
  TRANSFER_CARD_WHOLESALE = 'TRANSFER_CARD_WHOLESALE',
  TRANSFER_INTERNAL = 'TRANSFER_INTERNAL',
  WITHDRAWAL_CRYPTO = 'WITHDRAWAL_CRYPTO',
  WITHDRAWAL_FIAT_SEPA = 'WITHDRAWAL_FIAT_SEPA',
  HIFI_WIRE_ONRAMP = 'HIFI_WIRE_ONRAMP',
  HIFI_WIRE_OFFRAMP = 'HIFI_WIRE_OFFRAMP',
  HIFI_WIRE_DEPOSIT = 'HIFI_WIRE_DEPOSIT',
  HIFI_WIRE_WITHDRAWAL = 'HIFI_WIRE_WITHDRAWAL',
  HIFI_ACH_ONRAMP = 'HIFI_ACH_ONRAMP',
  HIFI_ACH_OFFRAMP = 'HIFI_ACH_OFFRAMP',
  HIFI_ACH_DEPOSIT = 'HIFI_ACH_DEPOSIT',
  HIFI_ACH_WITHDRAWAL = 'HIFI_ACH_WITHDRAWAL',
  HIFI_SEPA_ONRAMP = 'HIFI_SEPA_ONRAMP',
  HIFI_SEPA_OFFRAMP = 'HIFI_SEPA_OFFRAMP',
  HIFI_SEPA_DEPOSIT = 'HIFI_SEPA_DEPOSIT',
  HIFI_SEPA_WITHDRAWAL = 'HIFI_SEPA_WITHDRAWAL',
  HIFI_CRYPTO_TRANSFER = 'HIFI_CRYPTO_TRANSFER',
  HIFI_CRYPTO_WITHDRAWAL = 'HIFI_CRYPTO_WITHDRAWAL',
  HIFI_CRYPTO_DEPOSIT = 'HIFI_CRYPTO_DEPOSIT',
  OMNIBUS_CRYPTO_TRANSFER = 'OMNIBUS_CRYPTO_TRANSFER',
  RN_CARDS_OFFRAMP = 'RN_CARDS_OFFRAMP',
  TBD_SWIFT_WITHDRAWAL = 'TBD_SWIFT_WITHDRAWAL', // not implemented yet
  SEGREGATED_CRYPTO_TRANSFER = 'SEGREGATED_CRYPTO_TRANSFER',
  L2F_ACH_ONRAMP = 'L2F_ACH_ONRAMP',
  L2F_ACH_OFFRAMP = 'L2F_ACH_OFFRAMP',
  L2F_ACH_DEPOSIT = 'L2F_ACH_DEPOSIT',
  L2F_ACH_WITHDRAWAL = 'L2F_ACH_WITHDRAWAL',
  L2F_WIRE_ONRAMP = 'L2F_WIRE_ONRAMP',
  L2F_WIRE_OFFRAMP = 'L2F_WIRE_OFFRAMP',
  L2F_WIRE_DEPOSIT = 'L2F_WIRE_DEPOSIT',
  L2F_WIRE_WITHDRAWAL = 'L2F_WIRE_WITHDRAWAL',
  L2F_SWIFT_ONRAMP = 'L2F_SWIFT_ONRAMP',
  L2F_SWIFT_OFFRAMP = 'L2F_SWIFT_OFFRAMP',
  L2F_SWIFT_DEPOSIT = 'L2F_SWIFT_DEPOSIT',
  L2F_SWIFT_WITHDRAWAL = 'L2F_SWIFT_WITHDRAWAL',
  L2F_SEPA_ONRAMP = 'L2F_SEPA_ONRAMP',
  L2F_SEPA_OFFRAMP = 'L2F_SEPA_OFFRAMP',
  L2F_SEPA_DEPOSIT = 'L2F_SEPA_DEPOSIT',
  L2F_SEPA_WITHDRAWAL = 'L2F_SEPA_WITHDRAWAL',
  L2F_CRYPTO_WITHDRAWAL = 'L2F_CRYPTO_WITHDRAWAL',
  L2F_CRYPTO_DEPOSIT = 'L2F_CRYPTO_DEPOSIT',
  OMNIBUS_CRYPTO_WITHDRAWAL = 'OMNIBUS_CRYPTO_WITHDRAWAL',
  OMNIBUS_INTERNAL_TRANSFER = 'OMNIBUS_INTERNAL_TRANSFER',
  WITHDRAW_CARD_PREPAID = 'WITHDRAW_CARD_PREPAID',
  WITHDRAW_CARD_SUBACCOUNT = 'WITHDRAW_CARD_SUBACCOUNT',
}

export enum WalletTransactionRecordType {
  CARD_PROVIDER_DEPOSIT = 'CARD_PROVIDER_DEPOSIT',
  CARD_PROVIDER_REFUND = 'CARD_PROVIDER_REFUND',
  CARD_PROVIDER_WITHDRAWAL = 'CARD_PROVIDER_WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
  DEPOSIT_CRYPTO_EXTERNAL = 'DEPOSIT_CRYPTO_EXTERNAL',
  DEPOSIT_CRYPTO_INTERNAL = 'DEPOSIT_CRYPTO_INTERNAL',
  DEPOSIT_INTERNAL = 'DEPOSIT_INTERNAL',
  DEPOSIT_MANUAL = 'DEPOSIT_MANUAL',
  EXCHANGE_CRYPTO_INTERNAL = 'EXCHANGE_CRYPTO_INTERNAL',
  EXCHANGE_OMNI = 'EXCHANGE_OMNI',
  EXT_EXCHANGE = 'EXT_EXCHANGE',
  FEE = 'FEE',
  NETWORK_FEE = 'NETWORK_FEE',
  OFFRAMP_ACHWIRE = 'OFFRAMP_ACHWIRE',
  OFFRAMP_SEPA = 'OFFRAMP_SEPA',
  OMNIBUS_CRYPTO_TRANSFER = 'OMNIBUS_CRYPTO_TRANSFER',
  OMNIBUS_INTERNAL_TRANSFER = 'OMNIBUS_INTERNAL_TRANSFER',
  ONRAMP_ACHWIRE = 'ONRAMP_ACHWIRE',
  ONRAMP_SEPA = 'ONRAMP_SEPA',
  REFUND = 'REFUND',
  RN_CARDS_OFFRAMP = 'RN_CARDS_OFFRAMP',
  TRANSFER_CARD_PREPAID = 'TRANSFER_CARD_PREPAID',
  TRANSFER_CARD_SUBACCOUNT = 'TRANSFER_CARD_SUBACCOUNT',
  TRANSFER_CARD_WHOLESALE = 'TRANSFER_CARD_WHOLESALE',
  TRANSFER_INTERNAL = 'TRANSFER_INTERNAL',
  SEGREGATED_CRYPTO_TRANSFER = 'SEGREGATED_CRYPTO_TRANSFER',
  WHOLESALE_CARD_DEPOSIT = 'WHOLESALE_CARD_DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  WITHDRAWAL_CRYPTO_EXTERNAL = 'WITHDRAWAL_CRYPTO_EXTERNAL',
  WITHDRAWAL_CRYPTO_INTERNAL = 'WITHDRAWAL_CRYPTO_INTERNAL',
  WITHDRAWAL_INTERNAL = 'WITHDRAWAL_INTERNAL',
  WITHDRAW_CARD_PREPAID = 'WITHDRAW_CARD_PREPAID',
  WITHDRAW_CARD_SUBACCOUNT = 'WITHDRAW_CARD_SUBACCOUNT',
  L2F_ACH_ONRAMP = 'L2F_ACH_ONRAMP',
  L2F_ACH_OFFRAMP = 'L2F_ACH_OFFRAMP',
  L2F_ACH_DEPOSIT = 'L2F_ACH_DEPOSIT',
  L2F_ACH_WITHDRAWAL = 'L2F_ACH_WITHDRAWAL',
  L2F_WIRE_ONRAMP = 'L2F_WIRE_ONRAMP',
  L2F_WIRE_OFFRAMP = 'L2F_WIRE_OFFRAMP',
  L2F_WIRE_DEPOSIT = 'L2F_WIRE_DEPOSIT',
  L2F_WIRE_WITHDRAWAL = 'L2F_WIRE_WITHDRAWAL',
  L2F_SWIFT_ONRAMP = 'L2F_SWIFT_ONRAMP',
  L2F_SWIFT_OFFRAMP = 'L2F_SWIFT_OFFRAMP',
  L2F_SWIFT_DEPOSIT = 'L2F_SWIFT_DEPOSIT',
  L2F_SWIFT_WITHDRAWAL = 'L2F_SWIFT_WITHDRAWAL',
  L2F_SEPA_ONRAMP = 'L2F_SEPA_ONRAMP',
  L2F_SEPA_OFFRAMP = 'L2F_SEPA_OFFRAMP',
  L2F_SEPA_DEPOSIT = 'L2F_SEPA_DEPOSIT',
  L2F_SEPA_WITHDRAWAL = 'L2F_SEPA_WITHDRAWAL',
  L2F_CRYPTO_WITHDRAWAL = 'L2F_CRYPTO_WITHDRAWAL',
  L2F_CRYPTO_DEPOSIT = 'L2F_CRYPTO_DEPOSIT',
  HIFI_WIRE_ONRAMP = 'HIFI_WIRE_ONRAMP',
  HIFI_WIRE_OFFRAMP = 'HIFI_WIRE_OFFRAMP',
  HIFI_WIRE_DEPOSIT = 'HIFI_WIRE_DEPOSIT',
  HIFI_WIRE_WITHDRAWAL = 'HIFI_WIRE_WITHDRAWAL',
  HIFI_ACH_ONRAMP = 'HIFI_ACH_ONRAMP',
  HIFI_ACH_OFFRAMP = 'HIFI_ACH_OFFRAMP',
  HIFI_ACH_DEPOSIT = 'HIFI_ACH_DEPOSIT',
  HIFI_ACH_WITHDRAWAL = 'HIFI_ACH_WITHDRAWAL',
  HIFI_SEPA_ONRAMP = 'HIFI_SEPA_ONRAMP',
  HIFI_SEPA_OFFRAMP = 'HIFI_SEPA_OFFRAMP',
  HIFI_SEPA_DEPOSIT = 'HIFI_SEPA_DEPOSIT',
  HIFI_SEPA_WITHDRAWAL = 'HIFI_SEPA_WITHDRAWAL',
  HIFI_CRYPTO_TRANSFER = 'HIFI_CRYPTO_TRANSFER',
  HIFI_CRYPTO_WITHDRAWAL = 'HIFI_CRYPTO_WITHDRAWAL',
  HIFI_CRYPTO_DEPOSIT = 'HIFI_CRYPTO_DEPOSIT',
}

export enum RequestStatus {
  NONE = 'none',
  PENDING = 'pending',
  FULLFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export enum RequestLoadingType {
  NORMAL = 'normal',
  TRANSPARENT = 'transparent',
}

export enum ResponseStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  VERIFICATION_EXPIRED = 419,
  UNPROCESSABLE_ENTITY = 422,
  USER_BLOCKED = 423,
  SERVER_ERROR = 500,
}

export enum WalletTypeValues {
  BUSINESS = 'business',
  PERSONAL = 'personal',
  P2P = 'trading',
  ESCROW = 'escrow',
  MERCHANT = 'merchant',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
  VAULT = 'vault',
}

export const walletTypeData: WalletTypeData = {
  personal: { value: WalletTypeValues.PERSONAL, label: 'Personal' },
  p2p: { value: 'p2p', label: 'P2P' },
  escrow: { value: WalletTypeValues.ESCROW, label: 'Escrow' },
  merchant: { value: WalletTypeValues.MERCHANT, label: 'Merchant' },
  exchange: { value: WalletTypeValues.EXCHANGE, label: 'Exchange' },
  staking: { value: WalletTypeValues.STAKING, label: 'Staking' },
  vault: { value: WalletTypeValues.VAULT, label: 'Vault' },
};

export const defaultPaginationParams = {
  limit: 10,
  offset: 0,
  isLastPage: true,
};

export enum CalcType {
  ONRAMP = 'onramp',
  OFFRAMP = 'offramp',
  WITHDRAWAL = 'withdrawal',
}

export enum KYCStatuses {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  HOLD = 'HOLD',
  DOUBLE = 'DOUBLE',
  SOFT_REJECT = 'SOFT_REJECT',
  REJECT = 'REJECT',
  UNVERIFIED = 'UNVERIFIED',
  WAITING_ON_UBOS = 'WAITING_ON_UBOS',
  WAITING_ON_REVIEW = 'WAITING_ON_REVIEW',
}

export const KYCStatusCheck: IsEnumEqualToUnion<KYCStatuses, API.KYC.KYCStatus> = true;
export type KYCStatusMismatch = EnumUnionMismatch<KYCStatuses, API.KYC.KYCStatus>;

export enum OrderStatuses {
  NEW = 'NEW',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  CANCELED = 'CANCELED',
  COMPLETE = 'COMPLETE',
  RETURNED = 'RETURNED',
  ERROR = 'ERROR',
  FAILED = 'FAILED',
}

export const OrderStatusCheck: IsEnumEqualToUnion<OrderStatuses, API.Orders.V2.GetById.Response['status']> = true;
export type OrderStatusMismatch = EnumUnionMismatch<OrderStatuses, API.Orders.V2.GetById.Response['status']>;

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  BLOCKED = 'BLOCKED',
  INACTIVE = 'INACTIVE',
  CANCELED = 'CANCELED',
  CLOSED = 'CLOSED',
}

export enum IssuingProgramStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum SubAccountStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  INACTIVE = 'INACTIVE',
  CANCELED = 'CANCELED',
}

export enum SubAccountType {
  PREPAID = 'prepaid',
  BALANCE = 'balance',
}

export enum CurrencyType {
  TOKEN = 'token',
  NATIVE = 'native',
  FIAT = 'fiat',
}

export enum APIKeyRole {
  READ_ONLY = 'READ_ONLY',
  DEVELOPER = 'DEVELOPER',
  PRODUCTION = 'PRODUCTION',
}

export enum SortingDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum CounterpartyType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
}
export const counterpartyTypeCheck: IsEnumEqualToUnion<CounterpartyType, API.Counterparties.CounterpartyType> = true;

export enum CounterpartyDestinationType {
  FEDWIRE = 'FEDWIRE',
  ACH = 'ACH',
  SWIFT = 'SWIFT',
  SEPA = 'SEPA',
  CRYPTO_EXTERNAL = 'CRYPTO_EXTERNAL',
  CRYPTO_INTERNAL = 'CRYPTO_INTERNAL',
  CHAPS = 'CHAPS',
  FPS = 'FPS',
}

export const counterpartyBankingDestinationTypes: Record<
  API.Counterparties.Destination.BankingDestinationType,
  CounterpartyDestinationType
> = {
  FEDWIRE: CounterpartyDestinationType.FEDWIRE,
  ACH: CounterpartyDestinationType.ACH,
  SWIFT: CounterpartyDestinationType.SWIFT,
  SEPA: CounterpartyDestinationType.SEPA,
  CHAPS: CounterpartyDestinationType.CHAPS,
  FPS: CounterpartyDestinationType.FPS,
};

export const counterpartyCryptoDestinationTypes: Record<
  API.Counterparties.Destination.CryptoDestinationType,
  CounterpartyDestinationType
> = {
  CRYPTO_EXTERNAL: CounterpartyDestinationType.CRYPTO_EXTERNAL,
  CRYPTO_INTERNAL: CounterpartyDestinationType.CRYPTO_INTERNAL,
};

export const counterpartyCryptoDestinationTypesValues: API.Counterparties.Destination.CryptoDestinationType[] =
  Object.keys(counterpartyCryptoDestinationTypes).map(
    (key) => key as API.Counterparties.Destination.CryptoDestinationType,
  );
export const counterpartyBankingDestinationTypesValues: API.Counterparties.Destination.BankingDestinationType[] =
  Object.keys(counterpartyBankingDestinationTypes).map(
    (key) => key as API.Counterparties.Destination.BankingDestinationType,
  );

export const counterpartyBankingAndCryptoDestinationTypeCheck: IsEnumEqualToUnion<
  API.Counterparties.Destination.CounterpartyDestinationType,
  API.Counterparties.Destination.DestinationType
> = true;
export type CounterpartyBankingAndCryptoDestinationTypeMismatch = EnumUnionMismatch<
  API.Counterparties.Destination.CounterpartyDestinationType,
  API.Counterparties.Destination.DestinationType
>;

export const counterpartyDestinationTypeCheck: IsEnumEqualToUnion<
  CounterpartyDestinationType,
  API.Counterparties.Destination.CounterpartyDestinationType
> = true;

export type CounterpartyDestinationTypeMismatch = EnumUnionMismatch<
  CounterpartyDestinationType,
  API.Counterparties.Destination.CounterpartyDestinationType
>;

export enum VirtualAccountsInstructionType {
  ACH = 'ACH',
  FEDWIRE = 'FEDWIRE',
  SWIFT = 'SWIFT',
  SEPA = 'SEPA',
  SEPA_CT = 'SEPA_CT', // DEPRECATED, use SEPA instead
  CHAPS = 'CHAPS',
  FPS = 'FPS',
  CRYPTO_EXTERNAL = 'CRYPTO_EXTERNAL',
  CRYPTO_INTERNAL = 'CRYPTO_INTERNAL',
}

export const isOrderPaymentMethodEqualWithVirtualAccountsInstructionType: IsEnumEqualToUnion<
  OrderTypePaymentMethod,
  API.VirtualAccounts.VirtualAccount.DepositInstruction.InstructionType
> = true;
export type OrderPaymentMethodEqualWithVirtualAccountsInstructionTypeMismatch = EnumUnionMismatch<
  OrderTypePaymentMethod,
  API.VirtualAccounts.VirtualAccount.DepositInstruction.InstructionType
>;

export const virtualAccountsInstructionTypeCheck: IsEnumEqualToUnion<
  VirtualAccountsInstructionType,
  API.VirtualAccounts.VirtualAccount.DepositInstruction.InstructionType
> = true;
export type VirtualAccountsInstructionTypeMismatch = EnumUnionMismatch<
  VirtualAccountsInstructionType,
  API.VirtualAccounts.VirtualAccount.DepositInstruction.InstructionType
>;

export enum CardTransactionStatus {
  APPROVED = 'APPROVED',
  CLEARED = 'CLEARED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  REVERSED = 'REVERSED',
  DECLINED = 'DECLINED',
}
