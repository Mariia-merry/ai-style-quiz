import { NextResponse } from 'next/server';
import quiz from '@/data/quiz.json';

export async function GET() {
  return NextResponse.json(quiz);
} 