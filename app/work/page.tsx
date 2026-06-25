'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal, useScrollReveal } from '../components/animations';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { name: 'Bombay Canteen', slug: 'bombay-canteen', num: '#01', image: '/projects/bombay_canteen_poster_one.png' },
  { name: 'Sleepy Owl', slug: 'sleepy-owl', num: '#02', image: '/projects/sleepy_owl_poster_one.png' },
  { name: 'Subko', slug: 'subko', num: '#03', image: '/projects/subko_poster_one.png' },
  { name: 'Sol Sage', slug: 'sol-sage', num: '#04', image: '/projects/sol_sage_poster_one.png' },
  { name: 'Pascati', slug: 'pascati-chocolate', num: '#05', image: '/projects/pascati_chocolate.png' },
  { name: 'Svami Tonic', slug: 'svami-tonic', num: '#06', image: '/projects/svami_tonic.png' },
];

export default function WorkPage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
    </>
  );
}

/* ── HERO ── */
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useTextReveal(titleRef, { delay: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-render-wrapper', { opacity: 0, scale: 1.05, duration: 1.0, ease: 'power2.out', delay: 0.1 });
      gsap.from('.scroll-indicator', { opacity: 0, duration: 0.5, delay: 0.9 });
      gsap.to('.hero-render-wrapper', {
        y: () => window.innerHeight * -0.4, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(heroRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: heroRef.current, start: '50% top', end: 'bottom top', scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-render-wrapper" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '65vw', maxWidth: '1000px', zIndex: 1, pointerEvents: 'none',
      }}>
        <div style={{
          width: '100%', aspectRatio: '16/10',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(221,167,165,0.1) 0%, transparent 60%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px',
        }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: '60px', height: '200px',
              background: `linear-gradient(180deg, #DDA7A5 0%, #F1E9DA ${60 + i * 10}%)`,
              borderRadius: '30px 30px 4px 4px',
              transform: `rotate(${(i - 1) * 8}deg)`,
              opacity: 0.7,
            }} />
          ))}
        </div>
      </div>

      <div className="hero-content hero-text-wrapper">
        <h1 ref={titleRef} className="hero-title">It really speaks for itself.</h1>
      </div>
      <div className="scroll-indicator">Scroll</div>
    </section>
  );
}

/* ── PROJECTS ── */
function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [hoverImg, setHoverImg] = useState<{ src: string; x: number; y: number } | null>(null);

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (view === 'grid') {
        gsap.from('.project-card', {
          opacity: 0,
          x: (i: number) => (i % 2 === 0 ? -30 : 30),
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.project-grid', start: 'top 85%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [view]);

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">Projects</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '40px' }}>
          Each project we&apos;ve touched holds sentimental importance and showcases our passion for art.
        </p>

        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
            Grid View
          </button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
            List View
          </button>
        </div>

        {view === 'grid' ? (
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <div className="project-card" data-cursor-label="View">
                  <img src={project.image} alt={project.name} loading="lazy" />
                  <div className="project-card-overlay">
                    <span className="project-card-name">{project.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <ul className="work-list">
            {PROJECTS.map((project) => (
              <li key={project.slug} className="work-list-item">
                <Link
                  href={`/work/${project.slug}`}
                  className="work-list-link"
                  data-cursor-label="View"
                  onMouseMove={(e) => setHoverImg({ src: project.image, x: e.clientX + 20, y: e.clientY - 130 })}
                  onMouseLeave={() => setHoverImg(null)}
                >
                  <span><span style={{ color: 'var(--text-muted)', marginRight: '16px', fontSize: '14px' }}>{project.num}</span>{project.name}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>→</span>
                </Link>
              </li>
            ))}
            {hoverImg && (
              <img src={hoverImg.src} alt="" className="work-list-hover-img visible"
                style={{ top: hoverImg.y, left: hoverImg.x }} />
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
