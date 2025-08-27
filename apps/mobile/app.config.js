export default {
  expo: {
    name: "RheumaAI",
    slug: "rheumaai",
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
        projectId: "d5601a8f-e0e8-4117-a7a8-701021f929c1"  // ← ПРАВИЛЬНЫЙ UUID!
      },
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      router: {
        origin: false
      }
    }
  }
};
