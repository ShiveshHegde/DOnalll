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
      // Auto-submit on selection for easier UX
      if (value === 'regretful') {
        setTimeout(() => {
          setSubmitted(true);
          completeLevel(3);
          unlockApology(3);
          addScore(100);
          setTimeout(() => {
            nextLevel();
          }, 1500);
        }, 300);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-1">How Am I Feeling?</h2>
        <p className="text-xs text-gray-400">Pick my emotion</p>
      </div>

      <div className="w-full max-w-xs space-y-2">
        {EMOTION_OPTIONS.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={!submitted ? { scale: 1.03 } : {}}
            whileTap={!submitted ? { scale: 0.97 } : {}}
            className={`w-full p-3 rounded-lg border-2 transition-all text-center flex items-center justify-center gap-2 ${
              selectedEmotion === option.value
                ? 'border-purple-400 bg-purple-500/30 shadow-lg shadow-purple-500/30'
                : 'border-slate-700 hover:border-purple-500 hover:bg-slate-700/50'
            }`}
            disabled={submitted}
          >
            <span className="text-lg">{option.emoji}</span>
            <span className="text-sm font-semibold">{option.text}</span>
          </motion.button>
        ))}
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-2"
        >
          <div className="text-green-400 text-sm font-bold">✓ Perfect!</div>
          <div className="text-xs text-gray-400 mt-1">You understand me...</div>
        </motion.div>
      )}
    </div>
  );
}
