'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CelebrationEffectsProps {
  isActive: boolean;
}

const Confetti = ({ index }: { index: number }) => {
  const emojis = ['❤️', '💜', '✨', '🎉', '💖', '⭐', '🌟', '💝'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const randomDelay = Math.random() * 0.2;
  const randomDuration = 2 + Math.random() * 0.5;
  const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 800;
  const randomY = typeof window !== 'undefined' ? window.innerHeight : 600;

  return (
    <motion.div
      className="fixed pointer-events-none text-4xl md:text-5xl"
      initial={{
        x: randomX,
        y: randomY,
        opacity: 1,
        rotate: 0,
      }}
      animate={{
        y: -100,
        opacity: 0,
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: 'easeOut',
      }}
      key={index}
    >
      {randomEmoji}
    </motion.div>
  );
};

export function CelebrationEffects({ isActive }: CelebrationEffectsProps) {
  const [confetti, setConfetti] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      setConfetti(Array.from({ length: 20 }, (_, i) => i));
      setTimeout(() => setConfetti([]), 2500);
    }
  }, [isActive]);

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center text-white drop-shadow-2xl"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
              You're forgiven, you dork! 💜
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confetti.map((item) => (
          <Confetti key={item} index={item} />
        ))}
      </AnimatePresence>
    </>
  );
}
