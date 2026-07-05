import { SubscriptionConfig } from './types';

export const createWalletTransactionsConfig = (walletId: string): SubscriptionConfig => ({
  channelName: `wallet-transactions-${walletId}`,
  event: 'tx',
});
