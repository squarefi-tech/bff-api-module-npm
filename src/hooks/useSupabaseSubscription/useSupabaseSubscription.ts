import { useEffect, useRef } from 'react';

import { UseSupabaseSubscriptionProps } from './types';

import { supabaseClient } from '../../utils/supabase';

export const useSupabaseSubscription = ({ config, callback, enabled = true }: UseSupabaseSubscriptionProps) => {
  const subscriptionRef = useRef<any>(null);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (!supabaseClient) {
      throw new Error('Supabase client is not available');
    }

    if (subscriptionRef.current) {
      supabaseClient.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }

    const subscription = supabaseClient
      .channel(config.channelName)
      .on(
        'postgres_changes' as any,
        {
          event: config.event || '*',
          schema: config.schema || 'public',
          table: config.table,
          ...(config.filter && { filter: config.filter }),
        },
        (payload) => callbackRef.current(payload)
      )
      .subscribe();

    subscriptionRef.current = subscription;

    return () => {
      if (subscriptionRef.current && supabaseClient) {
        supabaseClient.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [enabled, config.channelName, config.table, config.schema, config.event, config.filter]);

  return {
    isConnected: !!subscriptionRef.current,
    isClientAvailable: !!supabaseClient,
  };
};
