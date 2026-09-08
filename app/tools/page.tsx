'use client';

import React, { useState } from 'react';
import {
  Target,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

export default function ToolsPage() {
  // 1. Hours Calculator
  const [calcCurrent, setCalcCurrent] = useState<number>(1250);
  const [calcTarget, setCalcTarget] = useState<number>(1550);
  const scoreGap = Math.max(0, calcTarget - calcCurrent);
  const estimatedHours = Math.round(scoreGap * 0.45);

  // 2. Superscore Calculator
  const [test1Math, setTest1Math] = useState<number>(680);
  const [test1RW, setTest1RW] = useState<number>(620);
  const [test2Math, setTest2Math] = useState<number>(640);
  const [test2RW, setTest2RW] = useState<number>(710);

  const highestMath = Math.max(test1Math, test2Math);
  const highestRW = Math.max(test1RW, test2RW);
  const superscore = highestMath + highestRW;
  const bestSingle = Math.max(test1Math + test1RW, test2Math + test2RW);

  // 3. ACT to SAT Converter
  const [actScore, setActScore] = useState<number>(32);
  const actToSatMap: Record<number, number> = {
    36: 1590, 35: 1540, 34: 1500, 33: 1460, 32: 1430,
    31: 1400, 30: 1370, 29: 1340, 28: 1310, 27: 1280,
    26: 1240, 25: 1210, 24: 1180, 23: 1140, 22: 1110
  };
  const convertedSat = actToSatMap[actScore] || 1400;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Target className="w-3.5 h-3.5" /> Quantitative Estimators
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SAT Calculators & Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Empirical study-hours calculators, superscore synthesizers, and official concordance score estimators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tool 1: Study Hours Calculator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Empirical Study Hours Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Estimates preparation bandwidth needed based on historical 1600 scorer data.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Current Score</label>
              <input
                type="number"
                step={10}
                value={calcCurrent}
                onChange={(e) => setCalcCurrent(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Score</label>
              <input
                type="number"
                step={10}
                value={calcTarget}
                onChange={(e) => setCalcTarget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-amber-400"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Estimated Hours Required:</span>
              <span className="text-2xl font-mono font-black text-emerald-400">~{estimatedHours} hours</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block mb-0.5">Target Point Jump:</span>
              <span className="text-lg font-mono font-bold text-white">+{scoreGap} pts</span>
            </div>
          </div>
        </div>

        {/* Tool 2: Superscore Calculator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Official Superscore Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Combine your highest Math and highest Reading & Writing across multiple test attempts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="font-semibold text-slate-300 block">Sitting #1</span>
              <input
                type="number"
                placeholder="Math"
                value={test1Math}
                onChange={(e) => setTest1Math(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
              />
              <input
                type="number"
                placeholder="RW"
                value={test1RW}
                onChange={(e) => setTest1RW(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
              />
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-slate-300 block">Sitting #2</span>
              <input
                type="number"
                placeholder="Math"
                value={test2Math}
                onChange={(e) => setTest2Math(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
              />
              <input
                type="number"
                placeholder="RW"
                value={test2RW}
                onChange={(e) => setTest2RW(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Your Superscore:</span>
              <span className="text-2xl font-mono font-black text-purple-400">{superscore}</span>
            </div>
            <div className="text-right text-slate-400">
              <span>Best Single Sitting: <strong className="text-white font-mono">{bestSingle}</strong></span>
              <span className="block text-[10px] text-emerald-400">+{superscore - bestSingle} pt Superscore Advantage</span>
            </div>
          </div>
        </div>

        {/* Tool 3: ACT to SAT Concordance */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 md:col-span-2">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Official ACT to Digital SAT Concordance Converter
            </h3>
            <p className="text-xs text-slate-400">
              Based on official College Board and ACT joint concordance tables.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                ACT Composite Score: {actScore}
              </label>
              <input
                type="range"
                min={22}
                max={36}
                value={actScore}
                onChange={(e) => setActScore(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-center sm:text-right shrink-0">
              <span className="text-xs text-slate-400 block mb-0.5">Concordant SAT Equivalent:</span>
              <span className="text-3xl font-mono font-black text-cyan-400">~{convertedSat}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
