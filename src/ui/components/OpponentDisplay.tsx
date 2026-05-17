interface OpponentDisplayProps {
  name: string;
  health: number;
  maxHealth: number;
}

export function OpponentDisplay({ name, health, maxHealth }: OpponentDisplayProps) {
  const healthPercent = (health / maxHealth) * 100;

  return (
    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
      <h2 style={{ color: 'var(--color-pop)', marginBottom: 'var(--spacing-sm)' }}>{name}</h2>
      <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>⚔️</div>
      <div style={{ backgroundColor: '#ccc', borderRadius: 'var(--border-radius-md)', height: '16px', overflow: 'hidden', maxWidth: '300px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: healthPercent > 30 ? 'var(--color-mint)' : 'var(--color-pop)',
            width: `${healthPercent}%`,
            height: '100%',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <p style={{ fontSize: '0.9rem', marginTop: 'var(--spacing-xs)' }}>
        {health}/{maxHealth}
      </p>
    </div>
  );
}
