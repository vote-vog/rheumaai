import { createClient } from '@supabase/supabase-js';

export const createSupabaseServerClient = (supabaseUrl: string, supabaseKey: string) => {
  return createClient(supabaseUrl, supabaseKey);
};
