import { useVault } from '../context/VaultContext';
import './BookDetail.css';

export default function BookDetail({ book, onClose }) {
  const { addToVault, removeFromVault, isInVault } = useVault();

  if (!book) return null;

  const saved = isInVault(book.id);

  const handleVaultToggle = () => {
    if (saved) {
      removeFromVault(book.id);
    } else {
      addToVault(book);
    }
  };

  const cleanDescription = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const placeholderGradient = `linear-gradient(135deg, 
    hsl(${(book.title.charCodeAt(0) * 7) % 360}, 50%, 25%), 
    hsl(${(book.title.charCodeAt(0) * 7 + 60) % 360}, 40%, 15%))`;

  return (
    <div className="book-detail__backdrop" onClick={onClose} id="book-detail-backdrop">
      <div className="book-detail" onClick={(e) => e.stopPropagation()} id="book-detail-modal">
        <button className="book-detail__close" onClick={onClose} id="book-detail-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="book-detail__layout">
          <div className="book-detail__cover-section">
            <div className="book-detail__cover-wrapper">
              {book.thumbnail ? (
                <img src={book.thumbnail} alt={book.title} className="book-detail__cover" />
              ) : (
                <div className="book-detail__cover-placeholder" style={{ background: placeholderGradient }}>
                  <span>{book.title.charAt(0)}</span>
                </div>
              )}
            </div>

            <div className="book-detail__actions">
              <button 
                className={`book-detail__vault-btn ${saved ? 'book-detail__vault-btn--saved' : ''}`}
                onClick={handleVaultToggle}
                id="detail-vault-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                {saved ? 'In Your Vault' : 'Save to Vault'}
              </button>
              {book.previewLink && (
                <a
                  href={book.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-detail__preview-btn"
                  id="detail-preview-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Preview on Google
                </a>
              )}
            </div>
          </div>

          <div className="book-detail__content">
            <div className="book-detail__header">
              {book.categories?.[0] && (
                <span className="book-detail__category">{book.categories[0]}</span>
              )}
              <h2 className="book-detail__title">{book.title}</h2>
              {book.subtitle && (
                <p className="book-detail__subtitle">{book.subtitle}</p>
              )}
              <p className="book-detail__authors">
                by {book.authors?.join(', ')}
              </p>
            </div>

            <div className="book-detail__meta">
              {book.averageRating > 0 && (
                <div className="book-detail__meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  <span className="book-detail__meta-value">{book.averageRating.toFixed(1)}</span>
                  <span className="book-detail__meta-label">({book.ratingsCount} ratings)</span>
                </div>
              )}
              {book.pageCount > 0 && (
                <div className="book-detail__meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                  <span className="book-detail__meta-value">{book.pageCount}</span>
                  <span className="book-detail__meta-label">pages</span>
                </div>
              )}
              {book.publishedDate && (
                <div className="book-detail__meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span className="book-detail__meta-value">{book.publishedDate}</span>
                </div>
              )}
              {book.publisher && (
                <div className="book-detail__meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-4"/>
                    <path d="M9 9v.01"/>
                    <path d="M9 12v.01"/>
                    <path d="M9 15v.01"/>
                    <path d="M9 18v.01"/>
                  </svg>
                  <span className="book-detail__meta-value">{book.publisher}</span>
                </div>
              )}
            </div>

            {book.description && (
              <div className="book-detail__description">
                <h3 className="book-detail__section-title">About this book</h3>
                <p>{cleanDescription(book.description)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
