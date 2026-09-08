import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'SAT 1600 | The Complete AI-Powered SAT Command Center',
  description: 'Everything you need to go from your current score to 1600. Official SAT resources, verified practice, Socratic AI coaching, mistake book, dynamic study planning, and international student guidance.',
  keywords: [
    'SAT 1600',
    'Digital SAT Prep',
    'SAT Practice',
    'SAT for International Students',
    'Bluebook SAT',
    'SAT AI Tutor',
    'SAT Mistake Book',
    'SAT Study Plan',
    'Digital SAT Math',
    'Digital SAT Reading and Writing'
  ],
  authors: [{ name: 'SAT 1600 Team' }],
  metadataBase: new URL('https://sat-1600.vercel.app'),
  openGraph: {
    title: 'SAT 1600 | The Complete AI-Powered SAT Command Center',
    description: 'Study smarter, practice strategically, and use AI to turn every mistake into progress toward a 1600 SAT score.',
    url: 'https://sat-1600.vercel.app',
    siteName: 'SAT 1600',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white font-sans antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
