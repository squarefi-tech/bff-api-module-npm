import { createWalletTransactionsConfig } from './config';
import { UseWalletTransactionsSubscriptionProps } from './types';
import { useSupabaseSubscription } from './useSupabaseSubscription';

export const useWalletTransactionsSubscription = ({ walletId, ...props }: UseWalletTransactionsSubscriptionProps) =>
  useSupabaseSubscription({
    ...props,
    config: createWalletTransactionsConfig(walletId || ''),
  });
