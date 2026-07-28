'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useCursor } from '@/providers/CursorProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ShieldCheck, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { items, getCartTotal, clearCart } = useCartStore();
  const { setCursor, resetCursor } = useCursor();

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-24 text-center">
        <h1 className="text-4xl font-serif text-[#FAFAFA] mb-6">Your Cart is Empty</h1>
        <p className="text-gray-400 font-sans mb-8">Begin your journey to find your signature scent.</p>
        <Link 
          href="/"
          onMouseEnter={() => setCursor('magnetic')}
          onMouseLeave={resetCursor}
          className="px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-sans text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#050505] transition-colors"
        >
          Return Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Form / Success */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {/* SUCCESS STATE */}
            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col h-full justify-center"
              >
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-8 border border-[#D4AF37]">
                  <Check className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h1 className="text-5xl font-serif text-[#FAFAFA] mb-6">Order Confirmed.</h1>
                <p className="text-gray-400 font-sans text-lg mb-8 leading-relaxed">
                  Thank you for your purchase. Your signature scents are being prepared with the utmost care by Maison WA.
                </p>
                <p className="text-[#D4AF37] font-sans text-sm uppercase tracking-widest mb-12">
                  Order #WA-{Math.floor(Math.random() * 1000000)}
                </p>
                
                <Link 
                  href="/"
                  onMouseEnter={() => setCursor('magnetic')}
                  onMouseLeave={resetCursor}
                  className="inline-block px-8 py-4 bg-[#D4AF37] text-[#050505] font-sans text-sm tracking-widest uppercase hover:bg-white transition-colors max-w-fit"
                >
                  Return to Boutique
                </Link>
              </motion.div>
            )}

            {/* CHECKOUT FORM */}
            {!isSuccess && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <span className={`text-xs uppercase tracking-widest ${step >= 1 ? 'text-[#D4AF37]' : 'text-gray-600'}`}>1. Details</span>
                  <div className={`w-8 h-[1px] ${step >= 2 ? 'bg-[#D4AF37]' : 'bg-gray-800'}`} />
                  <span className={`text-xs uppercase tracking-widest ${step >= 2 ? 'text-[#D4AF37]' : 'text-gray-600'}`}>2. Shipping</span>
                  <div className={`w-8 h-[1px] ${step >= 3 ? 'bg-[#D4AF37]' : 'bg-gray-800'}`} />
                  <span className={`text-xs uppercase tracking-widest ${step >= 3 ? 'text-[#D4AF37]' : 'text-gray-600'}`}>3. Payment</span>
                </div>

                <form onSubmit={step === 3 ? handleComplete : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-8">
                  
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h2 className="text-3xl font-serif text-[#FAFAFA]">Contact Information</h2>
                      <div className="space-y-4">
                        <input type="email" required placeholder="Email Address" className="w-full bg-transparent border border-gray-800 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="First Name" className="w-full bg-transparent border border-gray-800 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors" />
                          <input type="text" required placeholder="Last Name" className="w-full bg-transparent border border-gray-800 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h2 className="text-3xl font-serif text-[#FAFAFA]">Shipping Address</h2>
                      <div className="space-y-4">
                        <input type="text" required placeholder="Address" className="w-full bg-transparent border border-gray-800 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors" />
                        <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-transparent border border-gray-800 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="City" className="w-full bg-transparent border border-gray-800 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors" />
                          <input type="text" required placeholder="Postal Code" className="w-full bg-transparent border border-gray-800 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h2 className="text-3xl font-serif text-[#FAFAFA]">Payment Method</h2>
                      <div className="p-6 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-sm space-y-4">
                        <div className="flex items-center justify-between mb-4 text-[#FAFAFA]">
                          <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#D4AF37]" /> Credit Card</span>
                        </div>
                        <input type="text" required placeholder="Card Number" className="w-full bg-transparent border border-gray-700 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors font-mono" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="MM/YY" className="w-full bg-transparent border border-gray-700 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors font-mono" />
                          <input type="text" required placeholder="CVC" className="w-full bg-transparent border border-gray-700 rounded-sm p-4 text-[#FAFAFA] focus:border-[#D4AF37] focus:outline-none transition-colors font-mono" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-8 flex justify-between items-center">
                    {step > 1 ? (
                      <button 
                        type="button" 
                        onClick={() => setStep(step - 1)}
                        className="text-gray-500 hover:text-[#FAFAFA] uppercase tracking-widest text-xs transition-colors"
                        onMouseEnter={() => setCursor('magnetic')}
                        onMouseLeave={resetCursor}
                      >
                        Back
                      </button>
                    ) : <div></div>}
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      onMouseEnter={() => setCursor('magnetic')}
                      onMouseLeave={resetCursor}
                      className="px-8 py-4 bg-[#D4AF37] text-[#050505] font-sans text-sm tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center min-w-[200px]"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-t-2 border-b-2 border-[#050505] rounded-full animate-spin" />
                      ) : (
                        step === 3 ? 'Place Order' : 'Continue'
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary */}
        <div className="hidden lg:block border-l border-[rgba(255,255,255,0.05)] pl-16">
          <div className="sticky top-32">
            <h3 className="text-2xl font-serif text-[#FAFAFA] mb-8">Order Summary</h3>
            
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#D4AF37]/30">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-[rgba(255,255,255,0.02)] border border-gray-800 rounded-sm">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#FAFAFA] font-serif">{item.name}</h4>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-[#D4AF37] font-serif">
                    {(item.price * item.quantity).toFixed(2)} USD
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.05)] space-y-4">
              <div className="flex justify-between text-gray-400 font-sans text-sm">
                <span>Subtotal</span>
                <span>{getCartTotal().toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-gray-400 font-sans text-sm">
                <span>Shipping (Maison WA Courier)</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-[#FAFAFA] font-serif text-2xl pt-4">
                <span>Total</span>
                <span className="text-[#D4AF37]">{getCartTotal().toFixed(2)} USD</span>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Secure SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
