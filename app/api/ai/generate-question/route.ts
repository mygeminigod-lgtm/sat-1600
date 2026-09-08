import { NextRequest, NextResponse } from 'next/server';
import questionsData from '@/data/questions.json';
import { Question } from '@/types/sat';

export async function POST(req: NextRequest) {
  try {
    const { section, domain, difficulty } = await req.json();

    // Filter from verified bank
    let pool = questionsData as Question[];

    if (section && section !== 'all') {
      pool = pool.filter(q => q.section === section);
    }
    if (domain && domain !== 'all') {
      pool = pool.filter(q => q.domain.toLowerCase().includes(domain.toLowerCase()));
    }
    if (difficulty && difficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === difficulty);
    }

    if (pool.length === 0) {
      pool = questionsData as Question[];
    }

    const randomQuestion = pool[Math.floor(Math.random() * pool.length)];

    return NextResponse.json({
      question: randomQuestion,
      verified: true,
      source: 'verified-bank',
    });
  } catch (error) {
    console.error('API /api/ai/generate-question error:', error);
    return NextResponse.json(
      { error: 'Failed to generate question.' },
      { status: 500 }
    );
  }
}
