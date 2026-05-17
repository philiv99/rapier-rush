import { useState, useEffect } from 'react';
import { useGameStore } from '../store';
import { HealthBar } from '../../ui/components/HealthBar';
import { ComboCounter } from '../../ui/components/ComboCounter';
import { MoveButton } from '../../ui/components/MoveButton';
import { StickFencer, type FencerStance } from '../../ui/components/StickFencer';

const MOVE_TYPES = ['ATTACK_HIGH', 'ATTACK_LOW', 'PARRY_HIGH', 'PARRY_LOW'] as const;

type MoveType = typeof MOVE_TYPES[number];

function moveToStance(move: MoveType): FencerStance {
  switch (move) {
    case 'ATTACK_HIGH': return 'attack_high';
    case 'ATTACK_LOW': return 'attack_low';
    case 'PARRY_HIGH': return 'parry_high';
    case 'PARRY_LOW': return 'parry_low';
    default: return 'idle';
  }
}

function opponentMoveToStance(move: string): FencerStance {
  if (move.includes('ATTACK_HIGH')) return 'attack_high';
  if (move.includes('ATTACK_LOW')) return 'attack_low';
  if (move.includes('PARRY_HIGH')) return 'parry_high';
  if (move.includes('PARRY_LOW')) return 'parry_low';
  return 'idle';
}

export function PlayingScene() {
  const { gameState, submitMove } = useGameStore();
  const [messageVisible, setMessageVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [playerStance, setPlayerStance] = useState<FencerStance>('idle');
  const [opponentStance, setOpponentStance] = useState<FencerStance>('idle');

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (gameState.gameOver) return;

      let move: MoveType | null = null;

      switch (e.key.toUpperCase()) {
        case 'ARROWUP':
          move = 'ATTACK_HIGH';
          e.preventDefault();
          break;
        case 'ARROWDOWN':
          move = 'ATTACK_LOW';
          e.preventDefault();
          break;
        case 'Q':
          move = 'PARRY_HIGH';
          e.preventDefault();
          break;
        case 'A':
          move = 'PARRY_LOW';
          e.preventDefault();
          break;
        default:
          return;
      }

      if (move) {
        handleMove(move);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameOver]);

  useEffect(() => {
    if (gameState.currentBoutMoves.player.length > 0) {
      const lastPlayerMove = gameState.currentBoutMoves.player[gameState.currentBoutMoves.player.length - 1];
      setPlayerStance(moveToStance(lastPlayerMove as MoveType));

      const lastOpponentMove = gameState.currentBoutMoves.opponent[gameState.currentBoutMoves.opponent.length - 1];
      setOpponentStance(opponentMoveToStance(lastOpponentMove));

      setMessageVisible(true);
      setTimeout(() => setMessageVisible(false), 1500);
    }
  }, [gameState.currentBoutMoves.player.length]);

  function handleMove(move: MoveType) {
    submitMove(move);
    setPlayerStance(moveToStance(move));

    // Simulate result message
    const chance = Math.random();
    if (chance < 0.3) {
      setResultMessage('Hit!');
    } else if (chance < 0.6) {
      setResultMessage('Parried!');
    } else {
      setResultMessage('Clash!');
    }
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
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Score and Mode */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-ink)', marginBottom: 'var(--spacing-xs)' }}>
            Score: {gameState.playerScore}
          </p>
        </div>

        {/* Visual Arena with Stick Fencers */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-lg)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="100%" height="300" viewBox="0 0 600 280" style={{ maxWidth: '500px' }}>
            {/* Arena background */}
            <rect x="0" y="0" width="600" height="280" fill="var(--color-cream)" opacity={0.3} />
            
            {/* Player fencer */}
            <StickFencer
              x={120}
              y={80}
              stance={playerStance}
              isPlayer={true}
              name="You"
              health={gameState.playerHealth}
              maxHealth={100}
            />

            {/* Opponent fencer */}
            <StickFencer
              x={480}
              y={80}
              stance={opponentStance}
              isPlayer={false}
              name="Duelist"
              health={gameState.opponentHealth}
              maxHealth={100}
            />

            {/* Result message */}
            {messageVisible && resultMessage && (
              <text
                x="300"
                y="40"
                textAnchor="middle"
                fontSize={28}
                fill="var(--color-pop)"
                fontWeight="bold"
                fontFamily="Nunito"
              >
                {resultMessage}
              </text>
            )}
          </svg>
        </div>

        {/* Combo Counter */}
        <ComboCounter combo={gameState.combo} />

        {/* Player Health */}
        <HealthBar current={gameState.playerHealth} max={100} label={`Your Health: ${gameState.playerHealth}/100`} />

        {/* Player Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          <MoveButton
            move="ATTACK_HIGH"
            label="⬆️ Attack High (↑)"
            onClick={() => handleMove('ATTACK_HIGH')}
            disabled={gameState.gameOver}
          />
          <MoveButton
            move="ATTACK_LOW"
            label="⬇️ Attack Low (↓)"
            onClick={() => handleMove('ATTACK_LOW')}
            disabled={gameState.gameOver}
          />
          <MoveButton
            move="PARRY_HIGH"
            label="🛡️ Parry High (Q)"
            onClick={() => handleMove('PARRY_HIGH')}
            disabled={gameState.gameOver}
          />
          <MoveButton
            move="PARRY_LOW"
            label="🛡️ Parry Low (A)"
            onClick={() => handleMove('PARRY_LOW')}
            disabled={gameState.gameOver}
          />
        </div>

        {/* Keyboard Legend */}
        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '0.85rem',
            textAlign: 'center',
            color: 'var(--color-ink)',
          }}
        >
          <p style={{ marginBottom: 'var(--spacing-xs)' }}>⌨️ Keyboard Controls</p>
          <p>↑ Attack High | ↓ Attack Low | Q Parry High | A Parry Low</p>
        </div>

        {/* Game Over Message */}
        {gameState.gameOver && (
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
            <p style={{ color: 'var(--color-pop)', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {gameState.winner === 'PLAYER' ? '🎉 Victory!' : '💀 Defeat'}
            </p>
            <p style={{ fontSize: '1.1rem', marginTop: 'var(--spacing-md)', color: 'var(--color-ink)' }}>
              Final Score: {gameState.playerScore}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
