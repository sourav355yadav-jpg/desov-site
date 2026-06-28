'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal, useScrollReveal, useParallax } from './components/animations';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PROJECT DATA
   ============================================================ */
const PROJECTS = [
  { name: 'Keopi', slug: 'keopi', image: '/projects/keopi_mockup_2_isometric_1781775402823.png' },
  { name: 'Earth Brew', slug: 'earth-brew', image: '/projects/earth-brew/WhatsApp Image 2026-05-01 at 12.13.03 PM.jpeg' },
  { name: 'Sleepy Owl', slug: 'sleepy-owl', image: '/projects/sleepy_owl_poster_one.png' },
  { name: 'Subko', slug: 'subko', image: '/projects/subko_poster_one.png' },
  { name: 'Sol Sage', slug: 'sol-sage', image: '/projects/sol_sage_poster_one.png' },
  { name: 'Pascati', slug: 'pascati-chocolate', image: '/projects/pascati_chocolate.png' },
];

const SERVICES = [
  {
    title: 'Brand\nIdentities',
    tags: ['Logo', 'Typography', 'Color Palette', 'Voice & Tone', 'Guidelines'],
    description: 'We craft comprehensive brand identity systems that establish the core DNA of your brand, ensuring flawless representation across every medium.',
  },
  {
    title: 'Smart\nDevelopment',
    tags: ['Web Development', 'App Development', 'UI/UX Design', 'Interactions', 'CMS'],
    description: 'We build high-performance digital products with cutting-edge technology, delivering seamless user experiences across all platforms.',
  },
  {
    title: 'Marketing\nCampaigns',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Creation', 'Email Marketing'],
    description: 'Strategic marketing campaigns that amplify your brand presence and drive meaningful engagement with your target audience.',
  },
  {
    title: '3D\nVisualization',
    tags: ['Architecture', 'Engineering', 'Construction', 'Interior Design', 'Product Design'],
    description: 'Photorealistic 3D visualization and animation that brings architectural and product concepts to life before they exist.',
  },
];

