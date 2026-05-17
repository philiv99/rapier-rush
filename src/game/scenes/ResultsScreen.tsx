import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store';
import '../../../src/theme/global.css';

export function ResultsScreen() {
  const navigate = useNavigate();
  const { gameState } = useGameStore();

  const handlePlayAgain = () => {
    navigate('/play');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bout Over!</h1>
      
      <div style={styles.scoreSection}>
        <h2>Final Score: {gameState.playerScore}</h2>
        <p>Opponent Health: {gameState.opponentHealth}</p>
        <p>Your Health: {gameState.playerHealth}</p>
        <p>Winner: {gameState.winner === 'PLAYER' ? 'You won!' : 'Opponent won!'}</p>
      </div>

      <button onClick={handlePlayAgain} style={styles.button}>
        Play Again
      </button>

      <button onClick={() => navigate('/')} style={styles.secondaryButton}>
        Return to Title
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: 'var(--ld-cream)',
    minHeight: '100vh',
    fontFamily: 'Nunito, sans-serif',
  },
  title: {
    fontSize: '48px',
    fontFamily: 'Bungee, sans-serif',
    color: 'var(--ld-ink)',
    marginBottom: '30px',
  },
  scoreSection: {
    backgroundColor: 'var(--ld-mint)',
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '30px',
    textAlign: 'center' as const,
    color: 'var(--ld-ink)',
  },
  button: {
    padding: '12px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: 'var(--ld-pop)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  secondaryButton: {
    padding: '12px 30px',
    fontSize: '18px',
    backgroundColor: 'var(--ld-paper)',
    color: 'var(--ld-ink)',
    border: '2px solid var(--ld-ink)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
