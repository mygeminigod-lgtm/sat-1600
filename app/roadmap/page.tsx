'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Award,
  Target,
  Clock
} from 'lucide-react';

interface Phase {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  milestones: string[];
  recommendedAction: { label: string; href: string };
}

const PHASES: Phase[] = [
  {
    id: 1,
    title: 'Phase 1 — Diagnose & Establish Baseline',
    subtitle: 'Uncover your starting score, pacing bottlenecks, and domain breakdown without guessing.',
    duration: 'Week 1',
    milestones: [
      'Download and install College Board Bluebook™ testing app',
      'Take official Bluebook Practice Test #1 in one uninterrupted sitting',
      'Log section scores and calculate your baseline score in the Dashboard',
      'Enter all missed questions into your SAT Mistake Book',
    ],
    recommendedAction: { label: 'Log Practice Test 1', href: '/practice-test-analyzer' },
  },
  {
    id: 2,
    title: 'Phase 2 — Build Conceptual Foundations',
    subtitle: 'Close knowledge gaps across algebra, geometry, and standard English punctuation rules.',
    duration: 'Weeks 2 to 4',
    milestones: [
      'Master slope-intercept form, linear equations, and systems of linear equations',
      'Learn standard English sentence boundary rules (semicolons, colons, comma splices)',
      'Review high-frequency SAT vocabulary and root words',
      'Achieve 85%+ accuracy on all Easy and Medium foundation questions',
    ],
    recommendedAction: { label: 'Study Vocab & Grammar Flashcards', href: '/flashcards' },
  },
  {
    id: 3,
    title: 'Phase 3 — Target Domain Weaknesses',
    subtitle: 'Zero in on the specific topics that cost you points on your diagnostic exam.',
    duration: 'Weeks 5 to 7',
    milestones: [
      'Complete targeted question sets in your #1 weakest domain',
      'Master the discriminant formula (b² - 4ac) and quadratic vertex form',
      'Learn transition categories (Contrast, Continuation, Cause-and-Effect)',
      'Practice rhetorical synthesis notes to isolate student goals in under 45 seconds',
    ],
    recommendedAction: { label: 'Practice Weak Domains', href: '/practice' },
  },
  {
    id: 4,
    title: 'Phase 4 — Timed Module Practice & Desmos Mastery',
    subtitle: 'Develop lightning-fast execution speed to qualify for the hard Module 2 every time.',
    duration: 'Weeks 8 to 9',
    milestones: [
      'Master all Desmos calculator hacks (system solving, regression, sliders)',
      'Complete 35-minute timed module sprints with the Pomodoro timer',
      'Bank at least 8 minutes of review time on Module 1',
      'Eliminate time panic on long reading passages using targeted active reading',
    ],
    recommendedAction: { label: 'Launch Module Timer', href: '/timer' },
  },
  {
    id: 5,
    title: 'Phase 5 — Full-Length Official Simulations',
    subtitle: 'Build test-day stamina with official Bluebook proctored practice exams.',
    duration: 'Weeks 10 to 11',
    milestones: [
      'Complete Bluebook Practice Test #3 and #4 on Saturday mornings at 8:00 AM',
      'Conduct a 2-hour error autopsy on every missed question within 24 hours',
      'Track score trajectory toward your target in the Dashboard',
      'Test your exact test-day breakfast, snack, and break routine',
    ],
    recommendedAction: { label: 'Score Progress Tracker', href: '/dashboard' },
  },
  {
    id: 6,
    title: 'Phase 6 — Zero-Error Elimination',
    subtitle: 'Root out careless mistakes, misread stems, and subtle distractor traps.',
    duration: 'Week 12',
    milestones: [
      'Re-test every single question in your Mistake Book until 100% are mastered',
      'Implement the 3-Pass test-taking strategy: Pass 1 (solves), Pass 2 (flags), Pass 3 (audit)',
      'Practice double-checking question stems: did you solve for x or 2x + 1?',
      'Take final Bluebook Practice Test #5 or #6 to confirm readiness',
    ],
    recommendedAction: { label: '1600 Strategy Center', href: '/strategy-1600' },
  },
  {
    id: 7,
    title: 'Phase 7 — Final Test-Day Preparation',
    subtitle: 'Lock in logistics, verify international requirements, and optimize mental peak.',
    duration: 'Final 7 Days',
    milestones: [
      'Verify Bluebook exam setup and download test ticket 1-5 days before exam',
      'Check device battery health, charging cable, and electrical outlet adapters',
      'Confirm original valid passport / national ID matches registration character-for-character',
      'Review test-day packing checklist and get 8+ hours of sleep for 3 consecutive nights',
    ],
    recommendedAction: { label: 'Test-Day Checklist', href: '/test-day' },
  },
];

export default function RoadmapPage() {
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  const toggleMilestone = (key: string) => {
    setCompletedMilestones((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalMilestones = PHASES.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalMilestones) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Compass className="w-3.5 h-3.5" /> Systematic Progression
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          7-Phase Interactive SAT Roadmap
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          From diagnostic baseline to your 1600 attempt. Check off milestones as you execute each phase.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Overall Roadmap Completion
          </span>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span>{completedCount} of {totalMilestones} Milestones Achieved</span>
            <span className="text-xs font-mono text-emerald-400">({progressPercent}%)</span>
          </div>
        </div>

        <div className="w-full sm:w-64 bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Visual Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:h-full before:w-0.5 before:bg-slate-800">
        {PHASES.map((phase) => (
          <div key={phase.id} className="relative flex items-start gap-4 sm:gap-6 group">
            {/* Phase Number Node */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 text-slate-200 group-hover:border-emerald-500 group-hover:text-emerald-400 flex flex-col items-center justify-center font-black font-mono shrink-0 z-10 transition-colors shadow-lg shadow-black/40">
              <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Phase</span>
              <span className="text-base sm:text-xl leading-none mt-0.5">{phase.id}</span>
            </div>

            {/* Phase Card */}
            <div className="flex-1 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{phase.subtitle}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                  {phase.duration}
                </span>
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-2.5">
                {phase.milestones.map((m, idx) => {
                  const mKey = `${phase.id}-${idx}`;
                  const isDone = completedMilestones[mKey];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleMilestone(mKey)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                        isDone ? 'bg-emerald-500/5 text-slate-400' : 'hover:bg-slate-800/60 text-slate-200'
                      }`}
                    >
                      <button className="mt-0.5 text-emerald-400 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-slate-950" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 hover:text-emerald-400" />
                        )}
                      </button>
                      <span className={`text-xs sm:text-sm ${isDone ? 'line-through text-slate-500' : ''}`}>
                        {m}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Recommended Action */}
              <div className="pt-2 flex justify-end">
                <Link
                  href={phase.recommendedAction.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {phase.recommendedAction.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* The 1600 Final Goal Post */}
        <div className="relative flex items-center gap-4 sm:gap-6 pt-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black font-mono shrink-0 z-10 shadow-xl shadow-amber-500/30">
            <Award className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/40 flex-1">
            <h3 className="text-lg sm:text-xl font-black text-amber-300">
              Official 1600 Test Day Attempt
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              You have systematically completed all 7 phases, eliminated careless mistakes, mastered Desmos, and locked in your test day endurance. Trust your preparation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
