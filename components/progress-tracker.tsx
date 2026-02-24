'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { PUZZLES } from '@/data/puzzle-config';

export function ProgressTracker() {
  const { gameState } = useGame();

  const progressPercent = (gameState.completedLevels.length / PUZZLES.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Journey Progress</span>
          <span className="text-xs text-purple-300">{gameState.completedLevels.length}/{PUZZLES.length} puzzles</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {PUZZLES.map((puzzle) => (
          <motion.div
            key={puzzle.id}
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
              gameState.completedLevels.includes(puzzle.id)
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : puzzle.id <= gameState.currentLevel
                ? 'bg-slate-700 text-purple-300 border-2 border-purple-500'
                : 'bg-slate-800 text-gray-500'
            }`}
            whileHover={gameState.completedLevels.includes(puzzle.id) ? { scale: 1.05 } : {}}
          >
            {gameState.completedLevels.includes(puzzle.id) ? '✓' : puzzle.id}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">Level {gameState.currentLevel} of {PUZZLES.length}</p>
        <p className="text-xs text-purple-300 mt-1">Score: {gameState.score}</p>
      </div>
    </div>
  );
}
