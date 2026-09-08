'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  DollarSign,
  Info,
  Clock
} from 'lucide-react';
import satDatesData from '@/data/sat_dates.json';

export default function RegistrationPage() {
  const steps = [
    { num: 1, title: 'Create Official College Board Account', desc: 'Sign up at collegeboard.org using your legal name exactly as written on your government passport.' },
    { num: 2, title: 'Select Your Test Date', desc: 'Choose a date allowing at least 8-12 weeks of deliberate study before your university deadlines.' },
    { num: 3, title: 'Find an Open Test Center', desc: 'Search by city/country. Reserve seats early, especially in international hubs where centers sell out rapidly.' },
    { num: 4, title: 'Complete Student Profile', desc: 'Enter high school information, GPA, and academic interests (optional questions can be skipped).' },
    { num: 5, title: 'Upload Your Photo', desc: 'Upload a clear passport-style headshot with plain background. Strict rules apply—hats/sunglasses prohibited.' },
    { num: 6, title: 'Select Accommodations (if approved)', desc: 'Must be officially approved by College Board Services for Students with Disabilities (SSD) well in advance.' },
    { num: 7, title: 'Pay Registration Fees', desc: 'Pay via international credit card or PayPal. Check your bank to permit overseas USD transactions.' },
    { num: 8, title: 'Confirm & Save Registration', desc: 'Check your email for official registration confirmation number and test center reporting address.' },
    { num: 9, title: 'Download Bluebook Testing App', desc: 'Download Bluebook on your testing device 1-2 weeks before test day to complete exam check-in.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* 1. Header with Official Portal Link */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Calendar className="w-3.5 h-3.5" /> Official College Board Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SAT Registration Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Step-by-step guidance to ensure seamless registration, avoid test center seat sell-outs, and prevent international ID complications.
        </p>

        {/* Notice Card */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-left flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-bold block mb-0.5">Important Official Notice:</strong>
            <p className="text-slate-300">
              SAT registration is conducted exclusively through the official <strong>College Board</strong> website.
              Never pay third-party intermediaries to book an SAT seat on your behalf.
            </p>
            <div className="mt-2">
              <a
                href="https://mysat.collegeboard.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-amber-400 hover:underline"
              >
                Go to Official College Board Registration Portal (mysat.collegeboard.org) <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Official Testing Dates & Deadlines Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            Official Testing Dates & Deadlines
          </h2>
          <span className="text-xs text-slate-400">Current testing cycles</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-x-auto shadow-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="p-4">Test Date</th>
                <th className="p-4">Regular Deadline</th>
                <th className="p-4">Late Registration</th>
                <th className="p-4">Score Release</th>
                <th className="p-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {satDatesData.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white whitespace-nowrap">
                    {d.testDate}
                  </td>
                  <td className="p-4 text-slate-300 whitespace-nowrap">{d.regDeadline}</td>
                  <td className="p-4 text-amber-300 whitespace-nowrap">{d.lateDeadline}</td>
                  <td className="p-4 text-emerald-400 font-mono whitespace-nowrap">{d.scoreRelease}</td>
                  <td className="p-4 text-slate-400 max-w-xs">{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. The 9-Step Registration Walkthrough */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          9 Steps to Official SAT Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                {s.num}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Fees Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          Official SAT Fee Schedule
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 block mb-1">Standard Registration Fee</span>
            <span className="text-2xl font-black font-mono text-white">$68 USD</span>
            <p className="text-[11px] text-slate-500 mt-1">Covers the full Digital SAT exam + 4 free score sends</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 block mb-1">International Regional Fee</span>
            <span className="text-2xl font-black font-mono text-amber-400">+$43 to $53 USD</span>
            <p className="text-[11px] text-slate-500 mt-1">Applies to all test takers testing outside the US</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 block mb-1">Late Registration Surcharge</span>
            <span className="text-2xl font-black font-mono text-rose-400">+$34 USD</span>
            <p className="text-[11px] text-slate-500 mt-1">For registering after regular deadline</p>
          </div>
        </div>
      </div>

      {/* 5. What to Bring vs Not to Bring */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
          <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Mandatory Items to Bring
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>✓ <strong>Valid, Government-Issued Photo ID:</strong> Passport required for most international students.</li>
            <li>✓ <strong>Testing Device:</strong> Laptop, iPad, or approved device with Bluebook installed.</li>
            <li>✓ <strong>Device Charger & Adapter:</strong> Battery must hold charge for minimum 3 hours.</li>
            <li>✓ <strong>Printed or Digital Admission Ticket:</strong> Generated in Bluebook after exam setup.</li>
            <li>✓ <strong>Acceptable Backup Calculator:</strong> (Optional, since Desmos is built into Bluebook).</li>
            <li>✓ <strong>Pencils / Pens:</strong> For scratch work on College Board provided paper.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
          <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-400" />
            Prohibited Items
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>✕ <strong>Smartwatches / Fitness Trackers:</strong> Must be powered off and stored away.</li>
            <li>✕ <strong>Separate Timers / Alarms:</strong> No audible timers allowed in test room.</li>
            <li>✕ <strong>Scratch Paper of Your Own:</strong> Test center proctors supply all scratch paper.</li>
            <li>✕ <strong>Highlighters / Correction Fluid:</strong> Not permitted on testing desks.</li>
            <li>✕ <strong>Cell Phones in Active Use:</strong> Phones must be completely powered down.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
