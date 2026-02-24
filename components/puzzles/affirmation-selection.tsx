'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { AFFIRMATION_OPTIONS } from '@/data/puzzle-config';

export function AffirmationSelection() {
  const { completeLevel, unlockApology, gameState, addScore, setAnimating } = useGame();
  const [selectedAffirmations, setSelectedAffirmations] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const minRequired = 2; // Reduced from 3 to 2 for easier gameplay

  const handleToggle = (text: string) => {
    if (submitted) return;

    setSelectedAffirmations((prev) => {
      if (prev.includes(text)) {
        return prev.filter((item) => item !== text);
      } else if (prev.length < minRequired + 2) {
        return [...prev, text];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedAffirmations.length >= minRequired) {
      setSubmitted(true);
      completeLevel(5);
      unlockApology(5);
      addScore(100);
      setAnimating(true);

      setTimeout(() => {
        setAnimating(false);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-1">Our Connection</h2>
        <p className="text-xs text-gray-400">Pick what matters</p>
        <div className="mt-2 text-xs text-purple-300">
          {selectedAffirmations.length}/{minRequired} selected
        </div>
      </div>

      <div className="w-full max-w-xs grid grid-cols-2 gap-2">
        {AFFIRMATION_OPTIONS.slice(0, 4).map((option, index) => (
          <motion.button
            key={option.text}
            onClick={() => handleToggle(option.text)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06 }}
            whileHover={!submitted ? { scale: 1.05 } : {}}
            whileTap={!submitted ? { scale: 0.95 } : {}}
            className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 text-center ${
              selectedAffirmations.includes(option.text)
                ? 'border-purple-400 bg-purple-500/30 shadow-lg shadow-purple-500/20'
                : 'border-slate-700 hover:border-purple-500'
            }`}
            disabled={submitted}
          >
            <span className="text-xl">{option.emoji}</span>
            <span className="text-xs font-semibold leading-tight">{option.text}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex gap-1 mt-1">
        {Array.from({ length: minRequired }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-5 h-1 rounded-full ${
              i < selectedAffirmations.length ? 'bg-green-400' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {selectedAffirmations.length >= minRequired && !submitted && (
        <motion.button
          onClick={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-all shadow-lg"
        >
          Finish
        </motion.button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-green-400 text-sm font-bold">✓ Complete!</div>
          <p className="text-xs text-gray-400 mt-1">Loading celebration...</p>
        </motion.div>
      )}
    </div>
  );
}
