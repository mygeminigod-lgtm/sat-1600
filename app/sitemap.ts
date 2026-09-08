import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sat-1600.vercel.app';

  const routes = [
    '',
    '/dashboard',
    '/practice',
    '/ai-tutor',
    '/study-planner',
    '/mistake-book',
    '/roadmap',
    '/resources',
    '/where-to-practice',
    '/where-to-study',
    '/registration',
    '/international',
    '/test-day',
    '/score-goals',
    '/strategy-1600',
    '/practice-test-analyzer',
    '/timer',
    '/flashcards',
    '/daily-challenge',
    '/colleges',
    '/tools',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
