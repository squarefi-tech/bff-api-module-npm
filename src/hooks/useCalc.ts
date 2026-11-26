import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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
  // Fee split of the frontend calc. Optional: the v2 calc and app-specific handlers may not return it.
  commission_currency?: string;
  fixed_commission?: number;
  percent_commission?: number;
  base_markup?: number;
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

export type UseOrderCalcProps = {
  from_currency_id: string | null | undefined;
  to_currency_id: string | null | undefined;
  // A new function identity counts as a new quote source (e.g. another order type): the last edit is quoted
  // again with it. Memoize it, or every render re-quotes.
  calcHandler: (props: OrderCalcHandlerProps) => Promise<CalcResult>;
  // While true nothing is requested; the last edit is quoted once it turns false.
  disableCalculation?: boolean;
  to_address?: string;
  // Allowed range for the SELL amount. When set, a sell amount below `minSellAmount` or above
  // `maxSellAmount` is not sent to `calcHandler` — no backend request is made, so the backend range error
  // never surfaces. Applies to the forward direction only: a reverse (buy-amount) edit derives the sell
  // amount server-side and cannot be range-checked up front. Omitted → no range gating (previous behaviour).
  minSellAmount?: number | null;
  maxSellAmount?: number | null;
};

export type UseOrderCalcData = {
  calcData: CalcData | null;
  sellingAmount: number;
  setSellingAmount: (value: number) => void;
  buyingAmount: number;
  setBuyingAmount: (value: number) => void;
  // A quote derives the side the user did not type: a selling edit makes the buying value pending, a buying
  // edit the selling one. Set by the edit itself, cleared by the answer, an error, a cancel or a skip.
  isSellingValuePending: boolean;
  isBuyingValuePending: boolean;
  // True only when `calcData` answers the current handler, address, currencies and the amount the user typed
  // last, in that direction, and nothing is scheduled or in flight. Gate submit on it.
  isCalcCurrent: boolean;
  // Message of the failed latest request for the current inputs; cleared by a new edit or an answer.
  calcError: string | null;
};

export type UseOrderCalc = (props: UseOrderCalcProps) => UseOrderCalcData;

// Wait after the user's last keystroke before quoting.
const EDIT_DELAY_MS = 1000;
// Wait after the handler, address, currencies or `disableCalculation` change: short, so a switch re-quotes
// almost at once, while rapid toggles still coalesce into one request.
const INPUTS_DELAY_MS = 300;

// The side the user edited last. Forward quotes from the selling amount, reverse from the buying amount.
type Direction = 'forward' | 'reverse';

// What a quote depends on besides the amount.
type CalcInputs = {
  calcHandler: UseOrderCalcProps['calcHandler'];
  from_currency_id: string | null | undefined;
  to_currency_id: string | null | undefined;
  to_address: string | undefined;
};

type LatestProps = CalcInputs & {
  disableCalculation: boolean;
  minSellAmount: number | null | undefined;
  maxSellAmount: number | null | undefined;
};

// calcData together with what it was answered for, to tell whether it still holds.
type Quote = {
  data: CalcData;
  inputs: CalcInputs;
  direction: Direction;
  // The edited-side amount as stored from the answer.
  amount: number;
};

type CalcView = {
  sellingAmount: number;
  buyingAmount: number;
  direction: Direction | null;
  quote: Quote | null;
  // Direction of the quote that is scheduled or in flight.
  pending: Direction | null;
  calcError: string | null;
};

const INITIAL_VIEW: CalcView = {
  sellingAmount: 0,
  buyingAmount: 0,
  direction: null,
  quote: null,
  pending: null,
  calcError: null,
};

// useLayoutEffect warns during SSR in React 18; nothing is scheduled on the server anyway.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const sameInputs = (a: CalcInputs, b: CalcInputs) =>
  a.calcHandler === b.calcHandler &&
  a.from_currency_id === b.from_currency_id &&
  a.to_currency_id === b.to_currency_id &&
  a.to_address === b.to_address;

const pickInputs = ({ calcHandler, from_currency_id, to_currency_id, to_address }: CalcInputs): CalcInputs => ({
  calcHandler,
  from_currency_id,
  to_currency_id,
  to_address,
});

