import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // TODO: Интеграция с OpenAI API
    console.log('Отправка сообщения:', inputText);
    setInputText('');
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 10, 
            margin: 5, 
            backgroundColor: item.role === 'user' ? '#007AFF' : '#E5E5EA',
            alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
            borderRadius: 10,
            maxWidth: '80%'
          }}>
            <Text style={{ 
              color: item.role === 'user' ? 'white' : 'black' 
            }}>
              {item.content}
            </Text>
          </View>
        )}
        style={{ flex: 1 }}
      />

      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Опишите ваше состояние..."
          style={{ 
            flex: 1, 
            borderWidth: 1, 
            borderColor: '#ccc', 
            borderRadius: 20, 
            padding: 10, 
            marginRight: 10 
          }}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: 'white' }}>Отправить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
