import React from 'react';

type MonsterProps = {
  monster: {
    name: string;
    type: string;
    size: string;
    cr: number;
    resistances: string[];
    vulnerabilities: string[];
    stats?: { strength: number; dexterity: number; constitution: number };
    lairActions?: string[];
  };
};

export const MonsterCard: React.FC<MonsterProps> = ({ monster }) => {
  if (!monster) return null; // Safeguard against missing monster data

  const {
    name,
    type,
    size,
    cr,
    resistances = [],
    vulnerabilities = [],
    stats,
    lairActions = [],
  } = monster;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{name || 'Unnamed Monster'}</h2>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Size:</strong> {size}</p>
      <p><strong>Challenge Rating:</strong> {cr}</p>
      <p><strong>Resistances:</strong> {resistances.length ? resistances.join(', ') : 'None'}</p>
      <p><strong>Vulnerabilities:</strong> {vulnerabilities.length ? vulnerabilities.join(', ') : 'None'}</p>
      {stats && (
        <div style={{ marginTop: '10px' }}>
          <h3>Stats:</h3>
          <ul>
            <li><strong>Strength:</strong> {stats.strength}</li>
            <li><strong>Dexterity:</strong> {stats.dexterity}</li>
            <li><strong>Constitution:</strong> {stats.constitution}</li>
          </ul>
        </div>
      )}
      {lairActions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Lair Actions:</h3>
          <ul>
            {lairActions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};