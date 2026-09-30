import { IMG } from '../lib/constants';

export default function Hero({ movie, genres, onPlay, onInfo, loading }) {
  if (loading) return <div className="w-full h-[68vh] md:h-[86vh] skeleton" />;
  if (!movie) return null;
  const backdrop = movie.backdrop_path ? `${IMG.backdrop}${movie.backdrop_path}` : IMG.backdropPlaceholder;
  const year = movie.release_date?.slice(0,4);
  const genreNames = movie.genre_ids?.map(id => genres[id]).filter(Boolean).slice(0,3).join(' \u2022 ');

  return (
    <section className="relative w-full h-[72vh] md:h-[92vh] overflow-hidden">
      <img src={backdrop} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-vignette" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent hidden md:block" />
      <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-10 pb-16 md:pb-28 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-violet-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /> Featured \u2022 Trending #1
        </div>
        <h1 className="font-display font-bold text-3xl md:text-6xl leading-[0.95] tracking-tight mb-3 drop-shadow-2xl">{movie.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-200 mb-4">
          <span className="flex items-center gap-1.5 font-bold text-emerald-400"><span className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center text-[10px]">\u2605</span>{movie.vote_average?.toFixed(1)}</span>
          <span className="px-1.5 py-0.5 rounded border border-zinc-600 text-xs">{year}</span>
          <span className="text-zinc-300 hidden sm:inline text-xs">{genreNames}</span>
        </div>
        <p className="text-[14px] md:text-[15px] leading-relaxed text-zinc-200 line-clamp-3 max-w-xl mb-6">{movie.overview}</p>
        <div className="flex items-center gap-3">
          <button onClick={onPlay} className="inline-flex items-center gap-2 bg-white text-black font-bold text-sm px-6 md:px-7 py-3 rounded-full hover:bg-zinc-200 transition shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Watch Trailer
          </button>
          <button onClick={onInfo} className="inline-flex items-center gap-2 bg-zinc-800/70 backdrop-blur text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-zinc-700/80 transition border border-white/10">
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}
