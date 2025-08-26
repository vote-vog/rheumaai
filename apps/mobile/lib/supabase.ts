import { createClient } from '@supabase/supabase-js';
import { Database } from '../../shared/types'; // Типы мы создадим позже

// Эти значения мы позже заменим на переменные окружения
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
