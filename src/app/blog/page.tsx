
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;



import { supabase } from "@/lib/supabaseClient";

export default async function BlogPage() {
  // use the exported supabase client directly
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
              <div className="flex gap-2 mt-3">
                {/* Social Share Buttons */}
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://finlyst.app/blog/' + p.slug)}&title=${encodeURIComponent(p.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0077B5] text-white hover:bg-[#005983] transition"
                  title="Share on LinkedIn"
                >
                  <span aria-label="LinkedIn" role="img">in</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://finlyst.app/blog/' + p.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#4267B2] text-white hover:bg-[#314d86] transition"
                  title="Share on Facebook"
                >
                  <span aria-label="Facebook" role="img">f</span>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://finlyst.app/blog/' + p.slug)}&text=${encodeURIComponent(p.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1DA1F2] text-white hover:bg-[#0d8ddb] transition"
                  title="Share on X"
                >
                  <span aria-label="X" role="img">X</span>
                </a>
                <a
                  href={`https://www.instagram.com/?url=${encodeURIComponent('https://finlyst.app/blog/' + p.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-80 transition"
                  title="Share on Instagram"
                >
                  <span aria-label="Instagram" role="img">&#x1F4F7;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
