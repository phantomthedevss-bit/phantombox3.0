
'use client';
import { useState } from 'react';
import Link from 'next/link';
import SecurePlayer from '../../../components/SecurePlayer';

export default function MovieClient({ movie, backdrop, poster, trailer }){
  const [playerMode,setPlayerMode]=useState('none');
  const movieMeta = { id: movie.id, title: movie.title, poster_path: movie.poster_path, backdrop_path: movie.backdrop_path, vote_average: movie.vote_average };

  return (
    <>
      <div className="relative min-h-[75vh] overflow-hidden">
        <img src={backdrop} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/70 to-[#050507]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-[#050507]/40 to-transparent" />
        <div className="absolute bottom-0 p-4 md:p-10 flex gap-6 items-end w-full max-w-7xl">
          <img src={poster} alt="" className="w-28 md:w-48 rounded-xl hidden md:block shadow-2xl border border-white/10" />
          <div className="flex-1 pb-2">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] text-emerald-300 mb-2">● v4.1 UNBLOCKED EDITION</div>
            <h1 className="font-display text-2xl md:text-5xl font-bold leading-tight">{movie.title}</h1>
            <div className="flex gap-3 text-sm text-zinc-300 mt-3 items-center flex-wrap"><span className="text-emerald-400 font-semibold">{movie.vote_average?.toFixed(1)} ★</span><span>{movie.release_date?.slice(0,4)}</span><span>{movie.runtime}m</span></div>
            
            {/* BIG PLAY BUTTONS - IMPOSSIBLE TO MISS */}
            <div className="flex gap-3 mt-5 flex-wrap">
              <button onClick={()=>setPlayerMode('movie')} className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-black text-[16px] hover:bg-zinc-200 transition shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse">
                ▶ PLAY MOVIE NOW
              </button>
              {trailer && (
                <button onClick={()=>setPlayerMode('trailer')} className="inline-flex items-center gap-2 bg-zinc-800 text-white px-6 py-4 rounded-full font-bold text-[14px] hover:bg-zinc-700 transition border border-white/20">▶ Trailer</button>
              )}
            </div>
            <p className="text-[11px] text-emerald-300 mt-2">If one server blocked, switch server inside player (top bar)</p>
          </div>
        </div>
      </div>

      {/* SECOND PLAY BUTTON BELOW HERO AS BACKUP */}
      <div className="px-4 md:px-10 py-6 bg-[#0a0a0f] border-y border-white/5 flex gap-3 flex-wrap items-center justify-between">
        <div className="flex gap-3">
          <button onClick={()=>setPlayerMode('movie')} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200">▶ Play Movie</button>
          {trailer && <button onClick={()=>setPlayerMode('trailer')} className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold border border-white/10">▶ Play Trailer</button>}
        </div>
        <span className="text-[11px] text-zinc-500">Secure player blocks popups • 5 servers available</span>
      </div>

      <SecurePlayer 
        mode={playerMode} 
        youtubeKey={trailer?.key} 
        tmdbId={movie.id} 
        movieMeta={movieMeta}
        onClose={()=>setPlayerMode('none')} 
      />
    </>
  );
}
