import { createClient } from "@supabase/supabase-js";

export const revalidate = 60; // cache for 60s (optional)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default async function BlogIndex() {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <section className="section-pad">
      <div className="container-mx">
        <h1 className="h2 accent-gradient mb-6">Blog</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {(posts ?? []).map((p) => (
            <article key={p.slug} className="card p-6">
              <h2 className="text-xl font-semibold mb-1">{p.title}</h2>
              <p className="text-xs text-gray-500 mb-2">
                Published on {new Date(p.published_at ?? p.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-sm mb-3">{p.excerpt}</p>
              <a className="underline text-gray-300 hover:text-white" href={`/blog/${p.slug}`}>
                Read more →
              </a>
            </article>
          ))}
          {(!posts || posts.length === 0) && <p className="text-gray-400">No posts yet.</p>}
        </div>
      </div>
    </section>
  );
}
