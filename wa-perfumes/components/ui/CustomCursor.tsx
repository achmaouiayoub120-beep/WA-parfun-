'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '@/providers/CursorProvider';

export function CustomCursor() {
  const { active, text, variant } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for better performance than state
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: '#D4AF37', // Gold
      border: '0px solid transparent',
      mixBlendMode: 'difference' as any,
    },
    product: {
      height: 80,
      width: 80,
      backgroundColor: 'rgba(5, 5, 5, 0.8)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      mixBlendMode: 'normal' as any,
    },
    spotlight: {
      height: 150,
      width: 150,
      backgroundColor: 'transparent',
      border: '1px solid rgba(212, 175, 55, 0.5)',
      mixBlendMode: 'normal' as any,
    },
    magnetic: {
      height: 48,
      width: 48,
      backgroundColor: 'transparent',
      border: '1px solid #D4AF37',
      mixBlendMode: 'difference' as any,
    },
    hidden: {
      opacity: 0,
      height: 0,
      width: 0,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none z-[9999] overflow-hidden backdrop-blur-[2px]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible && variant !== 'hidden' ? 1 : 0,
      }}
      variants={variants}
      animate={variant}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {variant === 'product' && text && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-medium"
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
}
