'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  BrainCircuit,
  RotateCcw,
  BookOpen,
  Award,
  Download
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import { StudyPlan, Section } from '@/types/sat';

export default function StudyPlannerPage() {
  const { profile, updateProfile, savePlan, mistakeAnalytics } = useStudentStore();

  const [currentScore, setCurrentScore] = useState<number>(profile.currentScore || 1320);
  const [targetScore, setTargetScore] = useState<number>(profile.targetScore || 1600);
  const [testDate, setTestDate] = useState<string>(profile.testDate || '2025-05-03');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(profile.hoursPerWeek || 12);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(profile.daysPerWeek || 5);
  const [weakestDomain, setWeakestDomain] = useState<string>(
    mistakeAnalytics.weakestDomain !== 'None identified' ? mistakeAnalytics.weakestDomain : 'Advanced Math & Transitions'
  );
  const [studyStyle, setStudyStyle] = useState<string>('ai-guided');
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | '30day' | '7day'>('daily');

  const handleGenerate = () => {
    updateProfile({
      currentScore,
      targetScore,
      testDate,
      hoursPerWeek,
      daysPerWeek,
    });

    const newPlan: StudyPlan = {
      id: `plan-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      recommendedTopics: [
        weakestDomain,
        'Desmos Graphing Optimization & Regression',
        'Standard English Conventions Punctuation Rules',
        'Command of Quantitative Evidence (Tables & Graphs)',
      ],
      dailyMission: [
        `Phase 1 (15m): Quick 10-card Flashcard drill on ${weakestDomain} and High-Yield Vocab`,
        `Phase 2 (30m): 15 deliberate practice questions focusing on ${weakestDomain}`,
        `Phase 3 (20m): Review every missed question; write reflections in SAT Mistake Book`,
        `Phase 4 (15m): AI Coach dialogue clarifying 1 tricky concept or Desmos shortcut`,
      ],
      weeklyTargets: [
        'Mon: Algebra & Linear Systems deep dive + 10 Vocab flashcards (1.5 hrs)',
        'Tue: Reading & Writing Transitions & Rhetorical Synthesis drills (1.5 hrs)',
        'Wed: Advanced Math (Quadratics, Polynomials, Roots) + Desmos practice (1.5 hrs)',
        'Thu: Standard English Conventions (Punctuation Boundaries, Modifiers) (1.5 hrs)',
        'Fri: Mistake Book remediation test (re-try all unmastered errors) (1 hr)',
        'Sat: Proctored 2-Hour Digital SAT Simulation (Bluebook practice exam) (2.5 hrs)',
        'Sun: Detailed error autopsy + rest & mental recovery (1 hr)',
      ],
      monthlyMilestones: [
        'Month 1 — Foundational Mastery: Eliminate 100% of arithmetic and grammar boundary gaps; achieve consistent 90%+ on Easy/Medium questions.',
        'Month 2 — Advanced Problem Solving & Desmos: Master all nonlinear functions, circle theorems, and paired passage inference questions.',
        'Month 3 — Speed & Endurance: Bank 8+ minutes on Module 1 to guarantee placement in the hard Module 2; eliminate unforced careless mistakes.',
      ],
      thirtyDayPlan: [
        'Day 30 to 21: Deep domain drills in weakest areas; take Bluebook Test 3; log all errors.',
        'Day 20 to 14: Time optimization; practice 35-minute module sprints under strict test constraints.',
        'Day 13 to 7: Complete Bluebook Test 5 & 6; audit mistakes; simulate exact morning routine.',
        'Day 6 to 1: Zero new concepts; light review of Mistake Book and Desmos formula sheet.',
      ],
      sevenDayPlan: [
        'Day 7: Final full diagnostic exam under official conditions; review answers immediately.',
        'Day 6: Review every single question logged in your SAT Mistake Book.',
        'Day 5: Flashcard review: all grammar rules, formulas, and math shortcuts.',
        'Day 4: Device check: verify Bluebook updates, battery health, and ID validity.',
        'Day 3: Light 30-minute practice module; build confidence.',
        'Day 2: Pack your bag (device, charger, approved ID, snack, calculator). Stop studying by 5 PM.',
        'Day 1 (Test Day Eve): Relax, hydrate, 8+ hours of sleep. Trust your preparation.',
      ],
    };

    setGeneratedPlan(newPlan);
    savePlan(newPlan);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Adaptive AI Study Plan
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SAT Study Plan Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Tailored to your current score, target date, weekly bandwidth, and the specific skills flagged in your Mistake Book.
        </p>
      </div>

      {/* Input Questionnaire */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Step 1: Customize Your Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Current SAT Score
            </label>
            <input
              type="number"
              min={600}
              max={1590}
              step={10}
              value={currentScore}
              onChange={(e) => setCurrentScore(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target SAT Score
            </label>
            <input
              type="number"
              min={currentScore + 10}
              max={1600}
              step={10}
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-mono font-bold text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Scheduled Test Date
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Weekly Hours Available: {hoursPerWeek} hrs
            </label>
            <input
              type="range"
              min={3}
              max={30}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Study Days Per Week: {daysPerWeek} days
            </label>
            <input
              type="range"
              min={2}
              max={7}
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Weakest Focus Domain
            </label>
            <input
              type="text"
              value={weakestDomain}
              onChange={(e) => setWeakestDomain(e.target.value)}
              placeholder="e.g. Advanced Math, Transitions"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Generate Custom Multi-Phase Plan
          </button>
        </div>
      </div>

      {/* Generated Plan Output */}
      {generatedPlan && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold">PLAN ID: {generatedPlan.id}</span>
              <h2 className="text-xl font-bold text-white mt-1">
                Your Roadmap to {targetScore} ({hoursPerWeek} hrs/wk across {daysPerWeek} days)
              </h2>
              <p className="text-xs text-slate-400">
                Weakness focus: <strong className="text-amber-400">{weakestDomain}</strong>
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
          </div>

          {/* Plan Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {(['daily', 'weekly', 'monthly', '30day', '7day'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab === '30day' ? 'Final 30-Day Plan' : tab === '7day' ? 'Final 7-Day Crunch' : `${tab} Plan`}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-2">
            {activeTab === 'daily' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Optimal Daily Routine (~{Math.round((hoursPerWeek / daysPerWeek) * 60)} minutes / study day)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedPlan.dailyMission.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'weekly' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Weekly Schedule & Balance
                </h3>
                <div className="space-y-2.5">
                  {generatedPlan.weeklyTargets.map((target, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{target}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'monthly' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  3-Month Master Progression
                </h3>
                <div className="space-y-3">
                  {generatedPlan.monthlyMilestones.map((month, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/70">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        Milestone {idx + 1}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200">{month}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === '30day' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Countdown: Final 30 Days to Test Day
                </h3>
                <div className="space-y-2.5">
                  {generatedPlan.thirtyDayPlan.map((stage, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                      <div className="p-1 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 font-mono text-xs font-bold">
                        W{idx + 1}
                      </div>
                      <span>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === '7day' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-rose-400" />
                  Final 7-Day Peak Performance Protocol
                </h3>
                <div className="space-y-2.5">
                  {generatedPlan.sevenDayPlan.map((day, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs sm:text-sm text-slate-200 flex items-center gap-3">
                      <span className="w-16 shrink-0 font-mono text-xs font-bold text-emerald-400">
                        {day.split(':')[0]}
                      </span>
                      <span>{day.split(':').slice(1).join(':')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
