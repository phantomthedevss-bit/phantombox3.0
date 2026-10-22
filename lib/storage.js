
const LIST_KEY='phantom_list_real';
const FAV_KEY='phantom_fav_real';
const HIST_KEY='phantom_hist_real';
const PROG_KEY='phantom_prog_real';
export function getList(){ try{ return JSON.parse(localStorage.getItem(LIST_KEY))||[] }catch{ return [] } }
export function saveList(l){ localStorage.setItem(LIST_KEY, JSON.stringify(l)); }
export function getFavs(){ try{ return JSON.parse(localStorage.getItem(FAV_KEY))||[] }catch{ return [] } }
export function saveFavs(l){ localStorage.setItem(FAV_KEY, JSON.stringify(l)); }
export function getHistory(){ try{ return JSON.parse(localStorage.getItem(HIST_KEY))||[] }catch{ return [] } }
export function saveHistory(l){ localStorage.setItem(HIST_KEY, JSON.stringify(l.slice(0,100))); }
export function addHistory(m){
  const h=getHistory().filter(x=>x.id!==m.id);
  h.unshift({...m, watchedAt:Date.now()});
  saveHistory(h);
}
export function getProgress(){ try{ return JSON.parse(localStorage.getItem(PROG_KEY))||{} }catch{ return {} } }
export function saveProgress(id, pct, meta){
  const map=getProgress();
  if(pct>=95) delete map[id]; else map[id]={pct, at:Date.now(), meta};
  localStorage.setItem(PROG_KEY, JSON.stringify(map));
  if(meta) addHistory(meta);
}
