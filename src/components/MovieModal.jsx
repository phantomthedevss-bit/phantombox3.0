import { useEffect, useState } from 'react';
import { IMG } from '../lib/constants';
import { tmdb } from '../lib/tmdb';
import { useList } from '../context/ListContext';

export default function MovieModal({ movieId, onClose, onPlayTrailer, onWatch }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isSaved, toggle } = useList();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try { const d = await tmdb.movieDetails(movieId); if (mounted) setData(d); } catch {} finally { if (mounted) setLoading(false); }
    }
    load();
    return () => { mounted = false; };
  }, [movieId]);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onEsc); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!movieId) return null;
  const backdrop = data?.backdrop_path ? `${IMG.backdrop}${data.backdrop_path}` : IMG.backdropPlaceholder;
  const poster = data?.poster_path ? `${IMG.poster}${data.poster_path}` : IMG.placeholder;
  const trailer = data?.videos?.results?.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
  const cast = data?.credits?.cast?.slice(0,6).map(c=>c.name).join(', ');

  return (
    <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex items-start justify-center overflow-y-auto p-3 md:p-8" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-4xl bg-[#101012] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center transition">\u00d7</button>
        {loading ? <div className="aspect-video skeleton" /> : (
          <div className="relative aspect-video bg-black">
            <img src={backdrop} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              <button onClick={() => trailer ? onPlayTrailer(trailer.key) : onClose()} className="inline-flex items-center gap-2 bg-white text-black font-bold px-5 py-2.5 rounded-full hover:bg-zinc-200 transition text-sm">
                \u25B6 {trailer ? 'Play Trailer' : 'No Trailer'}
              </button>
              <button onClick={() => onWatch(data.id)} className="inline-flex items-center gap-2 bg-zinc-800/80 backdrop-blur text-white font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-700 transition text-sm border border-white/10">Watch Movie</button>
              <button onClick={() => { if(data){ toggle(data); }}} className={`ml-auto w-10 h-10 rounded-full flex items-center justify-center border transition ${data && isSaved(data.id) ? 'bg-violet-600 border-violet-500' : 'bg-zinc-800/70 border-white/10 hover:bg-zinc-700'}`}>{data && isSaved(data.id) ? '\u2713' : '+'}</button>
            </div>
          </div>
        )}
        <div className="p-6 md:p-8 flex gap-6">
          <img src={poster} alt="" className="hidden md:block w-36 rounded-xl object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            {loading ? (
              <><div className="h-7 w-2/3 skeleton rounded mb-3" /><div className="h-4 w-full skeleton rounded mb-2" /><div className="h-4 w-5/6 skeleton rounded" /></>
            ) : (
              <>
                <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-2">{data.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-zinc-400 mb-4">
                  <span className="text-emerald-400 font-bold">{data.vote_average?.toFixed(1)} \u2605</span>
                  <span>{data.release_date?.slice(0,4)}</span>
                  <span>{Math.floor(data.runtime/60)}h {data.runtime%60}m</span>
                  <span>{data.genres?.map(g=>g.name).join(' \u2022 ')}</span>
                </div>
                <p className="text-[14px] leading-relaxed text-zinc-200 mb-4">{data.overview || 'No overview available.'}</p>
                {cast && <p className="text-[12px] text-zinc-400"><span className="text-zinc-500">Cast:</span> {cast}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
