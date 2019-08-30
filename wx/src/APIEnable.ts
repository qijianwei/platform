function APIEnable (method?:string): boolean{
    if (typeof wx == 'undefined'){return false}
    if (method) return wx[method]
    return true
}
export default APIEnable