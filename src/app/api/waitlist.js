// Fallback serverless stub for waitlist API
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

function writeWaitlist(list) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2));
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, tags = [] } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required.' });
    }
    const waitlist = readWaitlist();
    if (waitlist.find(x => x.email === email)) {
      return res.status(409).json({ error: 'Already signed up.' });
    }
    if (waitlist.length >= MAX_SPOTS) {
      return res.status(403).json({ error: 'Waitlist full.' });
    }
    const entry = { name, email, tags, promo: tags.includes('first500') ? 'first500' : undefined, created: Date.now() };
    waitlist.push(entry);
    writeWaitlist(waitlist);
    return res.status(200).json({ ok: true, remaining: MAX_SPOTS - waitlist.length });
  }
  if (req.method === 'GET') {
    const waitlist = readWaitlist();
    return res.status(200).json({ remaining: MAX_SPOTS - waitlist.length });
  }
  res.status(405).end();
}
