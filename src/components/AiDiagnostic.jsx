import { motion } from 'framer-motion';

export function AiDiagnostic({ text }) {
  if (!text) return null;
  
  const lines = text.split('\n');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[#001f11] dark:bg-[#002f1a] p-5 rounded-lg border-l-2 border-primary/60 mt-6 relative overflow-hidden text-emerald-400">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-5xl">memory</span>
      </div>
      <h3 className="technical-label text-white text-xs mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> GEMINI AI DIAGNOSTIC
      </h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="font-mono text-[11px] leading-relaxed relative z-10"
      >
        {lines.map((line, i) => (
          <motion.div key={i} variants={item}>
            {line}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
