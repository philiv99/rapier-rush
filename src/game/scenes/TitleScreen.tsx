import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store';
import { useAuth } from '../../auth/AuthContext';

export function TitleScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { startBout } = useGameStore();

  function handlePlay() {
    startBout('CLASSIC', 1);
    navigate('/play');
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--color-cream)',
        padding: 'var(--spacing-xxl)',
      }}
    >
      <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '4rem', color: 'var(--color-pop)', marginBottom: 'var(--spacing-lg)' }}>
        Rapier Rush
      </h1>

      <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-xxl)', color: 'var(--color-ink)' }}>
        Turn-based fencing combat
      </p>

      {user && (
        <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-ink)' }}>
          Welcome, <strong>{user.displayName}</strong>!
        </p>
      )}

      <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={handlePlay} style={{ minWidth: '150px' }}>
          Play
        </button>
        <button onClick={() => navigate('/how-to-play')} className="secondary" style={{ minWidth: '150px' }}>
          How to Play
        </button>
        <button onClick={handleLogout} className="secondary" style={{ minWidth: '150px' }}>
          Logout
        </button>
      </div>
    </div>
  );
}
