import express from 'express';
import axios from 'axios';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Search from '../models/Search.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schemes = JSON.parse(
  readFileSync(join(__dirname, '../data/schemes.json'), 'utf-8')
);

function filterSchemes(userDetails) {
  const { age, income, gender, category, occupation } = userDetails;

  return schemes.filter(scheme => {
    const e = scheme.eligibility;
    const ageOk = Number(age) >= e.minAge && Number(age) <= e.maxAge;
    const incomeOk = Number(income) <= e.maxIncome;
    const genderOk = e.gender === 'any' || e.gender === gender;
    const categoryOk = e.categories.includes(category);
    const occupationOk = e.occupations.includes(occupation);
    return ageOk && incomeOk && genderOk && categoryOk && occupationOk;
  });
}

// Find schemes
router.post('/find', async (req, res) => {
  try {
    const userDetails = req.body;
    const { age, income, gender, category, state, occupation } = userDetails;

    const eligibleSchemes = filterSchemes(userDetails);

    if (eligibleSchemes.length === 0) {
      // Save to MongoDB even if no schemes found
      await Search.create({
        age, income, gender, category, state, occupation,
        schemesFound: 0,
        schemeNames: []
      });

      return res.json({
        schemes: [],
        aiSummary: "No schemes found matching your criteria. Try adjusting your details."
      });
    }

    // Save to MongoDB
    await Search.create({
      age, income, gender, category, state, occupation,
      schemesFound: eligibleSchemes.length,
      schemeNames: eligibleSchemes.map(s => s.name)
    });

    // Gemini AI summary with fallback
    let aiSummary = `You are eligible for ${eligibleSchemes.length} government scheme(s). Review them below and apply at the earliest!`;

    try {
      const schemeNames = eligibleSchemes.map(s => s.name).join(', ');
      const prompt = `
        A person has these details:
        - Age: ${age}, Income: ₹${income}, Gender: ${gender}, Category: ${category}, State: ${state}, Occupation: ${occupation}
        They are eligible for: ${schemeNames}
        Write a short friendly 2-3 line summary. No bullet points, just plain text.
      `;

      const geminiRes = await axios.post(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
      );
      aiSummary = geminiRes.data.candidates[0].content.parts[0].text;
    } catch (aiError) {
      console.log('Gemini unavailable, using default summary');
    }

    res.json({ schemes: eligibleSchemes, aiSummary });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// Get search history
router.get('/history', async (req, res) => {
  try {
    const history = await Search.find().sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

// Get all schemes
router.get('/all', (req, res) => {
  res.json(schemes);
});

export default router;