"use client";
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const sectionIds = useMemo(() => ['features', 'blog', 'waitlist', 'contact'], []);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    // Scroll progress for lighting effect
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      // Expose progress to CSS (used by progress bar and glow opacity)
      document.documentElement.style.setProperty('--scroll-progress', String(p));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scrollspy using IntersectionObserver (only on home route)
    let observer: IntersectionObserver | null = null;
    if (pathname === '/') {
      observer = new IntersectionObserver(
        (entries) => {
          // Pick the entry most visible
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
          if (visible[0]) {
            const id = visible[0].target.getAttribute('id');
            if (id) setActive(id);
          }
        },
        {
          root: null,
          rootMargin: '0px 0px -60% 0px',
          threshold: [0.2, 0.4, 0.6, 0.8, 1],
        }
      );
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);
      elements.forEach((el) => observer!.observe(el));
    } else {
      // On non-home routes, mark active from pathname
      if (pathname.startsWith('/blog')) setActive('blog');
      else if (pathname.startsWith('/features')) setActive('features');
      else if (pathname.startsWith('/waitlist')) setActive('waitlist');
      else if (pathname.startsWith('/contact')) setActive('contact');
      else setActive('');
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (observer) observer.disconnect();
    };
  }, [sectionIds, pathname]);

  const linkBase = 'transition-colors';
  const isActive = (id: string) => active === id;

  const nav = [
    { id: 'features', href: '#features' },
    { id: 'blog', href: '#blog' },
    { id: 'waitlist', href: '#waitlist' },
    { id: 'contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur header-glow">
      {/* Lighting/progress glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 scroll-progress" />
      <div className="container-mx relative flex h-14 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="text-2xl font-extrabold tracking-tight accent-gradient title-soft-glow drop-shadow-lg"
            style={{ letterSpacing: '-0.03em', textTransform: 'lowercase' }}
          >
            finlyst
          </span>
        </Link>
        <nav className="hidden items-end gap-6 text-sm text-gray-300 sm:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${linkBase} ${isActive(item.id) ? 'text-silver-50' : 'hover:text-gray-100'}`}
            >
              <span className="flex flex-col items-center gap-1">
                <span className="capitalize">{item.id}</span>
                <span className={`h-0.5 w-8 rounded-full transition-colors ${isActive(item.id) ? 'bg-emerald-400' : 'bg-transparent'}`} />
              </span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}