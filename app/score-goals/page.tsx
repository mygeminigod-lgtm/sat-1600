'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Target, Sparkles, Clock, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import scoreGuidesData from '@/data/score_guides.json';

export default function ScoreGoalsPage() {
  const [selectedRange, setSelectedRange] = useState<string>('1400-1500');

  const currentGuide = scoreGuidesData.find((g) => g.range === selectedRange) || scoreGuidesData[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Target className="w-3.5 h-3.5" /> Score Tier Breakthroughs
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Score Goal Breakthrough Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Specific tactical blueprints for breaking through plateaus from 800 up to the elusive 1600.
        </p>
      </div>

      {/* Score Range Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {scoreGuidesData.map((g) => (
          <button
            key={g.range}
            onClick={() => setSelectedRange(g.range)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedRange === g.range
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {g.range.replace('-', ' → ')}
          </button>
        ))}
      </div>

      {/* Selected Guide Details */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
            Target Tier: {currentGuide.range}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {currentGuide.title}
          </h2>
        </div>

        {/* Breakthrough Secret Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> The Plateau Breakthrough Secret
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {currentGuide.plateauBreakthrough}
          </p>
        </div>

        {/* Focus Areas & Typical Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Primary Focus Areas
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              {currentGuide.focusAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Typical Bottlenecks & Weaknesses
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentGuide.typicalWeaknesses}
            </p>

            <div className="pt-2 border-t border-slate-700/60">
              <span className="text-[11px] text-slate-400 block mb-0.5">Estimated Preparation Bandwidth:</span>
              <strong className="text-xs text-white font-mono">{currentGuide.studyHoursNeeded}</strong>
            </div>
          </div>
        </div>

        {/* Recommended Resources */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-slate-400 block mb-0.5 font-semibold">Recommended Curricula for this Tier:</span>
            <span className="text-slate-200">{currentGuide.recommendedResources.join(' • ')}</span>
          </div>
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
          >
            Practice This Score Tier <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
