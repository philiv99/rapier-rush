import type { Move } from '../../types/game';

/**
 * Get opponent move based on difficulty level
 */
export function getOpponentMove(difficulty: number, _history?: Move[]): Move {
  const moves: Move[] = ['ATTACK_HIGH', 'ATTACK_LOW', 'PARRY_HIGH', 'PARRY_LOW'];

  // Higher difficulty = more pattern-based
  if (difficulty >= 4) {
    // At high difficulty, favor alternating attacks
    const pattern = Math.random() < 0.6 ? ['ATTACK_HIGH', 'ATTACK_LOW'] : ['PARRY_HIGH', 'PARRY_LOW'];
    return pattern[Math.floor(Math.random() * pattern.length)] as Move;
  }

  if (difficulty >= 2) {
    // Mid difficulty: 60% attack, 40% defend
    return (Math.random() < 0.6
      ? moves[Math.floor(Math.random() * 2)]
      : moves[2 + Math.floor(Math.random() * 2)]) as Move;
  }

  // Low difficulty: random
  return moves[Math.floor(Math.random() * moves.length)];
}
