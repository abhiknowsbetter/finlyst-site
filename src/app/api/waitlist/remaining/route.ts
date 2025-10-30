// Next.js App Router API route for waitlist remaining spots
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'waitlist.json');
const MAX_SPOTS = 500;

function readWaitlist() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET() {
  const waitlist = readWaitlist();
  return NextResponse.json({ remaining: MAX_SPOTS - waitlist.length });
}
