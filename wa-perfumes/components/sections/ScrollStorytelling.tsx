'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORLDS = [
  {
    id: 'oud',
    title: 'Oud Forest',
    desc: 'Deep, resinous, and unapologetically bold.',
    color: '#1a1412',
    image: '/images/hero/hero-bg.jpg', // Reusing hero-bg for now, can be updated
  },
  {
    id: 'amber',
    title: 'Amber Desert',
    desc: 'Warm golden sands and sweet spice.',
    color: '#2a1a08',
    image: '/images/hero/hero-bg.jpg',
  },
  {
    id: 'vanilla',
    title: 'Vanilla Clouds',
    desc: 'Soft, creamy, and intimately comforting.',
    color: '#1a1816',
    image: '/images/hero/hero-bg.jpg',
  },
];

export function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pin the container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${WORLDS.length * 100}%`,
      pin: true,
      anticipatePin: 1,
    });

    // Animate each section
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;

      const title = section.querySelector('.world-title');
      const desc = section.querySelector('.world-desc');
      const bg = section.querySelector('.world-bg');

      // Create a timeline for each world
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${i * 100}% top`,
          end: `top+=${(i + 1) * 100}% top`,
          scrub: 1,
        },
      });

      // Fade in/out the background
      if (i > 0) {
        tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
      }

      // Animate text
      tl.fromTo(
        title,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.1
      )
      .fromTo(
        desc,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.2
      );

      // Fade out at the end of the section (unless it's the last one)
      if (i < WORLDS.length - 1) {
        tl.to(title, { y: -100, opacity: 0, duration: 0.4 }, 0.6)
          .to(desc, { y: -50, opacity: 0, duration: 0.4 }, 0.7);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {WORLDS.map((world, i) => (
        <div
          key={world.id}
          ref={(el) => {
            sectionsRef.current[i] = el;
          }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
          style={{ zIndex: i }}
        >
          {/* Background layer */}
          <div
            className="world-bg absolute inset-0 bg-cover bg-center opacity-0 transition-opacity"
            style={{
              backgroundImage: `url(${world.image})`,
              backgroundColor: world.color,
              backgroundBlendMode: 'multiply',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
          
          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <h2 className="world-title text-5xl md:text-7xl font-serif text-[#D4AF37] mb-6 opacity-0 translate-y-12 mix-blend-screen">
              {world.title}
            </h2>
            <p className="world-desc text-lg md:text-xl font-sans text-[#FAFAFA] opacity-0 translate-y-6">
              {world.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
