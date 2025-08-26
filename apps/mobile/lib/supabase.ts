import { createClient } from '@supabase/supabase-js';
import { Database } from '../../shared/types';
import { supabaseUrl, supabaseAnonKey } from './config';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
