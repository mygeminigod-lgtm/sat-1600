'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Video, Users, BrainCircuit, ExternalLink, Filter } from 'lucide-react';

interface StudyOption {
  name: string;
  category: 'self-study' | 'books' | 'youtube' | 'courses' | 'ai';
  cost: string;
  targetLevel: string;
  pros: string;
  cons: string;
  verdict: string;
}

const STUDY_OPTIONS: StudyOption[] = [
  {
    name: 'Self-Study with Official Resources (Bluebook + Khan + Mistake Book)',
    category: 'self-study',
    cost: '100% Free',
    targetLevel: 'All scores (800 - 1600)',
    pros: 'Authentic College Board questions, self-paced, zero financial barrier.',
    cons: 'Requires strong self-discipline and honest error tracking.',
    verdict: 'The gold standard foundation. 90% of 1500+ scorers rely primarily on self-directed official practice.',
  },
  {
    name: 'The Critical Reader & Grammar by Erica Meltzer',
    category: 'books',
    cost: '~$35 USD per book',
    targetLevel: '1200+ to 1550+',
    pros: 'The most comprehensive, rigorous breakdown of SAT punctuation and reading logic in print.',
    cons: 'Dense reading; requires active note-taking.',
    verdict: 'Essential reading for any student stuck below 700 in Reading & Writing.',
  },
  {
    name: 'The College Panda & 1600.io Orange Books',
    category: 'books',
    cost: '~$30 - $45 USD',
    targetLevel: '1100+ to 1600',
    pros: 'Deep algebraic intuition, advanced problem sets, teaches mathematical reasoning.',
    cons: 'Challenging for students needing elementary arithmetic remediation.',
    verdict: 'The premier textbook combination for conquering SAT Math.',
  },
  {
    name: 'PrepPros & Scalar Learning (YouTube)',
    category: 'youtube',
    cost: '100% Free',
    targetLevel: 'All scores',
    pros: 'Real-time test solving videos, Desmos calculator shortcuts, engaging walk-throughs.',
    cons: 'Passive watching can create an illusion of competence if not practicing alongside.',
    verdict: 'Invaluable for visual learners seeking Desmos calculator speed-running techniques.',
  },
  {
    name: 'SAT AI Coach (Socratic Tutoring)',
    category: 'ai',
    cost: 'Free on SAT 1600',
    targetLevel: '800 to 1600',
    pros: 'Available 24/7, adapts to your exact diagnostic score, provides socratic hints without spoiling answers.',
    cons: 'Requires student to actively ask specific questions.',
    verdict: 'Ideal supplement for instant explanations whenever you get stuck on a difficult practice question.',
  },
];

export default function WhereToStudyPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filtered = STUDY_OPTIONS.filter((item) => {
    if (selectedFilter !== 'all' && item.category !== selectedFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
          Strategic Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Where Should I Study for the SAT?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Compare self-study, textbooks, YouTube channels, and AI tutors to choose the optimal preparation mix for your score goal.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Methods' },
          { id: 'self-study', label: 'Self-Study' },
          { id: 'books', label: 'Textbooks' },
          { id: 'youtube', label: 'YouTube' },
          { id: 'ai', label: 'AI Tutoring' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === tab.id
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Study Options Grid */}
      <div className="space-y-4">
        {filtered.map((opt, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {opt.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10">
                  {opt.cost}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono text-slate-400 bg-slate-800">
                  Target: {opt.targetLevel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">Key Advantages:</strong>
                <p className="text-slate-300">{opt.pros}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <strong className="text-amber-400 block mb-1">Watch Out For:</strong>
                <p className="text-slate-300">{opt.cons}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 text-xs text-slate-300">
              <strong className="text-white">Bottom Line: </strong>
              {opt.verdict}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
