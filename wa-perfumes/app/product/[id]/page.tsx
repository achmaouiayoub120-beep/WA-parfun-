import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getAllProductIds } from '@/lib/products';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { Scene } from '@/components/3d/Scene';

export function generateStaticParams() {
  const ids = getAllProductIds();
  return ids.map((id) => ({ id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  const isWomen = product.id.startsWith('wa-elegance');
  const accentColor = isWomen ? '#C97B84' : '#D4AF37';

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      
      {/* Background ambient glow based on collection */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Column: Interactive Visuals */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full rounded-sm overflow-hidden glass border border-border-subtle">
          {/* We reuse the 3D scene here but we could pass props to change the bottle color */}
          <div className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none">
            <Scene />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full h-full">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-contain filter drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col justify-center">
          
          <span 
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: accentColor }}
          >
            {product.number} — {product.fragranceFamily}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-6">
            {product.name}
          </h1>
          
          <p className="text-gray-400 font-sans text-lg mb-8 leading-relaxed max-w-lg">
            {product.description}
          </p>

          <div className="flex items-end gap-6 mb-12">
            <span className="text-3xl font-serif" style={{ color: accentColor }}>
              {product.price} {product.currency}
            </span>
            <span className="text-gray-500 text-sm uppercase tracking-widest mb-1">
              {product.volume}
            </span>
          </div>

          <AddToCartButton product={product} className="w-full max-w-md py-5 text-sm" />

          {/* Accordion Details */}
          <div className="mt-16 border-t border-border-subtle pt-8">
            <h3 className="text-foreground font-serif text-2xl mb-6">Olfactory Notes</h3>
            
            <div className="space-y-6">
              <div>
                <span className="text-gray-500 uppercase tracking-widest text-[10px] block mb-2">Top Notes</span>
                <p className="text-foreground font-sans">{product.topNotes?.join(', ') || 'N/A'}</p>
              </div>
              
              <div className="w-full h-[1px] bg-gradient-to-r from-border-subtle to-transparent" />
              
              <div>
                <span className="text-gray-500 uppercase tracking-widest text-[10px] block mb-2">Heart Notes</span>
                <p className="text-foreground font-sans">{product.heartNotes?.join(', ') || 'N/A'}</p>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-border-subtle to-transparent" />
              
              <div>
                <span className="text-gray-500 uppercase tracking-widest text-[10px] block mb-2">Base Notes</span>
                <p className="text-foreground font-sans">{product.baseNotes?.join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
