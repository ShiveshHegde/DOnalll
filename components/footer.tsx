'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      className="text-center text-white/60 text-sm mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <p>Made with shame, love, and a lot of code. 🖤</p>
    </motion.footer>
  );
}
