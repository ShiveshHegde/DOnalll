'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { EMOTION_OPTIONS } from '@/data/puzzle-config';

export function EmotionQuiz() {
  const { completeLevel, unlockApology, nextLevel, addScore } = useGame();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: string) => {
    if (!submitted) {
      setSelectedEmotion(value);
    }
  };

  const handleSubmit = () => {
    if (selectedEmotion === 'regretful') {
      setSubmitted(true);
      completeLevel(3);
      unlockApology(3);
      addScore(100);
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">What Was I Feeling?</h2>
        <p className="text-sm text-gray-400">Choose the emotion that best describes my regret</p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {EMOTION_OPTIONS.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
              selectedEmotion === option.value
                ? 'border-purple-400 bg-purple-500/20'
                : 'border-slate-700 hover:border-purple-400'
            }`}
          >
            <span className="text-2xl">{option.emoji}</span>
            <span className="font-semibold">{option.text}</span>
          </motion.button>
        ))}
      </div>

      {selectedEmotion && (
        <motion.button
          onClick={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors"
        >
          {submitted ? 'Next Puzzle' : 'Confirm'}
        </motion.button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-lg font-bold"
        >
          ✓ You understand my feelings perfectly!
        </motion.div>
      )}
    </div>
  );
}
