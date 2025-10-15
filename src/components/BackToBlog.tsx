"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BackToBlog({
  className = '',
  to = '/blog',
  preferTarget = false,
}: {
  className?: string;
  to?: string; // target route to navigate to when no history, defaults to /blog
  preferTarget?: boolean; // when true, always push to target instead of history.back()
}) {
  const router = useRouter();
  // Try to go back in history so the browser restores the previous scroll position.
  // If no history, fall back to the /blog index.
  return (
    <button
      type="button"
      onClick={() => {
        if (preferTarget) {
          router.push(to);
          return;
        }
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back();
        } else {
          router.push(to);
        }
      }}
      className={className}
    >
      ← Back to Blog
    </button>
  );
}
