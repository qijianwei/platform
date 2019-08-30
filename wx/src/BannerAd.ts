import APIEnable from "./APIEnable";

export default class BannerAd {
    bannerAd
    constructor(params: BannerAdObject) {
        if (!APIEnable('createBannerAd')) return this
        params.style.top = params.style.top || params.style.y
        params.style.left = params.style.left || params.style.x
        let bannerAd = wx.createBannerAd(params)
        this.bannerAd = bannerAd
    }
    /**显示 banner 广告 */
    show() {
        if (!this.bannerAd) {
            console.error('当前版本不支持广告')
            return
        }
        return this.bannerAd.show()
    }
    /**隐藏 banner 广告 */
    hide() {
        if (!this.bannerAd) {
            console.error('当前版本不支持广告')
            return
        }
        return this.bannerAd.hide()
    }
    /**销毁 banner 广告 */
    destroy() {
        if (!this.bannerAd) return
        this.bannerAd.destroy()
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