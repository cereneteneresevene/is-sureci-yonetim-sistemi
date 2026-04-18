import { useEffect, useState } from 'react';
import { getGorevler, deleteGorev, updateGorev } from '../services/api';
import GorevOlusturModal from '../components/GorevOlusturModal';

const DURUMLAR = [
  { label: 'Bekliyor', emoji: '⏳', renk: '#f59e0b', acik: '#fffbeb', border: '#fde68a', index: 0 },
  { label: 'Devam Ediyor', emoji: '🔄', renk: '#6366f1', acik: '#eef2ff', border: '#c7d2fe', index: 1 },
  { label: 'Tamamlandı', emoji: '✅', renk: '#10b981', acik: '#ecfdf5', border: '#a7f3d0', index: 2 },
];

export default function GorevListesi({ onYeni }) {
  const [gorevler, setGorevler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  const yukle = async () => {
    const res = await getGorevler();
    setGorevler(res.data);
    setYukleniyor(false);
  };

  const [modalAcik, setModalAcik] = useState(false);
  
  useEffect(() => { yukle(); }, []);

  const sil = async (id) => {
    if (!window.confirm('Görevi silmek istiyor musun?')) return;
    await deleteGorev(id);
    yukle();
  };

  const durumDegistir = async (gorev, yeniDurum) => {
    await updateGorev(gorev.id, {
      baslik: gorev.baslik,
      aciklama: gorev.aciklama,
      durum: yeniDurum,
      atananKullaniciId: gorev.atananKullaniciId
    });
    yukle();
  };

  const toplamGorev = gorevler.length;
  const tamamlanan = gorevler.filter(g => g.durum === 2).length;
  const ilerleme = toplamGorev > 0 ? Math.round((tamamlanan / toplamGorev) * 100) : 0;

  if (yukleniyor) return <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>Yükleniyor...</div>;

  return (
    <div>
      {/* Üst Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1e3a8a', marginBottom: 4 }}>Görev Panosu</h2>
          <p style={{ color: '#6b7280', fontSize: 14 }}>{toplamGorev} görev · %{ilerleme} tamamlandı</p>
        </div>
          <button onClick={() => setModalAcik(true)} style={yeniButon}>+ Yeni Görev</button>      </div>

      {/* İlerleme Çubuğu */}
      <div style={{ background: '#e5e7eb', borderRadius: 99, height: 6, marginBottom: 28, overflow: 'hidden' }}>
        <div style={{ width: `${ilerleme}%`, background: 'linear-gradient(90deg, #6366f1, #10b981)', height: '100%', borderRadius: 99, transition: 'width 0.5s ease' }} />
      </div>

      {/* Kanban Kolonları */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {DURUMLAR.map(durum => (
          <div key={durum.index}
            style={{ background: durum.acik, borderRadius: 16, padding: 16, border: `1px solid ${durum.border}`, minHeight: 500 }}
            onDragOver={e => e.preventDefault()}
            onDrop={async e => {
              const id = parseInt(e.dataTransfer.getData('gorevId'));
              const g = gorevler.find(x => x.id === id);
              if (g && g.durum !== durum.index) await durumDegistir(g, durum.index);
            }}>

            {/* Kolon Başlığı */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 8 }}>
              <span style={{ fontSize: 18 }}>{durum.emoji}</span>
              <span style={{ fontWeight: 700, color: durum.renk, fontSize: 15 }}>{durum.label}</span>
              <span style={{ marginLeft: 'auto', background: durum.renk, color: 'white', borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
                {gorevler.filter(g => g.durum === durum.index).length}
              </span>
            </div>

            {/* Görev Kartları */}
            {gorevler.filter(g => g.durum === durum.index).map(g => (
              <div key={g.id}
                draggable
                onDragStart={e => e.dataTransfer.setData('gorevId', g.id)}
                style={kartStil}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#1f2937', flex: 1 }}>{g.baslik}</div>
                  <button onClick={() => sil(g.id)} style={silButon} title="Sil">✕</button>
                </div>

                {g.aciklama && (
                  <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12, lineHeight: 1.5 }}>{g.aciklama}</div>
                )}

                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
                  📅 {new Date(g.olusturmaTarihi).toLocaleDateString('tr-TR')}
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {DURUMLAR.filter(d => d.index !== durum.index).map(d => (
                    <button key={d.index} onClick={() => durumDegistir(g, d.index)}
                      style={{ background: d.renk, color: 'white', border: 'none', padding: '4px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>
                      {d.emoji} {d.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {gorevler.filter(g => g.durum === durum.index).length === 0 && (
              <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, padding: '40px 0' }}>
                Görev yok<br />
                <span style={{ fontSize: 24 }}>📭</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {modalAcik && (
        <GorevOlusturModal
          onKapat={() => setModalAcik(false)}
          onKaydet={() => { setModalAcik(false); yukle(); }}
        />
      )}
    </div>
  );
}

const kartStil = {
  background: 'white',
  borderRadius: 12,
  padding: 14,
  marginBottom: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  cursor: 'grab',
  border: '1px solid #f3f4f6',
  transition: 'transform 0.1s, box-shadow 0.1s',
};

const yeniButon = {
  background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: 10,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 700,
  boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
  whiteSpace: 'nowrap'
};

const silButon = {
  background: 'none',
  border: 'none',
  color: '#d1d5db',
  cursor: 'pointer',
  fontSize: 14,
  padding: '0 4px',
  lineHeight: 1
};