import { useState } from 'react';
import { useGameStore } from '../store';
import { HealthBar } from '../../ui/components/HealthBar';
import { ComboCounter } from '../../ui/components/ComboCounter';
import { MoveButton } from '../../ui/components/MoveButton';
import { OpponentDisplay } from '../../ui/components/OpponentDisplay';

export function PlayingScene() {
  const { gameState, submitMove } = useGameStore();
  const [_messageVisible, setMessageVisible] = useState(false);

  function handleMove(move: string) {
    submitMove(move);
    setMessageVisible(true);
    setTimeout(() => setMessageVisible(false), 2000);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-cream)',
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1 }}>
        {/* Opponent Display */}
        <OpponentDisplay name="Duelist" health={gameState.opponentHealth} maxHealth={100} />

        {/* Player Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          <MoveButton move="ATTACK_HIGH" label="⬆️ Attack High" onClick={() => handleMove('ATTACK_HIGH')} disabled={gameState.gameOver} />
          <MoveButton move="ATTACK_LOW" label="⬇️ Attack Low" onClick={() => handleMove('ATTACK_LOW')} disabled={gameState.gameOver} />
          <MoveButton move="PARRY_HIGH" label="🛡️ Parry High" onClick={() => handleMove('PARRY_HIGH')} disabled={gameState.gameOver} />
          <MoveButton move="PARRY_LOW" label="🛡️ Parry Low" onClick={() => handleMove('PARRY_LOW')} disabled={gameState.gameOver} />
        </div>

        {/* Combo Counter */}
        <ComboCounter combo={gameState.combo} />

        {/* Player Health */}
        <HealthBar current={gameState.playerHealth} max={100} label={`Your Health: ${gameState.playerHealth}/100`} />

        {/* Score */}
        <p style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-ink)' }}>
          Score: {gameState.playerScore}
        </p>

        {/* Game Over Message */}
        {gameState.gameOver && (
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
            <p style={{ color: 'var(--color-pop)', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {gameState.winner === 'PLAYER' ? '🎉 Victory!' : '💀 Defeat'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
