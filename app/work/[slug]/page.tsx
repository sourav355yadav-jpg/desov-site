'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal, useScrollReveal } from '../../components/animations';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: Record<string, {
  name: string;
  services: { category: string; items: string[] }[];
  description: string[];
  hero: string;
  gallery: string[];
  websiteLink?: string;
  next: string;
}> = {
  'keopi': {
    name: 'Keopi',
    services: [
      { category: 'Brand Identity', items: ['Logo', 'Typography', 'Visual Language'] },
      { category: 'Packaging', items: ['Coffee Bags', 'Banners', 'Merchandise'] },
    ],
    description: [
      'Keopi is a modern, vibrant coffee brand focused on delivering high-quality brews with a playful and energetic aesthetic.',
      'We designed a comprehensive brand identity and packaging system that stands out on the shelf, using bold colors, striking patterns, and engaging typography.',
    ],
    hero: '/projects/keopi_mockup_2_isometric_1781775402823.png',
    gallery: [
      '/projects/BANNER COFFEE.jpg',
      '/projects/COFFEE HOLDER.jpg',
      '/projects/circle mockup.png',
      '/projects/ChatGPT Image Feb 17, 2026, 11_01_26 AM.png',
      '/projects/ChatGPT Image Feb 17, 2026, 11_02_14 AM.png',
      '/projects/Gemini_Generated_Image_31m9sj31m9sj31m9.png',
      '/projects/Gemini_Generated_Image_32ix7632ix7632ix.png',
      '/projects/Gemini_Generated_Image_5u9jxg5u9jxg5u9j.png',
      '/projects/Gemini_Generated_Image_6kcizl6kcizl6kci.png',
      '/projects/Gemini_Generated_Image_t4vk15t4vk15t4vk.png',
      '/projects/Untitled-1.jpg',
      '/projects/pattern.png',
    ],
    next: 'bombay-canteen',
  },
  'bombay-canteen': {
    name: 'Bombay Canteen',
    services: [
      { category: 'Brand Identity', items: ['Logo', 'Typography', 'Color Palette', 'Guidelines'] },
      { category: 'Print Design', items: ['Menus', 'Packaging', 'Merchandise'] },
    ],
    description: [
      'The Bombay Canteen is an award-winning restaurant celebrating India\'s rich and diverse culinary heritage. They needed a visual identity that felt simultaneously nostalgic and contemporary.',
      'We crafted a vibrant, illustrative design system that captures the essence of classic Bombay architecture, flora, and culture, applying it across their menus, packaging, and digital presence.',
    ],
    hero: '/projects/bombay_canteen_poster_one.png',
    gallery: [
      '/projects/bombay_canteen_poster_two.png',
      '/projects/bombay_canteen_poster_three.png',
    ],
    websiteLink: 'https://thebombaycanteen.com',
    next: 'sleepy-owl',
  },
  'sleepy-owl': {
    name: 'Sleepy Owl',
    services: [
      { category: 'Brand Identity', items: ['Logo', 'Typography', 'Voice & Tone'] },
      { category: 'Packaging Design', items: ['Product Design', 'Labels'] },
    ],
    description: [
      'Sleepy Owl revolutionized the cold brew coffee market in India. They approached us to refine their visual identity and packaging to stand out on crowded retail shelves.',
      'Our team developed a bold, iconic owl motif and a striking color palette that instantly communicates the energy and premium quality of their coffee products.',
    ],
    hero: '/projects/sleepy_owl_poster_one.png',
    gallery: [
      '/projects/sleepy_owl_poster_two.png',
      '/projects/sleepy_owl_poster_three.png',
    ],
    websiteLink: 'https://sleepyowl.co',
    next: 'subko',
  },
  'subko': {
    name: 'Subko',
    services: [
      { category: 'Brand Identity', items: ['Typography', 'Color Palette', 'Packaging'] },
      { category: 'Smart Development', items: ['Web Development', 'E-commerce'] },
    ],
    description: [
      'Subko is a specialty coffee roaster and bakehouse with a deep focus on sourcing from the Indian subcontinent. Their brand needed to reflect both heritage and modernity.',
      'We designed an intricate typographic system and premium packaging that tells the story of the origin of their beans, coupled with a seamless e-commerce platform.',
    ],
    hero: '/projects/subko_poster_one.png',
    gallery: [
      '/projects/subko_poster_two.png',
      '/projects/subko_poster_three.png',
      '/projects/subko_poster_four.png',
    ],
    next: 'sol-sage',
  },
  'sol-sage': {
    name: 'Sol Sage',
    services: [
      { category: 'Brand Identity', items: ['Logo', 'Color Palette'] },
      { category: 'Marketing Campaigns', items: ['Digital Marketing', 'Social Media', 'Content Creation'] },
    ],
    description: [
      'Sol Sage is a holistic wellness and skincare brand that embraces natural ingredients and mindful living.',
      'We developed a serene, earthy identity system and launched a content-rich social media campaign that educated their audience while elevating their brand aesthetic.',
    ],
    hero: '/projects/sol_sage_poster_one.png',
    gallery: [
      '/projects/sol_sage_poster_two.png',
      '/projects/sol_sage_poster_three.png',
    ],
    next: 'pascati-chocolate',
  },
  'pascati-chocolate': {
    name: 'Pascati',
    services: [
      { category: 'Packaging Design', items: ['Product Design', 'Print'] },
    ],
    description: [
      'Pascati is India\'s first USDA Organic and Fairtrade certified chocolate maker. They needed packaging that felt as premium as the chocolate inside.',
      'We designed elegant, tactile packaging featuring rich colors and gold foil accents that highlight the artisanal nature of their bean-to-bar process.',
    ],
    hero: '/projects/pascati_chocolate.png',
    gallery: [
      '/projects/pascati_option_one.png',
      '/projects/pascati_option_two.png',
    ],
    next: 'svami-tonic',
  },
  'svami-tonic': {
    name: 'Svami Tonic',
    services: [
      { category: 'Brand Identity', items: ['Packaging', 'Label Design'] },
      { category: 'Marketing Campaigns', items: ['Social Media', 'Photography'] },
    ],
    description: [
      'Svami produces premium craft mixers and tonics. They needed a visual refresh that communicated sophistication and fun.',
      'We delivered a dynamic, color-forward packaging system and vibrant art direction that made Svami the go-to mixer for the modern drinker.',
    ],
    hero: '/projects/svami_tonic.png',
    gallery: [
      '/projects/juicy_chemistry.png', 
    ],
    next: 'keopi',
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <div className="section container" style={{ textAlign: 'center', paddingTop: '200px' }}>
        <h1 className="section-title">Project not found</h1>
        <Link href="/work" className="btn-primary" style={{ marginTop: '24px' }}>Back to Work</Link>
      </div>
    );
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectDescription project={project} />
      {project.gallery.length > 0 && <ProjectGallery gallery={project.gallery} />}
      <NextProject nextSlug={project.next} />
    </>
  );
}

