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

export enum WalletTransactionRecordType {
  CARD_PROVIDER_DEPOSIT = 'CARD_PROVIDER_DEPOSIT',
  CARD_PROVIDER_REFUND = 'CARD_PROVIDER_REFUND',
  DEPOSIT = 'DEPOSIT',
  DEPOSIT_CRYPTO_EXTERNAL = 'DEPOSIT_CRYPTO_EXTERNAL',
  DEPOSIT_CRYPTO_INTERNAL = 'DEPOSIT_CRYPTO_INTERNAL',
  EXCHANGE_CRYPTO_INTERNAL = 'EXCHANGE_CRYPTO_INTERNAL',
  EXT_EXCHANGE = 'EXT_EXCHANGE',
  FEE = 'FEE',
  NETWORK_FEE = 'NETWORK_FEE',
  REFUND = 'REFUND',
  WITHDRAWAL = 'WITHDRAWAL',
  WITHDRAWAL_CRYPTO_EXTERNAL = 'WITHDRAWAL_CRYPTO_EXTERNAL',
  WITHDRAWAL_CRYPTO_INTERNAL = 'WITHDRAWAL_CRYPTO_INTERNAL',
  WHOLESALE_CARD_DEPOSIT = 'WHOLESALE_CARD_DEPOSIT',
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

export enum FiatAccountStatus {
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
  DEPOSIT_FIAT_SEPA = 'DEPOSIT_FIAT_SEPA',
  DEPOSIT_FIAT_SWIFT = 'DEPOSIT_FIAT_SWIFT',
  WITHDRAWAL_FIAT_SEPA = 'WITHDRAWAL_FIAT_SEPA',
  TRANSFER_CARD_PREPAID = 'TRANSFER_CARD_PREPAID',
  TRANSFER_CARD_SUBACCOUNT = 'TRANSFER_CARD_SUBACCOUNT',
  WITHDRAWAL_CRYPTO = 'WITHDRAWAL_CRYPTO',
  EXCHANGE_CRYPTO_INTERNAL = 'EXCHANGE_CRYPTO_INTERNAL',
  TRANSFER_CARD_WHOLESALE = 'TRANSFER_CARD_WHOLESALE',
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
