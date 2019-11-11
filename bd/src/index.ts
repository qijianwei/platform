import UpdateManager from "./updateManager";
import APIEnable from "./APIEnable";
import AuthManager from "./AuthManager";
import LoginManager from "./LoginManager";
import BannerAd from "./BannerAd";
import RewardedVideoAd from "./RewardedVideoAd";
import InterstitialAd from "./InterstitialAd";

export default class Platform implements PlatformInterface {
    init() {
        swan.showShareMenu({
            withShareTicket: true,
            success() { },
            fail() { }
        })
    }
    getLaunchOptionsSync() {
        return swan.getLaunchOptionsSync()
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
        swan.getUserInfo(p)
    }

    /**生命周期 */
    onShow(cb) {
        /**@warn 这里可能需要针对第一次进行过滤 */
        swan.onShow(cb)
    }
    offShow() {
        swan.offShow()
    }
    onHide(cb) {
        swan.onHide(cb)
    }
    offHide() {
        swan.offHide()
    }

    /**分享 */
    onShareAppMessage(listener) {
        swan.onShareAppMessage(listener)
    }
    shareAppMessage(params) {
        swan.shareAppMessage(params)
    }
    getShareInfo(params) {
        swan.getShareInfo(params)
    }

    setKeepScreenOn() {
        swan.setKeepScreenOn({
            keepScreenOn: true,
            success() { },
            fail() { }
        })
    }
    getSystemInfoSync() {
        return swan.getSystemInfoSync()
    }
    getUpdateManager(): UpdateManager {
        return new UpdateManager()
    }

    /**小程序跳转 */
    navigateToMiniProgram(params) {
        swan.navigateToMiniProgram(params)
    }
    exit(params) {
        swan.exit({})
    }

    /**声音 */
    onAudioInterruptionBegin(listener) {
        swan.onAudioInterruptionBegin(listener)
    }
    onAudioInterruptionEnd(listener) {
        swan.onAudioInterruptionEnd(listener)
    }
    /**network */
    onNetworkStatusChange(listener) {
        swan.onNetworkStatusChange(listener)
    }
    offNetworkStatusChange(listener) {
        swan.offNetworkStatusChange(listener)
    }
    getNetworkType(params) {
        swan.getNetworkType(params)
    }

    /**支付 */
    requestPayment(params) {
        swan.requestMidasPayment({
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
        swan.showLoading(params)
    }
    hideLoading(params) {
        swan.hideLoading()
    }
    showToast(params) {
        swan.showToast(params)
    }
    hideToast(params) {
        swan.hideToast()
    }
    showModal(params) {
        swan.showModal(params)
    }
    showActionSheet(params) {
        swan.showActionSheet(params)
    }

    /**广告 */
    createBannerAd(params) {
        return new BannerAd(params)
    }
    createRewardedVideoAd(params) {
        return new RewardedVideoAd(params)
    }
    createInterstitialAd(params) {
        return new InterstitialAd(params)
    }
    /**微信特有方法 */
    setUserCloudStorage(params) {
        swan.setUserCloudStorage(params)
    }
    openCustomerServiceConversation() {
        swan.openCustomerServiceConversation()
    }
    previewImage(params) {
        swan.previewImage(params)
    }
    setClipboardData(params) {
        swan.setClipboardData(params)
    }
}

window['py'] = new Platform()