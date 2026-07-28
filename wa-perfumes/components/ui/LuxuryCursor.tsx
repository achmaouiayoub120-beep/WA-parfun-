'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function LuxuryCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Ultra-smooth GSAP quickTo for 60fps cursor tracking
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    // Detect hoverable elements
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      
      if (e.type === 'mouseover' && isInteractive) {
        setIsHovering(true);
        gsap.to(ring, { scale: 1.8, borderColor: 'rgba(201, 168, 118, 0.4)', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
      } else if (e.type === 'mouseout' && isInteractive) {
        setIsHovering(false);
        gsap.to(ring, { scale: 1, borderColor: 'rgba(201, 168, 118, 0.2)', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseout', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementHover);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9990] pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A876]" />
      </div>

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9989] pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div className="w-8 h-8 rounded-full border border-[rgba(201,168,118,0.2)]" />
      </div>
    </>
  );
}
