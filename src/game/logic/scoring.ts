/**
 * Update combo count based on whether player was hit
 */
export function updateCombo(wasHit: boolean, currentCombo: number): number {
  if (wasHit) {
    return 0; // Reset combo if player takes damage
  }
  return currentCombo + 1; // Increment if player lands a hit or defends
}

/**
 * Calculate total score from all bouts
 */
export function calculateTotalScore(bouts: Array<{ finalScore: number }>): number {
  return bouts.reduce((sum, bout) => sum + bout.finalScore, 0);
}

/**
 * Get combo multiplier for score calculation
 */
export function getComboMultiplier(combo: number): number {
  if (combo === 0) return 1;
  if (combo < 3) return 1.1;
  if (combo < 5) return 1.2;
  if (combo < 10) return 1.35;
  return 1.5; // Max at 10+
}
