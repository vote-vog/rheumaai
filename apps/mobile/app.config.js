export default {
  expo: {
    name: "RheumaAI",
    slug: "rheumaai",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    scheme: "rheumaai",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.rheumaai"
    },
    android: {
      package: "com.yourcompany.rheumaai",
      // УБИРАЕМ adaptiveIcon пока нет файлов
      adaptiveIcon: null
    },
    web: {
      bundler: "metro"
    },
    plugins: [
      "expo-router"
    ],
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY
    }
  }
};
