import { createClient } from '@supabase/supabase-js';

// Создаем клиент только если есть необходимые environment переменные
const createSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabasePublicKey = process.env.SUPABASE_PUBLIC_KEY;

  if (!supabaseUrl || !supabasePublicKey) {
    console.warn('Supabase environment variables are missing. Client will not be created.');
    return null;
  }

  return createClient(supabaseUrl, supabasePublicKey);
};

export const supabaseClient = createSupabaseClient();
