const KEY = 'username';

export const loadUsername = () => localStorage.getItem(KEY) || '';
export const saveUsername = (u: string) => localStorage.setItem(KEY, u);
export const clearUsername = () => localStorage.removeItem(KEY);
export const getUsername = () => localStorage.getItem('username') || '';
export const setUsername = (u: string) => localStorage.setItem('username', u);
