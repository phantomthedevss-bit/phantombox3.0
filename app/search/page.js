
'use client';
import { useState, useEffect, Suspense } from 'react';
import { tmdb } from '../../lib/tmdb';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SearchInner(){
  const searchParams = useSearchParams();
  const q = searchParams.get('q')||'';
  const [query,setQuery]=useState(q);
  const [results,setResults]=useState([]);
  useEffect(()=>{
    if(!q) return;
    tmdb.search(q).then(r=>setResults(r.results||[])).catch(()=>{});
  },[q]);
  const handleSearch=(v)=>{
    setQuery(v);
    if(v.length>=2){
      tmdb.search(v).then(r=>setResults(r.results||[]));
      window.history.replaceState(null,'',`/search?q=${encodeURIComponent(v)}`);
    }
  };
  return (
    <>
      <Navbar searchValue={query} onSearch={handleSearch} />
      <div className="px-4 md:px-10 py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Search {q && `— “${q}”`}</h1>
        {results.length===0 && q && <p className="text-zinc-500">No results for "{q}"</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {results.map(m=>(
            <Link key={m.id} href={`/movie/${m.id}`} className="rounded-xl overflow-hidden bg-zinc-900 block hover:scale-105 transition">
              <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750'} alt={m.title} className="aspect-[2/3] object-cover" />
              <div className="p-2.5"><p className="text-[12px] font-semibold line-clamp-2">{m.title}</p><p className="text-[11px] text-zinc-400">{m.vote_average?.toFixed(1)}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default function SearchPage(){
  return (
    <div className="min-h-screen pt-[64px]">
      <Suspense fallback={<div className="px-10 py-8 text-zinc-500">Loading search...</div>}>
        <SearchInner />
      </Suspense>
      <Footer />
    </div>
  );
}
