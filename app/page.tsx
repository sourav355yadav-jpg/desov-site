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
  { name: 'Keopi', slug: 'keopi', image: '/projects/keopi/keopi_mockup_2_isometric_1781775402823.png', category: 'Brand Identity' },
  { name: 'Earth Brew', slug: 'earth-brew', image: '/projects/earth-brew/WhatsApp Image 2026-05-01 at 12.13.03 PM.jpeg', category: 'Packaging Design' },
  { name: 'Sleepy Owl', slug: 'sleepy-owl', image: '/projects/sleepy_owl_poster_one.png', category: 'Brand Identity' },
  { name: 'Subko', slug: 'subko', image: '/projects/subko_poster_one.png', category: 'Smart Development' },
  { name: 'Sol Sage', slug: 'sol-sage', image: '/projects/sol_sage_poster_one.png', category: 'Marketing Campaigns' },
  { name: 'Pascati', slug: 'pascati-chocolate', image: '/projects/pascati_chocolate.png', category: 'Packaging Design' },
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
      // Wordmark fade in
      gsap.from('.desov-wordmark', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Scroll indicator fade in later
      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.5,
        delay: 2.2,
      });

      // Hero parallax on scroll
      gsap.to('.hero-content-wrapper', {
        y: () => window.innerHeight * -0.3,
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
      <div className="hero-content-wrapper" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 2, gap: '24px'
      }}>
        <h1 className="desov-wordmark" style={{
           fontFamily: 'var(--font-cinzel), serif',
           fontSize: 'clamp(60px, 18vw, 250px)',
           fontWeight: 400,
           lineHeight: 0.9,
           letterSpacing: '-0.02em',
           color: 'var(--text-primary)',
        }}>DESOV</h1>
        
        <h2 ref={titleRef} className="hero-title">
          Design that commands rooms.
        </h2>
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
          Selected projects. Each one built from a brief, not a template.
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <span>{project.name}</span>
                  <span className="work-list-category">{project.category}</span>
                </div>
                <div className="work-list-cue-container">
                  <span className="work-list-cue-text">View Project</span>
                </div>
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
