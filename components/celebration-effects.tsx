'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CelebrationEffectsProps {
  isActive: boolean;
  level?: number;
}

const Confetti = ({ index }: { index: number }) => {
  const emojis = ['❤️', '💜', '✨', '🎉', '💖', '⭐', '🌟', '💝'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const randomDelay = Math.random() * 0.3;
  const randomDuration = 2.5 + Math.random() * 1;
  const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 800;
  const randomY = typeof window !== 'undefined' ? window.innerHeight : 600;
  const randomVX = (Math.random() - 0.5) * 200;
  const randomVY = -Math.random() * 300;

  return (
    <motion.div
      className="fixed pointer-events-none text-4xl md:text-5xl drop-shadow-lg"
      initial={{
        x: randomX,
        y: randomY,
        opacity: 1,
        rotate: 0,
        scale: 0.8,
      }}
      animate={{
        x: randomX + randomVX,
        y: randomY + randomVY,
        opacity: 0,
        rotate: Math.random() * 720,
        scale: [0.8, 1.2, 0.6],
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

const ParticleRain = () => {
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <>
      {particles.map((i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 blur-sm"
          initial={{
            x: Math.random() * typeof window !== 'undefined' ? window.innerWidth : 800,
            y: -20,
            opacity: 1,
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight : 600,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            delay: Math.random() * 0.3,
            ease: 'easeIn',
          }}
        />
      ))}
    </>
  );
};

const SpiralEffect = () => {
  return (
    <motion.div className="fixed inset-0 pointer-events-none" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 2, duration: 0.5 }}>
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <motion.circle
          cx="200"
          cy="200"
          r="50"
          stroke="url(#spiralGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ r: 20, opacity: 1 }}
          animate={{ r: 200, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="1" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export function CelebrationEffects({ isActive, level = 5 }: CelebrationEffectsProps) {
  const [confetti, setConfetti] = useState<number[]>([]);
  const [showRain, setShowRain] = useState(false);

  useEffect(() => {
    if (isActive) {
      setConfetti(Array.from({ length: 30 + level * 5 }, (_, i) => i));
      setShowRain(true);
      setTimeout(() => {
        setConfetti([]);
        setShowRain(false);
      }, 3000);
    }
  }, [isActive, level]);

  const messages = [
    "You're forgiven, you dork! 💜",
    "I appreciate your effort! ✨",
    "This means the world to me! 💖",
    "Let's make it right! 🌟",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <>
            <SpiralEffect />

            <motion.div
              className="fixed inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="text-center">
                <motion.h2
                  className="text-3xl md:text-6xl font-bold text-white drop-shadow-2xl mb-4 text-balance"
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }}
                >
                  {randomMessage}
                </motion.h2>

                <motion.div
                  className="flex justify-center gap-2 text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {['💜', '✨', '💖'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {showRain && <ParticleRain />}
          </>
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
