import UpdateManager from "./updateManager"
import BannerAd from "./BannerAd"
import RewardedVideoAd from "./RewardedVideoAd"
import Game from "./qq"
import './localStorage'
import Utils from "./utils";
import NotificationCenter, { NotificationName } from "./NotificationCenter";
export default class Platform implements PlatformInterface {
    listener: any
    init() {
        this.setKeepScreenOn()
    }
    getLaunchOptionsSync() {
        return Game.launchOption
    }

    createShortCut(p) {
        BK.QQ.createShortCut(Utils.makeQueryString(p))
    }

    login(params, cb) {
        let _this = this
        this.getUserInfo({
            openId: GameStatusInfo.openId,
            success(res) {
                let userInfo = res.userInfo
                _this.getOpenKey(function (key) {
                    let data = {
                        name: userInfo.nickName,
                        sex: userInfo.gender,
                        icon_big: userInfo.avatarUrl,
                        openid: GameStatusInfo.openId,
                        key: key
                    }
                    cb({
                        account_type: 6,
                        type: 6,
                        platform: (GameStatusInfo.src == 318 || GameStatusInfo.src == 319) ? 6 : 7,
                        data: JSON.stringify(data)
                    })
                })
            }
        })
    }
    auth(params) {
        console.warn('QQ没有授权概念')
    }
    getOpenKey(cb) {
        BK.QQ.fetchOpenKey((errCode, cmd, data) => {
            if (errCode == 0) {
                cb(data.openKey)
            } else {
                console.error('获取openKey失败')
            }
        })
    }
    getUserInfo(params) {
        BK.MQQ.Account.getNick(params.openId, (id, nick) => {
            BK.MQQ.Account.getHeadEx(params.openId, (id, imgPath) => {
                let user = {
                    nickName: nick,
                    avatarUrl: imgPath,
                    gender: GameStatusInfo.sex
                }
                params.success && params.success({ userInfo: user })
            })
        })
    }
    getMyInfo(params) {
        params.openId = GameStatusInfo.openId
        this.getUserInfo(params)
    }
    isMiniGame(): boolean {
        return true
    }

    stopGame(res: GameResult) {
        console.log('向QQ服务器上报最后结果')
        console.log(JSON.stringify(res))
        BK.QQ.scoreUpload(res.result, function (errCode, cmd, data) {
            console.log(errCode, cmd, data)
        })
        let room = new BK.Room()
        // 1、赢家  0、输家  2、平局
        if (res.win == -1) {
            res.win = 0
        } else if (res.win == 0) {
            res.win = 2
        }
        room.showOneMorePage(res.win, [res.result[0].openId, res.result[1].openId])
    }

    /**生命周期 */
    onShow(cb) {
        /**@warn 这里可能需要针对第一次进行过滤 */
        NotificationCenter.on(NotificationName.SHOW, cb)
    }
    offShow(listener) {
        if (listener) {
            NotificationCenter.off(NotificationName.SHOW, listener)
        } else {
            NotificationCenter.offAll(NotificationName.SHOW)
        }
    }
    onHide(cb) {
        NotificationCenter.on(NotificationName.HIDE, cb)
    }
    offHide(listener) {
        if (listener) {
            NotificationCenter.off(NotificationName.HIDE, listener)
        } else {
            NotificationCenter.offAll(NotificationName.HIDE)
        }
    }
    onExit(listener) {
        NotificationCenter.on(NotificationName.EXIT, listener)
    }
    offExit(listener) {
        if (listener) {
            NotificationCenter.off(NotificationName.EXIT, listener)
        } else {
            NotificationCenter.offAll(NotificationName.EXIT)
        }
    }
    onMinimize(listener) {
        NotificationCenter.on(NotificationName.MIN, listener)
    }
    offMinimize(listener) {
        if (listener) {
            NotificationCenter.off(NotificationName.MIN, listener)
        } else {
            NotificationCenter.offAll(NotificationName.MIN)
        }
    }
    onMaximize(listener) {
        NotificationCenter.on(NotificationName.MAX, listener)
    }
    offMaximize(listener) {
        if (listener) {
            NotificationCenter.off(NotificationName.MAX, listener)
        } else {
            NotificationCenter.offAll(NotificationName.MAX)
        }
    }

