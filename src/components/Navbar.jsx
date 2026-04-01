import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import './Navbar.css';

export default function Navbar() {
  const { vault } = useVault();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" id="nav-logo">
          <div className="navbar__logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="4" width="8" height="20" rx="2" fill="url(#grad1)" opacity="0.9"/>
              <rect x="11" y="2" width="8" height="24" rx="2" fill="url(#grad2)"/>
              <rect x="20" y="6" width="6" height="16" rx="2" fill="url(#grad3)" opacity="0.7"/>
              <defs>
                <linearGradient id="grad1" x1="2" y1="4" x2="10" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3bbffa"/>
                  <stop offset="1" stopColor="#22b1ec"/>
                </linearGradient>
                <linearGradient id="grad2" x1="11" y1="2" x2="19" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9093ff"/>
                  <stop offset="1" stopColor="#6063ee"/>
                </linearGradient>
                <linearGradient id="grad3" x1="20" y1="6" x2="26" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff86c3"/>
                  <stop offset="1" stopColor="#f271b5"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="navbar__brand-text">
            Books<span className="navbar__brand-accent">Vault</span>
          </span>
        </Link>

        <div className="navbar__links">
          <Link
            to="/"
            className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
            id="nav-discover"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            Discover
          </Link>
          <Link
            to="/vault"
            className={`navbar__link ${location.pathname === '/vault' ? 'navbar__link--active' : ''}`}
            id="nav-vault"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            My Vault
            {vault.length > 0 && (
              <span className="navbar__badge">{vault.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
