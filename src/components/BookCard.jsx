import { useVault } from '../context/VaultContext';
import './BookCard.css';

export default function BookCard({ book, onClick }) {
  const { addToVault, removeFromVault, isInVault } = useVault();
  const saved = isInVault(book.id);

  const handleVaultToggle = (e) => {
    e.stopPropagation();
    if (saved) {
      removeFromVault(book.id);
    } else {
      addToVault(book);
    }
  };

  const placeholderGradient = `linear-gradient(135deg, 
    hsl(${(book.title.charCodeAt(0) * 7) % 360}, 50%, 25%), 
    hsl(${(book.title.charCodeAt(0) * 7 + 60) % 360}, 40%, 15%))`;

  return (
    <article className="book-card" onClick={() => onClick?.(book)} id={`book-${book.id}`}>
      <div className="book-card__cover-wrapper">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={`Cover of ${book.title}`}
            className="book-card__cover"
            loading="lazy"
          />
        ) : (
          <div className="book-card__cover-placeholder" style={{ background: placeholderGradient }}>
            <span className="book-card__cover-letter">{book.title.charAt(0)}</span>
          </div>
        )}
        <div className="book-card__cover-overlay">
          <button
            className={`book-card__vault-btn ${saved ? 'book-card__vault-btn--saved' : ''}`}
            onClick={handleVaultToggle}
            title={saved ? 'Remove from Vault' : 'Save to Vault'}
            id={`vault-btn-${book.id}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
        {book.averageRating > 0 && (
          <div className="book-card__rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            <span>{book.averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="book-card__info">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">
          {book.authors?.slice(0, 2).join(', ')}
        </p>
        {book.categories?.[0] && (
          <span className="book-card__category">{book.categories[0]}</span>
        )}
      </div>
    </article>
  );
}
