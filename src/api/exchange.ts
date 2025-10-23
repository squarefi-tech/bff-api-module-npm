import { API } from './types/types';

import { apiClientV1 } from '../utils/apiClientFactory';

import { OrderType } from '../constants';

type IExchangeByOrderType = {
  getByFromCurrency: (from_uuid: string) => Promise<API.Exchange.Exchange[]>;
  getByToCurrency: (to_uuid: string) => Promise<API.Exchange.Exchange[]>;
  getByOrderType: () => Promise<API.Exchange.Exchange[]>;
};

type IExchangeModule = {
  byOrderType: {
    [key in OrderType]: IExchangeByOrderType;
  };
};

const createOrderTypeMethods = (orderType: OrderType): IExchangeByOrderType => ({
  getByFromCurrency: (from_uuid: string): Promise<API.Exchange.Exchange[]> =>
    apiClientV1.getRequest<API.Exchange.Exchange[]>('/exchange/', {
      params: { from_uuid, order_type: orderType },
    }),
  getByToCurrency: (to_uuid: string): Promise<API.Exchange.Exchange[]> =>
    apiClientV1.getRequest<API.Exchange.Exchange[]>('/exchange/', {
      params: { to_uuid, order_type: orderType },
    }),
  getByOrderType: (): Promise<API.Exchange.Exchange[]> =>
    apiClientV1.getRequest<API.Exchange.Exchange[]>('/exchange/', {
      params: { order_type: orderType },
    }),
});

const orderTypes = Object.values(OrderType);

export const exchange: IExchangeModule = {
  byOrderType: orderTypes.reduce(
    (acc, orderType) => {
      acc[orderType] = createOrderTypeMethods(orderType);
      return acc;
    },
    {} as Record<OrderType, IExchangeByOrderType>,
  ),
};
