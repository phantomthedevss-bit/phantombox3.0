const BASE = 'https://api.themoviedb.org/3';
function getKey(){ return import.meta.env.VITE_TMDB_API_KEY || ''; }
function url(path, params={}){
  const u=new URL(BASE+path);
  const key=getKey();
  if(!key) throw new Error('Missing VITE_TMDB_API_KEY');
  u.searchParams.set('api_key', key);
  u.searchParams.set('language','en-US');
  Object.entries(params).forEach(([k,v])=>{ if(v!==undefined && v!==null && v!=='') u.searchParams.set(k,v); });
  return u.toString();
}
export async function tmdbFetch(path, params={}){
  const res=await fetch(url(path, params));
  if(res.status===401) throw new Error('Invalid TMDB API key');
  if(!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}
export const tmdb={
  genres:()=>tmdbFetch('/genre/movie/list'),
  movies:(path,params)=>tmdbFetch(path,params),
  movieDetails:(id)=>tmdbFetch(`/movie/${id}`,{append_to_response:'videos,credits'}),
  search:(q,page=1)=>tmdbFetch('/search/movie',{query:q,page,include_adult:false}),
  discover:(genreId,page=1)=>tmdbFetch('/discover/movie',{with_genres:genreId,page,sort_by:'popularity.desc'}),
};
