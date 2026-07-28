'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseLightEffect() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 opacity-30 mix-blend-screen"
      style={{
        background: `radial-gradient(600px circle at ${smoothX.get()}px ${smoothY.get()}px, rgba(212, 175, 55, 0.08), transparent 40%)`,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        background: `radial-gradient(600px circle at ${smoothX.get()}px ${smoothY.get()}px, rgba(212, 175, 55, 0.08), transparent 40%)`
      }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
    />
  );
}
