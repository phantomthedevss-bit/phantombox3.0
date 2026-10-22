
export const IMG = {
  poster: 'https://image.tmdb.org/t/p/w500',
  backdrop: 'https://image.tmdb.org/t/p/original',
  profile: 'https://image.tmdb.org/t/p/w185',
  placeholder: 'https://via.placeholder.com/500x750/12121a/71717a?text=No+Image',
  backdropPlaceholder: 'https://via.placeholder.com/1280x720/0a0a0f/71717a?text=PhantomBox'
};
export const GENRES = { 28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV Movie',53:'Thriller',10752:'War',37:'Western' };
export const STREAM_PROVIDERS = [
  { id:'vidsrc', name:'VidSrc', build:(id)=>`https://vidsrc.to/embed/movie/${id}` },
  { id:'super', name:'SuperEmbed', build:(id)=>`https://multiembed.mov/?video_id=${id}&tmdb=1` },
];
