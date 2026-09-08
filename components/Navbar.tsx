'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Target,
  BrainCircuit,
  BookOpen,
  Calendar,
  Globe,
  Award,
  Search,
  Menu,
  X,
  BookmarkCheck,
  GraduationCap,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile } = useStudentStore();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Target },
    { href: '/practice', label: 'Practice', icon: CheckCircle2 },
    { href: '/ai-tutor', label: 'AI Tutor', icon: BrainCircuit, badge: 'AI' },
    { href: '/study-planner', label: 'Study Plan', icon: Calendar },
    { href: '/mistake-book', label: 'Mistake Book', icon: BookmarkCheck },
    { href: '/roadmap', label: 'Roadmap', icon: Compass },
    { href: '/resources', label: 'Resources', icon: BookOpen },
    { href: '/international', label: 'International', icon: Globe },
    { href: '/test-day', label: 'Test Day', icon: Award },
    { href: '/colleges', label: 'Colleges', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xl shadow-sm group-hover:bg-blue-700 transition-colors">
              16
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                SAT 1600
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  ACADEMIC
                </span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Digital SAT Resource & Command Center</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-mono font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white text-slate-500 rounded border border-slate-200 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Streak & Score Chip */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-1 text-amber-600 text-xs font-bold" title="Study Streak">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{profile.streak}d</span>
              </div>
              <span className="text-slate-300">|</span>
              <Link href="/dashboard" className="text-xs font-bold text-blue-600 hover:underline">
                Target: {profile.targetScore}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-50 border border-slate-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-50 border border-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-slate-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Goal: <strong className="text-blue-600">{profile.targetScore}</strong></span>
            <span>Current: <strong className="text-slate-700">{profile.currentScore}</strong></span>
            <span className="text-amber-600 font-bold">{profile.streak} Day Streak 🔥</span>
          </div>
        </div>
      )}
    </header>
  );
}
