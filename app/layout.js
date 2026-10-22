
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata = {
  title: 'PhantomBox — Real Streaming Directory Structure',
  description: 'Legal TMDB discovery with real routes: /trending, /top-rated, /movie/[id], /genre/[id], /browse, /mylist. iOS 27 glassmorphic, secure sandboxed player, legal download gateway. Made by Phantom.',
  metadataBase: new URL('https://phantombox.vercel.app'),
  openGraph: { title: 'PhantomBox Real', description: 'Real directory structure like Netflix — legal only' }
};

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://image.tmdb.org https://via.placeholder.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self' https://api.themoviedb.org https://image.tmdb.org; base-uri 'self'; form-action 'self';" />
      </head>
      <body className="bg-[#050507]">
        <div className="mesh-bg"><div className="mesh-orb orb-1"/><div className="mesh-orb orb-2"/><div className="mesh-orb orb-3"/></div>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
