import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

// This function calls OpenAI API to generate quiz questions.
// Set OPENAI_API_KEY in your environment before running the app.

export async function generateQuiz(summary) {
  const prompt = `Create 5 multiple-choice questions suitable for a 7-year-old based on this book summary:\n${summary}\nReturn the result as JSON with the following format: {"questions": [{"question": string, "options": [string, string, string, string], "answer": number}]}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You create quizzes for children.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const content = response.data.choices[0].message.content;
    try {
      const parsed = JSON.parse(content);
      if (!parsed.questions) {
        throw new Error('Invalid quiz format');
      }
      return parsed.questions;
    } catch (e) {
      console.error('Invalid quiz format', e);
      throw new Error('Invalid quiz format');
    }
  } catch (error) {
    if (error.message === 'Invalid quiz format') {
      throw error;
    }
    console.error('Quiz generation failed', error);
    throw new Error('Unable to generate quiz');
  }
}
