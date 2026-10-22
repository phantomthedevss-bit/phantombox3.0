
'use client';
import { useRef } from 'react';
import MovieCard from './MovieCard';
export default function MovieRow({ title, movies, onMovieClick, href }){
  const ref=useRef(null);
  if(!movies?.length) return null;
  return (
    <section className="mb-8 md:mb-10">
      <div className="flex items-center justify-between px-4 md:px-10 mb-3">
        <h2 className="font-display text-[18px] md:text-[20px] font-semibold tracking-tight">{title}</h2>
        {href && <a href={href} className="text-xs text-zinc-400 hover:text-white">See all →</a>}
      </div>
      <div ref={ref} className="row-scroll flex gap-3 overflow-x-auto px-4 md:px-10 pb-3 scroll-smooth">
        {movies.map(m=><MovieCard key={m.id} movie={m} onClick={onMovieClick} />)}
      </div>
    </section>
  );
}
