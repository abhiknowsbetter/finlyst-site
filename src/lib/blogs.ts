// src/lib/blogs.ts
export const runtime = 'edge';       // required by Cloudflare Pages
export const dynamic = 'force-dynamic'; // avoid SSG at build time

import { getSupabase } from "@/lib/supabaseClient";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string | null;
  published: boolean;
  created_at: string;
  published_at?: string | null;
};

export async function fetchPublishedPosts(limit = 6): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (!supabase) return []; // avoid build-time crashes if envs missing

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, published, created_at, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data as BlogPost;
}

// Optional compatibility alias if other files still import `getBlogs`
export async function getBlogs(limit = 6) {
  return fetchPublishedPosts(limit);
}
