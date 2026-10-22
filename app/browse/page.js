
'use client';
import { useEffect, useState } from 'react';
import { tmdb } from '../../lib/tmdb';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Browse(){
  const [movies,setMovies]=useState([]);
  const [genre,setGenre]=useState('');
  const [genres,setGenres]=useState({});
  useEffect(()=>{ tmdb.genres().then(r=>{ const m={}; r.genres.forEach(g=>m[g.id]=g.name); setGenres(m); }).catch(()=>{}); },[]);
  useEffect(()=>{ tmdb.discover({genreId:genre}).then(r=>setMovies(r.results||[])).catch(()=>{}); },[genre]);
  return (
    <div className="min-h-screen pt-[64px]">
      <Navbar genres={genres} />
      <div className="px-4 md:px-10 py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Browse by Genre</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={()=>setGenre('')} className={`px-4 py-2 rounded-full text-sm ${!genre?'bg-white text-black':'glass'}`}>All</button>
          {Object.entries(genres).map(([id,name])=>(
            <button key={id} onClick={()=>setGenre(id)} className={`px-4 py-2 rounded-full text-sm ${genre===id?'bg-white text-black':'glass'}`}>{name}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map(m=>(
            <Link key={m.id} href={`/movie/${m.id}`} className="movie-card rounded-xl overflow-hidden bg-zinc-900 block">
              <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : ''} alt={m.title} className="aspect-[2/3] object-cover" />
              <div className="p-2.5"><p className="text-[12px] font-semibold line-clamp-2">{m.title}</p></div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
