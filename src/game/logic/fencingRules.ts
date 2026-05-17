import type { Move, ExchangeResult } from '../../types/game';
import { GAME_CONSTANTS } from '../constants';

/**
 * Resolve an exchange between player and opponent moves
 */
export function resolveExchange(playerMove: Move, opponentMove: Move): ExchangeResult {
  if (playerMove === opponentMove) {
    return {
      playerHit: false,
      opponentHit: false,
      message: 'Stalemate! Both defend the same line.',
      playerDamage: 0,
      opponentDamage: 0,
    };
  }

  let playerHit = false;
  let opponentHit = false;

  // Check if player hits opponent
  if (playerMove.startsWith('ATTACK')) {
    const playerLevel = playerMove.includes('HIGH') ? 'HIGH' : 'LOW';
    const opponentDefense = opponentMove.startsWith('PARRY') ? opponentMove.split('_')[1] : null;

    if (!opponentMove.startsWith('PARRY') || opponentDefense !== playerLevel) {
      playerHit = true;
    }
  }

  // Check if opponent hits player
  if (opponentMove.startsWith('ATTACK')) {
    const opponentLevel = opponentMove.includes('HIGH') ? 'HIGH' : 'LOW';
    const playerDefense = playerMove.startsWith('PARRY') ? playerMove.split('_')[1] : null;

    if (!playerMove.startsWith('PARRY') || playerDefense !== opponentLevel) {
      opponentHit = true;
    }
  }

  const playerDamage = playerHit ? GAME_CONSTANTS.DAMAGE_PER_HIT : 0;
  const opponentDamage = opponentHit ? GAME_CONSTANTS.DAMAGE_PER_HIT : 0;

  let message = '';
  if (playerHit && opponentHit) {
    message = 'Both strike! Both take damage!';
  } else if (playerHit) {
    message = 'You hit your opponent!';
  } else if (opponentHit) {
    message = 'Your opponent hits you!';
  } else {
    message = 'Excellent defense!';
  }

  return {
    playerHit,
    opponentHit,
    message,
    playerDamage,
    opponentDamage,
  };
}

/**
 * Validate that a move is legal
 */
export function validateMove(move: string): boolean {
  const validMoves = ['ATTACK_HIGH', 'ATTACK_LOW', 'PARRY_HIGH', 'PARRY_LOW'];
  return validMoves.includes(move);
}

/**
 * Calculate score for a turn based on combo
 */
export function calculateScore(combo: number): number {
  return GAME_CONSTANTS.BASE_SCORE * Math.max(1, combo);
}

/**
 * Get initial bout state
 */
export function resetBout() {
  return {
    playerHealth: GAME_CONSTANTS.HEALTH_MAX,
    opponentHealth: GAME_CONSTANTS.HEALTH_MAX,
    playerScore: 0,
    combo: 0,
    exchanges: [],
  };
}
