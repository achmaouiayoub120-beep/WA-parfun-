'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative w-full h-full min-h-screen">
        
        {/* The Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {children}
        </motion.div>

        {/* Wipe effect covering the screen during transitions */}
        <motion.div
          className="fixed inset-0 z-[100] bg-[#050505] origin-bottom flex items-center justify-center pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="relative w-64 h-32"
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image 
              src="/logo.png" 
              alt="WA Perfumes Logo" 
              fill 
              className="object-contain filter brightness-0 invert" 
              priority
            />
          </motion.div>
        </motion.div>
        
      </motion.div>
    </AnimatePresence>
  );
}
