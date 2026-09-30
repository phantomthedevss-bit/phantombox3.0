import MovieCard from './MovieCard';
export default function SearchResults({ query, results, onMovieClick, loading }) {
  return (
    <section className="px-4 md:px-10 py-8">
      <h2 className="text-xl md:text-2xl font-display font-semibold mb-5">Search results for <span className="text-violet-400">\u201c{query}\u201d</span></h2>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({length:12}).map((_,i)=><div key={i} className="aspect-[2/3] skeleton rounded-xl" />)}
        </div>
      ) : results.length === 0 ? (
        <div className="py-20 text-center text-zinc-400">No matches found. Try a different title.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {results.map(m => (<div key={m.id} className="w-full"><MovieCard movie={m} onClick={onMovieClick} /></div>))}
        </div>
      )}
    </section>
  );
}
