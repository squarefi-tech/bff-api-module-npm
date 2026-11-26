/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { createElement, StrictMode, useEffect, useRef, type ReactNode } from 'react';

import { useOrderCalc, type OrderCalcHandlerProps, type UseOrderCalcProps } from './useCalc';

type Answer = Awaited<ReturnType<UseOrderCalcProps['calcHandler']>>;

type Call = {
  handler: string;
  amount: number;
  isReverse: boolean;
  toAddress?: string;
  toCurrency: string;
  signal?: AbortSignal;
};

// A calc handler with a controllable latency (in fake time) per call. It rejects with ERR_CANCELED as soon as
// its signal aborts, like fetch and axios, unless `ignoreAbort` is set.
type Stub = ((props: OrderCalcHandlerProps) => Promise<Answer>) & {
  latency: (n: number) => number;
  ignoreAbort: boolean;
  fail: ((props: OrderCalcHandlerProps) => unknown) | null;
  answer: (props: OrderCalcHandlerProps) => Answer;
};

const USDT = 'usdt-id';
const EUR = 'eur-id';
const ADDRESS = 'TAX544wj9oDmAqWLzuAnYLU9GfS8XncsJ9';

// Captured before the fake timers replace it: a real macrotask lets Node report unhandled rejections.
const realSetTimeout = setTimeout;

let calls: Call[] = [];

const quote = (name: string, fee: number, props: OrderCalcHandlerProps): Answer => ({
  from_currency: props.from_currency_id,
  to_currency: props.to_currency_id,
  from_amount: props.is_reverse ? props.amount + fee : props.amount,
  result_amount: props.is_reverse ? props.amount : props.amount - fee,
  rate: 1,
  fees: fee,
  comission: fee,
  network_fee: 0,
  transaction_fee: 0,
  // Tells which handler answered.
  from_symbol: name,
});

const makeHandler = (name: string, fee: number): Stub => {
  let n = 0;
  const stub = ((props: OrderCalcHandlerProps) => {
    calls.push({
      handler: name,
      amount: props.amount,
      isReverse: props.is_reverse,
      toAddress: props.to_address,
      toCurrency: props.to_currency_id,
      signal: props.signal,
    });
    const latency = stub.latency(n++);
    return new Promise<Answer>((resolve, reject) => {
      const cancel = () => reject(Object.assign(new Error('canceled'), { code: 'ERR_CANCELED' }));
      if (!stub.ignoreAbort) props.signal?.addEventListener('abort', cancel);
      setTimeout(() => {
        props.signal?.removeEventListener('abort', cancel);
        const failure = stub.fail?.(props);
        if (failure) reject(failure);
        else resolve(stub.answer(props));
      }, latency);
    });
  }) as Stub;
  stub.latency = () => 50;
  stub.ignoreAbort = false;
  stub.fail = null;
  stub.answer = (props) => quote(name, fee, props);
  return stub;
};

// One act per 10 ms: React renders and runs effect cleanups between timers, as in a browser.
const advance = async (ms: number) => {
  for (let t = 0; t < ms; t += 10) {
    await act(async () => {
      await jest.advanceTimersByTimeAsync(Math.min(10, ms - t));
    });
  }
};
const settle = () => advance(3000);
const flushRealTick = () => act(() => new Promise<void>((resolve) => realSetTimeout(resolve, 0)));

const baseProps = (calcHandler: Stub, extra: Partial<UseOrderCalcProps> = {}): UseOrderCalcProps => ({
  from_currency_id: USDT,
  to_currency_id: USDT,
  calcHandler,
  ...extra,
});

const renderCalc = (props: UseOrderCalcProps) =>
  renderHook((current: UseOrderCalcProps) => useOrderCalc(current), { initialProps: props });

// Mounts and lets any mount-time timers run out, for the scenarios that are not about the mount.
const mountCalc = async (props: UseOrderCalcProps) => {
  const rendered = renderCalc(props);
  await settle();
  return rendered;
};

// The consumer puts back a draft amount in its mount effect, as the wallet's Send screen does on an AML return.
const renderWithDraft = (props: UseOrderCalcProps, draft: number, strict = false) =>
  renderHook(
    (current: UseOrderCalcProps) => {
      const calc = useOrderCalc(current);
      const restored = useRef(false);
      const { setSellingAmount } = calc;
      useEffect(() => {
        if (restored.current) return;
        restored.current = true;
        setSellingAmount(draft);
      }, [setSellingAmount]);
      return calc;
    },
    {
      initialProps: props,
      wrapper: strict
        ? ({ children }: { children: ReactNode }) => createElement(StrictMode, null, children)
        : undefined,
    },
  );

