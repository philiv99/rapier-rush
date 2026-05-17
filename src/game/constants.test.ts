import { describe, it, expect } from 'vitest';
import { GAME_CONSTANTS, MOVES, SCENES, GAME_MODES } from './constants';

describe('Game Constants', () => {
  describe('GAME_CONSTANTS', () => {
    it('should have valid health configuration', () => {
      expect(GAME_CONSTANTS.HEALTH_MAX).toBeGreaterThan(0);
      expect(typeof GAME_CONSTANTS.HEALTH_MAX).toBe('number');
    });

    it('should have valid damage configuration', () => {
      expect(GAME_CONSTANTS.DAMAGE_PER_HIT).toBeGreaterThan(0);
      expect(GAME_CONSTANTS.DAMAGE_PER_HIT).toBeLessThan(GAME_CONSTANTS.HEALTH_MAX);
    });

    it('should have valid base score', () => {
      expect(GAME_CONSTANTS.BASE_SCORE).toBeGreaterThan(0);
    });

    it('should have valid combo reset delay', () => {
      expect(GAME_CONSTANTS.COMBO_RESET_DELAY).toBeGreaterThan(0);
      expect(GAME_CONSTANTS.COMBO_RESET_DELAY).toBeLessThan(10000);
    });

    it('should have valid difficulty levels', () => {
      expect(GAME_CONSTANTS.DIFFICULTY_LEVELS).toBeGreaterThan(0);
    });

    it('should define HEALTH_MAX as 100', () => {
      expect(GAME_CONSTANTS.HEALTH_MAX).toBe(100);
    });

    it('should define DAMAGE_PER_HIT as 10', () => {
      expect(GAME_CONSTANTS.DAMAGE_PER_HIT).toBe(10);
    });

    it('should define BASE_SCORE as 10', () => {
      expect(GAME_CONSTANTS.BASE_SCORE).toBe(10);
    });

    it('should define COMBO_RESET_DELAY as 2000ms', () => {
      expect(GAME_CONSTANTS.COMBO_RESET_DELAY).toBe(2000);
    });

    it('should define DIFFICULTY_LEVELS as 5', () => {
      expect(GAME_CONSTANTS.DIFFICULTY_LEVELS).toBe(5);
    });
  });

  describe('MOVES', () => {
    it('should define all valid moves', () => {
      expect(MOVES.ATTACK_HIGH).toBe('ATTACK_HIGH');
      expect(MOVES.ATTACK_LOW).toBe('ATTACK_LOW');
      expect(MOVES.PARRY_HIGH).toBe('PARRY_HIGH');
      expect(MOVES.PARRY_LOW).toBe('PARRY_LOW');
    });

    it('should have 4 move types', () => {
      const moveCount = Object.keys(MOVES).length;
      expect(moveCount).toBe(4);
    });

    it('should have unique move values', () => {
      const moveValues = Object.values(MOVES);
      const uniqueValues = new Set(moveValues);
      expect(uniqueValues.size).toBe(4);
    });

    it('should support both attack and parry moves', () => {
      const moveValues = Object.values(MOVES);
      const hasAttacks = moveValues.some((m) => m.includes('ATTACK'));
      const hasParries = moveValues.some((m) => m.includes('PARRY'));
      expect(hasAttacks).toBe(true);
      expect(hasParries).toBe(true);
    });

    it('should support both high and low variations', () => {
      const moveValues = Object.values(MOVES);
      const hasHigh = moveValues.some((m) => m.includes('HIGH'));
      const hasLow = moveValues.some((m) => m.includes('LOW'));
      expect(hasHigh).toBe(true);
      expect(hasLow).toBe(true);
    });
  });

  describe('SCENES', () => {
    it('should define all game scenes', () => {
      expect(SCENES.BOOT).toBe('BOOT');
      expect(SCENES.TITLE).toBe('TITLE');
      expect(SCENES.HOW_TO_PLAY).toBe('HOW_TO_PLAY');
      expect(SCENES.PLAYING).toBe('PLAYING');
      expect(SCENES.RESULTS).toBe('RESULTS');
      expect(SCENES.GAME_OVER).toBe('GAME_OVER');
    });

    it('should have 6 scene types', () => {
      const sceneCount = Object.keys(SCENES).length;
      expect(sceneCount).toBe(6);
    });

    it('should have unique scene values', () => {
      const sceneValues = Object.values(SCENES);
      const uniqueValues = new Set(sceneValues);
      expect(uniqueValues.size).toBe(6);
    });

    it('should have proper scene progression', () => {
      // Game flow: BOOT → TITLE → HOW_TO_PLAY → PLAYING → RESULTS/GAME_OVER
      const scenes = [SCENES.BOOT, SCENES.TITLE, SCENES.HOW_TO_PLAY, SCENES.PLAYING, SCENES.RESULTS];
      expect(scenes.every((s) => s && typeof s === 'string')).toBe(true);
    });
  });

  describe('GAME_MODES', () => {
    it('should define all game modes', () => {
      expect(GAME_MODES.CLASSIC).toBe('CLASSIC');
      expect(GAME_MODES.TRAINING).toBe('TRAINING');
      expect(GAME_MODES.ENDLESS).toBe('ENDLESS');
    });

    it('should have 3 game mode types', () => {
      const modeCount = Object.keys(GAME_MODES).length;
      expect(modeCount).toBe(3);
    });

    it('should have unique mode values', () => {
      const modeValues = Object.values(GAME_MODES);
      const uniqueValues = new Set(modeValues);
      expect(uniqueValues.size).toBe(3);
    });

    it('should have recognizable mode names', () => {
      const modeValues = Object.values(GAME_MODES);
      expect(modeValues.every((m) => m.length > 0 && typeof m === 'string')).toBe(true);
    });

    it('should support at least CLASSIC and TRAINING modes', () => {
      expect(GAME_MODES.CLASSIC).toBeDefined();
      expect(GAME_MODES.TRAINING).toBeDefined();
    });

    it('should support progression mode (ENDLESS)', () => {
      expect(GAME_MODES.ENDLESS).toBeDefined();
    });
  });

  describe('Constant coherence', () => {
    it('should not have conflicting values across different constant groups', () => {
      const allValues = [
        ...Object.values(MOVES),
        ...Object.values(SCENES),
        ...Object.values(GAME_MODES),
      ];
      const uniqueValues = new Set(allValues);
      expect(uniqueValues.size).toBe(allValues.length);
    });

    it('should define all constants as non-empty strings or positive numbers', () => {
      const numericConstants = Object.values(GAME_CONSTANTS);
      numericConstants.forEach((value) => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThan(0);
      });

      const stringConstants = [
        ...Object.values(MOVES),
        ...Object.values(SCENES),
        ...Object.values(GAME_MODES),
      ];
      stringConstants.forEach((value) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });
});
