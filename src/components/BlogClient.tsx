"use client";
import Section from './Section';
import Link from 'next/link';
import { useBlogs } from '@/lib/useBlogs';
import type { BlogPost } from '@/lib/types';

export default function BlogClient() {
  const { posts, loadingPosts, error } = useBlogs();

  return (
    <Section id="blog">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">Latest from the Blog</h2>
          <Link href="/blog" className="text-xs text-silver-300 hover:text-silver-100">
            See all blogs →
          </Link>
        </div>

        {error && (
          <p className="mb-4 text-[13px] text-red-300/80">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingPosts && (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-5 w-2/3 bg-white/10 rounded mb-3" />
                  <div className="h-4 w-full bg-white/10 rounded mb-2" />
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                </div>
              ))}
            </>
          )}

          {!loadingPosts && posts && posts.length === 0 && (
            <p className="text-gray-400">No posts yet. Check back soon.</p>
          )}

          {!loadingPosts && posts && posts.length > 0 && posts.map((p: BlogPost) => (
            <article key={p.slug} className="card card-gradient p-6 card-hover transition">
              <p className="text-[11px] text-gray-500 mb-1">{new Date(p.created_at).toLocaleDateString()}</p>
              <h3 className="text-gray-100 font-semibold mb-1">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{p.excerpt || ''}</p>
              <Link href={`/blog/${p.slug}`} className="text-sm text-gray-300 underline hover:text-white">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
