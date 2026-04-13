import { useEffect, useState } from 'react';
import { getGorevler, deleteGorev } from '../services/api';

const durumlar = ['Bekliyor', 'Devam Ediyor', 'Tamamlandı'];
const durumRenk = ['#f59e0b', '#3b82f6', '#22c55e'];

export default function GorevListesi({ onYeni }) {
  const [gorevler, setGorevler] = useState([]);

  const yukle = async () => {
    const res = await getGorevler();
    setGorevler(res.data);
  };

  useEffect(() => { yukle(); }, []);

  const sil = async (id) => {
    await deleteGorev(id);
    yukle();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📋 Görevler</h2>
        <button onClick={onYeni} style={butonStil}>+ Yeni Görev</button>
      </div>

      {gorevler.length === 0 && <p>Henüz görev yok.</p>}

      {gorevler.map(g => (
        <div key={g.id} style={kartStil}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{g.baslik}</h3>
            <span style={{
              background: durumRenk[g.durum],
              color: 'white',
              padding: '2px 10px',
              borderRadius: 12,
              fontSize: 13
            }}>
              {durumlar[g.durum]}
            </span>
          </div>
          <p style={{ color: '#666', margin: '8px 0' }}>{g.aciklama}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#999' }}>
            <span>👤 {g.atananKullaniciAd || 'Atanmadı'}</span>
            <span>📅 {new Date(g.olusturmaTarihi).toLocaleDateString('tr-TR')}</span>
          </div>
          <button onClick={() => sil(g.id)} style={silButonStil}>Sil</button>
        </div>
      ))}
    </div>
  );
}

const kartStil = {
  background: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  padding: 16,
  marginBottom: 12,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const butonStil = {
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};

const silButonStil = {
  marginTop: 8,
  background: '#ef4444',
  color: 'white',
  border: 'none',
  padding: '4px 12px',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 13
};