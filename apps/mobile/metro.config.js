// apps/mobile/app.config.js - ПОЛНЫЙ код файла:
export default {
  expo: {
    name: 'RheumaAI',
    slug: 'rheumaai',
    version: '1.0.0',
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
