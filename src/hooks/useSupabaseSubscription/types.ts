export interface SubscriptionConfig {
  channelName: string;
  table: string;
  schema?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
}

export interface UseSupabaseSubscriptionProps {
  config: SubscriptionConfig;
  callback: (payload?: unknown) => void;
  enabled?: boolean;
}

export interface UseWalletTransactionsSubscriptionProps {
  walletId: string | undefined;
  callback: () => void;
  enabled?: boolean;
}
