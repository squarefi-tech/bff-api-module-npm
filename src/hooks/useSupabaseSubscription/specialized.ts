import { createWalletTransactionsConfig } from './config';
import { UseWalletTransactionsSubscriptionProps } from './types';
import { useSupabaseSubscription } from './useSupabaseSubscription';

export const useWalletTransactionsSubscription = ({
  walletId,
  callback,
  enabled = true,
}: UseWalletTransactionsSubscriptionProps) =>
  useSupabaseSubscription({
    config: createWalletTransactionsConfig(walletId || ''),
    callback,
    enabled: enabled && !!walletId,
  });
