'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';

export function ColorSequence() {
  const { completeLevel, unlockApology, nextLevel, addScore } = useGame();
  const colors = ['#EC4899', '#8B5CF6', '#06B6D4']; // Reduced to 3 colors
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | ''>('');

  const correctSequence = [0, 1, 2]; // The correct order

  const handleColorClick = (index: number) => {
    if (feedback === 'correct') return;

    const newSelected = [...selectedColors, index];
    setSelectedColors(newSelected);

    if (correctSequence[newSelected.length - 1] !== index) {
      setFeedback('wrong');
      setTimeout(() => {
        setSelectedColors([]);
        setFeedback('');
      }, 800);
      return;
    }

    if (newSelected.length === correctSequence.length) {
      setFeedback('correct');
      completeLevel(4);
      unlockApology(4);
      addScore(100);
      setTimeout(() => {
        nextLevel();
      }, 1500);
    }
  };

  const handleReset = () => {
    setSelectedColors([]);
    setFeedback('');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-1">Color Sequence</h2>
        <p className="text-xs text-gray-400">Click in order: 1st, 2nd, 3rd</p>
      </div>

      <div className="flex gap-2 mb-3">
        {correctSequence.map((_, i) => (
          <motion.div
            key={i}
            className={`text-xs font-bold px-2 py-1 rounded ${
              i < selectedColors.length ? 'bg-green-500 text-white' : 'bg-slate-700 text-gray-400'
            }`}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mb-2">
        {colors.map((color, index) => (
          <motion.button
            key={index}
            onClick={() => handleColorClick(index)}
            disabled={feedback === 'correct'}
            whileHover={feedback !== 'correct' ? { scale: 1.12 } : {}}
            whileTap={feedback !== 'correct' ? { scale: 0.88 } : {}}
            className="w-14 h-14 rounded-lg transition-all shadow-lg disabled:opacity-60"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 15px ${color}`,
              border: selectedColors.includes(index) ? '2px solid white' : '2px solid transparent',
            }}
          />
        ))}
      </div>

      <div className="text-xs text-gray-500">
        {selectedColors.length}/{correctSequence.length} clicked
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-sm font-bold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}
        >
          {feedback === 'correct' ? '✓ Perfect!' : '✗ Try again!'}
        </motion.div>
      )}

      {selectedColors.length > 0 && feedback !== 'correct' && (
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
        >
          Reset
        </motion.button>
      )}
    </div>
  );
}
