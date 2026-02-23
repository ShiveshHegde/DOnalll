'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        Okay, I messed up.
      </h1>
      <p className="text-lg md:text-xl text-pink-300">
        Like, really messed up.
      </p>
    </motion.div>
  );
}
