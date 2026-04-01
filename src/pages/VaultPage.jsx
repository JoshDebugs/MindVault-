import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import BookCard from '../components/BookCard';
import BookDetail from '../components/BookDetail';
import './VaultPage.css';

export default function VaultPage() {
  const { vault } = useVault();
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  const sortedBooks = [...vault].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.savedAt) - new Date(a.savedAt);
    if (sortBy === 'oldest') return new Date(a.savedAt) - new Date(b.savedAt);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'author') return (a.authors?.[0] || '').localeCompare(b.authors?.[0] || '');
    return 0;
  });

  return (
    <main className="vault" id="vault-page">
      <section className="vault__header">
        <div className="vault__header-bg">
          <div className="vault__header-orb vault__header-orb--1" />
          <div className="vault__header-orb vault__header-orb--2" />
        </div>
        <div className="vault__header-content">
          <p className="vault__label label-sm">Personal Collection</p>
          <h1 className="vault__title display-lg">
            My <span className="vault__title-accent">Vault</span>
          </h1>
          {vault.length > 0 && (
            <p className="vault__count body-lg">
              {vault.length} {vault.length === 1 ? 'book' : 'books'} saved
            </p>
          )}
        </div>
      </section>

      {vault.length > 0 ? (
        <section className="vault__content">
          <div className="vault__toolbar">
            <div className="vault__sort">
              <span className="vault__sort-label label-sm">Sort by</span>
              <div className="vault__sort-options">
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'oldest', label: 'Oldest' },
                  { value: 'title', label: 'Title' },
                  { value: 'author', label: 'Author' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`vault__sort-btn ${sortBy === opt.value ? 'vault__sort-btn--active' : ''}`}
                    onClick={() => setSortBy(opt.value)}
                    id={`sort-${opt.value}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="vault__grid stagger-children" id="vault-grid">
            {sortedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={setSelectedBook}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="vault__empty" id="vault-empty">
          <div className="vault__empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--outline)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h2 className="title-lg">Your Vault is empty</h2>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '400px', textAlign: 'center' }}>
            Start discovering books and save your favorites here. Your collection persists across sessions.
          </p>
          <Link to="/" className="vault__empty-cta" id="discover-cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            Discover Books
          </Link>
        </section>
      )}

      {selectedBook && (
        <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </main>
  );
}
