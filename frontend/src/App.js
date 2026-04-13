import { useState } from 'react';
import GorevListesi from './pages/GorevListesi';
import GorevOlustur from './pages/GorevOlustur';

export default function App() {
  const [sayfa, setSayfa] = useState('liste');

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <header style={headerStil}>
        <h1 style={{ margin: 0, fontSize: 20 }}>🏢 İş Süreci Yönetim Sistemi</h1>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        {sayfa === 'liste' && (
          <GorevListesi onYeni={() => setSayfa('olustur')} />
        )}
        {sayfa === 'olustur' && (
          <GorevOlustur onGeri={() => setSayfa('liste')} />
        )}
      </main>
    </div>
  );
}

const headerStil = {
  background: '#1e40af',
  color: 'white',
  padding: '16px 24px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};