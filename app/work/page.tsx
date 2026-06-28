'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal, useScrollReveal } from '../components/animations';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { name: 'Keopi', slug: 'keopi', num: '#01', image: '/projects/keopi_mockup_2_isometric_1781775402823.png' },
  { name: 'Earth Brew', slug: 'earth-brew', num: '#02', image: '/projects/earth-brew/WhatsApp Image 2026-05-01 at 12.13.03 PM.jpeg' },
  { name: 'Sleepy Owl', slug: 'sleepy-owl', num: '#03', image: '/projects/sleepy_owl_poster_one.png' },
  { name: 'Subko', slug: 'subko', num: '#04', image: '/projects/subko_poster_one.png' },
  { name: 'Sol Sage', slug: 'sol-sage', num: '#05', image: '/projects/sol_sage_poster_one.png' },
  { name: 'Pascati', slug: 'pascati-chocolate', num: '#06', image: '/projects/pascati_chocolate.png' },
  { name: 'Svami Tonic', slug: 'svami-tonic', num: '#07', image: '/projects/svami_tonic.png' },
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
      // Removed scrolling/sliding animation for grid view based on user request
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
                  <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
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
              <Image src={hoverImg.src} alt="" className="work-list-hover-img visible"
                width={400} height={300} style={{ top: hoverImg.y, left: hoverImg.x, objectFit: 'cover' }} />
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
