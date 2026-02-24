'use client';

import { useGame } from '@/components/game-engine';
import { PatternMemory } from '@/components/puzzles/pattern-memory';
import { WordUnscramble } from '@/components/puzzles/word-unscramble';
import { EmotionQuiz } from '@/components/puzzles/emotion-quiz';
import { ColorSequence } from '@/components/puzzles/color-sequence';
import { AffirmationSelection } from '@/components/puzzles/affirmation-selection';
import { ProgressTracker } from '@/components/progress-tracker';
import { UnlockedApologies } from '@/components/unlocked-apologies';

export function PuzzleContainer() {
  const { gameState, getCurrentPuzzle } = useGame();

  const puzzle = getCurrentPuzzle();

  if (!puzzle) {
    return null;
  }

  const renderPuzzle = () => {
    switch (puzzle.type) {
      case 'pattern':
        return <PatternMemory />;
      case 'word':
        return <WordUnscramble />;
      case 'emotion':
        return <EmotionQuiz />;
      case 'color':
        return <ColorSequence />;
      case 'affirmation':
        return <AffirmationSelection />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-8">
      <ProgressTracker />

      <div className="border-t border-slate-700 pt-8">
        {renderPuzzle()}
      </div>

      <UnlockedApologies />
    </div>
  );
}
