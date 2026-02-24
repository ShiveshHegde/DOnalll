'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const photos = [
  { src: '/couple-1.jpg', alt: 'Together moment 1' },
  { src: '/couple-2.jpg', alt: 'Together moment 2' },
  { src: '/couple-3.jpg', alt: 'Together moment 3' },
  { src: '/couple-4.jpg', alt: 'Together moment 4' },
];

export function FinalCelebration() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            My Heartfelt Apology
          </h1>
          <p className="text-lg text-gray-300">A promise to be better</p>
        </motion.div>

        {/* Photo Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative h-96 overflow-hidden rounded-2xl shadow-2xl">
            <motion.div
              className="flex h-full"
              animate={{ x: ['0%', '-100%', '-200%', '-300%', '0%'] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...photos, ...photos].map((photo, index) => (
                <div key={index} className="min-w-full h-full relative flex-shrink-0">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 pointer-events-none" />
          </div>
        </motion.div>

        {/* Main Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-gray-200 text-justify mb-6">
              I've been thinking a lot about how I treated you, and honestly, I feel terrible about it. You didn't deserve any of that, and I know that an apology might seem too little too late, but I need you to know that I mean every single word of this. Looking back at what happened, I can see clearly how wrong I was. I let my emotions get the better of me, and instead of talking to you like I should have, I just shut you out. That was selfish and unfair to you, especially when you've always been there for me through thick and thin.
            </p>

            <p className="text-lg leading-relaxed text-gray-200 text-justify mb-6">
              The truth is, you mean so much to me, and losing your trust or hurting you is one of my deepest regrets. I've spent countless hours thinking about all the ways I could have handled things differently, all the words I wish I could take back, and all the moments I wish I could redo. But I can't change the past, and I know that. What I can do is promise you that I will do everything in my power to be better. Not just for you, but for us, because our relationship is too valuable to let it fall apart because of my mistakes.
            </p>

            <p className="text-lg leading-relaxed text-gray-200 text-justify mb-6">
              I understand if you need time before you're ready to forgive me, and I respect that completely. I'm not asking for your forgiveness right now, I'm just asking for a chance to prove to you that I've learned from this. I want to listen better, communicate more openly, and most importantly, I want to show you through my actions that you truly matter to me. You've always been someone I can count on, and I promise to be that person for you too. I'm sorry for every moment I made you feel like you weren't important, because you are. You're incredibly important to me, and I hope someday you'll let me show you just how much you mean to me.
            </p>

            <p className="text-lg leading-relaxed text-gray-200 text-justify">
              Thank you for giving me this chance to express myself, and for even considering my apology. No matter what happens next, I want you to know that I will always cherish the memories we've shared and the bond we have. You deserve nothing but kindness, respect, and love, and I promise to give you all of that and more. I'm genuinely sorry for hurting you, and I mean it with all my heart.
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-12 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          {['💜', '✨', '💖'].map((emoji, i) => (
            <motion.div
              key={i}
              className="text-5xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
