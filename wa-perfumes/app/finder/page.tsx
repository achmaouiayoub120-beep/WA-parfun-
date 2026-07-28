'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCursor } from '@/providers/CursorProvider';
import { MEN_PRODUCTS } from '@/data/products/men';
import { WOMEN_PRODUCTS } from '@/data/products/women';
import Image from 'next/image';
import Link from 'next/link';

type Question = {
  id: string;
  question: string;
  options: { label: string; value: string; image?: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: 'gender',
    question: "Who are you shopping for?",
    options: [
      { label: "For Him (WA Signature)", value: "men" },
      { label: "For Her (WA Elegance)", value: "women" }
    ]
  },
  {
    id: 'mood',
    question: "What mood defines you?",
    options: [
      { label: "Bold & Mysterious", value: "bold" },
      { label: "Fresh & Energetic", value: "fresh" },
      { label: "Warm & Sensual", value: "warm" },
      { label: "Elegant & Sophisticated", value: "elegant" }
    ]
  },
  {
    id: 'note',
    question: "Which scent profile draws you in?",
    options: [
      { label: "Oud & Leather", value: "wood" },
      { label: "Citrus & Bergamot", value: "citrus" },
      { label: "Vanilla & Amber", value: "sweet" },
      { label: "Rose & Jasmine", value: "floral" }
    ]
  }
];

export default function PerfumeFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  
  const { setCursor, resetCursor } = useCursor();
  const router = useRouter();

  const handleSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    setIsCalculating(true);
    
    // Simulate AI calculation delay
    setTimeout(() => {
      const isMen = finalAnswers.gender === 'men';
      const catalog = isMen ? MEN_PRODUCTS : WOMEN_PRODUCTS;
      
      // Very basic recommendation logic based on answers
      let match = catalog[0];
      
      if (finalAnswers.note === 'wood') {
        match = catalog.find(p => p.baseNotes.some(n => n.toLowerCase().includes('oud') || n.toLowerCase().includes('wood'))) || catalog[0];
      } else if (finalAnswers.note === 'citrus') {
        match = catalog.find(p => p.topNotes.some(n => n.toLowerCase().includes('citrus') || n.toLowerCase().includes('bergamot'))) || catalog[0];
      } else if (finalAnswers.note === 'sweet') {
        match = catalog.find(p => p.baseNotes.some(n => n.toLowerCase().includes('vanilla') || n.toLowerCase().includes('amber'))) || catalog[0];
      } else if (finalAnswers.note === 'floral') {
        match = catalog.find(p => p.heartNotes.some(n => n.toLowerCase().includes('rose') || n.toLowerCase().includes('jasmine'))) || catalog[0];
      }
      
      setRecommendation(match);
      setIsCalculating(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden pt-20">
      <div className="max-w-4xl w-full relative z-10">
        <AnimatePresence mode="wait">
          
          {/* Quiz Questions */}
          {!isCalculating && !recommendation && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-6">
                Step {currentStep + 1} of {QUESTIONS.length}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-serif text-[#FAFAFA] mb-12">
                {QUESTIONS[currentStep].question}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                {QUESTIONS[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(QUESTIONS[currentStep].id, option.value)}
                    onMouseEnter={() => setCursor('magnetic')}
                    onMouseLeave={resetCursor}
                    className={`p-6 border transition-all duration-300 ${
                      answers[QUESTIONS[currentStep].id] === option.value
                        ? 'border-[#D4AF37] bg-[rgba(212,175,55,0.1)]'
                        : 'border-[rgba(255,255,255,0.1)] hover:border-[#D4AF37] bg-transparent'
                    }`}
                  >
                    <span className="text-[#FAFAFA] font-sans text-sm tracking-widest uppercase">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Calculating State */}
          {isCalculating && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 border-t-2 border-b-2 border-[#D4AF37] rounded-full animate-spin mb-8" />
              <h2 className="text-3xl font-serif text-[#D4AF37] animate-pulse">Analyzing your aura...</h2>
              <p className="text-gray-400 font-sans mt-4 uppercase tracking-widest text-xs">Curating your signature scent</p>
            </motion.div>
          )}

          {/* Result */}
          {recommendation && !isCalculating && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col md:flex-row items-center gap-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(212,175,55,0.2)] p-8 md:p-12 rounded-sm"
            >
              <div className="relative w-full md:w-1/2 aspect-[3/4] bg-[#050505]">
                <Image 
                  src={recommendation.image} 
                  alt={recommendation.name} 
                  fill 
                  className="object-contain p-8 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" 
                />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4 block">Your Signature Match</span>
                <h2 className="text-5xl font-serif text-[#FAFAFA] mb-4">{recommendation.name}</h2>
                <p className="text-gray-400 font-sans mb-8 leading-relaxed">
                  Based on your preferences, we selected this {recommendation.fragranceFamily} masterpiece. {recommendation.description}
                </p>
                
                <Link 
                  href={`/product/${recommendation.id}`}
                  onMouseEnter={() => setCursor('magnetic')}
                  onMouseLeave={resetCursor}
                  className="inline-flex justify-center items-center px-8 py-4 bg-[#D4AF37] text-[#050505] font-sans text-sm tracking-widest uppercase hover:bg-white transition-colors"
                >
                  Discover Fragrance
                </Link>
                
                <button
                  onClick={() => {
                    setRecommendation(null);
                    setCurrentStep(0);
                    setAnswers({});
                  }}
                  onMouseEnter={() => setCursor('magnetic')}
                  onMouseLeave={resetCursor}
                  className="mt-6 text-gray-500 hover:text-[#FAFAFA] text-xs uppercase tracking-widest transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
