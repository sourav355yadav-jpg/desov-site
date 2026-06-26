'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const mousePos = useRef({ x: 0, y: 0 });
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

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
