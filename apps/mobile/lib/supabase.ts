import { createClient } from '@supabase/supabase-js';
import { Database } from '../../shared/types';

// Эти переменные должны быть заданы в настройках Expo
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
