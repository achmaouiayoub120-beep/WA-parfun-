'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: 'signature' | 'elegance';
  inspirationNote?: string;
  topNotes?: string[];
  [key: string]: unknown;
}

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setRotateX((0.5 - y) * 8);
    setRotateY((x - 0.5) * 8);
    setSpotX(x * 100);
    setSpotY(y * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div
        ref={cardRef}
        className="relative overflow-hidden bg-[#141414] border border-[rgba(255,255,255,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gold spotlight on hover */}
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(201,168,118,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Hover border glow */}
        <div className="absolute inset-0 z-10 border border-[rgba(201,168,118,0)] group-hover:border-[rgba(201,168,118,0.15)] transition-colors duration-500 pointer-events-none" />

        {/* Collection Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className="text-[0.55rem] uppercase tracking-[0.25em] px-2.5 py-1 backdrop-blur-sm rounded-sm"
            style={{
              color: product.collection === 'signature' ? '#C9A876' : '#C97B84',
              background:
                product.collection === 'signature'
                  ? 'rgba(201,168,118,0.1)'
                  : 'rgba(201,123,132,0.1)',
              border: `1px solid ${
                product.collection === 'signature'
                  ? 'rgba(201,168,118,0.15)'
                  : 'rgba(201,123,132,0.15)'
              }`,
            }}
          >
            {product.collection === 'signature' ? 'Signature' : 'Elegance'}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#141414] to-transparent" />

          {/* Notes on hover */}
          {product.topNotes && product.topNotes.length > 0 && (
            <div
              className={`absolute bottom-4 left-4 right-4 z-20 flex gap-2 flex-wrap transition-all duration-500 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {product.topNotes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="text-[0.55rem] uppercase tracking-[0.2em] px-2 py-1 bg-[rgba(10,10,10,0.7)] backdrop-blur-sm text-[#C9A876] border border-[rgba(201,168,118,0.15)] rounded-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-[family-name:var(--font-cormorant)] text-lg tracking-[0.04em] text-[#F5F2EC] mb-1 group-hover:text-[#C9A876] transition-colors duration-300">
            {product.name}
          </h3>

          {product.inspirationNote && (
            <p className="text-[0.65rem] text-[#6B6560] mb-3 italic">
              {product.inspirationNote}
            </p>
          )}

          <p className="text-sm text-[#C9A876] font-[family-name:var(--font-sans)] tracking-wider">
            {product.price} DH
          </p>
        </div>
      </div>
    </Link>
  );
}
