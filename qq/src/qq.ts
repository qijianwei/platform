import Utils from "./utils";
import NotificationCenter, { NotificationName } from "./NotificationCenter";

export default class Game {
    static launchOption: LaunchOption
    constructor() {
        this.initGame()
    }
    initGame() {
        new BK.Game({
            onLoad(app, src, roomId) {
                /**318 319为一起玩游戏场景 */
                console.log('Game | onLoad')
                let extraData, query = {}
                if (src == 318 || src == 319) {
                    extraData = {
                        to: 10001,
                        p: { rname: roomId }
                    }
                }
                if (GameStatusInfo.gameParam) {
                    query = Utils.makeQueryObject(GameStatusInfo.gameParam)
                }
                Game.launchOption = {
                    query: query,
                    path: '',
                    scene: src,
                    referrerInfo: { extraData: extraData }
                }
            },
            onClose(app) {
                console.log('Game | onClose')
                NotificationCenter.event(NotificationName.EXIT, {})
            },
            onEnterForeground(app) {
                console.log('Game | onEnterForeground')
                if (GameStatusInfo.src == 318 || GameStatusInfo.src == 319) { return }
                let query = {}
                if (GameStatusInfo.gameParam) {
                    query = Utils.makeQueryObject(GameStatusInfo.gameParam)
                }
                let launchOption = {
                    query: query,
                    path: '',
                    scene: GameStatusInfo.src,
                    referrerInfo: { extraData: {} }
                }
                NotificationCenter.event(NotificationName.SHOW, launchOption)
            },
            onEnterBackground(app) {
                console.log('Game | onEnterBackground')
                GameStatusInfo.gameParam = ''
                if (GameStatusInfo.src == 318 || GameStatusInfo.src == 319) { return }
                let p = {
                    mode: 'hide',
                    targetAction: 1
                }
                NotificationCenter.event(NotificationName.HIDE, null)
            },
            onShare(app) {
                console.log('Game | onShare')
                let listeners = NotificationCenter.defaultCenter.listener[NotificationName.SHARE] || []
                if (listeners.length < 0) return {}
                let listener = listeners[listeners.length - 1], params = listener()
                let info = {
                    summary: params.summary || '',
                    picUrl: params.imageUrl,
                    localPicPath: params.imagePath || 'GameRes://share.png',
                    extendInfo: params.query
                }
                return info
            },
            onShareComplete(app, retCode: number, shareDest: number, isFirstShare) {
                console.log('Game | onShareComplete')
                let listeners = NotificationCenter.defaultCenter.listener[NotificationName.SHARE] || []
                if (listeners.length < 0) return {}
                let listener = listeners[listeners.length - 1], params = listener()
                params.success&&params.success({
                    ret:retCode,
                    isFirstShare:isFirstShare,
                    shareTo:shareDest
                })
            },
            onMinmize(app) {
                console.log('Game | onMinmize')
                NotificationCenter.event(NotificationName.MIN, {})
            },
            onMaximize(app) {
                console.log('Game | onMaximize')
                NotificationCenter.event(NotificationName.MAX, {})
            },
            onNetworkChange(app, state) {
                console.log('Game | onNetworkChange')
                let isConnected = true, networkType = 'wifi'
                switch (state) {
                    case 1: //无网络到移动网络
                        networkType = '4g'
                        break
                    case 2: //无网络到WiFi网络
                        networkType = 'wifi'
                        break
                    case 3: //移动网络到WiFi网络
                        break
                    case 4: //移动网络到无网络
                        isConnected = false
                        networkType = 'none'
                        break
                    case 5: //WiFi到无网络
                        isConnected = false
                        networkType = 'none'
                        break
                    case 6: //WiFi到移动网络
                        networkType = '4g'
                        break
                }
                let p = {
                    isConnected: isConnected,
                    networkType: networkType //wifi 2g 3g 4g unknown none
                }
                console.log(JSON.stringify(p))
                NotificationCenter.event(NotificationName.NETWORK_CHANGE, p)
            },
            onException(app) {
                console.log(`Game | onException | ${app.errorMessage()}`)
                console.log(app.errorStacktrace())
            }
        })
    }
}