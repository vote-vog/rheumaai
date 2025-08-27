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

  // Функция валидации шага
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

  const handleSave = async () => {
    // Валидация числовых полей
    const ageValue = parseInt(formData.age);
    const durationValue = parseInt(formData.diagnosisDuration);
    const stiffnessValue = parseInt(formData.morningStiffness);
    const painValue = parseInt(formData.painLevel);

    if (isNaN(ageValue) || ageValue < 1 || ageValue > 120) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректный возраст (1-120)');
      return;
    }

    if (isNaN(durationValue) || durationValue < 0 || durationValue > 100) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректный стаж заболевания');
      return;
    }

    if (isNaN(stiffnessValue) || stiffnessValue < 0 || stiffnessValue > 300) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректное время скованности (0-300 минут)');
      return;
    }

    if (isNaN(painValue) || painValue < 0 || painValue > 10) {
      Alert.alert('Ошибка', 'Пожалуйста, введите уровень боли от 0 до 10');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { error } = await supabase
        .from('profiles')
        .update({
          age: ageValue,
          gender: formData.gender,
          diagnosis: formData.diagnosis,
          diagnosis_duration: durationValue,
          morning_stiffness: stiffnessValue,
          pain_level: painValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert('Успешно', 'Данные сохранены!');
      router.replace('/(tabs)/chat');

    } catch (error) {
      console.error('Save error:', error);
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
        onChangeText={(text) => setFormData({...formData, age: text.replace(/[^0-9]/g, '')})}
        keyboardType="numeric"
        style={styles.input}
        maxLength={3}
      />
      <TextInput
        placeholder="Пол (М/Ж)"
        value={formData.gender}
        onChangeText={(text) => setFormData({...formData, gender: text})}
        style={styles.input}
        maxLength={1}
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>О вашем состоянии</Text>
      <TextInput
        placeholder="Стаж заболевания (лет)"
        value={formData.diagnosisDuration}
        onChangeText={(text) => setFormData({...formData, diagnosisDuration: text.replace(/[^0-9]/g, '')})}
        keyboardType="numeric"
        style={styles.input}
        maxLength={2}
      />
      <TextInput
        placeholder="Утренняя скованность (минут)"
        value={formData.morningStiffness}
        onChangeText={(text) => setFormData({...formData, morningStiffness: text.replace(/[^0-9]/g, '')})}
        keyboardType="numeric"
        style={styles.input}
        maxLength={3}
      />
      <TextInput
        placeholder="Уровень боли (0-10)"
        value={formData.painLevel}
        onChangeText={(text) => setFormData({...formData, painLevel: text.replace(/[^0-9]/g, '')})}
        keyboardType="numeric"
        style={styles.input}
        maxLength={2}
      />
    </View>
  );

  const isStepValid = validateStep(step);

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
          disabled={loading || !isStepValid}
          style={[styles.nextButton, (!isStepValid || loading) && styles.nextButtonDisabled]}
        >
          <Text style={styles.nextButtonText}>
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
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
