export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import BackToBlog from "@/components/BackToBlog";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  if (!supabase) {
    // No envs at build time — avoid crashing
    return notFound();
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, content, published, published_at, created_at")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (error || !data) return notFound();

  // Hydration-safe published date
     function PublishedDate({ date }: { date: string }) {
       return <>{date.slice(0, 10) ? `Published on ${date.slice(0, 10)}` : null}</>;
  }

  return (
    <article className="section-pad">
      <div className="container-mx">
        <BackToBlog className="text-xs text-gray-400 hover:text-white underline mb-4" to="/blog" />
        <h1 className="h2 accent-gradient mb-2">{data.title}</h1>
           <p className="text-xs text-gray-500 mb-6">
             <PublishedDate date={(data.published_at ?? data.created_at)} />
           </p>
        <div className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
          {data.content}
        </div>
      </div>
    </article>
  );
}
