export type Section = 'math' | 'reading-writing';

export type ErrorCategory =
  | 'conceptual'
  | 'careless'
  | 'misread'
  | 'vocabulary'
  | 'timing'
  | 'calculation'
  | 'strategy'
  | 'guessing'
  | 'changed_answer'
  | 'unknown_concept';

export interface Choice {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  section: Section;
  domain: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'trap-1550';
  prompt: string;
  passage?: string;
  equation?: string;
  choices: Choice[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  hints: string[];
  skill: string;
  verified: boolean;
}

export interface QuestionAttempt {
  id: string;
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpentSeconds: number;
  timestamp: string;
  section: Section;
  domain: string;
  topic: string;
}

export interface Mistake {
  id: string;
  questionId: string;
  questionPrompt: string;
  section: Section;
  domain: string;
  topic: string;
  difficulty: string;
  studentAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  errorType: ErrorCategory;
  notes?: string;
  timestamp: string;
  mastered: boolean;
}

export interface UserProfile {
  name: string;
  currentScore: number;
  currentMath: number;
  currentRW: number;
  targetScore: number;
  targetMath: number;
  targetRW: number;
  testDate: string;
  hoursPerWeek: number;
  daysPerWeek: number;
  strongestSection: Section;
  weakestSection: Section;
  streak: number;
  lastActiveDate: string;
  xp: number;
  completedQuestionsCount: number;
}

export interface StudyPlan {
  id: string;
  generatedAt: string;
  dailyMission: string[];
  weeklyTargets: string[];
  monthlyMilestones: string[];
  thirtyDayPlan: string[];
  sevenDayPlan: string[];
  recommendedTopics: string[];
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  isFree: boolean;
  isOfficial: boolean;
  type: 'official' | 'free' | 'practice' | 'course' | 'youtube' | 'book' | 'tool' | 'international';
  section: 'all' | 'math' | 'reading-writing';
  difficulty: 'all' | 'foundation' | 'advanced' | '1500+';
  bestFor: string;
  recommended: boolean;
}

export interface PracticeTestResult {
  id: string;
  testName: string;
  testType: 'bluebook' | 'paper' | 'custom';
  date: string;
  totalScore: number;
  mathScore: number;
  rwScore: number;
  mathCorrect: number;
  mathTotal: number;
  rwCorrect: number;
  rwTotal: number;
  weakestDomain: string;
  notes: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'vocab' | 'math' | 'grammar' | 'desmos';
  difficulty: 'easy' | 'medium' | 'hard';
  repetitions: number;
  intervalDays: number;
  isKnown: boolean;
}

export interface University {
  id: string;
  name: string;
  country: string;
  middle50SAT: [number, number];
  superscorePolicy: boolean;
  testingPolicy: 'Required' | 'Test-Optional' | 'Test-Blind';
  aidForInternational: boolean;
  admissionsUrl: string;
}

export interface SATDate {
  id: string;
  testDate: string;
  regDeadline: string;
  lateDeadline: string;
  scoreRelease: string;
  isInternational: boolean;
  notes: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  mode?: 'teach' | 'hint' | 'mistake' | 'quiz' | 'similar' | 'challenge';
  timestamp: string;
  verified?: boolean;
}
