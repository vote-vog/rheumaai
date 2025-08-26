export default ({ config }) => ({
  ...config,
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
  },
});
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    }
  }
};