const canQuote = (props: LatestProps) =>
  !props.disableCalculation && !!props.from_currency_id && !!props.to_currency_id;

const editedAmount = (view: CalcView) => (view.direction === 'reverse' ? view.buyingAmount : view.sellingAmount);

type ErrorLike = {
  code?: unknown;
  name?: unknown;
  status?: unknown;
  message?: unknown;
  response?: { status?: unknown; data?: { message?: unknown } };
};

const isCancel = (error: ErrorLike | undefined) =>
  error?.code === 'ERR_CANCELED' || error?.name === 'AbortError' || error?.name === 'CanceledError';

const getErrorMessage = (error: ErrorLike | undefined) => {
  const bodyMessage = error?.response?.data?.message;
  if (typeof bodyMessage === 'string' && bodyMessage) return bodyMessage;
  if (Array.isArray(bodyMessage) && bodyMessage.length) return bodyMessage.join(', ');
  if (typeof error?.message === 'string' && error.message) return error.message;
  return 'Calculation failed';
};

const toCalcData = (data: CalcResult, is_reverse: boolean, is_subtract: boolean): CalcData => ({
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
  commission_currency: data.commission_currency,
  fixed_commission: data.fixed_commission,
  percent_commission: data.percent_commission,
  base_markup: data.base_markup,
  is_reverse,
  is_subtract,
});

// The calc state machine, created once per hook instance. It never reads a render closure: props come from
// `latest` when the timer fires, its own state lives in `view`, and every change of `view` is mirrored to React.
const createOrderCalc = (latest: { readonly current: LatestProps }, render: (view: CalcView) => void) => {
  let view = INITIAL_VIEW;
  let mounted = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let controller: AbortController | null = null;
  // Id of the latest request: an answer or error carrying another id is stale and ignored.
  let seq = 0;
  // A quote is scheduled or in flight. Kept over an unmount, so a StrictMode remount schedules it again.
  let owed = false;

  const update = (patch: Partial<CalcView>) => {
    const keys = Object.keys(patch) as (keyof CalcView)[];
    if (keys.every((key) => Object.is(view[key], patch[key]))) return;
    view = { ...view, ...patch };
    render(view);
  };

  const stop = () => {
    clearTimeout(timer);
    timer = undefined;
    controller?.abort();
    controller = null;
    seq += 1;
  };

  // Drop the scheduled quote and the request in flight; whatever they answer is ignored.
  const invalidate = () => {
    stop();
    owed = false;
  };

  const settle = (patch: Partial<CalcView> = {}) => {
    owed = false;
    update({ ...patch, pending: null });
  };

  const request = async () => {
    const props = latest.current;
    const { direction, quote } = view;
    const amount = editedAmount(view);
    if (!direction || !amount || !canQuote(props)) {
      settle();
      return;
    }

    const inputs = pickInputs(props);
    // Already answered for exactly this (e.g. a toggle switched back): nothing to ask.
    if (
      quote &&
      !view.calcError &&
      quote.direction === direction &&
      quote.amount === amount &&
      sameInputs(quote.inputs, inputs)
    ) {
      settle();
      return;
    }

    const is_reverse = direction === 'reverse';
    const is_subtract = !is_reverse;
    // Outside the allowed sell range: no request and no error. calcData stays, so isCalcCurrent is false.
    if (
      !is_reverse &&
      ((props.minSellAmount != null && amount < props.minSellAmount) ||
        (props.maxSellAmount != null && amount > props.maxSellAmount))
    ) {
      settle();
      return;
    }

    controller?.abort();
    const ownController = new AbortController();
    controller = ownController;
    seq += 1;
    const id = seq;

    try {
      const data = await inputs.calcHandler({
        from_currency_id: props.from_currency_id as string,
        to_currency_id: props.to_currency_id as string,
        amount,
        is_reverse,
        is_subtract,
        to_address: props.to_address,
        signal: ownController.signal,
      });
      if (id !== seq) return;
      controller = null;
      settle({
        quote: {
          data: toCalcData(data, is_reverse, is_subtract),
          inputs,
          direction,
          amount: is_reverse ? data.result_amount : data.from_amount,
        },
        // Written straight to the view: amounts from an answer are not edits and are not quoted again.
        sellingAmount: data.from_amount,
        buyingAmount: data.result_amount,
        calcError: null,
      });
    } catch (caught) {
      if (id !== seq) return;
      controller = null;
      const error = caught as ErrorLike | undefined;
      if (isCancel(error)) {
        settle();
        return;
      }
      if (error?.status === 404 || error?.response?.status === 404) {
        // eslint-disable-next-line no-console
        console.error('Rate not found');
        settle({ ...INITIAL_VIEW, direction, calcError: getErrorMessage(error) });
        return;
      }
      settle({ calcError: getErrorMessage(error) });
    }
  };

  const schedule = (delay: number) => {
    owed = true;
    update({ pending: view.direction, calcError: null });
    if (!mounted) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      void request();
    }, delay);
  };

  const edit = (direction: Direction, value: number) => {
    // The same value again (e.g. an input re-emitting on blur) is not an edit, as with a plain state setter.
    if (Object.is(value, direction === 'forward' ? view.sellingAmount : view.buyingAmount)) return;
    invalidate();
    if (!value) {
      // An emptied field: no quote and nothing to ask.
      update({ ...INITIAL_VIEW, direction });
      return;
    }
    update({
      ...(direction === 'forward' ? { sellingAmount: value } : { buyingAmount: value }),
      direction,
      calcError: null,
    });
    if (!canQuote(latest.current)) {
      update({ pending: null });
      return;
    }
    schedule(EDIT_DELAY_MS);
  };

  return {
    setSellingAmount: (value: number) => edit('forward', value),
    setBuyingAmount: (value: number) => edit('reverse', value),

    // Quote the last edit again, with the latest amounts, after a change of what the quote depends on.
    inputsChanged: () => {
      invalidate();
      if (!view.direction || !editedAmount(view) || !canQuote(latest.current)) {
        update({ pending: null, calcError: null });
        return;
      }
      schedule(INPUTS_DELAY_MS);
    },

    mount: () => {
      mounted = true;
      if (owed) schedule(EDIT_DELAY_MS);
      return () => {
        mounted = false;
        stop();
      };
    },
  };
};

