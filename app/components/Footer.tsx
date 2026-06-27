'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer content reveal
      gsap.from('.footer-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-content',
          start: 'top 90%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer theme-dark">
      {/* 3D Render Element */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div
          style={{
            width: '300px',
            height: '300px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, var(--accent), var(--bg-primary) 70%)',
            opacity: 0.6,
            filter: 'blur(1px)',
          }}
        />
      </div>

      <div className="footer-content">
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
          © {new Date().getFullYear()} Desov · Creative Digital Agency
        </p>

        <ul className="footer-links">
          <li><Link href="/studio">Studio</Link></li>
          <li><Link href="/work">Work</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>

        <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex', marginTop: '16px' }}>
          Chat with Desov
        </Link>
      </div>
    </footer>
  );
}
