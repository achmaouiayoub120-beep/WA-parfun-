'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '@/providers/CursorProvider';
import { Scene } from '@/components/3d/Scene';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Simple parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to('.hero-title', { x: x * -1.5, y: y * -1.5, duration: 1, ease: 'power2.out' });
      gsap.to('.hero-bg', { x: x * 0.5, y: y * 0.5, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background Image/Video */}
      <div 
        className="hero-bg absolute inset-0 z-0 scale-110 opacity-60"
        style={{
          backgroundImage: 'url(/images/hero/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* 3D WebGL Scene */}
      <Scene />

      {/* Golden Overlay Gradient */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-[40vh] md:mt-[30vh]">
        <h1 className="hero-title text-5xl md:text-8xl font-serif mb-6 text-gold tracking-tight mix-blend-screen">
          Leave Your Signature.
        </h1>
        
        <p className="hero-title text-sm md:text-base font-sans tracking-[0.2em] text-foreground opacity-80 uppercase max-w-xl mx-auto mb-12">
          Luxury Inspired Fragrances crafted for unforgettable personalities.
        </p>

        <div className="flex gap-6 items-center">
          <button 
            className="group relative px-8 py-4 bg-transparent overflow-hidden border border-gold"
            onMouseEnter={() => setCursor('magnetic')}
            onMouseLeave={resetCursor}
          >
            <div className="absolute inset-0 bg-gold transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            <span className="relative z-10 text-gold group-hover:text-background font-sans text-sm tracking-widest uppercase transition-colors duration-500">
              Discover Collection
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-4 opacity-70">Scroll to explore</span>
        <div className="w-[1px] h-16 border-l border-gold/20 overflow-hidden">
          <div className="w-full h-1/2 bg-gold animate-slide-down" />
        </div>
      </div>
    </section>
  );
}
