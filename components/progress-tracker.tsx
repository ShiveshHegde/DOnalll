'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { PUZZLES } from '@/data/puzzle-config';

export function ProgressTracker() {
  const { gameState } = useGame();

  const progressPercent = (gameState.completedLevels.length / PUZZLES.length) * 100;

  return (
    <div className="w-full">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-purple-300">Progress</span>
          <span className="text-xs text-gray-400">{gameState.completedLevels.length}/{PUZZLES.length}</span>
        </div>

        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {PUZZLES.map((puzzle) => {
            const isCompleted = gameState.completedLevels.includes(puzzle.id);
            const isCurrent = puzzle.id === gameState.currentLevel;
            const isUpcoming = puzzle.id > gameState.currentLevel;

            return (
              <motion.div
                key={puzzle.id}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-default ${
                  isCompleted
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/40'
                    : isCurrent
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-2 border-purple-300 shadow-lg shadow-purple-500/50 animate-pulse'
                    : isUpcoming
                    ? 'bg-slate-800 text-gray-500 border border-slate-700'
                    : 'bg-slate-800 text-gray-500'
                }`}
                whileHover={isCompleted ? { scale: 1.08 } : {}}
              >
                {isCompleted ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    ✓
                  </motion.span>
                ) : isCurrent ? (
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    {puzzle.id}
                  </motion.span>
                ) : (
                  puzzle.id
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
              <div className="text-gray-400">Current</div>
              <div className="text-purple-300 font-bold">Level {gameState.currentLevel}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
              <div className="text-gray-400">Completed</div>
              <div className="text-green-400 font-bold">{gameState.completedLevels.length}/5</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
              <div className="text-gray-400">Score</div>
              <div className="text-yellow-400 font-bold">{gameState.score}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