export const useOrderCalc: UseOrderCalc = ({
  from_currency_id,
  to_currency_id,
  calcHandler,
  disableCalculation,
  to_address,
  minSellAmount,
  maxSellAmount,
}) => {
  const props: LatestProps = {
    calcHandler,
    from_currency_id,
    to_currency_id,
    to_address,
    disableCalculation: !!disableCalculation,
    minSellAmount,
    maxSellAmount,
  };
  // Read when a timer fires; updated on commit, before any effect or timer can read it.
  const latestRef = useRef(props);
  useIsomorphicLayoutEffect(() => {
    latestRef.current = props;
  });

  const [view, setView] = useState(INITIAL_VIEW);
  const [calc] = useState(() => createOrderCalc(latestRef, setView));

  useEffect(() => calc.mount(), [calc]);

  // Compared by value, so the first run and a StrictMode re-run do nothing.
  const prevInputsRef = useRef(props);
  useEffect(() => {
    const prev = prevInputsRef.current;
    const next = latestRef.current;
    prevInputsRef.current = next;
    if (sameInputs(prev, next) && prev.disableCalculation === next.disableCalculation) return;
    calc.inputsChanged();
  }, [calc, calcHandler, from_currency_id, to_currency_id, to_address, props.disableCalculation]);

  const { quote, direction } = view;
  const isCalcCurrent =
    quote !== null &&
    view.pending === null &&
    view.calcError === null &&
    quote.direction === direction &&
    quote.amount === editedAmount(view) &&
    sameInputs(quote.inputs, props);

  return {
    sellingAmount: view.sellingAmount,
    setSellingAmount: calc.setSellingAmount,
    buyingAmount: view.buyingAmount,
    setBuyingAmount: calc.setBuyingAmount,
    calcData: quote?.data ?? null,
    isSellingValuePending: view.pending === 'reverse',
    isBuyingValuePending: view.pending === 'forward',
    isCalcCurrent,
    calcError: view.calcError,
  };
};
