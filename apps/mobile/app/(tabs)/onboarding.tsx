import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function OnboardingScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!age || !diagnosis) {
      Alert.alert('Ошибка', 'Заполните обязательные поля');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not found');

      const { error } = await supabase
        .from('profiles')
        .update({
          age: parseInt(age),
          gender,
          diagnosis,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert('Успешно', 'Данные сохранены!');
      router.replace('/');

    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить данные');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
        Расскажите о себе
      </Text>

      <TextInput
        placeholder="Возраст *"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Пол (например, М/Ж)"
        value={gender}
        onChangeText={setGender}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Диагноз *"
        value={diagnosis}
        onChangeText={setDiagnosis}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007AFF',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
