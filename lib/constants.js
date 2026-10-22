
export const IMG = {
  poster: 'https://image.tmdb.org/t/p/w500',
  backdrop: 'https://image.tmdb.org/t/p/original',
  profile: 'https://image.tmdb.org/t/p/w185',
  placeholder: 'https://via.placeholder.com/500x750/12121a/71717a?text=No+Image',
  backdropPlaceholder: 'https://via.placeholder.com/1280x720/0a0a0f/71717a?text=PhantomBox'
};
export const GENRES = { 28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV Movie',53:'Thriller',10752:'War',37:'Western' };
export const STREAM_PROVIDERS = [
  { id:'vidsrc-cc', name:'VidSrc CC (Fast)', build:(id)=>`https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=0` },
  { id:'vidsrc-xyz', name:'VidSrc XYZ', build:(id)=>`https://vidsrc.xyz/embed/movie/${id}` },
  { id:'embed-su', name:'Embed SU', build:(id)=>`https://embed.su/embed/movie/${id}` },
  { id:'autoembed', name:'AutoEmbed', build:(id)=>`https://autoembed.co/movie/tmdb/${id}` },
  { id:'vidsrc-me', name:'VidSrc ME', build:(id)=>`https://vidsrc.me/embed/movie?tmdb=${id}` },
];
