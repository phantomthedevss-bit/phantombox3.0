
'use client';
import { useState, useEffect } from 'react';
export function useDebounce(v,d=400){ const [s,setS]=useState(v); useEffect(()=>{ const t=setTimeout(()=>setS(v),d); return()=>clearTimeout(t); },[v,d]); return s; }
