'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    let lastSpawnTime = 0;

    const spawnParticles = (x: number, y: number) => {
      // Throttle spawning slightly to keep performance high
      const now = Date.now();
      if (now - lastSpawnTime < 10) return; // Super fast trigger (10ms)
      lastSpawnTime = now;

      const particleCount = 8; // HUGE INTENSITY: 8 particles per mouse tick
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

        // Dissolve like a magic stick trail with extremely wide, dynamic spread
        gsap.to(particle, {
          x: x + (Math.random() - 0.5) * 100, // Massive horizontal spread
          y: y + (Math.random() - 0.5) * 100 + 20, // Explosive downward drift
          opacity: 0,
          scale: 0,
          duration: Math.random() * 0.8 + 0.8, // Slowed down dissolve for higher visibility
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
      
      // Spawn intense trail particles immediately behind the system cursor
      spawnParticles(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // No physical cursor rendered, meaning the default system arrow will show!
  return null;
}
