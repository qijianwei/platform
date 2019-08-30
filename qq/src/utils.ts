export default class Utils {
    static makeQueryString(p: object) {
        let kvList = []
        for (let key in p) {
            kvList.push(`${key}=${p[key]}`)
        }
        return kvList.join('&')
    }
    static makeQueryObject(s: string) {
        let kvList = s.split('&'), p = {}
        for (let i = 0, length = kvList.length; i < length; i++) {
            let item = kvList[i].split('=')
            p[item[0]]=item[1]
        }
        return p
    }
}