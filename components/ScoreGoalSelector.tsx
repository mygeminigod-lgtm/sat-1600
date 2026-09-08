'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Clock, Calendar, CheckCircle, TrendingUp } from 'lucide-react';
import { useStudentStore } from '@/lib/store';

export default function ScoreGoalSelector() {
  const router = useRouter();
  const { profile, updateProfile } = useStudentStore();

  const [currentScore, setCurrentScore] = useState<number>(profile.currentScore || 1200);
  const [goalScore, setGoalScore] = useState<number>(1600);
  const [testDate, setTestDate] = useState<string>('2025-05-03');

  // Calculate calculations
  const journeyMetrics = useMemo(() => {
    const diff = Math.max(0, goalScore - currentScore);
    // Rough empirical rule: ~10-15 study hours per 10-point gain at higher tiers
    const estimatedHours = Math.round(diff * 0.45);

    const now = new Date();
    const target = new Date(testDate);
    const diffTime = target.getTime() - now.getTime();
    const weeksRemaining = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24 * 7)));
    const hoursPerWeek = Math.max(3, Math.round(estimatedHours / weeksRemaining));

    // Generate milestones progression
    const milestones: number[] = [currentScore];
    let step = currentScore;
    const targets = [1000, 1100, 1200, 1300, 1400, 1500, 1550, 1600];
    targets.forEach(t => {
      if (t > step && t <= goalScore) {
        milestones.push(t);
        step = t;
      }
    });
    if (!milestones.includes(goalScore)) milestones.push(goalScore);

    return {
      diff,
      estimatedHours,
      weeksRemaining,
      hoursPerWeek,
      milestones,
    };
  }, [currentScore, goalScore, testDate]);

  const handleApplyPlan = () => {
    updateProfile({
      currentScore,
      targetScore: goalScore,
      testDate,
      hoursPerWeek: journeyMetrics.hoursPerWeek,
    });
    router.push('/study-planner');
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative subtle ambient glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Trajectory Simulator
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Design Your Personalized 1600 Journey
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Select your diagnostic starting point and upcoming test date to calculate your weekly targets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyPlan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              Start My SAT Plan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Current / Diagnostic Score
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="600"
                max="1550"
                step="10"
                value={currentScore}
                onChange={(e) => setCurrentScore(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 cursor-pointer"
              />
              <span className="font-mono text-xl font-black text-emerald-400 w-16 text-right">
                {currentScore}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">From recent practice test or PSAT</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Goal Target Score
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={Math.min(1600, currentScore + 50)}
                max="1600"
                step="10"
                value={goalScore}
                onChange={(e) => setGoalScore(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 cursor-pointer"
              />
              <span className="font-mono text-xl font-black text-amber-400 w-16 text-right">
                {goalScore}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Aim high—1600 is achievable with deliberate practice</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Scheduled SAT Test Date
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Official testing windows: March, May, June, Aug, Oct, Nov, Dec
            </p>
          </div>
        </div>

        {/* Dynamic Journey Progression Bar */}
        <div className="py-6">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Your Estimated Score Trajectory</span>
            <span className="text-emerald-400 font-mono font-bold">
              +{journeyMetrics.diff} Points Gain
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {journeyMetrics.milestones.map((score, idx) => (
              <React.Fragment key={score}>
                <div className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                  idx === journeyMetrics.milestones.length - 1
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10 scale-105'
                    : idx === 0
                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                }`}>
                  {idx === journeyMetrics.milestones.length - 1 && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  {score}
                </div>
                {idx < journeyMetrics.milestones.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4 Core Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Estimated Study Time</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              ~{journeyMetrics.estimatedHours} <span className="text-xs text-slate-400 font-normal">hrs</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Based on historical 1600 scorer data</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Timeline Remaining</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              {journeyMetrics.weeksRemaining} <span className="text-xs text-slate-400 font-normal">weeks</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Until test day on {testDate}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Weekly Pace</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              ~{journeyMetrics.hoursPerWeek} <span className="text-xs text-slate-400 font-normal">hrs/week</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">~{Math.round((journeyMetrics.hoursPerWeek / 5) * 60)} min / study day</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Practice Tests</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">
              {Math.min(6, Math.max(3, Math.ceil(journeyMetrics.weeksRemaining / 2)))} <span className="text-xs text-slate-400 font-normal">tests</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Official Bluebook exams #1-6</p>
          </div>
        </div>
      </div>
    </div>
  );
}
