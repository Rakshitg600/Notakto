import AsyncStorage from '@react-native-async-storage/async-storage';
import { BoardSize, DifficultyLevel } from '../services/types';

const COINS_KEY = '@GameCoins';
const XP_KEY = '@GameExperience';



export const loadEconomy = async () => {
  try {
    const [coins, xp] = await Promise.all([
      AsyncStorage.getItem(COINS_KEY),
      AsyncStorage.getItem(XP_KEY),
    ]);

    return {
      coins: coins ? parseInt(coins, 10) : 1000,
      experience: xp ? parseInt(xp, 10) : 0,
    };
  } catch (e) {
    return { coins: 1000, experience: 0 };
  }
};


export const saveEconomy = async (coins: number, experience: number) => {
  try {
    await AsyncStorage.multiSet([
      [COINS_KEY, coins.toString()],
      [XP_KEY, experience.toString()],
    ]);
  } catch (e) {
    console.error('Failed to save economy data', e);
  }
};

export const calculateRewards = (
  isWin: boolean,
  difficulty: DifficultyLevel,
  numberOfBoards: number,
  boardSize: BoardSize
) => {
  const baseMultiplier = difficulty * numberOfBoards * boardSize;
  const coinMultiplier = Math.trunc(Math.random() * 5) + 1;
  const xpMultiplier = Math.trunc(Math.random() * 5) + 6;
  return {
    coins: isWin ? baseMultiplier * coinMultiplier : 0,
    xp: isWin ? baseMultiplier * xpMultiplier : baseMultiplier,
  };
};
