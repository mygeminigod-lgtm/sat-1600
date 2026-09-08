import React from 'react';
import Link from 'next/link';
import { Target, Sparkles, ShieldCheck, Zap, Clock, BookmarkCheck, ArrowRight } from 'lucide-react';

export default function Strategy1600Page() {
  const strategies = [
    {
      title: '1. The 3-Pass Test-Taking Protocol',
      tag: 'Timing & Pacing',
      content: `High scorers do not solve questions in a single rigid linear sweep:
• Pass 1 (0-18 min): Blitz through questions you can solve with 100% certainty. Never linger more than 60 seconds on any single item.
• Pass 2 (18-28 min): Attack flagged items. Use Desmos regressions, back-solving from choices, or extreme value testing.
• Pass 3 (28-35 min): The Audit. Never just "look over" your work. Re-solve the calculation using an alternative method (e.g. algebraic vs graphical).`
    },
    {
      title: '2. The Zero-Careless-Mistake Audit',
      tag: 'Error Elimination',
      content: `At 1500+, 80% of lost points are NOT conceptual gaps. They are unforced errors:
• Underline the exact target: Did the question ask for x, 2x, x + y, or the radius?
• Sign reversals in quadratics: Watch for -(-b) when applying the quadratic formula or Vieta's relations.
• Comma splices: Ensure you never join two independent clauses with only a comma.`
    },
    {
      title: '3. Digital SAT Adaptive Routing Mastery',
      tag: 'Algorithm Strategy',
      content: `The Digital SAT uses two-stage adaptive testing:
• Module 1 is the gatekeeper. Making 3+ unforced errors on Module 1 permanently caps your score ceiling by routing you to the easier Module 2!
• Treat Module 1 like a minefield: precision takes priority over pure speed. Bank time on easy items, but verify them before submitting.`
    },
    {
      title: '4. The Desmos Second-Check Protocol',
      tag: 'Math Hack',
      content: `Never leave a tricky math question to manual algebra alone:
• If solving a system of equations, type both lines in Desmos to click the gray intersection point.
• For questions asking for "how many real solutions," graph y = [left side] and y = [right side] and count intersections.
• For unknown constants, add a slider and visually verify within 5 seconds.`
    },
    {
      title: '5. The Final 14-Day Content Freeze',
      tag: 'Test Readiness',
      content: `During the final 2 weeks before test day:
• Stop buying new textbooks or learning obscure edge cases.
• Focus exclusively on reviewing your personal SAT Mistake Book.
• Sleep 8+ hours consistently to ensure peak working-memory speed and attention span.`
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          <Target className="w-3.5 h-3.5" /> For 1500+ Shooters
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          1600 Elite Strategy Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          How the world&apos;s top test takers eliminate the final 3-5 mistakes. Designed to maximize your probability of reaching a 1600.
        </p>

        <p className="text-[11px] text-slate-500 mt-2 italic">
          *Note: No strategy guarantees an exact 1600. These methods are engineered to minimize unforced errors under real testing pressure.
        </p>
      </div>

      {/* Strategies List */}
      <div className="space-y-6">
        {strategies.map((strat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {strat.title}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {strat.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-mono">
              {strat.content}
            </p>
          </div>
        ))}
      </div>

      {/* Call to action to mistake book */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Ready to eliminate your final errors?</h3>
          <p className="text-xs text-slate-400 mt-0.5">Audit every question you got wrong on your last practice test.</p>
        </div>
        <Link
          href="/mistake-book"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-all"
        >
          Open SAT Mistake Book <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
