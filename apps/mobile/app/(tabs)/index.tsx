// Главный экран приложения после входа
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Добро пожаловать в RheumaAI! 🎉
      </Text>
      
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' }}>
        Для тестирования войдите в систему
      </Text>

      <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 20, color: '#888' }}>
        Email: test@example.com
        Password: password123
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#FF3B30',
          padding: 15,
          borderRadius: 10,
          width: '100%',
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}
