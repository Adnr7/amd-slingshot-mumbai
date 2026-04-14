import { motion, AnimatePresence } from 'framer-motion';

export function LoadingOverlay({ isLoading, message }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 text-center"
        >
          <svg className="w-16 h-16 animate-spin text-surface-variant mb-6" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"></circle>
            <path d="M5 50 A45 45 0 0 1 50 5" fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round"></path>
          </svg>
          <motion.span 
            key={message}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-primary text-xl font-bold tracking-widest mb-2"
          >
            {message || 'FETCHING DATABASE...'}
          </motion.span>
          <span className="font-body text-xs text-outline">
            Processing multi-region open food datasets via Gemini Flash.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
