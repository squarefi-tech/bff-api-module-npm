import { API } from './types/types';

import { apiClientV1 } from '../utils/apiClientFactory';

import { OrderType } from '../constants';

export const orders = {
  calc: ({ signal, ...params }: API.Orders.Calc.Request): Promise<API.Orders.Calc.Response> =>
    apiClientV1.getRequest<API.Orders.Calc.Response>('/orders/calc', { params, signal }),

  orderTypes: {
    list: (): Promise<API.Orders.OrderTypes.List.Response> =>
      apiClientV1.getRequest<API.Orders.OrderTypes.List.Response>('/orders/order_types'),
  },

  create: {
    byOrderType: {
      [OrderType.TRANSFER_INTERNAL]: (
        data: API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Request
      ): Promise<API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Response>('/orders/INTERNAL_TRANSFER', {
          data,
        }),

      [OrderType.WITHDRAWAL_CRYPTO]: (
        data: API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Request
      ): Promise<API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Response>('/orders/WITHDRAWAL_CRYPTO', {
          data,
        }),

      [OrderType.TRANSFER_CARD_SUBACCOUNT]: (
        data: API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Request
      ): Promise<API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Response>(
          '/orders/TRANSFER_CARD_SUBACCOUNT',
          {
            data,
          }
        ),

      [OrderType.TRANSFER_CARD_PREPAID]: (
        data: API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Request
      ): Promise<API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Response>(
          '/orders/TRANSFER_CARD_PREPAID',
          {
            data,
          }
        ),

      [OrderType.TRANSFER_CARD_WHOLESALE]: (
        data: API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Request
      ): Promise<API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Response>(
          '/orders/TRANSFER_CARD_WHOLESALE',
          {
            data,
          }
        ),

      [OrderType.EXCHANGE_CRYPTO_INTERNAL]: (
        data: API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Request
      ): Promise<API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Response>(
          '/orders/EXCHANGE_CRYPTO_INTERNAL',
          { data }
        ),

      [OrderType.HIFI_WIRE_ONRAMP]: (
        data: API.Orders.Create.ByOrderType.HIFI_WIRE_ONRAMP.Request
      ): Promise<API.Orders.Create.ByOrderType.HIFI_WIRE_ONRAMP.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_WIRE_ONRAMP.Response>('/orders/HIFI_WIRE_ONRAMP', {
          data,
        }),

      [OrderType.HIFI_ACH_ONRAMP]: (
        data: API.Orders.Create.ByOrderType.HIFI_ACH_ONRAMP.Request
      ): Promise<API.Orders.Create.ByOrderType.HIFI_ACH_ONRAMP.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_ACH_ONRAMP.Response>('/orders/HIFI_ACH_ONRAMP', {
          data,
        }),

      [OrderType.HIFI_SEPA_ONRAMP]: (
        data: API.Orders.Create.ByOrderType.HIFI_SEPA_ONRAMP.Request
      ): Promise<API.Orders.Create.ByOrderType.HIFI_SEPA_ONRAMP.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_SEPA_ONRAMP.Response>('/orders/HIFI_SEPA_ONRAMP', {
          data,
        }),

      [OrderType.HIFI_WIRE_OFFRAMP]: (
        data: API.Orders.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Request
      ): Promise<API.Orders.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Response>('/orders/HIFI_WIRE_OFFRAMP', {
          data,
        }),

      [OrderType.HIFI_ACH_OFFRAMP]: (
        data: API.Orders.Create.ByOrderType.HIFI_ACH_OFFRAMP.Request
      ): Promise<API.Orders.Create.ByOrderType.HIFI_ACH_OFFRAMP.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_ACH_OFFRAMP.Response>('/orders/HIFI_ACH_OFFRAMP', {
          data,
        }),

      [OrderType.HIFI_SEPA_OFFRAMP]: (
        data: API.Orders.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Request
      ): Promise<API.Orders.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Response>('/orders/HIFI_SEPA_OFFRAMP', {
          data,
        }),
      [OrderType.TBD_SWIFT_WITHDRAWAL]: (
        // TODO: ITS MOCK ORDER TYPE
        data: API.Orders.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Request
      ): Promise<API.Orders.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Response>(
          '/orders/TBD_SWIFT_WITHDRAWAL',
          { data }
        ),
    },
  },
  v2: {
    calc: ({ signal, ...params }: API.Orders.V2.Calc.Request): Promise<API.Orders.V2.Calc.Response> =>
      apiClientV1.getRequest<API.Orders.V2.Calc.Response>('/v2/orders/calc', { params, signal }),

    orderTypes: {
      list: (): Promise<API.Orders.V2.OrderTypes.List.Response> =>
        apiClientV1.getRequest<API.Orders.V2.OrderTypes.List.Response>('/v2/orders/order_types'),
    },

    create: {
      byOrderType: {
        [OrderType.TRANSFER_INTERNAL]: (
          data: API.Orders.V2.Create.ByOrderType.INTERNAL_TRANSFER.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.INTERNAL_TRANSFER.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.INTERNAL_TRANSFER.Response>('/v2/orders/TRA', {
            data,
          }),

        [OrderType.HIFI_WIRE_ONRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_WIRE_ONRAMP.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_ONRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_ONRAMP.Response>(
            '/v2/orders/HIFI_WIRE_ONRAMP',
            {
              data,
            }
          ),

        [OrderType.HIFI_ACH_ONRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_ACH_ONRAMP.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_ACH_ONRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_ACH_ONRAMP.Response>(
            '/v2/orders/HIFI_ACH_ONRAMP',
            {
              data,
            }
          ),

        [OrderType.HIFI_SEPA_ONRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_SEPA_ONRAMP.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_ONRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_ONRAMP.Response>(
            '/v2/orders/HIFI_SEPA_ONRAMP',
            {
              data,
            }
          ),

        [OrderType.HIFI_WIRE_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Response>(
            '/v2/orders/HIFI_WIRE_OFFRAMP',
            {
              data,
            }
          ),

        [OrderType.HIFI_ACH_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_ACH_OFFRAMP.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_ACH_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_ACH_OFFRAMP.Response>(
            '/v2/orders/HIFI_ACH_OFFRAMP',
            {
              data,
            }
          ),

        [OrderType.HIFI_SEPA_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Response>(
            '/v2/orders/HIFI_SEPA_OFFRAMP',
            { data }
          ),

        [OrderType.OMNIBUS_CRYPTO_TRANSFER]: (
          data: API.Orders.V2.Create.ByOrderType.OMNIBUS_CRYPTO_TRANSFER.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.OMNIBUS_CRYPTO_TRANSFER.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.OMNIBUS_CRYPTO_TRANSFER.Response>(
            '/v2/orders/OMNIBUS_CRYPTO_TRANSFER',
            { data }
          ),

        [OrderType.HIFI_CRYPTO_TRANSFER]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_CRYPTO_TRANSFER.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_CRYPTO_TRANSFER.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_CRYPTO_TRANSFER.Response>(
            '/v2/orders/HIFI_CRYPTO_TRANSFER',
            { data }
          ),
        [OrderType.SEGREGATED_CRYPTO_TRANSFER]: (
          data: API.Orders.V2.Create.ByOrderType.SEGREGATED_CRYPTO_TRANSFER.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.SEGREGATED_CRYPTO_TRANSFER.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.SEGREGATED_CRYPTO_TRANSFER.Response>(
            '/v2/orders/SEGREGATED_CRYPTO_TRANSFER',
            { data }
          ),

        [OrderType.TBD_SWIFT_WITHDRAWAL]: (
          // TODO: ITS MOCK ORDER TYPE
          data: API.Orders.V2.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Request
        ): Promise<API.Orders.V2.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Response>(
            '/v2/orders/TBD_SWIFT_WITHDRAWAL',
            { data }
          ),
      },
    },
  },
};
