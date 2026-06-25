'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Page enter animation: slide overlay up to reveal new page
    gsap.fromTo(
      overlay,
      { y: '0%' },
      {
        y: '-100%',
        duration: 0.6,
        ease: 'power2.inOut',
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlay, { y: '100%' });
        },
      }
    );
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="page-transition"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translateY(100%)',
      }}
    />
  );
}
