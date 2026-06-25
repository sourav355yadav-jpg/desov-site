'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Word-by-word slide-up reveal animation (SOHub signature effect)
 * Wraps each word in overflow:hidden span and slides up from translateY(100%)
 */
export function useTextReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { delay?: number; stagger?: number; duration?: number; trigger?: string }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || '';
    const words = text.split(' ');
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="word" style="overflow:hidden;display:inline-block;vertical-align:top"><span class="word-inner" style="display:inline-block;transform:translateY(100%);opacity:0">${w}</span></span>`
      )
      .join(' ');

    const wordInners = el.querySelectorAll('.word-inner');

    gsap.to(wordInners, {
      y: '0%',
      opacity: 1,
      duration: options?.duration || 0.8,
      stagger: options?.stagger || 0.1,
      ease: 'power3.out',
      delay: options?.delay || 0,
      scrollTrigger: {
        trigger: options?.trigger ? document.querySelector(options.trigger) || el : el,
        start: 'top 85%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [ref, options?.delay, options?.stagger, options?.duration, options?.trigger]);
}

/**
 * Generic scroll-reveal: fade in + slide up
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options?: {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    children?: boolean;
  }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = options?.children ? el.children : el;

    gsap.from(targets, {
      y: options?.y ?? 30,
      x: options?.x ?? 0,
      opacity: 0,
      duration: options?.duration || 0.6,
      stagger: options?.stagger || 0,
      delay: options?.delay || 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [ref, options?.y, options?.x, options?.duration, options?.delay, options?.stagger, options?.children]);
}

/**
 * Parallax effect on scroll
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = -0.4
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === (el.parentElement || el)) t.kill();
      });
    };
  }, [ref, speed]);
}

/**
 * Line draw animation: scaleX 0 → 1 from left
 */
export function useLineDraw(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
    });
  }, [ref]);
}

/**
 * Image clip reveal from bottom
 */
export function useClipReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.from(el, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.0,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    });

    // Inner image scale
    const img = el.querySelector('img');
    if (img) {
      gsap.from(img, {
        scale: 1.1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      });
    }
  }, [ref]);
}
