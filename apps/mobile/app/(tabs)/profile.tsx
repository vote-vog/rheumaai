import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

interface Profile {
  username: string;
  email: string;
  age: number;
  gender: string;
  diagnosis: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось выйти из системы');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
        Профиль
      </Text>

      {profile ? (
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Имя:</Text> {profile.username || 'Не указано'}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text> {profile.email}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Возраст:</Text> {profile.age || 'Не указан'}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Пол:</Text> {profile.gender || 'Не указан'}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Диагноз:</Text> {profile.diagnosis || 'Не указан'}
          </Text>
        </View>
      ) : (
        <Text style={{ marginBottom: 30, color: '#666' }}>
          Заполните информацию в разделе "О себе"
        </Text>
      )}

      <Text 
        style={{ 
          color: '#FF3B30', 
          textAlign: 'center',
          marginTop: 20,
          fontWeight: 'bold',
          fontSize: 16
        }}
        onPress={handleLogout}
      >
        Выйти из системы
      </Text>
    </View>
  );
}
