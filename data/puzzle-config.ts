export interface Puzzle {
  id: number;
  level: number;
  type: 'pattern' | 'word' | 'emotion' | 'color' | 'affirmation';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ApologyMessage {
  id: number;
  level: number;
  text: string;
  emoji: string;
  tone: 'funny' | 'self-deprecating' | 'sincere' | 'sweet';
}

export const PUZZLES: Puzzle[] = [
  {
    id: 1,
    level: 1,
    type: 'pattern',
    title: 'Remember the Pattern',
    description: 'Watch the gem change colors, then repeat the sequence!',
    difficulty: 'easy',
  },
  {
    id: 2,
    level: 2,
    type: 'word',
    title: 'Unscramble the Words',
    description: 'Rearrange the letters to find apology-related words.',
    difficulty: 'easy',
  },
  {
    id: 3,
    level: 3,
    type: 'emotion',
    title: 'What Was I Feeling?',
    description: 'Choose the emotion that best describes my regret.',
    difficulty: 'medium',
  },
  {
    id: 4,
    level: 4,
    type: 'color',
    title: 'Color Sequence Challenge',
    description: 'Follow the color pattern and complete the sequence.',
    difficulty: 'hard',
  },
  {
    id: 5,
    level: 5,
    type: 'affirmation',
    title: 'Affirmation Selection',
    description: 'Choose the affirmations that describe our relationship.',
    difficulty: 'medium',
  },
];

export const APOLOGIES: ApologyMessage[] = [
  {
    id: 1,
    level: 1,
    emoji: '🤦',
    tone: 'funny',
    text: "I was being an absolute potato brain. Like, seriously, what was I thinking? 🥔",
  },
  {
    id: 2,
    level: 2,
    emoji: '🤐',
    tone: 'self-deprecating',
    text: "My bad was bigger than my brain. Honestly, I deserve the eye rolls I got. 👀",
  },
  {
    id: 3,
    level: 3,
    emoji: '💔',
    tone: 'sincere',
    text: "I hurt someone I care about deeply, and that weight sits with me. I'm genuinely sorry.",
  },
  {
    id: 4,
    level: 4,
    emoji: '✨',
    tone: 'sweet',
    text: "You deserve better, and I promise to be better. You mean too much to me to mess up like that.",
  },
  {
    id: 5,
    level: 5,
    emoji: '💜',
    tone: 'sincere',
    text: "I'm sorry for not being the person you needed in that moment. I love you and I want to make this right.",
  },
];

export const COLOR_SEQUENCE = ['#EC4899', '#8B5CF6', '#06B6D4', '#FBBF24', '#EC4899'];

export const EMOTION_OPTIONS = [
  { text: 'Regretful', value: 'regretful', emoji: '😔' },
  { text: 'Ashamed', value: 'ashamed', emoji: '😳' },
  { text: 'Defensive', value: 'defensive', emoji: '🛡️' },
  { text: 'Confused', value: 'confused', emoji: '🤔' },
];

export const AFFIRMATION_OPTIONS = [
  { text: 'You\'re important to me', emoji: '⭐' },
  { text: 'I respect you', emoji: '🙏' },
  { text: 'I value your friendship', emoji: '💎' },
  { text: 'You deserve an apology', emoji: '✨' },
  { text: 'I want to fix this', emoji: '🔧' },
  { text: 'You\'re worth my effort', emoji: '💪' },
];

export const WORD_UNSCRAMBLE = [
  { scrambled: 'ISORYR', correct: 'SORRY' },
  { scrambled: 'SGENOFIVR', correct: 'FORGIVEN' },
  { scrambled: 'REPAIR', correct: 'REPAIR' },
  { scrambled: 'TRUST', correct: 'TRUST' },
];
