'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  ShieldCheck,
  CreditCard,
  Laptop,
  FileCheck,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Clock,
  Compass
} from 'lucide-react';
import internationalData from '@/data/international_guide.json';

export default function InternationalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
          <Globe className="w-3.5 h-3.5" /> International Student Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          International Student SAT Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Comprehensive, country-aware guide for students testing outside the United States.
          Master Bluebook device policies, passport requirements, seat booking strategies, and English language waivers.
        </p>
      </div>

      {/* 2. Top Warning: The Passport Mandate */}
      <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          Mandatory International ID Warning: Valid Passport Rule
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          In virtually all testing centers outside the United States, an original, valid, unexpired government-issued <strong>PASSPORT</strong> is the only acceptable form of identification.
          School IDs, driving licenses, paper photocopies, and phone photos are strictly rejected.
          Your name on your College Board profile MUST match your passport character-for-character.
        </p>
      </div>

      {/* 3. Guide Sections from JSON */}
      <div className="space-y-6">
        {internationalData.sections.map((section, idx) => (
          <div
            key={section.id}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                  Module {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {section.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{section.summary}</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {section.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 4. English Language Learner (ELL) Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          The Non-Native Speaker SAT Advantage
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Many international students believe native English speakers have an insurmountable advantage. On the Digital SAT, this is a myth:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <strong className="text-cyan-400 block mb-1">Grammar is 100% Rule-Based:</strong>
            <p className="text-slate-300">
              Standard English Conventions test strict rules: punctuation boundaries, subject-verb agreement, and dangling modifiers. International students who memorize these rules regularly score 750+ in Reading & Writing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <strong className="text-cyan-400 block mb-1">No Cultural Trivia Tested:</strong>
            <p className="text-slate-300">
              Every question is self-contained. Rhetorical synthesis bullet points and science passage inferences provide all necessary facts directly in the prompt.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <strong className="text-cyan-400 block mb-1">Waive $300 in English Tests:</strong>
            <p className="text-slate-300">
              Scoring 650+ or 700+ on SAT Reading and Writing automatically fulfills the English language proficiency requirement at universities like Columbia, NYU, Boston University, and Michigan.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Official College Board Links */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <h4 className="text-white font-bold text-sm">Official College Board International Policies</h4>
          <p className="text-slate-400 mt-0.5">
            Always verify your country&apos;s specific rules directly on the College Board portal.
          </p>
        </div>

        <a
          href="https://satsuite.collegeboard.org/sat/registration/international-testing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors shrink-0"
        >
          College Board International Page <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
