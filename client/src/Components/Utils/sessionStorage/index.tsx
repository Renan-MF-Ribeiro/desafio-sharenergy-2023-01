export function getSession(key:string){
    return sessionStorage.getItem(key)
}
export function setSession(key:string,value:string){
    return sessionStorage.setItem(key,value)
}
export function cleanSession(){
    return sessionStorage.clear()
}
