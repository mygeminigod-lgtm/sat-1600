'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  HelpCircle,
  BookmarkPlus,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  SlidersHorizontal,
  Flame,
  AlertCircle,
  Layers,
  Calculator,
  ExternalLink
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import questionsData from '@/data/questions.json';
import { Question, ErrorCategory } from '@/types/sat';

export default function PracticePage() {
  const { recordAttempt, addMistake } = useStudentStore();

  const [questions, setQuestions] = useState<Question[]>(questionsData as Question[]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [eliminatedChoices, setEliminatedChoices] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hintStage, setHintStage] = useState<number>(0); // 0 = none, 1 = hint 1, 2 = hint 2, 3 = hint 3, 4 = full explanation
  const [secondsSpent, setSecondsSpent] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showDesmosModal, setShowDesmosModal] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<ErrorCategory>('careless');
  const [mistakeLogged, setMistakeLogged] = useState<boolean>(false);

  // Filters
  const [sectionFilter, setSectionFilter] = useState<'all' | 'math' | 'reading-writing'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard' | 'trap-1550'>('all');

  // Filter questions pool
  const filteredQuestions = useMemo(() => {
    return (questionsData as Question[]).filter((q) => {
      if (sectionFilter !== 'all' && q.section !== sectionFilter) return false;
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [sectionFilter, difficultyFilter]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setSecondsSpent((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  // Reset state when moving question
  const loadQuestion = (index: number) => {
    if (index >= 0 && index < filteredQuestions.length) {
      setCurrentIndex(index);
      setSelectedChoice(null);
      setEliminatedChoices({});
      setIsSubmitted(false);
      setHintStage(0);
      setSecondsSpent(0);
      setIsTimerRunning(true);
      setMistakeLogged(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedChoice || isSubmitted || !currentQuestion) return;

    setIsSubmitted(true);
    setIsTimerRunning(false);

    const isCorrect = selectedChoice === currentQuestion.correctAnswer;

    recordAttempt({
      id: `att-${Date.now()}`,
      questionId: currentQuestion.id,
      selectedAnswer: selectedChoice,
      isCorrect,
      timeSpentSeconds: secondsSpent,
      timestamp: new Date().toISOString(),
      section: currentQuestion.section,
      domain: currentQuestion.domain,
      topic: currentQuestion.topic,
    });
  };

  const handleLogMistake = () => {
    if (!currentQuestion || !selectedChoice) return;

    addMistake({
      id: `mstk-${Date.now()}`,
      questionId: currentQuestion.id,
      questionPrompt: currentQuestion.prompt,
      section: currentQuestion.section,
      domain: currentQuestion.domain,
      topic: currentQuestion.topic,
      difficulty: currentQuestion.difficulty,
      studentAnswer: selectedChoice,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      errorType: errorCategory,
      timestamp: new Date().toISOString(),
      mastered: false,
    });
    setMistakeLogged(true);
  };

  const toggleEliminate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEliminatedChoices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-400">No questions match your current filters.</p>
        <button
          onClick={() => {
            setSectionFilter('all');
            setDifficultyFilter('all');
          }}
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
      {/* 1. Practice Bar & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-slate-200">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formatTimer(secondsSpent)}</span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Q {currentIndex + 1} of {filteredQuestions.length}
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={sectionFilter}
            onChange={(e) => {
              setSectionFilter(e.target.value as any);
              loadQuestion(0);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">All Sections</option>
            <option value="math">Math</option>
            <option value="reading-writing">Reading & Writing</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value as any);
              loadQuestion(0);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="trap-1550">1550+ Traps</option>
          </select>

          {currentQuestion.section === 'math' && (
            <button
              onClick={() => setShowDesmosModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              Desmos Calculator Tips
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 relative">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {currentQuestion.domain}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              • {currentQuestion.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider border ${
              currentQuestion.difficulty === 'trap-1550'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : currentQuestion.difficulty === 'hard'
                ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {currentQuestion.difficulty}
            </span>
            {currentQuestion.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            )}
          </div>
        </div>

        {/* Question Prompt */}
        <div className="space-y-4">
          {currentQuestion.passage && (
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-sm text-slate-300 leading-relaxed italic">
              {currentQuestion.passage}
            </div>
          )}
          <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed whitespace-pre-line">
            {currentQuestion.prompt}
          </p>
        </div>

        {/* Answer Choices */}
        <div className="space-y-3 pt-2">
          {currentQuestion.choices.map((choice) => {
            const isSelected = selectedChoice === choice.id;
            const isEliminated = eliminatedChoices[choice.id];
            const isCorrectAnswer = choice.id === currentQuestion.correctAnswer;

            let choiceStyle = 'bg-slate-800/50 border-slate-700/80 text-slate-200 hover:border-slate-600 hover:bg-slate-800';

            if (isSelected) {
              choiceStyle = 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10';
            }

            if (isSubmitted) {
              if (isCorrectAnswer) {
                choiceStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
              } else if (isSelected && !isCorrectAnswer) {
                choiceStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
              } else {
                choiceStyle = 'opacity-40 border-slate-800 bg-slate-900';
              }
            } else if (isEliminated) {
              choiceStyle = 'opacity-30 line-through border-slate-800 bg-slate-900';
            }

            return (
              <div
                key={choice.id}
                onClick={() => !isSubmitted && setSelectedChoice(choice.id)}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${choiceStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-xl font-bold font-mono text-sm flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {choice.id}
                  </div>
                  <span className="text-sm font-medium leading-snug">{choice.text}</span>
                </div>

                {!isSubmitted && (
                  <button
                    onClick={(e) => toggleEliminate(choice.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition-opacity"
                  >
                    {isEliminated ? 'Restore' : 'Cross Out'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {!isSubmitted && (
              <button
                onClick={() => setHintStage((prev) => Math.min(prev + 1, 3))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 border border-amber-500/30 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {hintStage === 0
                  ? 'Request Socratic Hint'
                  : hintStage < 3
                  ? `Next Hint (${hintStage}/3)`
                  : 'All Hints Unlocked'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted ? (
              <button
                disabled={!selectedChoice}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={() => loadQuestion(currentIndex + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
              >
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Multi-tier Socratic Hints Display */}
        {hintStage > 0 && !isSubmitted && (
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2 animate-fade-in">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Socratic Hint Ladder
            </h4>
            {currentQuestion.hints.slice(0, hintStage).map((hint, idx) => (
              <p key={idx} className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-amber-500/40">
                <strong className="text-amber-300">Clue {idx + 1}:</strong> {hint}
              </p>
            ))}
          </div>
        )}

        {/* 4. Submission Feedback & Detailed Explanation */}
        {isSubmitted && (
          <div className="space-y-4 pt-2 animate-fade-in">
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              selectedChoice === currentQuestion.correctAnswer
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {selectedChoice === currentQuestion.correctAnswer ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">
                    {selectedChoice === currentQuestion.correctAnswer
                      ? 'Correct! Excellent execution.'
                      : `Incorrect. Correct answer is choice ${currentQuestion.correctAnswer}.`}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    Solved in {formatTimer(secondsSpent)}
                  </span>
                </div>

                {/* If incorrect: 1-click mistake book logger */}
                {selectedChoice !== currentQuestion.correctAnswer && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300">Categorize this error:</span>
                      <select
                        value={errorCategory}
                        onChange={(e) => setErrorCategory(e.target.value as ErrorCategory)}
                        className="px-2 py-1 rounded bg-slate-800 text-xs text-amber-300 border border-slate-700"
                      >
                        <option value="careless">Careless mistake</option>
                        <option value="conceptual">Conceptual gap</option>
                        <option value="misread">Misread question</option>
                        <option value="timing">Timing issue</option>
                        <option value="vocabulary">Vocabulary trap</option>
                        <option value="calculation">Calculation error</option>
                        <option value="strategy">Strategy error</option>
                        <option value="guessing">Guessing</option>
                      </select>
                    </div>

                    <button
                      onClick={handleLogMistake}
                      disabled={mistakeLogged}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        mistakeLogged
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                      }`}
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                      {mistakeLogged ? 'Saved to Mistake Book ✓' : 'Log to Mistake Book'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Official Explanation Body */}
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Official Step-by-Step Explanation
                </span>
                <span className="text-[11px] font-mono text-slate-400">Skill: {currentQuestion.skill}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation footer between questions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => loadQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-300"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <span className="text-xs text-slate-500">
          Tip: Press cross-out to visually eliminate distractors before selecting your answer.
        </span>

        <button
          onClick={() => loadQuestion(currentIndex + 1)}
          disabled={currentIndex === filteredQuestions.length - 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-300"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desmos Quick Modal */}
      {showDesmosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                Desmos Graphing Hacks for Digital SAT
              </h3>
              <button onClick={() => setShowDesmosModal(false)} className="text-slate-400 hover:text-white text-xs">
                Close ✕
              </button>
            </div>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li>• <strong>Systems of Equations:</strong> Type both equations verbatim. Click directly on the intersection to read coordinates (x, y).</li>
              <li>• <strong>Finding Roots:</strong> Type y = ax² + bx + c. Gray dots appear automatically at x-intercepts and the vertex.</li>
              <li>• <strong>Constants & Sliders:</strong> For questions with unknown constant k, add a slider for k and adjust until it satisfies the condition.</li>
              <li>• <strong>Tables & Regressions:</strong> Use table (x₁, y₁) and type y₁ ~ mx₁ + b for linear or y₁ ~ a(x₁ - h)² + k for quadratics.</li>
            </ul>
            <div className="pt-2 flex justify-end">
              <a
                href="https://www.desmos.com/testing/cb-digital-sat/graphing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline"
              >
                Launch Official Bluebook Desmos Sandbox <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
