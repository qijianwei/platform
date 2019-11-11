function APIEnable (method?:string): boolean{
    if (typeof swan == 'undefined'){return false}
    if (method) return swan[method]
    return true
}
export default APIEnable