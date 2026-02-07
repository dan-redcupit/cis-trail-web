// Achievement definitions and tracking

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  // Victory achievements
  { id: 'first_win', name: 'Certified!', description: 'Complete the CMMC Trail for the first time', icon: '🏆' },
  { id: 'perfect_run', name: 'Legendary CISO', description: 'Win with 100% accuracy and no deaths', icon: '👑' },
  { id: 'intern_revenge', name: "Intern's Revenge", description: 'Win with only the intern surviving', icon: '📎' },
  { id: 'solo_survivor', name: 'Sole Survivor', description: 'Win with only 1 party member alive', icon: '🦸' },
  { id: 'against_all_odds', name: 'Against All Odds', description: 'Win with morale below 25%', icon: '🎲' },

  // Death achievements
  { id: 'first_blood', name: 'First Blood', description: 'Lose your first team member', icon: '💀' },
  { id: 'total_party_kill', name: 'Total Party Kill', description: 'Lose all team members', icon: '☠️' },

  // Gameplay achievements
  { id: 'perfect_10', name: 'Perfect Audit', description: 'Answer 10 questions correctly in a row', icon: '✅' },
  { id: 'speed_runner', name: 'Speed Runner', description: 'Win in under 35 questions', icon: '⚡' },
  { id: 'completionist', name: 'Completionist', description: 'See all 50 questions', icon: '📚' },
  { id: 'shopaholic', name: 'Shopaholic', description: 'Buy 5 items from the store in one game', icon: '🛒' },

  // Easter egg achievements
  { id: 'konami', name: 'Old School', description: 'Enter the Konami code', icon: '🎮' },
  { id: 'secret_name', name: 'Who Are You?', description: 'Use a secret party member name', icon: '🕵️' },
  { id: 'tank_commander', name: 'Tank Commander', description: 'Fire the main gun 10 times in one game', icon: '🎯' },

  // Difficulty achievements
  { id: 'easy_win', name: 'Training Complete', description: 'Win on Compliance Intern difficulty', icon: '🎓' },
  { id: 'normal_win', name: 'Security Analyst', description: 'Win on Security Analyst difficulty', icon: '🔒' },
  { id: 'hard_win', name: 'Audit Survivor', description: 'Win on Audit Season difficulty', icon: '📋' },
  { id: 'nightmare_win', name: 'Congressional Hero', description: 'Win on Congressional Hearing difficulty', icon: '🏛️' },
];

const STORAGE_KEY = 'cmmc-trail-achievements';

// Get all achievements with unlock status from localStorage
export function getAchievements(): Achievement[] {
  if (typeof window === 'undefined') {
    return ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }));
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const unlockedMap: Record<string, number> = stored ? JSON.parse(stored) : {};

  return ACHIEVEMENTS.map(a => ({
    ...a,
    unlocked: !!unlockedMap[a.id],
    unlockedAt: unlockedMap[a.id],
  }));
}

// Unlock an achievement
export function unlockAchievement(id: string): boolean {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(STORAGE_KEY);
  const unlockedMap: Record<string, number> = stored ? JSON.parse(stored) : {};

  // Already unlocked
  if (unlockedMap[id]) return false;

  // Unlock it
  unlockedMap[id] = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedMap));

  return true; // Newly unlocked
}

// Check if an achievement is unlocked
export function isAchievementUnlocked(id: string): boolean {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(STORAGE_KEY);
  const unlockedMap: Record<string, number> = stored ? JSON.parse(stored) : {};

  return !!unlockedMap[id];
}

// Get count of unlocked achievements
export function getUnlockedCount(): { unlocked: number; total: number } {
  const achievements = getAchievements();
  return {
    unlocked: achievements.filter(a => a.unlocked).length,
    total: achievements.length,
  };
}

// Reset all achievements (for testing)
export function resetAchievements(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
