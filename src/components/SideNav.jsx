export function SideNav({ onSearch }) {
  const quickTags = ["Maggi", "Lay's", "Oreo"];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-container-low border-r border-outline-variant/15 hidden xl:flex flex-col py-6 z-40">
      <div className="px-6 mb-8">
        <h3 className="text-primary font-bold font-headline uppercase text-[11px] tracking-widest">Active Scan</h3>
        <p className="text-outline text-[10px] font-headline">Forensic Food Lab v3.0</p>
      </div>
      <nav className="flex-1 space-y-1">
        <a className="flex items-center gap-3 px-6 py-3 bg-surface-container text-primary border-l-4 border-primary transition-all duration-300" href="#intelligence">
          <span className="material-symbols-outlined shrink-0">analytics</span>
          <span className="font-headline text-[11px] uppercase tracking-widest font-semibold">Intelligence</span>
        </a>
        <a className="flex items-center gap-3 px-6 py-3 text-outline hover:bg-surface-container hover:text-primary transition-all duration-300" href="#ingredients">
          <span className="material-symbols-outlined shrink-0">science</span>
          <span className="font-headline text-[11px] uppercase tracking-widest font-semibold">Ingredients</span>
        </a>
        <a className="flex items-center gap-3 px-6 py-3 text-outline hover:bg-surface-container hover:text-primary transition-all duration-300" href="#regionality">
          <span className="material-symbols-outlined shrink-0">public</span>
          <span className="font-headline text-[11px] uppercase tracking-widest font-semibold">Regionality</span>
        </a>
      </nav>
      <div className="px-6 pt-4 border-t border-outline-variant/20">
        <div className="flex flex-wrap gap-2">
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="px-2 py-1 bg-surface-variant text-on-surface-variant text-[10px] rounded cursor-pointer hover:bg-primary hover:text-on-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
