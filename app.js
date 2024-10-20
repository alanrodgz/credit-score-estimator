import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.static('public'));

// OpenAI API 호출하는 엔드포인트
app.post('/api/credit-check', async (req, res) => {
    const { userInput } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system', content: `
                        You are a credit evaluation assistant. You only respond to questions related to credit assessments.
                        Use the following criteria to evaluate creditworthiness:
                        1. Payment history: If payments are on time for the last 12 months, increase the credit score.
                        2. Debt ratio: If the debt ratio is below 30%, increase the credit score.
                        3. Credit history length: Longer than 5 years increases the credit score.
                        4. New credit inquiries: More than 2 new inquiries in the last 6 months decreases the credit score.
                        Only respond with a creditworthiness score and short explanation.
                        `
                    },
                    { role: 'user', content: userInput }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();
        res.json({ result: data.choices[0].message.content });  // 결과를 클라이언트로 반환
    } catch (error) {
        console.error('Error fetching data from OpenAI API:', error);
        res.status(500).json({ error: 'Failed to fetch data from OpenAI API' });
    }
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});