import express from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Language detect function
function detectLanguage(text) {
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(text)) return 'hindi';
  
  const hinglishWords = ['kya', 'hai', 'mujhe', 'batao', 'karo', 'hoon', 'aap', 
    'mein', 'ke', 'ki', 'ka', 'se', 'ko', 'nahi', 'tha', 'thi', 'kuch', 
    'bahut', 'accha', 'theek', 'bata', 'mere', 'tumhe', 'yojana', 'scheme',
    'kaise', 'kyun', 'kab', 'kaun', 'kitna', 'wala', 'wali', 'chahiye', 'milega'];
  
  const words = text.toLowerCase().split(/\s+/);
  const hinglishCount = words.filter(w => hinglishWords.includes(w)).length;
  
  if (hinglishCount > 0) return 'hinglish';
  return 'english';
}

router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const lang = detectLanguage(message);
    
    const langInstruction = 
      lang === 'hindi' ? 'Reply in pure Hindi (Devanagari script).' :
      lang === 'hinglish' ? 'Reply in Hinglish (Roman Hindi + English mix).' :
      'Reply in pure English.';

    const conversationHistory = history
      .slice(-6)
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

    const messages = [
      {
        role: 'system',
        content: `You are SchemeSaathi, a helpful Indian Government Scheme Assistant.
        
        LANGUAGE INSTRUCTION: ${langInstruction}
        
        YOUR JOB:
        - Help with Indian government schemes
        - Explain eligibility, documents, application process
        - Answer about PM Awas, Scholarships, Kisan, Health schemes etc.
        
        If asked something unrelated say:
        "I can only help with government schemes! Please ask a scheme related question 😊"
        
        RULES:
        - Max 3-4 lines answer
        - No * bullet points
        - Plain simple text only
        - Use emojis occasionally`
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 200,
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('Chat error:', error.message);
    res.json({ reply: 'Kuch technical issue aa gaya. Please try again! 🔄' });
  }
});

export default router;