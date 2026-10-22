
'use client';
import { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { STREAM_PROVIDERS } from '../lib/constants';

export default function SecurePlayer({ mode, youtubeKey, tmdbId, movieMeta, onClose }){
  const wrapperRef=useRef(null);
  const { updateProgress } = useApp();
  const [blockedCount,setBlockedCount]=useState(0);
  const [providerIndex,setProviderIndex]=useState(0);
  const [src,setSrc]=useState('');

  // Build source based on mode
  useEffect(()=>{
    if(mode==='trailer' && youtubeKey){
      setSrc(`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0&modestbranding=1`);
    } else if(mode==='movie' && tmdbId){
      const provider = STREAM_PROVIDERS[providerIndex] || STREAM_PROVIDERS[0];
      setSrc(provider.build(tmdbId));
    } else {
      setSrc('');
    }
  },[mode, youtubeKey, tmdbId, providerIndex]);

  // Anti-hijack interceptor - BLOCK ADS/POPUPS
  useEffect(()=>{
    if(mode==='none') return;
    const originalOpen = window.open;
    window.open = function(...args){
      setBlockedCount(c=>c+1);
      console.warn('[PhantomBox Security] Blocked popup:', args);
      return null;
    };

    const observer = new MutationObserver((mutations)=>{
      mutations.forEach(m=>{
        m.addedNodes.forEach(node=>{
          if(node.nodeType===1){
            const el=node;
            try{
              const style=window.getComputedStyle(el);
              if(style.position==='fixed' && parseInt(style.zIndex)>999){
                el.remove();
                setBlockedCount(c=>c+1);
              }
            }catch{}
            if(el.tagName==='A' && el.target==='_blank'){
              el.removeAttribute('target');
              el.removeAttribute('href');
            }
          }
        });
      });
    });
    if(wrapperRef.current) observer.observe(wrapperRef.current, { childList:true, subtree:true });

    const handleClick = (e)=>{
      const target=e.target;
      if(target.closest('iframe')) return;
      if(wrapperRef.current && wrapperRef.current.contains(target)){
        const anchor=target.closest('a');
        if(anchor && anchor.target==='_blank'){
          e.preventDefault();
          e.stopPropagation();
          setBlockedCount(c=>c+1);
        }
      }
    };
    document.addEventListener('click', handleClick, true);

    return ()=>{
      window.open = originalOpen;
      observer.disconnect();
      document.removeEventListener('click', handleClick, true);
    };
  },[mode]);

  // Progress tracking
  useEffect(()=>{
    if((mode!=='trailer' && mode!=='movie') || !tmdbId) return;
    let pct=0;
    const iv=setInterval(()=>{
      pct=Math.min(90, pct+Math.random()*5);
      updateProgress(tmdbId, pct, movieMeta);
    }, 8000);
    return()=>clearInterval(iv);
  },[mode, tmdbId]);

  if(mode==='none') return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-6" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-6xl bg-black rounded-none md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-white/10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold">{mode==='movie' ? '🎬 Secure Movie Player' : '🔒 Secure Trailer Player'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">ads blocked: sandbox no popups</span>
            {blockedCount>0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300">{blockedCount} popups blocked</span>}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center">×</button>
        </div>

        {mode==='movie' && (
          <div className="px-4 py-2 bg-violet-500/10 border-b border-white/5 flex gap-2 items-center overflow-x-auto">
            <span className="text-[11px] text-zinc-400 shrink-0">Server:</span>
            {STREAM_PROVIDERS.map((p,i)=>(
              <button key={p.id} onClick={()=>setProviderIndex(i)} className={`text-[11px] px-3 py-1 rounded-full border transition ${i===providerIndex ? 'bg-white text-black border-white' : 'bg-white/10 text-zinc-300 border-white/10 hover:bg-white/20'}`}>{p.name}</button>
            ))}
            <span className="text-[10px] text-zinc-500 ml-auto">If one fails, try another</span>
          </div>
        )}

        <div ref={wrapperRef} className="relative w-full aspect-video bg-black shrink-0">
          <iframe
            key={src}
            src={src}
            title={mode==='movie' ? 'Movie Player' : 'Trailer'}
            sandbox="allow-scripts allow-same-origin allow-forms"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        <div className="px-4 py-2 text-[11px] text-zinc-500 bg-zinc-900/50 flex justify-between items-center">
          <span>{mode==='movie' ? 'Movie stream via third-party embed. Ads/popups are blocked by sandbox.' : 'Trailer from YouTube (official).'} </span>
          <button onClick={()=>{ if(tmdbId) updateProgress(tmdbId, 100, movieMeta); onClose(); }} className="text-emerald-400 hover:text-emerald-300">Close ✓</button>
        </div>
      </div>
    </div>
  );
}
