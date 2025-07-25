export type ValueWithLabel = {
  value: string;
  label: string;
};

export type WalletType = {
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

export enum WalletTransactionRecordType {
  CARD_PROVIDER_DEPOSIT = 'CARD_PROVIDER_DEPOSIT',
  CARD_PROVIDER_REFUND = 'CARD_PROVIDER_REFUND',
  DEPOSIT = 'DEPOSIT',
  DEPOSIT_CRYPTO_EXTERNAL = 'DEPOSIT_CRYPTO_EXTERNAL',
  DEPOSIT_CRYPTO_INTERNAL = 'DEPOSIT_CRYPTO_INTERNAL',
  DEPOSIT_INTERNAL = 'DEPOSIT_INTERNAL',
  DEPOSIT_MANUAL = 'DEPOSIT_MANUAL',
  EXCHANGE_CRYPTO_INTERNAL = 'EXCHANGE_CRYPTO_INTERNAL',
  EXT_EXCHANGE = 'EXT_EXCHANGE',
  FEE = 'FEE',
  HIFI_ACH_OFFRAMP = 'HIFI_ACH_OFFRAMP',
  HIFI_ACH_ONRAMP = 'HIFI_ACH_ONRAMP',
  HIFI_CRYPTO_TRANSFER = 'HIFI_CRYPTO_TRANSFER',
  HIFI_SEPA_OFFRAMP = 'HIFI_SEPA_OFFRAMP',
  HIFI_SEPA_ONRAMP = 'HIFI_SEPA_ONRAMP',
  HIFI_WIRE_OFFRAMP = 'HIFI_WIRE_OFFRAMP',
  HIFI_WIRE_ONRAMP = 'HIFI_WIRE_ONRAMP',
  NETWORK_FEE = 'NETWORK_FEE',
  OFFRAMP_ACHWIRE = 'OFFRAMP_ACHWIRE',
  OFFRAMP_SEPA = 'OFFRAMP_SEPA',
  OMNIBUS_CRYPTO_TRANSFER = 'OMNIBUS_CRYPTO_TRANSFER',
  ONRAMP_ACHWIRE = 'ONRAMP_ACHWIRE',
  ONRAMP_SEPA = 'ONRAMP_SEPA',
  REFUND = 'REFUND',
  SEGREGATED_CRYPTO_TRANSFER = 'SEGREGATED_CRYPTO_TRANSFER',
  WHOLESALE_CARD_DEPOSIT = 'WHOLESALE_CARD_DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  WITHDRAWAL_CRYPTO_EXTERNAL = 'WITHDRAWAL_CRYPTO_EXTERNAL',
  WITHDRAWAL_CRYPTO_INTERNAL = 'WITHDRAWAL_CRYPTO_INTERNAL',
  WITHDRAWAL_INTERNAL = 'WITHDRAWAL_INTERNAL',
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

export const walletType: WalletType = {
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
}

export enum OrderStatuses {
  NEW = 'NEW',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  CANCELED = 'CANCELED',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
  FAILED = 'FAILED',
}

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

export enum OrderType {
  DEPOSIT_ISSUING_SA_CRYPTO_EXT = 'DEPOSIT_ISSUING_SA_CRYPTO_EXT',
  DEPOSIT_ISSUING_SA_SEPA_EXT = 'DEPOSIT_ISSUING_SA_SEPA_EXT',
  DEPOSIT_CRYPTO = 'DEPOSIT_CRYPTO',
  DEPOSIT_FIAT_SEPA = 'DEPOSIT_FIAT_SEPA',
  DEPOSIT_FIAT_SWIFT = 'DEPOSIT_FIAT_SWIFT',
  EXCHANGE_CRYPTO_INTERNAL = 'EXCHANGE_CRYPTO_INTERNAL',
  TRANSFER_CARD_PREPAID = 'TRANSFER_CARD_PREPAID',
  CARD_ISSUING_FEE = 'CARD_ISSUING_FEE',
  TRANSFER_CARD_SUBACCOUNT = 'TRANSFER_CARD_SUBACCOUNT',
  TRANSFER_CARD_WHOLESALE = 'TRANSFER_CARD_WHOLESALE',
  TRANSFER_INTERNAL = 'TRANSFER_INTERNAL',
  WITHDRAWAL_CRYPTO = 'WITHDRAWAL_CRYPTO',
  WITHDRAWAL_FIAT_SEPA = 'WITHDRAWAL_FIAT_SEPA',
  HIFI_WIRE_ONRAMP = 'HIFI_WIRE_ONRAMP',
  HIFI_ACH_ONRAMP = 'HIFI_ACH_ONRAMP',
  HIFI_SEPA_ONRAMP = 'HIFI_SEPA_ONRAMP',
  HIFI_WIRE_OFFRAMP = 'HIFI_WIRE_OFFRAMP',
  HIFI_ACH_OFFRAMP = 'HIFI_ACH_OFFRAMP',
  HIFI_SEPA_OFFRAMP = 'HIFI_SEPA_OFFRAMP',
  HIFI_CRYPTO_TRANSFER = 'HIFI_CRYPTO_TRANSFER',
  OMNIBUS_CRYPTO_TRANSFER = 'OMNIBUS_CRYPTO_TRANSFER',
  TBD_SWIFT_WITHDRAWAL = 'TBD_SWIFT_WITHDRAWAL', // not implemented yet
  SEGREGATED_CRYPTO_TRANSFER = 'SEGREGATED_CRYPTO_TRANSFER',
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

export enum CounterpartyDestinationType {
  DOMESTIC_WIRE = 'DOMESTIC_WIRE',
  ACH = 'ACH',
  SWIFT = 'SWIFT',
  SEPA = 'SEPA',
  CRYPTO_EXTERNAL = 'CRYPTO_EXTERNAL',
  CRYPTO_INTERNAL = 'CRYPTO_INTERNAL',
}

export enum CardTransactionStatus {
  APPROVED = 'APPROVED',
  CLEARED = 'CLEARED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  REVERSED = 'REVERSED',
}
