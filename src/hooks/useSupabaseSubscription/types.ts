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
  key?: string;
}

export interface UseWalletTransactionsSubscriptionProps extends Omit<UseSupabaseSubscriptionProps, 'config'> {
  walletId: string | undefined;
}
