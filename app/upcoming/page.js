
import { tmdb } from '../../lib/tmdb';
import MovieCard from '../../components/MovieCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata = { title: 'Upcoming — PhantomBox' };

export default async function Page(){
  const data = await tmdb.upcoming().catch(()=>({results:[]}));
  const movies = data.results||[];
  return (
    <div className="min-h-screen pt-[64px]">
      <Navbar />
      <div className="px-4 md:px-10 py-8">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="font-display text-3xl font-bold">Upcoming</h1>
          <span className="text-xs px-2 py-1 rounded-full glass">{
            movies.length
          } titles</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map(m=>(
            <Link key={m.id} href={`/movie/${m.id}`} className="movie-card rounded-xl overflow-hidden bg-zinc-900 block hover:scale-105 transition">
              <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750'} alt={m.title} className="aspect-[2/3] object-cover" />
              <div className="p-2.5">
                <p className="text-[12px] font-semibold line-clamp-2">{m.title}</p>
                <p className="text-[11px] text-zinc-400">{m.vote_average?.toFixed(1)} • {m.release_date?.slice(0,4)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
