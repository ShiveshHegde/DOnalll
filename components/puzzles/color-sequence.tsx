'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { COLOR_SEQUENCE } from '@/data/puzzle-config';

export function ColorSequence() {
  const { completeLevel, unlockApology, nextLevel, addScore } = useGame();
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | ''>('');

  const handleColorClick = (index: number) => {
    const newSelected = [...selectedColors, index];
    setSelectedColors(newSelected);

    if (COLOR_SEQUENCE[newSelected.length - 1] !== COLOR_SEQUENCE[index]) {
      setFeedback('wrong');
      setTimeout(() => {
        setSelectedColors([]);
        setFeedback('');
      }, 1000);
      return;
    }

    if (newSelected.length === COLOR_SEQUENCE.length) {
      setFeedback('correct');
      completeLevel(4);
      unlockApology(4);
      addScore(150);
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
  };

  const handleReset = () => {
    setSelectedColors([]);
    setFeedback('');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Color Sequence Challenge</h2>
        <p className="text-sm text-gray-400">Click the colors in the correct sequence</p>
        <div className="mt-2 text-xs text-purple-300">{selectedColors.length}/{COLOR_SEQUENCE.length}</div>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {COLOR_SEQUENCE.map((color, index) => (
          <motion.button
            key={index}
            onClick={() => handleColorClick(index)}
            disabled={feedback === 'correct' || feedback === 'wrong'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-24 h-24 rounded-xl transition-all disabled:opacity-50"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 30px ${color}`,
              border: selectedColors.includes(index) ? `3px solid white` : '3px solid transparent',
            }}
          />
        ))}
      </div>

      {selectedColors.length > 0 && (
        <div className="flex gap-2 text-xs">
          {selectedColors.map((idx, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLOR_SEQUENCE[idx] }}
            />
          ))}
        </div>
      )}

      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-xl font-bold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}
        >
          {feedback === 'correct' ? '✓ Perfect sequence!' : '✗ Wrong order!'}
        </motion.div>
      )}

      {selectedColors.length > 0 && feedback !== 'correct' && (
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
        >
          Reset
        </motion.button>
      )}
    </div>
  );
}
