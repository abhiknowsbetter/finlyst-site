import { useEffect, useState } from 'react';

export default function useParallax(offset = 0, factor = 0.2) {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setY((scrollY - offset) * factor);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset, factor]);
  return y;
}
