'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCursor } from '@/providers/CursorProvider';

export function Footer() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <footer className="relative bg-background text-foreground py-24 px-6 md:px-12 border-t border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand */}
        <div className="col-span-1 lg:col-span-2">
          <Link 
            href="/" 
            className="inline-block mb-6"
            onMouseEnter={() => setCursor('magnetic')}
            onMouseLeave={resetCursor}
          >
            <div className="relative w-64 h-32">
              <Image 
                src="/logo.png" 
                alt="WA Perfumes Logo" 
                fill 
                className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
          </Link>
          <p className="text-sm font-sans text-gray-400 max-w-sm leading-relaxed">
            L'Essence de l'Excellence. Ultra-premium luxury fragrances crafted for the bold, the elegant, and the unforgettable.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-gold text-xs uppercase tracking-widest mb-6 font-semibold">Collections</h4>
          <ul className="space-y-4 font-sans text-sm text-gray-400">
            <li>
              <Link href="#signature" className="hover:text-gold transition-colors" onMouseEnter={() => setCursor('magnetic')} onMouseLeave={resetCursor}>
                WA Signature
              </Link>
            </li>
            <li>
              <Link href="#elegance" className="hover:text-gold transition-colors" onMouseEnter={() => setCursor('magnetic')} onMouseLeave={resetCursor}>
                WA Elegance
              </Link>
            </li>
            <li>
              <Link href="/limited" className="hover:text-gold transition-colors" onMouseEnter={() => setCursor('magnetic')} onMouseLeave={resetCursor}>
                Limited Editions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold text-xs uppercase tracking-widest mb-6 font-semibold">Maison WA</h4>
          <ul className="space-y-4 font-sans text-sm text-gray-400">
            <li>
              <p>15 Place Vendôme</p>
              <p>75001 Paris, France</p>
            </li>
            <li className="pt-2">
              <a href="mailto:concierge@waperfumes.com" className="hover:text-gold transition-colors" onMouseEnter={() => setCursor('magnetic')} onMouseLeave={resetCursor}>
                concierge@waperfumes.com
              </a>
            </li>
            <li>
              <a href="tel:+33123456789" className="hover:text-gold transition-colors" onMouseEnter={() => setCursor('magnetic')} onMouseLeave={resetCursor}>
                +33 1 23 45 67 89
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest gap-4 relative z-10">
        <p>&copy; {new Date().getFullYear()} WA Perfumes. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
