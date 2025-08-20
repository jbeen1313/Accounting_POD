import axios from 'axios';
import { generateQuiz } from '../services/quizService';

jest.mock('axios');
jest.mock('@env');

describe('generateQuiz', () => {
  afterEach(() => jest.resetAllMocks());

  it('parses questions from API', async () => {
    axios.post.mockResolvedValue({
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                questions: [{ question: 'Q1', options: ['a','b','c','d'], answer: 0 }],
              }),
            },
          },
        ],
      },
    });

    const questions = await generateQuiz('summary');
    expect(questions).toHaveLength(1);
    expect(questions[0].question).toBe('Q1');
  });

  it('throws on invalid JSON', async () => {
    axios.post.mockResolvedValue({
      data: {
        choices: [{ message: { content: 'not json' } }],
      },
    });

    await expect(generateQuiz('summary')).rejects.toThrow('Invalid quiz format');
  });
});
