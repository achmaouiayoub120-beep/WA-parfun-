'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { useCursor } from '@/providers/CursorProvider';
import { motion } from 'framer-motion';

export function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((state) => state.getCartCount());
  const { openCart } = useUIStore();
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={openCart}
      className="relative z-50 w-12 h-12 flex items-center justify-center text-[#D4AF37] hover:text-[#FAFAFA] transition-colors mix-blend-difference group"
      onMouseEnter={() => setCursor('magnetic')}
      onMouseLeave={resetCursor}
    >
      <ShoppingBag className="w-5 h-5" />
      {mounted && count > 0 && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={count} // re-animate on count change
          className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-[#D4AF37] text-[#050505] rounded-full text-[9px] font-bold"
        >
          {count}
        </motion.span>
      )}
    </button>
  );
}
