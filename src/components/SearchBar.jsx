import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className={`search-bar ${focused ? 'search-bar--focused' : ''}`} onSubmit={handleSubmit} id="search-form">
      <div className="search-bar__glow" />
      <div className="search-bar__container">
        <svg className="search-bar__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-bar__input"
          placeholder="Search books, authors, or topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          id="search-input"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            id="search-clear"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
        <button type="submit" className="search-bar__btn" id="search-submit">
          Search
        </button>
      </div>
    </form>
  );
}
