'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  Mistake,
  QuestionAttempt,
  PracticeTestResult,
  StudyPlan,
  Flashcard,
  ErrorCategory,
  Section
} from '@/types/sat';
import initialFlashcards from '@/data/flashcards.json';

const STORAGE_KEYS = {
  PROFILE: 'sat1600_profile',
  MISTAKES: 'sat1600_mistakes',
  ATTEMPTS: 'sat1600_attempts',
  TESTS: 'sat1600_tests',
  PLAN: 'sat1600_plan',
  FLASHCARDS: 'sat1600_flashcards',
  TIMER_LOGS: 'sat1600_timer_logs',
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Future 1600 Scorer',
  currentScore: 1320,
  currentMath: 680,
  currentRW: 640,
  targetScore: 1600,
  targetMath: 800,
  targetRW: 800,
  testDate: '2025-05-03',
  hoursPerWeek: 12,
  daysPerWeek: 5,
  strongestSection: 'math',
  weakestSection: 'reading-writing',
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 1450,
  completedQuestionsCount: 48,
};

const DEFAULT_MISTAKES: Mistake[] = [
  {
    id: 'mstk-1',
    questionId: 'm-adv-01',
    questionPrompt: 'The quadratic function f is defined by f(x) = 2x² - 12x + c. In the xy-plane, the graph of y = f(x) has exactly one x-intercept. What is the value of c?',
    section: 'math',
    domain: 'Advanced Math',
    topic: 'Quadratic Functions & Discriminant',
    difficulty: 'hard',
    studentAnswer: 'C',
    correctAnswer: 'B',
    explanation: 'Forgot to divide 144 by 8 after setting discriminant (-12)² - 4(2)(c) = 0.',
    errorType: 'calculation',
    notes: 'Remember discriminant formula b² - 4ac = 0 for single x-intercept.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    mastered: false,
  },
  {
    id: 'mstk-2',
    questionId: 'rw-exp-01',
    questionPrompt: 'In the early 1900s, Arthur Eddington posited radiation pressure... Most rejected this... _______ subsequent quantum mechanical models validated his core principle.',
    section: 'reading-writing',
    domain: 'Expression of Ideas',
    topic: 'Transitions',
    difficulty: 'hard',
    studentAnswer: 'D',
    correctAnswer: 'B',
    explanation: 'Chose "Furthermore" (continuation) instead of "Nevertheless" (contrast between rejection and validation).',
    errorType: 'misread',
    notes: 'Look at the attitude shift from "rejected" to "validated".',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    mastered: false,
  }
];

