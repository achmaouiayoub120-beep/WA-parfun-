'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';

export default function CartSlider() {
  const isOpen = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getCartTotal = useCartStore((s) => s.getCartTotal);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] bg-[rgba(0,0,0,0.6)] backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[151] w-full max-w-md bg-[rgba(17,17,17,0.97)] backdrop-blur-xl border-l border-[rgba(201,168,118,0.08)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[rgba(255,255,255,0.04)]">
              <h2 className="font-[family-name:var(--font-cormorant)] text-xl tracking-[0.1em] text-[#F5F2EC]">
                Your Collection
              </h2>
              <button
                onClick={closeCart}
                className="text-[#6B6560] hover:text-[#F5F2EC] transition-colors duration-300"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-[family-name:var(--font-cormorant)] text-lg text-[#9A9590] mb-6">
                    Your collection awaits
                  </p>
                  <Link
                    href="/#collections"
                    onClick={closeCart}
                    className="text-[0.65rem] uppercase tracking-[0.3em] text-[#C9A876] border border-[rgba(201,168,118,0.25)] px-6 py-3 hover:bg-[rgba(201,168,118,0.06)] transition-colors duration-300"
                  >
                    Browse Fragrances
                  </Link>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item, i) => (
                    <div key={item.id}>
                      <div className="flex gap-4 py-5">
                        {/* Product Image */}
                        <div className="relative w-20 h-24 bg-[#141414] shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.04em] text-[#F5F2EC] mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#C9A876] mb-3">
                            {item.price} DH
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center border border-[rgba(255,255,255,0.08)] text-[#9A9590] hover:border-[rgba(201,168,118,0.2)] hover:text-[#C9A876] transition-colors duration-300 text-xs"
                            >
                              −
                            </button>
                            <span className="text-xs text-[#F5F2EC] w-4 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-[rgba(255,255,255,0.08)] text-[#9A9590] hover:border-[rgba(201,168,118,0.2)] hover:text-[#C9A876] transition-colors duration-300 text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="self-start text-[#6B6560] hover:text-[#F5F2EC] transition-colors duration-300"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Gold Divider */}
                      {i < items.length - 1 && (
                        <div className="h-[1px] bg-[rgba(201,168,118,0.06)]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — Subtotal & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-[rgba(201,168,118,0.08)] px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[#9A9590]">
                    Subtotal
                  </span>
                  <span className="font-[family-name:var(--font-cormorant)] text-lg text-[#C9A876]">
                    {getCartTotal()} DH
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-[#C9A876] text-[#0A0A0A] text-center text-[0.7rem] uppercase tracking-[0.3em] font-medium hover:bg-[#E0C99A] transition-colors duration-300"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
