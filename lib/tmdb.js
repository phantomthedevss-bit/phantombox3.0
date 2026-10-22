
const BASE = 'https://api.themoviedb.org/3';
function getKey(){
  const k = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if(!k) throw new Error('Missing NEXT_PUBLIC_TMDB_API_KEY');
  return k;
}
function url(path, params={}){
  const u=new URL(BASE+path);
  u.searchParams.set('api_key', getKey());
  u.searchParams.set('language','en-US');
  Object.entries(params).forEach(([k,v])=>{ if(v!==undefined && v!==null && v!=='') u.searchParams.set(k, String(v)); });
  return u.toString();
}
async function tmdbFetch(path, params={}, revalidate=3600){
  const res=await fetch(url(path, params), { next: { revalidate } });
  if(res.status===401) throw new Error('Invalid TMDB API key');
  if(!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}
export const tmdb={
  genres:()=>tmdbFetch('/genre/movie/list'),
  movies:(path,params)=>tmdbFetch(path,params),
  movieDetails:(id)=>tmdbFetch(`/movie/${id}`,{append_to_response:'videos,credits,similar,watch/providers'}),
  search:(q,page=1)=>tmdbFetch('/search/movie',{query:q,page,include_adult:false}),
  discover:(opts={})=>{
    const p={ page: opts.page||1, sort_by: opts.sort||'popularity.desc' };
    if(opts.genreId) p.with_genres=opts.genreId;
    if(opts.year) p.primary_release_year=opts.year;
    if(opts.rating) p['vote_average.gte']=opts.rating;
    return tmdbFetch('/discover/movie', p);
  },
  trending:()=>tmdbFetch('/trending/movie/week'),
  topRated:()=>tmdbFetch('/movie/top_rated'),
  upcoming:()=>tmdbFetch('/movie/upcoming'),
  nowPlaying:()=>tmdbFetch('/movie/now_playing'),
  popular:()=>tmdbFetch('/movie/popular'),
};
