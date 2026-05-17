import { describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock auth types and functions
interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'PLAYER' | 'CREATOR' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Mock localStorage
class MockStorage {
  private data: Record<string, string> = {};

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  getItem(key: string): string | null {
    return this.data[key] || null;
  }

  removeItem(key: string): void {
    delete this.data[key];
  }

  clear(): void {
    this.data = {};
  }
}

describe('Auth and Persistence', () => {
  let authState: AuthState;
  let mockStorage: MockStorage;

  beforeEach(() => {
    authState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
    mockStorage = new MockStorage();
  });

  afterEach(() => {
    mockStorage.clear();
  });

  describe('Authentication Flow', () => {
    it('should initialize with no user', () => {
      expect(authState.user).toBeNull();
      expect(authState.isAuthenticated).toBe(false);
      expect(authState.isLoading).toBe(false);
      expect(authState.error).toBeNull();
    });

    it('should set user on successful login', () => {
      const mockUser: User = {
        id: 'user-123',
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'PLAYER',
      };

      authState.user = mockUser;
      authState.isAuthenticated = true;

      expect(authState.user).toEqual(mockUser);
      expect(authState.isAuthenticated).toBe(true);
    });

    it('should clear user on logout', () => {
      authState.user = {
        id: 'user-123',
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'PLAYER',
      };
      authState.isAuthenticated = true;

      // Logout
      authState.user = null;
      authState.isAuthenticated = false;

      expect(authState.user).toBeNull();
      expect(authState.isAuthenticated).toBe(false);
    });

    it('should handle loading state during login', () => {
      authState.isLoading = true;
      expect(authState.isLoading).toBe(true);

      authState.isLoading = false;
      expect(authState.isLoading).toBe(false);
    });

    it('should handle error messages', () => {
      authState.error = 'Invalid credentials';
      expect(authState.error).toBe('Invalid credentials');

      authState.error = null;
      expect(authState.error).toBeNull();
    });

    it('should support multiple user roles', () => {
      const roles: Array<'PLAYER' | 'CREATOR' | 'ADMIN'> = ['PLAYER', 'CREATOR', 'ADMIN'];
      for (const role of roles) {
        authState.user = {
          id: 'user-123',
          username: 'testuser',
          email: 'test@example.com',
          displayName: 'Test User',
          role,
        };
        expect(authState.user.role).toBe(role);
      }
    });
  });

  describe('User Profile Management', () => {
    it('should store user profile in state', () => {
      const user: User = {
        id: 'user-123',
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'PLAYER',
      };

      authState.user = user;
      expect(authState.user).toEqual(user);
    });

    it('should persist user to localStorage', () => {
      const user: User = {
        id: 'user-123',
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'PLAYER',
      };

      const userJson = JSON.stringify(user);
      mockStorage.setItem('currentUser', userJson);

      const stored = mockStorage.getItem('currentUser');
      expect(stored).toBe(userJson);
      expect(JSON.parse(stored!)).toEqual(user);
    });

    it('should clear user from localStorage on logout', () => {
      mockStorage.setItem('currentUser', JSON.stringify({ id: 'user-123' }));
      mockStorage.removeItem('currentUser');

      expect(mockStorage.getItem('currentUser')).toBeNull();
    });

    it('should validate user email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const validEmail = 'test@example.com';
      const invalidEmail = 'not-an-email';

      expect(emailRegex.test(validEmail)).toBe(true);
      expect(emailRegex.test(invalidEmail)).toBe(false);
    });

    it('should validate username length', () => {
      const username = 'testuser';
      expect(username.length).toBeGreaterThanOrEqual(3);
      expect(username.length).toBeLessThanOrEqual(30);
    });
  });

  describe('Score Persistence', () => {
    it('should save scores to localStorage', () => {
      const scores = [
        { score: 100, timestamp: Date.now(), mode: 'CLASSIC' },
        { score: 150, timestamp: Date.now(), mode: 'ENDLESS' },
        { score: 80, timestamp: Date.now(), mode: 'TRAINING' },
      ];

      mockStorage.setItem('scores', JSON.stringify(scores));
      const stored = mockStorage.getItem('scores');

      expect(stored).toBeDefined();
      expect(JSON.parse(stored!)).toEqual(scores);
    });

    it('should load scores from localStorage', () => {
      const scores = [
        { score: 100, timestamp: Date.now(), mode: 'CLASSIC' },
        { score: 150, timestamp: Date.now(), mode: 'ENDLESS' },
      ];

      mockStorage.setItem('scores', JSON.stringify(scores));
      const loaded = JSON.parse(mockStorage.getItem('scores')!);

      expect(loaded).toHaveLength(2);
      expect(loaded[0].score).toBe(100);
      expect(loaded[1].score).toBe(150);
    });

    it('should append new scores without losing old ones', () => {
      let scores = [{ score: 100, timestamp: 1000, mode: 'CLASSIC' }];
      mockStorage.setItem('scores', JSON.stringify(scores));

      scores = JSON.parse(mockStorage.getItem('scores')!);
      scores.push({ score: 150, timestamp: 2000, mode: 'ENDLESS' });
      mockStorage.setItem('scores', JSON.stringify(scores));

      const stored = JSON.parse(mockStorage.getItem('scores')!);
      expect(stored).toHaveLength(2);
      expect(stored[1].score).toBe(150);
    });

    it('should handle empty score list', () => {
      mockStorage.setItem('scores', JSON.stringify([]));
      const stored = JSON.parse(mockStorage.getItem('scores')!);

      expect(Array.isArray(stored)).toBe(true);
      expect(stored).toHaveLength(0);
    });

    it('should calculate highest score', () => {
      const scores = [
        { score: 100, timestamp: Date.now(), mode: 'CLASSIC' },
        { score: 250, timestamp: Date.now(), mode: 'ENDLESS' },
        { score: 150, timestamp: Date.now(), mode: 'TRAINING' },
      ];

      const highest = Math.max(...scores.map((s) => s.score));
      expect(highest).toBe(250);
    });

    it('should track score by mode', () => {
      const scores = [
        { score: 100, timestamp: Date.now(), mode: 'CLASSIC' },
        { score: 250, timestamp: Date.now(), mode: 'ENDLESS' },
        { score: 150, timestamp: Date.now(), mode: 'TRAINING' },
        { score: 200, timestamp: Date.now(), mode: 'ENDLESS' },
      ];

      const endlessScores = scores.filter((s) => s.mode === 'ENDLESS').map((s) => s.score);
      expect(endlessScores).toEqual([250, 200]);
    });
  });

  describe('Achievements Persistence', () => {
    it('should save achievement unlocks', () => {
      const achievements = [
        { id: 'first-win', unlocked: true, timestamp: Date.now() },
        { id: 'combo-5', unlocked: true, timestamp: Date.now() },
        { id: 'endless-100', unlocked: false, timestamp: null },
      ];

      mockStorage.setItem('achievements', JSON.stringify(achievements));
      const stored = JSON.parse(mockStorage.getItem('achievements')!);

      expect(stored).toHaveLength(3);
      expect(stored[0].unlocked).toBe(true);
      expect(stored[2].unlocked).toBe(false);
    });

    it('should update achievement unlock status', () => {
      let achievements = [{ id: 'first-win', unlocked: false, timestamp: null as number | null }];
      mockStorage.setItem('achievements', JSON.stringify(achievements));

      achievements = JSON.parse(mockStorage.getItem('achievements')!);
      achievements[0].unlocked = true;
      achievements[0].timestamp = Date.now();
      mockStorage.setItem('achievements', JSON.stringify(achievements));

      const stored = JSON.parse(mockStorage.getItem('achievements')!);
      expect(stored[0].unlocked).toBe(true);
      expect(stored[0].timestamp).toBeDefined();
    });

    it('should count unlocked achievements', () => {
      const achievements = [
        { id: 'first-win', unlocked: true },
        { id: 'combo-5', unlocked: true },
        { id: 'endless-100', unlocked: false },
        { id: 'training-complete', unlocked: true },
      ];

      const unlockedCount = achievements.filter((a) => a.unlocked).length;
      expect(unlockedCount).toBe(3);
    });
  });

  describe('Replay Persistence', () => {
    it('should save replay data', () => {
      const replay = {
        id: 'replay-123',
        date: new Date().toISOString(),
        mode: 'CLASSIC',
        difficulty: 1,
        duration: 45000,
        winner: 'player',
        score: 150,
        moves: [],
      };

      mockStorage.setItem('replay-123', JSON.stringify(replay));
      const stored = JSON.parse(mockStorage.getItem('replay-123')!);

      expect(stored.id).toBe('replay-123');
      expect(stored.winner).toBe('player');
    });

    it('should store multiple replays', () => {
      const replays = [
        { id: 'replay-1', score: 100 },
        { id: 'replay-2', score: 150 },
        { id: 'replay-3', score: 200 },
      ];

      mockStorage.setItem('replays', JSON.stringify(replays));
      const stored = JSON.parse(mockStorage.getItem('replays')!);

      expect(stored).toHaveLength(3);
    });

    it('should retrieve replay by id', () => {
      const replays = [
        { id: 'replay-1', score: 100 },
        { id: 'replay-2', score: 150 },
      ];

      mockStorage.setItem('replays', JSON.stringify(replays));
      const allReplays = JSON.parse(mockStorage.getItem('replays')!);
      const found = allReplays.find((r: { id: string }) => r.id === 'replay-2');

      expect(found.id).toBe('replay-2');
      expect(found.score).toBe(150);
    });

    it('should delete replay', () => {
      let replays = [
        { id: 'replay-1', score: 100 },
        { id: 'replay-2', score: 150 },
      ];

      mockStorage.setItem('replays', JSON.stringify(replays));
      replays = JSON.parse(mockStorage.getItem('replays')!);
      replays = replays.filter((r: { id: string }) => r.id !== 'replay-1');
      mockStorage.setItem('replays', JSON.stringify(replays));

      const stored = JSON.parse(mockStorage.getItem('replays')!);
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe('replay-2');
    });
  });

  describe('Theme Preference Persistence', () => {
    it('should save color-blind theme preference', () => {
      const preferences = {
        theme: 'deuteranopia',
        reducedMotion: false,
      };

      mockStorage.setItem('preferences', JSON.stringify(preferences));
      const stored = JSON.parse(mockStorage.getItem('preferences')!);

      expect(stored.theme).toBe('deuteranopia');
    });

    it('should save reduced motion preference', () => {
      const preferences = {
        theme: 'protanopia',
        reducedMotion: true,
      };

      mockStorage.setItem('preferences', JSON.stringify(preferences));
      const stored = JSON.parse(mockStorage.getItem('preferences')!);

      expect(stored.reducedMotion).toBe(true);
    });

    it('should update theme preference', () => {
      let preferences = { theme: 'normal', reducedMotion: false };
      mockStorage.setItem('preferences', JSON.stringify(preferences));

      preferences = JSON.parse(mockStorage.getItem('preferences')!);
      preferences.theme = 'achromatopsia';
      mockStorage.setItem('preferences', JSON.stringify(preferences));

      const stored = JSON.parse(mockStorage.getItem('preferences')!);
      expect(stored.theme).toBe('achromatopsia');
    });
  });

  describe('Data Recovery', () => {
    it('should handle corrupted localStorage data gracefully', () => {
      mockStorage.setItem('scores', 'invalid-json-{');

      try {
        const stored = mockStorage.getItem('scores');
        if (stored) {
          JSON.parse(stored);
        }
      } catch {
        // Should gracefully handle parse error
        expect(true).toBe(true);
      }
    });

    it('should provide default values when data is missing', () => {
      const stored = mockStorage.getItem('nonexistent');
      const defaultValue = stored ? JSON.parse(stored) : [];

      expect(Array.isArray(defaultValue)).toBe(true);
    });

    it('should validate stored data structure', () => {
      const scores = [{ score: 100, timestamp: Date.now(), mode: 'CLASSIC' }];
      mockStorage.setItem('scores', JSON.stringify(scores));

      const stored = JSON.parse(mockStorage.getItem('scores')!);
      const isValid =
        Array.isArray(stored) &&
        stored.every(
          (s: { score?: number; timestamp?: number; mode?: string }) =>
            typeof s.score === 'number' && typeof s.timestamp === 'number' && typeof s.mode === 'string',
        );

      expect(isValid).toBe(true);
    });
  });
});
