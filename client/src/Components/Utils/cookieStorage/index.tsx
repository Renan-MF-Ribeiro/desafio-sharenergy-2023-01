export function getCookie(key: string) {
  const decodedCookie = decodeURIComponent(document.cookie);
  return decodedCookie.replaceAll(`${key}=`, "");
}
export function setCookie(key: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const cookie = `${key}= ${value} ;expires= ${d.toUTCString()};path=/`;  document.cookie = cookie;
}
export function cleanCookie() {
  return (document.cookie = `user= ;expires= ;path=/`);
}
