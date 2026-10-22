
import { tmdb } from '../../../lib/tmdb';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export async function generateMetadata({params}){ 
  const {id} = await params;
  return { title: `Genre ${id} — PhantomBox` } 
}

export default async function GenrePage({params}){
  const {id} = await params;
  const data = await tmdb.discover({genreId: id}).catch(()=>({results:[]}));
  return (
    <div className="min-h-screen pt-[64px]">
      <Navbar />
      <div className="px-4 md:px-10 py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Genre: {id}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {data.results?.map(m=>(
            <Link key={m.id} href={`/movie/${m.id}`} className="rounded-xl overflow-hidden bg-zinc-900 block">
              <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : ''} alt={m.title} className="aspect-[2/3] object-cover" />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
