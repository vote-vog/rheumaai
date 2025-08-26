export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  role: MessageRole;
  created_at: string;
  summary?: string;
}

export interface Symptom {
  id: string;
  user_id: string;
  name: string;
  intensity?: number;
  location?: string;
  duration?: string;
  created_at: string;
}

export interface Medication {
  id: string;
  user_id: string;
  name: string;
  dosage?: string;
  frequency?: string;
  taken: boolean;
  taken_at?: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          email: string;
          age: number | null;
          gender: string | null;
          diagnosis: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      chat_messages: {
        Row: ChatMessage;
      };
      symptoms: {
        Row: Symptom;
      };
      medications: {
        Row: Medication;
      };
    };
  };
}
