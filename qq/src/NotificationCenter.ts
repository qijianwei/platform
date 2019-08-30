export default class NotificationCenter {
    static defaultCenter = new NotificationCenter()
    listener = {}
    on(name: string, listener: Function) {
        let listeners = this.listener[name] || []
        listeners.push(listener)
        this.listener[name] = listeners
    }
    off(name: string, listener: Function) {
        let listeners = this.listener[name] || []
        if (listeners.indexOf(listener) > -1) {
            listeners.splice(listeners.indexOf(listener), 1)
        }
    }
    offAll(name: string) {
        delete this.listener[name]
    }
    event(name: string, data: any) {
        let listeners = this.listener[name] || []
        listeners.forEach(listener => {
            listener(data)
        });
    }
    static on(name: string, listener: Function) {
        this.defaultCenter.on(name, listener)
    }
    static off(name: string, listener: Function) {
        this.defaultCenter.off(name, listener)
    }
    static offAll(name: string) {
        this.defaultCenter.offAll(name)
    }
    static event(name: string, data: any) {
        this.defaultCenter.event(name, data)
    }
}
export class NotificationName {
    static SHOW = 'on-show'
    static HIDE = 'on-hide'
    static NETWORK_CHANGE = 'network-change'
    static EXIT = 'on-exit'
    static SHARE = 'on-share'
    static MIN = 'on-minimize'
    static MAX = 'on-maxmize'
}