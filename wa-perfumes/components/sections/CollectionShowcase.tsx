'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useCursor } from '@/providers/CursorProvider';
import { COLLECTIONS } from '@/data/products/collections';

gsap.registerPlugin(ScrollTrigger);

export function CollectionShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const sections = gsap.utils.toArray('.collection-panel');
    
    // Create horizontal scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: 'top top',
      end: () => `+=${scrollContainerRef.current?.scrollWidth || window.innerWidth}`,
      animation: gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
      }),
      scrub: 1,
    });

    // Parallax effect on images
    sections.forEach((s) => {
      const img = (s as HTMLElement).querySelector('.parallax-img');
      if (img) {
        gsap.to(img, {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: s as HTMLElement,
            containerAnimation: gsap.getById('horizontalScroll') || undefined,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-screen overflow-hidden bg-[#050505]">
      <div 
        ref={scrollContainerRef}
        className="flex w-[200vw] h-full"
      >
        {COLLECTIONS.map((collection) => (
          <div 
            key={collection.id}
            className="collection-panel relative w-[100vw] h-full flex items-center justify-center overflow-hidden"
          >
            {/* Background Parallax Image */}
            <div className="absolute inset-0 z-0">
              <div 
                className="parallax-img absolute inset-0 -left-[20%] w-[140%] h-full bg-cover bg-center opacity-40 scale-110"
                style={{ backgroundImage: `url(${collection.bannerImage})` }}
              />
              <div className="absolute inset-0 bg-[#050505] opacity-60 mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
              <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-6">
                {collection.tagline}
              </span>
              <h2 className="text-6xl md:text-8xl font-serif text-[#FAFAFA] mb-8">
                {collection.name}
              </h2>
              <p className="text-lg text-gray-300 font-sans max-w-2xl mx-auto mb-12 opacity-80 leading-relaxed">
                {collection.description}
              </p>
              
              <button 
                className="group relative px-8 py-4 bg-transparent overflow-hidden border border-[#D4AF37]"
                onMouseEnter={() => setCursor('magnetic')}
                onMouseLeave={resetCursor}
              >
                <div className="absolute inset-0 bg-[#D4AF37] transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                <span className="relative z-10 text-[#D4AF37] group-hover:text-[#050505] font-sans text-sm tracking-widest uppercase transition-colors duration-500 mix-blend-difference">
                  Explore {collection.gender === 'homme' ? "Men's" : "Women's"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
