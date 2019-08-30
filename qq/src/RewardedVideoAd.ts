export default class RewardedVideoAd {
    videoAd
    onCloseListener:Function
    playFinished = false
    constructor(params: RewardedVideoAdObject) {
        let _this = this, videoAd = BK.Advertisement.createVideoAd()
        videoAd.onPlayStart(function(){
            console.log('RewardedVideoAd | onPlayStart')
            _this.playFinished = false
        })
        videoAd.onPlayFinish(function(){
            console.log('RewardedVideoAd | onPlayFinish')
            _this.playFinished = true
        })
        videoAd.onClose(function(){
            console.log('RewardedVideoAd | onClose')
            _this.onCloseListener({isEnded:_this.playFinished})
        })
        this.videoAd = videoAd
    }
    /**隐藏激励视频广告 */
    load() {
        if (!this.videoAd) return
        return this.videoAd.load()
    }
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    show() {
        if (!this.videoAd) return
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
    onPlayStart(listener) {
        if (!this.videoAd) return
        this.videoAd.onPlayStart(listener)
    }
    offPlayStart(listener) {

    }
    onPlayFinish(listener) {
        if (!this.videoAd) return
        this.videoAd.onPlayFinish(listener)
    }
    offPlayFinish(listener) {

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
        this.onCloseListener = listener
        // this.videoAd.onClose(listener)
    }
    /**取消监听用户点击 关闭广告 按钮的事件 */
    offClose(listener) {
        if (!this.videoAd) return
        this.videoAd.offClose(listener)
    }
}