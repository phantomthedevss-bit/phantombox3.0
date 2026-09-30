const USERS_KEY='phantom_users';
const SESSION_KEY='phantom_session';
const LIST_PREFIX='phantom_list_';
export function getUsers(){ try{ return JSON.parse(localStorage.getItem(USERS_KEY))||{} }catch{ return {} } }
export function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
export function getSession(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); }catch{ return null } }
export function saveSession(s){ localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
export function clearSession(){ localStorage.removeItem(SESSION_KEY); }
export function listKey(email){ return LIST_PREFIX+email; }
export function getList(email){ try{ return JSON.parse(localStorage.getItem(listKey(email)))||[] }catch{ return [] } }
export function saveList(email,list){ localStorage.setItem(listKey(email), JSON.stringify(list)); }
