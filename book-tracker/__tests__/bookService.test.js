import axios from 'axios';
import { fetchBookByIsbn } from '../services/bookService';

jest.mock('axios');

describe('fetchBookByIsbn', () => {
  afterEach(() => jest.resetAllMocks());

  it('returns book data on success', async () => {
    axios.get.mockResolvedValue({
      data: {
        title: 'Test Book',
        authors: [{ name: 'Author' }],
        publish_date: '2020',
        description: 'A book',
      },
    });

    const book = await fetchBookByIsbn('123');
    expect(book.title).toBe('Test Book');
    expect(book.authors).toBe('Author');
  });

  it('throws error when request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network'));
    await expect(fetchBookByIsbn('123')).rejects.toThrow('Book not found');
  });
});
