import { motion, AnimatePresence } from 'framer-motion';

export function ErrorBanner({ error }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-7xl mx-auto bg-error-container/20 border border-error/30 text-error p-4 rounded-lg mb-6 flex items-center gap-3 shadow-lg"
        >
          <span className="material-symbols-outlined shrink-0">error</span>
          <span className="text-sm font-semibold">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
