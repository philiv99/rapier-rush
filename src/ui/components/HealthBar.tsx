interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
}

export function HealthBar({ current, max, label }: HealthBarProps) {
  const percentage = (current / max) * 100;
  let color = '#A9EAD2'; // mint
  if (percentage <= 30) color = '#FB2B57'; // pop
  else if (percentage <= 60) color = '#FFD700'; // yellow

  return (
    <div style={{ marginBottom: 'var(--spacing-md)' }}>
      {label && <p style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-xs)' }}>{label}</p>}
      <div style={{ backgroundColor: '#ccc', borderRadius: 'var(--border-radius-md)', height: '24px', overflow: 'hidden' }}>
        <div
          style={{
            backgroundColor: color,
            width: `${percentage}%`,
            height: '100%',
            transition: 'width 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          {percentage > 10 && `${current}/${max}`}
        </div>
      </div>
    </div>
  );
}
