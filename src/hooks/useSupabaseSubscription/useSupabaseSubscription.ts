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

    const subscription = supabaseClient
      .channel(key || config.channelName, { config: { private: true } })
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
