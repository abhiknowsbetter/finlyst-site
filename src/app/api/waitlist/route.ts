// Next.js App Router API route for waitlist
import { NextRequest, NextResponse } from 'next/server';
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

function writeWaitlist(list: any[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, tags = [] } = body;
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required.' }, { status: 400 });
  }
  const waitlist = readWaitlist();
  if (waitlist.find((x: any) => x.email === email)) {
    return NextResponse.json({ error: 'Already signed up.' }, { status: 409 });
  }
  if (waitlist.length >= MAX_SPOTS) {
    return NextResponse.json({ error: 'Waitlist full.' }, { status: 403 });
  }
  const entry = { name, email, tags, promo: tags.includes('first500') ? 'first500' : undefined, created: Date.now() };
  waitlist.push(entry);
  writeWaitlist(waitlist);
  return NextResponse.json({ ok: true, remaining: MAX_SPOTS - waitlist.length });
}

export async function GET() {
  const waitlist = readWaitlist();
  return NextResponse.json({ remaining: MAX_SPOTS - waitlist.length });
}
