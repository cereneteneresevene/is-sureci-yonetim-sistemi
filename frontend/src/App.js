import { useState } from 'react';
import GorevListesi from './pages/GorevListesi';
import GorevOlustur from './pages/GorevOlustur';

export default function App() {
  const [sayfa, setSayfa] = useState('liste');

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <header style={headerStil}>
        <div style={headerIc}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={logoDaire}>🏢</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>İş Süreci Yönetim</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Görev takip sistemi</div>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {sayfa === 'liste' && <GorevListesi onYeni={() => setSayfa('olustur')} />}
        {sayfa === 'olustur' && <GorevOlustur onGeri={() => setSayfa('liste')} />}
      </main>
    </div>
  );
}

const headerStil = {
  background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
  color: 'white',
  padding: '0 24px',
  height: 64,
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 20px rgba(30,58,138,0.3)',
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const headerIc = {
  maxWidth: 1100,
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoDaire = {
  width: 38,
  height: 38,
  background: 'rgba(255,255,255,0.15)',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18
};

const avatarStil = {
  width: 36,
  height: 36,
  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer'
};