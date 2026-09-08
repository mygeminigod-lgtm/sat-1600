import { NextRequest, NextResponse } from 'next/server';
import { askSatCoach, CoachRequestOptions } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body: CoachRequestOptions = await req.json();

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'A message prompt is required.' },
        { status: 400 }
      );
    }

    const response = await askSatCoach(body);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('API /api/ai/coach error:', error);
    return NextResponse.json(
      {
        content: 'An error occurred while communicating with the AI Tutor. Please try again or select a suggested topic.',
        verified: false,
        source: 'deterministic-verified',
        mode: 'teach',
      },
      { status: 500 }
    );
  }
}
