import { SubscriptionConfig } from './types';

export const createWalletTransactionsConfig = (walletId: string): SubscriptionConfig => ({
  channelName: `wallet-transactions-${walletId}`,
  table: 'transactions',
  filter: `wallet_id=eq.${walletId}`,
});
