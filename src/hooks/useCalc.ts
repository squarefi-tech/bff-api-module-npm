import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { API } from '../api/types/types';

export type OrderCalcHandlerProps = Omit<API.Orders.V2.Calc.Request, 'order_type'>;

export type UseOrderCalcProps = {
  from_currency_id: string | null | undefined;
  to_currency_id: string | null | undefined;
  calcHandler: (props: OrderCalcHandlerProps) => Promise<API.Orders.V2.Calc.Response>;
  disableCalculation?: boolean;
  to_address?: string;
};

export type UseOrderCalcData = {
  calcData: API.Orders.V2.Calc.Response | null;
  sellingAmount: number;
  setSellingAmount: (value: number) => void;
  buyingAmount: number;
  setBuyingAmount: (value: number) => void;
  isSellingValuePending: boolean;
  isBuyingValuePending: boolean;
};

export type UseOrderCalc = (props: UseOrderCalcProps) => UseOrderCalcData;

export const useOrderCalc: UseOrderCalc = (props: UseOrderCalcProps) => {
  const { from_currency_id, to_currency_id, calcHandler, disableCalculation, to_address } = props;

  const [sellingAmount, setSellingAmount] = useState(0);
  const [buyingAmount, setBuyingAmount] = useState(0);
  const [calcData, setCalcData] = useState<API.Orders.V2.Calc.Response | null>(null);
  const [isSellingValuePending, setIsSellingValuePending] = useState(false);
  const [isBuyingValuePending, setIsBuyingValuePending] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const resetOrderCalc = () => {
    setCalcData(null);
    setIsSellingValuePending(false);
    setIsBuyingValuePending(false);
    setSellingAmount(0);
    setBuyingAmount(0);
  };

  const abortCurrentCalculation = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const updateCalculations = async ({ is_reverse = false }) => {
    if (disableCalculation) {
      return;
    }

    abortControllerRef.current = new AbortController();

    if (!from_currency_id || !to_currency_id) {
      throw new Error('From currency or to currency is not defined');
    }

    if (sellingAmount === 0 && buyingAmount === 0 && !calcData) {
      resetOrderCalc();
      return;
    }

    const calcParams: OrderCalcHandlerProps = {
      from_currency_id,
      to_currency_id,
      amount: is_reverse ? buyingAmount : sellingAmount,
      is_reverse,
      to_address,
      signal: abortControllerRef.current.signal,
    };

    if (!calcParams.amount) {
      resetOrderCalc();
      return;
    }

    try {
      is_reverse ? setIsSellingValuePending(true) : setIsBuyingValuePending(true);
      const data = await calcHandler(calcParams);
      setCalcData(data);

      setSellingAmount(data.from_amount);

      setBuyingAmount(data.result_amount);
      abortControllerRef.current = null;
      is_reverse ? setIsSellingValuePending(false) : setIsBuyingValuePending(false);
    } catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        return;
      }

      is_reverse ? setIsSellingValuePending(false) : setIsBuyingValuePending(false);

      if (error.status === 404) {
        // eslint-disable-next-line no-console
        console.error('Rate not found');
        resetOrderCalc();
      }

      throw error;
    }
  };

  const onSellingValueUpdate = debounce(
    (value: number) => {
      if (value !== calcData?.from_amount || isBuyingValuePending) {
        updateCalculations({ is_reverse: false });
      }
    },
    abortControllerRef.current?.signal ? undefined : 1000
  );

  const onBuyingValueUpdate = debounce(
    (value: number) => {
      if (value !== calcData?.result_amount || isSellingValuePending) {
        updateCalculations({ is_reverse: true });
      }
    },
    abortControllerRef.current?.signal ? undefined : 1000
  );

  const onToAddressUpdate = debounce(
    () => {
      updateCalculations({ is_reverse: false });
    },
    abortControllerRef.current?.signal ? undefined : 1000
  );

  useEffect(() => {
    abortCurrentCalculation();
    updateCalculations({ is_reverse: false });
  }, [from_currency_id, to_currency_id]);

  useEffect(() => {
    abortCurrentCalculation();
    onSellingValueUpdate(sellingAmount);
    return onSellingValueUpdate.cancel;
  }, [sellingAmount]);

  useEffect(() => {
    abortCurrentCalculation();
    onBuyingValueUpdate(buyingAmount);
    return onBuyingValueUpdate.cancel;
  }, [buyingAmount]);

  useEffect(() => {
    abortCurrentCalculation();
    onToAddressUpdate();
    return onToAddressUpdate.cancel;
  }, [to_address]);

  return {
    sellingAmount,
    setSellingAmount,
    buyingAmount,
    setBuyingAmount,
    calcData,
    isSellingValuePending,
    isBuyingValuePending,
  };
};
