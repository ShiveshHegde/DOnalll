'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { GemScene } from '@/components/gem-scene';
import { ApologyCard } from '@/components/apology-card';
import { ForgivenessButton } from '@/components/forgiveness-button';
import { CelebrationEffects } from '@/components/celebration-effects';
import { Footer } from '@/components/footer';

export default function Home() {
  const [isForgiving, setIsForgiving] = useState(false);

  const handleForgiveness = () => {
    setIsForgiving(true);
    setTimeout(() => setIsForgiving(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      <CelebrationEffects isActive={isForgiving} />

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="w-full">
            <GemScene onGemClick={handleForgiveness} isAnimating={isForgiving} />
          </div>

          <div className="w-full">
            <ApologyCard />
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <ForgivenessButton onClick={handleForgiveness} />
        </div>

        <Footer />
      </div>
    </main>
  );
}
