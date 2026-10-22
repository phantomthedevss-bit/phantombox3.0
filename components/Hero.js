
'use client';
import { IMG } from '../lib/constants';
export default function Hero({ movie, onPlay, onInfo }){
  if(!movie) return <div className="w-full h-[68vh] skeleton" />;
  const backdrop = movie.backdrop_path ? `${IMG.backdrop}${movie.backdrop_path}` : IMG.backdropPlaceholder;
  return (
    <section className="relative w-full h-[72vh] md:h-[90vh] overflow-hidden">
      <img src={backdrop} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-vignette" />
      <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-10 pb-16 md:pb-28 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-violet-300 mb-3"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"/>Featured • Legal • Trending</div>
        <h1 className="font-display font-bold text-3xl md:text-6xl leading-[0.95] mb-3">{movie.title}</h1>
        <div className="flex gap-3 text-sm text-zinc-200 mb-4"><span className="text-emerald-400 font-bold">{movie.vote_average?.toFixed(1)} ★</span><span>{movie.release_date?.slice(0,4)}</span></div>
        <p className="text-[14px] text-zinc-200 line-clamp-3 max-w-xl mb-6">{movie.overview}</p>
        <div className="flex gap-3">
          <button onClick={()=>onPlay(movie)} className="bg-white text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-zinc-200 transition">▶ Watch Trailer</button>
          <button onClick={()=>onInfo(movie)} className="glass rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">More Info</button>
          <a href={`/movie/${movie.id}`} className="glass rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">Open Page</a>
        </div>
      </div>
    </section>
  );
}
