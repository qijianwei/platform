export default class InterstitialAd {
    constructor(params: InterstitialAdObject) {
    }
    /**隐藏激励视频广告 */
    load() {
        return new Promise((resolve,reject)=>{
            this.listenerError()
            reject(`当前版本不支持广告`);
       })
    }
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    show() {
        return new Promise((resolve,reject)=>{
            reject(`当前版本不支持广告`);
       })
    }
    /**监听激励视频广告加载事件 */
    onLoad(listener) {
    
    }
    /**取消监听激励视频广告加载事件 */
    offLoad(listener) {
    
    }
    /**监听激励视频错误事件 */
    onError(listener) {
        this.listenerError=listener;
    }
    /**取消监听激励视频错误事件 */
    offError(listener) {
      
    }
    /**监听用户点击 关闭广告 按钮的事件 */
    onClose(listener) {
       
    }
    /**取消监听用户点击 关闭广告 按钮的事件 */
    offClose(listener) {
      
    }
    listenerError(){
        
    }
}