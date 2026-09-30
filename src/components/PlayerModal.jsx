import { useState } from 'react';
import { STREAM_PROVIDERS } from '../lib/constants';
export default function PlayerModal({ mode, tmdbId, youtubeKey, onClose }) {
  const [providerIdx, setProviderIdx] = useState(0);
  if (mode === 'none') return null;
  const src = mode === 'youtube' ? `https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0` : STREAM_PROVIDERS[providerIdx].build(tmdbId);
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-6" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-6xl bg-black rounded-none md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-white/10">
          <div className="flex items-center gap-2">
            {mode === 'stream' && STREAM_PROVIDERS.map((p,i)=>(
              <button key={p.name} onClick={()=>setProviderIdx(i)} className={`text-xs px-3 py-1.5 rounded-full border transition ${i===providerIdx?'bg-violet-600 border-violet-500 text-white':'border-zinc-700 text-zinc-300 hover:border-zinc-500'}`}>{p.name}</button>
            ))}
            {mode === 'youtube' && <span className="text-xs text-zinc-400">YouTube \u2022 Trailer</span>}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition">\u00d7</button>
        </div>
        <div className="relative w-full aspect-video bg-black">
          <iframe src={src} title="Player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full border-0" />
        </div>
      </div>
    </div>
  );
}
