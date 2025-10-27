
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
    .from('posts')
    .select('id,title,excerpt,slug,published_at,is_published')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) throw new Error(`Blog fetch failed: ${error.message}`);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Blog</h1>
      {!posts?.length ? (
        <p className="opacity-70">No posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map(p => (
            <li key={p.id}>
              <a className="text-xl font-medium underline" href={`/blog/${p.slug}`}>{p.title}</a>
              <p className="opacity-80">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
