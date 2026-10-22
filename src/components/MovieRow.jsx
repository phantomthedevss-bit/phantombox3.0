import { useRef } from 'react';
import MovieCard from './MovieCard';

export default function MovieRow({ id, title, movies, onMovieClick, loading }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 600, behavior: 'smooth' });
  };
  if (!loading && movies.length === 0) return null;
  return (
    <section id={id} className="relative group/row mb-8 md:mb-10">
      <div className="flex items-center justify-between px-4 md:px-10 mb-3">
        <h2 className="font-display text-[18px] md:text-[20px] font-semibold tracking-tight">{title}</h2>
        <div className="hidden md:flex gap-2 opacity-0 group-hover/row:opacity-100 transition">
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">‹</button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">›</button>
        </div>
      </div>
      <div ref={ref} className="row-scroll flex gap-2.5 md:gap-3 overflow-x-auto px-4 md:px-10 pb-3 scroll-smooth">
        {loading ? Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-[148px] sm:w-[168px] md:w-[184px] aspect-[2/3] skeleton rounded-xl shrink-0" />
        )) : movies.map(m => (
          <MovieCard key={m.id} movie={m} onClick={onMovieClick} />
        ))}
      </div>
    </section>
  );
}
