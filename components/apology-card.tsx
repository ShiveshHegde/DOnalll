'use client';

import { motion } from 'framer-motion';

const paragraphs = [
  "I should have thought about how my actions would affect you. You deserve better than that, and I'm genuinely sorry for letting you down.",
  "There's no excuse for what I did, but I want you to know that I understand why you're upset. You have every right to be.",
  "I value you more than you know, and losing your trust is something that genuinely hurts. I'm committed to doing better, being better, and earning back what I messed up.",
  "This isn't just empty words—I mean it. You're important to me, and I want to make this right.",
];

export function ApologyCard() {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-400/30 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            className="text-white/90 text-lg leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
