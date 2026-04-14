import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';

export function TopNav({ theme, toggleTheme, onOpenSettings, onSearch }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 flex justify-between items-center px-8 h-16 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold tracking-tighter text-primary font-headline">NutriLens</span>
        <span className="hidden md:block text-[10px] text-outline font-headline uppercase tracking-widest border-l border-outline-variant pl-3">
          Forensic Intelligence
        </span>
      </div>

      <SearchBar onSubmit={onSearch} />

      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-outline hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high">
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </nav>
  );
}
