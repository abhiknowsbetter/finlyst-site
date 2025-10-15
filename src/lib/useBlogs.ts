"use client";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/types";
import { supabase } from "@/lib/supabaseClient";

export function useBlogs() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadingPosts(true);
      setError(null);
      // Try primary 'blogs'
      let { data, error } = await supabase
        .from('blogs')
        .select('title, slug, excerpt, created_at, published_at, content, published')
        .eq('published', true)
        .order('published_at', { ascending: false });
      if (error && (error as any).code === 'PGRST205') {
        const fb = await supabase
          .from('blog_posts')
          .select('title, slug, excerpt, created_at, published_at, content, published')
          .eq('published', true)
          .order('published_at', { ascending: false });
        data = fb.data as any[] | null;
        error = fb.error as any;
      }
      if (!mounted) return;
      if (error) {
        setError(error.message || 'Failed to load posts');
        setPosts(null);
      } else {
        const shaped: BlogPost[] = (data || []).map((d: any) => ({
          title: d.title,
          slug: d.slug,
          excerpt: d.excerpt ?? null,
          created_at: (d.published_at || d.created_at || new Date().toISOString()),
        }));
        setPosts(shaped);
      }
      setLoadingPosts(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  return { posts, loadingPosts, error };
}
