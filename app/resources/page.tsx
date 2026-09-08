'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Tag,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import resourcesData from '@/data/resources.json';
import { Resource } from '@/types/sat';

export default function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [officialOnly, setOfficialOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'official', label: 'Official College Board' },
    { id: 'tool', label: 'Calculators & Tools' },
    { id: 'book', label: 'Books' },
    { id: 'course', label: 'Courses' },
    { id: 'practice', label: 'Question Banks' },
    { id: 'international', label: 'International' },
    { id: 'free', label: 'Community' },
  ];

  const filteredResources = useMemo(() => {
    return (resourcesData as Resource[]).filter((r) => {
      if (officialOnly && !r.isOfficial) return false;
      if (priceFilter === 'free' && !r.isFree) return false;
      if (priceFilter === 'paid' && r.isFree) return false;
      if (selectedCategory !== 'all' && r.type !== selectedCategory) return false;

      if (query.trim()) {
        const target = `${r.name} ${r.description} ${r.bestFor}`.toLowerCase();
        if (!target.includes(query.toLowerCase())) return false;
      }

      return true;
    });
  }, [query, selectedCategory, priceFilter, officialOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <BookOpen className="w-3.5 h-3.5" /> Curated & Verified Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SAT Resource Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Transparent, authenticated directory of the highest-yield official materials, textbooks, question banks, and free tools. Zero fabricated links.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources by title, topic, or keyword (e.g. 'Bluebook', 'Desmos', 'Erica Meltzer')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills & Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
            >
              <option value="all">Free & Paid</option>
              <option value="free">Free Only</option>
              <option value="paid">Paid Books/Courses</option>
            </select>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={officialOnly}
                onChange={(e) => setOfficialOnly(e.target.checked)}
                className="rounded accent-emerald-500"
              />
              <span>Official Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  resource.isOfficial
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {resource.isOfficial ? 'Official SAT' : 'Third-Party'}
                </span>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  resource.isFree ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                }`}>
                  {resource.isFree ? '100% Free' : 'Paid / Book'}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {resource.name}
              </h3>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {resource.description}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs">
                <strong className="text-slate-300 block mb-0.5">Best For:</strong>
                <span className="text-slate-400">{resource.bestFor}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                Tier: {resource.difficulty}
              </span>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-xs font-semibold text-slate-200 transition-all shadow-sm"
              >
                Open Resource <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
