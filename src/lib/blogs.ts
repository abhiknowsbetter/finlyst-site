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
