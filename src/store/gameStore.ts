import { create } from 'zustand';

type GameScreen = 'title' | 'forge' | 'combat' | 'armory' | 'leaderboard' | 'gameover';

interface Weapon {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  element?: 'fire' | 'lightning' | 'void' | 'ice';
  damage: number;
}

interface GameState {
  currentScreen: GameScreen;
  setScreen: (screen: GameScreen) => void;
  
  // Player stats
  score: number;
  wave: number;
  weapons: Weapon[];
  equippedWeaponId: string | null;
  addScore: (points: number) => void;
  addWeapon: (weapon: Weapon) => void;
  equipWeapon: (id: string) => void;
  setWave: (w: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'title',
  setScreen: (screen) => set({ currentScreen: screen }),
  
  score: 0,
  wave: 1,
  weapons: [],
  equippedWeaponId: null,

  addScore: (points) => set((state) => ({ score: state.score + points })),
  addWeapon: (weapon) => set((state) => {
    const weapons = [...state.weapons, weapon];
    return { weapons, equippedWeaponId: state.equippedWeaponId || weapon.id };
  }),
  equipWeapon: (id) => set({ equippedWeaponId: id }),
  setWave: (wave) => set({ wave }),
  resetGame: () => set({ score: 0, wave: 1, currentScreen: 'title', weapons: [], equippedWeaponId: null }),
}));
