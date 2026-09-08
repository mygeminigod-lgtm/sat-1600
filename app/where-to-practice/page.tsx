import React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

export default function WhereToPracticePage() {
  const comparisonData = [
    {
      name: 'College Board Bluebook™',
      isOfficial: true,
      isFree: true,
      fullTests: '6 Full Adaptive Tests',
      questionBank: 'No (Full tests only)',
      sections: 'Math & Reading/Writing',
      difficulty: 'Exact Real Exam Match',
      bestFor: 'Mandatory full-length diagnostic exams and realistic software simulation.',
      url: 'https://bluebook.collegeboard.org',
    },
    {
      name: 'College Board Educator Question Bank',
      isOfficial: true,
      isFree: true,
      fullTests: 'No (Question sets)',
      questionBank: '3,000+ Official Questions',
      sections: 'Math & Reading/Writing',
      difficulty: 'Easy / Medium / Hard',
      bestFor: 'Targeted domain drilling with 100% authentic College Board test items.',
      url: 'https://satsuitequestionbank.collegeboard.org',
    },
    {
      name: 'Khan Academy Official SAT Prep',
      isOfficial: true,
      isFree: true,
      fullTests: 'Quizzes & Unit Tests',
      questionBank: 'Thousands of Interactive Drills',
      sections: 'Math & Reading/Writing',
      difficulty: 'Foundation to Advanced',
      bestFor: 'Step-by-step conceptual learning and skill-level progression.',
      url: 'https://www.khanacademy.org/digital-sat',
    },
    {
      name: 'UWorld Digital SAT',
      isOfficial: false,
      isFree: false,
      fullTests: 'Simulated Modules',
      questionBank: 'Extensive Drill Bank',
      sections: 'Math & Reading/Writing',
      difficulty: 'Hard (Pushes limits)',
      bestFor: 'Students scoring 1300+ seeking relentless difficulty and visual explanations.',
      url: 'https://collegeprep.uworld.com/sat',
    },
    {
      name: 'SAT 1600 Practice Center',
      isOfficial: false,
      isFree: true,
      fullTests: 'Timed Modules & Quizzes',
      questionBank: 'Verified Item Bank + Socratic AI',
      sections: 'Math & Reading/Writing',
      difficulty: 'Foundation to 1550+ Traps',
      bestFor: 'Socratic hint ladders, automated mistake tracking, and Desmos integration.',
      url: '/practice',
      isInternal: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
          Transparent Practice Matrix
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Where Should I Practice for the Digital SAT?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Compare the top official and third-party practice platforms. Don&apos;t waste time on obsolete paper-format questions.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="p-4">Platform</th>
              <th className="p-4">Official?</th>
              <th className="p-4">Cost</th>
              <th className="p-4">Full Tests</th>
              <th className="p-4">Question Bank</th>
              <th className="p-4">Best For</th>
              <th className="p-4 text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white whitespace-nowrap">
                  {row.name}
                </td>
                <td className="p-4">
                  {row.isOfficial ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Official
                    </span>
                  ) : (
                    <span className="text-slate-400">Third-Party</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`font-mono font-bold ${row.isFree ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {row.isFree ? 'Free' : 'Paid'}
                  </span>
                </td>
                <td className="p-4 text-slate-300">{row.fullTests}</td>
                <td className="p-4 text-slate-300">{row.questionBank}</td>
                <td className="p-4 text-slate-400 max-w-xs">{row.bestFor}</td>
                <td className="p-4 text-right">
                  {row.isInternal ? (
                    <Link
                      href={row.url}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                    >
                      Practice Now <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <h4 className="font-bold text-slate-200 text-sm">The 1600 Preparation Recommendation:</h4>
        <p>
          Always start with <strong>College Board Bluebook</strong> for your diagnostic baseline. Use <strong>Khan Academy</strong> for filling conceptual gaps. Use the <strong>Official Question Bank</strong> for targeting specific domains, and log every missed question into your <strong>SAT Mistake Book</strong>.
        </p>
      </div>
    </div>
  );
}
