
import { tmdb } from '../../../lib/tmdb';
import { IMG } from '../../../lib/constants';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export async function generateMetadata({params}){
  try{
    const movie = await tmdb.movieDetails(params.id);
    return { title: `${movie.title} — PhantomBox`, description: movie.overview?.slice(0,160) };
  }catch{ return { title: 'Movie — PhantomBox' } }
}

export default async function MoviePage({params}){
  const movie = await tmdb.movieDetails(params.id).catch(()=>null);
  if(!movie) return <div className="min-h-screen grid place-items-center">Not found <Link href="/" className="underline ml-2">Home</Link></div>;
  const backdrop = movie.backdrop_path ? `${IMG.backdrop}${movie.backdrop_path}` : IMG.backdropPlaceholder;
  const poster = movie.poster_path ? `${IMG.poster}${movie.poster_path}` : IMG.placeholder;
  const trailer = movie.videos?.results?.find(v=>v.site==='YouTube' && (v.type==='Trailer'||v.type==='Teaser'));
  const providers = movie['watch/providers']?.results?.US || movie['watch/providers']?.results?.NG || Object.values(movie['watch/providers']?.results||{})[0];

  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <div className="relative h-[60vh] overflow-hidden">
        <img src={backdrop} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-vignette" />
        <div className="absolute bottom-0 p-4 md:p-10 flex gap-6 items-end">
          <img src={poster} alt="" className="w-32 md:w-48 rounded-xl hidden md:block shadow-2xl" />
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-bold">{movie.title}</h1>
            <div className="flex gap-2 text-sm text-zinc-300 mt-2"><span className="text-emerald-400">{movie.vote_average?.toFixed(1)} ★</span><span>{movie.release_date}</span><span>{movie.runtime}m</span></div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 py-8 grid md:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">
        <div>
          <p className="text-[15px] leading-relaxed text-zinc-200">{movie.overview}</p>

          {trailer && (
            <div className="mt-8">
              <h3 className="font-display font-semibold mb-3">Official Trailer (Secure Player)</h3>
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
                <iframe src={`https://www.youtube.com/embed/${trailer.key}?rel=0`} title="Trailer" sandbox="allow-scripts allow-same-origin allow-forms" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0 w-full h-full border-0" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Sandbox: allow-scripts allow-same-origin allow-forms (no popups, no top-navigation). window.open blocked.</p>
            </div>
          )}

          <h3 className="font-display font-semibold mt-8 mb-3">Cast</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {movie.credits?.cast?.slice(0,12).map(c=>(
              <div key={c.id} className="shrink-0 w-20 text-center">
                <img src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : IMG.placeholder} alt={c.name} className="w-20 h-20 rounded-full object-cover bg-zinc-900" />
                <p className="text-[11px] mt-1 font-medium line-clamp-2">{c.name}</p>
              </div>
            ))}
          </div>

          {movie.similar?.results?.length>0 && (
            <>
              <h3 className="font-display font-semibold mt-8 mb-3">More Like This</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {movie.similar.results.slice(0,10).map(m=>(
                  <Link key={m.id} href={`/movie/${m.id}`} className="rounded-xl overflow-hidden bg-zinc-900 hover:scale-105 transition">
                    <img src={m.poster_path ? `${IMG.poster}${m.poster_path}` : ''} alt={m.title} className="aspect-[2/3] object-cover" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h4 className="font-semibold mb-3">Where to Watch Legally</h4>
            {providers ? (
              <div className="space-y-3">
                {providers.flatrate && <div><p className="text-[11px] text-zinc-500 uppercase">Stream</p><div className="flex flex-wrap gap-2 mt-1">{providers.flatrate.map(p=><span key={p.provider_id} className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full"><img src={`https://image.tmdb.org/t/p/original${p.logo_path}`} className="w-4 h-4 rounded" />{p.provider_name}</span>)}</div></div>}
                {providers.buy && <div><p className="text-[11px] text-zinc-500 uppercase">Buy / Download</p><div className="flex flex-wrap gap-2 mt-1">{providers.buy.map(p=><span key={p.provider_id} className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full"><img src={`https://image.tmdb.org/t/p/original${p.logo_path}`} className="w-4 h-4 rounded" />{p.provider_name}</span>)}</div></div>}
                {providers.rent && <div><p className="text-[11px] text-zinc-500 uppercase">Rent</p><div className="flex flex-wrap gap-2 mt-1">{providers.rent.map(p=><span key={p.provider_id} className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full"><img src={`https://image.tmdb.org/t/p/original${p.logo_path}`} className="w-4 h-4 rounded" />{p.provider_name}</span>)}</div></div>}
                <p className="text-[10px] text-zinc-500 mt-3">Data from JustWatch via TMDB. Links go to official apps where you can download offline legally.</p>
              </div>
            ) : <p className="text-[12px] text-zinc-500">No providers found in your region. Search JustWatch for legal options.</p>}
          </div>

          <div className="glass rounded-2xl p-5">
            <h4 className="font-semibold mb-3">Legal Download Options</h4>
            <div className="flex flex-col gap-2">
              <a href={poster} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-[13px]">🖼️ Download Poster (Legal)</a>
              <button onClick={()=>{ const blob=new Blob([JSON.stringify(movie,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`${movie.title}_info.json`; a.click(); URL.revokeObjectURL(url); }} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-[13px] text-left">📄 Download Info JSON</button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-3">No pirated movie files. Only posters, metadata, and links to official stores.</p>
          </div>

          <div className="glass rounded-2xl p-5">
            <h4 className="font-semibold mb-2">Details</h4>
            <ul className="text-[12px] text-zinc-400 space-y-1">
              <li>Release: {movie.release_date}</li>
              <li>Rating: {movie.vote_average}/10</li>
              <li>Runtime: {Math.floor(movie.runtime/60)}h {movie.runtime%60}m</li>
              <li>Budget: {movie.budget ? `$${(movie.budget/1e6).toFixed(1)}M` : '—'}</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
