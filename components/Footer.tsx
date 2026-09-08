import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-3">SAT Preparation</h4>
            <ul className="space-y-2">
              <li><Link href="/practice" className="hover:text-blue-600 transition-colors">SAT Practice Center</Link></li>
              <li><Link href="/ai-tutor" className="hover:text-blue-600 transition-colors">SAT AI Coach</Link></li>
              <li><Link href="/study-planner" className="hover:text-blue-600 transition-colors">Personalized Study Plan</Link></li>
              <li><Link href="/mistake-book" className="hover:text-blue-600 transition-colors">SAT Mistake Book</Link></li>
              <li><Link href="/roadmap" className="hover:text-blue-600 transition-colors">7-Phase Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-3">Resources & Official</h4>
            <ul className="space-y-2">
              <li><Link href="/resources" className="hover:text-blue-600 transition-colors">SAT Resource Library</Link></li>
              <li><Link href="/registration" className="hover:text-blue-600 transition-colors">SAT Registration Guide</Link></li>
              <li><Link href="/where-to-practice" className="hover:text-blue-600 transition-colors">Where to Practice</Link></li>
              <li><Link href="/where-to-study" className="hover:text-blue-600 transition-colors">Where to Study</Link></li>
              <li>
                <a
                  href="https://bluebook.collegeboard.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                >
                  Bluebook™ Official <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-3">International & High Scorer</h4>
            <ul className="space-y-2">
              <li><Link href="/international" className="hover:text-blue-600 transition-colors">International Student Center</Link></li>
              <li><Link href="/strategy-1600" className="hover:text-blue-600 transition-colors">1600 Elite Strategy Guide</Link></li>
              <li><Link href="/score-goals" className="hover:text-blue-600 transition-colors">Score Breakdown Guides</Link></li>
              <li><Link href="/test-day" className="hover:text-blue-600 transition-colors">Test-Day Checklist</Link></li>
              <li><Link href="/colleges" className="hover:text-blue-600 transition-colors">College SAT Ranges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-3">Tools & Utilities</h4>
            <ul className="space-y-2">
              <li><Link href="/practice-test-analyzer" className="hover:text-blue-600 transition-colors">Practice Test Analyzer</Link></li>
              <li><Link href="/timer" className="hover:text-blue-600 transition-colors">SAT Pomodoro Timer</Link></li>
              <li><Link href="/flashcards" className="hover:text-blue-600 transition-colors">Vocabulary & Math Flashcards</Link></li>
              <li><Link href="/daily-challenge" className="hover:text-blue-600 transition-colors">Daily SAT Challenge</Link></li>
              <li><Link href="/tools" className="hover:text-blue-600 transition-colors">Score & Hours Calculators</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-[11px] leading-relaxed mb-8 flex items-start gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-800 mb-1">Official Testing & Transparency Notice</p>
            <p className="text-slate-600">
              SAT® is a registered trademark of the College Board, which is not affiliated with and does not endorse this independent platform.
              All official practice exams and registration actions must be completed directly through the official College Board Bluebook™ testing application and College Board website.
              No score improvement is guaranteed; results depend on individual effort, diagnostic accuracy, and deliberate practice.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-[11px]">
          <p>© {new Date().getFullYear()} SAT 1600. Engineered for aspiring 1600 scorers worldwide.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-slate-900">Admin</Link>
            <span>•</span>
            <span className="text-slate-400">Pure White Academic Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
