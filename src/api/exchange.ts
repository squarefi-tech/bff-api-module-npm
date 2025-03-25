import { API } from './types';

import { apiClientV1 } from '../utils/apiClientFactory';

import { OrderType } from '../constants';

const createOrderTypeMethods = (orderType: OrderType) => ({
  getByFromCurrency: (from_uuid: string) =>
    apiClientV1.getRequest<API.Exchange.Exchange[]>('/exchange/', { params: { from_uuid, order_type: orderType } }),
  getByToCurrency: (to_uuid: string) =>
    apiClientV1.getRequest<API.Exchange.Exchange[]>('/exchange/', { params: { to_uuid, order_type: orderType } }),
  getByOrderType: () =>
    apiClientV1.getRequest<API.Exchange.Exchange[]>('/exchange/', { params: { order_type: orderType } }),
});

export const exchange = {
  byOrderType: {
    [OrderType.DEPOSIT_FIAT_SEPA]: createOrderTypeMethods(OrderType.DEPOSIT_FIAT_SEPA),
    [OrderType.DEPOSIT_FIAT_SWIFT]: createOrderTypeMethods(OrderType.DEPOSIT_FIAT_SWIFT),
    [OrderType.WITHDRAWAL_FIAT_SEPA]: createOrderTypeMethods(OrderType.WITHDRAWAL_FIAT_SEPA),
    // [OrderType.TRANSFER_CARD_PREPAID]: createOrderTypeMethods(OrderType.TRANSFER_CARD_PREPAID), // DO not used
    [OrderType.TRANSFER_CARD_SUBACCOUNT]: createOrderTypeMethods(OrderType.TRANSFER_CARD_SUBACCOUNT),
    [OrderType.WITHDRAWAL_CRYPTO]: createOrderTypeMethods(OrderType.WITHDRAWAL_CRYPTO),
    [OrderType.EXCHANGE_CRYPTO_INTERNAL]: createOrderTypeMethods(OrderType.EXCHANGE_CRYPTO_INTERNAL),
  },
};
