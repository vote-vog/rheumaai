import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Ошибка регистрации', error.message);
      } else {
        Alert.alert('Успешно', 'Проверьте email для подтверждения');
        router.replace('/auth/login');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
        Регистрация
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 15 }}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007AFF',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Text>
      </TouchableOpacity>

      <Link href="/auth/login" asChild>
        <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#007AFF' }}>Уже есть аккаунт? Войти</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
