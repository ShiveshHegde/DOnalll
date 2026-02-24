'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PUZZLES, APOLOGIES } from '@/data/puzzle-config';

export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  unlockedApologies: number[];
  gemColor: string;
  isAnimating: boolean;
  score: number;
  gameComplete: boolean;
}

interface GameContextType {
  gameState: GameState;
  completeLevel: (levelId: number) => void;
  unlockApology: (apologyId: number) => void;
  setGemColor: (color: string) => void;
  setAnimating: (animating: boolean) => void;
  nextLevel: () => void;
  restartGame: () => void;
  addScore: (points: number) => void;
  getCurrentPuzzle: () => typeof PUZZLES[0] | null;
  getUnlockedApologies: () => typeof APOLOGIES[];
}

const GameContext = createContext<GameContextType | null>(null);

const INITIAL_STATE: GameState = {
  currentLevel: 1,
  completedLevels: [],
  unlockedApologies: [],
  gemColor: '#EC4899',
  isAnimating: false,
  score: 0,
  gameComplete: false,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const completeLevel = useCallback((levelId: number) => {
    setGameState((prev) => ({
      ...prev,
      completedLevels: [...new Set([...prev.completedLevels, levelId])],
    }));
  }, []);

  const unlockApology = useCallback((apologyId: number) => {
    setGameState((prev) => ({
      ...prev,
      unlockedApologies: [...new Set([...prev.unlockedApologies, apologyId])],
    }));
  }, []);

  const setGemColor = useCallback((color: string) => {
    setGameState((prev) => ({
      ...prev,
      gemColor: color,
    }));
  }, []);

  const setAnimating = useCallback((animating: boolean) => {
    setGameState((prev) => ({
      ...prev,
      isAnimating: animating,
    }));
  }, []);

  const nextLevel = useCallback(() => {
    setGameState((prev) => {
      const nextLevel = prev.currentLevel + 1;
      if (nextLevel > PUZZLES.length) {
        return {
          ...prev,
          gameComplete: true,
        };
      }
      return {
        ...prev,
        currentLevel: nextLevel,
      };
    });
  }, []);

  const restartGame = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  const addScore = useCallback((points: number) => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
    }));
  }, []);

  const getCurrentPuzzle = useCallback(() => {
    return PUZZLES.find((p) => p.level === gameState.currentLevel) || null;
  }, [gameState.currentLevel]);

  const getUnlockedApologies = useCallback(() => {
    return APOLOGIES.filter((a) => gameState.unlockedApologies.includes(a.id));
  }, [gameState.unlockedApologies]);

  const value: GameContextType = {
    gameState,
    completeLevel,
    unlockApology,
    setGemColor,
    setAnimating,
    nextLevel,
    restartGame,
    addScore,
    getCurrentPuzzle,
    getUnlockedApologies,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
