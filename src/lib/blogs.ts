

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string | null;
  published: boolean;
  created_at: string;
  published_at?: string | null;
  image_url?: string | null;
};

export async function fetchPublishedPosts(limit = 6): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, published, created_at, published_at, image_url")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data as BlogPost;
}
import { supabase } from '@/lib/supabaseClient';

export type Blog = Record<string, any>;

export async function getBlogs(): Promise<Blog[]> {
  // Try primary table 'blogs' first
  let { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  // If table doesn't exist, fall back to 'blog_posts'
  if (error && (error as any)?.code === 'PGRST205') {
    const fallback = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    data = fallback.data as any[] | null;
    error = fallback.error as any;
  }

  if (error) {
    console.error('[getBlogs] error:', error);
    return [];
  }
  return data || [];
}
