const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export async function searchBooks(query, startIndex = 0, maxResults = 20) {
  if (!query || !query.trim()) return { items: [], totalItems: 0 };

  const params = new URLSearchParams({
    q: query.trim(),
    startIndex: startIndex.toString(),
    maxResults: maxResults.toString(),
    printType: 'books',
    orderBy: 'relevance',
  });

  const response = await fetch(`${GOOGLE_BOOKS_API}?${params}`);

  if (!response.ok) {
    throw new Error(`Google Books API error: ${response.status}`);
  }

  const data = await response.json();

  const items = (data.items || []).map(item => ({
    id: item.id,
    title: item.volumeInfo?.title || 'Untitled',
    authors: item.volumeInfo?.authors || ['Unknown Author'],
    description: item.volumeInfo?.description || '',
    thumbnail: item.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    cover: item.volumeInfo?.imageLinks?.smallThumbnail?.replace('http:', 'https:') || null,
    publishedDate: item.volumeInfo?.publishedDate || '',
    publisher: item.volumeInfo?.publisher || '',
    pageCount: item.volumeInfo?.pageCount || 0,
    categories: item.volumeInfo?.categories || [],
    averageRating: item.volumeInfo?.averageRating || 0,
    ratingsCount: item.volumeInfo?.ratingsCount || 0,
    language: item.volumeInfo?.language || 'en',
    previewLink: item.volumeInfo?.previewLink || '',
    infoLink: item.volumeInfo?.infoLink || '',
    isbn: item.volumeInfo?.industryIdentifiers?.[0]?.identifier || '',
  }));

  return {
    items,
    totalItems: data.totalItems || 0,
  };
}

export async function getBookById(bookId) {
  const response = await fetch(`${GOOGLE_BOOKS_API}/${bookId}`);

  if (!response.ok) {
    throw new Error(`Google Books API error: ${response.status}`);
  }

  const item = await response.json();

  return {
    id: item.id,
    title: item.volumeInfo?.title || 'Untitled',
    subtitle: item.volumeInfo?.subtitle || '',
    authors: item.volumeInfo?.authors || ['Unknown Author'],
    description: item.volumeInfo?.description || '',
    thumbnail: item.volumeInfo?.imageLinks?.medium?.replace('http:', 'https:') 
      || item.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    cover: item.volumeInfo?.imageLinks?.smallThumbnail?.replace('http:', 'https:') || null,
    publishedDate: item.volumeInfo?.publishedDate || '',
    publisher: item.volumeInfo?.publisher || '',
    pageCount: item.volumeInfo?.pageCount || 0,
    categories: item.volumeInfo?.categories || [],
    averageRating: item.volumeInfo?.averageRating || 0,
    ratingsCount: item.volumeInfo?.ratingsCount || 0,
    language: item.volumeInfo?.language || 'en',
    previewLink: item.volumeInfo?.previewLink || '',
    infoLink: item.volumeInfo?.infoLink || '',
    isbn: item.volumeInfo?.industryIdentifiers?.[0]?.identifier || '',
    maturityRating: item.volumeInfo?.maturityRating || '',
  };
}
