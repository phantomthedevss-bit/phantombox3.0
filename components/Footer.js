
export default function Footer(){
  return (
    <footer className="mt-12 border-t border-white/[0.06] px-4 md:px-10 py-10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div className="text-[12px] text-zinc-500 leading-relaxed">
          <p><span className="font-display font-bold text-white">Made by Phantom</span> • PhantomBox Real • iOS 27 Glassmorphic • Secure Player • Legal Only</p>
          <p className="mt-2">Movie data from <a href="https://www.themoviedb.org/" target="_blank" className="underline hover:text-zinc-300">TMDB</a>. Uses TMDB API but not endorsed. All watch links go to official providers. No piracy embeds.</p>
          <p className="mt-2 text-[11px] text-emerald-400/80">Integrity: ✓ Sandboxed iframe (no popups, no top-nav) • window.open intercepted • CSP enforced • Legal download gateway</p>
        </div>
        <div className="flex gap-6 text-[12px] text-zinc-400">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/trending" className="hover:text-white">Trending</a>
          <a href="/browse" className="hover:text-white">Browse</a>
          <a href="https://vercel.com" target="_blank" className="hover:text-white">Deploy</a>
        </div>
      </div>
    </footer>
  );
}
