'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  Target,
  BrainCircuit,
  Calendar,
  BookmarkCheck,
  Compass,
  Globe,
  Award,
  GraduationCap,
  Timer,
  FileQuestion,
  Layers,
  X
} from 'lucide-react';

interface SearchItem {
  title: string;
  category: string;
  href: string;
  icon: React.ElementType;
  keywords: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { title: 'Student Command Center / Dashboard', category: 'Dashboard', href: '/dashboard', icon: Target, keywords: 'overview goals stats mission progress' },
  { title: 'Digital SAT Practice Center', category: 'Practice', href: '/practice', icon: FileQuestion, keywords: 'questions math reading writing algebra geometry timed' },
  { title: 'SAT AI Coach (Tutor)', category: 'AI', href: '/ai-tutor', icon: BrainCircuit, keywords: 'ai tutor help hints explain concept quiz challenge' },
  { title: 'SAT Study Plan Generator', category: 'Planner', href: '/study-planner', icon: Calendar, keywords: 'schedule daily weekly monthly countdown 30-day 7-day' },
  { title: 'SAT Mistake Book & Error Log', category: 'Analytics', href: '/mistake-book', icon: BookmarkCheck, keywords: 'wrong answers mistakes error type journal review' },
  { title: '7-Phase SAT Interactive Roadmap', category: 'Roadmap', href: '/roadmap', icon: Compass, keywords: 'milestones steps phases diagnose foundations 1600' },
  { title: 'Official & Free SAT Resource Library', category: 'Resources', href: '/resources', icon: BookOpen, keywords: 'books links khan academy bluebook question bank erica meltzer' },
  { title: 'Where Should I Practice for the SAT?', category: 'Comparison', href: '/where-to-practice', icon: Layers, keywords: 'comparison question bank practice tests best material' },
  { title: 'Where Should I Study for the SAT?', category: 'Comparison', href: '/where-to-study', icon: Layers, keywords: 'courses tutors books youtube self study' },
  { title: 'SAT Registration & Test Dates Center', category: 'Registration', href: '/registration', icon: Calendar, keywords: 'register college board dates deadlines test center fees' },
  { title: 'International Student SAT Center', category: 'International', href: '/international', icon: Globe, keywords: 'passport device loan bluebook country adapter toefl waiver' },
  { title: 'SAT Test-Day Checklist & Strategy', category: 'Test Day', href: '/test-day', icon: Award, keywords: 'what to bring desmos packing check in rules calculator' },
  { title: '1600 Elite Strategy Guide', category: 'Strategy', href: '/strategy-1600', icon: Award, keywords: 'eliminate mistakes 3-pass method time endurance 1550 1600' },
  { title: 'Score Goal Breakthrough Guides', category: 'Strategy', href: '/score-goals', icon: Target, keywords: '1100 1200 1300 1400 1500 1550 plateau jump' },
  { title: 'Practice Test Score Analyzer', category: 'Analytics', href: '/practice-test-analyzer', icon: Target, keywords: 'bluebook test score breakdown projected score diagnosis' },
  { title: 'Study & Pomodoro Timer', category: 'Tools', href: '/timer', icon: Timer, keywords: 'pomodoro 25/5 50/10 35-min module practice clock' },
  { title: 'Digital SAT Flashcards (Vocab & Math)', category: 'Tools', href: '/flashcards', icon: Layers, keywords: 'vocabulary flashcards formulas grammar desmos rules srs' },
  { title: 'Daily SAT Challenge', category: 'Practice', href: '/daily-challenge', icon: Award, keywords: 'daily question streak countdown' },
  { title: 'University & College Admissions Tracker', category: 'Colleges', href: '/colleges', icon: GraduationCap, keywords: 'colleges sat ranges mit harvard stanford superscore financial aid' },
  { title: 'SAT Calculators & Tools', category: 'Tools', href: '/tools', icon: Target, keywords: 'study hours calculator score converter days until test' },
];

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          const searchBtn = document.querySelector('button[aria-label="Search"]') as HTMLButtonElement;
          if (searchBtn) searchBtn.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = SEARCH_ITEMS.filter((item) => {
    const searchTarget = `${item.title} ${item.category} ${item.keywords}`.toLowerCase();
    return searchTarget.includes(query.toLowerCase());
  });

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search all SAT guides, practice tools, topics, and resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No results found for &ldquo;{query}&rdquo;. Try searching for &ldquo;math&rdquo;, &ldquo;bluebook&rdquo;, or &ldquo;resources&rdquo;.
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 group-hover:text-blue-700">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Jump →</span>
                </button>
              );
            })
          )}
        </div>

        <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center px-4">
          <span>Navigate with <strong>↑</strong> <strong>↓</strong> and <strong>Enter</strong></span>
          <span>Press <strong>ESC</strong> to dismiss</span>
        </div>
      </div>
    </div>
  );
}
