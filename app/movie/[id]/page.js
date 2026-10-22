
import { tmdb } from '../../../lib/tmdb';
import { IMG } from '../../../lib/constants';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import MovieClient from './MovieClient';

export async function generateMetadata({params}){
  try{
    const {id} = await params;
    const movie = await tmdb.movieDetails(id);
    return { title: `${movie.title} — PhantomBox`, description: movie.overview?.slice(0,160) };
  }catch{ return { title: 'Movie — PhantomBox' } }
}

export default async function MoviePage({params}){
  const {id} = await params;
  const movie = await tmdb.movieDetails(id).catch(()=>null);
  if(!movie) return <div className="min-h-screen grid place-items-center pt-[64px]">Not found <Link href="/" className="underline ml-2">Home</Link></div>;
  const backdrop = movie.backdrop_path ? `${IMG.backdrop}${movie.backdrop_path}` : IMG.backdropPlaceholder;
  const poster = movie.poster_path ? `${IMG.poster}${movie.poster_path}` : IMG.placeholder;
  const trailer = movie.videos?.results?.find(v=>v.site==='YouTube' && (v.type==='Trailer'||v.type==='Teaser'));
  const providers = movie['watch/providers']?.results?.US || movie['watch/providers']?.results?.NG || Object.values(movie['watch/providers']?.results||{})[0];

  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <MovieClient movie={movie} backdrop={backdrop} poster={poster} trailer={trailer} />

      <div className="px-4 md:px-10 py-8 grid md:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">
        <div>
          {trailer && (
            <div id="trailer" className="scroll-mt-20">
              <h3 className="font-display font-semibold mb-3 text-lg">Official Trailer</h3>
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe src={`https://www.youtube.com/embed/${trailer.key}?rel=0&autoplay=0`} title="Trailer" sandbox="allow-scripts allow-same-origin allow-forms" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0 w-full h-full border-0" />
              </div>
            </div>
          )}

          <h3 className="font-display font-semibold mt-8 mb-3">Cast</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {movie.credits?.cast?.slice(0,12).map(c=>(
              <div key={c.id} className="shrink-0 w-20 text-center">
                <img src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : IMG.placeholder} alt={c.name} className="w-20 h-20 rounded-full object-cover bg-zinc-900 border border-white/10" />
                <p className="text-[11px] mt-1 font-medium line-clamp-2">{c.name}</p>
              </div>
            ))}
          </div>

          {movie.similar?.results?.length>0 && (
            <>
              <h3 className="font-display font-semibold mt-8 mb-3">More Like This</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {movie.similar.results.slice(0,10).map(m=>(
                  <Link key={m.id} href={`/movie/${m.id}`} className="rounded-xl overflow-hidden bg-zinc-900 block hover:scale-105 transition">
                    <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : IMG.placeholder} alt={m.title} className="aspect-[2/3] object-cover" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="space-y-4">
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4">
            <h4 className="font-semibold mb-2">Where to Watch</h4>
            {providers ? (
              <div className="space-y-2 text-sm">
                {providers.flatrate && <p>Stream: {providers.flatrate.map(p=>p.provider_name).join(', ')}</p>}
                {providers.rent && <p>Rent: {providers.rent.map(p=>p.provider_name).join(', ')}</p>}
                {providers.buy && <p>Buy: {providers.buy.map(p=>p.provider_name).join(', ')}</p>}
              </div>
            ) : <p className="text-sm text-zinc-500">No provider data.</p>}
          </div>
          <Link href="/" className="block text-center bg-white text-black rounded-xl py-3 font-semibold">← Back Home</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
