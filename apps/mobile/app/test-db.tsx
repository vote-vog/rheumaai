import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function TestDb() {
  const [message, setMessage] = useState('Testing database connection...');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('count');
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Database connection successful! ✅');
      }
    } catch (err) {
      setMessage(`Connection failed: ${err}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}
