import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Scene, Bout } from '../types/game';
import { GAME_CONSTANTS } from './constants';
import { resetBout, resolveExchange, calculateScore } from './logic/fencingRules';
import { updateCombo } from './logic/scoring';
import { getOpponentMove } from './logic/opponentAI';

interface GameStore {
  gameState: GameState;
  startBout: (mode: 'CLASSIC' | 'TRAINING' | 'ENDLESS', difficulty: number) => void;
  submitMove: (playerMove: string) => void;
  goToScene: (scene: Scene) => void;
  reset: () => void;
  setBoutHistory: (bouts: Bout[]) => void;
}

const initialGameState: GameState = {
  scene: 'TITLE',
  playerHealth: GAME_CONSTANTS.HEALTH_MAX,
  opponentHealth: GAME_CONSTANTS.HEALTH_MAX,
  playerScore: 0,
  combo: 0,
  boutHistory: [],
  gameMode: 'CLASSIC',
  difficulty: 1,
  currentBoutMoves: { player: [], opponent: [] },
  gameOver: false,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameState: initialGameState,

      startBout: (mode, difficulty) =>
        set((state) => ({
          gameState: {
            ...state.gameState,
            ...resetBout(),
            scene: 'PLAYING',
            gameMode: mode,
            difficulty,
            gameOver: false,
            winner: undefined,
          },
        })),

      submitMove: (playerMove) =>
        set((state) => {
          const { gameState } = state;
          if (gameState.scene !== 'PLAYING' || gameState.gameOver) {
            return state;
          }

          const opponentMove = getOpponentMove(gameState.difficulty);
          const result = resolveExchange(playerMove as any, opponentMove);

          const newPlayerHealth = Math.max(0, gameState.playerHealth - result.opponentDamage);
          const newOpponentHealth = Math.max(0, gameState.opponentHealth - result.playerDamage);
          const newCombo = updateCombo(result.playerHit, gameState.combo);
          const turnScore = calculateScore(newCombo);

          const gameOver = newPlayerHealth === 0 || newOpponentHealth === 0;
          const winner = newPlayerHealth === 0 ? 'OPPONENT' : newOpponentHealth === 0 ? 'PLAYER' : undefined;

          let newScene: Scene = 'PLAYING';
          if (gameOver) {
            newScene = 'RESULTS';
          }

          return {
            gameState: {
              ...gameState,
              playerHealth: newPlayerHealth,
              opponentHealth: newOpponentHealth,
              playerScore: gameState.playerScore + turnScore,
              combo: newCombo,
              currentBoutMoves: {
                player: [...gameState.currentBoutMoves.player, playerMove as any],
                opponent: [...gameState.currentBoutMoves.opponent, opponentMove],
              },
              gameOver,
              winner,
              scene: newScene,
            },
          };
        }),

      goToScene: (scene) =>
        set((state) => ({
          gameState: {
            ...state.gameState,
            scene,
          },
        })),

      reset: () =>
        set({
          gameState: initialGameState,
        }),

      setBoutHistory: (bouts) =>
        set((state) => ({
          gameState: {
            ...state.gameState,
            boutHistory: bouts,
          },
        })),
    }),
    {
      name: 'rapier-rush:gamestore',
    },
  ),
);
