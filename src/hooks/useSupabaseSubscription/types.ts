export interface SubscriptionConfig {
  channelName: string;
  /** Broadcast event name emitted by the database trigger (realtime.send). */
  event: string;
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
