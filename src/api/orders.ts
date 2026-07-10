import { API } from './types/types';

import { apiClientV1, apiClientV1Frontend } from '../utils/apiClientFactory';

import { OrderType } from '../constants';

export const orders = {
  calc: ({ signal, ...params }: API.Orders.Calc.Request): Promise<API.Orders.Calc.Response> =>
    apiClientV1.getRequest<API.Orders.Calc.Response>('/orders/calc', {
      params,
      signal,
    }),

  orderTypes: {
    list: (): Promise<API.Orders.OrderTypes.List.Response> =>
      apiClientV1.getRequest<API.Orders.OrderTypes.List.Response>('/orders/order_types'),
  },

  create: {
    byOrderType: {
      [OrderType.TRANSFER_INTERNAL]: (
        data: API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Request,
      ): Promise<API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.INTERNAL_TRANSFER.Response>('/orders/INTERNAL_TRANSFER', {
          data,
        }),

      [OrderType.WITHDRAWAL_CRYPTO]: (
        data: API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Request,
      ): Promise<API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.WITHDRAWAL_CRYPTO.Response>('/orders/WITHDRAWAL_CRYPTO', {
          data,
        }),

      [OrderType.TRANSFER_CARD_SUBACCOUNT]: (
        data: API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Request,
      ): Promise<API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_SUBACCOUNT.Response>(
          '/orders/TRANSFER_CARD_SUBACCOUNT',
          {
            data,
          },
        ),

      [OrderType.TRANSFER_CARD_PREPAID]: (
        data: API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Request,
      ): Promise<API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_PREPAID.Response>(
          '/orders/TRANSFER_CARD_PREPAID',
          {
            data,
          },
        ),

      [OrderType.TRANSFER_CARD_WHOLESALE]: (
        data: API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Request,
      ): Promise<API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.TRANSFER_CARD_WHOLESALE.Response>(
          '/orders/TRANSFER_CARD_WHOLESALE',
          {
            data,
          },
        ),

      [OrderType.EXCHANGE_CRYPTO_INTERNAL]: (
        data: API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Request,
      ): Promise<API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.EXCHANGE_CRYPTO_INTERNAL.Response>(
          '/orders/EXCHANGE_CRYPTO_INTERNAL',
          { data },
        ),

      [OrderType.EXCHANGE_OMNI]: (
        data: API.Orders.Create.ByOrderType.EXCHANGE_OMNI.Request,
      ): Promise<API.Orders.Create.ByOrderType.EXCHANGE_OMNI.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.EXCHANGE_OMNI.Response>('/orders/EXCHANGE_OMNI', {
          data,
        }),

      [OrderType.WITHDRAW_CARD_PREPAID]: (
        data: API.Orders.Create.ByOrderType.WITHDRAW_CARD_PREPAID.Request,
      ): Promise<API.Orders.Create.ByOrderType.WITHDRAW_CARD_PREPAID.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.WITHDRAW_CARD_PREPAID.Response>(
          '/orders/WITHDRAW_CARD_PREPAID',
          { data },
        ),

      [OrderType.WITHDRAW_CARD_SUBACCOUNT]: (
        data: API.Orders.Create.ByOrderType.WITHDRAW_CARD_SUBACCOUNT.Request,
      ): Promise<API.Orders.Create.ByOrderType.WITHDRAW_CARD_SUBACCOUNT.Response> =>
        apiClientV1.postRequest<API.Orders.Create.ByOrderType.WITHDRAW_CARD_SUBACCOUNT.Response>(
          '/orders/WITHDRAW_CARD_SUBACCOUNT',
          { data },
        ),
    },
  },

  setComment: ({ order_id, ...data }: API.Orders.Comment.Request): Promise<API.Orders.Comment.Response> =>
    apiClientV1Frontend.putRequest<API.Orders.Comment.Response>(`/frontend/orders/${order_id}/comment`, {
      data,
    }),

  v2: {
    calc: ({ signal, ...params }: API.Orders.V2.Calc.Request): Promise<API.Orders.V2.Calc.Response> =>
      apiClientV1.getRequest<API.Orders.V2.Calc.Response>('/v2/orders/calc', {
        params,
        signal,
      }),

    orderTypes: {
      list: (): Promise<API.Orders.V2.OrderTypes.List.Response> =>
        apiClientV1.getRequest<API.Orders.V2.OrderTypes.List.Response>('/v2/orders/order_types'),
    },

    create: {
      byOrderType: {
        [OrderType.TRANSFER_INTERNAL]: (
          data: API.Orders.V2.Create.ByOrderType.INTERNAL_TRANSFER.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.INTERNAL_TRANSFER.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.INTERNAL_TRANSFER.Response>(
            '/v2/orders/TRANSFER_INTERNAL',
            {
              data,
            },
          ),

        [OrderType.HIFI_WIRE_ONRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_WIRE_ONRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_ONRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_ONRAMP.Response>(
            '/v2/orders/HIFI_WIRE_ONRAMP',
            {
              data,
            },
          ),

        [OrderType.HIFI_ACH_ONRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_ACH_ONRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_ACH_ONRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_ACH_ONRAMP.Response>(
            '/v2/orders/HIFI_ACH_ONRAMP',
            {
              data,
            },
          ),

        [OrderType.HIFI_SEPA_ONRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_SEPA_ONRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_ONRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_ONRAMP.Response>(
            '/v2/orders/HIFI_SEPA_ONRAMP',
            {
              data,
            },
          ),

        [OrderType.HIFI_WIRE_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_WIRE_OFFRAMP.Response>(
            '/v2/orders/HIFI_WIRE_OFFRAMP',
            {
              data,
            },
          ),

        [OrderType.HIFI_ACH_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_ACH_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_ACH_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_ACH_OFFRAMP.Response>(
            '/v2/orders/HIFI_ACH_OFFRAMP',
            {
              data,
            },
          ),

        [OrderType.HIFI_SEPA_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.HIFI_SEPA_OFFRAMP.Response>(
            '/v2/orders/HIFI_SEPA_OFFRAMP',
            { data },
          ),

        [OrderType.OMNIBUS_CRYPTO_TRANSFER]: (
          data: API.Orders.V2.Create.ByOrderType.OMNIBUS_CRYPTO_TRANSFER.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.OMNIBUS_CRYPTO_TRANSFER.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.OMNIBUS_CRYPTO_TRANSFER.Response>(
            '/v2/orders/OMNIBUS_CRYPTO_TRANSFER',
            { data },
          ),

        [OrderType.SEGREGATED_CRYPTO_TRANSFER]: (
          data: API.Orders.V2.Create.ByOrderType.SEGREGATED_CRYPTO_TRANSFER.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.SEGREGATED_CRYPTO_TRANSFER.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.SEGREGATED_CRYPTO_TRANSFER.Response>(
            '/v2/orders/SEGREGATED_CRYPTO_TRANSFER',
            { data },
          ),
        [OrderType.RN_CARDS_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.RN_CARDS_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.RN_CARDS_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.RN_CARDS_OFFRAMP.Response>(
            '/v2/orders/RN_CARDS_OFFRAMP',
            { data },
          ),

        [OrderType.TBD_SWIFT_WITHDRAWAL]: (
          // TODO: ITS MOCK ORDER TYPE
          data: API.Orders.V2.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.TBD_SWIFT_WITHDRAWAL.Response>(
            '/v2/orders/TBD_SWIFT_WITHDRAWAL',
            { data },
          ),

        [OrderType.L2F_SEPA_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.L2F_SEPA_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.L2F_SEPA_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.L2F_SEPA_OFFRAMP.Response>(
            '/v2/orders/L2F_SEPA_OFFRAMP',
            { data },
          ),

        [OrderType.L2F_SWIFT_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.L2F_SWIFT_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.L2F_SWIFT_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.L2F_SWIFT_OFFRAMP.Response>(
            '/v2/orders/L2F_SWIFT_OFFRAMP',
            { data },
          ),

        [OrderType.L2F_ACH_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.L2F_ACH_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.L2F_ACH_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.L2F_ACH_OFFRAMP.Response>(
            '/v2/orders/L2F_ACH_OFFRAMP',
            { data },
          ),

        [OrderType.L2F_WIRE_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.L2F_WIRE_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.L2F_WIRE_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.L2F_WIRE_OFFRAMP.Response>(
            '/v2/orders/L2F_WIRE_OFFRAMP',
            { data },
          ),

        [OrderType.L2F_CHAPS_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.L2F_CHAPS_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.L2F_CHAPS_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.L2F_CHAPS_OFFRAMP.Response>(
            '/v2/orders/L2F_CHAPS_OFFRAMP',
            { data },
          ),

        [OrderType.L2F_FPS_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.L2F_FPS_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.L2F_FPS_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.L2F_FPS_OFFRAMP.Response>(
            '/v2/orders/L2F_FPS_OFFRAMP',
            { data },
          ),

        [OrderType.BRL_WIRE_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.BRL_WIRE_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.BRL_WIRE_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.BRL_WIRE_OFFRAMP.Response>(
            '/v2/orders/BRL_WIRE_OFFRAMP',
            { data },
          ),

        [OrderType.BRL_ACH_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.BRL_ACH_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.BRL_ACH_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.BRL_ACH_OFFRAMP.Response>(
            '/v2/orders/BRL_ACH_OFFRAMP',
            { data },
          ),

        [OrderType.BRL_RTP_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.BRL_RTP_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.BRL_RTP_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.BRL_RTP_OFFRAMP.Response>(
            '/v2/orders/BRL_RTP_OFFRAMP',
            { data },
          ),

        [OrderType.DLS_WIRE_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.DLS_WIRE_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.DLS_WIRE_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.DLS_WIRE_OFFRAMP.Response>(
            '/v2/orders/DLS_WIRE_OFFRAMP',
            { data },
          ),

        [OrderType.DLS_ACH_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.DLS_ACH_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.DLS_ACH_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.DLS_ACH_OFFRAMP.Response>(
            '/v2/orders/DLS_ACH_OFFRAMP',
            { data },
          ),

        [OrderType.DLS_SEPA_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.DLS_SEPA_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.DLS_SEPA_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.DLS_SEPA_OFFRAMP.Response>(
            '/v2/orders/DLS_SEPA_OFFRAMP',
            { data },
          ),

        [OrderType.DLS_SWIFT_OFFRAMP]: (
          data: API.Orders.V2.Create.ByOrderType.DLS_SWIFT_OFFRAMP.Request,
        ): Promise<API.Orders.V2.Create.ByOrderType.DLS_SWIFT_OFFRAMP.Response> =>
          apiClientV1.postRequest<API.Orders.V2.Create.ByOrderType.DLS_SWIFT_OFFRAMP.Response>(
            '/v2/orders/DLS_SWIFT_OFFRAMP',
            { data },
          ),
      },
    },

    list: {
      byWallet: ({
        wallet_uuid,
        filters,
        ...props
      }: API.Orders.V2.List.ByWallet.Request): Promise<API.Orders.V2.List.ByWallet.Response> => {
        const params = {
          ...props,
          filters: Array.isArray(filters) ? JSON.stringify(filters) : filters,
        };
        return apiClientV1.getRequest<API.Orders.V2.List.ByWallet.Response>(`/v2/orders/list/${wallet_uuid}`, {
          params,
        });
      },
      csv: {
        getByWalletUuid: ({
          wallet_uuid,
          filters,
          ...props
        }: API.Orders.V2.List.Csv.Request): Promise<API.Orders.V2.List.Csv.Response> => {
          const params = {
            ...props,
            filters: Array.isArray(filters) ? JSON.stringify(filters) : filters,
          };
          return apiClientV1.getRequest<API.Orders.V2.List.Csv.Response>(`/v2/orders/list/${wallet_uuid}/csv`, {
            params,
          });
        },
      },
    },

    getById: ({ order_uuid }: API.Orders.V2.GetById.Request): Promise<API.Orders.V2.GetById.Response> =>
      apiClientV1.getRequest<API.Orders.V2.GetById.Response>(`/v2/orders/id/${order_uuid}`),
  },

  frontend: {
    create: {
      withdrawal: {
        crypto: (
          data: API.Orders.Frontend.Create.Withdrawal.Crypto.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Crypto.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Crypto.Response>(
            '/frontend/orders/withdrawal/crypto',
            { data },
          ),

        internal: (
          data: API.Orders.Frontend.Create.Withdrawal.Internal.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Internal.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Internal.Response>(
            '/frontend/orders/withdrawal/internal',
            { data },
          ),

        wire: (
          data: API.Orders.Frontend.Create.Withdrawal.Wire.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Wire.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Wire.Response>(
            '/frontend/orders/withdrawal/wire',
            { data },
          ),

        ach: (
          data: API.Orders.Frontend.Create.Withdrawal.Ach.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Ach.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Ach.Response>(
            '/frontend/orders/withdrawal/ach',
            { data },
          ),

        sepa: (
          data: API.Orders.Frontend.Create.Withdrawal.Sepa.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Sepa.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Sepa.Response>(
            '/frontend/orders/withdrawal/sepa',
            { data },
          ),

        swift: (
          data: API.Orders.Frontend.Create.Withdrawal.Swift.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Swift.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Swift.Response>(
            '/frontend/orders/withdrawal/swift',
            { data },
          ),

        chaps: (
          data: API.Orders.Frontend.Create.Withdrawal.Chaps.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Chaps.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Chaps.Response>(
            '/frontend/orders/withdrawal/chaps',
            { data },
          ),

        fps: (
          data: API.Orders.Frontend.Create.Withdrawal.Fps.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Fps.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Fps.Response>(
            '/frontend/orders/withdrawal/fps',
            { data },
          ),

        card: (
          data: API.Orders.Frontend.Create.Withdrawal.Card.Request,
        ): Promise<API.Orders.Frontend.Create.Withdrawal.Card.Response> =>
          apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Withdrawal.Card.Response>(
            '/frontend/orders/withdrawal/card',
            { data },
          ),
      },

      exchange: (
        data: API.Orders.Frontend.Create.Exchange.Request,
      ): Promise<API.Orders.Frontend.Create.Exchange.Response> =>
        apiClientV1Frontend.postRequest<API.Orders.Frontend.Create.Exchange.Response>('/frontend/orders/exchange', {
          data,
        }),
    },

    approve: ({
      order_id,
      ...data
    }: API.Orders.Frontend.Approve.Request): Promise<API.Orders.Frontend.Approve.Response> =>
      apiClientV1Frontend.postRequest<API.Orders.Frontend.Approve.Response>(`/frontend/orders/${order_id}/approve`, {
        data,
      }),

    cancel: ({ order_id, ...data }: API.Orders.Frontend.Cancel.Request): Promise<API.Orders.Frontend.Cancel.Response> =>
      apiClientV1Frontend.postRequest<API.Orders.Frontend.Cancel.Response>(`/frontend/orders/${order_id}/cancel`, {
        data,
      }),

    calc: ({ signal, ...params }: API.Orders.Frontend.Calc.Request): Promise<API.Orders.Frontend.Calc.Response> =>
      apiClientV1Frontend.getRequest<API.Orders.Frontend.Calc.Response>('/frontend/orders/calc', {
        params,
        signal,
      }),

    getById: ({ order_id }: API.Orders.Frontend.GetById.Request): Promise<API.Orders.Frontend.GetById.Response> =>
      apiClientV1Frontend.getRequest<API.Orders.Frontend.GetById.Response>(`/frontend/orders/id/${order_id}`),

    getByUuid: ({
      order_uuid,
    }: API.Orders.Frontend.GetByUuid.Request): Promise<API.Orders.Frontend.GetByUuid.Response> =>
      apiClientV1Frontend.getRequest<API.Orders.Frontend.GetByUuid.Response>(`/frontend/orders/uuid/${order_uuid}`),

    list: {
      byWallet: ({
        wallet_uuid,
        filters,
        ...props
      }: API.Orders.Frontend.List.ByWallet.Request): Promise<API.Orders.Frontend.List.ByWallet.Response> => {
        const params = {
          ...props,
          filters: Array.isArray(filters) ? JSON.stringify(filters) : filters,
        };
        return apiClientV1Frontend.getRequest<API.Orders.Frontend.List.ByWallet.Response>(
          `/frontend/orders/wallet/${wallet_uuid}`,
          { params },
        );
      },
      csv: {
        getByWalletUuid: ({
          wallet_uuid,
          filters,
          ...props
        }: API.Orders.Frontend.List.Csv.Request): Promise<API.Orders.Frontend.List.Csv.Response> => {
          const params = {
            ...props,
            filters: Array.isArray(filters) ? JSON.stringify(filters) : filters,
          };
          return apiClientV1Frontend.getRequest<API.Orders.Frontend.List.Csv.Response>(
            `/frontend/orders/wallet/${wallet_uuid}/csv`,
            { params },
          );
        },
      },
    },

    types: {
      list: (): Promise<API.Orders.Frontend.Types.List.Response> =>
        apiClientV1Frontend.getRequest<API.Orders.Frontend.Types.List.Response>('/frontend/orders/types'),

      getById: ({
        id,
      }: API.Orders.Frontend.Types.GetById.Request): Promise<API.Orders.Frontend.Types.GetById.Response> =>
        apiClientV1Frontend.getRequest<API.Orders.Frontend.Types.GetById.Response>(`/frontend/orders/types/${id}`),
    },
  },
};
