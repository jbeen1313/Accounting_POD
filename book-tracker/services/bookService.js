import axios from 'axios';

const OPEN_LIBRARY_URL = 'https://openlibrary.org/isbn/';

export async function fetchBookByIsbn(isbn) {
  const url = `${OPEN_LIBRARY_URL}${isbn}.json`;
  try {
    const { data } = await axios.get(url);
    return {
      title: data.title,
      authors: data.authors ? data.authors.map(a => a.name).join(', ') : 'Unknown',
      publishDate: data.publish_date,
      description: typeof data.description === 'string' ? data.description : data.description?.value,
      isbn,
    };
  } catch (error) {
    console.error('Error fetching book', error);
    throw new Error('Book not found');
  }
}
