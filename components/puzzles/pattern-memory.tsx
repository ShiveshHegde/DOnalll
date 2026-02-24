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
  const maxSteps = 3; // Reduced from 5 to 3 for easier gameplay

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
      await new Promise((resolve) => setTimeout(resolve, 500));
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
      if (sequence.length === maxSteps) {
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
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-1">Pattern Memory</h2>
        <p className="text-xs text-gray-400">Repeat the sequence!</p>
      </div>

      <div className="flex gap-3 mb-2">
        {Array.from({ length: maxSteps }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-6 h-1 rounded-full transition-all ${
              i < sequence.length ? 'bg-purple-500' : 'bg-slate-700'
            }`}
            animate={i === sequence.length - 1 && isPlayingSequence ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {colors.map((color, index) => (
          <motion.button
            key={index}
            onClick={() => handleColorClick(index)}
            disabled={isPlayingSequence}
            whileHover={!isPlayingSequence ? { scale: 1.1 } : {}}
            whileTap={!isPlayingSequence ? { scale: 0.9 } : {}}
            className="w-20 h-20 rounded-xl transition-all disabled:opacity-70 shadow-2xl border-2 border-white/20"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 25px ${color}, inset 0 0 15px rgba(255,255,255,0.3)`,
            }}
          />
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-sm font-bold ${
            feedback === 'correct' ? 'text-green-400' : feedback === 'wrong' ? 'text-red-400' : 'text-purple-300'
          }`}
        >
          {feedback === 'correct' && '✓ Great!'}
          {feedback === 'wrong' && '✗ Try again!'}
          {feedback === 'ready' && isPlayingSequence ? 'Watch...' : 'Your turn!'}
        </motion.div>
      )}

      <div className="text-xs text-gray-500">
        Step: {userSequence.length}/{sequence.length} | Total: {sequence.length}/{maxSteps}
      </div>
    </div>
  );
}
