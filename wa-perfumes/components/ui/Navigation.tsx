'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/providers/CursorProvider';
import { CartIcon } from '@/components/ui/CartIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navLinks = [
  { name: 'Collections', href: '#collections' },
  { name: 'WA Signature', href: '/#signature' },
  { name: 'WA Elegance', href: '/#elegance' },
  { name: 'Perfume Finder', href: '/finder' },
  { name: 'Maison WA', href: '/about' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-500 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border-subtle' : 'bg-transparent'
        }`}
      >
        <Link 
          href="/" 
          className="relative z-50 flex items-center justify-center mix-blend-difference"
          onMouseEnter={() => setCursor('magnetic')}
          onMouseLeave={resetCursor}
        >
          <div className="relative w-48 h-24 md:w-64 md:h-32">
            <Image 
              src="/logo.png" 
              alt="WA Perfumes Logo" 
              fill 
              className="object-contain filter brightness-0 invert" 
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CartIcon />
          
          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-2 group mix-blend-difference"
            onMouseEnter={() => setCursor('magnetic')}
            onMouseLeave={resetCursor}
          >
            <span 
              className={`w-8 h-[1px] bg-gold transition-all duration-500 origin-right ${
                isOpen ? '-rotate-45 -translate-y-[2px] w-8' : 'w-8'
              }`} 
            />
            <span 
              className={`h-[1px] bg-gold transition-all duration-500 origin-right ${
                isOpen ? 'rotate-45 translate-y-[2px] w-8' : 'w-6 group-hover:w-8'
              }`} 
            />
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-12 md:px-32"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url(/images/textures/noise.png)', backgroundSize: '200px' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              
              {/* Navigation Links */}
              <nav className="flex flex-col gap-6">
                <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 opacity-70">
                  Menu
                </span>
                
                {navLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-5xl md:text-7xl font-serif text-foreground hover:text-gold transition-colors duration-500 flex items-center gap-4 group"
                        onMouseEnter={() => setCursor('spotlight')}
                        onMouseLeave={resetCursor}
                      >
                        <span className="text-sm font-sans opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                          0{i + 1}
                        </span>
                        {link.name}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              {/* Sidebar Info */}
              <div className="flex flex-col justify-end gap-12 mt-16 md:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <span className="text-gold text-xs uppercase tracking-[0.3em] block mb-4">
                    Visit Us
                  </span>
                  <p className="text-gray-400 font-sans leading-relaxed">
                    15 Place Vendôme<br />
                    75001 Paris, France
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <span className="text-gold text-xs uppercase tracking-[0.3em] block mb-4">
                    Contact
                  </span>
                  <a href="mailto:concierge@waperfumes.com" className="text-foreground hover:text-gold transition-colors">
                    concierge@waperfumes.com
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
