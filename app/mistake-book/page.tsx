'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookmarkCheck,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Filter,
  Plus,
  ArrowRight,
  TrendingDown,
  RotateCcw,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import { Mistake, ErrorCategory, Section } from '@/types/sat';

export default function MistakeBookPage() {
  const { mistakes, updateMistake, removeMistake, addMistake, mistakeAnalytics } = useStudentStore();

  const [sectionFilter, setSectionFilter] = useState<'all' | 'math' | 'reading-writing'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showOnlyUnmastered, setShowOnlyUnmastered] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New mistake manual form state
  const [newPrompt, setNewPrompt] = useState('');
  const [newSection, setNewSection] = useState<Section>('math');
  const [newDomain, setNewDomain] = useState('Advanced Math');
  const [newTopic, setNewTopic] = useState('Quadratic Functions');
  const [newStudentAnswer, setNewStudentAnswer] = useState<'A' | 'B' | 'C' | 'D'>('C');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [newExplanation, setNewExplanation] = useState('');
  const [newErrorType, setNewErrorType] = useState<ErrorCategory>('careless');
  const [newNotes, setNewNotes] = useState('');

  const filteredMistakes = mistakes.filter((m) => {
    if (sectionFilter !== 'all' && m.section !== sectionFilter) return false;
    if (categoryFilter !== 'all' && m.errorType !== categoryFilter) return false;
    if (showOnlyUnmastered && m.mastered) return false;
    return true;
  });

  const handleCreateManualMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;

    addMistake({
      id: `manual-${Date.now()}`,
      questionId: `manual-q-${Date.now()}`,
      questionPrompt: newPrompt,
      section: newSection,
      domain: newDomain,
      topic: newTopic,
      difficulty: 'hard',
      studentAnswer: newStudentAnswer,
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation || 'Review carefully in Bluebook or question bank.',
      errorType: newErrorType,
      notes: newNotes,
      timestamp: new Date().toISOString(),
      mastered: false,
    });

    setShowAddModal(false);
    setNewPrompt('');
    setNewExplanation('');
    setNewNotes('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <BookmarkCheck className="w-3.5 h-3.5" /> High-Scorer Secret Weapon
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            SAT Mistake Book & Error Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyze every lost point. The student who masters their past mistakes reaches 1600.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Log Test Mistake
          </button>
        </div>
      </div>

      {/* 2. Top Analytics Banner: #1 Source of Lost Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingDown className="w-4 h-4" /> Root Cause Diagnosis
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            Your #1 Source of Lost Points:
          </h3>
          <p className="text-2xl font-black text-amber-400 capitalize">
            {mistakeAnalytics.mostFrequentError}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Targeting this specific error habit yields immediate +30 to +50 points.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>UNMASTERED ERRORS</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black font-mono text-white">
            {mistakeAnalytics.unmasteredCount}{' '}
            <span className="text-xs font-normal text-slate-400">/ {mistakeAnalytics.totalMistakes} logged</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Re-test these questions every 48 hours until accuracy is 100%.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>MOST VULNERABLE DOMAIN</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white">
            {mistakeAnalytics.weakestDomain}
          </div>
          <div className="mt-3">
            <Link
              href="/practice"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
            >
              Drill this domain in Practice Center →
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>

          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
          >
            <option value="all">All Sections</option>
            <option value="math">Math</option>
            <option value="reading-writing">Reading & Writing</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
          >
            <option value="all">All Error Types</option>
            <option value="careless">Careless mistake</option>
            <option value="conceptual">Conceptual gap</option>
            <option value="misread">Misread question</option>
            <option value="timing">Timing issue</option>
            <option value="vocabulary">Vocabulary trap</option>
            <option value="calculation">Calculation error</option>
            <option value="strategy">Strategy error</option>
            <option value="guessing">Guessing</option>
          </select>

          <label className="flex items-center gap-2 text-slate-300 cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={showOnlyUnmastered}
              onChange={(e) => setShowOnlyUnmastered(e.target.checked)}
              className="rounded accent-emerald-500"
            />
            <span>Show Only Unmastered</span>
          </label>
        </div>

        <span className="text-slate-400 font-mono">
          Showing {filteredMistakes.length} mistakes
        </span>
      </div>

      {/* 4. Mistakes Feed */}
      <div className="space-y-4">
        {filteredMistakes.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No mistakes in this view</h3>
            <p className="text-xs text-slate-400 mt-1">
              Either you have mastered all logged mistakes, or none match your selected filters.
            </p>
          </div>
        ) : (
          filteredMistakes.map((mistake) => (
            <div
              key={mistake.id}
              className={`p-6 rounded-2xl border transition-all ${
                mistake.mastered
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                    {mistake.domain}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {mistake.topic}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {mistake.errorType.replace('_', ' ')}
                  </span>

                  <button
                    onClick={() => updateMistake(mistake.id, { mastered: !mistake.mastered })}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      mistake.mastered
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {mistake.mastered ? 'Mastered ✓' : 'Mark as Mastered'}
                  </button>

                  <button
                    onClick={() => removeMistake(mistake.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete mistake"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prompt */}
              <p className="text-sm text-slate-100 font-medium whitespace-pre-line mb-4">
                {mistake.questionPrompt}
              </p>

              {/* Answers Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <strong className="block text-rose-400 mb-0.5">Your Selected Answer:</strong>
                  Choice {mistake.studentAnswer}
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <strong className="block text-emerald-400 mb-0.5">Correct Answer:</strong>
                  Choice {mistake.correctAnswer}
                </div>
              </div>

              {/* Explanation & Notes */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/80 text-xs text-slate-300 space-y-2">
                <p>
                  <strong className="text-slate-200">Solution Rationale:</strong> {mistake.explanation}
                </p>
                {mistake.notes && (
                  <p className="text-amber-300/90 pt-1 border-t border-slate-700/60">
                    <strong>My Reflection:</strong> {mistake.notes}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Add Manual Mistake Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                Log Practice Test / Bluebook Mistake
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualMistake} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Question Prompt / Problem Description
                </label>
                <textarea
                  rows={3}
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Paste or summarize the question you got wrong..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Section</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value as Section)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="math">Math</option>
                    <option value="reading-writing">Reading & Writing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Domain</label>
                  <input
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Answer</label>
                  <select
                    value={newStudentAnswer}
                    onChange={(e) => setNewStudentAnswer(e.target.value as any)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Correct Answer</label>
                  <select
                    value={newCorrectAnswer}
                    onChange={(e) => setNewCorrectAnswer(e.target.value as any)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Error Category</label>
                <select
                  value={newErrorType}
                  onChange={(e) => setNewErrorType(e.target.value as ErrorCategory)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-300"
                >
                  <option value="careless">Careless mistake (rushed, sign error, basic arithmetic)</option>
                  <option value="conceptual">Conceptual gap (did not know the required math or grammar rule)</option>
                  <option value="misread">Misread question (answered for x instead of 2x, missed NOT/EXCEPT)</option>
                  <option value="vocabulary">Vocabulary trap (unfamiliar secondary definition)</option>
                  <option value="timing">Timing problem (ran low on time, panicked)</option>
                  <option value="calculation">Calculation error (manual algebra mistake)</option>
                  <option value="strategy">Strategy error (should have used Desmos or plugged in choices)</option>
                  <option value="guessing">Guessing (total blind guess)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Solution Explanation</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Why is the correct answer right?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personal Takeaway / Reflection</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="What will you do next time to prevent this mistake?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save to Mistake Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
