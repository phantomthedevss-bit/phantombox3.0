import { useEffect, useState, useCallback } from 'react';
import { tmdb } from './lib/tmdb';
import { ROWS } from './lib/constants';
import { useAuth } from './context/AuthContext';
import { useList } from './context/ListContext';
import { useDebounce } from './hooks/useDebounce';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import SearchResults from './components/SearchResults';
import MovieModal from './components/MovieModal';
import PlayerModal from './components/PlayerModal';
import AuthScreen from './components/AuthScreen';
import Footer from './components/Footer';
import Toast, { showToast } from './components/Toast';
import MovieCard from './components/MovieCard';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const { list } = useList();

  const [genres, setGenres] = useState({});
  const [rows, setRows] = useState({});
  const [loadingRows, setLoadingRows] = useState(true);
  const [heroMovie, setHeroMovie] = useState(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreResults, setGenreResults] = useState([]);
  const [genreLoading, setGenreLoading] = useState(false);

  const [modalId, setModalId] = useState(null);
  const [player, setPlayer] = useState({ mode: 'none', tmdbId: null, youtubeKey: null });

  const hasApiKey = !!import.meta.env.VITE_TMDB_API_KEY;

  // Load genres
  useEffect(() => {
    if (!hasApiKey || !user) return;
    tmdb.genres().then(r => {
      const map = {};
      r.genres.forEach(g => map[g.id] = g.name);
      setGenres(map);
    }).catch(() => {});
  }, [hasApiKey, user]);

  // Load rows
  useEffect(() => {
    if (!hasApiKey || !user) return;
    async function load() {
      setLoadingRows(true);
      try {
        const results = await Promise.all(ROWS.map(row => tmdb.movies(row.path).catch(() => ({ results: [] }))));
        const next = {};
        ROWS.forEach((row, i) => next[row.id] = results[i].results || []);
        setRows(next);
        // pick hero from trending or popular
        const heroPool = next.trending?.length ? next.trending : next.popular;
        if (heroPool?.length) setHeroMovie(heroPool[Math.floor(Math.random()*Math.min(5, heroPool.length))]);
      } catch (e) {
        showToast('Failed to load movies');
      } finally { setLoadingRows(false); }
    }
    load();
  }, [hasApiKey, user]);

  // Search effect
  useEffect(() => {
    if (!debouncedSearch || selectedGenre) return;
    if (!hasApiKey) return;
    if (debouncedSearch.length < 2) { setSearchResults([]); return; }
    setSearchLoading(true);
    tmdb.search(debouncedSearch).then(r => setSearchResults(r.results || [])).catch(()=>setSearchResults([])).finally(()=>setSearchLoading(false));
  }, [debouncedSearch, selectedGenre, hasApiKey]);

  // Genre filter effect
  useEffect(() => {
    if (!selectedGenre) { setGenreResults([]); return; }
    setGenreLoading(true);
    tmdb.discover(selectedGenre).then(r => setGenreResults(r.results || [])).catch(()=>setGenreResults([])).finally(()=>setGenreLoading(false));
  }, [selectedGenre]);

  const openMovie = useCallback((movie) => setModalId(movie.id), []);
  const closeMovie = useCallback(() => setModalId(null), []);

  const handlePlayTrailerFromModal = (key) => {
    setPlayer({ mode: 'youtube', youtubeKey: key, tmdbId: null });
  };
  const handleWatchFromModal = (id) => {
    setPlayer({ mode: 'stream', tmdbId: id, youtubeKey: null });
  };
  const handleHeroPlay = async () => {
    if (!heroMovie) return;
    try {
      const details = await tmdb.movieDetails(heroMovie.id);
      const trailer = details.videos?.results?.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
      if (trailer) setPlayer({ mode: 'youtube', youtubeKey: trailer.key, tmdbId: null });
      else showToast('No trailer available');
    } catch { showToast('Trailer unavailable'); }
  };

  if (authLoading) return <div className="min-h-screen bg-[#070708] grid place-items-center text-zinc-500">Loading PhantomBox...</div>;
  if (!user) return <AuthScreen />;

  const isSearching = search.length >= 2 || !!selectedGenre;
  const displayGenreResults = !!selectedGenre;

  return (
    <div className="min-h-screen bg-[#070708] text-white antialiased">
      <Navbar
        searchValue={search}
        onSearch={setSearch}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {!hasApiKey && (
        <div className="pt-[64px] px-4 md:px-10">
          <div className="mt-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm">
            <p className="font-semibold text-red-400">Missing TMDB API key</p>
            <p className="text-zinc-300 mt-1">Create a .env file from .env.example and set VITE_TMDB_API_KEY. Get a key free at themoviedb.org.</p>
          </div>
        </div>
      )}

      {!isSearching ? (
        <>
          <Hero movie={heroMovie} genres={genres} onPlay={handleHeroPlay} onInfo={() => heroMovie && openMovie(heroMovie)} loading={loadingRows && !heroMovie} />

          {list.length > 0 && (
            <section id="mylist" className="relative z-10 -mt-8 md:-mt-16 mb-8">
              <div className="px-4 md:px-10 mb-3 flex items-center justify-between">
                <h2 className="font-display text-[18px] md:text-[20px] font-semibold">My List</h2>
                <span className="text-xs text-zinc-500">{list.length} titles</span>
              </div>
              <div className="row-scroll flex gap-2.5 md:gap-3 overflow-x-auto px-4 md:px-10 pb-3">
                {list.map(m => (
                  <MovieCard key={`mylist-${m.id}`} movie={m} onClick={openMovie} />
                ))}
              </div>
            </section>
          )}

          <div className="pb-16">
            {ROWS.map(row => (
              <MovieRow key={row.id} id={row.id} title={row.title} movies={rows[row.id] || []} onMovieClick={openMovie} loading={loadingRows} />
            ))}
          </div>
        </>
      ) : displayGenreResults ? (
        <div className="pt-[64px]">
          <SearchResults query={genres[selectedGenre] || 'Genre'} results={genreResults} onMovieClick={openMovie} loading={genreLoading} />
        </div>
      ) : (
        <div className="pt-[64px]">
          <SearchResults query={search} results={searchResults} onMovieClick={openMovie} loading={searchLoading} />
        </div>
      )}

      <Footer />

      {modalId && (
        <MovieModal
          movieId={modalId}
          onClose={closeMovie}
          onPlayTrailer={handlePlayTrailerFromModal}
          onWatch={handleWatchFromModal}
        />
      )}

      <PlayerModal
        mode={player.mode}
        tmdbId={player.tmdbId}
        youtubeKey={player.youtubeKey}
        onClose={() => setPlayer({ mode: 'none', tmdbId: null, youtubeKey: null })}
      />

      <Toast />
    </div>
  );
}
