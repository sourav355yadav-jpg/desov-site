'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function CustomCursor() {
  const mousePos = useRef({ x: 0, y: 0 });
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Reset cursor state on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel('');
    if (labelRef.current) {
      gsap.to(labelRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }
    document.body.style.cursor = '';
  }, [pathname]);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      // Move the label
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementWithLabel = target.closest('[data-cursor-label]');
      
      if (elementWithLabel) {
        const text = elementWithLabel.getAttribute('data-cursor-label');
        setLabel(text || '');
        gsap.to(labelRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(1.5)'
        });
        document.body.style.cursor = 'none';
      } else {
        gsap.to(labelRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => setLabel('')
        });
        document.body.style.cursor = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div 
      ref={labelRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 100000,
        backgroundColor: 'var(--accent)',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        boxShadow: '0 10px 25px rgba(0,85,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap'
      }}
    >
      {label}
    </div>
  );
}
