export type Move = 'ATTACK_HIGH' | 'ATTACK_LOW' | 'PARRY_HIGH' | 'PARRY_LOW';
export type Scene = 'BOOT' | 'TITLE' | 'HOW_TO_PLAY' | 'PLAYING' | 'RESULTS' | 'GAME_OVER';
export type AttackType = 'directSlash' | 'sweepKick' | 'overheadChop' | 'doubleSlash' | 'dodge' | 'block';

export interface Player {
  id: string;
  health: number;
  maxHealth: number;
  position: { x: number; y: number };
  direction: 'left' | 'right';
  isAttacking: boolean;
  comboCount: number;
  lastAttackTime: number;
}

export interface ExchangeResult {
  playerHit: boolean;
  opponentHit: boolean;
  message: string;
  playerDamage: number;
  opponentDamage: number;
}

export interface Exchange {
  playerMove: Move;
  opponentMove: Move;
  result: ExchangeResult;
}

export interface Bout {
  playerMoves: Move[];
  opponentMoves: Move[];
  exchanges: Exchange[];
  finalScore: number;
  timestamp: number;
  difficulty: number;
}

export interface GameState {
  scene: Scene;
  playerHealth: number;
  opponentHealth: number;
  playerScore: number;
  combo: number;
  boutHistory: Bout[];
  gameMode: 'CLASSIC' | 'TRAINING' | 'ENDLESS';
  difficulty: number;
  currentBoutMoves: { player: Move[]; opponent: Move[] };
  gameOver: boolean;
  winner?: 'PLAYER' | 'OPPONENT';
}
