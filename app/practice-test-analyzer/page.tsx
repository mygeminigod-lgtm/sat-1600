'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import { PracticeTestResult } from '@/types/sat';

export default function PracticeTestAnalyzerPage() {
  const { savePracticeTest, practiceTests } = useStudentStore();

  const [testName, setTestName] = useState('Bluebook Official Practice Test #2');
  const [testDate, setTestDate] = useState(new Date().toISOString().split('T')[0]);
  const [mathScore, setMathScore] = useState<number>(700);
  const [rwScore, setRwScore] = useState<number>(660);
  const [weakestDomain, setWeakestDomain] = useState('Transitions & Quadratic Discriminants');
  const [notes, setNotes] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const totalScore = mathScore + rwScore;

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();

    const newTest: PracticeTestResult = {
      id: `test-${Date.now()}`,
      testName,
      testType: 'bluebook',
      date: testDate,
      totalScore,
      mathScore,
      rwScore,
      mathCorrect: Math.round((mathScore / 800) * 44),
      mathTotal: 44,
      rwCorrect: Math.round((rwScore / 800) * 54),
      rwTotal: 54,
      weakestDomain,
      notes,
    };

    savePracticeTest(newTest);

    // Calculate realistic projected range
    const lowerEstimate = Math.min(1600, totalScore + 20);
    const upperEstimate = Math.min(1600, totalScore + 70);

    setAnalysisResult({
      totalScore,
      mathScore,
      rwScore,
      projectedRange: `${lowerEstimate} - ${upperEstimate}`,
      gapTo1600: 1600 - totalScore,
      keyInsight: `To climb from ${totalScore} into your target range, your highest ROI is recovering ${Math.round((800 - rwScore) / 10)} questions in Reading/Writing by mastering grammar boundaries and rhetorical transitions.`,
      recommendedActions: [
        'Log all missed questions from this exam into your SAT Mistake Book immediately.',
        `Drill 25 targeted questions in "${weakestDomain}" before your next full exam.`,
        'Review the 10-minute break strategy to prevent mental fatigue on Math Module 2.',
      ],
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-3">
          <BarChart3 className="w-3.5 h-3.5" /> Diagnostic Intelligence
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Practice Test Score Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Input your official Bluebook scores to analyze lost points, project realistic score ranges, and generate a 7-day remediation plan.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAnalyze} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Enter Practice Exam Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Practice Exam Name
            </label>
            <select
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
            >
              <option value="Bluebook Official Practice Test #1">Bluebook Official Practice Test #1</option>
              <option value="Bluebook Official Practice Test #2">Bluebook Official Practice Test #2</option>
              <option value="Bluebook Official Practice Test #3">Bluebook Official Practice Test #3</option>
              <option value="Bluebook Official Practice Test #4">Bluebook Official Practice Test #4</option>
              <option value="Bluebook Official Practice Test #5">Bluebook Official Practice Test #5</option>
              <option value="Bluebook Official Practice Test #6">Bluebook Official Practice Test #6</option>
              <option value="Custom Third-Party Simulation">Custom Third-Party Simulation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Date Administered
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              SAT Math Score (200 - 800)
            </label>
            <input
              type="number"
              min={200}
              max={800}
              step={10}
              value={mathScore}
              onChange={(e) => setMathScore(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-mono font-bold text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              SAT Reading & Writing Score (200 - 800)
            </label>
            <input
              type="number"
              min={200}
              max={800}
              step={10}
              value={rwScore}
              onChange={(e) => setRwScore(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-purple-400 font-mono font-bold text-base"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Noticed Bottleneck / Weak Domain
            </label>
            <input
              type="text"
              value={weakestDomain}
              onChange={(e) => setWeakestDomain(e.target.value)}
              placeholder="e.g. Advanced Math, Transitions, Module 2 Time Management"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Score:</span>
            <span className="text-2xl font-black font-mono text-white">{totalScore}</span>
            <span className="text-xs text-slate-500 font-mono">/ 1600</span>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-sm shadow-xl shadow-rose-500/20 transition-all"
          >
            <BarChart3 className="w-4 h-4" /> Run Deep Score Analysis
          </button>
        </div>
      </form>

      {/* Analysis Output Card */}
      {analysisResult && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-rose-500/30 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider block mb-1">
                Diagnostic Output
              </span>
              <h2 className="text-2xl font-black text-white">
                Exam Score: {analysisResult.totalScore}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block mb-0.5">Estimated Potential Range:</span>
              <span className="text-xl font-mono font-black text-emerald-400">
                {analysisResult.projectedRange}
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">*Based on 3-4 weeks of deliberate error remediation</p>
            </div>
          </div>

          {/* Key Insight Callout */}
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Key Diagnostic Finding
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {analysisResult.keyInsight}
            </p>
          </div>

          {/* Action Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Immediate 7-Day Remediation Actions:
            </h4>
            <div className="space-y-2">
              {analysisResult.recommendedActions.map((act: string, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Link
              href="/mistake-book"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Log Missed Questions into Mistake Book <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
