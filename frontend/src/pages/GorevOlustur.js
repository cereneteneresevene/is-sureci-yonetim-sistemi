import { useState } from 'react';
import { createGorev } from '../services/api';

export default function GorevOlustur({ onGeri }) {
  const [form, setForm] = useState({ baslik: '', aciklama: '' });
  const [yukleniyor, setYukleniyor] = useState(false);

  const handleSubmit = async () => {
    if (!form.baslik) return alert('Başlık zorunlu!');
    setYukleniyor(true);
    await createGorev(form);
    setYukleniyor(false);
    onGeri();
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>➕ Yeni Görev Oluştur</h2>

      <div style={alanStil}>
        <label>Başlık *</label>
        <input
          value={form.baslik}
          onChange={e => setForm({ ...form, baslik: e.target.value })}
          style={inputStil}
          placeholder="Görev başlığı"
        />
      </div>

      <div style={alanStil}>
        <label>Açıklama</label>
        <textarea
          value={form.aciklama}
          onChange={e => setForm({ ...form, aciklama: e.target.value })}
          style={{ ...inputStil, height: 100, resize: 'vertical' }}
          placeholder="Görev açıklaması"
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={handleSubmit} style={kaydetButon} disabled={yukleniyor}>
          {yukleniyor ? 'Kaydediliyor...' : '💾 Kaydet'}
        </button>
        <button onClick={onGeri} style={geriButon}>
          ← Geri
        </button>
      </div>
    </div>
  );
}

const alanStil = { marginBottom: 16 };

const inputStil = {
  display: 'block',
  width: '100%',
  marginTop: 4,
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 6,
  fontSize: 14,
  boxSizing: 'border-box'
};

const kaydetButon = {
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '8px 20px',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};

const geriButon = {
  background: '#6b7280',
  color: 'white',
  border: 'none',
  padding: '8px 20px',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};