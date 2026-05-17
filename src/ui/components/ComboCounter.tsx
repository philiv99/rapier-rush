interface ComboCounterProps {
  combo: number;
}

export function ComboCounter({ combo }: ComboCounterProps) {
  if (combo <= 0) return null;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-pop)',
        color: 'white',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        borderRadius: 'var(--border-radius-lg)',
        textAlign: 'center',
        fontFamily: 'var(--font-headline)',
        fontSize: '1.5rem',
        boxShadow: 'var(--shadow-lg)',
        animation: combo > 0 ? 'pulse 0.5s ease' : 'none',
      }}
    >
      Combo: {combo}x
    </div>
  );
}
