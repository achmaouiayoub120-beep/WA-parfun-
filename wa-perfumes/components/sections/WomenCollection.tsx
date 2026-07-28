'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ProductCard } from '@/components/ui/ProductCard';
import { WOMEN_PRODUCTS } from '@/data/products/women';

gsap.registerPlugin(ScrollTrigger);

export function WomenCollection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.women-product-card');

    cards.forEach((card: any, i) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 100,
          rotateY: -10 
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="relative w-full bg-[#050505] py-32 px-4 md:px-8 lg:px-16" ref={containerRef}>
      
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C97B84]/5 to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-24 relative z-10">
        <span className="text-[#E8A5AE] text-xs tracking-[0.3em] uppercase mb-4">The Soft Collection</span>
        <h2 className="text-5xl md:text-7xl font-serif text-[#FAFAFA] mb-8">WA Elegance</h2>
        
        {/* Decorative Divider */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C97B84]" />
          <div className="w-2 h-2 rounded-full border border-[#C97B84]" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C97B84]" />
        </div>
      </div>

      {/* Product Grid (Asymmetric) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 max-w-[1600px] mx-auto relative z-10">
        {WOMEN_PRODUCTS.map((product, index) => (
          <div 
            key={product.id} 
            className={`women-product-card ${
              index % 3 === 0 ? 'md:mt-16' : index % 3 === 1 ? 'lg:mt-32' : ''
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
