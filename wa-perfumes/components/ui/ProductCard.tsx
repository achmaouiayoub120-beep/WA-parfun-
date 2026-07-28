'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Product } from '@/data/products/men'; // shared type
import { useCursor } from '@/providers/CursorProvider';
import { AddToCartButton } from '@/components/ui/AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  // Mouse tracking for 3D tilt and light effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth the mouse values
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse position to rotation (-10 to 10 degrees)
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  // Light effect template
  const lightEffect = useMotionTemplate`radial-gradient(
    circle at ${useTransform(mouseX, [0, 1], [0, 100])}% ${useTransform(mouseY, [0, 1], [0, 100])}%,
    rgba(212, 175, 55, 0.15),
    transparent 80%
  )`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    resetCursor();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative w-full aspect-[3/4] cursor-none perspective-1000"
    >
      {/* Dynamic Light overlay */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none rounded-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-screen"
        style={{ background: lightEffect }}
      />
      
      {/* Main Card Container */}
      <div className="absolute inset-0 glass-gold overflow-hidden rounded-sm transition-transform duration-500 transform-gpu bg-[#050505]/40 group-hover:bg-[#050505]/60 flex flex-col">
        
        {/* Clickable Area for Product Details */}
        <Link 
          href={`/product/${product.id}`} 
          className="flex-1 relative block w-full"
          onMouseEnter={() => setCursor('product', 'Discover')}
          onMouseLeave={resetCursor}
        >
          {/* Product Image */}
          <div className="absolute inset-0 p-8 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4">
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </Link>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-14 transition-transform duration-500 ease-out group-hover:translate-y-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent">
          
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase mb-1">
                {product.number} — {product.fragranceFamily}
              </p>
              <h3 className="text-[#FAFAFA] font-serif text-2xl mb-1">
                {product.name}
              </h3>
              <p className="text-gray-400 text-xs font-sans">
                Inspired by {product.inspiredBy}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                {product.volume}
              </p>
            </div>
          </div>

          {/* Add to Cart Button (Only visible on hover) */}
          <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <AddToCartButton product={product} className="w-full text-xs py-3" />
          </div>

        </div>
      </div>
    </motion.div>
  );
}
