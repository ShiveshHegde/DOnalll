'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/components/game-engine';
import { COLOR_SEQUENCE } from '@/data/puzzle-config';

export function PatternMemory() {
  const { gameState, completeLevel, unlockApology, setGemColor, nextLevel, addScore } = useGame();
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'ready' | ''>('ready');

  const colors = COLOR_SEQUENCE.slice(0, 4);

  useEffect(() => {
    startRound();
  }, []);

  const playColor = (index: number) => {
    setGemColor(colors[index]);
    setTimeout(() => setGemColor('#EC4899'), 300);
  };

  const startRound = async () => {
    setIsPlayingSequence(true);
    const newSequence = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setUserSequence([]);
    setFeedback('ready');

    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let i = 0; i < newSequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      playColor(newSequence[i]);
    }

    setIsPlayingSequence(false);
  };

  const handleColorClick = (index: number) => {
    if (isPlayingSequence) return;

    playColor(index);
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback('ready');
        setUserSequence([]);
      }, 1000);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      if (sequence.length === 5) {
        setFeedback('correct');
        completeLevel(1);
        unlockApology(1);
        addScore(100);
        setTimeout(() => {
          nextLevel();
        }, 2000);
      } else {
        setFeedback('correct');
        setTimeout(() => {
          startRound();
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Pattern Memory Game</h2>
        <p className="text-sm text-gray-400">Watch the colors, then repeat the sequence!</p>
        <div className="mt-2 text-xs text-purple-300">Sequence: {sequence.length}/5</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {colors.map((color, index) => (
          <motion.button
            key={index}
            onClick={() => handleColorClick(index)}
            disabled={isPlayingSequence}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-lg transition-all disabled:opacity-50"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 20px ${color}`,
            }}
          />
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`text-lg font-bold ${
            feedback === 'correct' ? 'text-green-400' : feedback === 'wrong' ? 'text-red-400' : 'text-purple-300'
          }`}
        >
          {feedback === 'correct' && '✓ Correct!'}
          {feedback === 'wrong' && '✗ Wrong sequence!'}
          {feedback === 'ready' && 'Ready!'}
        </motion.div>
      )}

      <div className="text-xs text-gray-500 text-center">
        {feedback === 'wrong' ? 'Try again!' : isPlayingSequence ? 'Watch carefully...' : 'Your turn!'}
      </div>
    </div>
  );
}
