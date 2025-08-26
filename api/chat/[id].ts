import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Заглушка - потом заменим на реальную логику с OpenAI
  res.status(200).json({ 
    message: "Это ответ от AI-ассистента", 
    extractedData: { symptoms: [], medications: [] } 
  });
}
