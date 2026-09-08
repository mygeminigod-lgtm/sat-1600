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
    <div className="w-full rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Trajectory Simulator
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Design Your Personalized 1600 Journey
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Select your diagnostic starting point and upcoming test date to calculate your weekly targets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyPlan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all"
            >
              Start My SAT Plan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
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
                className="w-full accent-blue-600 bg-slate-200 cursor-pointer"
              />
              <span className="font-mono text-xl font-black text-blue-700 w-16 text-right">
                {currentScore}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">From recent practice test or PSAT</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
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
                className="w-full accent-indigo-600 bg-slate-200 cursor-pointer"
              />
              <span className="font-mono text-xl font-black text-indigo-700 w-16 text-right">
                {goalScore}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Aim high—1600 is achievable with deliberate practice</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Scheduled SAT Test Date
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Official testing windows: March, May, June, Aug, Oct, Nov, Dec
            </p>
          </div>
        </div>

        {/* Dynamic Journey Progression Bar */}
        <div className="py-6">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Your Estimated Score Trajectory</span>
            <span className="text-blue-700 font-mono font-bold">
              +{journeyMetrics.diff} Points Gain
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {journeyMetrics.milestones.map((score, idx) => (
              <React.Fragment key={score}>
                <div className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                  idx === journeyMetrics.milestones.length - 1
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm scale-105'
                    : idx === 0
                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {idx === journeyMetrics.milestones.length - 1 && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                  {score}
                </div>
                {idx < journeyMetrics.milestones.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4 Core Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Estimated Study Time</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
              ~{journeyMetrics.estimatedHours} <span className="text-xs text-slate-500 font-normal">hrs</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Based on historical 1600 scorer data</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Timeline Remaining</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
              {journeyMetrics.weeksRemaining} <span className="text-xs text-slate-500 font-normal">weeks</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Until test day on {testDate}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Weekly Pace</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
              ~{journeyMetrics.hoursPerWeek} <span className="text-xs text-slate-500 font-normal">hrs/week</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">~{Math.round((journeyMetrics.hoursPerWeek / 5) * 60)} min / study day</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Practice Tests</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
              {Math.min(6, Math.max(3, Math.ceil(journeyMetrics.weeksRemaining / 2)))} <span className="text-xs text-slate-500 font-normal">tests</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Official Bluebook exams #1-6</p>
          </div>
        </div>
      </div>
    </div>
  );
}
