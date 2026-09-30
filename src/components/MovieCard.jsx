import { IMG } from '../lib/constants';

export default function MovieCard({ movie, onClick }) {
  const poster = movie.poster_path ? `${IMG.poster}${movie.poster_path}` : IMG.placeholder;
  return (
    <div onClick={() => onClick(movie)} className="movie-card group relative w-[148px] sm:w-[168px] md:w-[184px] shrink-0 cursor-pointer rounded-xl overflow-hidden bg-zinc-900">
      <img src={poster} alt={movie.title} loading="lazy" className="w-full aspect-[2/3] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 inset-x-0 p-2.5 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
        <p className="text-[12px] font-semibold line-clamp-2 leading-tight">{movie.title}</p>
        <p className="text-[11px] text-zinc-300 mt-1 flex items-center gap-1">
          <span className="text-green-400 font-bold">{movie.vote_average?.toFixed(1)}</span> • {movie.release_date?.slice(0,4)}
        </p>
      </div>
      <div className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded-full bg-black/70 border border-white/10 font-medium opacity-0 group-hover:opacity-100 transition">HD</div>
    </div>
  );
}
