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
    onSelect({ ...base, name: name.trim() });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]/g, '');
    if (val.length <= 15) setName(val);
  };

  return (
    <div style={{ maxWidth: 500, margin: '1rem auto', padding: '0 0.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.4rem', filter: 'drop-shadow(0 0 12px #ff6eb4)' }}>
          🥚
        </div>
        <h2 style={{
          fontSize: '0.8rem',
          background: 'linear-gradient(90deg, #ff6eb4, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '2px',
          margin: 0,
        }}>
          CREA TU REGENMON
        </h2>
        <p style={{ fontSize: '0.5rem', color: '#7070aa', marginTop: '0.3rem', letterSpacing: '1px' }}>
          ✦ Elige un nombre y un tipo ✦
        </p>
      </div>

      {/* Name field */}
      <div className="nes-container" style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.6rem', color: '#9090cc', display: 'block', marginBottom: '0.5rem', letterSpacing: '1px' }}>
          ✦ NOMBRE DE TU REGENMON
        </label>
        <input
          className="nes-input"
          type="text"
          placeholder="Ej: Pepito, Luna..."
          value={name}
          onChange={handleNameChange}
          maxLength={15}
          style={{
            borderColor: nameValid ? '#39ff14' : name.length > 0 ? '#ff6eb4' : undefined,
            boxShadow: nameValid ? '0 0 8px #39ff1466' : name.length > 0 ? '0 0 8px #ff6eb466' : undefined,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
          <span style={{ fontSize: '0.55rem', color: name.length > 0 && !nameValid ? '#ff6eb4' : '#404060' }}>
            {name.length > 0 && name.trim().length < 2 ? '⚠ Mínimo 2 letras' :
             name.length === 15 ? '⚠ Máximo 15 letras' : ''}
          </span>
          <span style={{ fontSize: '0.55rem', color: '#404060' }}>{name.trim().length}/15</span>
        </div>
      </div>

      {/* Type selector */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.6rem', color: '#9090cc', marginBottom: '0.5rem', letterSpacing: '1px' }}>
          ✦ ELIGE SU TIPO
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                  padding: '0.65rem 0.75rem',
                  background: isSelected
                    ? `linear-gradient(135deg, ${m.color}22, ${m.color}11)`
                    : 'linear-gradient(135deg, #0d0d2a, #0a0a1e)',
                  border: `2px solid ${isSelected ? m.color : '#2a2a4a'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  width: '100%',
                  boxShadow: isSelected ? `0 0 10px ${m.color}55, inset 0 0 10px ${m.color}11` : 'none',
                }}
              >
                <span style={{
                  fontSize: '2rem',
                  lineHeight: 1,
                  filter: isSelected ? `drop-shadow(0 0 8px ${m.color})` : 'none',
                }}>
                  {m.adultEmoji}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    color: m.color,
                    textShadow: isSelected ? `0 0 8px ${m.color}` : 'none',
                    marginBottom: '0.2rem',
                  }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: '0.55rem', color: '#7070aa', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.3 }}>
                    {m.description}
                  </div>
                </div>
                {isSelected && (
                  <span style={{
                    color: m.color,
                    fontSize: '0.9rem',
                    textShadow: `0 0 10px ${m.color}`,
                    marginLeft: 'auto',
                  }}>
                    ✦
                  </span>
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
          fontSize: '0.75rem',
          padding: '0.75rem',
          letterSpacing: '1px',
        }}
      >
        {canCreate ? '🥚 ¡Eclosionar!' : !nameValid ? '✏️ Escribe un nombre válido' : '👆 Elige un tipo'}
      </button>
    </div>
  );
}
