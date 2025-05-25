export const setCookie = (payload:{id:string})=>{
  const days = 365
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `user=${JSON.stringify(payload)}; expires=${expires}; path=/`;
}