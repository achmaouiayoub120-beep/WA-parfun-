'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { useCursor } from '@/providers/CursorProvider';
import { Product } from '@/data/products/men'; // Shared type

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUIStore((state) => state.openCart);
  const { setCursor, resetCursor } = useCursor();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if inside a Link
    addItem(product);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 800);
  };

  return (
    <button
      onClick={handleAdd}
      onMouseEnter={() => setCursor('magnetic')}
      onMouseLeave={resetCursor}
      className={`group relative overflow-hidden bg-transparent border border-[#D4AF37] px-8 py-4 ${className}`}
    >
      <div className="absolute inset-0 bg-[#D4AF37] transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
      
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.div
            key="added"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="relative z-10 flex items-center justify-center gap-2 text-[#050505] font-sans text-sm tracking-widest uppercase"
          >
            <Check className="w-4 h-4" /> Added
          </motion.div>
        ) : (
          <motion.span
            key="add"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="relative z-10 text-[#D4AF37] group-hover:text-[#050505] font-sans text-sm tracking-widest uppercase transition-colors duration-500 mix-blend-difference block"
          >
            Add to Cart — {product.price} {product.currency}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
