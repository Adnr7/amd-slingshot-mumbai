import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Counter({ from, to }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;
    const diff = to - from;
    const inc = diff / steps;
    
    let current = from;
    const timer = setInterval(() => {
      current += inc;
      if ((inc > 0 && current >= to) || (inc < 0 && current <= to)) {
        clearInterval(timer);
        setCount(to);
      } else {
        setCount(Math.round(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [from, to]);

  return <span>{count}</span>;
}

export function SpecimenCard({ product, analysis }) {
  const cMap = {
    'primary': 'bg-primary-container text-on-primary-container',
    'error': 'bg-error text-on-error',
    'tertiary': 'bg-tertiary text-on-tertiary',
    'warning': 'bg-secondary text-on-secondary'
  };

  const badgeClass = analysis ? cMap[analysis.verdictColorText] || 'bg-error text-on-error' : 'bg-surface-variant text-on-surface';

  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-lg h-full">
      <span className="technical-label text-[10px] tracking-widest text-outline block mb-4 uppercase">
        SPECIMEN_ID: {product?.id || 'XXX'}
      </span>

      <div className="relative aspect-square mb-6 group bg-surface-container-lowest rounded-lg border border-outline-variant/10 flex items-center justify-center p-4">
        {product?.image_url ? (
          <img 
            className="w-full h-full object-contain rounded-lg transition-all duration-500 Mix-blend-luminosity hover:mix-blend-normal" 
            src={product.image_url} 
            alt="Product Specimen" 
          />
        ) : (
          <span className="material-symbols-outlined text-outline text-5xl">image_not_supported</span>
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-lg pointer-events-none"></div>
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold px-2 py-1 rounded shadow ${badgeClass}`}>
            {analysis?.verdict || 'WAITING..'}
          </span>
        </div>
      </div>

      <div className="text-center bg-surface-container rounded-lg py-4">
        <div className="relative inline-flex flex-col items-center justify-center mb-2">
          <span className="text-4xl font-bold text-on-surface font-headline">
            {analysis ? <Counter from={0} to={analysis.healthScore} /> : '--'}
          </span>
          <span className="text-[10px] text-outline uppercase font-headline tracking-tighter">Health Score</span>
        </div>
        <p className="text-outline text-xs leading-relaxed italic px-4">
          {analysis?.verdictReason || 'Waiting for AI analysis...'}
        </p>
      </div>
    </div>
  );
}
