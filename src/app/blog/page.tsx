
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;



import { getSupabase } from "@/lib/supabaseClient";

export default async function BlogPage() {
  const supabase = getSupabase();
  if (!supabase) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="opacity-70 mt-2">Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.</p>
      </main>
    );
  }

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id,title,excerpt,slug,published_at')
    .order('published_at', { ascending: false });

  if (error) throw new Error(`Blog fetch failed: ${error.message}`);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Blog</h1>
      {!posts?.length ? (
        <p className="opacity-70">No posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map(p => (
            <article key={p.id} className="card p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-semibold mb-1">{p.title}</h2>
                <p className="text-xs text-gray-500 mb-2">Published: {p.published_at ? new Date(p.published_at).toISOString().slice(0, 10) : ''}</p>
                <p className="opacity-80 mb-3">{p.excerpt}</p>
              </div>
              <a
                className="btn-metal-gradient mt-auto text-center block py-2 px-4 font-medium"
                href={`/blog/${p.slug}`}
              >
                Read more
              </a>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
