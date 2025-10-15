export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  content: string; // markdown-ish string
};

export const posts: Post[] = [
  {
    slug: '5-habits-to-fix-your-monthly-spending',
    title: '5 habits to fix your monthly spending',
    excerpt: 'Cut waste without changing your lifestyle.',
    date: '2025-10-10',
    content: `
**1) Do a 10-minute review each Sunday.**  
Look at last week’s top 5 expenses and tag any “regret” purchases…

**2) Use a mini-buffer (₹1,000).**  
Prevents small shocks from breaking your plan…

**3) …**
    `.trim(),
  },
  {
    slug: 'what-is-zero-based-budget',
    title: 'What is a zero-based budget?',
    excerpt: 'Give every rupee a job and watch clarity follow.',
    date: '2025-10-11',
    content: `
Zero-based means income − allocations = **0**. Every rupee is assigned to bills,
goals, or fun. Start with fixed costs → savings goals → variable spend…
    `.trim(),
  },
  {
    slug: 'build-emergency-fund-in-90-days',
    title: 'Build an emergency fund in 90 days',
    excerpt: 'Practical milestones that actually work.',
    date: '2025-10-12',
    content: `
Week 1–2: open a dedicated account.  
Weeks 3–8: auto-transfer 10% of income.  
Weeks 9–12: sell 1–2 low-use items and top-up…
    `.trim(),
  },
];
