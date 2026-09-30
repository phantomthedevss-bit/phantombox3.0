import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getList, saveList } from '../lib/storage';
import { useAuth } from './AuthContext';
const ListContext=createContext(null);
export function ListProvider({ children }){
  const {user}=useAuth();
  const [list,setList]=useState([]);
  useEffect(()=>{ if(!user){ setList([]); return; } setList(getList(user.email)); },[user]);
  const isSaved=useCallback((id)=>list.some(m=>m.id===id),[list]);
  const toggle=useCallback((movie)=>{
    if(!user) return {added:false};
    const exists=list.some(m=>m.id===movie.id);
    let next; if(exists) next=list.filter(m=>m.id!==movie.id); else next=[{id:movie.id,title:movie.title,poster_path:movie.poster_path,vote_average:movie.vote_average,release_date:movie.release_date},...list];
    setList(next); saveList(user.email,next); return {added:!exists};
  },[list,user]);
  return <ListContext.Provider value={{list,isSaved,toggle}}>{children}</ListContext.Provider>;
}
export const useList=()=>{ const ctx=useContext(ListContext); if(!ctx) throw new Error('useList outside provider'); return ctx; };
