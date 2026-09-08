'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Flame,
  Sparkles,
  ShieldCheck,
  Share2,
  ArrowRight
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import questionsData from '@/data/questions.json';
import { Question } from '@/types/sat';

export default function DailyChallengePage() {
  const { profile, updateProfile, recordAttempt } = useStudentStore();

  const dailyQuestion: Question = (questionsData as Question[])[0]; // system linear equations

  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [secondsUntilMidnight, setSecondsUntilMidnight] = useState<number>(0);

  // Countdown to midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
      setSecondsUntilMidnight(diff);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs}h ${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const handleCheckAnswer = () => {
    if (!selectedChoice || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedChoice === dailyQuestion.correctAnswer;

    if (isCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      updateProfile({
        streak: profile.streak + 1,
        xp: profile.xp + 100,
      });
    }

    recordAttempt({
      id: `daily-${Date.now()}`,
      questionId: dailyQuestion.id,
      selectedAnswer: selectedChoice,
      isCorrect,
      timeSpentSeconds: 45,
      timestamp: new Date().toISOString(),
      section: dailyQuestion.section,
      domain: dailyQuestion.domain,
      topic: dailyQuestion.topic,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          <Award className="w-3.5 h-3.5" /> High-Stakes Daily Ritual
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Daily SAT Challenge
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Solve one high-yield question every day to maintain peak cognitive acuity and build your unbroken study streak.
        </p>
      </div>

      {/* Streak & Timer Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{profile.streak} Day Study Streak</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                +100 XP Challenge
              </span>
            </div>
            <p className="text-xs text-slate-400">Answer correctly today to increment your streak</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Next question in: <strong className="text-white">{formatCountdown(secondsUntilMidnight)}</strong></span>
        </div>
      </div>

      {/* Question Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono uppercase font-bold text-emerald-400">
            {dailyQuestion.domain} • {dailyQuestion.topic}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {dailyQuestion.difficulty}
          </span>
        </div>

        <p className="text-base text-slate-100 font-medium whitespace-pre-line leading-relaxed">
          {dailyQuestion.prompt}
        </p>

        {/* Choices */}
        <div className="space-y-3">
          {dailyQuestion.choices.map((c) => {
            const isSelected = selectedChoice === c.id;
            const isCorrectAnswer = c.id === dailyQuestion.correctAnswer;

            let choiceStyle = 'bg-slate-800/50 border-slate-700 text-slate-200 hover:border-slate-600';
            if (isSelected) choiceStyle = 'bg-emerald-500/10 border-emerald-500 text-white';
            if (isSubmitted) {
              if (isCorrectAnswer) choiceStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
              else if (isSelected && !isCorrectAnswer) choiceStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
              else choiceStyle = 'opacity-40 border-slate-800';
            }

            return (
              <div
                key={c.id}
                onClick={() => !isSubmitted && setSelectedChoice(c.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${choiceStyle}`}
              >
                <div className={`w-8 h-8 rounded-xl font-bold font-mono text-sm flex items-center justify-center shrink-0 border ${
                  isSelected ? 'bg-emerald-500 text-slate-950 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {c.id}
                </div>
                <span className="text-sm font-medium">{c.text}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-800">
          {!isSubmitted ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedChoice}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              Submit Daily Challenge
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-emerald-400 font-bold">
                Challenge Complete! +100 XP Earned
              </span>
            </div>
          )}
        </div>

        {/* Explanation */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2 animate-fade-in text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block">
              Official Solution Breakdown:
            </span>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {dailyQuestion.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
