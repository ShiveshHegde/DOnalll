'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { WORD_UNSCRAMBLE } from '@/data/puzzle-config';

export function WordUnscramble() {
  const { completeLevel, unlockApology, nextLevel, addScore } = useGame();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | ''>('');
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const maxWords = 2; // Reduced to 2 words for easier gameplay

  const currentWord = WORD_UNSCRAMBLE[currentWordIndex];

  const handleSubmit = () => {
    if (userAnswer.toUpperCase() === currentWord.correct) {
      setFeedback('correct');
      const newCount = wordsCompleted + 1;
      setWordsCompleted(newCount);

      if (newCount === maxWords) {
        completeLevel(2);
        unlockApology(2);
        addScore(100);
        setTimeout(() => {
          nextLevel();
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentWordIndex((prev) => prev + 1);
          setUserAnswer('');
          setFeedback('');
        }, 1000);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(''), 800);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-1">Unscramble Words</h2>
        <p className="text-xs text-gray-400">Rearrange the letters</p>
      </div>

      <div className="flex gap-2 mb-2">
        {Array.from({ length: maxWords }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-6 h-1 rounded-full transition-all ${
              i < wordsCompleted ? 'bg-green-400' : i === wordsCompleted ? 'bg-purple-500' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      <motion.div
        key={currentWordIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="text-3xl font-bold tracking-wider text-purple-300 mb-3 font-mono px-4">
          {currentWord.scrambled}
        </div>
      </motion.div>

      <div className="w-full max-w-xs">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Type answer..."
          className="w-full px-3 py-2 bg-slate-800 border border-purple-500 rounded-lg text-center text-sm font-bold text-white placeholder-gray-500 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/50"
          autoFocus
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors"
      >
        Check
      </motion.button>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-sm font-bold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}
        >
          {feedback === 'correct' ? '✓ Great!' : '✗ Try again!'}
        </motion.div>
      )}

      <div className="text-xs text-gray-500">
        {wordsCompleted}/{maxWords} complete
      </div>
    </div>
  );
}
