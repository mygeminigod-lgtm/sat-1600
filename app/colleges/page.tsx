'use client';

import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info
} from 'lucide-react';
import universitiesData from '@/data/universities.json';
import { University } from '@/types/sat';
import { useStudentStore } from '@/lib/store';

export default function CollegesPage() {
  const { profile } = useStudentStore();

  const [query, setQuery] = useState('');
  const [policyFilter, setPolicyFilter] = useState<string>('all');
  const [aidOnly, setAidOnly] = useState<boolean>(false);

  const filteredColleges = useMemo(() => {
    return (universitiesData as University[]).filter((u) => {
      if (policyFilter !== 'all' && u.testingPolicy !== policyFilter) return false;
      if (aidOnly && !u.aidForInternational) return false;
      if (query.trim()) {
        const target = `${u.name} ${u.country}`.toLowerCase();
        if (!target.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [query, policyFilter, aidOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <GraduationCap className="w-3.5 h-3.5" /> Admissions Intelligence
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          University SAT Score Ranges & Policies
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Middle-50% SAT scores, superscoring rules, and international financial aid availability for world-class universities.
        </p>

        <p className="text-[11px] text-slate-500 mt-2 italic">
          *Disclaimer: A competitive SAT score does not guarantee admission. Admissions are holistic. Always verify policies directly on official university admissions portals.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search universities by name or country (e.g. 'MIT', 'Harvard', 'Singapore')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <select
            value={policyFilter}
            onChange={(e) => setPolicyFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200"
          >
            <option value="all">All Testing Policies</option>
            <option value="Required">SAT Required</option>
            <option value="Test-Optional">Test-Optional</option>
          </select>

          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={aidOnly}
              onChange={(e) => setAidOnly(e.target.checked)}
              className="rounded accent-emerald-500"
            />
            <span>International Aid Available</span>
          </label>
        </div>
      </div>

      {/* Colleges Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="p-4">University</th>
              <th className="p-4">Country</th>
              <th className="p-4">Middle 50% SAT Range</th>
              <th className="p-4">Superscore?</th>
              <th className="p-4">Testing Policy</th>
              <th className="p-4">International Aid</th>
              <th className="p-4 text-right">Admissions Page</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredColleges.map((col) => {
              const [minScore, maxScore] = col.middle50SAT;
              const isTargetWithin = profile.currentScore >= minScore;

              return (
                <tr key={col.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white whitespace-nowrap">
                    {col.name}
                  </td>
                  <td className="p-4 text-slate-300">{col.country}</td>
                  <td className="p-4">
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                      isTargetWithin ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-200 bg-slate-800'
                    }`}>
                      {minScore} - {maxScore}
                    </span>
                  </td>
                  <td className="p-4">
                    {col.superscorePolicy ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> No
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      col.testingPolicy === 'Required'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {col.testingPolicy}
                    </span>
                  </td>
                  <td className="p-4">
                    {col.aidForInternational ? (
                      <span className="text-emerald-400 font-semibold">Yes (Need/Merit)</span>
                    ) : (
                      <span className="text-slate-500">Limited / None</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={col.admissionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      Official Page <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
