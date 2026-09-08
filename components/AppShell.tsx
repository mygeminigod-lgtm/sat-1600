'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from './CommandPalette';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
