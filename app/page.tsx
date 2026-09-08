import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  BookmarkCheck,
  Globe,
  Calendar,
  Compass,
  Award,
  BookOpen,
  Target,
  ShieldCheck,
  FileText,
  BarChart3,
  Layers,
  Zap,
  HelpCircle,
} from 'lucide-react';
import ScoreGoalSelector from '@/components/ScoreGoalSelector';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 mb-6 shadow-inner animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Definitive Digital SAT Command Center for Domestic & International Students</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Your complete roadmap <br className="hidden sm:inline" />
          to a <span className="gradient-text">1600.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Study smarter, practice strategically, and use AI to turn every mistake into progress.
          No more fragmented links or conflicting advice—everything you need in one unified command center.
        </p>

        {/* Primary Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/study-planner"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Start My SAT Plan <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all hover:scale-105"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Practice SAT
          </Link>
          <Link
            href="/ai-tutor"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 hover:from-emerald-900 hover:to-slate-800 text-emerald-300 font-semibold text-sm border border-emerald-500/30 transition-all hover:scale-105"
          >
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
            Ask SAT AI Coach
          </Link>
        </div>

        {/* Secondary Links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
          <Link href="/resources" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> SAT Resources
          </Link>
          <span>•</span>
          <Link href="/registration" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> SAT Registration
          </Link>
          <span>•</span>
          <Link href="/roadmap" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> 7-Phase Roadmap
          </Link>
          <span>•</span>
          <Link href="/international" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> International Student Guide
          </Link>
        </div>

        {/* 2. INTERACTIVE SCORE GOAL SELECTOR */}
        <div className="mt-14 max-w-5xl mx-auto text-left">
          <ScoreGoalSelector />
        </div>
      </section>

      {/* 3. CORE PROMISE & TRUST ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">100% Verified Official Data First</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never fabricate dates, fees, or testing rules. All official resources point directly to the College Board, Bluebook, and Khan Academy, strictly labeled for transparency.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Socratic AI Tutoring (Not Spoon-Fed)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our SAT AI Coach uses a multi-tier hint ladder (Hint 1 → Hint 2 → Hint 3 → Full Solution) to train authentic test-day problem-solving rather than instantly giving away answers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Built for International Students</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Device requirements, international passport mandates, fee surcharges, center seat shortages, and English language learner (ELL) strategies built-in from day one.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE 10 COMMAND CENTER CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything in one place. <br />
            <span className="gradient-text font-black">Learn. Practice. Analyze. Improve. Repeat.</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Don&apos;t just collect random SAT PDFs. Follow an integrated system designed to systematically eliminate every lost point.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Practice Center */}
          <Link
            href="/practice"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">Adaptive & Timed</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              SAT Practice Center
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Practice authentic Digital SAT questions across Algebra, Advanced Math, Transitions, and Boundaries with built-in Desmos tips, timer, and hints.
            </p>
          </Link>

          {/* Card 2: AI Coach */}
          <Link
            href="/ai-tutor"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-purple-400 font-semibold">Dual-Pass Verified</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              SAT AI Coach & Tutor
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Ask any question, analyze test mistakes, request socratic hints, or take 1550+ challenge quizzes personalized to your diagnostic score.
            </p>
          </Link>

          {/* Card 3: Mistake Book */}
          <Link
            href="/mistake-book"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-semibold">Root Cause Analytics</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              SAT Mistake Book
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Automatically track every wrong answer. Discover whether your #1 source of lost points is misreading stems, careless signs, or conceptual gaps.
            </p>
          </Link>

          {/* Card 4: Study Plan Generator */}
          <Link
            href="/study-planner"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-blue-400 font-semibold">Dynamic & Adaptive</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              AI Study Plan Generator
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Generate daily missions, weekly targets, and final 30-day / 7-day countdown plans that dynamically prioritize topics you miss most.
            </p>
          </Link>

          {/* Card 5: 7-Phase Roadmap */}
          <Link
            href="/roadmap"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">7 Phases to 1600</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              Interactive SAT Roadmap
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Step from Phase 1 (Diagnose) through Foundations, Timed Practice, and Error Elimination up to your final official 1600 attempt.
            </p>
          </Link>

          {/* Card 6: International Student Center */}
          <Link
            href="/international"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold">Global Guidance</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              International Student Center
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Passport rules, testing center shortages in Asia/Europe/Latin America, international payment fixes, and TOEFL/IELTS score waiver policies.
            </p>
          </Link>

          {/* Card 7: Practice Test Analyzer */}
          <Link
            href="/practice-test-analyzer"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-rose-400 font-semibold">Score Diagnostics</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
              Practice Test Analyzer
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Enter your Bluebook test scores to isolate exactly where you lost points, see your projected range, and generate a 7-day remediation plan.
            </p>
          </Link>

          {/* Card 8: Test-Day Center */}
          <Link
            href="/test-day"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">Checklist & Rules</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              Test-Day Center & Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Interactive device and packing checklist, 10-minute break strategies, Desmos hacks, and module pacing guidelines.
            </p>
          </Link>

          {/* Card 9: 1600 Strategy Center */}
          <Link
            href="/strategy-1600"
            className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-semibold">1550+ Shooters</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              1600 Strategy Center
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Master the 3-Pass method, speed-run Module 1 to bank 10+ minutes for hard Module 2 questions, and eliminate unforced errors.
            </p>
          </Link>
        </div>
      </section>

      {/* 5. OFFICIAL RESOURCE COMPARISON TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
              Curated Official Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              &ldquo;Where should I practice and study for the SAT?&rdquo;
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              We evaluated dozens of platforms so you don&apos;t waste time on obsolete materials.
              Explore our transparent breakdown comparing Bluebook, Khan Academy, Educator Question Bank, UWorld, and Erica Meltzer.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/where-to-practice"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Compare Practice Resources <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/where-to-study"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                Compare Study Books & Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop searching the internet. <br />
            <span className="gradient-text font-black">Execute your 1600 plan today.</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-4">
            Join thousands of ambitious students turning diagnostic scores into dream college admissions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
            >
              Open My Student Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
