import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
export default function AuthScreen() {
  const { signUp, signIn, signInGuest } = useAuth();
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const submit = (e) => {
    e.preventDefault(); setError('');
    try {
      if (mode === 'signup') { if (!email || !password) throw new Error('Fill all fields'); signUp({ name, email, password }); }
      else { signIn({ email, password }); }
    } catch (err) { setError(err.message); }
  };
  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[#070708]">
      <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_-20%,rgba(124,58,237,0.25),transparent),radial-gradient(60%_60%_at_80%_80%,rgba(236,72,153,0.18),transparent)]" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative px-6 md:px-10 py-5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-display font-bold">P</div>
        <span className="font-display font-bold text-xl tracking-tight">PHANTOMBOX</span>
      </div>
      <div className="relative flex-1 flex items-start md:items-center justify-center px-4 pb-10">
        <div className="w-full max-w-[420px] glass rounded-2xl p-7 md:p-9 shadow-2xl">
          <h1 className="font-display text-[26px] font-bold mb-1">{mode === 'signin' ? 'Welcome back' : 'Create account'}</h1>
          <p className="text-[13px] text-zinc-400 mb-6">Your profile stays in this browser only — no server, no tracking.</p>
          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full bg-zinc-900 border border-zinc-800 focus:border-violet-500/60 rounded-xl px-4 py-3 text-sm outline-none transition" />
            )}
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="w-full bg-zinc-900 border border-zinc-800 focus:border-violet-500/60 rounded-xl px-4 py-3 text-sm outline-none transition" />
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required minLength={4} className="w-full bg-zinc-900 border border-zinc-800 focus:border-violet-500/60 rounded-xl px-4 py-3 pr-16 text-sm outline-none transition" />
              <button type="button" onClick={()=>setShowPw(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white">{showPw ? 'Hide' : 'Show'}</button>
            </div>
            {error && <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-2.5">{error}</div>}
            <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-zinc-200 transition">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</button>
            <button type="button" onClick={signInGuest} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-full transition border border-white/10">Continue as Guest</button>
          </form>
          <p className="text-zinc-400 text-[13px] mt-6 text-center">
            {mode === 'signin' ? 'New to PhantomBox?' : 'Already have an account?'}{' '}
            <button onClick={()=>{ setMode(mode==='signin'?'signup':'signin'); setError(''); }} className="text-white font-semibold hover:underline">{mode==='signin'?'Sign up now':'Sign in'}</button>
          </p>
        </div>
      </div>
    </div>
  );
}
