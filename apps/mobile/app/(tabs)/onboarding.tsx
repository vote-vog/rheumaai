import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    diagnosis: 'ревматоидный артрит',
    diagnosisDuration: '',
    morningStiffness: '',
    painLevel: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { error } = await supabase
        .from('profiles')
        .update({
          age: parseInt(formData.age),
          gender: formData.gender,
          diagnosis: formData.diagnosis,
          diagnosis_duration: parseInt(formData.diagnosisDuration),
          morning_stiffness: parseInt(formData.morningStiffness),
          pain_level: parseInt(formData.painLevel),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert('Успешно', 'Данные сохранены!');
      router.replace('/(tabs)/chat');

    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить данные');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Добро пожаловать в RheumaAI! 👋</Text>
      <Text style={styles.subtitle}>
        Поможем отслеживать ваше состояние и улучшим качество жизни
      </Text>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Основная информация</Text>
      <TextInput
        placeholder="Возраст *"
        value={formData.age}
        onChangeText={(text) => setFormData({...formData, age: text})}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Пол (М/Ж)"
        value={formData.gender}
        onChangeText={(text) => setFormData({...formData, gender: text})}
        style={styles.input}
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>О вашем состоянии</Text>
      <TextInput
        placeholder="Стаж заболевания (лет)"
        value={formData.diagnosisDuration}
        onChangeText={(text) => setFormData({...formData, diagnosisDuration: text})}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Утренняя скованность (минут)"
        value={formData.morningStiffness}
        onChangeText={(text) => setFormData({...formData, morningStiffness: text})}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Уровень боли (0-10)"
        value={formData.painLevel}
        onChangeText={(text) => setFormData({...formData, painLevel: text})}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      
      <View style={styles.navigation}>
        {step > 1 && (
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Text style={styles.navButton}>Назад</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          onPress={step < 3 ? () => setStep(step + 1) : handleSave}
          disabled={loading}
        >
          <Text style={styles.navButton}>
            {loading ? 'Сохранение...' : step < 3 ? 'Далее' : 'Завершить'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepContainer: {
    flex: 1,
    minHeight: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    padding: 20,
  },
  navButton: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
});
// Добавьте эту функцию валидации в onboarding.tsx
const validateStep = (currentStep: number) => {
  switch (currentStep) {
    case 2:
      return formData.age && formData.gender;
    case 3:
      return formData.diagnosisDuration && formData.morningStiffness && formData.painLevel;
    default:
      return true;
  }
};

// Обновите кнопку "Далее"
<TouchableOpacity 
  onPress={step < 3 ? () => setStep(step + 1) : handleSave}
  disabled={loading || !validateStep(step)}
  style={{
    opacity: validateStep(step) ? 1 : 0.5
  }}
>
