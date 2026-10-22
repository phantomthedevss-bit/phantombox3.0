
'use client';
import { useEffect, useState } from 'react';
import { tmdb } from '../lib/tmdb';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import SecurePlayer from '../components/SecurePlayer';
import DownloadGateway from '../components/DownloadGateway';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';

export default function Home(){
  const [genres,setGenres]=useState({});
  const [rows,setRows]=useState({});
  const [hero,setHero]=useState(null);
  const [search,setSearch]=useState('');
  const [player,setPlayer]=useState({mode:'none'});
  const [downloadMovie,setDownloadMovie]=useState(null);
  const [allFlat,setAllFlat]=useState([]);
  const { progress } = useApp();

  useEffect(()=>{
    tmdb.genres().then(r=>{ const m={}; r.genres.forEach(g=>m[g.id]=g.name); setGenres(m); }).catch(()=>{});
  },[]);

  useEffect(()=>{
    async function load(){
      try{
        const [trending, popular, top, upcoming, now] = await Promise.all([
          tmdb.trending(), tmdb.popular(), tmdb.topRated(), tmdb.upcoming(), tmdb.nowPlaying()
        ]);
        setRows({ trending: trending.results, popular: popular.results, topRated: top.results, upcoming: upcoming.results, nowPlaying: now.results });
        setHero(trending.results[0]);
        setAllFlat([...trending.results, ...popular.results].filter((v,i,a)=>a.findIndex(x=>x.id===v.id)===i));
      }catch(e){ console.error(e); }
    }
    load();
  },[]);

  const handlePlay = async (movie)=>{
    const details = await tmdb.movieDetails(movie.id).catch(()=>null);
    const trailer = details?.videos?.results?.find(v=>v.site==='YouTube' && (v.type==='Trailer'||v.type==='Teaser'));
    if(trailer) setPlayer({mode:'trailer', youtubeKey:trailer.key, tmdbId:movie.id, movieMeta:movie});
  };

  const continueMovies = Object.entries(progress).filter(([_,v])=>v.pct>0 && v.pct<95).map(([id,v])=> v.meta || allFlat.find(m=>String(m.id)===id) || {id, title:`Movie ${id}`}).slice(0,12);

  return (
    <div className="min-h-screen">
      <Navbar searchValue={search} onSearch={setSearch} genres={genres} />
      <Hero movie={hero} onPlay={handlePlay} onInfo={(m)=>{ window.location.href=`/movie/${m.id}`; }} />

      {continueMovies.length>0 && (
        <section className="mb-8">
          <div className="px-4 md:px-10 mb-3 flex justify-between"><h2 className="font-display text-[18px] font-semibold">Continue Watching</h2><a href="/history" className="text-xs text-zinc-400">See all</a></div>
          <div className="row-scroll flex gap-3 overflow-x-auto px-4 md:px-10 pb-3">
            {continueMovies.map(m=>(
              <div key={m.id} className="movie-card w-[184px] shrink-0 rounded-xl overflow-hidden bg-zinc-900">
                <a href={`/movie/${m.id}`} className="block"><img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : ''} alt={m.title} className="aspect-[2/3] object-cover" /></a>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="pb-10">
        <MovieRow title="Trending Now" movies={rows.trending?.slice(0,12)} href="/trending" onMovieClick={handlePlay} />
        <MovieRow title="Popular on PhantomBox" movies={rows.popular?.slice(0,12)} href="/browse" onMovieClick={handlePlay} />
        <MovieRow title="Top Rated" movies={rows.topRated?.slice(0,12)} href="/top-rated" onMovieClick={handlePlay} />
        <MovieRow title="Now Playing" movies={rows.nowPlaying?.slice(0,12)} href="/now-playing" onMovieClick={handlePlay} />
        <MovieRow title="Upcoming" movies={rows.upcoming?.slice(0,12)} href="/upcoming" onMovieClick={handlePlay} />
      </div>

      <Footer />

      <SecurePlayer mode={player.mode} youtubeKey={player.youtubeKey} tmdbId={player.tmdbId} movieMeta={player.movieMeta} onClose={()=>setPlayer({mode:'none'})} />
      {downloadMovie && <DownloadGateway movie={downloadMovie.movie} providers={downloadMovie.providers} onClose={()=>setDownloadMovie(null)} />}
    </div>
  );
}
