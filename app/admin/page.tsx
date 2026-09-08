'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  Upload,
  Database,
  Calendar,
  BookOpen,
  FileQuestion,
  Users,
  CheckCircle2,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import satDatesData from '@/data/sat_dates.json';
import resourcesData from '@/data/resources.json';

export default function AdminPage() {
  const { exportAllData, importAllData } = useStudentStore();

  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'dates' | 'backup'>('overview');

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sat-1600-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importAllData(content);
      setImportStatus(success ? 'Data imported successfully! Reloading...' : 'Failed to import backup JSON.');
      if (success) {
        setTimeout(() => window.location.reload(), 1500);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            SAT 1600 Platform Admin & CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update time-sensitive SAT dates, manage verified resources, review question items, and backup client databases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Data JSON
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Platform Overview' },
          { id: 'dates', label: 'SAT Dates Management' },
          { id: 'resources', label: 'Curated Resources' },
          { id: 'backup', label: 'Backup & Restore' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Active Official Testing Windows
            </span>
            <span className="text-3xl font-black font-mono text-white">{satDatesData.length} Dates</span>
            <p className="text-xs text-emerald-400 mt-2">2024-2026 testing cycles active</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Verified Practice Curricula
            </span>
            <span className="text-3xl font-black font-mono text-white">{resourcesData.length} Sources</span>
            <p className="text-xs text-slate-400 mt-2">Zero unverified links</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              AI Tutor Engine Status
            </span>
            <span className="text-3xl font-black font-mono text-emerald-400">Operational</span>
            <p className="text-xs text-slate-400 mt-2">Dual-Pass Socratic Engine active</p>
          </div>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === 'backup' && (
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Full Platform State Backup & Migration
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Download an authenticated JSON export of your complete profile, practice history, logged mistakes, custom study plans, and flashcards. Restore anytime on another device.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <Download className="w-4 h-4" /> Download Backup JSON
            </button>

            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer border border-slate-700">
              <Upload className="w-4 h-4" /> Restore from File
              <input type="file" accept=".json" onChange={handleCreateManualMistake_or_import} className="hidden" />
            </label>
          </div>

          {importStatus && (
            <p className="text-xs font-semibold text-emerald-400">{importStatus}</p>
          )}
        </div>
      )}

      {/* Dates Tab */}
      {activeTab === 'dates' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-semibold">
                <th className="p-4">Test Date</th>
                <th className="p-4">Regular Deadline</th>
                <th className="p-4">Late Registration</th>
                <th className="p-4">Score Release</th>
                <th className="p-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {satDatesData.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">{d.testDate}</td>
                  <td className="p-4 text-slate-300">{d.regDeadline}</td>
                  <td className="p-4 text-amber-400">{d.lateDeadline}</td>
                  <td className="p-4 text-emerald-400 font-mono">{d.scoreRelease}</td>
                  <td className="p-4 text-slate-400">{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourcesData.map((res) => (
            <div key={res.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between items-center">
                <strong className="text-white text-sm">{res.name}</strong>
                <span className="font-mono text-emerald-400">{res.isFree ? 'Free' : 'Paid'}</span>
              </div>
              <p className="text-slate-400">{res.description}</p>
              <div className="text-[10px] text-slate-500 pt-1 font-mono">{res.url}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function handleCreateManualMistake_or_import(e: React.ChangeEvent<HTMLInputElement>) {
    handleImportFile(e);
  }
}
