'use client';

import { GameProvider, useGame } from '@/components/game-engine';
import { PuzzleContainer } from '@/components/puzzle-container';
import { GemScene } from '@/components/gem-scene';
import { CelebrationEffects } from '@/components/celebration-effects';
import { FinalCelebration } from '@/components/final-celebration';
import { motion } from 'framer-motion';

function GameContent() {
  const { gameState } = useGame();

  if (gameState.gameComplete) {
    return (
      <>
        <CelebrationEffects isActive={true} level={5} />
        <FinalCelebration />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Apology Quest
          </h1>
          <p className="text-gray-300">Solve puzzles and unlock heartfelt apologies</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <GemScene
              onGemClick={() => {}}
              isAnimating={gameState.isAnimating}
              gemColor={gameState.gemColor}
              level={gameState.currentLevel}
            />

            <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-8">
              <PuzzleContainer />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4">Journey Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Current Level:</span>
                    <span className="font-bold text-purple-300">{gameState.currentLevel}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Completed:</span>
                    <span className="font-bold text-green-400">{gameState.completedLevels.length}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Apologies Unlocked:</span>
                    <span className="font-bold text-pink-400">{gameState.unlockedApologies.length}/5</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-purple-400/30">
                    <span className="text-gray-300">Total Score:</span>
                    <span className="font-bold text-yellow-400">{gameState.score}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4">Tips</h3>
                <ul className="text-xs text-gray-300 space-y-2">
                  <li>Pay attention to patterns and details</li>
                  <li>Each puzzle reveals a new perspective</li>
                  <li>Your answers matter!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
