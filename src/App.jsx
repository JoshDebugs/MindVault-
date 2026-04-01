import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VaultProvider } from './context/VaultContext';
import Navbar from './components/Navbar';
import ToastContainer from './components/ToastContainer';
import DiscoverPage from './pages/DiscoverPage';
import VaultPage from './pages/VaultPage';

export default function App() {
  return (
    <BrowserRouter>
      <VaultProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<DiscoverPage />} />
          <Route path="/vault" element={<VaultPage />} />
        </Routes>
        <ToastContainer />
      </VaultProvider>
    </BrowserRouter>
  );
}
