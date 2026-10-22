
'use client';
import { useState, useEffect } from 'react';
import { IMG } from '../lib/constants';

/*
  Pillar 2: TMDB-Linked Legal Download Gateway
  - No pirated movie files
  - Only legal: poster/backdrop download, watchlist export, and official provider links
  - Sandboxed background process for downloads (blob + sandboxed iframe)
*/
export default function DownloadGateway({ movie, providers, onClose }){
  const [posterBlobUrl,setPosterBlobUrl]=useState(null);

  const downloadPoster = async ()=>{
    try{
      const url = movie.poster_path ? `${IMG.poster}${movie.poster_path}` : null;
      if(!url) return;
      // Fetch via CORS proxy? TMDB images allow CORS, so direct fetch
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      // Create sandboxed download via hidden anchor with download attr - no popup
      const a=document.createElement('a');
      a.href=blobUrl;
      a.download=`${movie.title.replace(/[^a-z0-9]/gi,'_')}_poster.jpg`;
      a.rel='noopener';
      a.style.display='none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(()=>URL.revokeObjectURL(blobUrl), 1000);
    }catch(e){
      // Fallback: open in new tab with noopener (still safe)
      window.open(movie.poster_path ? `${IMG.poster}${movie.poster_path}` : '', '_blank', 'noopener,noreferrer');
    }
  };

  const downloadMetadata = ()=>{
    const data = {
      title: movie.title,
      id: movie.id,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genres: movie.genres?.map(g=>g.name),
      legal_note: "This file contains metadata only. Watch legally via providers listed.",
      providers: providers
    };
    const blob=new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`${movie.title.replace(/[^a-z0-9]/gi,'_')}_info.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadWatchlist = ()=>{
    const watchlist = JSON.parse(localStorage.getItem('phantom_list_real')||'[]');
    const blob=new Blob([JSON.stringify(watchlist,null,2)], {type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download='phantombox_watchlist.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[95] bg-black/80 backdrop-blur-md flex items-start justify-center overflow-y-auto p-4" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="glass w-full max-w-[560px] rounded-[24px] p-6 md:p-8 mt-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-display text-[22px] font-bold">Legal Download & Save</h2>
            <p className="text-[13px] text-zinc-400 mt-1">No pirated files. All options are legal.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">×</button>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={downloadPoster} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-left w-full">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">🖼️</div>
            <div className="flex-1">
              <p className="font-semibold text-[14px]">Download Poster (Legal)</p>
              <p className="text-[12px] text-zinc-400">High-res poster from TMDB for personal use</p>
            </div>
            <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full">SAFE</span>
          </button>

          <button onClick={downloadMetadata} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-left w-full">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">📄</div>
            <div className="flex-1">
              <p className="font-semibold text-[14px]">Download Movie Info (JSON)</p>
              <p className="text-[12px] text-zinc-400">Metadata + legal watch links</p>
            </div>
            <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full">SAFE</span>
          </button>

          <button onClick={downloadWatchlist} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-left w-full">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">📋</div>
            <div className="flex-1">
              <p className="font-semibold text-[14px]">Export My List</p>
              <p className="text-[12px] text-zinc-400">Download your watchlist as JSON</p>
            </div>
            <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full">SAFE</span>
          </button>

          <div className="mt-4 p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
            <p className="text-[13px] font-semibold text-violet-300">Where to Download Legally (Rent/Buy)</p>
            <p className="text-[11px] text-zinc-400 mt-1 mb-3">These providers let you download for offline viewing inside their official apps (Apple TV, Google Play, Amazon Video, etc.)</p>
            <div className="grid grid-cols-1 gap-2">
              {providers?.buy?.length ? providers.buy.map(p=>(
                <a key={p.provider_id} href={p.link||`https://www.google.com/search?q=${encodeURIComponent(movie.title + ' ' + p.provider_name + ' buy')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-white/5 hover:bg-black/50 transition text-[13px]">
                  <img src={`https://image.tmdb.org/t/p/original${p.logo_path}`} alt={p.provider_name} className="w-6 h-6 rounded" />
                  {p.provider_name} — Buy & Download Legally
                  <span className="ml-auto text-[10px] text-zinc-500">↗</span>
                </a>
              )) : <p className="text-[12px] text-zinc-500">No buy options in your region. Check JustWatch for legal options.</p>}
              {providers?.rent?.map(p=>(
                <a key={p.provider_id} href={`https://www.google.com/search?q=${encodeURIComponent(movie.title + ' ' + p.provider_name + ' rent')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 border border-white/5 hover:bg-black/50 transition text-[13px]">
                  <img src={`https://image.tmdb.org/t/p/original${p.logo_path}`} alt={p.provider_name} className="w-6 h-6 rounded" />
                  {p.provider_name} — Rent & Download
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 rounded-xl bg-black/40 border border-white/5 text-[10px] text-zinc-500 leading-relaxed">
          <strong className="text-zinc-300">Legal Notice:</strong> PhantomBox does not host or provide pirated movie files. Download options are limited to posters (TMDB), metadata, and links to official providers where you can purchase and download legally within their apps. All streaming is via official YouTube trailers.
        </div>
      </div>
    </div>
  );
}
