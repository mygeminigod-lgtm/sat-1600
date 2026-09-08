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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              16
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                SAT 1600
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PRO
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Digital SAT Command Center</span>
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
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded font-mono font-bold">
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Streak & Score Chip */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold" title="Study Streak">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
                <span>{profile.streak}d</span>
              </div>
              <span className="text-slate-600">|</span>
              <Link href="/dashboard" className="text-xs font-bold text-emerald-400 hover:underline">
                Target: {profile.targetScore}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-1">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-slate-800">
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
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Goal: <strong className="text-emerald-400">{profile.targetScore}</strong></span>
            <span>Current: <strong className="text-slate-200">{profile.currentScore}</strong></span>
            <span className="text-amber-400 font-bold">{profile.streak} Day Streak 🔥</span>
          </div>
        </div>
      )}
    </header>
  );
}
