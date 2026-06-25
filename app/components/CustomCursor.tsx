'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let lastSpawnTime = 0;

    const spawnParticles = (x: number, y: number) => {
      // Throttle spawning slightly to keep performance high
      const now = Date.now();
      if (now - lastSpawnTime < 20) return;
      lastSpawnTime = now;

      const particleCount = 2; // Spawn a couple particles per movement frame
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-magic-particle'; // For easy cleanup if needed
        document.body.appendChild(particle);

        // Ultra fine particles (1px - 3px)
        const size = Math.random() * 2 + 1; 
        
        gsap.set(particle, {
          x: x,
          y: y,
          width: size,
          height: size,
          backgroundColor: 'var(--accent)', // Electric cobalt
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
        });

        // Dissolve like a magic stick trail
        gsap.to(particle, {
          x: x + (Math.random() - 0.5) * 40, // spread out slightly
          y: y + (Math.random() - 0.5) * 40 + 10, // slightly fall down
          opacity: 0,
          scale: 0,
          duration: Math.random() * 0.6 + 0.4, // dissolve within 0.4s - 1s
          ease: 'power2.out',
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      // Dot follows instantly
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 });
      
      // Spawn trail particles
      spawnParticles(e.clientX, e.clientY);
    };

    // Ring follows with lerp via GSAP ticker
    const tickerCallback = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1;
      gsap.set(ring, {
        x: ringPos.current.x,
        y: ringPos.current.y,
      });
    };

    // Hover states
    const handleEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorLabel = target.dataset.cursorLabel || '';

      gsap.to(ring, { width: 80, height: 80, duration: 0.3 });
      gsap.to(dot, { opacity: 0, scale: 0, duration: 0.3 });

      if (cursorLabel && labelRef.current) {
        labelRef.current.textContent = cursorLabel;
        gsap.to(labelRef.current, { opacity: 1, duration: 0.3 });
      }
    };

    const handleLeave = () => {
      gsap.to(ring, { width: 40, height: 40, duration: 0.3 });
      gsap.to(dot, { opacity: 1, scale: 1, duration: 0.3 });

      if (labelRef.current) {
        gsap.to(labelRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(tickerCallback);

    // Add hover listeners to all interactive elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [data-cursor-hover], .work-list-link, .project-card, .service-header'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
      return hoverables;
    };

    // Initial + observe for new elements
    let hoverables = addHoverListeners();
    const observer = new MutationObserver(() => {
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      hoverables = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tickerCallback);
      observer.disconnect();
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="cursor-follower">
        <span ref={labelRef} className="cursor-follower-label" />
      </div>
    </>
  );
}
