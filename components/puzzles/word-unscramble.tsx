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

  const currentWord = WORD_UNSCRAMBLE[currentWordIndex];

  const handleSubmit = () => {
    if (userAnswer.toUpperCase() === currentWord.correct) {
      setFeedback('correct');
      setWordsCompleted((prev) => prev + 1);

      if (currentWordIndex === WORD_UNSCRAMBLE.length - 1) {
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
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Unscramble the Words</h2>
        <p className="text-sm text-gray-400">Rearrange the letters to form the correct word</p>
        <div className="mt-2 text-xs text-purple-300">
          {wordsCompleted}/{WORD_UNSCRAMBLE.length} words
        </div>
      </div>

      <motion.div
        key={currentWordIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-5xl font-bold tracking-widest text-purple-400 mb-4 font-mono">
          {currentWord.scrambled.split('').join(' ')}
        </div>
        <p className="text-sm text-gray-400">Can you unscramble this?</p>
      </motion.div>

      <div className="w-full max-w-sm">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Type your answer..."
          className="w-full px-4 py-3 bg-slate-800 border border-purple-500 rounded-lg text-center text-lg font-bold text-white placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/50"
          autoFocus
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors"
      >
        Check Answer
      </motion.button>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-xl font-bold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}
        >
          {feedback === 'correct' ? '✓ Correct!' : '✗ Try again!'}
        </motion.div>
      )}
    </div>
  );
}
