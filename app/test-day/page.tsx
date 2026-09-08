'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Circle,
  Clock,
  BatteryCharging,
  Coffee,
  ShieldCheck,
  AlertTriangle,
  Zap,
  HelpCircle
} from 'lucide-react';

export default function TestDayPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checklist = [
    { id: 'ticket', label: 'Admission Ticket downloaded & printed / saved in Bluebook' },
    { id: 'passport', label: 'Original, valid, unexpired PASSPORT (or acceptable government ID)' },
    { id: 'device', label: 'Fully charged laptop or iPad with Bluebook installed & updated' },
    { id: 'charger', label: 'Device power charging cable & country wall plug adapter' },
    { id: 'calculator', label: 'Approved backup graphing calculator (TI-84, etc.) with fresh batteries' },
    { id: 'pencils', label: '2-3 #2 pencils or pens with erasers for proctor-provided scratch paper' },
    { id: 'snack', label: 'Healthy snack (nuts, banana, protein bar) & water bottle for 10-min break' },
    { id: 'clothing', label: 'Comfortable layered clothing (testing room AC/heating can be unpredictable)' },
  ];

  const total = checklist.length;
  const packed = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Award className="w-3.5 h-3.5" /> Zero Friction on Test Morning
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SAT Test-Day Center & Checklist
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Interactive packing checklist, exact module schedules, and game-day psychological guidelines.
        </p>
      </div>

      {/* 2. Interactive Packing Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Essential Test-Day Packing Checklist
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Check off every item the night before your exam.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {packed} of {total} Packed
            </span>
            <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(packed / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklist.map((item) => {
            const isChecked = checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <button className="mt-0.5 text-emerald-400 shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-slate-950" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </button>
                <span className={`text-xs sm:text-sm ${isChecked ? 'line-through text-slate-400' : ''}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Test-Day Schedule Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          The Digital SAT Test Schedule
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="font-mono text-emerald-400 font-bold block mb-1">7:45 AM - 8:00 AM</span>
            <strong className="text-white block mb-1">Check-in & Room Entry</strong>
            <p className="text-slate-400">Proctors check ID & ticket; seat assigned; Wi-Fi connect.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="font-mono text-purple-400 font-bold block mb-1">64 Minutes</span>
            <strong className="text-white block mb-1">Reading & Writing</strong>
            <p className="text-slate-400">Module 1 (32 min, 27 Qs) + Module 2 (32 min, 27 Qs).</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="font-mono text-amber-400 font-bold block mb-1">10 Minutes</span>
            <strong className="text-white block mb-1">Scheduled Break</strong>
            <p className="text-slate-300">Eat snack, drink water, use restroom. Do NOT look at phone!</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="font-mono text-blue-400 font-bold block mb-1">70 Minutes</span>
            <strong className="text-white block mb-1">SAT Math</strong>
            <p className="text-slate-400">Module 1 (35 min, 22 Qs) + Module 2 (35 min, 22 Qs).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="font-mono text-emerald-400 font-bold block mb-1">~11:30 AM</span>
            <strong className="text-white block mb-1">Exam Dismissal</strong>
            <p className="text-slate-400">Verify test submission screen; collect belongings.</p>
          </div>
        </div>
      </div>

      {/* 4. Strategic Rules for During the Test */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h4 className="font-bold text-white text-sm">Never Leave Any Question Blank</h4>
          <p className="text-slate-400 leading-relaxed">
            The Digital SAT has ZERO guessing penalty. If you have 30 seconds left on a module, pick a letter of the day (e.g. &ldquo;B&rdquo;) for any unanswered questions.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h4 className="font-bold text-white text-sm">Flag & Move On</h4>
          <p className="text-slate-400 leading-relaxed">
            If you spend more than 90 seconds on any question without clarity, click the bookmark icon and move on. Bank your time for questions you can solve with 100% confidence.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <Coffee className="w-5 h-5 text-cyan-400" />
          <h4 className="font-bold text-white text-sm">Optimize the 10-Minute Break</h4>
          <p className="text-slate-400 leading-relaxed">
            Leave the computer screen. Do light stretching, drink water, and eat a small healthy snack. Mental fatigue on Math Module 2 is where 40+ points are lost.
          </p>
        </div>
      </div>
    </div>
  );
}
