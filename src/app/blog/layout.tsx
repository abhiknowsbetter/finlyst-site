export const runtime = 'edge';            // ✅ force Edge for all routes under /blog
export const dynamic = 'force-dynamic';   // avoid SSG at build time

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children; // pass-through layout
}
