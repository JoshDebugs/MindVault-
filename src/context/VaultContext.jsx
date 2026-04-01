import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const VaultContext = createContext();

export function VaultProvider({ children }) {
  const [vault, setVault] = useState(() => {
    try {
      const stored = localStorage.getItem('booksvault');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('booksvault', JSON.stringify(vault));
  }, [vault]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const addToVault = useCallback((book) => {
    setVault(prev => {
      const exists = prev.some(b => b.id === book.id);
      if (exists) {
        addToast('Already in your Vault', 'info');
        return prev;
      }
      addToast(`"${book.title}" saved to Vault`, 'success');
      return [...prev, { ...book, savedAt: new Date().toISOString() }];
    });
  }, [addToast]);

  const removeFromVault = useCallback((bookId) => {
    setVault(prev => {
      const book = prev.find(b => b.id === bookId);
      if (book) {
        addToast(`"${book.title}" removed from Vault`, 'info');
      }
      return prev.filter(b => b.id !== bookId);
    });
  }, [addToast]);

  const isInVault = useCallback((bookId) => {
    return vault.some(b => b.id === bookId);
  }, [vault]);

  return (
    <VaultContext.Provider value={{ vault, addToVault, removeFromVault, isInVault, toasts }}>
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
}