export function useStudentStore() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [attempts, setAttempts] = useState<QuestionAttempt[]>([]);
  const [practiceTests, setPracticeTests] = useState<PracticeTestResult[]>([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
      }

      const storedMistakes = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      if (storedMistakes) {
        setMistakes(JSON.parse(storedMistakes));
      } else {
        localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(DEFAULT_MISTAKES));
        setMistakes(DEFAULT_MISTAKES);
      }

      const storedAttempts = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      if (storedAttempts) setAttempts(JSON.parse(storedAttempts));

      const storedTests = localStorage.getItem(STORAGE_KEYS.TESTS);
      if (storedTests) {
        setPracticeTests(JSON.parse(storedTests));
      } else {
        const initialTest: PracticeTestResult = {
          id: 'test-bb-1',
          testName: 'Bluebook Official Practice Test #1',
          testType: 'bluebook',
          date: '2024-11-15',
          totalScore: 1320,
          mathScore: 680,
          rwScore: 640,
          mathCorrect: 37,
          mathTotal: 44,
          rwCorrect: 42,
          rwTotal: 54,
          weakestDomain: 'Standard English Conventions & Transitions',
          notes: 'Ran low on time during Reading Module 2. Pacing was fine in Math.',
        };
        setPracticeTests([initialTest]);
        localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify([initialTest]));
      }

      const storedCards = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
      if (storedCards) {
        setFlashcards(JSON.parse(storedCards));
      } else {
        const castCards = initialFlashcards as Flashcard[];
        setFlashcards(castCards);
        localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(castCards));
      }

      const storedPlan = localStorage.getItem(STORAGE_KEYS.PLAN);
      if (storedPlan) setStudyPlan(JSON.parse(storedPlan));

    } catch (err) {
      console.error('Error loading SAT 1600 local store:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(next));
      return next;
    });
  }, []);

  const recordAttempt = useCallback((attempt: QuestionAttempt) => {
    setAttempts(prev => {
      const next = [attempt, ...prev];
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(next));
      return next;
    });

    setProfile(prev => {
      const newXP = prev.xp + (attempt.isCorrect ? 25 : 10);
      const newCount = prev.completedQuestionsCount + 1;
      const next = { ...prev, xp: newXP, completedQuestionsCount: newCount };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(next));
      return next;
    });
  }, []);

  const addMistake = useCallback((mistake: Mistake) => {
    setMistakes(prev => {
      // Avoid duplicate mistake entries for identical question
      const filtered = prev.filter(m => m.questionId !== mistake.questionId);
      const next = [mistake, ...filtered];
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateMistake = useCallback((id: string, updates: Partial<Mistake>) => {
    setMistakes(prev => {
      const next = prev.map(m => (m.id === id ? { ...m, ...updates } : m));
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeMistake = useCallback((id: string) => {
    setMistakes(prev => {
      const next = prev.filter(m => m.id !== id);
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(next));
      return next;
    });
  }, []);

  const savePracticeTest = useCallback((test: PracticeTestResult) => {
    setPracticeTests(prev => {
      const next = [test, ...prev];
      localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(next));
      return next;
    });

    // Automatically adjust currentScore in profile
    updateProfile({
      currentScore: test.totalScore,
      currentMath: test.mathScore,
      currentRW: test.rwScore,
    });
  }, [updateProfile]);

  const toggleFlashcardKnown = useCallback((id: string) => {
    setFlashcards(prev => {
      const next = prev.map(c => (c.id === id ? { ...c, isKnown: !c.isKnown, repetitions: c.repetitions + 1 } : c));
      localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(next));
      return next;
    });
  }, []);

  const savePlan = useCallback((plan: StudyPlan) => {
    setStudyPlan(plan);
    localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
  }, []);

  // Compute analytics
  const mistakeAnalytics = {
    totalMistakes: mistakes.length,
    unmasteredCount: mistakes.filter(m => !m.mastered).length,
    mostFrequentError: (() => {
      if (mistakes.length === 0) return 'None yet';
      const counts: Record<string, number> = {};
      mistakes.forEach(m => {
        counts[m.errorType] = (counts[m.errorType] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      return sorted[0] ? `${sorted[0][0].replace('_', ' ')} (${sorted[0][1]} errors)` : 'None';
    })(),
    weakestDomain: (() => {
      if (mistakes.length === 0) return 'None identified';
      const counts: Record<string, number> = {};
      mistakes.forEach(m => {
        counts[m.domain] = (counts[m.domain] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      return sorted[0] ? sorted[0][0] : 'None';
    })(),
  };

  const exportAllData = () => {
    const backup = {
      profile,
      mistakes,
      attempts,
      practiceTests,
      studyPlan,
      flashcards,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(backup, null, 2);
  };

  const importAllData = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) {
        setProfile(data.profile);
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
      }
      if (data.mistakes) {
        setMistakes(data.mistakes);
        localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(data.mistakes));
      }
      if (data.practiceTests) {
        setPracticeTests(data.practiceTests);
        localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(data.practiceTests));
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  };

  return {
    isLoaded,
    profile,
    updateProfile,
    mistakes,
    addMistake,
    updateMistake,
    removeMistake,
    attempts,
    recordAttempt,
    practiceTests,
    savePracticeTest,
    flashcards,
    toggleFlashcardKnown,
    studyPlan,
    savePlan,
    mistakeAnalytics,
    exportAllData,
    importAllData,
  };
}
