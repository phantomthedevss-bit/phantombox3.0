
'use client';
import Link from 'next/link';
import { IMG } from '../lib/constants';
import { useApp } from '../context/AppContext';

export default function MovieCard({ movie, onClick }){
  const poster = movie.poster_path ? `${IMG.poster}${movie.poster_path}` : IMG.placeholder;
  const { progress } = useApp();
  const pct = progress[movie.id]?.pct||0;
  return (
    <div className="movie-card relative w-[148px] md:w-[184px] shrink-0 rounded-xl overflow-hidden bg-zinc-900 group">
      <Link href={`/movie/${movie.id}`} className="block">
        <img src={poster} alt={movie.title} loading="lazy" className="w-full aspect-[2/3] object-cover" />
        {pct>0 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800"><div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{width:`${pct}%`}}/></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute bottom-0 p-2.5 opacity-0 group-hover:opacity-100 transition translate-y-1 group-hover:translate-y-0">
          <p className="text-[12px] font-semibold line-clamp-2">{movie.title}</p>
          <p className="text-[11px] text-zinc-300 mt-1">{movie.vote_average?.toFixed(1)} • {movie.release_date?.slice(0,4)}</p>
        </div>
      </Link>
      <button onClick={()=>onClick?.(movie)} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition">▶</button>
    </div>
  );
}
