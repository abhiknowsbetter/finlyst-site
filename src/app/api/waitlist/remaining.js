// Fallback serverless stub for waitlist remaining spots
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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const waitlist = readWaitlist();
    return res.status(200).json({ remaining: MAX_SPOTS - waitlist.length });
  }
  res.status(405).end();
}
