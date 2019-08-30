import UpdateManager from "./updateManager";
import APIEnable from "./APIEnable";
import AuthManager from "./AuthManager";
import LoginManager from "./LoginManager";
import BannerAd from "./BannerAd";
import RewardedVideoAd from "./RewardedVideoAd";

export default class Platform implements PlatformInterface {
    init() {
        wx.updateShareMenu({
            withShareTicket: true,
            success() { },
            fail() { }
        })
        wx.showShareMenu({
            withShareTicket: true,
            success() { },
            fail() { }
        })
    }
    getLaunchOptionsSync() {
        return wx.getLaunchOptionsSync()
    }

    login(params, cb) {
        LoginManager.login(params, cb)
    }
    auth(params) {
        AuthManager.auth(params)
    }
    isMiniGame(): boolean {
        return true
    }
    getUserInfo(p){
        wx.getUserInfo(p)
    }

    /**生命周期 */
    onShow(cb) {
        /**@warn 这里可能需要针对第一次进行过滤 */
        wx.onShow(cb)
    }
    offShow() {
        wx.offShow()
    }
    onHide(cb) {
        wx.onHide(cb)
    }
    offHide() {
        wx.offHide()
    }

    /**分享 */
    onShareAppMessage(listener) {
        wx.onShareAppMessage(listener)
    }
    shareAppMessage(params) {
        wx.shareAppMessage(params)
    }
    getShareInfo(params) {
        wx.getShareInfo(params)
    }

    setKeepScreenOn() {
        wx.setKeepScreenOn({
            keepScreenOn: true,
            success() { },
            fail() { }
        })
    }
    getSystemInfoSync() {
        return wx.getSystemInfoSync()
    }
    getUpdateManager(): UpdateManager {
        return new UpdateManager()
    }

    /**小程序跳转 */
    navigateToMiniProgram(params) {
        wx.navigateToMiniProgram(params)
    }
    exit(params) {
        wx.exitMiniProgram({})
    }

    /**声音 */
    onAudioInterruptionBegin(listener) {
        wx.onAudioInterruptionBegin(listener)
    }
    onAudioInterruptionEnd(listener) {
        wx.onAudioInterruptionEnd(listener)
    }
    /**network */
    onNetworkStatusChange(listener) {
        wx.onNetworkStatusChange(listener)
    }
    offNetworkStatusChange(listener) {
        wx.offNetworkStatusChange(listener)
    }
    getNetworkType(params) {
        wx.getNetworkType(params)
    }

    /**支付 */
    requestPayment(params) {
        wx.requestMidasPayment({
            mode: "game",
            env: 0,
            offerId: params.offerId,
            currencyType: "CNY",
            buyQuantity: params.buyQuantity,
            platform: 'android',
            zoneId: "1",
            success: function (res) {
                console.log(`PAY | suc | ${JSON.stringify(res)}`)
                params.success && params.success();
            },
            fail: function (res) {
                console.log(`PAY | fail | ${JSON.stringify(res)}`)
                var msg = res.errMsg;
                var code = res.errCode;
                switch (code) {
                    case -1:
                        break;
                    case -2:
                        break;
                    case -15001:
                        break;
                    case -15002:
                        break;
                    case -15003:
                        break;
                    case -15004:
                        break;
                    case -15005:
                        break;
                    case -15006:
                        break;
                    case -15007:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    case 1000:
                        break;
                    case 1003:
                        break;
                }
                params.fail && params.fail(code)
            }
        })
    }

    /**Toast */
    showLoading(params) {
        wx.showLoading(params)
    }
    hideLoading(params) {
        wx.hideLoading()
    }
    showToast(params) {
        wx.showToast(params)
    }
    hideToast(params) {
        wx.hideToast()
    }
    showModal(params) {
        wx.showModal(params)
    }
    showActionSheet(params) {
        wx.showActionSheet(params)
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
        wx.setUserCloudStorage(params)
    }
    openCustomerServiceConversation() {
        wx.openCustomerServiceConversation()
    }
    previewImage(params) {
        wx.previewImage(params)
    }
    setClipboardData(params) {
        wx.setClipboardData(params)
    }
}

window['py'] = new Platform()