import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

// Fixed, endpoint-agnostic result the hook always exposes — the fields every calc consumer reads. Both the
// v2 `Calc.Response` (a superset) and the frontend `orders.frontend.calc` `OrderCalculation` satisfy it.
// Declared explicitly (not aliased to an API type) so the hook stays decoupled and the shape it returns is
// guaranteed regardless of which handler runs.
type CalcResult = {
  from_currency: string;
  to_currency: string;
  from_amount: number;
  result_amount: number;
  rate: number;
  fees: number;
  comission: number;
  network_fee: number;
  transaction_fee: number;
  from_symbol: string;
};

type CalcData = CalcResult & {
  is_subtract: boolean;
  is_reverse: boolean;
};

export type OrderCalcHandlerProps = {
  from_currency_id: string;
  to_currency_id: string;
  amount: number;
  is_reverse: boolean;
  is_subtract: boolean;
  to_address?: string;
  signal?: AbortSignal;
};

type UpdateCalculationsProps = {
  is_reverse: boolean;
  is_subtract: boolean;
};

export type UseOrderCalcProps = {
  from_currency_id: string | null | undefined;
  to_currency_id: string | null | undefined;
  calcHandler: (props: OrderCalcHandlerProps) => Promise<CalcResult>;
  disableCalculation?: boolean;
  to_address?: string;
};

export type UseOrderCalcData = {
  calcData: CalcData | null;
  sellingAmount: number;
  setSellingAmount: (value: number) => void;
  buyingAmount: number;
  setBuyingAmount: (value: number) => void;
  isSellingValuePending: boolean;
  isBuyingValuePending: boolean;
};

export type UseOrderCalc = (props: UseOrderCalcProps) => UseOrderCalcData;

export const useOrderCalc: UseOrderCalc = ({
  from_currency_id,
  to_currency_id,
  calcHandler,
  disableCalculation,
  to_address,
}) => {
  const [sellingAmount, setSellingAmount] = useState(0);
  const [buyingAmount, setBuyingAmount] = useState(0);
  const [calcData, setCalcData] = useState<CalcData | null>(null);
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

  const updateCalculations = async ({ is_reverse, is_subtract }: UpdateCalculationsProps) => {
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
      is_subtract,
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
      setCalcData({
        from_currency: data.from_currency,
        to_currency: data.to_currency,
        from_amount: data.from_amount,
        result_amount: data.result_amount,
        rate: data.rate,
        fees: data.fees,
        comission: data.comission,
        network_fee: data.network_fee,
        transaction_fee: data.transaction_fee,
        from_symbol: data.from_symbol,
        is_reverse,
        is_subtract,
      });

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
        updateCalculations({ is_reverse: false, is_subtract: true });
      }
    },
    abortControllerRef.current?.signal ? undefined : 1000,
  );

  const onBuyingValueUpdate = debounce(
    (value: number) => {
      if (value !== calcData?.result_amount || isSellingValuePending) {
        updateCalculations({ is_reverse: true, is_subtract: false });
      }
    },
    abortControllerRef.current?.signal ? undefined : 1000,
  );

  const onToAddressUpdate = debounce(
    () => {
      updateCalculations({ is_reverse: false, is_subtract: true });
    },
    abortControllerRef.current?.signal ? undefined : 1000,
  );

  useEffect(() => {
    abortCurrentCalculation();
    updateCalculations({ is_reverse: false, is_subtract: true });
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
