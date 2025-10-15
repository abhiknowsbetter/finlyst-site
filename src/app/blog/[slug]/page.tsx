import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import BackToBlog from "@/components/BackToBlog";

export const revalidate = 60; // ISR; remove if you want full dynamic

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, content, published, published_at, created_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return notFound();

  return (
    <article className="section-pad">
      <div className="container-mx">
  <BackToBlog className="text-xs text-gray-400 hover:text-white underline mb-4" to="/blog" />
        <h1 className="h2 accent-gradient mb-2">{data.title}</h1>
        <p className="text-xs text-gray-500 mb-6">
          Published on {new Date(data.published_at ?? data.created_at).toLocaleDateString()}
        </p>
        <div className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
          {data.content}
        </div>
      </div>
    </article>
  );
}
