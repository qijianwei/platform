import UpdateManager from "./updateManager";
import BannerAd from "./BannerAd";
import RewardedVideoAd from "./RewardedVideoAd";
import InterstitialAd from "./InterstitialAd";
export default class Platform implements PlatformInterface {
    init() {
        
    }
    getLaunchOptionsSync() {
        return {
            scene: 1044,
            query: {
                id: "186100"
            },
            path: "",
            shareTicket: "9089bcad-b1c8-4d01-8932-9e6a3736aebf"
        }
    }

    login(params, cb) {
        cb({
            type:5,
            platform:5
        })
    }
    auth(params) {
        params.next&&params.next();
    }
    isMiniGame(): boolean {
        return !1
    }
    getUserInfo(p){
      
    }

    /**生命周期 */
    onShow(cb) {
        /**@warn 这里可能需要针对第一次进行过滤 */
       
    }
    offShow() {
        
    }
    onHide(cb) {
     
    }
    offHide() {
       
    }

    /**分享 */
    onShareAppMessage(listener) {
       
    }
    shareAppMessage(params) {
       
    }
    getShareInfo(params) {
     
    }

    setKeepScreenOn() {
      
    }
    getSystemInfoSync() {
        return null
    }
    getUpdateManager(): UpdateManager {
        return new UpdateManager()
    }

    /**小程序跳转 */
    navigateToMiniProgram(params) {
        console.warn("\u6253\u5f00\u5c0f\u7a0b\u5e8f")
    }
    exit(params) {
    }

    /**声音 */
    onAudioInterruptionBegin(listener) {
      
    }
    onAudioInterruptionEnd(listener) {
      
    }
    /**network */
    onNetworkStatusChange(listener) {
      
    }
    offNetworkStatusChange(listener) {
     
    }
    getNetworkType(params) {
    }

    /**支付 */
    requestPayment(params) {
        console.warn("浏览器不支持充值")
    }

    /**Toast */
    showLoading(params) {
        console.warn("showLoading")
    }
    hideLoading(params) {
        console.warn("hideLoading")
    }
    showToast(params) {
        console.warn("showToast")
    }
    hideToast(params) {
        console.warn("hideToast")
    }
    showModal(params) {
        console.warn("showModal")
    }
    showActionSheet(params) {
        console.warn("showActionSheet")
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
        
    }
    openCustomerServiceConversation() {
       console.warn(`打开微信客服消息`)
    }
    previewImage(params) {
       console.warn('预览图片')
    }
    setClipboardData(params) {
      
    }
}

window['py'] = new Platform()