let handlerA: Stub;
let handlerB: Stub;

beforeEach(() => {
  jest.useFakeTimers({ doNotFake: ['nextTick', 'queueMicrotask'] });
  calls = [];
  handlerA = makeHandler('A', 1);
  handlerB = makeHandler('B', 3);
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

// Behaviour is asserted first and the new fields (isCalcCurrent, calcError) last, so a run against the previous
// hook fails on the race itself where there is one.
describe('useOrderCalc', () => {
  it('makes no request on mount', async () => {
    const { result } = renderCalc(baseProps(handlerA));
    await settle();
    expect(calls).toHaveLength(0);
    expect(result.current.calcData).toBeNull();
    expect(result.current.isBuyingValuePending).toBe(false);
    expect(result.current.isSellingValuePending).toBe(false);
  });

  it('E1: a handler switch inside the debounce window quotes with the new handler only', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(5));
    await settle();
    expect(result.current.calcData?.from_symbol).toBe('A');

    handlerA.latency = () => 900;
    handlerB.latency = () => 50;
    act(() => result.current.setSellingAmount(10));
    await advance(300);
    rerender(baseProps(handlerB, { to_address: ADDRESS }));
    await settle();

    expect(result.current.calcData?.from_symbol).toBe('B');
    expect(result.current.sellingAmount).toBe(10);
    expect(result.current.buyingAmount).toBe(7);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('E1: a late answer of the replaced handler is ignored, even when the handler ignores the abort', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(5));
    await settle();
    // The request for 10 is in flight when the handler switches, and answers after the new handler does.
    handlerA.latency = () => 1500;
    handlerA.ignoreAbort = true;
    act(() => result.current.setSellingAmount(10));
    await advance(1100);
    expect(calls.map((call) => `${call.handler}:${call.amount}`)).toEqual(['A:5', 'A:10']);

    rerender(baseProps(handlerB, { to_address: ADDRESS }));
    await settle();

    expect(calls.map((call) => `${call.handler}:${call.amount}`)).toEqual(['A:5', 'A:10', 'B:10']);
    expect(result.current.calcData?.from_symbol).toBe('B');
    expect(result.current.buyingAmount).toBe(7);
    expect(calls[1].signal?.aborted).toBe(true);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('E2: an amount typed in "receiver gets" survives a handler switch', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(5));
    await settle();

    act(() => result.current.setBuyingAmount(10));
    await advance(300);
    rerender(baseProps(handlerB, { to_address: ADDRESS }));
    await settle();

    expect(result.current.buyingAmount).toBe(10);
    expect(result.current.sellingAmount).toBe(13);
    expect(result.current.calcData).toMatchObject({ from_symbol: 'B', is_reverse: true });
    expect(calls.filter((call) => call.handler === 'B')).toEqual([
      expect.objectContaining({ amount: 10, isReverse: true }),
    ]);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('E3: an amount set right after mount (a restored draft) is quoted, not wiped', async () => {
    const { result } = renderWithDraft(baseProps(handlerA), 10);
    await settle();
    await settle();

    expect(result.current.sellingAmount).toBe(10);
    expect(result.current.buyingAmount).toBe(9);
    expect(calls).toEqual([expect.objectContaining({ handler: 'A', amount: 10, isReverse: false })]);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('E3 under StrictMode: the mount, cleanup, mount cycle keeps the draft quote and clears pending', async () => {
    const { result } = renderWithDraft(baseProps(handlerA), 10, true);
    await settle();

    expect(result.current.sellingAmount).toBe(10);
    expect(result.current.buyingAmount).toBe(9);
    expect(result.current.isBuyingValuePending).toBe(false);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('E5: typing right after a to_address change is not overwritten by the re-quote of the old amount', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(10));
    await settle();

    handlerB.latency = (n) => (n === 0 ? 900 : 50);
    rerender(baseProps(handlerB, { to_address: ADDRESS }));
    await advance(500);
    act(() => result.current.setSellingAmount(20));
    await settle();
    await settle();

    expect(result.current.sellingAmount).toBe(20);
    expect(result.current.buyingAmount).toBe(17);
    expect(result.current.calcData).toMatchObject({ from_symbol: 'B', from_amount: 20 });
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('E6: typing within the first second after mount is not wiped', async () => {
    const { result } = renderCalc(baseProps(handlerA));
    await advance(400);
    act(() => result.current.setSellingAmount(10));
    await settle();
    await settle();

    expect(result.current.sellingAmount).toBe(10);
    expect(result.current.buyingAmount).toBe(9);
    expect(calls).toHaveLength(1);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('typing is debounced: one request, 1 s after the last keystroke', async () => {
    const { result } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(1));
    await advance(300);
    act(() => result.current.setSellingAmount(12));
    await advance(300);
    act(() => result.current.setSellingAmount(123));
    await advance(900);
    expect(calls).toHaveLength(0);
    await settle();
    expect(calls).toEqual([expect.objectContaining({ amount: 123 })]);
    expect(result.current.buyingAmount).toBe(122);
  });

  it('E8: inside the debounce window the previous quote is marked stale and the derived side pending', async () => {
    const { result } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(10));
    expect(result.current.isBuyingValuePending).toBe(true);
    await settle();
    const currentAfterAnswer = result.current.isCalcCurrent;

    act(() => result.current.setSellingAmount(20));
    await advance(200);
    expect(result.current.calcData?.from_amount).toBe(10);
    expect(result.current.isBuyingValuePending).toBe(true);
    const currentInWindow = result.current.isCalcCurrent;

    await settle();
    expect(result.current.calcData?.from_amount).toBe(20);
    expect(result.current.isBuyingValuePending).toBe(false);

    act(() => result.current.setBuyingAmount(5));
    expect(result.current.isSellingValuePending).toBe(true);
    expect(result.current.isBuyingValuePending).toBe(false);
    const currentAfterReverseEdit = result.current.isCalcCurrent;
    await settle();
    expect(result.current.isSellingValuePending).toBe(false);
    expect(result.current.sellingAmount).toBe(6);

    expect(currentAfterAnswer).toBe(true);
    expect(currentInWindow).toBe(false);
    expect(currentAfterReverseEdit).toBe(false);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('a cancel of the latest request does not leave the pending flag stuck', async () => {
    const { result } = await mountCalc(baseProps(handlerA));
    handlerA.fail = () => Object.assign(new Error('canceled'), { code: 'ERR_CANCELED' });
    act(() => result.current.setSellingAmount(10));
    await settle();

    expect(calls).toHaveLength(1);
    expect(result.current.isBuyingValuePending).toBe(false);
    expect(result.current.calcError).toBeNull();
    expect(result.current.isCalcCurrent).toBe(false);
  });

  it('clearing the field while a request is in flight aborts it and clears pending at once, with no request', async () => {
    const { result } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(5));
    await settle();
    handlerA.latency = () => 900;
    act(() => result.current.setSellingAmount(10));
    await advance(1100);
    expect(calls).toHaveLength(2);

    act(() => result.current.setSellingAmount(0));
    const pendingRightAfterClear = result.current.isBuyingValuePending;
    await settle();

    expect(calls).toHaveLength(2);
    expect(calls[1].signal?.aborted).toBe(true);
    expect(result.current.calcData).toBeNull();
    expect(result.current.sellingAmount).toBe(0);
    expect(result.current.buyingAmount).toBe(0);
    expect(result.current.isBuyingValuePending).toBe(false);
    expect(pendingRightAfterClear).toBe(false);
  });

  it('an error is not rethrown: calcError is set and pending cleared; a new edit or an answer clears it', async () => {
    const { result } = await mountCalc(baseProps(handlerA));
    handlerA.fail = (props) =>
      props.amount === 10
        ? Object.assign(new Error('Request failed with status code 400'), {
            status: 400,
            response: { status: 400, data: { message: 'Amount too small' } },
          })
        : null;
    act(() => result.current.setSellingAmount(10));
    await settle();
    await flushRealTick();

    expect(result.current.isBuyingValuePending).toBe(false);
    expect(result.current.calcError).toBe('Amount too small');
    expect(result.current.isCalcCurrent).toBe(false);

    act(() => result.current.setSellingAmount(11));
    expect(result.current.calcError).toBeNull();
    await settle();
    expect(result.current.buyingAmount).toBe(10);
    expect(result.current.calcError).toBeNull();
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('a 404 resets the amounts and the quote, without an unhandled rejection', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { result } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(10));
    await settle();
    handlerA.fail = () => Object.assign(new Error('Rate not found'), { status: 404 });
    act(() => result.current.setSellingAmount(20));
    await settle();
    await flushRealTick();

    expect(result.current.calcData).toBeNull();
    expect(result.current.sellingAmount).toBe(0);
    expect(result.current.buyingAmount).toBe(0);
    expect(result.current.isBuyingValuePending).toBe(false);
    expect(result.current.calcError).toBe('Rate not found');
  });

  it('unmount: the scheduled quote never fires', async () => {
    const { result, unmount } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(5));
    await settle();
    act(() => result.current.setSellingAmount(10));
    await advance(500);
    unmount();
    await settle();
    expect(calls).toHaveLength(1);
  });

  it('unmount: the request in flight is aborted and its answer is dropped', async () => {
    const consoleError = jest.spyOn(console, 'error');
    const { result, unmount } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(5));
    await settle();
    handlerA.latency = () => 900;
    handlerA.ignoreAbort = true;
    act(() => result.current.setSellingAmount(10));
    await advance(1100);
    expect(calls).toHaveLength(2);

    unmount();
    await settle();
    await flushRealTick();
    expect(calls).toHaveLength(2);
    expect(consoleError).not.toHaveBeenCalled();
    expect(calls[1].signal?.aborted).toBe(true);
  });

  it('min/max: an out-of-range sell amount is not requested and is no error; reverse edits are not gated', async () => {
    const { result } = await mountCalc(baseProps(handlerA, { minSellAmount: 5, maxSellAmount: 100 }));
    act(() => result.current.setSellingAmount(10));
    await settle();
    expect(calls).toHaveLength(1);

    act(() => result.current.setSellingAmount(3));
    await settle();
    act(() => result.current.setSellingAmount(150));
    await settle();
    expect(calls).toHaveLength(1);
    expect(result.current.isBuyingValuePending).toBe(false);
    // The previous quote stays, but it is not for the amount on screen.
    expect(result.current.calcData?.from_amount).toBe(10);

    act(() => result.current.setBuyingAmount(2));
    await settle();
    expect(calls).toHaveLength(2);
    expect(calls[1]).toMatchObject({ amount: 2, isReverse: true });

    act(() => result.current.setSellingAmount(4));
    await settle();
    expect(calls).toHaveLength(2);
    expect(result.current.calcError).toBeNull();
    expect(result.current.isCalcCurrent).toBe(false);
  });

  it('amounts set from an answer do not trigger a new quote', async () => {
    // The backend normalises the amount: the stored sell amount differs from the typed one.
    handlerA.answer = (props) => {
      const from = props.is_reverse ? props.amount + 1 : Math.round(props.amount * 100) / 100;
      return { ...quote('A', 1, props), from_amount: from, result_amount: props.is_reverse ? props.amount : from - 1 };
    };
    const { result } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(10.123));
    await settle();
    await settle();
    expect(result.current.sellingAmount).toBe(10.12);
    expect(calls).toHaveLength(1);

    act(() => result.current.setBuyingAmount(7));
    await settle();
    await settle();
    expect(result.current.sellingAmount).toBe(8);
    expect(calls).toHaveLength(2);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('a currency change re-quotes the last edited side with the latest amount', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setBuyingAmount(10));
    await settle();
    rerender(baseProps(handlerA, { to_currency_id: EUR }));
    const currentRightAfterChange = result.current.isCalcCurrent;
    await settle();

    expect(calls).toHaveLength(2);
    expect(calls[1]).toMatchObject({ amount: 10, isReverse: true, toCurrency: EUR });
    expect(currentRightAfterChange).toBe(false);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('rapid handler toggles coalesce into one request; toggling back to the quoted handler asks nothing', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA));
    act(() => result.current.setSellingAmount(10));
    await settle();
    expect(calls).toHaveLength(1);

    rerender(baseProps(handlerB));
    await advance(100);
    rerender(baseProps(handlerA));
    await advance(100);
    rerender(baseProps(handlerB));
    await settle();
    expect(calls.map((call) => call.handler)).toEqual(['A', 'B']);
    expect(result.current.calcData?.from_symbol).toBe('B');

    rerender(baseProps(handlerA));
    await advance(100);
    rerender(baseProps(handlerB));
    await settle();
    expect(calls).toHaveLength(2);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('disableCalculation: no request or pending while disabled; the last edit is quoted once enabled', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA, { disableCalculation: true }));
    act(() => result.current.setSellingAmount(10));
    expect(result.current.isBuyingValuePending).toBe(false);
    await settle();
    expect(calls).toHaveLength(0);

    rerender(baseProps(handlerA, { disableCalculation: false }));
    await settle();
    expect(calls).toEqual([expect.objectContaining({ amount: 10, isReverse: false })]);
    expect(result.current.buyingAmount).toBe(9);
    expect(result.current.isCalcCurrent).toBe(true);
  });

  it('keeps the setters stable across renders', async () => {
    const { result, rerender } = await mountCalc(baseProps(handlerA));
    const { setSellingAmount, setBuyingAmount } = result.current;
    act(() => result.current.setSellingAmount(10));
    await settle();
    rerender(baseProps(handlerB));
    expect(result.current.setSellingAmount).toBe(setSellingAmount);
    expect(result.current.setBuyingAmount).toBe(setBuyingAmount);
  });
});
