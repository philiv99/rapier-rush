import { useNavigate } from 'react-router-dom';

export function HowToPlayScreen() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-cream)',
        padding: 'var(--spacing-xxl)',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        <h1 style={{ color: 'var(--color-pop)', marginBottom: 'var(--spacing-lg)' }}>How to Play</h1>

        <h2 style={{ marginTop: 'var(--spacing-lg)' }}>Moves</h2>
        <ul style={{ marginLeft: 'var(--spacing-lg)', lineHeight: '1.8' }}>
          <li>
            <strong>Attack High</strong> - Strike opponent's upper body
          </li>
          <li>
            <strong>Attack Low</strong> - Strike opponent's legs
          </li>
          <li>
            <strong>Parry High</strong> - Defend upper body
          </li>
          <li>
            <strong>Parry Low</strong> - Defend lower body
          </li>
        </ul>

        <h2 style={{ marginTop: 'var(--spacing-lg)' }}>Rules</h2>
        <ul style={{ marginLeft: 'var(--spacing-lg)', lineHeight: '1.8' }}>
          <li>Hit: Deal damage when opponent doesn't parry your attack level</li>
          <li>Parry: Negate damage when matching opponent's attack level</li>
          <li>Stalemate: No damage when both players use same move</li>
          <li>Combo: Successful hits build combo for score multiplier</li>
          <li>Health: Start at 100, reach 0 to lose</li>
        </ul>

        <button onClick={() => navigate('/')} style={{ marginTop: 'var(--spacing-xl)', width: '100%' }}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}
