import APIEnable from "./APIEnable"

export default class UpdateManager {
    updateManager
    constructor(){
        // if (!APIEnable('getUpdateManager')) return this
        // let update = wx.getUpdateManager()
        // this.updateManager = update
    }
    onCheckForUpdate(cb) {
        if (!this.updateManager)return
        this.updateManager.onCheckForUpdate(cb)
    }
    onUpdateReady(cb) {
        if (!this.updateManager)return
        this.updateManager.onUpdateReady(cb)
    }
    onUpdateFailed(cb) {
        if (!this.updateManager)return
        this.updateManager.onUpdateFailed(cb)
    }
    applyUpdate(){
        if (!this.updateManager)return
        this.updateManager.applyUpdate()
    }
}