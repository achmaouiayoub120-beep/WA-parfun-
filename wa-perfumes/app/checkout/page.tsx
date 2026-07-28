'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ShieldCheck, CreditCard } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { items, getCartTotal, clearCart } = useCartStore();

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
      <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl text-[#F5F2EC] font-light mb-6">
          Your Cart is Empty
        </h1>
        <p className="body-large mb-8">Begin your journey to find your signature scent.</p>
        <Link href="/">
          <MagneticButton className="px-8 py-4 border border-[rgba(201,168,118,0.3)] text-[0.7rem] uppercase tracking-[0.3em] text-[#C9A876] hover:bg-[rgba(201,168,118,0.08)] transition-colors duration-500 rounded-none">
            Return Home
          </MagneticButton>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        
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
                <div className="w-16 h-16 bg-[rgba(201,168,118,0.1)] rounded-full flex items-center justify-center mb-8 border border-[rgba(201,168,118,0.25)]">
                  <Check className="w-8 h-8 text-[#C9A876]" />
                </div>
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#F5F2EC] mb-6">
                  Order Confirmed.
                </h1>
                <p className="body-large mb-8">
                  Thank you for your purchase. Your signature scents are being prepared with the utmost care by WA Perfumes.
                </p>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#C9A876] mb-12">
                  Order #WA-{Math.floor(Math.random() * 1000000)}
                </p>
                
                <Link href="/">
                  <MagneticButton className="px-8 py-4 bg-[#C9A876] text-[#0A0A0A] text-[0.7rem] uppercase tracking-[0.3em] hover:bg-[#E0C99A] transition-colors duration-500 border-none rounded-none">
                    Return to Boutique
                  </MagneticButton>
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
                  <span className={`text-[0.65rem] uppercase tracking-[0.25em] ${step >= 1 ? 'text-[#C9A876]' : 'text-[#6B6560]'}`}>1. Details</span>
                  <div className={`w-8 h-[1px] ${step >= 2 ? 'bg-[#C9A876]' : 'bg-[rgba(255,255,255,0.06)]'}`} />
                  <span className={`text-[0.65rem] uppercase tracking-[0.25em] ${step >= 2 ? 'text-[#C9A876]' : 'text-[#6B6560]'}`}>2. Shipping</span>
                  <div className={`w-8 h-[1px] ${step >= 3 ? 'bg-[#C9A876]' : 'bg-[rgba(255,255,255,0.06)]'}`} />
                  <span className={`text-[0.65rem] uppercase tracking-[0.25em] ${step >= 3 ? 'text-[#C9A876]' : 'text-[#6B6560]'}`}>3. Payment</span>
                </div>

                <form onSubmit={step === 3 ? handleComplete : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-8">
                  
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light tracking-[0.04em] text-[#F5F2EC]">Contact Information</h2>
                      <div className="space-y-4">
                        <input type="email" required placeholder="Email Address" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="First Name" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors" />
                          <input type="text" required placeholder="Last Name" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light tracking-[0.04em] text-[#F5F2EC]">Shipping Address</h2>
                      <div className="space-y-4">
                        <input type="text" required placeholder="Address" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors" />
                        <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="City" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors" />
                          <input type="text" required placeholder="Postal Code" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light tracking-[0.04em] text-[#F5F2EC]">Payment Method</h2>
                      <div className="p-6 border border-[rgba(201,168,118,0.25)] bg-[rgba(201,168,118,0.05)] rounded-none space-y-4">
                        <div className="flex items-center justify-between mb-4 text-[#F5F2EC]">
                          <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#C9A876]" /> Credit Card</span>
                        </div>
                        <input type="text" required placeholder="Card Number" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors font-mono" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="MM/YY" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors font-mono" />
                          <input type="text" required placeholder="CVC" className="w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-none p-4 text-[#F5F2EC] focus:border-[#C9A876] focus:outline-none transition-colors font-mono" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-8 flex justify-between items-center">
                    {step > 1 ? (
                      <button 
                        type="button" 
                        onClick={() => setStep(step - 1)}
                        className="text-[#9A9590] hover:text-[#C9A876] uppercase tracking-[0.25em] text-[0.65rem] transition-colors"
                      >
                        Back
                      </button>
                    ) : <div />}
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-8 py-4 bg-[#C9A876] text-[#0A0A0A] font-[family-name:var(--font-sans)] text-[0.7rem] tracking-[0.3em] uppercase hover:bg-[#E0C99A] transition-colors flex items-center justify-center min-w-[200px]"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-t-2 border-b-2 border-[#0A0A0A] rounded-full animate-spin" />
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
        <div className="hidden lg:block border-l border-[rgba(255,255,255,0.04)] pl-16">
          <div className="sticky top-32">
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-light tracking-[0.04em] text-[#F5F2EC] mb-8">Order Summary</h3>
            
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[rgba(201,168,118,0.3)]">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-[#111111] border border-[rgba(255,255,255,0.02)] rounded-none overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F5F2EC] font-[family-name:var(--font-cormorant)] text-lg truncate">{item.name}</h4>
                    <p className="text-[#9A9590] text-[0.65rem] uppercase tracking-[0.25em]">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-[#C9A876] font-[family-name:var(--font-sans)] whitespace-nowrap text-sm">
                    {item.price * item.quantity} DH
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.04)] space-y-4">
              <div className="flex justify-between text-[#9A9590] text-sm">
                <span>Subtotal</span>
                <span>{getCartTotal()} DH</span>
              </div>
              <div className="flex justify-between text-[#9A9590] text-sm">
                <span>Shipping (WA Perfumes Courier)</span>
                <span className="text-[#C9A876]">Complimentary</span>
              </div>
              <div className="flex justify-between text-[#F5F2EC] font-[family-name:var(--font-cormorant)] text-2xl pt-4 border-t border-[rgba(255,255,255,0.04)]">
                <span>Total</span>
                <span className="text-[#C9A876]">{getCartTotal()} DH</span>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[#6B6560] text-xs">
                <ShieldCheck className="w-4 h-4 text-[#C9A876]" /> Secure SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
