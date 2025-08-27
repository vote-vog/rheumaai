// apps/mobile/components/MedicationInput.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface MedicationInputProps {
  onMedicationAdd: (med: Medication) => void;
}

export default function MedicationInput({ onMedicationAdd }: MedicationInputProps) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('ежедневно');

  const handleAdd = () => {
    if (name.trim() && dosage.trim()) {
      onMedicationAdd({
        name: name.trim(),
        dosage: dosage.trim(),
        frequency
      });
      setName('');
      setDosage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавьте препараты</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Название препарата (Метотрексат)"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Дозировка (15 мг)"
        value={dosage}
        onChangeText={setDosage}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Частота приема (ежедневно, еженедельно)"
        value={frequency}
        onChangeText={setFrequency}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Добавить препарат</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
