import { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, saveUsers, getSession, saveSession, clearSession } from '../lib/storage';
const AuthContext=createContext(null);
export function AuthProvider({ children }){
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{ const s=getSession(); if(s) setUser(s); setLoading(false); },[]);
  const signUp=({name,email,password})=>{
    const users=getUsers(); const key=email.toLowerCase();
    if(users[key]) throw new Error('Account already exists. Try signing in.');
    users[key]={name,password}; saveUsers(users);
    const u={email:key,name:name||key.split('@')[0]}; saveSession(u); setUser(u);
  };
  const signIn=({email,password})=>{
    const users=getUsers(); const key=email.toLowerCase(); const rec=users[key];
    if(!rec) throw new Error('No account found with that email.');
    if(rec.password!==password) throw new Error('Wrong password.');
    const u={email:key,name:rec.name}; saveSession(u); setUser(u);
  };
  const signInGuest=()=>{ const u={email:'guest',name:'Guest'}; saveSession(u); setUser(u); };
  const signOut=()=>{ clearSession(); setUser(null); };
  return <AuthContext.Provider value={{user,loading,signUp,signIn,signInGuest,signOut}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>{ const ctx=useContext(AuthContext); if(!ctx) throw new Error('useAuth outside provider'); return ctx; };
