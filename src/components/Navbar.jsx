import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onSearch, searchValue, genres, selectedGenre, onGenreChange }) {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initial = user?.name?.[0]?.toUpperCase() || 'G';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#070708]/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="flex items-center justify-between gap-4 px-4 md:px-10 h-[64px]">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-display font-bold">P</div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">PHANTOMBOX</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-zinc-400">
            <a href="#" className="text-white">Home</a>
            <a href="#trending" className="hover:text-white transition">Trending</a>
            <a href="#top_rated" className="hover:text-white transition">Top Rated</a>
            <a href="#mylist" className="hover:text-white transition">My List</a>
          </nav>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end max-w-2xl">
          <div className="relative w-full max-w-[320px] group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
            <input
              value={searchValue}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search films, actors..."
              className="w-full bg-zinc-900/70 border border-zinc-800 focus:border-violet-500/50 focus:bg-zinc-900 text-[13px] text-white placeholder-zinc-500 rounded-full pl-10 pr-4 py-2.5 outline-none transition"
            />
          </div>

          <select
            value={selectedGenre}
            onChange={e => onGenreChange(e.target.value)}
            className="hidden sm:block bg-zinc-900 border border-zinc-800 text-[13px] text-white rounded-full px-3 py-2.5 outline-none cursor-pointer"
          >
            <option value="">All Genres</option>
            {Object.entries(genres).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          <div className="relative shrink-0">
            <button onClick={() => setMenuOpen(v => !v)} className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold">{initial}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-11 w-56 glass rounded-xl p-2 shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-sm font-semibold truncate">{user?.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                </div>
                <button onClick={() => { setMenuOpen(false); signOut(); }} className="w-full text-left text-sm px-3 py-2 hover:bg-white/10 rounded-lg transition">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
