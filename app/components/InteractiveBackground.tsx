'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function InteractiveBackground() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orb1Ref.current || !orb2Ref.current) return;
    
    // Create quickTo functions for ultra-smooth tracking without GSAP overhead on every tick
    const xTo1 = gsap.quickTo(orb1Ref.current, "x", { duration: 1.2, ease: "power3.out" });
    const yTo1 = gsap.quickTo(orb1Ref.current, "y", { duration: 1.2, ease: "power3.out" });
    
    const xTo2 = gsap.quickTo(orb2Ref.current, "x", { duration: 2.2, ease: "power2.out" });
    const yTo2 = gsap.quickTo(orb2Ref.current, "y", { duration: 2.2, ease: "power2.out" });

    // Center them initially
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    gsap.set(orb1Ref.current, { x: initX, y: initY });
    gsap.set(orb2Ref.current, { x: initX, y: initY });

    const handleMouseMove = (e: MouseEvent) => {
      xTo1(e.clientX);
      yTo1(e.clientY);
      // Offset the second orb slightly so it drags behind elegantly
      xTo2(e.clientX + 80);
      yTo2(e.clientY - 40);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
    }}>
      {/* Pink Orb */}
      <div 
        ref={orb1Ref}
        style={{
          position: 'absolute',
          top: '-20vw', // Offset by half width/height so x,y is center
          left: '-20vw',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(232, 161, 181, 0.45) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />
      {/* Dark Navy Orb */}
      <div 
        ref={orb2Ref}
        style={{
          position: 'absolute',
          top: '-25vw',
          left: '-25vw',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(17, 24, 39, 0.15) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          willChange: 'transform'
        }}
      />
    </div>
  );
}
