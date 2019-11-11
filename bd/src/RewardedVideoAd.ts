import APIEnable from "./APIEnable";

export default class RewardedVideoAd {
    videoAd
    constructor(params: RewardedVideoAdObject) {
        if (!APIEnable('createRewardedVideoAd')) return this
        let videoAd = swan.createRewardedVideoAd(params)
        this.videoAd = videoAd
    }
    /**隐藏激励视频广告 */
    load() {
        if (!this.videoAd) {
            console.error('当前版本不支持广告')
            return
        }
        return this.videoAd.load()
    }
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    show() {
        if (!this.videoAd) {
            console.error('当前版本不支持广告')
            return
        }
        return this.videoAd.show()
    }
    /**监听激励视频广告加载事件 */
    onLoad(listener) {
        if (!this.videoAd) return
        this.videoAd.onLoad(listener)
    }
    /**取消监听激励视频广告加载事件 */
    offLoad(listener) {
        if (!this.videoAd) return
        this.videoAd.offLoad(listener)
    }
    /**监听激励视频错误事件 */
    onError(listener) {
        if (!this.videoAd) return
        this.videoAd.onError(listener)
    }
    /**取消监听激励视频错误事件 */
    offError(listener) {
        if (!this.videoAd) return
        this.videoAd.offError(listener)
    }
    /**监听用户点击 关闭广告 按钮的事件 */
    onClose(listener) {
        if (!this.videoAd) return
        this.videoAd.onClose(listener)
    }
    /**取消监听用户点击 关闭广告 按钮的事件 */
    offClose(listener) {
        if (!this.videoAd) return
        this.videoAd.offClose(listener)
    }
}