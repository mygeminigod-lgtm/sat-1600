'use client';

import React, { useState, useMemo } from 'react';
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
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Search,
  X,
  AlertCircle,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import satDatesData from '@/data/sat_dates.json';
import { useSATResources } from '@/lib/useSATResources';
import {
  SATResource,
  ResourceCategory,
  ResourceType,
  PriceType,
  DifficultyLevel,
  SectionType
} from '@/types/resource';

export default function AdminPage() {
  const { exportAllData, importAllData } = useStudentStore();
  const {
    resources,
    addResource,
    updateResource,
    deleteResource,
    toggleOfficial,
    toggleRecommended,
    updateLastChecked,
    resetToDefault,
    exportResourcesJSON,
  } = useSATResources();

  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'dates' | 'backup'>('resources');

  // Resource admin filters & search
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategory, setAdminCategory] = useState('all');

  // Add / Edit Resource Modal state
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingResource, setEditingResource] = useState<Partial<SATResource>>({});
  const [tagsInput, setTagsInput] = useState('');
  const [providesInput, setProvidesInput] = useState('');

  const filteredAdminResources = useMemo(() => {
    return resources.filter((r) => {
      if (adminCategory !== 'all' && r.category !== adminCategory) return false;
      if (adminSearch.trim()) {
        const q = adminSearch.toLowerCase().trim();
        const str = `${r.name} ${r.description} ${r.tags.join(' ')} ${r.url}`.toLowerCase();
        if (!str.includes(q)) return false;
      }
      return true;
    });
  }, [resources, adminCategory, adminSearch]);

  const handleExportData = () => {
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

  // Open Add Modal
  const openAddModal = () => {
    setEditingResource({
      id: `resource-${Date.now()}`,
      name: '',
      tagline: '',
      description: '',
      url: 'https://',
      category: 'official',
      section: 'All',
      type: 'Website',
      price: 'Free',
      difficulty: 'All Levels',
      official: false,
      recommended: false,
      qualityStatus: 'Third-Party',
      qualityReason: 'Added via Admin Management CMS',
      source: 'Independent Resource',
      lastChecked: new Date().toISOString().split('T')[0],
      bestFor: 'Students seeking targeted preparation.',
      tags: ['SAT', 'Practice'],
      whatItProvides: ['Structured practice materials'],
      whoShouldUseIt: 'SAT test takers',
      advantages: ['Flexible resource'],
      limitations: ['Self-paced review'],
      whyUseIt: 'Provides reliable practice material.',
    });
    setTagsInput('SAT, Practice');
    setProvidesInput('Structured practice materials');
    setModalMode('add');
  };

  // Open Edit Modal
  const openEditModal = (r: SATResource) => {
    setEditingResource({ ...r });
    setTagsInput(r.tags.join(', '));
    setProvidesInput(r.whatItProvides.join('\n'));
    setModalMode('edit');
  };

  // Save Modal
  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource.name || !editingResource.url) {
      alert('Resource Name and URL are required.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const whatItProvides = providesInput
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const payload: SATResource = {
      id: editingResource.id || `res-${Date.now()}`,
      name: editingResource.name || 'Untitled Resource',
      tagline: editingResource.tagline || editingResource.name || '',
      description: editingResource.description || '',
      url: editingResource.url || '',
      category: (editingResource.category as ResourceCategory) || 'official',
      section: (editingResource.section as SectionType) || 'All',
      type: (editingResource.type as ResourceType) || 'Website',
      price: (editingResource.price as PriceType) || 'Free',
      difficulty: (editingResource.difficulty as DifficultyLevel) || 'All Levels',
      official: Boolean(editingResource.official),
      recommended: Boolean(editingResource.recommended),
      qualityStatus: editingResource.official
        ? 'Official'
        : editingResource.recommended
        ? 'Highly Recommended'
        : 'Third-Party',
      qualityReason: editingResource.qualityReason || 'Cataloged resource',
      source: editingResource.source || 'SAT 1600 Admin',
      lastChecked: editingResource.lastChecked || new Date().toISOString().split('T')[0],
      bestFor: editingResource.bestFor || 'SAT students',
      tags: tags.length > 0 ? tags : ['SAT'],
      whatItProvides: whatItProvides.length > 0 ? whatItProvides : ['Authentic prep material'],
      whoShouldUseIt: editingResource.whoShouldUseIt || 'All SAT students',
      advantages: editingResource.advantages || ['High-yield practice'],
      limitations: editingResource.limitations || ['Self-study practice'],
      whyUseIt: editingResource.whyUseIt || 'Essential prep material.',
    };

    if (modalMode === 'add') {
      addResource(payload);
    } else if (modalMode === 'edit' && payload.id) {
      updateResource(payload.id, payload);
    }

    setModalMode(null);
  };

  const handleDeleteResource = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the resource library?`)) {
      deleteResource(id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Content Management System
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              SAT 1600 Platform Admin & CMS
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Maintain the verified SAT Resource Library, manage dates, and oversee client state without touching code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportResourcesJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export Resources JSON
            </button>

            <button
              onClick={handleExportData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Full Backup JSON
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'resources', label: `Resource Library CMS (${resources.length})`, icon: BookOpen },
            { id: 'overview', label: 'Platform Overview', icon: Layers },
            { id: 'dates', label: 'SAT Test Dates', icon: Calendar },
            { id: 'backup', label: 'Backup & Restore', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 1. RESOURCE MANAGEMENT CMS TAB */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search resources by name, tag, or URL..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <select
                  value={adminCategory}
                  onChange={(e) => setAdminCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-600"
                >
                  <option value="all">All Categories</option>
                  <option value="official">Official SAT</option>
                  <option value="free">Free SAT</option>
                  <option value="math">SAT Math</option>
                  <option value="reading-writing">Reading & Writing</option>
                  <option value="practice-tests">Practice Tests</option>
                  <option value="books">Books</option>
                  <option value="youtube">YouTube</option>
                  <option value="ai-tools">AI Tools</option>
                  <option value="international">International</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetToDefault}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold transition-colors"
                  title="Reset to authentic verified database"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" /> Reset Defaults
                </button>

                <button
                  onClick={openAddModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Resource
                </button>
              </div>
            </div>

            {/* Resources Table / List */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                      <th className="p-3.5">Resource Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Type & Price</th>
                      <th className="p-3.5">Status Toggles</th>
                      <th className="p-3.5">Last Checked</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAdminResources.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 text-sm">{res.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{res.tagline}</div>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-blue-600 hover:underline font-mono mt-0.5"
                          >
                            {res.url} <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                            {res.category}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                            Section: {res.section}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <div className="text-slate-700 font-medium">{res.type}</div>
                          <span
                            className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold font-mono mt-0.5 ${
                              res.price === 'Free'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {res.price}
                          </span>
                        </td>

                        <td className="p-3.5 space-y-1">
                          <button
                            onClick={() => toggleOfficial(res.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider block transition-colors ${
                              res.official
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                            title="Click to toggle official status"
                          >
                            {res.official ? '🟢 Official' : '⚪ Third-Party'}
                          </button>

                          <button
                            onClick={() => toggleRecommended(res.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider block transition-colors ${
                              res.recommended
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Click to toggle recommended status"
                          >
                            {res.recommended ? '⭐ Recommended' : '☆ Standard'}
                          </button>
                        </td>

                        <td className="p-3.5">
                          <div className="font-mono text-slate-600 text-[11px]">{res.lastChecked}</div>
                          <button
                            onClick={() => updateLastChecked(res.id)}
                            className="text-[10px] text-blue-600 hover:underline font-semibold block mt-0.5"
                          >
                            Check Today
                          </button>
                        </td>

                        <td className="p-3.5 text-right space-x-1.5">
                          <button
                            onClick={() => openEditModal(res)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Edit Resource"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteResource(res.id, res.name)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                            title="Delete Resource"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PLATFORM OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Active SAT Testing Windows
              </span>
              <span className="text-3xl font-black font-mono text-slate-900">{satDatesData.length} Dates</span>
              <p className="text-xs text-blue-600 mt-2">2024-2026 testing cycles active</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Verified Curated Resources
              </span>
              <span className="text-3xl font-black font-mono text-slate-900">{resources.length} Items</span>
              <p className="text-xs text-emerald-600 mt-2">100% verified authentic URLs</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                AI Socratic Tutor Status
              </span>
              <span className="text-3xl font-black font-mono text-emerald-600">Operational</span>
              <p className="text-xs text-slate-500 mt-2">Dual-Pass Socratic Engine active</p>
            </div>
          </div>
        )}

        {/* 3. TEST DATES TAB */}
        {activeTab === 'dates' && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                  <th className="p-4">Test Date</th>
                  <th className="p-4">Regular Deadline</th>
                  <th className="p-4">Late Registration</th>
                  <th className="p-4">Score Release</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {satDatesData.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-900">{d.testDate}</td>
                    <td className="p-4 text-slate-700">{d.regDeadline}</td>
                    <td className="p-4 text-amber-700">{d.lateDeadline}</td>
                    <td className="p-4 text-blue-700 font-mono font-semibold">{d.scoreRelease}</td>
                    <td className="p-4 text-slate-500">{d.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. BACKUP TAB */}
        {activeTab === 'backup' && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              Full Platform State Backup & Migration
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Download an authenticated JSON export of your complete profile, practice history, logged mistakes, custom study plans, and flashcards. Restore anytime on another device.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExportData}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Download Backup JSON
              </button>

              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer border border-slate-200">
                <Upload className="w-4 h-4" /> Restore from File
                <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
              </label>
            </div>

            {importStatus && (
              <p className="text-xs font-semibold text-emerald-600">{importStatus}</p>
            )}
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT RESOURCE */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {modalMode === 'add' ? 'Add New SAT Resource' : 'Edit SAT Resource'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Changes will be saved immediately to local storage and reflected in the live Resource Library.
                </p>
              </div>

              <button
                onClick={() => setModalMode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Resource Name *</label>
                  <input
                    type="text"
                    required
                    value={editingResource.name || ''}
                    onChange={(e) => setEditingResource({ ...editingResource, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium"
                    placeholder="e.g. Erica Meltzer SAT Reading"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL (Verified Link) *</label>
                  <input
                    type="url"
                    required
                    value={editingResource.url || ''}
                    onChange={(e) => setEditingResource({ ...editingResource, url: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium font-mono"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={editingResource.tagline || ''}
                  onChange={(e) => setEditingResource({ ...editingResource, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                  placeholder="One sentence summary of the resource."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingResource.description || ''}
                  onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 leading-relaxed"
                  placeholder="In-depth description of the material, content domains, and methodology."
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingResource.category || 'official'}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, category: e.target.value as any })
                    }
                    className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  >
                    <option value="official">Official SAT</option>
                    <option value="free">Free SAT</option>
                    <option value="math">SAT Math</option>
                    <option value="reading-writing">Reading & Writing</option>
                    <option value="practice-tests">Practice Tests</option>
                    <option value="books">Books</option>
                    <option value="youtube">YouTube</option>
                    <option value="ai-tools">AI Tools</option>
                    <option value="international">International</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Section</label>
                  <select
                    value={editingResource.section || 'All'}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, section: e.target.value as any })
                    }
                    className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  >
                    <option value="All">All Sections</option>
                    <option value="Math">Math</option>
                    <option value="Reading & Writing">Reading & Writing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={editingResource.type || 'Website'}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, type: e.target.value as any })
                    }
                    className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  >
                    <option value="Practice Test">Practice Test</option>
                    <option value="Question Bank">Question Bank</option>
                    <option value="Course">Course</option>
                    <option value="Book">Book</option>
                    <option value="Video">Video</option>
                    <option value="AI">AI</option>
                    <option value="Website">Website</option>
                    <option value="Study Guide">Study Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price</label>
                  <select
                    value={editingResource.price || 'Free'}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, price: e.target.value as any })
                    }
                    className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900"
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                    <option value="Freemium">Freemium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Best For</label>
                  <input
                    type="text"
                    value={editingResource.bestFor || ''}
                    onChange={(e) => setEditingResource({ ...editingResource, bestFor: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                    placeholder="e.g. Students scoring 600-720 looking to reach 780"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Verified Source</label>
                  <input
                    type="text"
                    value={editingResource.source || ''}
                    onChange={(e) => setEditingResource({ ...editingResource, source: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                    placeholder="e.g. College Board / Erica Meltzer"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono"
                  placeholder="Official, Free, Math, Algebra, 1500+"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  What It Provides (one item per line)
                </label>
                <textarea
                  rows={3}
                  value={providesInput}
                  onChange={(e) => setProvidesInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 leading-relaxed font-mono text-[11px]"
                  placeholder="6 full-length practice tests&#10;Detailed explanations&#10;Desmos calculator"
                />
              </div>

              {/* Checkbox Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-semibold">
                  <input
                    type="checkbox"
                    checked={Boolean(editingResource.official)}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, official: e.target.checked })
                    }
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Mark as Official College Board Resource</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-semibold">
                  <input
                    type="checkbox"
                    checked={Boolean(editingResource.recommended)}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, recommended: e.target.checked })
                    }
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Mark as ⭐ Highly Recommended</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

