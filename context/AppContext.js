
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getList, saveList, getFavs, saveFavs, getProgress, saveProgress } from '../lib/storage';
const Ctx=createContext(null);
export function AppProvider({children}){
  const [list,setList]=useState([]);
  const [favs,setFavs]=useState([]);
  const [progress,setProgress]=useState({});
  useEffect(()=>{
    setList(getList());
    setFavs(getFavs());
    setProgress(getProgress());
  },[]);
  const isSaved=(id)=>list.some(m=>m.id===id);
  const isFav=(id)=>favs.some(m=>m.id===id);
  const toggleList=(m)=>{
    const exists=list.some(x=>x.id===m.id);
    const next=exists?list.filter(x=>x.id!==m.id):[{id:m.id,title:m.title,poster_path:m.poster_path,vote_average:m.vote_average,release_date:m.release_date,backdrop_path:m.backdrop_path},...list];
    setList(next); saveList(next); return !exists;
  };
  const toggleFav=(m)=>{
    const exists=favs.some(x=>x.id===m.id);
    const next=exists?favs.filter(x=>x.id!==m.id):[...favs,m];
    setFavs(next); saveFavs(next); return !exists;
  };
  const updateProgress=(id,pct,meta)=>{
    saveProgress(id,pct,meta);
    setProgress(getProgress());
  };
  return <Ctx.Provider value={{list,favs,progress,isSaved,isFav,toggleList,toggleFav,updateProgress}}>{children}</Ctx.Provider>;
}
export const useApp=()=>useContext(Ctx);
