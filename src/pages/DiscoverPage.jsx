import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookDetail from '../components/BookDetail';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { searchBooks } from '../services/googleBooks';
import './DiscoverPage.css';

const TRENDING_SEARCHES = [
  'Atomic Habits',
  'Dune',
  'The Great Gatsby',
  'Sapiens',
  'Project Hail Mary',
  'The Midnight Library',
];

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const currentQuery = searchParams.get('q') || '';

  const handleSearch = useCallback(async (query) => {
    setSearchParams({ q: query });
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await searchBooks(query);
      setBooks(result.items);
      setTotalItems(result.totalItems);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setSearchParams]);

  // Trigger search from URL params on mount
  useEffect(() => {
    if (currentQuery) {
      handleSearch(currentQuery);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadMore = async () => {
    if (!currentQuery) return;
    setLoading(true);
    try {
      const result = await searchBooks(currentQuery, books.length);
      setBooks(prev => [...prev, ...result.items]);
    } catch (err) {
      setError('Failed to load more books.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="discover" id="discover-page">
      {/* Hero Section */}
      <section className="discover__hero">
        <div className="discover__hero-bg">
          <div className="discover__hero-orb discover__hero-orb--1" />
          <div className="discover__hero-orb discover__hero-orb--2" />
          <div className="discover__hero-orb discover__hero-orb--3" />
        </div>
        <div className="discover__hero-content">
          <p className="discover__hero-label label-sm">Your Digital Book Sanctuary</p>
          <h1 className="discover__hero-title display-lg">
            Discover your next<br />
            <span className="discover__hero-accent">favorite book</span>
          </h1>
          <p className="discover__hero-subtitle body-lg">
            Search millions of books. Save the ones that matter to your personal Vault.
          </p>
          <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />

          {!hasSearched && (
            <div className="discover__trending">
              <span className="discover__trending-label label-sm">Trending</span>
              <div className="discover__trending-tags">
                {TRENDING_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    className="discover__trending-tag"
                    onClick={() => handleSearch(tag)}
                    id={`trending-${tag.replace(/\s/g, '-').toLowerCase()}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="discover__results" id="search-results">
          {!loading && books.length > 0 && (
            <div className="discover__results-header">
              <h2 className="title-lg">
                Results for "<span className="discover__query-text">{currentQuery}</span>"
              </h2>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                {totalItems.toLocaleString()} books found
              </p>
            </div>
          )}

          {error && (
            <div className="discover__error" id="search-error">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <p>{error}</p>
            </div>
          )}

          {loading && books.length === 0 ? (
            <LoadingSkeleton count={8} />
          ) : (
            <>
              <div className="discover__grid stagger-children" id="books-grid">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={setSelectedBook}
                  />
                ))}
              </div>

              {!loading && books.length === 0 && !error && (
                <div className="discover__empty" id="no-results">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--on-surface-variant)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                    <path d="M8 11h6"/>
                  </svg>
                  <h3 className="title-md">No books found</h3>
                  <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                    Try adjusting your search terms
                  </p>
                </div>
              )}

              {books.length > 0 && books.length < totalItems && (
                <div className="discover__load-more">
                  <button
                    className="discover__load-more-btn"
                    onClick={handleLoadMore}
                    disabled={loading}
                    id="load-more-btn"
                  >
                    {loading ? (
                      <span className="discover__spinner" />
                    ) : (
                      'Load More Books'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </main>
  );
}
