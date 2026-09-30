export const IMG = {
  poster: 'https://image.tmdb.org/t/p/w500',
  backdrop: 'https://image.tmdb.org/t/p/original',
  profile: 'https://image.tmdb.org/t/p/w185',
  placeholder: 'https://via.placeholder.com/500x750/18181b/a1a1aa?text=No+Image',
  backdropPlaceholder: 'https://via.placeholder.com/1280x720/101012/71717a?text=PhantomBox'
};
export const STREAM_PROVIDERS = [
  { name: 'VidSrc', build: (id) => `https://vidsrc.to/embed/movie/${id}` },
  { name: 'SuperEmbed', build: (id) => `https://multiembed.mov/?video_id=${id}&tmdb=1` },
  { name: '2Embed', build: (id) => `https://www.2embed.cc/embed/${id}` },
];
export const ROWS = [
  { id: 'trending', title: 'Trending Now', path: '/trending/movie/week' },
  { id: 'popular', title: 'Popular on PhantomBox', path: '/movie/popular' },
  { id: 'top_rated', title: 'Top Rated', path: '/movie/top_rated' },
  { id: 'upcoming', title: 'Coming Soon', path: '/movie/upcoming' },
  { id: 'now_playing', title: 'Now Playing', path: '/movie/now_playing' },
];
