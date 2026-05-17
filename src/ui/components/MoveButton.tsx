interface MoveButtonProps {
  move: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function MoveButton({ move, label, onClick, disabled }: MoveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: 'var(--spacing-lg)',
        fontSize: '1rem',
        fontWeight: '600',
        flex: 1,
      }}
      title={move}
    >
      {label}
    </button>
  );
}
