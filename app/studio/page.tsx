'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal, useScrollReveal } from '../components/animations';

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  { issuer: 'Adobe Behance', category: 'Web User Interface' },
  { issuer: 'Adobe Behance', category: 'Graphic Design' },
  { issuer: 'Adobe Behance', category: '3D Animation' },
  { issuer: 'FaZe Clan', category: 'Metaverse Architecture' },
];

const CAREERS = [
  { title: 'Front-End Developer', slug: 'front-end-developer' },
  { title: 'Brand Designer', slug: 'brand-designer' },
];

const MARQUEE_TAGS = ['Apps', 'Metaverse', 'Branding', 'Animations', 'Websites', 'Marketing'];

export default function StudioPage() {
  return (
    <>
      <HeroSection />
      <TeamReelSection />
      <ServicesMarqueeSection />
      <RecognitionSection />
      <CareersSection />
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
      gsap.from('.hero-render-wrapper', {
        opacity: 0, scale: 1.05, duration: 1.0, ease: 'power2.out', delay: 0.1,
      });
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
        width: '60vw', maxWidth: '800px', zIndex: 1, pointerEvents: 'none',
      }}>
        <div style={{
          width: '100%', aspectRatio: '1',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(221,167,165,0.12) 0%, transparent 60%)',
        }}>
          <div style={{
            width: '50%', height: '80%', margin: 'auto', position: 'relative', top: '10%',
            background: 'linear-gradient(180deg, #F1E9DA, #DFCEC1)', borderRadius: '4px 4px 0 0',
            boxShadow: '0 40px 60px rgba(42,37,34,0.15)',
          }}>
            <div style={{
              width: '12%', height: '60%', background: '#DDA7A5', position: 'absolute',
              bottom: '100%', left: '44%', borderRadius: '4px 4px 0 0', opacity: 0.8,
            }} />
          </div>
        </div>
      </div>

      <div className="hero-content hero-text-wrapper">
        <h1 ref={titleRef} className="hero-title">
          We thrive off of your satisfaction.
        </h1>
      </div>
      <div className="scroll-indicator">Scroll</div>
    </section>
  );
}

/* ── TEAM / REEL ── */
function TeamReelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">Team</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '48px' }}>
          We are a dynamic team, passionate about turning ideas into digital realities.
        </p>

        <div className="video-wrapper" data-cursor-label="Play">
          <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="" type="video/mp4" />
          </video>
          <div className={`video-overlay ${playing ? 'hidden' : ''}`}>
            <button className="play-button" onClick={handlePlay}>
              Play
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES MARQUEE ── */
function ServicesMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">Services</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '24px' }}>
          Websites, branding, marketing, apps, animations &amp; metaverse.
        </p>
        <Link href="/contact" className="btn-primary" style={{ marginBottom: '48px', display: 'inline-flex' }}>
          Contact Us
        </Link>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <Link href="/contact" className="btn-outline">
          Contact Us
        </Link>
      </div>
    </section>
  );
}

/* ── RECOGNITION ── */
function RecognitionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.award-item', {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">Recognition</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '60px' }}>
          From A to Z, our agency aims to triumph over every digital award category.
        </p>

        <div ref={listRef}>
          {AWARDS.map((award, i) => (
            <div key={i} className="award-item">
              <span className="award-issuer">{award.issuer}</span>
              <span className="award-category">{award.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CAREERS ── */
function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">Careers</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '60px' }}>
          Sometimes, all you need is the right group of experts to encourage you to shine along their side.
        </p>

        <div>
          {CAREERS.map((career) => (
            <Link key={career.slug} href={`/careers/${career.slug}`} style={{ textDecoration: 'none' }}>
              <div className="career-item">
                <span className="career-title">{career.title}</span>
                <span className="career-apply">Apply →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
