'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/components/game-engine';

export function UnlockedApologies() {
  const { gameState, getUnlockedApologies } = useGame();
  const unlockedApologies = getUnlockedApologies();

  if (unlockedApologies.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8">
      <h3 className="text-lg font-bold mb-4 text-purple-300">Unlocked Apologies</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        <AnimatePresence>
          {unlockedApologies.map((apology) => (
            <motion.div
              key={apology.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-3 bg-slate-800/50 border border-purple-500/30 rounded-lg"
            >
              <div className="flex gap-2 items-start">
                <span className="text-2xl">{apology.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs text-purple-300 mb-1">Level {apology.level}</p>
                  <p className="text-sm text-gray-100 italic">{apology.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
