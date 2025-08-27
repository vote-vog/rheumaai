import { VercelRequest, VercelResponse } from '@vercel/node';
import { createSupabaseServerClient } from '../lib/supabaseServerClient';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Системный промпт для медицинского ассистента
const SYSTEM_PROMPT = `Ты - медицинский ассистент RheumaAI для пациентов с ревматоидным артритом. 
Твоя задача: анализировать сообщения пользователей и извлекать структурированную информацию.

Извлекай следующие сущности:
1. СИМПТОМЫ - боль, скованность, усталость (с указанием локализации и интенсивности 0-10)
2. ЛЕКАРСТВА - названия препаратов, дозировки, факт приема
3. ТРИГГЕРЫ - что вызвало ухудшение
4. ОБЛЕГЧЕНИЕ - что помогло улучшить состояние

Отвечай в двух форматах:
- Естественный ответ пользователю
- Структурированные данные в формате JSON для сохранения в базу`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Проверка аутентификации
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { message, userId } = req.body;
    
    if (!message || !userId) {
      return res.status(400).json({ error: 'Missing message or userId' });
    }

    // Отправка запроса к OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const parsedData = JSON.parse(aiResponse || '{}');

    // Сохранение в базу данных
    const supabase = createSupabaseServerClient();
    
    // Сохраняем сообщение пользователя
    const { error: messageError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        message: message,
        role: 'user',
        metadata: parsedData
      });

    if (messageError) {
      console.error('Error saving message:', messageError);
    }

    // Сохраняем извлеченные симптомы
    if (parsedData.symptoms && parsedData.symptoms.length > 0) {
      const symptomsData = parsedData.symptoms.map((symptom: any) => ({
        user_id: userId,
        description: symptom.description,
        intensity: symptom.intensity,
        location: symptom.location,
        triggered_at: new Date().toISOString()
      }));

      const { error: symptomsError } = await supabase
        .from('symptoms')
        .insert(symptomsData);

      if (symptomsError) {
        console.error('Error saving symptoms:', symptomsError);
      }
    }

    // Сохраняем информацию о лекарствах
    if (parsedData.medications && parsedData.medications.length > 0) {
      const medicationsData = parsedData.medications.map((med: any) => ({
        user_id: userId,
        name: med.name,
        dosage: med.dosage,
        taken_at: new Date().toISOString()
      }));

      const { error: medsError } = await supabase
        .from('medications')
        .insert(medicationsData);

      if (medsError) {
        console.error('Error saving medications:', medsError);
      }
    }

    res.status(200).json({ 
      message: aiResponse,
      extractedData: parsedData 
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
