"use client";
import { useEffect, useState } from "react";
import { fetchPublishedPosts, type BlogPost } from "@/lib/blogs";

export function useBlogs(limit = 6) {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoadingPosts(true);
    setError(null);
    fetchPublishedPosts(limit)
      .then((d) => { if (active) setPosts(d); })
      .catch((e) => { if (active) setError(e.message || 'Failed to load posts'); })
      .finally(() => { if (active) setLoadingPosts(false); });
    return () => { active = false; };
  }, [limit]);

  return { posts, loadingPosts, error };
}
