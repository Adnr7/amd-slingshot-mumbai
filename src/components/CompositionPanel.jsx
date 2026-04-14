import { AiDiagnostic } from './AiDiagnostic';
import { motion } from 'framer-motion';

export function CompositionPanel({ product, analysis }) {
  const ingredientsList = analysis?.ingredientsList || [];
  const nutr = product?.nutriments || {};
  
  const nutrientKeys = [
    { key: 'calories', label: 'Energy', unit: 'kcal', field: 'energy-kcal_100g' },
    { key: 'sugar', label: 'Sugars', unit: 'g', field: 'sugars_100g' },
    { key: 'fat', label: 'Fat', unit: 'g', field: 'fat_100g' },
    { key: 'sodium', label: 'Salt', unit: 'g', field: 'salt_100g' }
  ];

  return (
    <div className="bg-surface-container-low h-full rounded-xl border border-outline-variant/10 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-on-surface flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">biotech</span> Composition Analysis
        </h2>
      </div>

      <div className="mb-4">
        <span className="technical-label text-[10px] text-outline block mb-2 uppercase tracking-widest opacity-70">Ingredient Assessment</span>
        <div className="flex flex-wrap gap-2">
          {!analysis ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-outline/10 border border-outline/5 rounded animate-pulse opacity-30"></div>
            ))
          ) : (
            ingredientsList.map((ing, idx) => {
              let sClass = 'bg-surface-container-highest text-on-surface';
              if (ing.type === 'warning') sClass = 'bg-secondary-container text-on-secondary-container';
              if (ing.type === 'error') sClass = 'bg-error-container text-on-error-container';
              if (ing.type === 'safe') sClass = 'bg-primary-container text-on-primary-container';
              
              return (
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className={`px-3 py-1.5 text-[10px] font-bold technical-label rounded uppercase tracking-wider shadow-sm border border-outline-variant/10 ${sClass}`}
                >
                  {ing.name}
                </motion.span>
              );
            })
          )}
        </div>
      </div>

      <AiDiagnostic text={analysis?.aiSummary || '> INITIALIZING SCAN...\n> WAITING FOR DATA INGESTION...'} />

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {nutrientKeys.map((k, idx) => {
          const val = nutr[k.field];
          return (
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              key={k.key} 
              className="bg-surface-container p-4 rounded-lg border border-outline-variant/10 text-center shadow-sm"
            >
              <div className="text-[9px] text-outline uppercase mb-1 font-headline">{k.label}</div>
              <div className="text-xl font-bold text-on-surface font-headline">{val !== undefined ? `${val}${k.unit}` : '-'}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
