'use client';

import { useEffect, useRef } from 'react';

import { UseSupabaseSubscriptionProps } from './types';

import { supabaseClient } from '../../utils/supabase';

export const useSupabaseSubscription = ({ config, callback, enabled = true, key }: UseSupabaseSubscriptionProps) => {
  const subscriptionRef = useRef<any>(null);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled || !supabaseClient) {
      return;
    }

    if (subscriptionRef.current) {
      supabaseClient.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }

    // The channel name IS the broadcast topic — it must match what the DB trigger sends
    // (`wallet-transactions-<walletId>`). `key` only re-triggers the effect (see deps), it must
    // never override the topic, otherwise the client subscribes to the wrong channel.
    const subscription = supabaseClient
      .channel(config.channelName, { config: { private: true } })
      .on('broadcast', { event: config.event }, (payload) => callbackRef.current(payload))
      .subscribe();

    subscriptionRef.current = subscription;

    return () => {
      if (subscriptionRef.current && supabaseClient) {
        supabaseClient.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [enabled, config.channelName, config.event, supabaseClient, key]);

  return {
    isConnected: !!subscriptionRef.current,
    isClientAvailable: !!supabaseClient,
  };
};
