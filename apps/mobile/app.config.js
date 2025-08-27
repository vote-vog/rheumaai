// apps/mobile/app.config.js
export default {
  expo: {
    name: "RheumaAI",
    slug: "rheumaai", 
    owner: "vote-vog",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.votevog.rheumaai"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: ["expo-router"],
    scheme: "rheumaai",
    extra: {
      eas: {
        projectId: "d5601a8f-e0e8-4117-a7a8-701021f929c1"
      },
      // ✅ БЕЗОПАСНО: Используем правильные имена для клиентских переменных
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      router: {
        origin: false
      }
    }
  }
};
