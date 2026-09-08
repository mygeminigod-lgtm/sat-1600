 'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SATResource, SmartRecommendationQuery, RecommendationStep } from '@/types/resource';
import { SAT_RESOURCES_DATA } from '@/data/satResourcesData';

const STORAGE_KEY = 'sat_1600_custom_resources_v2';
const BOOKMARKS_KEY = 'sat_1600_resource_bookmarks';

export function useSATResources() {
  const [resources, setResources] = useState<SATResource[]>(SAT_RESOURCES_DATA);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Hydrate from localStorage on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResources(parsed);
        }
      }

      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (storedBookmarks) {
        setBookmarkedIds(JSON.parse(storedBookmarks));
      }
    } catch (e) {
      console.error('Failed to load resources from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage
  const persistResources = useCallback((newResources: SATResource[]) => {
    setResources(newResources);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newResources));
    } catch (e) {
      console.error('Failed to persist resources', e);
    }
  }, []);

  // Bookmark management
  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to persist bookmarks', e);
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarkedIds.includes(id), [bookmarkedIds]);

  // CRUD Operations
  const addResource = useCallback((newResource: SATResource) => {
    const updated = [newResource, ...resources];
    persistResources(updated);
  }, [resources, persistResources]);

  const updateResource = useCallback((id: string, updates: Partial<SATResource>) => {
    const updated = resources.map((r) => (r.id === id ? { ...r, ...updates } : r));
    persistResources(updated);
  }, [resources, persistResources]);

  const deleteResource = useCallback((id: string) => {
    const updated = resources.filter((r) => r.id !== id);
    persistResources(updated);
  }, [resources, persistResources]);

  const toggleOfficial = useCallback((id: string) => {
    const target = resources.find((r) => r.id === id);
    if (!target) return;
    updateResource(id, {
      official: !target.official,
      qualityStatus: !target.official ? 'Official' : 'Third-Party',
    });
  }, [resources, updateResource]);

  const toggleRecommended = useCallback((id: string) => {
    const target = resources.find((r) => r.id === id);
    if (!target) return;
    updateResource(id, { recommended: !target.recommended });
  }, [resources, updateResource]);

  const updateLastChecked = useCallback((id: string) => {
    const today = new Date().toISOString().split('T')[0];
    updateResource(id, { lastChecked: today });
  }, [updateResource]);

  const resetToDefault = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setResources(SAT_RESOURCES_DATA);
  }, []);

  const exportResourcesJSON = useCallback(() => {
    const jsonStr = JSON.stringify(resources, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sat-resources-verified-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [resources]);

  // Recommendation Generator for "What should I use?"
  const generateRecommendations = useCallback((query: SmartRecommendationQuery): RecommendationStep[] => {
    const { currentScore, targetScore, weakSection, studyTime } = query;
    const steps: RecommendationStep[] = [];

    // Step 1: Baseline Diagnostic / Calibration
    steps.push({
      stepNumber: 1,
      title: 'Establish Authentic Bluebook Diagnostic Baseline',
      purpose: 'Obtain an unvarnished adaptive score under exact official conditions to pinpoint root weaknesses.',
      primaryResourceId: 'collegeboard-bluebook',
      secondaryResourceId: 'practice-tests-bluebook-official',
      timeAllocation: 'Week 1 (2.5 hours)',
      tacticalAdvice: 'Take Bluebook Test #1 in one sitting on a Saturday morning. Do not pause the timer or look up formulas.',
    });

    // Step 2: Foundational or Section-Specific Content Bridge
    if (weakSection === 'Math' || weakSection === 'Both') {
      if (currentScore < 1300) {
        steps.push({
          stepNumber: 2,
          title: 'Master SAT Algebra & Linear Equation Modeling',
          purpose: 'Linear equations represent ~35% of SAT Math. Lock in 100% accuracy on slope, systems, and inequalities.',
          primaryResourceId: 'sat-math-algebra-mastery',
          secondaryResourceId: 'desmos-sat-calculator',
          timeAllocation: 'Daily 45 min across Weeks 1-2',
          tacticalAdvice: 'Focus on translating word problems into equations. Learn to solve systems instantly using Desmos intersection.',
        });
      } else {
        steps.push({
          stepNumber: 2,
          title: 'Conquer Advanced Math & Quadratic Traps',
          purpose: 'Eliminate errors on parabolas, circle theorems, rational functions, and discriminant questions.',
          primaryResourceId: 'sat-math-advanced-math',
          secondaryResourceId: 'college-panda-math',
          timeAllocation: '3-4 hours per week',
          tacticalAdvice: 'Study vertex form and discriminant analysis. Practice finding roots without manual factoring using Desmos.',
        });
      }
    } else {
      steps.push({
        stepNumber: 2,
        title: 'Master Standard English Conventions & Clause Boundaries',
        purpose: 'Grammar is rule-based and provides the fastest guaranteed score increase in Reading & Writing.',
        primaryResourceId: 'erica-meltzer-grammar',
        secondaryResourceId: 'purdue-owl-sat-grammar',
        timeAllocation: '30 min daily',
        tacticalAdvice: 'Memorize comma splice rules and transition relationships (Contrast vs Cause/Effect).',
      });
    }

    // Step 3: Targeted Authentic Drills
    if (weakSection === 'Reading & Writing' || weakSection === 'Both') {
      steps.push({
        stepNumber: 3,
        title: 'Targeted Reading & Writing Question Bank Drills',
        purpose: 'Drill authentic College Board items for Information & Ideas and Rhetorical Synthesis.',
        primaryResourceId: 'collegeboard-question-bank',
        secondaryResourceId: 'sat-rhetorical-synthesis-guide',
        timeAllocation: '40 min alternate days',
        tacticalAdvice: 'Apply the "Goal-First" method on bullet-point synthesis questions. Do not read the notes until you read what the student wants to accomplish.',
      });
    } else {
      steps.push({
        stepNumber: 3,
        title: 'High-Yield Desmos Graphing Speed Tricks',
        purpose: 'Transform complex algebra problems into 20-second graphical visual checks.',
        primaryResourceId: 'desmos-sat-calculator',
        secondaryResourceId: 'preppros-youtube',
        timeAllocation: '1 hour weekly video walkthrough',
        tacticalAdvice: 'Learn regression syntax (`y1 ~ mx1 + b`), slider roots, and system graphing.',
      });
    }

    // Step 4: Socratic Mistake Analysis
    steps.push({
      stepNumber: 4,
      title: 'Log Every Error in the Mistake Book with AI Diagnosis',
      purpose: 'Score growth comes from eliminating repeated mistake patterns, not mindless problem grinding.',
      primaryResourceId: 'sat-1600-ai-coach',
      secondaryResourceId: 'khan-academy-khanmigo',
      timeAllocation: '15 min after every practice session',
      tacticalAdvice: 'Categorize each error as Conceptual, Careless, or Timing. Never move on until you can explain why the wrong answer was written to fool you.',
    });

    // Step 5: Full-Length Timed Endurance Simulation
    if (targetScore >= 1500) {
      steps.push({
        stepNumber: 5,
        title: 'Elite 1500+ Hard Practice & Bluebook Mock Tests',
        purpose: 'Build mental stamina and refine module pacing to finish with 5-7 minutes of checking time.',
        primaryResourceId: 'dr-chung-sat-math',
        secondaryResourceId: 'practice-tests-bluebook-official',
        timeAllocation: 'Every other Saturday morning',
        tacticalAdvice: 'Practice the 3-pass pacing strategy: Pass 1 for instant solves, Pass 2 for moderate calculations, Pass 3 for tricky 1550+ traps.',
      });
    } else {
      steps.push({
        stepNumber: 5,
        title: 'Periodic Timed Mock Tests & Milestone Calibration',
        purpose: 'Verify that score gains on untimed practice are translating into actual timed performance.',
        primaryResourceId: 'practice-tests-bluebook-official',
        secondaryResourceId: 'scalar-learning-youtube',
        timeAllocation: 'Every 2 weeks',
        tacticalAdvice: 'Review all missed and flagged questions within 24 hours while your thought process is still fresh.',
      });
    }

    return steps;
  }, []);

  return {
    resources,
    bookmarkedIds,
    isInitialized,
    toggleBookmark,
    isBookmarked,
    addResource,
    updateResource,
    deleteResource,
    toggleOfficial,
    toggleRecommended,
    updateLastChecked,
    resetToDefault,
    exportResourcesJSON,
    generateRecommendations,
  };
}
