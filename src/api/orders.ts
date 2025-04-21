import { API } from './types';

import { apiClientV1 } from '../utils/apiClientFactory';

import { OrderType } from '../constants';

export const orders = {
  calc: ({ signal, ...params }: API.Orders.Calc.Request) =>
    apiClientV1.getRequest<API.Orders.Calc.Response>('/orders/calc', { params, signal }),

  orderTypes: () => apiClientV1.getRequest<OrderType[]>('/orders/order_types'),

  create: {
    byOrderType: {
      [OrderType.INTERNAL_TRANSFER]: (data: API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Response>('/orders/INTERNAL_TRANSFER', {
          data,
        }),

      [OrderType.WITHDRAWAL_CRYPTO]: (data: API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Response>('/orders/WITHDRAWAL_CRYPTO', {
          data,
        }),

      [OrderType.TRANSFER_CARD_SUBACCOUNT]: (data: API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Response>(
          '/orders/TRANSFER_CARD_SUBACCOUNT',
          {
            data,
          }
        ),

      [OrderType.TRANSFER_CARD_PREPAID]: (data: API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Response>(
          '/orders/TRANSFER_CARD_PREPAID',
          {
            data,
          }
        ),

      [OrderType.TRANSFER_CARD_WHOLESALE]: (data: API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Response>(
          '/orders/TRANSFER_CARD_WHOLESALE',
          {
            data,
          }
        ),

      [OrderType.EXCHANGE_CRYPTO_INTERNAL]: (data: API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Response>(
          '/orders/EXCHANGE_CRYPTO_INTERNAL',
          { data }
        ),

      [OrderType.HIFI_WIRE_ONRAMP]: (data: API.Orders.Create.ByOrderType.HIFI_WIRE_ONRAMP.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_WIRE_ONRAMP.Response>('/orders/HIFI_WIRE_ONRAMP', {
          data,
        }),

      [OrderType.HIFI_ACH_ONRAMP]: (data: API.Orders.Create.ByOrderType.HIFI_ACH_ONRAMP.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_ACH_ONRAMP.Response>('/orders/HIFI_ACH_ONRAMP', {
          data,
        }),

      [OrderType.HIFI_SEPA_ONRAMP]: (data: API.Orders.Create.ByOrderType.HIFI_SEPA_ONRAMP.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_SEPA_ONRAMP.Response>('/orders/HIFI_SEPA_ONRAMP', {
          data,
        }),

      [OrderType.HIFI_WIRE_OFFRAMP]: (data: API.Orders.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Response>('/orders/HIFI_WIRE_OFFRAMP', {
          data,
        }),

      [OrderType.HIFI_ACH_OFFRAMP]: (data: API.Orders.Create.ByOrderType.HIFI_ACH_OFFRAMP.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_ACH_OFFRAMP.Response>('/orders/HIFI_ACH_OFFRAMP', {
          data,
        }),

      [OrderType.HIFI_SEPA_OFFRAMP]: (data: API.Orders.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Response>('/orders/HIFI_SEPA_OFFRAMP', {
          data,
        }),

      [OrderType.OMNIBUS_CRYPTO_WITHDRAWAL]: (data: API.Orders.Create.ByOrderType.OMNIBUS_CRYPTO_WITHDRAWAL.Request) =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.OMNIBUS_CRYPTO_WITHDRAWAL.Response>(
          '/orders/OMNIBUS_CRYPTO_WITHDRAWAL',
          {
            data,
          }
        ),
    },
  },
};
