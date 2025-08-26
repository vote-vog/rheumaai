import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Проверяем авторизацию при запуске приложения
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/');
      } else {
        router.replace('/auth/login');
      }
    });

    // Слушаем изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/');
      } else {
        router.replace('/auth/login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
