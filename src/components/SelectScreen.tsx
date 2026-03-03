import { useState } from 'react';
import type { Monster } from '../types';
import { MONSTER_TYPES } from '../data/monsters';

interface Props {
  onSelect: (monster: Monster) => void;
}

export function SelectScreen({ onSelect }: Props) {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const nameValid = name.trim().length >= 2 && name.trim().length <= 15;
  const canCreate = nameValid && selectedType !== null;

  const handleCreate = () => {
    if (!canCreate) return;
    const base = MONSTER_TYPES.find(m => m.id === selectedType)!;
    // Inject the custom name into the monster
    onSelect({ ...base, name: name.trim() });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters (including accented), spaces limited
    const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]/g, '');
    if (val.length <= 15) setName(val);
  };

  return (
    <div className="nes-container with-title is-centered" style={{ maxWidth: 500, margin: '0 auto' }}>
      <p className="title" style={{ fontSize: '0.9rem' }}>🥚 Crea tu Regenmon</p>

      {/* Name field */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <label style={{ fontSize: '0.7rem', color: '#bbb', display: 'block', marginBottom: '0.4rem' }}>
          Nombre de tu Regenmon
        </label>
        <input
          className="nes-input"
          type="text"
          placeholder="Ej: Pepito, Luna..."
          value={name}
          onChange={handleNameChange}
          maxLength={15}
          style={{
            fontSize: '0.75rem',
            backgroundColor: '#0a1628',
            color: '#e0e0e0',
            borderColor: nameValid ? '#6bcb77' : name.length > 0 ? '#ff6b6b' : '#e0e0e0',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          <span style={{ fontSize: '0.6rem', color: name.length > 0 && !nameValid ? '#ff6b6b' : '#666' }}>
            {name.length > 0 && name.trim().length < 2 ? 'Mínimo 2 letras' :
             name.length === 15 ? 'Máximo 15 letras' : ''}
          </span>
          <span style={{ fontSize: '0.6rem', color: '#555' }}>{name.trim().length}/15</span>
        </div>
      </div>

      {/* Type selector */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <label style={{ fontSize: '0.7rem', color: '#bbb', display: 'block', marginBottom: '0.75rem' }}>
          Elige su tipo
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {MONSTER_TYPES.map((m) => {
            const isSelected = selectedType === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedType(m.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: isSelected ? `${m.color}22` : '#0a1628',
                  border: `2px solid ${isSelected ? m.color : '#334'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = m.color; }}
                onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = '#334'; }}
              >
                <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{m.adultEmoji}</span>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: m.color }}>
                    {m.adultEmoji} {m.name}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#999', marginTop: '0.2rem' }}>
                    {m.description}
                  </div>
                </div>
                {isSelected && (
                  <span style={{ marginLeft: 'auto', color: m.color, fontSize: '0.8rem' }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Eclosionar button */}
      <button
        className={`nes-btn ${canCreate ? 'is-success' : 'is-disabled'}`}
        onClick={handleCreate}
        disabled={!canCreate}
        style={{
          width: '100%',
          fontSize: '0.8rem',
          padding: '0.75rem',
          opacity: canCreate ? 1 : 0.5,
          cursor: canCreate ? 'pointer' : 'not-allowed',
        }}
      >
        {canCreate ? '🥚 ¡Eclosionar!' : !nameValid ? '✏️ Escribe un nombre válido' : '👆 Elige un tipo'}
      </button>
    </div>
  );
}
