import { create } from 'zustand';

type CoinStore = {
    coins: number;
    setCoins: (newCoins: number) => void;
  };
type XPStore = {
    XP: number;
    setXP: (newCoins: number) => void;
  };

export const useCoins = create<CoinStore>((set) => ({
  coins: 1000,
  setCoins: (newCoins: number) => set({ coins: newCoins }),
}));
export const useXP = create<XPStore>((set) => ({
  XP: 0,
  setXP: (newXP: number) => set({ XP: newXP }),
}));
