export function SearchBar({ onSubmit, isMobile }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('query');
    if (onSubmit) onSubmit(query);
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSubmit} className="md:hidden fixed top-16 w-full px-4 py-3 bg-surface z-40 border-b border-outline-variant/15">
        <div className="relative flex items-center">
          <input
            name="query"
            className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-full py-2 px-6 text-sm text-on-surface"
            placeholder="Search product..."
            type="text"
            required
            autoComplete="off"
          />
          <button type="submit" className="absolute right-3 text-outline">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="hidden md:flex flex-1 max-w-2xl px-8">
      <form onSubmit={handleSubmit} className="w-full relative flex items-center">
        <input
          name="query"
          className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-full py-2 px-6 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all"
          placeholder="Search product molecular signature (e.g. Maggi, Oreo)..."
          type="text"
          autoComplete="off"
          required
        />
        <button type="submit" className="absolute right-3 flex items-center text-outline hover:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </div>
  );
}
