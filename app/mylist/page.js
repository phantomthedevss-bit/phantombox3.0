
'use client';
import { useEffect, useState } from 'react';
import { getList } from '../../lib/storage';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function MyList(){
  const [list,setList]=useState([]);
  useEffect(()=>{ setList(getList()); },[]);
  return (
    <div className="min-h-screen pt-[64px]">
      <Navbar />
      <div className="px-4 md:px-10 py-8">
        <h1 className="font-display text-3xl font-bold mb-6">My List — {list.length} titles</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {list.map(m=>(
            <Link key={m.id} href={`/movie/${m.id}`} className="rounded-xl overflow-hidden bg-zinc-900 block">
              <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : ''} alt={m.title} className="aspect-[2/3] object-cover" />
            </Link>
          ))}
        </div>
        {list.length===0 && <p className="text-zinc-500">No titles yet. Add from movie pages.</p>}
      </div>
      <Footer />
    </div>
  );
}
