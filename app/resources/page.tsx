'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Tag,
  CheckCircle2,
  DollarSign,
  Filter,
  Bookmark,
  BookmarkCheck,
  Star,
  Info,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  X,
  Compass,
  GraduationCap,
  Calendar,
  Globe,
  Clock,
  Award,
  ChevronRight,
  HelpCircle,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { useSATResources } from '@/lib/useSATResources';
import {
  SATResource,
  ResourceCategory,
  ResourceType,
  PriceType,
  DifficultyLevel,
  SectionType,
  SmartRecommendationQuery,
  RecommendationStep
} from '@/types/resource';

export default function ResourcesPage() {
  const {
    resources,
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
    generateRecommendations
  } = useSATResources();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Curated Recommendation Section Tab State
  const [recommendedTab, setRecommendedTab] = useState<
    'start' | 'free' | 'tests' | 'math' | 'rw' | '1500' | 'international'
  >('start');

  // Resource Detail Modal State
  const [selectedResource, setSelectedResource] = useState<SATResource | null>(null);

  // Smart Recommendation Wizard ("What should I use?") State
  const [showWizard, setShowWizard] = useState(false);
  const [wizardQuery, setWizardQuery] = useState<SmartRecommendationQuery>({
    currentScore: 1250,
    targetScore: 1500,
    weakSection: 'Math',
    studyTime: '1 month',
    weeklyHours: 8,
  });
  const [wizardResults, setWizardResults] = useState<RecommendationStep[] | null>(null);

  // Categories config
  const categories: { id: string; label: string; count?: number }[] = [
    { id: 'all', label: 'All Resources' },
    { id: 'official', label: 'Official SAT' },
    { id: 'free', label: 'Free SAT' },
    { id: 'math', label: 'SAT Math' },
    { id: 'reading-writing', label: 'Reading & Writing' },
    { id: 'practice-tests', label: 'Practice Tests' },
    { id: 'books', label: 'Recommended Books' },
    { id: 'youtube', label: 'YouTube & Video' },
    { id: 'ai-tools', label: 'AI Study Tools' },
    { id: 'international', label: 'International Students' },
  ];

  // Curated lists for top tabs
  const curatedPicks = useMemo(() => {
    return {
      start: resources.filter((r) =>
        ['collegeboard-bluebook', 'khan-academy-sat', 'sat-1600-math-cheat-sheet', 'sat-rhetorical-synthesis-guide'].includes(r.id)
      ),
      free: resources.filter((r) => r.price === 'Free' && r.recommended),
      tests: resources.filter((r) => r.category === 'practice-tests' || r.type === 'Practice Test'),
      math: resources.filter((r) => r.section === 'Math' || r.category === 'math'),
      rw: resources.filter((r) => r.section === 'Reading & Writing' || r.category === 'reading-writing'),
      '1500': resources.filter((r) => r.difficulty === '1500+' || r.difficulty === 'Advanced'),
      international: resources.filter((r) => r.category === 'international' || r.tags.includes('International')),
    };
  }, [resources]);

  // Main Filtered Resources Logic
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      // Bookmarks filter
      if (bookmarksOnly && !bookmarkedIds.includes(r.id)) return false;

      // Category filter
      if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;

      // Section filter
      if (sectionFilter !== 'all') {
        if (sectionFilter === 'Math' && r.section !== 'Math' && r.section !== 'All') return false;
        if (sectionFilter === 'Reading & Writing' && r.section !== 'Reading & Writing' && r.section !== 'All') return false;
      }

      // Type filter
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;

      // Price filter
      if (priceFilter !== 'all' && r.price !== priceFilter) return false;

      // Difficulty level
      if (difficultyFilter !== 'all' && r.difficulty !== difficultyFilter) return false;

      // Source / Quality filter
      if (sourceFilter !== 'all') {
        if (sourceFilter === 'Official' && !r.official) return false;
        if (sourceFilter === 'Recommended' && !r.recommended) return false;
        if (sourceFilter === 'Third-Party' && r.official) return false;
      }

      // Text search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const searchable = [
          r.name,
          r.tagline,
          r.description,
          r.bestFor,
          r.topic || '',
          r.provider || '',
          r.channelName || '',
          r.tags.join(' '),
          r.whyUseIt || '',
          r.whoShouldUseIt || '',
        ]
          .join(' ')
          .toLowerCase();

        return searchable.includes(q);
      }

      return true;
    });
  }, [
    resources,
    bookmarksOnly,
    bookmarkedIds,
    selectedCategory,
    sectionFilter,
    typeFilter,
    priceFilter,
    difficultyFilter,
    sourceFilter,
    searchQuery,
  ]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (sectionFilter !== 'all') count++;
    if (typeFilter !== 'all') count++;
    if (priceFilter !== 'all') count++;
    if (difficultyFilter !== 'all') count++;
    if (sourceFilter !== 'all') count++;
    if (bookmarksOnly) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [
    selectedCategory,
    sectionFilter,
    typeFilter,
    priceFilter,
    difficultyFilter,
    sourceFilter,
    bookmarksOnly,
    searchQuery,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSectionFilter('all');
    setTypeFilter('all');
    setPriceFilter('all');
    setDifficultyFilter('all');
    setSourceFilter('all');
    setBookmarksOnly(false);
    setSearchQuery('');
  };

  const handleRunWizard = () => {
    const results = generateRecommendations(wizardQuery);
    setWizardResults(results);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. TOP HERO SECTION */}
      <section className="border-b border-slate-200 bg-slate-50/50 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-4">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Verified & Authenticated Directory • 100% Real Links</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              SAT Resources
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal leading-relaxed">
              Everything you need to study, practice, and prepare for the SAT.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
              Curated official materials, textbooks, question banks, and free tools with zero fabricated links. Designed to help you quickly find the exact resource for your current goal.
            </p>

            {/* Quick action buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowWizard(true);
                  if (!wizardResults) handleRunWizard();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <HelpCircle className="w-4 h-4" />
                What Should I Use? (Smart Recommender)
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('official');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 shadow-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Official College Board Material
              </button>

              <button
                onClick={() => {
                  setPriceFilter('Free');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                100% Free Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECOMMENDED FOR MOST STUDENTS SECTION */}
      <section className="border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                Curated High-Yield Selections
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                ⭐ Recommended for most students
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Highest-priority materials organized by phase and section.
              </p>
            </div>

            {/* Quick Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              {[
                { id: 'start', label: 'Start Here' },
                { id: 'free', label: 'Best Free' },
                { id: 'tests', label: 'Best Practice Tests' },
                { id: 'math', label: 'Best Math' },
                { id: 'rw', label: 'Best Reading & Writing' },
                { id: '1500', label: 'Best for 1500+' },
                { id: 'international', label: 'Best for International' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRecommendedTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    recommendedTab === tab.id
                      ? 'bg-white text-slate-900 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Curated Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {curatedPicks[recommendedTab].slice(0, 4).map((resource) => (
              <div
                key={resource.id}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        resource.official
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {resource.official ? '🟢 OFFICIAL' : '🔵 RECOMMENDED'}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        resource.price === 'Free'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {resource.price}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {resource.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-900 block font-semibold mb-0.5">Best for:</strong>
                    <span>{resource.bestFor}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedResource(resource)}
                    className="text-xs text-blue-700 hover:text-blue-900 font-semibold"
                  >
                    View Details
                  </button>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                  >
                    Open Resource <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEARCH & ADVANCED FILTER MATRIX */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Search Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search SAT resources (e.g. 'Algebra', 'SAT grammar', '1500+', 'Bluebook', 'Desmos', 'Free practice tests')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-700">Quick searches:</span>
            {[
              'Bluebook',
              'Algebra',
              'Desmos',
              'Erica Meltzer',
              'Grammar',
              '1500+',
              'International',
              'Question Bank',
            ].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Dropdown Filter Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-slate-200 text-xs">
            {/* Section Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Section
              </label>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Sections</option>
                <option value="Math">Math</option>
                <option value="Reading & Writing">Reading & Writing</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Types</option>
                <option value="Practice Test">Practice Test</option>
                <option value="Question Bank">Question Bank</option>
                <option value="Course">Course</option>
                <option value="Book">Book</option>
                <option value="Video">Video</option>
                <option value="AI">AI Tool</option>
                <option value="Website">Website</option>
                <option value="Study Guide">Study Guide</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Price
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Prices</option>
                <option value="Free">Free Only</option>
                <option value="Paid">Paid Only</option>
                <option value="Freemium">Freemium</option>
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Level
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="1500+">1500+ Elite</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Source
              </label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Sources</option>
                <option value="Official">Official (College Board)</option>
                <option value="Recommended">Highly Recommended</option>
                <option value="Third-Party">Third-Party</option>
              </select>
            </div>

            {/* Bookmarks & Reset */}
            <div className="flex items-end gap-1.5">
              <button
                onClick={() => setBookmarksOnly(!bookmarksOnly)}
                className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium transition-colors flex items-center justify-center gap-1 ${
                  bookmarksOnly
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
                title="Filter to bookmarked resources"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved ({bookmarkedIds.length})</span>
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 rounded-lg bg-white text-rose-600 border border-slate-300 hover:bg-rose-50 text-[11px] font-semibold transition-colors"
                  title="Reset all filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count & Quick Stats */}
        <div className="flex items-center justify-between gap-4 py-4 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900 font-bold">{filteredResources.length}</strong> verified SAT resources
            {activeFilterCount > 0 && (
              <span className="ml-2 text-blue-700 font-medium">({activeFilterCount} active filters)</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">🟢 Official: {resources.filter((r) => r.official).length}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">🎁 100% Free: {resources.filter((r) => r.price === 'Free').length}</span>
          </div>
        </div>

        {/* 4. RESOURCE CARDS GRID */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No resources match your current filters</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your search terms or clearing specific filters like section or price.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const bookmarked = isBookmarked(resource.id);

              return (
                <div
                  key={resource.id}
                  className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between p-6 relative group"
                >
                  <div>
                    {/* Card Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {resource.official ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                            🟢 OFFICIAL
                          </span>
                        ) : resource.recommended ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                            🔵 HIGHLY RECOMMENDED
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            ⚪ THIRD-PARTY
                          </span>
                        )}

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            resource.price === 'Free'
                              ? 'bg-emerald-100 text-emerald-900'
                              : resource.price === 'Paid'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-indigo-100 text-indigo-900'
                          }`}
                        >
                          {resource.price}
                        </span>
                      </div>

                      {/* Bookmark button */}
                      <button
                        onClick={() => toggleBookmark(resource.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          bookmarked
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title={bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
                      >
                        {bookmarked ? (
                          <BookmarkCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Resource Title & Tagline */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {resource.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                      {resource.description}
                    </p>

                    {/* Best for block */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      <strong className="text-slate-900 block font-semibold mb-0.5">Best for:</strong>
                      <span className="text-slate-600 leading-relaxed">{resource.bestFor}</span>
                    </div>

                    {/* Metadata chips */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        Section: {resource.section}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        Type: {resource.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        Level: {resource.difficulty}
                      </span>
                      {resource.topic && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">
                          Topic: {resource.topic}
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {resource.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400 font-mono">
                      <span>Source: {resource.source}</span>
                      <span className="block text-[10px]">Checked: {resource.lastChecked}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedResource(resource)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      >
                        Details
                      </button>

                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
                      >
                        Open Resource <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. SMART RECOMMENDATION MODAL ("What should I use?") */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Interactive Recommender
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  What Should I Use?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tell us your current score and goal to receive a tailored, 5-step curriculum prescription.
                </p>
              </div>

              <button
                onClick={() => setShowWizard(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inputs Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Current / Diagnostic Score
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="600"
                    max="1550"
                    step="10"
                    value={wizardQuery.currentScore}
                    onChange={(e) =>
                      setWizardQuery({ ...wizardQuery, currentScore: Number(e.target.value) })
                    }
                    className="w-full accent-blue-600 bg-slate-200 cursor-pointer"
                  />
                  <span className="font-mono text-base font-bold text-blue-700 w-14 text-right">
                    {wizardQuery.currentScore}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Score Goal
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={Math.min(1600, wizardQuery.currentScore + 50)}
                    max="1600"
                    step="10"
                    value={wizardQuery.targetScore}
                    onChange={(e) =>
                      setWizardQuery({ ...wizardQuery, targetScore: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600 bg-slate-200 cursor-pointer"
                  />
                  <span className="font-mono text-base font-bold text-indigo-700 w-14 text-right">
                    {wizardQuery.targetScore}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Weakest Area
                </label>
                <select
                  value={wizardQuery.weakSection}
                  onChange={(e) =>
                    setWizardQuery({ ...wizardQuery, weakSection: e.target.value as any })
                  }
                  className="w-full p-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium"
                >
                  <option value="Math">Math (Algebra, Geometry, Advanced)</option>
                  <option value="Reading & Writing">Reading & Writing (Grammar, Inference)</option>
                  <option value="Both">Both Sections Need Work</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Available Study Runway
                </label>
                <select
                  value={wizardQuery.studyTime}
                  onChange={(e) =>
                    setWizardQuery({ ...wizardQuery, studyTime: e.target.value as any })
                  }
                  className="w-full p-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-medium"
                >
                  <option value="2 weeks">Cramming (&lt; 2 weeks)</option>
                  <option value="1 month">1 Month Standard</option>
                  <option value="2-3 months">2-3 Months Recommended</option>
                  <option value="6+ months">6+ Months Long-Term</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleRunWizard}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Recalculate Recommendation Plan
              </button>
            </div>

            {/* Recommendations Output */}
            {wizardResults && (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                    Your Tailored 5-Step SAT Study Plan:
                  </h4>
                  <span className="text-blue-700 font-semibold font-mono">
                    Score Target: +{Math.max(0, wizardQuery.targetScore - wizardQuery.currentScore)} pts
                  </span>
                </div>

                <div className="space-y-3">
                  {wizardResults.map((step) => {
                    const primary = resources.find((r) => r.id === step.primaryResourceId);
                    const secondary = resources.find((r) => r.id === step.secondaryResourceId);

                    return (
                      <div
                        key={step.stepNumber}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-blue-700">
                            Step {step.stepNumber}: {step.title}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px]">
                            {step.timeAllocation}
                          </span>
                        </div>

                        <p className="text-slate-600 leading-relaxed">{step.tacticalAdvice}</p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {primary && (
                            <a
                              href={primary.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                            >
                              1. {primary.name} <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          {secondary && (
                            <a
                              href={secondary.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-100"
                            >
                              2. {secondary.name} <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. RESOURCE DETAIL MODAL */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedResource.official
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {selectedResource.official ? '🟢 OFFICIAL' : '🔵 RECOMMENDED'}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      selectedResource.price === 'Free'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {selectedResource.price}
                  </span>

                  <span className="text-xs text-slate-400 font-mono">
                    Tier: {selectedResource.difficulty}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedResource.name}
                </h2>
                <p className="text-sm text-slate-500 mt-1">{selectedResource.tagline}</p>
              </div>

              <button
                onClick={() => setSelectedResource(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quality Rationale Banner */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Why this resource is cataloged:</strong>
                <span>{selectedResource.qualityReason}</span>
              </div>
            </div>

            {/* AI Disclaimer if applicable */}
            {selectedResource.aiDisclaimer && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">AI Tool Notice & Independence:</strong>
                  <span>{selectedResource.aiDisclaimer}</span>
                </div>
              </div>
            )}

            {/* Description & Overview */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Description & Purpose</h4>
              <p>{selectedResource.description}</p>
            </div>

            {/* What it provides */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">What It Provides</h4>
              <ul className="space-y-1.5">
                {selectedResource.whatItProvides.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advantages & Limitations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                <h5 className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-700" />
                  Key Advantages
                </h5>
                <ul className="space-y-1 text-emerald-950">
                  {selectedResource.advantages.map((adv, idx) => (
                    <li key={idx} className="list-disc list-inside">
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  Limitations & Honest Caveats
                </h5>
                <ul className="space-y-1 text-slate-600">
                  {selectedResource.limitations.map((lim, idx) => (
                    <li key={idx} className="list-disc list-inside">
                      {lim}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Who Should Use It */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <strong className="text-slate-900 block font-semibold mb-1">Who Should Use It:</strong>
              <p className="text-slate-600 leading-relaxed">{selectedResource.whoShouldUseIt}</p>
            </div>

            {/* International Notes if applicable */}
            {selectedResource.internationalNotes && (
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs">
                <strong className="text-indigo-900 block font-semibold mb-1">
                  International Student Note:
                </strong>
                <p className="text-indigo-950 leading-relaxed">
                  {selectedResource.internationalNotes}
                </p>
              </div>
            )}

            {/* Related Resources */}
            {selectedResource.relatedResourceIds && selectedResource.relatedResourceIds.length > 0 && (
              <div className="pt-2">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Recommended Companion Resources:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.relatedResourceIds.map((relId) => {
                    const companion = resources.find((r) => r.id === relId);
                    if (!companion) return null;
                    return (
                      <button
                        key={companion.id}
                        onClick={() => setSelectedResource(companion)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-800 font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>{companion.name}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer External Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-slate-500 font-mono">
                <span>Verified Source: {selectedResource.source}</span>
                <span className="block text-[10px]">URL: {selectedResource.url}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedResource(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Close
                </button>

                <a
                  href={selectedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  {selectedResource.official ? 'Open Official Resource →' : 'Open Resource →'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

