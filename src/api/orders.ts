import { API } from './types';

import { apiClientV1 } from '../utils/apiClientFactory';

import { OrderType } from '../constants';

export const orders = {
  calc: ({ signal, ...params }: API.Orders.Calc.Request) =>
    apiClientV1.getRequest<API.Orders.Calc.Response>('/orders/calc', { params, signal }).then((res) => res.data),
  create: {
    byOrderType: {
      [OrderType.TRANSFER_CARD_SUBACCOUNT]: (data: API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Response>(
          '/orders/TRANSFER_CARD_SUBACCOUNT',
          {
            data,
          }
        ),
      [OrderType.WITHDRAWAL_CRYPTO]: (data: API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Response>('/orders/WITHDRAWAL_CRYPTO', {
          data,
        }),
      [OrderType.EXCHANGE_CRYPTO_INTERNAL]: (data: API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Response>(
          '/orders/EXCHANGE_CRYPTO_INTERNAL',
          { data }
        ),
      [OrderType.TRANSFER_CARD_WHOLESALE]: (data: API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Request) =>
        apiClientV1.postRequest<null>('/orders/TRANSFER_CARD_WHOLESALE', { data }),
    },
  },
};
