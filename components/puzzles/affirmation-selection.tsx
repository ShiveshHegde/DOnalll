'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { AFFIRMATION_OPTIONS } from '@/data/puzzle-config';

export function AffirmationSelection() {
  const { completeLevel, unlockApology, gameState, addScore, setAnimating } = useGame();
  const [selectedAffirmations, setSelectedAffirmations] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const minRequired = 3;
  const maxRequired = 5;

  const handleToggle = (text: string) => {
    if (submitted) return;

    setSelectedAffirmations((prev) => {
      if (prev.includes(text)) {
        return prev.filter((item) => item !== text);
      } else if (prev.length < maxRequired) {
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
      addScore(200);
      setAnimating(true);

      setTimeout(() => {
        setAnimating(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Affirmation Selection</h2>
        <p className="text-sm text-gray-400">Choose the affirmations that describe us</p>
        <div className="mt-2 text-xs text-purple-300">
          {selectedAffirmations.length}/{minRequired} required
        </div>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
        {AFFIRMATION_OPTIONS.map((option, index) => (
          <motion.button
            key={option.text}
            onClick={() => handleToggle(option.text)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: selectedAffirmations.includes(option.text) ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 text-center ${
              selectedAffirmations.includes(option.text)
                ? 'border-purple-400 bg-purple-500/30'
                : 'border-slate-700 hover:border-purple-400'
            }`}
          >
            <span className="text-2xl">{option.emoji}</span>
            <span className="text-sm font-semibold">{option.text}</span>
          </motion.button>
        ))}
      </div>

      {selectedAffirmations.length >= minRequired && !submitted && (
        <motion.button
          onClick={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-all shadow-lg"
        >
          Complete Journey
        </motion.button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-green-400 text-xl font-bold mb-2">✓ You've completed the journey!</div>
          <p className="text-sm text-gray-300">Now witness the celebration of forgiveness...</p>
        </motion.div>
      )}
    </div>
  );
}