    /**分享 */
    onShareAppMessage(listener) {
        NotificationCenter.on(NotificationName.SHARE, listener)
    }
    shareAppMessage(params: ShareInfo) {
        let info = {
            qqImgUrl: params.imageUrl,
            socialPicPath: params.imagePath || 'GameRes://share.png',
            title: params.title,
            summary: params.summary || params.title || '',
            extendInfo: params.query,
            success(res) {
                console.log(`QQ | SHARE | ${JSON.stringify(res)}`)
                res && params.success && params.success(res)
            },
            fail: params.fail
        }
        console.log(`SHARE | ${JSON.stringify(info)}`)
        BK.Share.share(info)
    }
    getShareInfo(params) {
        params.success && params.success({})
    }

    setKeepScreenOn(res = { isKeepOn: true }) {
        BK.Device.keepScreenOn({
            isKeepOn: res.isKeepOn
        })
    }
    getSystemInfoSync() {
        return null
    }
    getUpdateManager(): UpdateManager {
        return new UpdateManager()
    }

    /**小程序跳转 */
    navigateToMiniProgram(params: NavigateToMiniProgramObject) {
        let info = ''
        if (params.extraData) {
            info = Utils.makeQueryString(params.extraData)
        }
        BK.QQ.skipGame(Number(params.appId), info)
    }

    exit(params) {

    }

    /**声音 */
    onAudioInterruptionBegin(listener) {
        BK.onAudioInterruptionStart(listener)
    }
    onAudioInterruptionEnd(listener) {
        BK.onAudioInterruptionEnd(listener)
    }
    /**network */
    onNetworkStatusChange(listener) {
        NotificationCenter.on(NotificationName.NETWORK_CHANGE, listener)
    }
    offNetworkStatusChange(listener) {
        if (listener) {
            NotificationCenter.off(NotificationName.NETWORK_CHANGE, listener)
        } else {
            NotificationCenter.offAll(NotificationName.NETWORK_CHANGE)
        }
    }
    getNetworkType(params) {
        let info = BK.getSystemInfoSync()
        let res = {
            model: info.model,
            version: info.QQVer,
            platform: info.platform
        }
        params.success && params.success(res)
    }

    /**支付 */
    requestPayment(params) {

    }

    /**Toast */
    showLoading(params: LoadingObject) {
        BK.UI.showLoading({
            title: params.title || '加载中...',
            complete: params.success
        })
    }
    hideLoading(params) {
        BK.UI.hideLoading({
            complete: null
        })
    }
    showToast(params: ToastObject) {
        BK.UI.showToast({
            title: params.title,
            duration: params.duration || 2000,
            complete: params.success
        })
    }
    hideToast(params) {
        BK.UI.hideToast({
            complete: null
        })
    }
    showModal(params: ModalObject) {
        BK.UI.showAlert({
            title: params.title,
            content: params.content,
            success: params.success,
            complete: params.complete
        })
    }
    showActionSheet(params) {

    }

    /**广告 */
    createBannerAd(params) {
        return new BannerAd(params)
    }
    createRewardedVideoAd(params) {
        return new RewardedVideoAd(params)
    }
    /**微信特有方法 */
    setUserCloudStorage(params) {

    }
    openCustomerServiceConversation() {

    }
    previewImage(params) {

    }
    setClipboardData(params) {

    }

    /**好友排行榜相关接口 */
    requestFriendRankList(p: FriendRankList) {
        BK.QQ.getRankListWithoutRoom('score', 1, 0, (errCode, cmd, data) => {
            if (errCode != 0) {
                p.fail && p.fail({ errMsg: '请求失败', errCode: errCode })
                return
            }
            p.success && p.success(data)
        })
    }

    uploadScore(p: UploadScoreObject) {
        if (!p.startTime) {
            console.log(`QQ | uploadScore | warn | 请传入有效的startTime`)
            return
        }
        let data = {
            userData: [
                {
                    openId: GameStatusInfo.openId,
                    startMs: String(p.startTime),
                    endMs: String(Date.now()),
                    scoreInfo: {
                        score: p.score
                    }
                }
            ],
            attr: {
                score: {
                    type: 'rank',
                    order: 1
                }
            }
        }
        BK.QQ.uploadScoreWithoutRoom(1, data, (errCode, cmd, data) => {
            if (errCode != 0) {
                p.fail && p.fail({ errCode: errCode, errMsg: '请求失败' })
            } else {
                p.success && p.success(data)
            }
        })
    }
}

window['py'] = new Platform()
new Game()