/* ── PROJECT HERO ── */
function ProjectHero({ project }: { project: typeof PROJECTS[string] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef, { delay: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Services stagger reveal
      gsap.from('.service-category', {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.2, delay: 0.5, ease: 'power2.out',
      });
      gsap.from('.service-sub-item', {
        opacity: 0, y: 10, duration: 0.4, stagger: 0.08, delay: 0.7, ease: 'power2.out',
      });
      // Hero image clip reveal
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          clipPath: 'inset(100% 0 0 0)', duration: 1.0, ease: 'power3.inOut', delay: 0.8,
        });
        const img = imageRef.current.querySelector('img');
        if (img) {
          gsap.from(img, { scale: 1.05, duration: 1.2, ease: 'power2.out', delay: 0.8 });
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ background: 'var(--bg-primary)', paddingTop: '160px' }}>
      <div className="container">
        <h1 ref={titleRef} className="hero-title" style={{ marginBottom: '60px' }}>
          {project.name}
        </h1>

        <div ref={servicesRef} style={{ display: 'flex', gap: '80px', flexWrap: 'wrap', marginBottom: '60px' }}>
          {project.services.map((svc, i) => (
            <div key={i} className="service-category">
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>
                We worked on the
              </p>
              <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)', marginBottom: '16px' }}>
                {svc.category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {svc.items.map((item) => (
                  <span key={item} className="service-sub-item service-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={imageRef} style={{ borderRadius: '4px', overflow: 'hidden' }}>
          <Image src={project.hero} alt={project.name} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', display: 'block' }} priority />
        </div>
      </div>
    </section>
  );
}

/* ── PROJECT DESCRIPTION ── */
function ProjectDescription({ project }: { project: typeof PROJECTS[string] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef);
  useScrollReveal(textRef, { y: 20 });

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">{project.name}</h2>
        <div ref={textRef} style={{ maxWidth: '700px' }}>
          {project.description.map((p, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px', fontSize: '18px' }}>
              {p}
            </p>
          ))}
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'var(--accent)', fontSize: '14px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                borderBottom: '1px solid var(--accent)', paddingBottom: '4px',
                transition: 'opacity 0.3s',
              }}
            >
              View website →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECT GALLERY ── */
function ProjectGallery({ gallery }: { gallery: string[] }) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-img', {
        clipPath: 'inset(0 0 0 100%)',
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' },
      });
    }, galleryRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div ref={galleryRef} style={{
          display: 'grid',
          gridTemplateColumns: gallery.length > 1 ? 'repeat(2, 1fr)' : '1fr',
          gap: '24px',
        }}>
          {gallery.map((img, i) => (
            <div key={i} className="gallery-img" style={{ borderRadius: '4px', overflow: 'hidden' }}>
              <Image src={img} alt="" width={0} height={0} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── NEXT PROJECT ── */
function NextProject({ nextSlug }: { nextSlug: string }) {
  const nextProject = PROJECTS[nextSlug];
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleEnter = () => {
    let val = 0;
    intervalRef.current = setInterval(() => {
      val += 2;
      if (val > 100) val = 100;
      setProgress(val);
      if (val >= 100 && intervalRef.current) clearInterval(intervalRef.current);
    }, 16);
  };

  const handleLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
  };

  if (!nextProject) return null;

  return (
    <section ref={sectionRef} className="next-project" data-cursor-label="View">
      <Link
        href={`/work/${nextSlug}`}
        style={{ textDecoration: 'none' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <p className="next-project-label">Next Project</p>
        <h2 className="next-project-name">{nextProject.name}</h2>
        <p style={{ color: 'var(--accent)', fontSize: '48px', fontWeight: 300 }}>
          {progress}%
        </p>
      </Link>
    </section>
  );
}
