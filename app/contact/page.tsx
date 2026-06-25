'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal, useScrollReveal } from '../components/animations';

gsap.registerPlugin(ScrollTrigger);

const INQUIRY_TYPES = ['Start a project', 'Join Desov', 'Say hi'];

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <ContactFormSection />
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
        width: '50vw', maxWidth: '700px', zIndex: 1, pointerEvents: 'none',
      }}>
        <div style={{
          width: '100%', aspectRatio: '1',
          background: 'radial-gradient(circle at 50% 50%, rgba(221,167,165,0.15) 0%, transparent 60%)',
          borderRadius: '50%',
        }} />
      </div>

      <div className="hero-content hero-text-wrapper">
        <h1 ref={titleRef} className="hero-title">
          Start a conversation about new business or media inquiries.
        </h1>
      </div>
      <div className="scroll-indicator">Scroll</div>
    </section>
  );
}

/* ── CONTACT FORM ── */
function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [greeting, setGreeting] = useState('');

  useTextReveal(titleRef);
  useScrollReveal(subtitleRef, { y: 20 });

  // Dynamic greeting
  useEffect(() => {
    const hour = new Date().getHours();
    let timeOfDay = 'day';
    if (hour < 12) timeOfDay = 'morning';
    else if (hour < 17) timeOfDay = 'afternoon';
    else timeOfDay = 'evening';

    setGreeting(`Hey there! How can we assist you on this ${timeOfDay}?`);
  }, []);

  // Animate form fields on tab change
  useEffect(() => {
    if (!formRef.current) return;
    gsap.from(formRef.current.querySelectorAll('.form-group'), {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <h2 ref={titleRef} className="section-title">Contact</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '24px' }}>
          Have an inquiry, suggestion, a collaboration offer or even trouble sleeping? Get in touch with us now.
        </p>

        {greeting && (
          <p style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '48px', fontWeight: 400 }}>
            {greeting}
          </p>
        )}

        {/* Inquiry Tabs */}
        <div className="inquiry-tabs">
          {INQUIRY_TYPES.map((type, i) => (
            <button
              key={type}
              className={`inquiry-tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Form */}
        <form ref={formRef} className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" />
          </div>

          {activeTab === 0 && (
            <>
              <div className="form-group">
                <label>Budget</label>
                <select>
                  <option value="">Select budget range</option>
                  <option value="5k">$5,000 – $10,000</option>
                  <option value="10k">$10,000 – $25,000</option>
                  <option value="25k">$25,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label>Project Details</label>
                <textarea placeholder="Tell us about your project..." rows={4} />
              </div>
            </>
          )}

          {activeTab === 1 && (
            <div className="form-group">
              <label>Tell us about yourself</label>
              <textarea placeholder="Why do you want to join Desov?" rows={4} />
            </div>
          )}

          {activeTab === 2 && (
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Say hello..." rows={4} />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '24px' }}>
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}