/* ============================================================
   HOME PAGE COMPONENT
   ============================================================ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <CTASection />
    </>
  );
}

/* ── HERO SECTION ── */
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef, { delay: 1.8, stagger: 0.1, duration: 0.8 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Orbs Animation
      gsap.to('.hero-orb-1', {
        rotation: 360,
        x: 100,
        y: 50,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-orb-2', {
        rotation: -360,
        x: -100,
        y: -50,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3D scatter setup for the DESOV glass blocks
      const letters = gsap.utils.toArray('.desov-letter');
      
      gsap.set(letters, {
        x: () => gsap.utils.random(-800, 800),
        y: () => gsap.utils.random(-600, 600),
        z: () => gsap.utils.random(-1200, 1000),
        rotationX: () => gsap.utils.random(-360, 360),
        rotationY: () => gsap.utils.random(-360, 360),
        rotationZ: () => gsap.utils.random(-180, 180),
        opacity: 0,
      });

      // Animate them snapping perfectly together
      gsap.to(letters, {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        duration: 2.8,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.2,
      });

      // Scroll indicator fade in later
      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.5,
        delay: 2.2,
      });

      // Hero parallax on scroll
      gsap.to('.hero-render-wrapper', {
        y: () => window.innerHeight * -0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-text-wrapper', {
        y: () => window.innerHeight * -0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      
      gsap.to(heroRef.current, {
        opacity: 0,
        scrollTrigger: { 
          trigger: heroRef.current, 
          start: '50% top', 
          end: 'bottom top', 
          scrub: true 
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-render-wrapper" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none',
        perspective: '2000px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Abstract Background Orbs for Glass Refraction */}
        <div className="hero-orb-1" style={{
          position: 'absolute', top: '20%', left: '30%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 60%)',
          filter: 'blur(60px)', opacity: 0.4, zIndex: 0,
        }} />
        <div className="hero-orb-2" style={{
          position: 'absolute', bottom: '10%', right: '25%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, var(--text-secondary) 0%, transparent 60%)',
          filter: 'blur(80px)', opacity: 0.15, zIndex: 0,
        }} />

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(10px, 2vw, 30px)',
          transformStyle: 'preserve-3d', zIndex: 1,
        }}>
          {['D', 'E', 'S', 'O', 'V'].map((letter, i) => (
            <div key={i} className="desov-letter" style={{
              width: 'clamp(70px, 14vw, 200px)',
              height: 'clamp(100px, 20vw, 280px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 0 30px rgba(255,255,255,0.4)',
              transformStyle: 'preserve-3d',
            }}>
              <span style={{
                fontSize: 'clamp(50px, 10vw, 150px)',
                fontFamily: 'var(--font-cinzel), serif',
                fontWeight: 500,
                color: 'var(--text-primary)',
                textShadow: '0 4px 12px rgba(255,255,255,0.8)',
              }}>
                {letter}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Text */}
      <div className="hero-content hero-text-wrapper">
        <h1 ref={titleRef} className="hero-title">
          Your story builds our history.
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" ref={scrollRef}>
        Scroll
      </div>
    </section>
  );
}

/* ── WORK SECTION ── */
function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [hoverImg, setHoverImg] = useState<{ src: string; x: number; y: number } | null>(null);

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-list-item', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, image: string) => {
    setHoverImg({ src: image, x: e.clientX + 20, y: e.clientY - 130 });
  };

  return (
    <section ref={sectionRef} className="section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">Work</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '60px' }}>
          We are a diligent team, that&apos;s passionate about turning ideas into digital realities.
        </p>

        <ul ref={listRef} className="work-list">
          {PROJECTS.map((project) => (
            <li key={project.slug} className="work-list-item">
              <Link
                href={`/work/${project.slug}`}
                className="work-list-link"
                data-cursor-label="View"
                onMouseMove={(e) => handleMouseMove(e, project.image)}
                onMouseLeave={() => setHoverImg(null)}
              >
                <span>{project.name}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>→</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Hover Image */}
        {hoverImg && (
          <Image
            src={hoverImg.src}
            alt=""
            className="work-list-hover-img visible"
            width={400}
            height={300}
            style={{ top: hoverImg.y, left: hoverImg.x, objectFit: 'cover' }}
          />
        )}
      </div>
    </section>
  );
}

/* ── SERVICES SECTION ── */
function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-item', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.service-item', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section theme-dark" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">Services</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '60px' }}>
          We are an unusual digital agency focusing on transforming your vision into a captivating digital experience.
        </p>

        <div>
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className={`service-item ${activeIndex === i ? 'active' : ''}`}
            >
              <div
                className="service-header"
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              >
                <span className="service-title" style={{ whiteSpace: 'pre-line' }}>
                  {service.title}
                </span>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-body">
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="service-tag">{tag}</span>
                  ))}
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '600px' }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA SECTION ── */
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character-split animation for "Don't be shy"
      const el = titleRef.current;
      if (!el) return;
      const text = el.textContent || '';
      el.innerHTML = text
        .split('')
        .map(
          (char) =>
            `<span style="overflow:hidden;display:inline-block"><span class="char-inner" style="display:inline-block;transform:translateY(100%);opacity:0">${char === ' ' ? '&nbsp;' : char}</span></span>`
        )
        .join('');

      gsap.to(el.querySelectorAll('.char-inner'), {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // CTA buttons fade in
      gsap.from('.cta-buttons', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cta-section">
      {/* Chair Render Placeholder */}
      <div className="cta-render" style={{
        width: '40vw', maxWidth: '500px', aspectRatio: '1',
        background: 'radial-gradient(circle, rgba(17, 24, 39, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      <h2 ref={titleRef} className="cta-title" style={{ position: 'relative', zIndex: 1 }}>
        Don&apos;t be shy
      </h2>

      <div className="cta-buttons">
        <Link href="/contact" className="btn-primary">
          Chat with Desov
        </Link>
        <a href="#" className="btn-outline" target="_blank" rel="noopener noreferrer">
          Book a Meeting
        </a>
      </div>
    </section>
  );
}
