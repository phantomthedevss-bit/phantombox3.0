export default function Footer() {
  return (
    <footer className="px-4 md:px-10 py-10 text-zinc-500 text-[12px] border-t border-white/[0.06] mt-6">
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <p><span className="font-display font-semibold text-white">PHANTOMBOX 2.0</span> — rebuilt as a real multi-file app. Not affiliated with Netflix. Demo only.</p>
        <p>Data by <a href="https://www.themoviedb.org/" target="_blank" className="underline hover:text-zinc-300">TMDB</a></p>
      </div>
    </footer>
  );
}
