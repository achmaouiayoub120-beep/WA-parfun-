'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { useCursor } from '@/providers/CursorProvider';

export function CartSlider() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const { isCartOpen, closeCart } = useUIStore();
  const { setCursor, resetCursor } = useCursor();
  
  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.documentElement.style.overflow = 'hidden';
      // If Lenis is active, you might need to pause it here
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm cursor-none"
            onMouseEnter={() => setCursor('magnetic', 'Close')}
            onMouseLeave={resetCursor}
          />

          {/* Slider */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[101] bg-background border-l border-border-subtle flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-border-subtle">
              <h2 className="text-gold font-serif text-2xl tracking-widest uppercase flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" /> Cart
              </h2>
              <button
                onClick={closeCart}
                className="text-foreground hover:text-gold transition-colors p-2"
                onMouseEnter={() => setCursor('magnetic')}
                onMouseLeave={resetCursor}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#D4AF37]/30 scrollbar-track-transparent">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                  <ShoppingBag className="w-12 h-12 text-[#D4AF37]" />
                  <p className="font-sans text-sm text-gray-400">Your signature collection is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="flex gap-4 p-4 glass-gold rounded-sm group"
                  >
                    <div className="relative w-20 h-24 bg-background rounded-sm overflow-hidden border border-border-subtle">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-foreground font-serif text-lg">{item.name}</h3>
                          <p className="text-gold text-[10px] uppercase tracking-widest">{item.volume}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                          onMouseEnter={() => setCursor('magnetic')}
                          onMouseLeave={resetCursor}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 border border-border-subtle rounded-sm px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-400 hover:text-foreground transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                            onMouseEnter={() => setCursor('magnetic')}
                            onMouseLeave={resetCursor}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-sans text-foreground w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-400 hover:text-foreground transition-colors"
                            onMouseEnter={() => setCursor('magnetic')}
                            onMouseLeave={resetCursor}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gold font-serif">
                          {(item.price * item.quantity).toFixed(2)} {item.currency}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="relative z-10 p-6 bg-background border-t border-border-subtle">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-foreground font-serif text-2xl">{getCartTotal().toFixed(2)} USD</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  onMouseEnter={() => setCursor('magnetic')}
                  onMouseLeave={resetCursor}
                  className="w-full flex items-center justify-center py-4 bg-gold text-background font-sans text-sm uppercase tracking-widest hover:opacity-90 transition-opacity rounded-sm"
                >
                  Secure Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
