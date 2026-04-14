import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopNav } from './components/TopNav';
import { SideNav } from './components/SideNav';
import { SearchBar } from './components/SearchBar';
import { SpecimenCard } from './components/SpecimenCard';
import { CompositionPanel } from './components/CompositionPanel';
import { RegionalReport } from './components/RegionalReport';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ErrorBanner } from './components/ErrorBanner';

import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { isLoading, error, product, analysis, loaderMessage, search } = useSearch();

  return (
    <div className="min-h-screen">
      <TopNav 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onSearch={search} 
      />

      <SearchBar isMobile={true} onSubmit={search} />
      <SideNav onSearch={search} />

      <main className="pt-[110px] md:pt-24 pb-12 px-6 xl:ml-64 min-h-screen">
        <ErrorBanner error={error} />

        <div className="flex flex-col gap-6">
          <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1 block font-headline">Live Analysis Report</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface leading-none font-headline">
                {product?.product_name || "Specimen Scan Pending"}
              </h1>
              <p className="text-outline text-sm mt-2 font-light">
                {product ? `${product.brands || '-'} • ${product.quantity || '-'}` : "Search to initiate molecular analysis"}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-high border border-outline-variant/20 rounded text-[10px] font-headline uppercase text-on-surface-variant flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-primary-dim animate-pulse' : 'bg-outline'}`}></span> 
                {isLoading ? 'Terminal Busy' : 'Terminal Idle'}
              </span>
            </div>
          </header>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 w-full">
            <section className="lg:col-span-3 space-y-6">
              <SpecimenCard product={product} analysis={analysis} />
            </section>
            <section className="lg:col-span-5">
              <CompositionPanel product={product} analysis={analysis} />
            </section>
            <section className="lg:col-span-4">
              <RegionalReport analysis={analysis} />
            </section>
          </div>
        </div>
      </main>

      <LoadingOverlay isLoading={isLoading} message={loaderMessage} />
    </div>
  );
}

export default App;
