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
  const renderRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef, { delay: 0.3, stagger: 0.1, duration: 0.8 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D render fade in + scale
      gsap.from('.hero-render-wrapper', {
        opacity: 0,
        scale: 1.05,
        duration: 1.0,
        ease: 'power2.out',
        delay: 0.1,
      });

      // Scroll indicator fade in
      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.5,
        delay: 0.9,
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

      // Fade hero as scrolling
      gsap.to(heroRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: '50% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      {/* 3D Render */}
      <div className="hero-render-wrapper" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw', maxWidth: '1200px',
        zIndex: 1, pointerEvents: 'none',
      }}>
        <div style={{
          width: '100%', aspectRatio: '16/10',
          background: 'radial-gradient(ellipse at 40% 40%, rgba(17, 24, 39, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 60% 60%, rgba(17, 24, 39, 0.25) 0%, transparent 50%)',
          borderRadius: '20px',
          filter: 'blur(0.5px)',
        }}>
          <div style={{
            width: '60%', height: '70%', margin: 'auto',
            position: 'relative', top: '15%',
            background: 'linear-gradient(135deg, #1f2937, #111827, #0b0f19)',
            borderRadius: '12px',
            boxShadow: '0 40px 80px rgba(42,37,34,0.1), 0 0 60px rgba(17, 24, 39, 0.3)',
            transform: 'perspective(800px) rotateY(-5deg) rotateX(3deg)',
          }} />
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
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg-primary)' }}>
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
