'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Coffee,
  Target
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';

type TimerMode = 'pomodoro-25' | 'focus-50' | 'sat-math-35' | 'sat-rw-32' | 'break-5';

export default function StudyTimerPage() {
  const { profile, updateProfile } = useStudentStore();

  const [mode, setMode] = useState<TimerMode>('pomodoro-25');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(2);
  const [topicStudied, setTopicStudied] = useState<string>('Advanced Math Quadratics');

  const timerRef = useRef<any>(null);

  const modeDurations: Record<TimerMode, { label: string; seconds: number; isBreak?: boolean }> = {
    'pomodoro-25': { label: '25 / 5 Pomodoro', seconds: 25 * 60 },
    'focus-50': { label: '50 / 10 Deep Focus', seconds: 50 * 60 },
    'sat-math-35': { label: '35-min SAT Math Module', seconds: 35 * 60 },
    'sat-rw-32': { label: '32-min SAT RW Module', seconds: 32 * 60 },
    'break-5': { label: '5-min Rest Break', seconds: 5 * 60, isBreak: true },
  };

  const setTimerMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modeDurations[newMode].seconds);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setCompletedSessions((c) => c + 1);
            // Award XP
            updateProfile({ xp: profile.xp + 50 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, profile.xp, updateProfile]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[mode].seconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((modeDurations[mode].seconds - timeLeft) / modeDurations[mode].seconds) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Timer className="w-3.5 h-3.5" /> High-Intensity Focus
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SAT Deliberate Study Timer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Condition your brain for real Digital SAT module constraints. No distractions, pure execution.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(modeDurations) as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setTimerMode(m)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === m
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {modeDurations[m].label}
          </button>
        ))}
      </div>

      {/* Main Clock Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          modeDurations[mode].isBreak ? 'bg-blue-500/10' : 'bg-emerald-500/10'
        }`} />

        {/* Large Digits */}
        <div className="text-7xl sm:text-9xl font-mono font-black tracking-tighter text-white select-none">
          {minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              modeDurations[mode].isBreak ? 'bg-blue-400' : 'bg-emerald-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-slate-950 shadow-xl transition-all hover:scale-105 ${
              isRunning ? 'bg-amber-400 hover:bg-amber-300' : 'bg-emerald-500 hover:bg-emerald-400'
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
          </button>

          <button
            onClick={resetTimer}
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Focus Target */}
        <div className="w-full max-w-md pt-4 border-t border-slate-800 flex items-center gap-3">
          <Target className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={topicStudied}
            onChange={(e) => setTopicStudied(e.target.value)}
            placeholder="Current focus topic..."
            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-slate-400 block mb-1">Focus Sessions Completed Today</span>
          <span className="text-2xl font-mono font-black text-white">{completedSessions}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-slate-400 block mb-1">Active Study Streak</span>
          <span className="text-2xl font-mono font-black text-amber-400">{profile.streak} Days 🔥</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-slate-400 block mb-1">Focus XP Awarded</span>
          <span className="text-2xl font-mono font-black text-emerald-400">+{completedSessions * 50} XP</span>
        </div>
      </div>
    </div>
  );
}
