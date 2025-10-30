import Section from './Section';
import Link from 'next/link';
import { fetchPublishedPosts } from '@/lib/blogs';

export default async function Blog() {
  const posts = await fetchPublishedPosts();

  return (
    <Section id="blog">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">Latest from the Blog</h2>
          <Link href="/blog" className="text-xs text-silver-300 hover:text-silver-100">
            Visit Our Journal →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p: any) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-gradient card-hover p-5 group">
              <p className="text-[11px] text-silver-400 mb-1">
                Published on {new Date((p as any).created_at ?? (p as any).published_at ?? Date.now()).toLocaleDateString()}
              </p>
              <h3 className="text-[15px] font-semibold text-silver-50">{p.title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-silver-300">{p.excerpt}</p>
              <span className="mt-3 inline-block text-[12px] text-silver-400">Read more…</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
