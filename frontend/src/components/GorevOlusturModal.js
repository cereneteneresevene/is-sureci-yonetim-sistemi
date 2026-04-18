import { useState } from 'react';
import { createGorev } from '../services/api';

export default function GorevOlusturModal({ onKapat, onKaydet }) {
  const [form, setForm] = useState({ baslik: '', aciklama: '' });
  const [yukleniyor, setYukleniyor] = useState(false);

  const handleSubmit = async () => {
    if (!form.baslik.trim()) return alert('Başlık zorunlu!');
    setYukleniyor(true);
    await createGorev(form);
    setYukleniyor(false);
    onKaydet();
  };

  return (
    <div style={overlay} onClick={onKapat}>
      <div style={modal} onClick={e => e.stopPropagation()}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1e3a8a', margin: 0 }}>➕ Yeni Görev</h2>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>Görevi doldurup kaydet</p>
          </div>
          <button onClick={onKapat} style={kapatButon}>✕</button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={etiket}>Başlık *</label>
          <input
            value={form.baslik}
            onChange={e => setForm({ ...form, baslik: e.target.value })}
            style={input}
            placeholder="Görev başlığını gir..."
            autoFocus
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={etiket}>Açıklama</label>
          <textarea
            value={form.aciklama}
            onChange={e => setForm({ ...form, aciklama: e.target.value })}
            style={{ ...input, height: 100, resize: 'vertical' }}
            placeholder="Görev açıklaması (opsiyonel)..."
          />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onKapat} style={iptalButon}>İptal</button>
          <button onClick={handleSubmit} disabled={yukleniyor} style={kaydetButon}>
            {yukleniyor ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(4px)'
};

const modal = {
  background: 'white',
  borderRadius: 16,
  padding: 28,
  width: '100%',
  maxWidth: 480,
  boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
};

const etiket = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6
};

const input = {
  width: '100%',
  padding: '10px 14px',
  border: '1.5px solid #e5e7eb',
  borderRadius: 10,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit'
};

const kaydetButon = {
  background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
  color: 'white',
  border: 'none',
  padding: '10px 24px',
  borderRadius: 10,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 700,
  boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
};

const iptalButon = {
  background: '#f3f4f6',
  color: '#6b7280',
  border: 'none',
  padding: '10px 20px',
  borderRadius: 10,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600
};

const kapatButon = {
  background: '#f3f4f6',
  border: 'none',
  width: 32,
  height: 32,
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 14,
  color: '#6b7280'
};