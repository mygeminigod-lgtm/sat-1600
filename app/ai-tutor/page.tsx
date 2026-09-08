'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  BrainCircuit,
  Send,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Target,
  HelpCircle,
  Zap,
  BookOpen,
  ArrowRight,
  User,
  Bot
} from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import { AIChatMessage } from '@/types/sat';

export default function AITutorPage() {
  const { profile, mistakeAnalytics } = useStudentStore();

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: `Hello! I am your **SAT AI Coach**, engineered to guide you from your diagnostic score of **${profile.currentScore}** directly to a **${profile.targetScore}**.

I follow the **Socratic Method**: when you ask for help on a problem, I will give you strategic clues to help you solve it yourself rather than just giving away the answer.

What would you like to focus on right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verified: true,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'teach' | 'hint' | 'mistake' | 'quiz' | 'similar' | 'challenge'>('teach');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    { label: '1500+ Study Strategy', text: `I am currently scoring ${profile.currentScore} and want to reach ${profile.targetScore}. What should my weekly focus look like?`, mode: 'teach' as const },
    { label: 'Quadratic Discriminants', text: 'Explain how the discriminant (b² - 4ac) works on the SAT and how to solve it in Desmos.', mode: 'teach' as const },
    { label: 'Punctuation Boundaries', text: 'Teach me the exact rules for semicolons, colons, and dashes on Reading & Writing.', mode: 'teach' as const },
    { label: 'International SAT Rules', text: "I'm an international student. What are the strict ID and device requirements for Bluebook?", mode: 'teach' as const },
    { label: '1550+ Challenge Question', text: 'Give me a 1550+ level challenge question with traps.', mode: 'challenge' as const },
  ];

  const handleSendMessage = async (textToSend?: string, modeOverride?: typeof activeMode) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const mode = modeOverride || activeMode;

    const userMessage: AIChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      mode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode,
          currentScore: profile.currentScore,
          targetScore: profile.targetScore,
          weakestTopic: mistakeAnalytics.weakestDomain,
        }),
      });

      const data = await res.json();

      const botMessage: AIChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.content || 'Unable to generate response.',
        verified: data.verified ?? true,
        mode: data.mode || mode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error fetching AI coach response:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I encountered an issue connecting to the AI Coach service. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          verified: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex flex-col h-[calc(100vh-8rem)]">
      {/* 1. Header with Mode Selector */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shrink-0 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-emerald-400" />
            SAT AI Coach
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Socratic Engine
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Personalized for <strong>{profile.currentScore} → {profile.targetScore}</strong> • Weakness: <strong className="text-amber-400">{mistakeAnalytics.weakestDomain}</strong>
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(
            [
              { id: 'teach', label: 'Teach' },
              { id: 'hint', label: 'Hint Ladder' },
              { id: 'mistake', label: 'Analyze Error' },
              { id: 'quiz', label: 'Quiz' },
              { id: 'challenge', label: '1550+ Challenge' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeMode === m.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Messages Chat Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-slate-200'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-100 rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}
            >
              {/* Verification status if assistant */}
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {msg.verified ? '✓ Verified Pedagogical Answer' : 'AI-generated — review recommended'}
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">{msg.timestamp}</span>
                </div>
              )}

              <div className="prose prose-invert prose-xs sm:prose-sm max-w-none whitespace-pre-line">
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>SAT AI Coach is analyzing curriculum & verifying accuracy...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Quick Prompt Chips */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" /> Quick:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.text, qp.mode)}
            className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white shrink-0 transition-colors whitespace-nowrap"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* 4. Chat Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2 shrink-0 shadow-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about any SAT concept, paste a question, or type in '${activeMode}' mode...`}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
