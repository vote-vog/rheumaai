import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export default function HistoryScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        История сообщений
      </Text>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 15, 
            marginVertical: 5, 
            backgroundColor: item.role === 'user' ? '#007AFF' : '#E5E5EA',
            borderRadius: 10,
          }}>
            <Text style={{ 
              color: item.role === 'user' ? 'white' : 'black',
              fontWeight: 'bold'
            }}>
              {item.role === 'user' ? 'Вы' : 'Ассистент'}:
            </Text>
            <Text style={{ 
              color: item.role === 'user' ? 'white' : 'black',
              marginTop: 5
            }}>
              {item.content}
            </Text>
            <Text style={{ 
              color: item.role === 'user' ? '#CCE5FF' : '#666',
              fontSize: 12,
              marginTop: 10
            }}>
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#666', marginTop: 50 }}>
            История сообщений пуста
          </Text>
        }
      />
    </View>
  );
}
