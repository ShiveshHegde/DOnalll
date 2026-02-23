'use client';

import { motion } from 'framer-motion';

interface ForgivenessButtonProps {
  onClick: () => void;
}

export function ForgivenessButton({ onClick }: ForgivenessButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-500/50"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      Click to Forgive Me 💜
    </motion.button>
  );
}
