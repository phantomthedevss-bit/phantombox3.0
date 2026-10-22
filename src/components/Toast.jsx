import { useEffect, useState } from 'react';
let setToastGlobal = null;
export function showToast(msg) { if (setToastGlobal) setToastGlobal(msg); }
export default function Toast() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    setToastGlobal = (m) => { setMsg(m); setTimeout(()=>setMsg(''), 3000); };
    return () => { setToastGlobal = null; };
  }, []);
  if (!msg) return null;
  return <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] glass rounded-full px-5 py-2.5 text-sm font-medium shadow-2xl pointer-events-none">{msg}</div>;
}
