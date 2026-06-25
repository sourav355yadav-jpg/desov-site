'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    if (!dot) return;

    let lastSpawnTime = 0;

    const spawnParticles = (x: number, y: number) => {
      // Throttle spawning slightly to keep performance high
      const now = Date.now();
      if (now - lastSpawnTime < 10) return; // Super fast trigger (10ms)
      lastSpawnTime = now;

      const particleCount = 5; // Spawn 5 particles per tick = MASSIVE INTENSITY
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-magic-particle';
        document.body.appendChild(particle);

        // Ultra fine particles (1px - 4px)
        const size = Math.random() * 3 + 1; 
        
        gsap.set(particle, {
          x: x,
          y: y,
          top: 0,
          left: 0,
          width: size,
          height: size,
          backgroundColor: 'var(--accent)', // Electric cobalt
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
        });

        // Dissolve like a magic stick trail with wider spread
        gsap.to(particle, {
          x: x + (Math.random() - 0.5) * 80, // wider spread
          y: y + (Math.random() - 0.5) * 80 + 10, // slight fall
          opacity: 0,
          scale: 0,
          duration: Math.random() * 0.8 + 0.6, // lasts slightly longer
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
      
      // Spawn intense trail particles
      spawnParticles(e.clientX, e.clientY);
    };

    // Hover states (Scale the dot down and make it transparent)
    const handleEnter = () => {
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);

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
      observer.disconnect();
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div ref={dotRef} className="custom-cursor" />
  );
}
