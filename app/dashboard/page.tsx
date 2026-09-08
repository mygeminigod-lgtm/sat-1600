'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Target,
  Flame,
  CheckCircle2,
  Calendar,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  BookmarkCheck,
  AlertTriangle,
  Award,
  Sparkles,
  BookOpen,
  Timer
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';

export default function DashboardPage() {
  const { profile, mistakes, mistakeAnalytics, practiceTests } = useStudentStore();

  const [missionsCompleted, setMissionsCompleted] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  const dailyMissions = [
    { title: 'Complete 15 Advanced Math & System questions', time: '20 min', link: '/practice?domain=Advanced Math' },
    { title: 'Review 10 Digital SAT Vocabulary & Transitions flashcards', time: '10 min', link: '/flashcards' },
    { title: 'Complete 1 timed Reading/Writing adaptive module', time: '32 min', link: '/practice?timed=true' },
    { title: 'Analyze yesterday’s mistakes in the Mistake Book', time: '15 min', link: '/mistake-book' },
  ];

  const toggleMission = (idx: number) => {
    setMissionsCompleted(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const progressPercentage = Math.min(
    100,
    Math.round(((profile.currentScore - 600) / (profile.targetScore - 600)) * 100)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* 1. Header & Quick Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, <span className="text-emerald-400">{profile.name}</span>
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
              LVL {Math.floor(profile.xp / 500) + 1}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Next official SAT date: <strong className="text-slate-200">{profile.testDate}</strong> • Target: <strong className="text-amber-400 font-bold">{profile.targetScore}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/timer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <Timer className="w-4 h-4 text-emerald-400" /> Start Pomodoro
          </Link>
          <Link
            href="/ai-tutor"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <BrainCircuit className="w-4 h-4" /> Ask AI Coach
          </Link>
        </div>
      </div>

      {/* 2. Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Goal Progress */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Score Target</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-white">{profile.currentScore}</span>
            <span className="text-xs text-slate-400 font-mono">/ {profile.targetScore}</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>{progressPercentage}% of journey</span>
            <span className="text-emerald-400 font-bold">+{profile.targetScore - profile.currentScore} to 1600</span>
          </p>
        </div>

        {/* Card 2: Streak & XP */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Study Streak</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-amber-400">{profile.streak}</span>
            <span className="text-xs text-slate-400 font-semibold">Days Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Total XP earned: <strong className="text-slate-200 font-mono">{profile.xp} XP</strong>
          </p>
          <p className="text-[10px] text-emerald-400 mt-1">Study today to keep your streak alive!</p>
        </div>

        {/* Card 3: Math Status */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Math Section</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">Goal: 800</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-white">{profile.currentMath}</span>
            <span className="text-xs text-slate-400 font-mono">/ 800</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Accuracy: <strong className="text-emerald-400 font-semibold">84%</strong> across 28 questions
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Top focus: Quadratic discriminants</p>
        </div>

        {/* Card 4: Reading & Writing Status */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reading & Writing</span>
            <span className="text-xs font-mono text-purple-400 font-bold">Goal: 800</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-white">{profile.currentRW}</span>
            <span className="text-xs text-slate-400 font-mono">/ 800</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Accuracy: <strong className="text-purple-400 font-semibold">78%</strong> across 20 questions
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Top focus: Logical transitions</p>
        </div>
      </div>

      {/* 3. Main Dashboard Body: Today's Mission & Weak Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Mission & Automated Recommendation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Automated AI Recommendation Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">AI Coach Recommendation</h3>
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                    High Priority
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Based on your latest attempt, your primary bottleneck is <strong className="text-emerald-400">Transitions</strong> in Reading & Writing (58% accuracy) and <strong className="text-emerald-400">Advanced Math</strong>.
                  Mastering these two skills will raise your projected score from {profile.currentScore} to <strong>{profile.currentScore + 60}</strong>.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Link
                    href="/practice?domain=Expression of Ideas"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Practice Transitions Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/ai-tutor?mode=teach&topic=Transitions"
                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Teach Me Concept →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Mission Checklist */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Today&apos;s Mission
                </h3>
                <p className="text-xs text-slate-400">
                  4 targeted tasks tailored to your 1600 study plan
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {Object.values(missionsCompleted).filter(Boolean).length} / 4 Done
              </span>
            </div>

            <div className="space-y-3">
              {dailyMissions.map((mission, idx) => {
                const isDone = missionsCompleted[idx];
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-400'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleMission(idx)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-600 hover:border-emerald-400'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                      <span className={`text-xs sm:text-sm font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {mission.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-500">{mission.time}</span>
                      <Link
                        href={mission.link}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Start →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Practice Tests */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Practice Test History
                </h3>
                <p className="text-xs text-slate-400">Bluebook tests & official simulations</p>
              </div>
              <Link
                href="/practice-test-analyzer"
                className="text-xs font-semibold text-emerald-400 hover:underline"
              >
                + Log New Test
              </Link>
            </div>

            <div className="space-y-3">
              {practiceTests.map((test) => (
                <div
                  key={test.id}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{test.testName}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Taken on {test.date} • Weakest: <span className="text-amber-400">{test.weakestDomain}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-black font-mono text-white">{test.totalScore}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        M: {test.mathScore} | RW: {test.rwScore}
                      </div>
                    </div>
                    <Link
                      href="/practice-test-analyzer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                    >
                      Analyze
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Weak Areas & Mistake Summary */}
        <div className="space-y-6">
          {/* Domain Breakdown & Weak Areas */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-1">Domain Accuracy Breakdown</h3>
            <p className="text-xs text-slate-400 mb-4">Areas requiring immediate reinforcement</p>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Math Domains</span>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Advanced Math</span>
                      <span className="font-mono text-amber-400 font-bold">62%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '62%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Problem Solving & Data</span>
                      <span className="font-mono text-emerald-400 font-bold">74%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '74%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Geometry & Trig</span>
                      <span className="font-mono text-emerald-400 font-bold">86%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '86%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300 block mb-2">Reading & Writing Domains</span>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Transitions</span>
                      <span className="font-mono text-rose-400 font-bold">58%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '58%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Rhetorical Synthesis</span>
                      <span className="font-mono text-amber-400 font-bold">68%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Grammar Boundaries</span>
                      <span className="font-mono text-emerald-400 font-bold">81%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '81%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/practice"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Practice Weak Areas Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mistake Book Quick Glance */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                Mistake Book Status
              </h3>
              <Link href="/mistake-book" className="text-xs text-amber-400 hover:underline">
                View All
              </Link>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 mb-3">
              <span className="text-[11px] text-slate-400 block mb-1">#1 Source of Lost Points:</span>
              <strong className="text-xs text-white capitalize">{mistakeAnalytics.mostFrequentError}</strong>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              You have <strong className="text-amber-400 font-mono">{mistakeAnalytics.unmasteredCount}</strong> logged mistakes awaiting review.
            </p>
            <Link
              href="/mistake-book"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
            >
              Review My Mistake Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
