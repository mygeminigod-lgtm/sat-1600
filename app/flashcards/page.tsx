'use client';

import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight,
  BookOpen,
  Eye
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import { Flashcard } from '@/types/sat';

export default function FlashcardsPage() {
  const { flashcards, toggleFlashcardKnown } = useStudentStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New card form
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newCategory, setNewCategory] = useState<'vocab' | 'math' | 'grammar' | 'desmos'>('vocab');

  const filteredCards = flashcards.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < filteredCards.length ? prev + 1 : 0));
  };

  const handleToggleKnown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCard) {
      toggleFlashcardKnown(currentCard.id);
      handleNext();
    }
  };

  const knownCount = filteredCards.filter((c) => c.isKnown).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Layers className="w-3.5 h-3.5" /> High-Yield Spaced Repetition
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SAT Flashcard Vault
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Master vocabulary roots, essential math formulas, grammar boundaries, and Desmos shortcuts.
        </p>
      </div>

      {/* Category Pills & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Decks' },
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'math', label: 'Math Formulas' },
            { id: 'grammar', label: 'Grammar Rules' },
            { id: 'desmos', label: 'Desmos Hacks' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-emerald-400 font-bold">
          {knownCount} of {filteredCards.length} Mastered
        </span>
      </div>

      {/* Flashcard Interactive Card */}
      {currentCard && (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="min-h-[320px] sm:min-h-[360px] p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-emerald-500/50 transition-all select-none relative group"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="px-2.5 py-0.5 rounded uppercase font-mono font-bold text-[10px] bg-slate-800 text-slate-300">
              {currentCard.category}
            </span>
            <span className="text-slate-500 font-mono">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
          </div>

          {/* Card Content (Front vs Back) */}
          <div className="py-8 text-center my-auto">
            {!isFlipped ? (
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentCard.front}
                </h3>
                <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Click anywhere to reveal definition / formula
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-w-xl mx-auto">
                <p className="text-base sm:text-lg text-slate-100 leading-relaxed whitespace-pre-line font-medium">
                  {currentCard.back}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <button
              onClick={handleToggleKnown}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                currentCard.isKnown
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {currentCard.isKnown ? 'Mastered ✓' : 'Mark as Known'}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
            >
              Next Card <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
