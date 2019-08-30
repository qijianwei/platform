export default class BannerAd {
    bannerAd
    constructor(params: BannerAdObject) {
        let bannerAd = BK.Advertisement.createBannerAd(params)
        this.bannerAd = bannerAd
    }
    /**显示 banner 广告 */
    show() {
        if (!this.bannerAd) return
        return this.bannerAd.show()
    }
    /**隐藏 banner 广告 */
    hide() {
        if (!this.bannerAd) return
        return this.bannerAd.hide()
    }
    /**销毁 banner 广告 */
    destroy() {
        if (!this.bannerAd) return
        if (this.bannerAd.destroy){
            console.log('销毁Banner广告')
            this.bannerAd.destroy()
        }
        this.bannerAd.hide()
    }
    /**监听 banner 广告尺寸变化事件 */
    onResize(listener) {
        if (!this.bannerAd) return
        this.bannerAd.onResize(listener)
    }
    /**取消监听 banner 广告尺寸变化事件 */
    offResize(listener) {
        if (!this.bannerAd) return
        this.bannerAd.offResize(listener)
    }
    /**监听 banner 广告加载事件 */
    onLoad(listener) {
        if (!this.bannerAd) return
        this.bannerAd.onLoad(listener)
    }
    /**取消监听 banner 广告加载事件 */
    offLoad(listener) {
        if (!this.bannerAd) return
        this.bannerAd.offLoad(listener)
    }
    /**监听 banner 广告错误事件 */
    onError(listener) {
        if (!this.bannerAd) return
        this.bannerAd.onError(listener)
    }
    /**取消监听 banner 广告错误事件 */
    offError(listener) {
        if (!this.bannerAd) return
        this.bannerAd.offError(listener)
    }
}